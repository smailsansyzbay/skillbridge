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
for (const filename of ['seed.js', 'catalog.js', 'assessments.js', 'storage.js', 'data.js']) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../js', filename), 'utf8'), context, { filename });
}
const { SBStorage: storage, SBData: api, SBTestBank: bank } = context;
storage.load();
assert.equal(storage.state().settings.commissionRate, 0.15);
assert.equal(storage.state().services.length, 31);
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

// English state must survive export/import and local reload.
api.changeLanguage('en');
storage.importData(JSON.stringify(storage.state()));
assert.equal(storage.state().settings.language,'en');
storage.load();
assert.equal(storage.state().settings.language,'en');
vm.runInContext(fs.readFileSync(path.join(__dirname,'../js/i18n.js'),'utf8'),context);
assert.equal(context.SBI18n.text('Заказчики','Тапсырыс берушілер'),'Customers');
assert.equal(context.SBI18n.english(['Обязательные поля и цены'])[0],'Required fields and prices');
assert.throws(()=>api.changeLanguage('unknown'));
console.log('PASS: English state persistence and translated criteria.');

// Withdrawals are simulated, bounded by earned funds, and safe to retry.
const beforeWallet=api.wallet('s1');
assert.ok(beforeWallet.available>0);
assert.throws(()=>api.withdraw('b1',{amount:1,lastFour:'1234',requestId:'wrong-role'}));
assert.throws(()=>api.withdraw('s1',{amount:beforeWallet.available+1,lastFour:'1234',requestId:'too-large'}));
assert.throws(()=>api.withdraw('s1',{amount:1,lastFour:'12345',requestId:'bad-account'}));
const withdrawal=api.withdraw('s1',{amount:1000,lastFour:'1234',requestId:'wallet-test-1'});
assert.equal(api.wallet('s1').available,beforeWallet.available-1000);
assert.equal(api.wallet('s1').withdrawn,1000);
assert.equal(api.withdraw('s1',{amount:1000,lastFour:'1234',requestId:'wallet-test-1'}).id,withdrawal.id);
assert.equal(api.wallet('s1').withdrawals.length,1);
assert.throws(()=>api.withdraw('s1',{amount:2000,lastFour:'1234',requestId:'wallet-test-1'}));
storage.importData(JSON.stringify(storage.state()));
assert.equal(api.wallet('s1').withdrawn,1000);
assert.equal(api.wallet('s2').withdrawn,0);
const remaining=api.wallet('s1').available;
api.withdraw('s1',{amount:remaining,lastFour:'9999',requestId:'wallet-test-2'});
assert.equal(api.wallet('s1').available,0);
assert.throws(()=>api.withdraw('s1',{amount:1,lastFour:'9999',requestId:'wallet-test-3'}));
console.log('PASS: wallet balances, bounded withdrawals, retry protection and JSON persistence.');

// Every new department must support qualified assignment and full delivery.
assert.equal(context.SBCatalog.departments.length,7);
for (const department of context.SBCatalog.departments) {
  const services=storage.state().services.filter(service=>service.skillGroup===department.id);
  assert.equal(services.length,4);
  const chosen=services[0],other=services[1];
  assert.equal(api.qualification('s4',chosen.id),false);
  const result=api.test('s4',chosen.id,bank[chosen.id].map(question=>question.correct));
  assert.equal(result.passed,true);
  assert.equal(api.qualification('s4',other.id),true);
  const task=api.createOrder('b1',{serviceId:other.id,title:'Тест услуги '+department.id,brief:'Подготовить результат согласно подробному описанию и критериям приёмки.',briefDetails:{goal:'Проверить новый каталог',audience:'Малый бизнес',deliverables:'Редактируемый файл',materials:'Синтетические данные',acceptance:'Соответствие брифу'}});
  api.pay('b1',task.id);
  api.assign('a1',task.id,'s4');
  api.start('s4',task.id);
  api.submit('s4',task.id,{text:'Работа подготовлена согласно согласованным требованиям.'});
  api.qa('a1',task.id,true,'Соответствует',other.criteria.ru.map(()=>true));
  api.accept('b1',task.id);
  api.release('a1',task.id);
  assert.equal(task.status,'completed');
  assert.equal(task.briefDetails.deliverables,'Редактируемый файл');
}
// Old JSON files gain new services without losing their existing content.
const oldCatalog=JSON.parse(JSON.stringify(storage.state()));
oldCatalog.services=oldCatalog.services.filter(service=>['catalog','excel','research'].includes(service.id));
storage.importData(JSON.stringify(oldCatalog));
assert.equal(storage.state().services.length,31);
assert.equal(storage.state().orders.at(0).briefDetails.acceptance,'Соответствие брифу');
storage.load();
assert.equal(storage.state().services.length,31);
assert.throws(()=>api.createOrder('b1',{serviceId:'content-plan',title:'Invalid brief details',brief:'A sufficiently long description of the expected work.',briefDetails:{goal:'x'.repeat(1501)}}));
console.log('PASS: seven departments, 28 services, skill groups, complete workflows, structured briefs and legacy JSON enrichment.');

// Assessments include complete scenario/explanation content in every UI language.
for(const service of storage.state().services){
 const questions=bank[service.id];
 assert.equal(questions.length,4);
 for(const question of questions){
  for(const language of ['ru','kz','en']){
   assert.ok(question.scenario[language].length>60);
   assert.ok(question.explanation[language].length>60);
   assert.ok(question.q[language].length>20);
  }
 }
}
assert.throws(()=>api.test('s4','content-plan',[0,1]));
const call=api.requestQaCall('s4',{slot:'afternoon',note:'Discuss my assessment',requestId:'demo-call-test'});
assert.equal(call.demo,true);
assert.equal(api.requestQaCall('s4',{slot:'afternoon',note:'Discuss my assessment',requestId:'demo-call-test'}).id,call.id);
assert.equal(storage.state().activityLog.filter(entry=>entry.type==='demo_qa_call'&&entry.actorId==='s4').length,1);
assert.throws(()=>api.requestQaCall('b1',{slot:'morning',requestId:'customer-call-test'}));
assert.throws(()=>api.requestQaCall('s4',{slot:'invalid',requestId:'invalid-call-test'}));
storage.importData(JSON.stringify(storage.state()));
assert.equal(storage.state().activityLog.find(entry=>entry.id===call.id).slot,'afternoon');
console.log('PASS: detailed multilingual assessments, answer validation and persistent, idempotent QA demo call requests.');

// Customer funds become available only after an approved order refund.
const specialistBeforeRefund=api.wallet('s1').available;
const refundOrder=api.createOrder('b1',{serviceId:'catalog',custom:true,price:36000,days:5,title:'Заказ для проверки возврата',brief:'Подготовить каталог согласно согласованным данным и критериям приёмки.'});
api.pay('b1',refundOrder.id);
api.assign('a1',refundOrder.id,'s1');
api.start('s1',refundOrder.id);
api.submit('s1',refundOrder.id,{text:'Представлен демонстрационный результат для проверки.'});
api.qa('a1',refundOrder.id,true,'Принято',[true,true,true,true]);
assert.throws(()=>api.dispute('b2',refundOrder.id,'Отсутствует часть согласованного результата.'));
api.dispute('b1',refundOrder.id,'Отсутствует часть согласованного результата.');
assert.equal(api.wallet('b1').pending,36000);
assert.equal(api.wallet('b1').available,0);
assert.throws(()=>api.withdraw('b1',{amount:1000,lastFour:'1234',requestId:'before-refund-approval'}));
assert.throws(()=>api.resolve('b1',refundOrder.id,'refund'));
api.resolve('a1',refundOrder.id,'refund');
assert.equal(api.wallet('b1').available,36000);
assert.equal(api.wallet('b1').pending,0);
assert.throws(()=>api.resolve('a1',refundOrder.id,'refund'));
const returned=api.withdraw('b1',{amount:11000,lastFour:'4321',requestId:'customer-refund-test'});
assert.equal(returned.type,'demo_refund_withdrawal');
assert.equal(api.wallet('b1').available,25000);
assert.equal(api.wallet('b1').withdrawn,11000);
assert.equal(api.withdraw('b1',{amount:11000,lastFour:'4321',requestId:'customer-refund-test'}).id,returned.id);
assert.throws(()=>api.withdraw('b1',{amount:25001,lastFour:'4321',requestId:'customer-too-much'}));
assert.throws(()=>api.withdraw('b2',{amount:1000,lastFour:'4321',requestId:'other-customer'}));
assert.throws(()=>api.wallet('a1'));
assert.equal(api.wallet('s1').available,specialistBeforeRefund);
storage.importData(JSON.stringify(storage.state()));
assert.equal(api.wallet('b1').available,25000);
assert.equal(api.wallet('b1').credits.filter(entry=>entry.orderId===refundOrder.id).length,1);
console.log('PASS: customer payments, pending disputes, approved refunds, isolated balances, bounded withdrawals and JSON persistence.');

// Guide completion is derived from actual account actions, not tutorial clicks.
vm.runInContext(fs.readFileSync(path.join(__dirname,'../js/guide.js'),'utf8'),context);
assert.equal(context.SBGuide.plan('a1'),null);
assert.equal(context.SBGuide.plan('missing'),null);
storage.state().users.push({id:'guide-customer',role:'business',name:'Guide Customer',company:'Demo',skills:[],available:true});
storage.save();
let guide=context.SBGuide.plan('guide-customer');
assert.equal(guide.role,'business');
assert.equal(guide.completed,0);
assert.equal(guide.steps[0].action.route,'catalog');
const guidedOrder=api.createOrder('guide-customer',{serviceId:'catalog',title:'Новый заказ для гида',brief:'Подготовить каталог из согласованных демонстрационных материалов.'});
guide=context.SBGuide.plan('guide-customer');
assert.equal(guide.steps[0].done,true);
assert.equal(guide.steps[1].done,false);
assert.equal(guide.steps[1].action.id,guidedOrder.id);
api.pay('guide-customer',guidedOrder.id);
assert.equal(context.SBGuide.plan('guide-customer').steps[1].done,true);
api.message('guide-customer',guidedOrder.id,'Пожалуйста, используйте согласованную структуру каталога.');
assert.equal(context.SBGuide.plan('guide-customer').steps[2].done,true);
storage.state().users.push({id:'guide-specialist',role:'performer',name:'Guide Specialist',company:'',bio:'',field:'',skills:[],available:true});
storage.save();
guide=context.SBGuide.plan('guide-specialist');
assert.equal(guide.steps.length,5);
assert.equal(guide.completed,0);
api.updateProfile('guide-specialist',{name:'Guide Specialist',field:'Catalogs',bio:'Working with data',available:true});
assert.equal(context.SBGuide.plan('guide-specialist').steps[0].done,true);
api.test('guide-specialist','catalog',bank.catalog.map(question=>question.correct));
assert.equal(context.SBGuide.plan('guide-specialist').steps[1].done,true);
assert.equal(context.SBGuide.plan('guide-specialist').steps[3].action.route,'opportunities');
console.log('PASS: contextual role guides, empty accounts, real progress and safe next-step targets.');
storage.state().users.push({id:'closed-customer',role:'business',name:'Closed Customer',company:'Demo',skills:[],available:true});
storage.save();
const cancelledForGuide=api.createOrder('closed-customer',{serviceId:'catalog',title:'Cancelled guide order',brief:'Prepare a demonstration catalog from the supplied materials.'});
api.cancel('closed-customer',cancelledForGuide.id);
assert.equal(context.SBGuide.plan('closed-customer').steps.find(step=>step.id==='review').action.route,'catalog');
console.log('PASS: guide routes away from cancelled orders.');
