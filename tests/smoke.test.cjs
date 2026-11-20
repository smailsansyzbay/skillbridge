/* Run using: node tests/smoke.test.cjs. No external packages are needed. */
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const assert = require('node:assert/strict');
const store = new Map();
const localStorage = {
  getItem(k) { return store.get(k) ?? null; },
  setItem(k, v) { store.set(k, String(v)); },
  removeItem(k) { store.delete(k); }
};
const context = {
  console,
  Date,
  Blob,
  structuredClone,
  localStorage,
  setTimeout,
  crypto: globalThis.crypto || require('node:crypto').webcrypto
};
context.window = context;
vm.createContext(context);
for (const filename of ['seed.js', 'storage.js', 'data.js']) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../js', filename), 'utf8'), context, { filename });
}
const { SBStorage: storage, SBData: api, SBTestBank: bank } = context;
storage.load();
assert.equal(storage.state().settings.commissionRate, 0.15);
assert.equal(storage.state().services.length, 3);
assert.equal(api.priceFor({serviceId:'catalog'}), 20000);
assert.equal(api.share({serviceId:'catalog'}), 17000);
assert.equal(api.commission({serviceId:'catalog'}), 3000);
const o = api.createOrder('b1', { serviceId:'catalog',title:'Проверка 20 карточек товаров',brief:'Подготовить из предоставленных данных до двадцати карточек с ценами и SKU.',notes:'Тест'});
assert.equal(o.status, 'awaiting_demo_payment');
assert.throws(()=>api.assign('a1',o.id,'s1'));
api.pay('b1', o.id);
assert.equal(o.status,'matching');
assert.throws(()=>api.pay('b1',o.id));
assert.throws(()=>api.assign('b1',o.id,'s1'));
assert.throws(()=>api.assign('a1',o.id,'s4')); // no category qualification
assert.equal(api.qualification('s1','catalog'),true);
api.apply('s1', o.id);
api.updateProfile('s1',{name:'Алия М.',field:'Каталоги',available:false});
assert.throws(()=>api.assign('a1',o.id,'s1'),/unavailable/i);
api.updateProfile('s1',{name:'Алия М.',field:'Каталоги',available:true});
api.assign('a1', o.id, 's1');
assert.equal(o.status,'assigned');
api.start('s1', o.id);
api.submit('s1',o.id,{text:'Готовы 20 демонстрационных карточек с SKU и ценами.',file:null});
assert.equal(o.status,'qa_review');
assert.throws(()=>api.accept('b1',o.id));
api.qa('a1',o.id,true,'Все требования соблюдены',[true,true,true,true]);
assert.equal(o.status,'client_review');
api.accept('b1',o.id);
assert.equal(o.status,'approved');
assert.throws(()=>api.release('b1',o.id));
api.release('a1',o.id);
assert.equal(o.status,'completed');
assert.throws(()=>api.release('a1',o.id),'no double payout');
assert.equal(storage.state().ledger.filter(x=>x.orderId===o.id&&x.type==='demo_performer_payout').length,1);
assert.equal(storage.state().ledger.filter(x=>x.orderId===o.id&&x.type==='demo_platform_commission').length,1);
api.review('b1',o.id,5,'Отличный демонстрационный результат.',true);
assert.equal(api.getPortfolio('s1').some(x=>x.order.id===o.id),true);
assert.throws(()=>api.review('b1',o.id,5,'Повторный отзыв.',false));
// Interactive inbox: a participant can send, the other participant sees unread state,
// viewing the conversation marks messages and corresponding alerts as read.
assert.equal(api.unreadMessages('b1',o.id),0);
assert.throws(()=>api.message('s3',o.id,'Unauthorized access is forbidden.'));
assert.throws(()=>api.message('s1',o.id,'  '));
api.message('s1',o.id,'Спасибо за демонстрационный заказ');
assert.equal(api.unreadMessages('b1',o.id),1);
assert.equal(storage.state().messages.some(x=>x.orderId===o.id&&x.readBy?.includes('s1')),true);
const alert = storage.state().notifications.find(n=>n.userId==='b1'&&n.type==='message'&&n.text.includes(o.id));
assert.equal(alert?.read,false);
assert.equal(api.markThreadRead('b1',o.id),1);
assert.equal(api.unreadMessages('b1',o.id),0);
assert.equal(alert?.read,true);
api.message('b1',o.id,'Пожалуйста, добавьте ссылку на результат.');
assert.equal(api.unreadMessages('s1',o.id),1);
assert.equal(api.markThreadRead('s1',o.id),1);
assert.equal(api.unreadMessages('s1',o.id),0);
assert.equal(storage.state().messages.some(x=>x.orderId===o.id),true);
// Older JSON exports without message.readBy must remain readable.
const olderSnapshot=JSON.parse(JSON.stringify(storage.state()));
const lastMsg=olderSnapshot.messages.findLast(x=>x.orderId===o.id);
delete lastMsg.readBy;
assert.equal(storage.isData(olderSnapshot),true);
const json=JSON.stringify(storage.state());
assert.equal(storage.isData(JSON.parse(json)),true);
storage.reset();
assert.equal(storage.state().orders.some(x=>x.id===o.id),false);
storage.importData(json);
assert.equal(storage.state().orders.some(x=>x.id===o.id),true);
assert.equal(storage.state().messages.filter(x=>x.orderId===o.id).length,2);
// Legacy snapshots preserve role permissions, linked records and payment totals.
const legacy=JSON.parse(json);
legacy.meta.schemaVersion=legacy.schemaVersion=1;
for (const user of legacy.users) {
  if (user.role==='performer') user.role='student';
}
for (const key of ['orders','applications','reviews']) {
  for (const row of legacy[key]) {
    row.studentId=row.performerId;
    delete row.performerId;
  }
}
for (const entry of legacy.ledger) {
  if (entry.type==='demo_performer_payout') entry.type='demo_student_payout';
}
const legacyJson=JSON.stringify(legacy);
function assertMigrated() {
  assert.equal(storage.state().meta.schemaVersion,2);
  assert.equal(api.user('s1').role,'performer');
  assert.equal(api.order(o.id).performerId,'s1');
  assert.equal(storage.state().applications.find(x=>x.orderId===o.id).performerId,'s1');
  assert.equal(storage.state().reviews.find(x=>x.orderId===o.id).performerId,'s1');
  assert.equal(storage.state().messages.filter(x=>x.orderId===o.id).length,2);
  assert.equal(api.stats('s1').payouts,17000);
}
storage.importData(legacyJson);
assertMigrated();
localStorage.setItem('skillbridge_demo_v1',legacyJson);
storage.load();
assertMigrated();
assert.equal(JSON.parse(localStorage.getItem('skillbridge_demo_v1')).meta.schemaVersion,2);
localStorage.setItem('skillbridge_demo_previous_snapshot_v1',legacyJson);
storage.restore();
assertMigrated();
console.log('PASS: roles, skills and availability, order lifecycle, QA, 15% commission, reviews, inbox persistence and v1 JSON migration.');

// Custom prices must flow through funding, QA and the final ledger.
const custom=api.createOrder('b1',{custom:true,serviceId:'catalog',title:'Индивидуальный каталог',brief:'Подготовить карточки товаров по индивидуальному техническому заданию.',price:35000,days:7});
assert.equal(custom.targetWorkingDays,7);
assert.equal(api.priceFor(custom),35000);
assert.equal(api.commission(custom),5250);
assert.equal(api.share(custom),29750);
assert.throws(()=>api.createOrder('b1',{custom:true,serviceId:'catalog',title:'Некорректный заказ',brief:'Достаточно подробное описание тестового задания.',price:-1,days:0}));
api.pay('b1',custom.id);
api.assign('a1',custom.id,'s1');
api.start('s1',custom.id);
api.submit('s1',custom.id,{text:'Подготовлены карточки по согласованным требованиям.'});
api.qa('a1',custom.id,true,'Принято',[true,true,true,true]);
api.accept('b1',custom.id);
api.release('a1',custom.id);
assert.equal(storage.state().ledger.find(x=>x.orderId===custom.id&&x.type==='demo_platform_commission').amount,5250);
storage.importData(JSON.stringify(storage.state()));
assert.equal(api.priceFor(api.order(custom.id)),35000);
console.log('PASS: custom order price, duration, validation, workflow, commission and JSON persistence.');
