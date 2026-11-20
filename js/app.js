/* SkillBridge Frontend Prototype — browser-only demo. All accounts and transactions are fictional. */
(function(){
'use strict';
const $=s=>document.querySelector(s);
const state={uid:null,route:'landing',catalogDepartment:null,orderId:null,mobile:false,filters:{query:'',status:'',category:''},modal:null,inbox:{threadId:null,query:'',filter:'all',mobileChat:false,drafts:{}}};
const d=()=>window.SBStorage.state();
const ui=()=>window.SBUI;
const str=(s)=>String(s??'');
const esc=(s)=>str(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const isKz=()=>d().settings.language==='kz';
const term=(ru,kz,en)=>window.SBI18n.text(ru,kz,en);
const money=n=>ui().money(n);
const getUser=()=>window.SBData.user(state.uid);
const getOrder=oid=>window.SBData.order(oid);
const service=sid=>window.SBData.service(sid);
const fmt=html=>html;
const formField=(name,label,value='',type='text',more='')=>`<div class="field"><label for="f-${esc(name)}">${esc(label)}</label><input id="f-${esc(name)}" name="${esc(name)}" type="${type}" value="${esc(value)}" ${more}></div>`;
const textarea=(name,label,value='',more='')=>`<div class="field span2"><label for="f-${esc(name)}">${esc(label)}</label><textarea id="f-${esc(name)}" name="${esc(name)}" rows="4" ${more}>${esc(value)}</textarea></div>`;
const button=(label='Сохранить')=>`<button class="btn btn-primary" type="submit">${esc(label)}</button>`;
const actions=(submitLabel)=>`<div class="span2 modal-footer"><button type="button" class="btn btn-line" data-action="close-modal">${term('Отмена','Болдырмау')}</button>${button(submitLabel)}</div>`;
const info=(txt)=>`<div class="info" style="margin:12px 0">${txt}</div>`;
const warn=(txt)=>`<div class="warn" style="margin:12px 0">${txt}</div>`;
function toast(msg,error=false){const root=$('#toast-root');if(!root)return;const el=document.createElement('div');el.className='toast'+(error?' error':'');el.setAttribute('role',error?'alert':'status');el.textContent=(error?'⚠  ':'✓  ')+msg;root.appendChild(el);setTimeout(()=>{el.remove()},4400);}
function modal(title,body,wide=false){return `<div class="modal-overlay" data-modal-backdrop="true"><section class="modal${wide?' wide':''}" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="modal-head"><div><span class="eyebrow">SKILLBRIDGE · DEMO</span><h2>${esc(title)}</h2></div><button type="button" class="btn btn-line btn-icon" data-action="close-modal" aria-label="${term('Закрыть','Жабу')}">✕</button></div><div class="modal-body">${body}</div></section></div>`;}
function modalContent(){const m=state.modal;if(!m)return '';const uid=state.uid,u=getUser();let title='',body='',wide=false;
 switch(m.type){
 case 'account':{
  title=term('Начать демонстрацию','Демонстрацияны бастау');wide=true;
  const roles=m.role?[m.role]:['business','performer'];
  body=`<p class="muted">${term('Выберите демо-профиль, чтобы посмотреть, как работает платформа.','Платформаның жұмысын көру үшін демо-профильді таңдаңыз.')}</p><div class="demo-account-groups">${roles.filter(role=>['business','performer'].includes(role)).map(role=>`<section class="demo-account-group"><h3>${role==='business'?term('Заказчики','Тапсырыс берушілер'):term('Исполнители','Орындаушылар')}</h3>${d().users.filter(user=>user.role===role).map(user=>`<button type="button" class="select-account" data-action="switch-account" data-uid="${esc(user.id)}"><span class="avatar">${esc(user.name.slice(0,2))}</span><span class="name"><strong>${esc(user.name)}</strong><small>${esc(user.company||ui().loc(user.field)||ui().t(role==='business'?'roleBusiness':'rolePerformer'))}</small></span><span>→</span></button>`).join('')||`<p class="muted">${term('Демо-профилей пока нет.','Демо-профильдер әзірге жоқ.')}</p>`}<button type="button" class="btn btn-line demo-add-user" data-action="add-demo-user" data-role="${role}">＋ ${role==='business'?term('Добавить заказчика','Тапсырыс берушіні қосу'):term('Добавить исполнителя','Орындаушыны қосу')}</button></section>`).join('')}</div>`;break;
 }
 case 'new-demo-user':{
  const role=m.role==='business'?'business':'performer';
  title=role==='business'?term('Новый заказчик','Жаңа тапсырыс беруші'):term('Новый исполнитель','Жаңа орындаушы');
  body=`<p class="hint">${term('Демо-профиль сохранится в этом браузере и в экспортируемом JSON.','Демо-профиль осы браузерде және экспортталған JSON файлында сақталады.')}</p><form data-form="new-demo-user" class="form-grid"><input type="hidden" name="role" value="${role}">
  ${formField('name',term('Имя','Аты'),'','text','required minlength="2" maxlength="70"')}
  ${role==='business'?formField('company',term('Название компании','Компания атауы'),'','text','required minlength="2" maxlength="120"'):formField('field',term('Направление работы (необязательно)','Жұмыс бағыты (міндетті емес)'),'','text','maxlength="100"')}
  ${textarea('bio',term('О себе (необязательно)','Өзіңіз туралы (міндетті емес)'),'','maxlength="1000"')}
  ${actions(term('Создать и открыть профиль','Профильді жасап ашу'))}</form>`;break;
 }
 case 'refund-request':{
  title=term('Запросить возврат','Қайтаруды сұрау','Request a refund');
  const orders=d().orders.filter(order=>order.businessId===uid&&['client_review','revision_requested'].includes(order.status));
  body=`<p class="hint">${term('Возврат рассматривает администратор через спор по заказу. Выберите результат на проверке или заказ, возвращённый на доработку, и опишите причину.','Қайтаруды әкімші тапсырыс дауы арқылы қарайды. Тексерудегі немесе түзетуге жіберілген тапсырысты таңдап, себебін жазыңыз.','The administrator reviews refunds through the order dispute process. Choose a deliverable under review or an order returned for revision, then explain the issue.')}</p>${orders.length?`<form data-form="refund-request"><div class="field"><label for="refund-order">${ui().t('orders')}</label><select id="refund-order" name="oid" required>${orders.map(order=>`<option value="${esc(order.id)}">${esc(order.id)} · ${esc(order.title)} · ${money(window.SBData.priceFor(order))}</option>`).join('')}</select></div>${actions(term('Указать причину','Себебін көрсету','Explain the issue'))}</form>`:`<div class="info">${term('Пока нет заказов, для которых доступен новый запрос возврата. Проверьте статусы в разделе «Мои заказы». Уже открытые споры отображаются в финансах.','Жаңа қайтару сұрауына қолжетімді тапсырыс жоқ. «Менің тапсырыстарым» бөлімінен мәртебелерді қараңыз. Ашылған даулар қаржы бөлімінде көрінеді.','No orders are eligible for a new refund request right now. Check My Orders for their status. Existing disputes appear in Finances.')}</div><button class="btn btn-primary" data-action="navigate" data-route="orders">${ui().t('orders')}</button>`}`;break;
 }
 case 'withdraw':{
  const balance=window.SBData.wallet(uid);
  title=term('Вывод на счёт','Шотқа шығару','Withdraw to account');
  body=`<p class="hint">${term('Только макет. Укажите любые четыре вымышленные цифры счёта.','Тек макет. Шоттың ойдан алынған төрт санын енгізіңіз.','A mockup only. Enter any four fictional account digits.')}</p><div class="withdraw-available">${term('Доступно','Қолжетімді','Available')} <strong>${money(balance.available)}</strong></div><form data-form="withdraw" class="form-grid"><input type="hidden" name="requestId" value="${esc(m.requestId)}">${formField('amount',term('Сумма, ₸','Сома, ₸','Amount, ₸'),balance.available,'number','required min="1" max="'+balance.available+'" step="1"')}${formField('lastFour',term('Демо-счёт Freedom · последние 4 цифры','Freedom демо шоты · соңғы 4 сан','Freedom demo account · last 4 digits'),'','text','required inputmode="numeric" pattern="[0-9]{4}" minlength="4" maxlength="4" autocomplete="off"')}${actions(term('Продолжить','Жалғастыру','Continue'))}</form>`;break;
 }
 case 'withdraw-confirm':{
  title=term('Подтвердить демо-вывод','Демо шығаруды растау','Confirm demo withdrawal');
  body=`<div class="payment-preview freedom"><span class="payment-mark">F</span><h3>Freedom · •••• ${esc(m.lastFour)}</h3><strong class="payment-total">${money(m.amount)}</strong><p>${term('Это запись в демо-истории. Реального перевода на банковский счёт не будет.','Бұл демо тарихтағы жазба. Банк шотына нақты аударым жасалмайды.','This records a demo transaction. No money will be sent to a bank account.')}</p></div><form data-form="withdraw-confirm">${actions(term('Подтвердить демо-вывод','Демо шығаруды растау','Confirm demo withdrawal'))}</form>`;break;
 }
 case 'service-info':{
  const srv=service(m.sid);if(!srv)return '';
  title=ui().loc(srv.title);wide=true;
  const department=window.SBCatalog.departments.find(item=>item.id===srv.department);
  body=`<div class="service-preview"><span class="tag neutral">${esc(ui().loc(department?.title))}</span><p class="service-preview-intro">${esc(ui().loc(srv.detail))}</p><h3>${term('Что вы получите','Не аласыз','What you will receive')}</h3><p>${esc(ui().loc(srv.deliverable))}</p><h3>${term('Как принимается работа','Жұмыс қалай қабылданады','How the work is reviewed')}</h3><ul class="check-list">${ui().loc(srv.criteria).map(item=>`<li>${ui().ico('check')}<span>${esc(item)}</span></li>`).join('')}</ul><div class="service-preview-footer"><strong>${money(srv.price)}</strong><span>${term('Демонстрационный бюджет · срок уточняется в брифе','Демо бюджет · мерзім брифте нақтыланады','Demo budget · confirm the timeline in the brief')}</span></div><button class="btn btn-primary" data-action="start-order" data-sid="${esc(srv.id)}">${term('Составить заказ','Тапсырыс құрастыру','Prepare an order')} →</button></div>`;break;
 }
 case 'order':{
  const custom=m.sid==='custom',srv=service(custom?(d().services.find(item=>item.department===state.catalogDepartment)?.id||'catalog'):m.sid);if(!srv){return '';}title=term('Новое микро-задание','Жаңа шағын тапсырма');wide=true;
  body=`<div class="info"><strong>${custom?term('Свой заказ','Жеке тапсырыс'):esc(ui().loc(srv.title))}</strong> · ${custom?term('Ваш срок и цена · комиссия 15%','Сіздің мерзіміңіз бен бағаңыз · комиссия 15%'):money(srv.price)+' · '+term('срок 3 рабочих дня','мерзім 3 жұмыс күні')}</div>
  <form data-form="create-order" class="form-grid"><div class="order-form-intro span2"><span class="tag neutral">${term('Бриф заказа','Тапсырыс брифі','Order brief')}</span><h3>${term('Расскажите, какой результат вам нужен','Қандай нәтиже қажет екенін айтыңыз','Tell us what a good result looks like')}</h3><p>${custom?term('Определите задачу, бюджет и срок. Выберите услугу, которая ближе всего к нужной компетенции.','Тапсырма, бюджет пен мерзімді белгілеңіз. Қажетті дағдыға жақын қызметті таңдаңыз.','Set the task, budget and timeline. Choose the closest competency category.'):esc(ui().loc(srv.deliverable))}</p></div><input type="hidden" name="custom" value="${custom?'yes':'no'}">${custom?`<div class="field span2"><label>${term('Необходимая компетенция','Қажетті дағды')}</label><select name="sid">${d().services.map(s=>`<option value="${s.id}" ${s.id===srv.id?'selected':''}>${esc(ui().loc(s.title))}</option>`).join('')}</select><small class="hint">${term('Исполнитель подбирается по тесту выбранной категории. Результат проверяется по её критериям QA.','Орындаушы таңдалған санат тесті бойынша іріктеледі. Нәтиже сол санаттың QA талаптарымен тексеріледі.')}</small></div>`: `<input type="hidden" name="sid" value="${esc(srv.id)}">`}
  ${formField('title',term('Название задания','Тапсырма атауы'),custom?'':ui().loc(srv.title),'text','required minlength="5" maxlength="130"')}
  ${custom?formField('days',term('Срок в рабочих днях','Жұмыс күндерінің саны'),'3','number','required min="1" max="365" step="1"')+formField('price',term('Цена заказа, ₸','Тапсырыс бағасы, ₸'),'20000','number','required min="1" max="10000000" step="1"'):formField('deadline',term('Срок выполнения','Орындалу мерзімі'),term('3 рабочих дня','3 жұмыс күні'),'text','disabled')}
  ${textarea('brief',term('Подробное техническое задание','Техникалық тапсырманың толық сипаттамасы'),'', 'required minlength="25" maxlength="3500" placeholder="'+esc(term('Что нужно получить? Укажите исходные данные, состав результата и критерии приемки.','Не алу керек? Бастапқы ақпарат, нәтиже және қабылдау шарттары.'))+'"')}
  <div class="brief-section-heading span2"><h3>${term('Детали, которые помогут исполнителю','Орындаушыға көмектесетін мәліметтер','Details that help your specialist')}</h3><p>${term('Заполните то, что уже знаете. Остальное можно уточнить в чате заказа.','Білетін мәліметтерді толтырыңыз. Қалғанын тапсырыс чатында нақтылауға болады.','Share what you already know. Clarify the rest in the order conversation.')}</p></div>
  ${textarea('goal',term('Цель и контекст','Мақсат пен контекст','Goal and context'),'','maxlength="1500" placeholder="'+esc(term('Какую задачу бизнеса решаем? Что должно измениться после выполнения?','Қандай бизнес мәселесін шешеміз? Жұмыстан кейін не өзгеруі керек?','What business problem are we solving? What should change?'))+'"')}
  ${formField('audience',term('Для кого делаем','Кімге арналған','Who is this for?'),'','text','maxlength="1500" placeholder="'+esc(term('Аудитория, рынок, язык, регион','Аудитория, нарық, тіл, аймақ','Audience, market, language, region'))+'"')}
  ${formField('deliverables',term('Формат и объём результата','Нәтиженің форматы мен көлемі','Output format and scope'),'','text','maxlength="1500" placeholder="'+esc(term('Например, 10 слайдов, таблица XLSX или 5 текстов','Мысалы, 10 слайд, XLSX кестесі немесе 5 мәтін','For example, 10 slides, an XLSX spreadsheet or 5 texts'))+'"')}
  ${textarea('materials',term('Материалы и ориентиры','Материалдар мен мысалдар','Materials and references'),'','maxlength="1500" placeholder="'+esc(term('Ссылки, примеры, брендбук, исходные данные. Не передавайте пароли.','Сілтемелер, мысалдар, бренд нұсқаулығы, бастапқы деректер. Құпиясөз жібермеңіз.','Links, examples, brand guidelines and source data. Do not share passwords.'))+'"')}
  ${textarea('acceptance',term('Критерии готовности','Дайындық өлшемдері','What does done look like?'),'','maxlength="1500" placeholder="'+esc(term('Что обязательно должно быть в результате? Как вы будете его проверять?','Нәтижеде не міндетті болуы керек? Оны қалай тексересіз?','What must be included? How will you check the result?'))+'"')}
  ${textarea('notes',term('Дополнительные условия','Қосымша шарттар'),'', 'maxlength="2000"')}
  <div class="field span2"><label>${term('Файл с исходными данными (необязательно, до 128 KB для текстовых файлов)','Бастапқы файл (міндетті емес)')}</label><input type="file" name="source" accept=".txt,.csv,.json,.md,.tsv,.xlsx,.pdf"><small class="hint">${term('Только синтетические данные. Для бинарных файлов сохраняются только метаданные.','Тек демо деректер. Кейбір файлдардың тек атауы сақталады.')}</small></div>
  <div class="span2">${warn('<strong>DEMO ONLY.</strong> '+term('Оплата на следующем шаге — имитация; банковские карты не требуются.','Келесі төлем — имитация; карта қажет емес.'))}</div>${actions(term('Создать заказ','Тапсырыс жасау'))}</form>`;break;
 }
 case 'pay':{
  const o=getOrder(m.oid);title=term('Подтвердить демо-оплату','Демо төлемді растау');
  body=`<div class="surface" style="margin-bottom:14px"><h3>${esc(o.title)}</h3><div class="metric-line"><span>${term('Сумма заказа','Тапсырыс сомасы')}</span><strong>${money(window.SBData.priceFor(o))}</strong></div><div class="metric-line"><span>${ui().t('performerShare')+' · 85%'}</span><strong>${money(window.SBData.share(o))}</strong></div><div class="metric-line"><span>SkillBridge 15%</span><strong>${money(window.SBData.commission(o))}</strong></div></div>
 ${warn('<strong>DEMO ONLY — No real money is transferred.</strong><br>'+term('Операция создаст запись в JSON. Ни карта, ни банковский счет не используются.','Тек JSON ішінде жазба жасалады. Банк карта қажет емес.'))}
 <form data-form="pay"><input type="hidden" name="oid" value="${esc(o.id)}"><fieldset class="payment-methods"><legend>${term('Способ демо-оплаты','Демо төлем тәсілі')}</legend><label class="payment-option freedom"><input type="radio" name="provider" value="freedom" required checked><span class="payment-mark">F</span><span><strong>Freedom</strong><small>${term('Макет оплаты','Төлем макеті')}</small></span></label></fieldset>${actions(term('Продолжить','Жалғастыру'))}</form>`;break;
 }
 case 'payment-preview':{
  const o=getOrder(m.oid),provider='Freedom';
  title=provider+' · '+term('Демо-оплата','Демо төлем');
  body=`<div class="payment-preview freedom"><span class="payment-mark">${provider[0]}</span><h3>${esc(provider)}</h3><p>${esc(o.title)}</p><strong class="payment-total">${money(window.SBData.priceFor(o))}</strong><p>${term('Макет подтверждения. Данные карты и банковского приложения не требуются.','Растау макеті. Карта немесе банк қосымшасының деректері қажет емес.')}</p></div><form data-form="confirm-demo-payment"><input name="oid" type="hidden" value="${esc(o.id)}"><input name="provider" type="hidden" value="freedom">${actions(term('Подтвердить демо-оплату','Демо төлемді растау'))}</form>`;break;
 }
 case 'test':{
  const srv=service(m.sid);if(!srv)return '';
  const questions=window.SBTestBank[m.sid];title=term('Проверка навыков','Дағдыларды тексеру','Skills assessment');wide=true;
  body=`<div class="assessment-intro"><span class="tag neutral">${esc(ui().loc(window.SBCatalog.departments.find(item=>item.id===srv.skillGroup)?.title||srv.title))}</span><h3>${term('Как бы вы поступили в работе?','Жұмыста қалай әрекет етер едіңіз?','How would you handle the work?')}</h3><p>${term('Прочитайте ситуацию и выберите самый обоснованный вариант. Четыре практических задания, для прохождения нужны три верных ответа. После отправки вы увидите объяснения.','Жағдайды оқып, ең негізді нұсқаны таңдаңыз. Төрт практикалық тапсырманың үшеуіне дұрыс жауап беру қажет. Жібергеннен кейін түсіндірмелер ашылады.','Read each scenario and choose the most well-founded approach. There are four practical questions; three correct answers are required to pass. Explanations appear after submission.')}</p></div><form data-form="skill-test" class="assessment-form"><input type="hidden" name="sid" value="${esc(m.sid)}"><div class="assessment-progress"><span id="assessment-progress-label" aria-live="polite">0 / ${questions.length} ${term('ответов','жауап','answered')}</span><progress id="assessment-progress" value="0" max="${questions.length}" aria-labelledby="assessment-progress-label"></progress></div>
  ${questions.map((question,i)=>`<fieldset class="assessment-question"><legend><span>${i+1} / ${questions.length}</span> ${esc(ui().loc(question.q))}</legend><p class="assessment-scenario">${esc(ui().loc(question.scenario))}</p><div class="assessment-options">${question.a.map((answer,j)=>`<label><input type="radio" name="q${i}" value="${j}" required><span>${esc(ui().loc(answer))}</span></label>`).join('')}</div></fieldset>`).join('')}${actions(term('Проверить ответы','Жауаптарды тексеру','Review my answers'))}</form>`;break;
 }
 case 'test-result':{
  const questions=window.SBTestBank[m.sid],result=m.result;title=term('Результат проверки','Тексеру нәтижесі','Assessment result');wide=true;
  body=`<div class="assessment-result ${result.passed?'passed':'retry'}"><span class="assessment-score">${result.score} / ${result.total}</span><div><h3>${result.passed?term('Хорошая работа!','Жарайсыз!','Well done!'):term('Есть что разобрать','Талқылайтын тұстар бар','Let’s review a few points')}</h3><p>${result.passed?term('Тест пройден. Теперь можно откликаться на подходящие задания.','Тесттен өттіңіз. Сәйкес тапсырмаларға өтінім беруге болады.','You passed. You can now apply for matching tasks.'):term('Для прохождения нужны три верных ответа. Прочитайте пояснения и попробуйте ещё раз.','Өту үшін үш дұрыс жауап қажет. Түсіндірмелерді оқып, қайта байқап көріңіз.','Three correct answers are required. Read the explanations and try again.')}</p></div></div>${ui().qaContactCard()}<div class="assessment-review">${questions.map((question,i)=>`<details><summary><span class="tag ${m.answers[i]===question.correct?'':'danger'}">${m.answers[i]===question.correct?'✓':'↻'} ${i+1}</span> ${esc(ui().loc(question.q))}</summary><div><p><strong>${term('Ваш ответ','Сіздің жауабыңыз','Your answer')}</strong><br>${esc(ui().loc(question.a[m.answers[i]]))}</p>${m.answers[i]!==question.correct?`<p><strong>${term('Рекомендуемый подход','Ұсынылатын тәсіл','Recommended approach')}</strong><br>${esc(ui().loc(question.a[question.correct]))}</p>`:''}<p class="assessment-explanation">${esc(ui().loc(question.explanation))}</p></div></details>`).join('')}</div><div class="modal-footer">${result.passed?`<button class="btn btn-primary" data-action="navigate" data-route="opportunities">${ui().t('opportunities')}</button>`:`<button class="btn btn-primary" data-action="open-test" data-sid="${esc(m.sid)}">${ui().t('retryTest')}</button>`}</div>`;break;
 }
 case 'qa-contact':{
  title='WhatsApp · QA';const recent=d().activityLog.find(entry=>entry.type==='demo_qa_call'&&entry.actorId===uid);
  body=`<div class="qa-chat-preview"><div class="qa-chat-person"><span>${ui().ico('user')}</span><div><strong>${term('QA-менеджер SkillBridge','SkillBridge QA-менеджері','SkillBridge QA manager')}</strong><small>${term('Макет диалога WhatsApp','WhatsApp диалогының макеті','WhatsApp conversation mockup')}</small></div></div><p>${term('Здравствуйте! На созвоне разберём ваш тест, обсудим рабочий подход и ответим на вопросы о заданиях. Подготовьте пример работы и вопросы, которые хотите обсудить.','Сәлеметсіз бе! Қоңырауда тестіңізді талқылап, жұмыс тәсілі мен тапсырмаларға қатысты сұрақтарға жауап береміз. Жұмыс мысалы мен сұрақтарыңызды дайындаңыз.','Hello! On the call we can review your assessment, discuss your approach and answer questions about tasks. Prepare a work sample and any questions you want to cover.')}</p></div><p class="hint">${term('Это демонстрация. WhatsApp не открывается, сообщение менеджеру не отправляется, реальный созвон не назначается.','Бұл демонстрация. WhatsApp ашылмайды, менеджерге хабар жіберілмейді, нақты қоңырау белгіленбейді.','This is a simulation. WhatsApp will not open, no message is sent and no real call is booked.')}</p>${recent?`<div class="info">${term('Последняя демо-заявка сохранена','Соңғы демо өтінім сақталды','Latest demo request saved')} · ${ui().date(recent.createdAt)}</div>`:''}<form data-form="qa-call" class="form-grid"><input type="hidden" name="requestId" value="${esc(m.requestId)}"><div class="field span2"><label for="qa-slot">${term('Когда удобнее созвониться?','Қай уақытта қоңырау ыңғайлы?','When would a call suit you?')}</label><select id="qa-slot" name="slot"><option value="morning">${term('Утром','Таңертең','Morning')}</option><option value="afternoon">${term('Днём','Күндіз','Afternoon')}</option><option value="evening">${term('Вечером','Кешке','Evening')}</option></select></div>${textarea('note',term('Что хотите обсудить?','Нені талқылағыңыз келеді?','What would you like to discuss?'),'','maxlength="500"')}${actions(term('Сохранить демо-заявку на созвон','Қоңырауға демо өтінімді сақтау','Save demo call request'))}</form>`;break;
 }
 case 'qa-call-saved':{
  title=term('Демо-заявка сохранена','Демо өтінім сақталды','Demo request saved');
  body=`<div class="qa-saved"><span>${ui().ico('check')}</span><h3>${term('Можно готовиться к разговору','Әңгімеге дайындалуға болады','You’re ready to prepare')}</h3><p>${term('В демонстрационном сценарии следующий шаг — согласовать с QA-менеджером точное время и вместе обсудить результаты.','Демо сценарийдегі келесі қадам — QA-менеджермен нақты уақытты келісіп, нәтижелерді бірге талқылау.','In this demo flow, the next step would be to agree a time with the QA manager and discuss your results together.')}</p><p class="hint">${term('Предпочтение сохранено только в этом браузере. Никому не отправлено.','Қалауыңыз тек осы браузерде сақталды. Ешкімге жіберілген жоқ.','Your preference is saved in this browser only. Nothing has been sent.')}</p><button class="btn btn-primary" data-action="navigate" data-route="screening">${ui().t('screening')}</button></div>`;break;
 }
 case 'assign':{
  const o=getOrder(m.oid);title=term('Назначить исполнителя','Орындаушыны тағайындау');
  const performers=d().users.filter(x=>x.role==='performer'&&x.available&&window.SBData.qualification(x.id,o.serviceId));
  body=`<div class="info">${esc(o.id)} · ${esc(ui().loc(service(o.serviceId)?.title))}</div>
 ${performers.length?`<form data-form="assign"><input type="hidden" name="oid" value="${esc(o.id)}"><div class="field"><label>${term('Квалифицированный исполнитель','Білікті орындаушы')}</label><select name="performerId" required>${performers.map(x=>`<option value="${esc(x.id)}">${esc(x.name)}${x.field?' · '+esc(ui().loc(x.field)):''}</option>`).join('')}</select></div>${actions(term('Назначить','Тағайындау'))}</form>`:warn(term('Нет доступных исполнителей с пройденным тестом по этой услуге.','Тесттен өткен қолжетімді орындаушы жоқ.'))}`;break;
 }
 case 'submit':{
  const o=getOrder(m.oid);title=term('Отправить результат работы','Нәтижені жіберу');wide=true;
  body=`<div class="info">${esc(o.id)} · ${esc(o.title)}</div><form data-form="submit-work"><input type="hidden" name="oid" value="${esc(o.id)}">${textarea('text',term('Описание и результаты','Сипаттама және нәтиже'),'','required minlength="12" maxlength="16000" placeholder="'+esc(term('Укажите выполненные действия и результат, используйте только демонстрационные данные.','Жасалған әрекеттер мен нәтижені жазыңыз.'))+'"')}
 <div class="field span2"><label>${term('Демо-вложение','Демо тіркеме')}</label><input name="file" type="file" accept=".txt,.csv,.json,.md,.tsv,.xlsx,.pdf"><small class="hint">${term('Содержимое небольшого текстового файла попадёт в JSON, остальное — только название и размер.','Шағын мәтіндік файл JSON-ға жазылады; қалғаны тек метадеректер.')}</small></div>${actions(term('Отправить на QA','QA тексеруге жіберу'))}</form>`;break;
 }
 case 'qa':{
  const o=getOrder(m.oid),srv=service(o.serviceId);title=term('Проверка качества QA','Сапаны тексеру QA');wide=true;
  body=`<div class="info"><strong>${esc(o.id)}</strong> · ${esc(o.title)}</div><div class="surface" style="margin-top:15px"><h3>${term('Результат исполнителя','Орындаушының нәтижесі')}</h3><p style="white-space:pre-wrap;overflow-wrap:anywhere">${esc(o.delivery?.text||'')}</p></div>
 ${ui().briefDetails(o)}<form data-form="qa"><input type="hidden" name="oid" value="${esc(o.id)}"><p><strong>${term('Проверка требований','Талаптарды тексеру')}</strong></p>${(ui().loc(srv.criteria)).map((v,i)=>`<label class="check-row"><input type="checkbox" name="check${i}" value="yes"> ${esc(v)}</label>`).join('')}
 <div class="field" style="margin-top:15px"><label>${term('Решение','Шешім')}</label><select name="verdict"><option value="pass">${term('Одобрить и отправить клиенту','Қабылдап клиентке жіберу')}</option><option value="reject">${term('Вернуть на исправление','Түзетуге қайтару')}</option></select></div><div class="field" style="margin-top:14px"><label>${term('Комментарий QA','QA пікірі')}</label><textarea name="notes" rows="3" maxlength="1200" placeholder="${term('Причина отказа: не менее 12 символов','Бас тарту себебі: 12 таңба')}"></textarea></div>${actions(term('Сохранить решение QA','QA шешімін сақтау'))}</form>`;break;
 }
 case 'revision':{
  const o=getOrder(m.oid);title=term('Запросить исправление','Түзету сұрау');body=`<p class="muted">${term('Одна доработка в рамках исходного технического задания.','Бастапқы ТЗ аясында бір түзету.')}</p><form data-form="revision"><input type="hidden" name="oid" value="${esc(o.id)}">${textarea('reason',term('Какой пункт задания не выполнен?','Қандай талап орындалмады?'),'','required minlength="12" maxlength="1200"')}${actions(term('Отправить на доработку','Түзетуге жіберу'))}</form>`;break;
 }
 case 'dispute':{
  const o=getOrder(m.oid);title=term('Открыть спор','Дау ашу');body=`${warn(term('Спор рассматривает только демонстрационный оператор. Это не юридический арбитраж.','Бұл тек демо дауды қарау, құқықтық арбитраж емес.'))}<form data-form="dispute"><input type="hidden" name="oid" value="${esc(o.id)}">${textarea('reason',term('Опишите проблему','Мәселені сипаттаңыз'),'','required minlength="14" maxlength="1500"')}${actions(term('Открыть спор','Дау ашу'))}</form>`;break;
 }
 case 'resolve':{
  const o=getOrder(m.oid);title=term('Разрешить спор','Дауды шешу');body=`<div class="warn">${esc(o.dispute?.reason)}</div><form data-form="resolve"><input type="hidden" name="oid" value="${esc(o.id)}"><div class="field"><label>${term('Решение оператора','Оператор шешімі')}</label><select name="resolution"><option value="refund">DEMO Refund (20 000 ₸)</option>${o.revisionCount<d().settings.maxRevisions?`<option value="revision">${term('Разрешить исправление','Түзетуге рұқсат беру')}</option>`:''}</select></div>${actions(term('Применить решение','Шешімді сақтау'))}</form>`;break;
 }
 case 'review':{
  const o=getOrder(m.oid);title=term('Оставить отзыв','Пікір қалдыру');body=`<form data-form="review"><input type="hidden" name="oid" value="${esc(o.id)}"><div class="field"><label>${term('Рейтинг','Рейтинг')}</label><select name="rating">${[5,4,3,2,1].map(i=>`<option value="${i}">${'★'.repeat(i)} (${i}/5)</option>`).join('')}</select></div><div class="field" style="margin-top:12px"><label>${term('Отзыв о результате','Нәтиже туралы пікір')}</label><textarea name="review" rows="4" required minlength="8" maxlength="1000"></textarea></div><label class="check-row"><input type="checkbox" name="consent"> ${term('Разрешить публичную демонстрацию отзыва','Пікірді демо-портфолиода көрсетуге келісемін')}</label>${actions(term('Отправить отзыв','Пікір жіберу'))}</form>`;break;
 }
 default:return '';
 }
 return modal(title,body,wide);
}
function scrollInbox(){const feed=$('#inbox-chat-feed');if(feed)feed.scrollTop=feed.scrollHeight;}
function show(){const root=$('#app');if(!root)return;document.documentElement.lang=({ru:'ru',kz:'kk',en:'en'})[d().settings.language];document.title=term('SkillBridge — Микро-задания для бизнеса и исполнителей','SkillBridge — Бизнес пен орындаушыларға арналған шағын тапсырмалар');let markup='';if(state.route==='landing'||!state.uid){markup=ui().landing();}else{markup=ui().shell(ui().renderContent());}root.innerHTML=markup+(state.modal?modalContent():'');document.body.classList.toggle('modal-active',!!state.modal);document.body.classList.toggle('workspace-active',state.route!=='landing'&&!!state.uid);if(state.route==='messages')requestAnimationFrame(scrollInbox);if(state.modal){const focus=root.querySelector('.modal [name],.modal button');if(focus)focus.focus({preventScroll:true});}}
const navigation={session:Date.now().toString(36)+Math.random().toString(36).slice(2),entries:[],index:-1,restoring:false};
function navigationSnapshot(){
 return {uid:state.uid,route:state.route,department:state.route==='catalog'?state.catalogDepartment:null,orderId:state.route==='order-detail'?state.orderId:null};
}
function rememberNavigation(){
 if(navigation.restoring)return;
 const next=navigationSnapshot(),current=navigation.entries[navigation.index];
 if(current&&JSON.stringify(current)===JSON.stringify(next))return;
 navigation.entries=navigation.entries.slice(0,navigation.index+1);
 navigation.entries.push(next);navigation.index++;
 const entry={skillbridge:navigation.session,index:navigation.index};
 if(navigation.index===0)history.replaceState(entry,'');else history.pushState(entry,'');
}
function restoreNavigation(event){
 const saved=event.state;
 if(saved?.skillbridge!==navigation.session||!navigation.entries[saved.index]){
  navigation.entries=[];navigation.index=-1;state.uid=null;state.route='landing';state.orderId=null;state.modal=null;render();return;
 }
 navigation.index=saved.index;
 const entry=navigation.entries[navigation.index];
 state.uid=window.SBData.user(entry.uid)?entry.uid:null;state.catalogDepartment=entry.department||null;
 state.modal=null;state.mobile=false;state.inbox.mobileChat=false;
 navigation.restoring=true;
 try{
  let route=state.uid?entry.route:'landing';
  if(route==='order-detail'&&!d().orders.some(order=>order.id===entry.orderId))route='dashboard';
  navigate(route,entry.orderId,entry.department||null);
 }finally{navigation.restoring=false;}
}
function render(keepScroll=false){let scroll=window.scrollY;rememberNavigation();show();if(!keepScroll)window.scrollTo(0,0);else window.scrollTo(0,scroll);}
function navigate(route,oid=null,department=null){if(route==='catalog')state.catalogDepartment=department;state.modal=null;if(route==='landing'){state.route='landing';state.orderId=null;state.mobile=false;render();return;}
 if(!getUser()){state.modal={type:'account'};state.route='landing';render();return;}
 const role=getUser().role;
 const allowed={business:['dashboard','catalog','customer-finance','orders','messages','notifications','profile','order-detail','faq','about'],performer:['dashboard','opportunities','mytasks','screening','portfolio','earnings','messages','notifications','profile','order-detail','faq','about'],admin:['dashboard','admin-orders','admin-performers','qa','disputes','finance','messages','notifications','profile','order-detail','faq','about','data']};
 if(!allowed[role].includes(route)){toast(term('Этот раздел не доступен выбранной роли.','Бұл бөлім осы рөлге қолжетімсіз.'),true);return;}
 state.route=route;state.orderId=oid||state.orderId;state.mobile=false;state.filters={query:'',status:'',category:''};if(route==='messages'){const available=d().orders.filter(o=>window.SBData.visible(o,state.uid)).sort((a,b)=>new Date(b.updatedAt||b.createdAt)-new Date(a.updatedAt||a.createdAt));if(!available.some(o=>o.id===state.inbox.threadId))state.inbox.threadId=available[0]?.id||null;if(state.inbox.threadId)window.SBData.markThreadRead(state.uid,state.inbox.threadId);}render();}
function choose(uid){const u=window.SBData.user(uid);if(!u){toast('Account not found.',true);return;}state.uid=uid;state.modal=null;state.route='dashboard';state.orderId=null;state.filters={query:'',status:'',category:''};state.inbox={threadId:null,query:'',filter:'all',mobileChat:false,drafts:{}};state.mobile=false;try{sessionStorage.setItem('sb-current-user',uid);}catch(e){}render();toast(term(`Вы вошли как ${u.name} (DEMO)`,`Сіз ${u.name} ретінде кірдіңіз (DEMO)`,`Selected ${u.name} (demo)`));}
function open(type,meta={}){state.modal={type,...meta};render(true);}
function close(){state.modal=null;render(true);}
function tryAction(fn,success){try{let x=fn();if(success)toast(success);render(true);return x;}catch(e){toast(e.message||term('Операция не выполнена.','Әрекет орындалмады.'),true);}}
const success=msg=>toast(msg||term('Действие сохранено в JSON.','Әрекет JSON-ға сақталды.'));
const confirmAction=(question,fn)=>{if(window.confirm(question))return tryAction(fn,term('Готово','Дайын'));};
function certificate(oid){
 const o=getOrder(oid);
 if(o.status!=='completed'||o.performerId!==state.uid)throw Error(term('Сертификат доступен после завершения своего задания.','Сертификат өз тапсырмаңыз аяқталғаннан кейін қолжетімді.'));
 const person=getUser(),title=ui().loc(service(o.serviceId)?.title)||'',date=new Intl.DateTimeFormat(window.SBI18n.locale()).format(new Date(o.updatedAt));
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="850" viewBox="0 0 1200 850">
 <defs><linearGradient id="paper" x2="1" y2="1"><stop stop-color="#fffdf7"/><stop offset="1" stop-color="#eef3e6"/></linearGradient></defs>
 <rect width="1200" height="850" fill="url(#paper)"/><path d="M0 0h1200v32H0z" fill="#183d35"/>
 <circle cx="1150" cy="80" r="200" fill="#dce9cd" opacity=".55"/><circle cx="0" cy="850" r="230" fill="#e6def1" opacity=".55"/>
 <rect x="34" y="48" width="1132" height="766" rx="8" fill="none" stroke="#b6c5a5"/>
 <g transform="translate(76 82)"><rect width="68" height="68" rx="21" fill="#183d35"/><path d="M16 43V28a8 8 0 0 1 16 0v15m4-18v15a8 8 0 0 0 16 0V25" fill="none" stroke="#baff73" stroke-width="6" stroke-linecap="round"/><path d="m28 34 6-6 6 6-6 6z" fill="#fff"/></g>
 <g font-family="Arial,sans-serif" fill="#183d35"><text x="164" y="115" font-size="30" font-weight="bold">SkillBridge</text><text x="164" y="141" font-size="13" letter-spacing="2">SKILLS · WORK · OPPORTUNITY</text>
 <text x="600" y="240" text-anchor="middle" font-size="51" font-family="Georgia,serif" letter-spacing="5">${term('СЕРТИФИКАТ','СЕРТИФИКАТ')}</text>
 <text x="600" y="279" text-anchor="middle" font-size="16" letter-spacing="2">${term('О ВЫПОЛНЕНИИ ДЕМО-ЗАДАНИЯ','ДЕМО ТАПСЫРМАНЫ ОРЫНДАУ ТУРАЛЫ')}</text>
 <path d="M485 307h230" stroke="#a7b68e"/>
 <text x="600" y="358" text-anchor="middle" font-size="18" fill="#677467">${term('Выдан исполнителю','Орындаушыға берілді')}</text>
 <foreignObject x="100" y="380" width="1000" height="100"><div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Georgia,serif;font-size:42px;text-align:center;color:#183d35;overflow-wrap:anywhere;line-height:1.1">${esc(person.name)}</div></foreignObject>
 <text x="600" y="509" text-anchor="middle" font-size="18">${term('за выполнение задания и прохождение контроля качества','тапсырманы орындап, сапа тексеруінен өткені үшін')}</text>
 <text x="600" y="550" text-anchor="middle" font-size="26" font-weight="bold">${esc(title)}</text>
 <text x="90" y="669" font-size="14" fill="#677467">${term('Дата завершения','Аяқталған күні')}</text><text x="90" y="698" font-size="22">${esc(date)}</text>
 <text x="90" y="745" font-size="13">ID · ${esc(o.id)}</text>
 <path d="M490 695h240" stroke="#879978"/><text x="610" y="724" text-anchor="middle" font-size="15">SkillBridge · QA</text>
 <g transform="translate(1000 679) rotate(-12)"><circle r="81" fill="#e5edda" stroke="#3d7059" stroke-width="3"/><circle r="71" fill="none" stroke="#3d7059" stroke-dasharray="2 4"/><text y="-27" text-anchor="middle" font-size="14" letter-spacing="2">SKILLBRIDGE</text><path d="m-22 0 15 15 30-32" fill="none" stroke="#3d7059" stroke-width="5" stroke-linecap="round"/><text y="43" text-anchor="middle" font-size="12" letter-spacing="2">DEMO · QA</text></g>
 <text x="600" y="790" text-anchor="middle" font-size="12" fill="#677467">${term('Демонстрационный сертификат · Декоративная печать · Без официальной аккредитации','Демонстрациялық сертификат · Сәндік мөр · Ресми аккредитациясыз')}</text></g></svg>`;
 const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml;charset=utf-8'})),link=document.createElement('a');
 link.href=url;link.download=`SkillBridge-Certificate-${o.id}.svg`;link.click();setTimeout(()=>URL.revokeObjectURL(url),2000);
 toast(term('Сертификат сохранён.','Сертификат сақталды.'));
}
async function prepareFile(file){if(!file)return null;if(file.size>5_000_000)throw Error(term('Файл больше 5 MB; выберите меньший демо-файл.','Файл 5 MB-тен үлкен.'));const v={name:file.name,size:file.size,type:file.type||'application/octet-stream',demo:true};if(file.size<=131072&&(/\.(txt|md|csv|tsv|json)$/i.test(file.name)||file.type.startsWith('text/'))){v.content=await file.text();}return v;}
async function submitForm(form){const fd=new FormData(form), type=form.dataset.form;const val=k=>str(fd.get(k)||'').trim();const uid=state.uid;
 try{
 switch(type){
 case 'new-demo-user':{
  const role=val('role'),name=val('name'),company=val('company');
  if(!['business','performer'].includes(role)||name.length<2||name.length>70)throw Error(term('Введите имя длиной 2–70 символов.','Есім 2–70 таңбадан тұруы керек.'));
  if(role==='business'&&(company.length<2||company.length>120))throw Error(term('Введите название компании (2–120 символов).','Компания атауын енгізіңіз (2–120 таңба).'));
  const user={id:window.SBData.id('user'),role,name,company:role==='business'?company:'',field:val('field').slice(0,100),bio:val('bio').slice(0,1000),skills:[],available:true,demo:true};
  d().users.push(user);
  if(!window.SBStorage.save()){d().users.pop();throw Error(term('Не удалось сохранить профиль в браузере.','Профиль браузерде сақталмады.'));}
  choose(user.id);return;
 }
 case 'refund-request':open('dispute',{oid:val('oid')});return;
 case 'withdraw':{
  const amount=Number(val('amount')),lastFour=val('lastFour');
  if(!Number.isSafeInteger(amount)||amount<=0||amount>window.SBData.wallet(uid).available||!/^\d{4}$/.test(lastFour))throw Error(term('Проверьте сумму и четыре цифры демо-счёта.','Сома мен демо шоттың төрт санын тексеріңіз.','Check the amount and four demo account digits.'));
  open('withdraw-confirm',{amount,lastFour,requestId:val('requestId')});return;
 }
 case 'withdraw-confirm':{
  const entry=window.SBData.withdraw(uid,state.modal);
  state.modal=null;render();toast(term('Демо-вывод сохранён.','Демо шығару сақталды.','Demo withdrawal saved.')+' '+money(entry.amount));return;
 }
 case 'create-order':{
  const file=await prepareFile(fd.get('source') instanceof File&&fd.get('source').size?fd.get('source'):null);
  const o=window.SBData.createOrder(uid,{serviceId:val('sid'),custom:val('custom')==='yes',price:val('price'),days:val('days'),title:val('title'),brief:val('brief'),briefDetails:Object.fromEntries(['goal','audience','deliverables','materials','acceptance'].map(key=>[key,val(key)])),notes:val('notes'),inputFile:file});state.modal=null;state.orderId=o.id;state.route='order-detail';render();success(term('Заказ создан. Следующий шаг — DEMO оплата.','Тапсырыс жасалды. Келесі қадам — DEMO төлем.'));return;
 }
 case 'pay':open('payment-preview',{oid:val('oid'),provider:val('provider')});return;
 case 'confirm-demo-payment':window.SBData.pay(uid,val('oid'),val('provider'));break;
 case 'skill-test':{
  const sid=val('sid'),qs=window.SBTestBank[sid];const answers=qs.map((q,i)=>fd.has('q'+i)?Number(fd.get('q'+i)):-1);const r=window.SBData.test(uid,sid,answers);open('test-result',{sid,result:r,answers});return;
 }
 case 'qa-call':window.SBData.requestQaCall(uid,{slot:val('slot'),note:val('note'),requestId:val('requestId')});open('qa-call-saved');return;
 case 'assign':window.SBData.assign(uid,val('oid'),val('performerId'));break;
 case 'submit-work':{let file=await prepareFile(fd.get('file') instanceof File&&fd.get('file').size?fd.get('file'):null);window.SBData.submit(uid,val('oid'),{text:val('text'),file});break;}
 case 'qa':{const sid=getOrder(val('oid')).serviceId,count=service(sid).criteria.ru.length;let passed=val('verdict')==='pass',checks=Array.from({length:count},(_,i)=>fd.has('check'+i));window.SBData.qa(uid,val('oid'),passed,val('notes'),checks);break;}
 case 'revision':window.SBData.revision(uid,val('oid'),val('reason'));break;
 case 'dispute':window.SBData.dispute(uid,val('oid'),val('reason'));break;
 case 'resolve':window.SBData.resolve(uid,val('oid'),val('resolution'));break;
 case 'review':window.SBData.review(uid,val('oid'),val('rating'),val('review'),fd.has('consent'));break;
 case 'message':{
  window.SBData.message(uid,form.dataset.oid,val('text'));delete state.inbox.drafts[form.dataset.oid];form.reset();render(true);const box=$('#chat-box');if(box)box.scrollTop=box.scrollHeight;scrollInbox();if(state.route==='messages')$('#inbox-message-input')?.focus({preventScroll:true});toast(term('Сообщение отправлено и сохранено.','Хабарлама жіберілді және сақталды.'));return;
 }
 case 'filter':state.filters={query:val('query'),status:val('status'),category:val('category')};render(true);return;
 case 'profile':window.SBData.updateProfile(uid,{name:val('name'),bio:val('bio'),available:fd.has('available'),company:val('company'),field:val('field')});break;
 default:throw Error('Unknown form: '+type);
 }
 state.modal=null;render(true);success();
 }catch(e){toast(e.message||'Form error',true);}
}
async function clicked(el){const action=el.dataset.action,oid=el.dataset.oid,sid=el.dataset.sid,target=el.dataset.target;
 try{
 switch(action){
 case 'history-back':if(navigation.index>0)history.back();break;
 case 'history-forward':if(navigation.index<navigation.entries.length-1)history.forward();break;
 case 'navigate':navigate(el.dataset.route||'dashboard');break;
 case 'open-order':navigate('order-detail',oid);break;
 case 'inbox-thread':state.inbox.threadId=oid;state.inbox.filter='all';state.inbox.mobileChat=true;window.SBData.markThreadRead(state.uid,oid);render(true);scrollInbox();if(window.matchMedia('(max-width:760px)').matches)requestAnimationFrame(()=>$('.inbox-layout')?.scrollIntoView({behavior:'smooth',block:'start'}));break;
 case 'inbox-back':state.inbox.mobileChat=false;render(true);break;
 case 'inbox-filter':state.inbox.filter=el.dataset.filter==='unread'?'unread':'all';state.inbox.mobileChat=false;render(true);break;
 case 'scroll-to':{if(state.route!=='landing'){navigate('landing');}requestAnimationFrame(()=>{const t=document.getElementById(target);if(t)t.scrollIntoView({behavior:'smooth',block:'start'});});break;}
 case 'menu':state.mobile=!state.mobile;render(true);break;
 case 'language':window.SBData.changeLanguage(({ru:'kz',kz:'en',en:'ru'})[d().settings.language]);render(true);toast(term('Язык переключен.','Тіл ауыстырылды.'));break;
 case 'account-picker':open('account');break;
 case 'admin-entry':{
  const admin=d().users.find(user=>user.role==='admin');
  if(!admin){toast(term('В данных нет администратора.','Деректерде әкімші жоқ.'),true);break;}
  choose(admin.id);break;
 }
 case 'add-demo-user':open('new-demo-user',{role:el.dataset.role});break;
 case 'open-department':navigate('catalog',null,el.dataset.department);break;
 case 'service-info':open('service-info',{sid});break;
 case 'request-refund':open('refund-request');break;
 case 'open-withdraw':open('withdraw',{requestId:window.SBData.id('request')});break;
 case 'begin-demo':open('account',{role:el.dataset.role});break;
 case 'logout':state.uid=null;sessionStorage.removeItem('sb-current-user');navigate('landing');break;
 case 'switch-account':choose(el.dataset.uid);break;
 case 'start-order':if(getUser()?.role!=='business'){open('account',{role:'business'});return;}open('order',{sid});break;
 case 'apply':tryAction(()=>window.SBData.apply(state.uid,oid),term('Отклик отправлен.','Өтінім жіберілді.'));break;
 case 'open-pay':open('pay',{oid});break;
 case 'qa-contact':open('qa-contact',{requestId:window.SBData.id('qa-request')});break;
 case 'open-test':open('test',{sid});break;
 case 'open-assign':open('assign',{oid});break;
 case 'open-submit':open('submit',{oid});break;
 case 'open-qa':open('qa',{oid});break;
 case 'open-revision':open('revision',{oid});break;
 case 'open-dispute':open('dispute',{oid});break;
 case 'open-resolve':open('resolve',{oid});break;
 case 'open-review':open('review',{oid});break;
 case 'close-modal':close();break;
 case 'cancel-order':confirmAction(term('Отменить неоплаченный DEMO заказ?','Төленбеген DEMO тапсырысын тоқтату керек пе?'),()=>window.SBData.cancel(state.uid,oid));break;
 case 'start-work':tryAction(()=>window.SBData.start(state.uid,oid),term('Работа начата.','Жұмыс басталды.'));break;
 case 'client-approve':confirmAction(term('Вы действительно принимаете результат?','Нәтижені қабылдайсыз ба?'),()=>window.SBData.accept(state.uid,oid));break;
 case 'release':confirmAction(term('Зафиксировать DEMO выплату? Реальные деньги не переводятся.','Демо төлемін сақтау керек пе?'),()=>window.SBData.release(state.uid,oid));break;
 case 'read-all':tryAction(()=>window.SBData.markAllRead(state.uid));break;
 case 'read-notification':tryAction(()=>window.SBData.markRead(state.uid,el.dataset.nid));break;
 case 'export':window.SBStorage.download();toast(term('JSON экспортирован.','JSON экспортталды.'));break;
 case 'save-json':{const result=await window.SBStorage.saveFile();if(result==='file')toast(term('JSON сохранён в выбранный файл.','JSON файлға сақталды.'));if(result==='download')toast(term('JSON скачан (прямое сохранение не поддерживается).','JSON жүктелді.'));break;}
 case 'import':$('#json-import').click();break;
 case 'backup':window.SBStorage.backup();toast(term('Локальный снимок сохранен.','Демо көшірмесі сақталды.'));break;
 case 'restore':confirmAction(term('Восстановить предыдущий снимок? Текущие изменения заменятся.','Алдыңғы көшірмені қалпына келтіру керек пе?'),()=>{window.SBStorage.restore();if(!window.SBData.user(state.uid))state.uid=null;});break;
 case 'reset':confirmAction(term('Сбросить ВСЕ изменения и восстановить исходные DEMO данные?','Барлық өзгерістерді жойып, бастапқы демо деректерді қалпына келтіру керек пе?'),()=>{window.SBStorage.reset();state.filters={query:'',status:'',category:''};state.modal=null;});break;
 case 'clear-filter':state.filters={query:'',status:'',category:''};render(true);break;
 case 'download-cert':certificate(oid);break;
 default:toast(term('Это действие пока не поддерживается.','Бұл әрекет әзірге қолжетімсіз.'),true);
 }
 }catch(e){toast(e.message||String(e),true);}
}
const SBApp={catalogDepartment:()=>state.catalogDepartment,canGoBack:()=>navigation.index>0,canGoForward:()=>navigation.index<navigation.entries.length-1,uid:()=>state.uid,route:()=>state.route,orderId:()=>state.orderId,mobileOpen:()=>state.mobile,filters:()=>state.filters,inboxState:()=>state.inbox,render,navigate,choose,open,reset:()=>window.SBStorage.reset()};
window.SBApp=SBApp;
function initialize(){window.addEventListener('popstate',restoreNavigation);window.SBStorage.load();state.route='landing';render();
 document.addEventListener('click',e=>{const act=e.target.closest('[data-action]');if(act){e.preventDefault();clicked(act);return;}if(e.target.matches('[data-modal-backdrop]'))close();});
 document.addEventListener('submit',e=>{const form=e.target.closest('form[data-form]');if(!form)return;e.preventDefault();if(form.reportValidity())submitForm(form);});
 const importer=$('#json-import');importer?.addEventListener('change',async e=>{const f=e.target.files?.[0];if(!f)return;try{if(f.size>3_000_000)throw Error('JSON слишком большой (максимум 3 MB).');window.SBStorage.importData(await f.text());state.modal=null;state.filters={query:'',status:'',category:''};if(!window.SBData.user(state.uid))state.uid=null;render();toast(term('JSON успешно импортирован.','JSON сәтті импортталды.'));}catch(err){toast(err.message,true);}finally{importer.value='';}});
 document.addEventListener('change',e=>{
  if(!e.target.matches('form[data-form="register"] select[name="role"]'))return;
  const company=e.target.form.querySelector('[data-register-company]');
  const isBusiness=e.target.value==='business';
  company.hidden=!isBusiness;
  const field=company.querySelector('input');
  field.disabled=!isBusiness;
  field.required=isBusiness;
 });
 document.addEventListener('input',e=>{
  if(e.target.matches('.assessment-form input[type="radio"]')){
   const form=e.target.form,count=form.querySelectorAll('input[type="radio"]:checked').length,total=window.SBTestBank[form.querySelector('[name="sid"]').value].length;
   $('#assessment-progress').value=count;
   $('#assessment-progress-label').textContent=count+' / '+total+' '+term('ответов','жауап','answered');
  }

  if(e.target.matches('[data-inbox-composer]')){const oid=e.target.closest('form')?.dataset.oid;if(oid)state.inbox.drafts[oid]=e.target.value;const count=$('#inbox-char-count');if(count)count.textContent=e.target.value.length+' / 1500';e.target.style.height='auto';e.target.style.height=Math.min(170,Math.max(68,e.target.scrollHeight))+'px';}
  if(e.target.matches('[data-inbox-search]')){const query=e.target.value,cursor=e.target.selectionStart;state.inbox.query=query;state.inbox.mobileChat=false;render(true);const next=$('[data-inbox-search]');if(next){next.focus({preventScroll:true});try{next.setSelectionRange(cursor,cursor);}catch(err){}}}
 });
 document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&state.modal)close();
  if(e.target.matches('[data-inbox-composer]')&&e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();if(e.target.value.trim())e.target.form?.requestSubmit();}
 });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initialize);else initialize();
})();