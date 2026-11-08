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
assert.equal(storage.state().ledger.filter(x=>x.orderId===o.id&&x.type==='demo_student_payout').length,1);
assert.equal(storage.state().ledger.filter(x=>x.orderId===o.id&&x.type==='demo_platform_commission').length,1);
api.review('b1',o.id,5,'Отличный демонстрационный результат.',true);
assert.equal(api.getPortfolio('s1').some(x=>x.order.id===o.id),true);
assert.throws(()=>api.review('b1',o.id,5,'Повторный отзыв.',false));
api.message('s1',o.id,'Спасибо за демонстрационный заказ');
assert.equal(storage.state().messages.some(x=>x.orderId===o.id),true);
const json=JSON.stringify(storage.state());
assert.equal(storage.isData(JSON.parse(json)),true);
storage.reset();
assert.equal(storage.state().orders.some(x=>x.id===o.id),false);
storage.importData(json);
assert.equal(storage.state().orders.some(x=>x.id===o.id),true);
console.log('PASS: 15%/85% payout, three services, roles, order lifecycle, QA, reviews, messaging, duplicate payment protection, JSON round-trip.');