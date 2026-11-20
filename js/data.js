(function(){
'use strict';
const st=()=>window.SBStorage.state(), save=()=>window.SBStorage.save();
const id=(p)=>p+'-'+(globalThis.crypto?.randomUUID?.()||Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8));
const now=()=>new Date().toISOString();
const requireThat=(yes,msg)=>{if(!yes)throw Error(msg);};
const user=(uid)=>st().users.find(x=>x.id===uid);
const service=(sid)=>st().services.find(x=>x.id===sid);
const order=(oid)=>{const o=st().orders.find(x=>x.id===oid);requireThat(o,'Заказ не найден / Тапсырыс табылмады.');return o;};
const hasRole=(uid,r)=>user(uid)?.role===r;
const priceFor=(o)=>o.price??service(o.serviceId)?.price??st().settings.price;
const share=(o)=>Math.round(priceFor(o)*(1-st().settings.commissionRate));
const commission=(o)=>priceFor(o)-share(o);
function log(o,actor,action){st().activityLog.unshift({id:id('evt'),orderId:o.id,actorId:actor,action,createdAt:now()});o.updatedAt=now();}
function notify(uid,txt,type='info'){if(!uid)return;st().notifications.unshift({id:id('nt'),userId:uid,type,text:txt,createdAt:now(),read:false});}
function notifyAdmin(text){st().users.filter(x=>x.role==='admin').forEach(x=>notify(x.id,text));}
function workingDeadline(days){let dt=new Date(),n=0;while(n<days){dt.setDate(dt.getDate()+1);if(dt.getDay()!==0&&dt.getDay()!==6)n++;}return dt.toISOString();}
function nextOrderId(){let n=Math.max(1002,...st().orders.map(o=>Number((o.id.match(/SB-(\d+)/)||[])[1])||0));return `SB-${n+1}`;}
const visible=(o,uid)=>hasRole(uid,'admin')||o.businessId===uid||o.performerId===uid;
function qualification(uid,sid){
 const group=service(sid)?.skillGroup;
 return st().skillTests.some(test=>test.userId===uid&&test.passed&&(test.serviceId===sid||(group&&service(test.serviceId)?.skillGroup===group)));
}
function mutate(f){const out=f();save();return out;}
function createOrder(actor,input){return mutate(()=>{requireThat(hasRole(actor,'business'),'Only SME can create an order.');requireThat(service(input.serviceId),'Услуга не найдена.');const title=String(input.title||'').trim(),brief=String(input.brief||'').trim();requireThat(title.length>=5&&title.length<=130,'Название: 5–130 символов.');requireThat(brief.length>=25&&brief.length<=3500,'Опишите задание минимум 25 символами.');const custom=input.custom===true;
const price=custom?Number(input.price):service(input.serviceId).price;
const days=custom?Number(input.days):st().settings.targetWorkingDays;
requireThat(Number.isSafeInteger(price)&&price>=1&&price<=10000000,'Цена: целое число от 1 до 10 000 000 ₸.');
requireThat(Number.isInteger(days)&&days>=1&&days<=365,'Срок: от 1 до 365 рабочих дней.');
const briefDetails={};
for(const key of ['goal','audience','deliverables','materials','acceptance']){
 const value=String(input.briefDetails?.[key]||'').trim();
 requireThat(value.length<=1500,'Поле брифа: максимум 1500 символов.');
 if(value)briefDetails[key]=value;
}
const o={id:nextOrderId(),serviceId:input.serviceId,custom,price,targetWorkingDays:days,businessId:actor,performerId:null,title,brief,briefDetails,notes:String(input.notes||'').slice(0,2000),inputFile:input.inputFile||null,status:'awaiting_demo_payment',demoPayment:false,revisionCount:0,deadline:workingDeadline(days),createdAt:now(),updatedAt:now(),delivery:null,qa:null,review:null,demoPayout:false,dispute:null};st().orders.unshift(o);log(o,actor,'Created draft order');notifyAdmin(`Создан демо-заказ ${o.id}.`);return o;});}
function pay(actor,oid,provider='freedom'){return mutate(()=>{const o=order(oid);requireThat(o.businessId===actor,'Only order owner can simulate payment.');requireThat(o.status==='awaiting_demo_payment'&&!o.demoPayment,'Payment already confirmed or invalid status.');requireThat(['freedom'].includes(provider),'Неизвестный способ демо-оплаты.');o.demoPaymentProvider=provider;o.demoPayment=true;o.status='matching';st().ledger.unshift({id:id('txn'),orderId:o.id,type:'demo_funded',amount:priceFor(o),createdAt:now(),demo:true});log(o,actor,'Demo payment confirmed');notifyAdmin(`Оплата DEMO по ${o.id} подтверждена. Назначьте исполнителя.`);return o;});}
function cancel(actor,oid){return mutate(()=>{const o=order(oid);requireThat(o.businessId===actor||hasRole(actor,'admin'),'Insufficient permissions.');requireThat(o.status==='awaiting_demo_payment','Only unpaid orders can be cancelled by this action.');o.status='cancelled';log(o,actor,'Cancelled unpaid order');return o;});}
function apply(actor,oid){return mutate(()=>{const o=order(oid);requireThat(hasRole(actor,'performer'),'Only performer can apply.');requireThat(o.status==='matching','Order is not accepting applications.');requireThat(qualification(actor,o.serviceId),'Сначала пройдите тест этой категории.');requireThat(!st().applications.some(a=>a.orderId===oid&&a.performerId===actor),'Вы уже откликнулись.');st().applications.unshift({id:id('app'),orderId:oid,performerId:actor,createdAt:now()});log(o,actor,'Performer applied');notifyAdmin(`${user(actor).name} откликнулся на ${o.id}.`);return o;});}
function assign(actor,oid,performerId){return mutate(()=>{const o=order(oid);requireThat(hasRole(actor,'admin'),'Only admin can assign.');requireThat(o.status==='matching'&&o.demoPayment,'Order is not in matching state.');requireThat(hasRole(performerId,'performer')&&qualification(performerId,o.serviceId),'Select a performer qualified for the service.');requireThat(user(performerId).available,'Performer is marked unavailable.');o.performerId=performerId;o.status='assigned';log(o,actor,`Assigned performer ${user(performerId).name}`);notify(performerId,`Вам назначен заказ ${o.id}.`);notify(o.businessId,`Исполнитель для ${o.id} выбран.`);return o;});}
function start(actor,oid){return mutate(()=>{const o=order(oid);requireThat(o.performerId===actor,'Not your task.');requireThat(o.status==='assigned','Task cannot start now.');o.status='in_progress';log(o,actor,'Performer started work');notify(o.businessId,`Исполнитель начал заказ ${o.id}.`);return o;});}
function submit(actor,oid,input){return mutate(()=>{const o=order(oid);requireThat(o.performerId===actor,'Not your task.');requireThat(['in_progress','revision_requested'].includes(o.status),'Task cannot be submitted now.');const body=String(input.text||'').trim();requireThat(body.length>=12,'Добавьте результат работы (минимум 12 символов).');o.delivery={text:body,file:input.file||null,at:now(),by:actor,version:(o.delivery?.version||0)+1};o.qa=null;o.status='qa_review';log(o,actor,`Submitted version ${o.delivery.version} for QA`);notifyAdmin(`Результат по ${o.id} ожидает QA.`);return o;});}
function qa(actor,oid,passed,notes,checks){return mutate(()=>{const o=order(oid);requireThat(hasRole(actor,'admin'),'Only admin can review QA.');requireThat(o.status==='qa_review'&&o.delivery,'No submitted deliverable.');const s=service(o.serviceId);const note=String(notes||'').trim().slice(0,1200);if(passed)requireThat(Array.isArray(checks)&&checks.length===s.criteria.ru.length&&checks.every(x=>x===true),'Отметьте каждый критерий чек-листа QA.');else requireThat(note.length>=12,'Укажите причину отклонения (не менее 12 символов).');o.qa={passed,note,checks:checks||[],at:now(),by:actor};if(passed){o.status='client_review';notify(o.businessId,`Результат ${o.id} прошёл QA. Проверьте его.`);}else if(o.revisionCount<st().settings.maxRevisions){o.revisionCount++;o.status='revision_requested';notify(o.performerId,`Результат ${o.id} требует исправления: ${note}`);}else{o.status='disputed';o.dispute={reason:'Повторный отказ QA: '+note,by:actor,createdAt:now(),resolved:false};notify(o.businessId,`По ${o.id} открыт спор после повторной QA.`);}log(o,actor,passed?'QA accepted':'QA rejected');return o;});}
function revision(actor,oid,reason){return mutate(()=>{const o=order(oid);requireThat(o.businessId===actor,'Only SME may request revision.');requireThat(o.status==='client_review','This order is not awaiting client review.');requireThat(o.revisionCount<st().settings.maxRevisions,'Revision quota exhausted. Open a dispute instead.');requireThat(String(reason||'').trim().length>=12,'Укажите конкретное исправление (12+ символов).');o.revisionCount++;o.status='revision_requested';o.qa={...(o.qa||{}),clientRevisionReason:String(reason).slice(0,1200)};log(o,actor,'Client requested in-scope revision');notify(o.performerId,`Исправление по ${o.id}: ${reason}`);return o;});}
function accept(actor,oid){return mutate(()=>{const o=order(oid);requireThat(o.businessId===actor,'Only SME can accept.');requireThat(o.status==='client_review'&&o.qa?.passed,'QA approval is required.');o.status='approved';log(o,actor,'SME accepted deliverable');notifyAdmin(`Заказ ${o.id} принят клиентом, можно провести демо-выплату.`);notify(o.performerId,`SME принял результат по ${o.id}.`);return o;});}
function dispute(actor,oid,reason){return mutate(()=>{const o=order(oid);requireThat(o.businessId===actor,'Only SME can raise a dispute.');requireThat(['client_review','revision_requested'].includes(o.status),'Dispute not available in this status.');requireThat(String(reason||'').trim().length>=14,'Подробно опишите спор (14+ символов).');o.dispute={reason:String(reason).slice(0,1500),by:actor,createdAt:now(),resolved:false};o.status='disputed';log(o,actor,'SME opened dispute');notifyAdmin(`Открыт спор по ${o.id}.`);return o;});}
function resolve(actor,oid,resolution){return mutate(()=>{const o=order(oid);requireThat(hasRole(actor,'admin'),'Only admin can resolve.');requireThat(o.status==='disputed'&&o.dispute&&!o.dispute.resolved,'No open dispute.');requireThat(['refund','revision'].includes(resolution),'Unknown resolution.');if(resolution==='revision'){requireThat(o.revisionCount<st().settings.maxRevisions,'Revision limit exhausted. Select refund.');o.revisionCount++;o.status='revision_requested';}else{o.status='refunded';st().ledger.unshift({id:id('txn'),orderId:o.id,type:'demo_refund',amount:priceFor(o),createdAt:now(),demo:true});}o.dispute.resolved=true;o.dispute.resolution=resolution;o.dispute.resolvedAt=now();log(o,actor,`Dispute resolved: ${resolution}`);notify(o.businessId,`Спор ${o.id} решён: ${resolution}.`);notify(o.performerId,`Спор ${o.id} решён: ${resolution}.`);return o;});}
function release(actor,oid){return mutate(()=>{const o=order(oid);requireThat(hasRole(actor,'admin'),'Only admin can release demo payout.');requireThat(o.status==='approved'&&o.demoPayment&&!o.demoPayout,'Order is not eligible for demo payout.');o.demoPayout=true;o.status='completed';st().ledger.unshift({id:id('txn'),orderId:o.id,type:'demo_performer_payout',amount:share(o),createdAt:now(),demo:true});st().ledger.unshift({id:id('txn'),orderId:o.id,type:'demo_platform_commission',amount:commission(o),createdAt:now(),demo:true});log(o,actor,`Demo payout ${share(o)} KZT and commission ${commission(o)} KZT`);notify(o.performerId,`ДЕМО-выплата ${share(o)} ₸ по ${o.id} зафиксирована.`);notify(o.businessId,`Заказ ${o.id} завершён. Оставьте отзыв.`);return o;});}
function review(actor,oid,rating,text,consent){return mutate(()=>{const o=order(oid);requireThat(o.businessId===actor&&o.status==='completed','Review available only to SME after completion.');requireThat(!st().reviews.some(x=>x.orderId===oid),'Review already left.');const r=Number(rating);requireThat(Number.isInteger(r)&&r>=1&&r<=5,'Choose 1–5 stars.');requireThat(String(text||'').trim().length>=8,'Review text must have 8+ characters.');st().reviews.unshift({id:id('rev'),orderId:oid,authorId:actor,performerId:o.performerId,rating:r,text:String(text).trim().slice(0,1000),publishedConsent:!!consent,createdAt:now(),demo:true});o.review=true;log(o,actor,`Rated ${r}/5`);notify(o.performerId,`SME оставил отзыв по ${o.id}.`);return o;});}
function message(actor,oid,text){return mutate(()=>{const o=order(oid);requireThat(visible(o,actor),'You cannot access this order chat.');let txt=String(text||'').trim();requireThat(txt.length>0&&txt.length<=1500,'Сообщение: 1–1500 символов.');st().messages.push({id:id('msg'),orderId:oid,authorId:actor,text:txt,createdAt:now(),readBy:[actor]});log(o,actor,'Sent a message');[o.businessId,o.performerId,...st().users.filter(x=>x.role==='admin').map(x=>x.id)].filter(x=>x&&x!==actor).forEach(x=>notify(x,`Новое сообщение в ${o.id}.`,'message'));return o;});}
// Message read state is stored with each message. Old demo JSON without readBy remains compatible.
function unreadMessages(actor,oid=null){return st().messages.filter(m=>{
 const o=st().orders.find(x=>x.id===m.orderId);
 return !!o&&visible(o,actor)&&(!oid||m.orderId===oid)&&m.authorId!==actor&&!(Array.isArray(m.readBy)&&m.readBy.includes(actor));
}).length;}
function markThreadRead(actor,oid){
 const o=order(oid);requireThat(visible(o,actor),'You cannot access this order chat.');
 const unseen=st().messages.filter(m=>m.orderId===oid&&m.authorId!==actor&&!(Array.isArray(m.readBy)&&m.readBy.includes(actor)));
 const alerts=st().notifications.filter(n=>n.userId===actor&&n.type==='message'&&!n.read&&n.text.includes(oid));
 if(!unseen.length&&!alerts.length)return 0;
 unseen.forEach(m=>{if(!Array.isArray(m.readBy))m.readBy=[];m.readBy.push(actor);});
 alerts.forEach(n=>{n.read=true;});
 save();return unseen.length;
}
function test(actor,sid,answers){return mutate(()=>{requireThat(hasRole(actor,'performer'),'Only performer can take skill test.');const qs=window.SBTestBank[sid];requireThat(Array.isArray(qs),'Invalid test.');requireThat(Array.isArray(answers)&&answers.length===qs.length&&answers.every(x=>Number.isInteger(x)&&x>=0&&x<=2),'Ответьте на все вопросы.');const score=qs.reduce((n,q,i)=>n+(answers[i]===q.correct?1:0),0),passed=score>=3;st().skillTests.unshift({id:id('test'),userId:actor,serviceId:sid,score,total:qs.length,passed,createdAt:now()});if(passed&&!user(actor).skills.includes(sid))user(actor).skills.push(sid);notify(actor,`Тест ${sid}: ${score}/${qs.length}, ${passed?'Passed':'Not passed'}.`);return {score,total:qs.length,passed};});}
function requestQaCall(actor,input){
 requireThat(hasRole(actor,'performer'),'Only specialists can request a QA demo call.');
 requireThat(['morning','afternoon','evening'].includes(input.slot),'Select a demo time preference.');
 const note=String(input.note||'').trim(),requestId=String(input.requestId||'');
 requireThat(note.length<=500&&requestId.length>=8&&requestId.length<=100,'Invalid demo call request.');
 const previous=st().activityLog.find(entry=>entry.type==='demo_qa_call'&&entry.actorId===actor&&entry.requestId===requestId);
 if(previous)return previous;
 const entry={id:id('qa-call'),type:'demo_qa_call',actorId:actor,orderId:null,action:'Demo QA call preference recorded',slot:input.slot,note,requestId,createdAt:now(),demo:true};
 st().activityLog.unshift(entry);
 if(!save()){st().activityLog.shift();throw Error('Could not save the demo request.');}
 return entry;
}
function updateProfile(actor,input){return mutate(()=>{const u=user(actor);requireThat(u,'User missing.');const name=String(input.name||'').trim(),description=String(input.bio||'').trim();requireThat(name.length>=2&&name.length<=70,'Имя: 2–70 символов.');requireThat(description.length<=1000,'Описание: максимум 1000 символов.');u.name=name;u.bio=description;u.available=!!input.available;if(u.role==='business'){requireThat(String(input.company||'').trim().length>=2,'Компания обязательна.');u.company=String(input.company).trim().slice(0,120);}if(u.role==='performer'){u.field=String(input.field||'').trim().slice(0,100);}return u;});}
function markRead(actor,idv){return mutate(()=>{const n=st().notifications.find(x=>x.id===idv&&x.userId===actor);if(n)n.read=true;return n;});}
function markAllRead(actor){return mutate(()=>{st().notifications.filter(x=>x.userId===actor).forEach(x=>x.read=true);});}
function changeLanguage(lang){return mutate(()=>{requireThat(['ru','kz','en'].includes(lang),'Unsupported language.');st().settings.language=lang;});}
function getPortfolio(uid){return st().orders.filter(o=>o.performerId===uid&&o.status==='completed').map(o=>({order:o,review:st().reviews.find(r=>r.orderId===o.id)}));}
function wallet(uid){
 requireThat(hasRole(uid,'performer'),'Wallet is available to specialists only.');
 const credits=st().ledger.filter(entry=>entry.type==='demo_performer_payout'&&st().orders.some(o=>o.id===entry.orderId&&o.performerId===uid));
 const withdrawals=st().ledger.filter(entry=>entry.type==='demo_withdrawal'&&entry.userId===uid);
 const earned=credits.reduce((sum,entry)=>sum+entry.amount,0),withdrawn=withdrawals.reduce((sum,entry)=>sum+entry.amount,0);
 const pending=st().orders.filter(o=>o.performerId===uid&&o.status==='approved').reduce((sum,o)=>sum+share(o),0);
 return {earned,withdrawn,pending,available:Math.max(0,earned-withdrawn),credits,withdrawals};
}
function withdraw(actor,input){
 // Refresh persisted funds before confirming a demo withdrawal.
 window.SBStorage.load();
 requireThat(hasRole(actor,'performer'),'Wallet is available to specialists only.');
 const amount=Number(input.amount),lastFour=String(input.lastFour||''),requestId=String(input.requestId||'');
 requireThat(Number.isSafeInteger(amount)&&amount>0,'Enter a positive whole amount.');
 requireThat(/^\d{4}$/.test(lastFour),'Enter four demo account digits.');
 requireThat(requestId.length>=8&&requestId.length<=100,'Invalid withdrawal request.');
 const previous=st().ledger.find(entry=>entry.type==='demo_withdrawal'&&entry.requestId===requestId&&entry.userId===actor);
 if(previous){requireThat(previous.amount===amount&&previous.lastFour===lastFour,'Withdrawal request already used.');return previous;}
 requireThat(amount<=wallet(actor).available,'Insufficient available funds.');
 const entry={id:id('withdrawal'),type:'demo_withdrawal',userId:actor,amount,lastFour,provider:'freedom',requestId,createdAt:now(),demo:true};
 st().ledger.unshift(entry);
 if(!save()){st().ledger.shift();throw Error('Could not save the withdrawal.');}
 return entry;
}
function stats(uid){const d=st(),r=user(uid)?.role;const os=r==='admin'?d.orders:r==='business'?d.orders.filter(o=>o.businessId===uid):d.orders.filter(o=>o.performerId===uid);return {all:os.length,active:os.filter(o=>!['completed','refunded','cancelled'].includes(o.status)).length,complete:os.filter(o=>o.status==='completed').length,pending:os.filter(o=>['qa_review','client_review','disputed'].includes(o.status)).length,unread:d.notifications.filter(x=>x.userId===uid&&!x.read).length,payouts:d.ledger.filter(x=>x.type==='demo_performer_payout'&&(r==='performer'?order(x.orderId).performerId===uid:true)).reduce((a,b)=>a+b.amount,0),commissions:d.ledger.filter(x=>x.type==='demo_platform_commission').reduce((a,b)=>a+b.amount,0)};}
window.SBData={requestQaCall,wallet,withdraw,user,service,order,hasRole,visible,qualification,share,commission,priceFor,createOrder,pay,cancel,apply,assign,start,submit,qa,revision,accept,dispute,resolve,release,review,message,unreadMessages,markThreadRead,test,updateProfile,markRead,markAllRead,changeLanguage,getPortfolio,stats,id,workingDeadline};
})();