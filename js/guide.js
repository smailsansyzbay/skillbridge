(function(){
'use strict';
const KEY='skillbridge_guide_v1';
let preferences={};
try{const saved=JSON.parse(localStorage.getItem(KEY));if(saved&&typeof saved==='object'&&!Array.isArray(saved))preferences=saved;}catch(error){}
const text=(ru,kz,en)=>window.SBI18n.text(ru,kz,en);
function settings(uid){const saved=preferences[uid];return saved&&typeof saved==='object'?saved:{collapsed:true,selected:null};}
function update(uid,patch){preferences[uid]={...settings(uid),...patch};try{localStorage.setItem(KEY,JSON.stringify(preferences));}catch(error){}}
function plan(uid){
 const user=SBData.user(uid);if(!user||!['business','performer'].includes(user.role))return null;
 const data=SBStorage.state(),business=user.role==='business';
 const orders=data.orders.filter(order=>business?order.businessId===uid:order.performerId===uid).sort((a,b)=>new Date(b.updatedAt)-new Date(a.updatedAt));
 const step=(id,title,description,done,action,label)=>({id,title,description,done,action,label});
 const openOrder=order=>order?{type:'order',id:order.id}:{type:'route',route:business?'catalog':'opportunities'};
 const orderLabel=order=>order?text('Открыть заказ','Тапсырысты ашу','Open order'):business?text('Выбрать услугу','Қызмет таңдау','Choose a service'):text('Найти задание','Тапсырма табу','Find a task');
 let steps;
 if(business){
  const unpaid=orders.find(order=>order.status==='awaiting_demo_payment'),review=orders.find(order=>order.status==='client_review'),current=review||orders.find(order=>!['completed','refunded','cancelled'].includes(order.status))||orders.find(order=>['approved','completed'].includes(order.status));
  const hasMessage=data.messages.some(message=>message.authorId===uid&&orders.some(order=>order.id===message.orderId));
  steps=[
   step('brief',text('Расскажем о задаче','Тапсырманы сипаттайық','Describe the task'),text('Выберите услугу в каталоге или «Свой заказ». В брифе укажите результат, материалы и критерии готовности — так исполнителю проще вас понять.','Каталогтан қызметті немесе «Жеке тапсырысты» таңдаңыз. Брифте нәтиже, материалдар мен дайындық өлшемдерін көрсетіңіз.','Choose a catalog service or Custom Order. Explain the deliverable, materials and acceptance criteria so the specialist knows what you need.'),orders.length>0,{type:'route',route:'catalog'},text('Открыть каталог','Каталогты ашу','Open catalog')),
   step('payment',text('Подтвердим условия','Шарттарды растайық','Confirm the terms'),unpaid?text('Заказ создан. Проверьте цену, срок и долю платформы, затем подтвердите демо-оплату Freedom. Реальных списаний нет.','Тапсырыс жасалды. Баға, мерзім және платформа үлесін тексеріп, Freedom демо төлемін растаңыз. Нақты ақша алынбайды.','Your order is ready. Check the price, timeline and commission, then confirm the Freedom demo payment. No real money is charged.'):text('После создания заказа вы увидите все суммы до подтверждения. Подбор исполнителя начинается после демо-оплаты.','Тапсырыс жасалған соң барлық сома растауға дейін көрсетіледі. Орындаушыны іріктеу демо төлемнен кейін басталады.','After creating an order, review all amounts before confirming. Matching begins after the demo payment.'),orders.some(order=>order.demoPayment),unpaid?{type:'pay',id:unpaid.id}:openOrder(current),unpaid?text('Проверить оплату','Төлемді тексеру','Review payment'):orderLabel(current)),
   step('conversation',text('Обсудим детали','Мәліметтерді талқылайық','Talk through the details'),text('В сообщениях заказа можно уточнить задачу и договорённости. Переписка сохраняется в этом браузере. Не передавайте пароли и реальные личные данные.','Тапсырыс хабарламаларында тапсырма мен келісімдерді нақтылаңыз. Хаттар осы браузерде сақталады. Құпиясөз бен нақты жеке деректерді жібермеңіз.','Use the order conversation to clarify details and keep decisions together. Messages stay in this browser. Use fictional data and do not share passwords.'),hasMessage,current?{type:'messages',id:current.id}:{type:'route',route:'catalog'},current?text('Открыть переписку','Хат алмасуды ашу','Open conversation'):text('Сначала создать заказ','Алдымен тапсырыс жасау','Create an order first')),
   step('review',text('Проверим результат','Нәтижені тексерейік','Review the result'),review?text('Работа прошла QA и ждёт вас. Сверьте её с брифом. Можно принять результат, попросить предусмотренную доработку или открыть спор.','Жұмыс QA тексеруінен өтті және сізді күтуде. Брифпен салыстырыңыз. Нәтижені қабылдауға, түзету сұрауға немесе дау ашуға болады.','The work passed QA and is ready for your review. Compare it with the brief, then accept it, request the included revision or open a dispute.'):text('Приёмка появится после сдачи работы и проверки QA. Пока можно посмотреть статус заказа. Создавать новый заказ для приёмки не нужно.','Қабылдау жұмыс тапсырылып, QA тексерілгеннен кейін қолжетімді болады. Әзірше тапсырыс мәртебесін қараңыз. Жаңа тапсырыс жасаудың қажеті жоқ.','Acceptance becomes available after submission and QA review. For now, check the order status. You do not need a new order to review the work.'),orders.some(order=>['approved','completed'].includes(order.status)),openOrder(current),orderLabel(current)),
   step('finances',text('Проверим финансы','Қаржыны тексерейік','Check your finances'),text('В «Финансах» видны оплаты и возвраты. Если возник спор, возврат сначала рассматривает администратор. После одобрения сумма доступна для демо-вывода Freedom.','«Қаржыда» төлемдер мен қайтарулар көрінеді. Дау болса, қайтаруды алдымен әкімші қарайды. Мақұлданған сома Freedom демо шығаруға қолжетімді.','Finances shows payments and refunds. If there is a dispute, the administrator reviews the refund first. An approved refund becomes available for the Freedom demo withdrawal.'),orders.some(order=>order.status==='completed')||SBData.wallet(uid).withdrawals.length>0,{type:'route',route:'customer-finance'},text('Открыть финансы','Қаржыны ашу','Open finances'))
  ];
 }else{
  const active=orders.find(order=>['assigned','in_progress','revision_requested'].includes(order.status)),delivered=orders.find(order=>order.delivery),paid=orders.some(order=>order.demoPayout&&order.status==='completed');
  steps=[
   step('profile',text('Познакомимся','Танысайық','Introduce yourself'),text('Добавьте в профиль направление работы и пару слов о своём опыте. Отметьте, готовы ли вы сейчас брать задания.','Профильге жұмыс бағытыңыз бен тәжірибеңізді жазыңыз. Қазір тапсырма алуға дайын екеніңізді белгілеңіз.','Add your area of work and a short introduction to your profile. Set your availability for new tasks.'),!!(user.bio||user.field),{type:'route',route:'profile'},text('Открыть профиль','Профильді ашу','Open profile')),
   step('skills',text('Покажем ваши навыки','Дағдыларыңызды көрсетейік','Show your skills'),text('Выберите направление в тестах. В четырёх ситуациях нужны три верных ответа. После теста есть разбор и демо-связь с QA-менеджером.','Тесттен бағыт таңдаңыз. Төрт жағдайдың үшеуіне дұрыс жауап қажет. Соңында түсіндірме мен QA-менеджерге демо байланыс бар.','Choose a discipline in Skills Tests. Answer three of four scenarios correctly. Review the explanations and use the QA contact mockup if you need help.'),data.skillTests.some(test=>test.userId===uid&&test.passed),{type:'route',route:'screening'},text('Выбрать тест','Тест таңдау','Choose a test')),
   step('task',text('Найдём подходящее задание','Сәйкес тапсырма табайық','Find a suitable task'),text('Смотрите требования и срок. Доля исполнителя после комиссии показана в карточке заказа. Для отклика нужен тест соответствующего навыка. После отклика исполнителя назначает администратор.','Талап пен мерзімді қараңыз. Комиссиядан кейінгі орындаушы үлесі тапсырыс карточкасында көрсетіледі. Өтінім беру үшін сәйкес дағды тесті қажет. Өтінімнен кейін орындаушыны әкімші тағайындайды.','Check the requirements and deadline. The order page shows your share after commission. Pass the relevant skills test to apply. The administrator assigns a specialist after applications.'),orders.length>0||data.applications.some(application=>application.performerId===uid),{type:'route',route:'opportunities'},text('Найти задания','Тапсырмалар табу','Browse tasks')),
   step('delivery',text('Подготовим результат','Нәтижені дайындайық','Prepare your delivery'),active?text('Есть назначенное задание. Откройте его, изучите бриф и начните работу. Сдайте файлы и описание результата через карточку заказа.','Тағайындалған тапсырма бар. Оны ашып, брифті оқып, жұмысты бастаңыз. Файл мен нәтиже сипаттамасын тапсырыс карточкасында беріңіз.','You have an assigned task. Open it, read the brief and start work. Submit your deliverable and a description through the order page.'):text('Сдать результат можно после назначения заказа. После сдачи следите за QA и сообщениями; если нужна доработка, комментарий появится в заказе.','Нәтиже тапсырыс тағайындалғаннан кейін тапсырылады. Одан кейін QA мен хабарларды бақылаңыз; түзету қажет болса, пікір тапсырыста көрінеді.','Submit work after a task is assigned. Then follow QA and messages. If a revision is needed, the order will show the feedback.'),!!delivered,openOrder(active||orders.find(order=>['qa_review','client_review','approved','completed'].includes(order.status))),orderLabel(active||orders.find(order=>['qa_review','client_review','approved','completed'].includes(order.status)))),
   step('reward',text('Получим вознаграждение','Сыйақыны алайық','Track your reward'),text('После приёмки заказчиком администратор подтверждает начисление. В «Вознаграждениях» появится доступный баланс и демо-вывод Freedom. Настоящих переводов нет.','Тапсырыс беруші қабылдаған соң әкімші сыйақыны растайды. «Сыйақыларда» баланс пен Freedom демо шығару пайда болады. Нақты аударым жоқ.','After customer acceptance, the administrator confirms the credit. Earnings shows your available balance and the Freedom demo withdrawal. No real money is transferred.'),paid,{type:'route',route:'earnings'},text('Открыть вознаграждения','Сыйақыларды ашу','Open earnings'))
  ];
 }
 return {role:user.role,steps,completed:steps.filter(step=>step.done).length};
}
function render(){
 const uid=SBApp.uid(),data=plan(uid);
 if(!data||SBApp.route()==='landing'||SBApp.mobileOpen())return '';
 const prefs=settings(uid),h=SBUI.h,steps=data.steps;
 const selected=steps.find(step=>step.id===prefs.selected)||steps.find(step=>!step.done)||steps[steps.length-1];
 const name=text('Бриджи','Бриджи','Bridgy');
 const mascot='<img src="assets/guide-mascot.png" alt="" width="80" height="80">';
 const toggle=launcher();
 if(prefs.collapsed)return '<div class="guide-widget">'+toggle+'</div>';
 return '<div class="guide-widget is-open"><aside id="skillbridge-guide" class="guide-panel" aria-labelledby="guide-title"><div class="guide-heading">'+mascot+'<div><h2 id="guide-title" tabindex="-1">'+name+'</h2><p>'+text('Помогу разобраться','Түсінуге көмектесемін','Here to help you get started')+'</p></div><button class="guide-dismiss" data-action="guide-toggle" aria-label="'+text('Свернуть гид','Гидті жинау','Collapse guide')+'">×</button></div><div class="guide-progress"><span>'+text('Ваш путь','Сіздің жолыңыз','Your journey')+'</span><strong>'+data.completed+' / '+steps.length+'</strong><progress value="'+data.completed+'" max="'+steps.length+'" aria-label="'+text('Выполнено шагов','Орындалған қадамдар','Steps completed')+'"></progress></div><nav class="guide-steps" aria-label="'+text('Шаги гида','Гид қадамдары','Guide steps')+'">'+steps.map((step,index)=>'<button data-action="guide-step" data-step="'+step.id+'" class="'+(step.id===selected.id?'selected':'')+'" aria-current="'+(step.id===selected.id?'step':'false')+'"><span>'+(step.done?'✓':index+1)+'</span>'+h(step.title)+(step.done?'<small>'+text('Готово','Дайын','Done')+'</small>':'')+'</button>').join('')+'</nav><section class="guide-advice"><h3 tabindex="-1">'+h(selected.title)+'</h3><p>'+h(selected.description)+'</p><button class="btn btn-primary" data-action="guide-go" data-step="'+selected.id+'">'+h(selected.label)+' →</button></section><div class="guide-footer"><span>'+text('Прогресс — по вашим действиям','Ілгерілеу әрекеттеріңізге байланысты','Progress follows your actual actions')+'</span><button data-action="guide-reset">'+text('К началу','Басына','Start here')+'</button></div></aside>'+toggle+'</div>';
}
function handle(action,dataset){
 const uid=SBApp.uid(),data=plan(uid);if(!data)return;
 if(action==='guide-toggle'){update(uid,{collapsed:!settings(uid).collapsed});SBApp.render(true);document.querySelector(settings(uid).collapsed?'#guide-launcher':'#guide-title')?.focus({preventScroll:true});return;}
 if(action==='guide-step'){update(uid,{selected:dataset.step});SBApp.render(true);return;}
 if(action==='guide-reset'){update(uid,{selected:data.steps[0].id});SBApp.render(true);return;}
 if(action!=='guide-go')return;
 const step=data.steps.find(step=>step.id===dataset.step);if(!step)return;
 update(uid,{collapsed:true,selected:null});
 const target=step.action;
 if(target.type==='order'){SBApp.navigate('order-detail',target.id);return;}
 if(target.type==='pay'){SBApp.open('pay',{oid:target.id});return;}
 if(target.type==='messages'){SBApp.inboxState().threadId=target.id;SBApp.inboxState().mobileChat=true;SBApp.navigate('messages');return;}
 SBApp.navigate(target.route);
}
function launcher(){
 const prefs=settings(SBApp.uid());
 return '<button id="guide-launcher" class="guide-launcher" data-action="guide-toggle" aria-expanded="'+(!prefs.collapsed)+'" aria-controls="skillbridge-guide" aria-label="'+text('Помощь Бриджи','Бриджи көмегі','Bridgy help')+'"><img src="assets/guide-mascot.png" alt="" width="96" height="96"><span>'+text('Гид','Гид','Guide')+'</span></button>';
}
window.SBGuide={plan,render,handle,launcher};
})();
