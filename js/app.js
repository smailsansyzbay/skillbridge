/* SkillBridge Frontend Prototype — browser-only demo. All accounts and transactions are fictional. */
(function(){
'use strict';
const $=s=>document.querySelector(s);
const state={uid:null,route:'landing',orderId:null,mobile:false,filters:{query:'',status:'',category:''},modal:null};
const d=()=>window.SBStorage.state();
const ui=()=>window.SBUI;
const str=(s)=>String(s??'');
const esc=(s)=>str(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const isKz=()=>d().settings.language==='kz';
const term=(ru,kz)=>isKz()?(kz||ru):ru;
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
  title=term('Выберите демонстрационный аккаунт','Демо аккаунтты таңдаңыз');
  const roleName={business:term('Компания','Компания'),student:term('Студент','Студент'),admin:term('Администратор','Әкімші')};
  body=warn('<strong>DEMO ONLY:</strong> '+term('это не защищенная авторизация; данные видны в данном браузере.','бұл қорғалған авторизация емес; деректер осы браузерде сақталады.'))+
  d().users.map(a=>`<button type="button" class="select-account" data-action="switch-account" data-uid="${esc(a.id)}"><span class="avatar">${esc(a.name.slice(0,2))}</span><span class="name"><strong>${esc(a.name)}</strong><small>${esc(roleName[a.role])} · ${esc(a.company||a.university||'SkillBridge')}</small></span><span>→</span></button>`).join('')+
  `<div class="actions" style="margin-top:18px"><button type="button" class="btn btn-soft" data-action="open-register">＋ ${term('Создать демо-профиль','Демо профиль жасау')}</button></div>`; break;
 }
 case 'register':{
  title=term('Создать демо-профиль','Демо профиль жасау');body=warn(term('Локальный учебный аккаунт без пароля. Не вводите личные документы.','Құпиясөзсіз жергілікті оқу аккаунты. Құжат енгізбеңіз.'))+
  `<form data-form="register" class="form-grid">${formField('name',term('Имя','Аты'),'','text','required minlength="2" maxlength="70"')}
  <div class="field"><label for="f-role">${term('Роль','Рөл')}</label><select id="f-role" name="role"><option value="business">SME / Business</option><option value="student">Student</option></select></div>
  ${formField('company',term('Компания / Университет','Компания / Университет'),'','text','required minlength="2" maxlength="120"')}
  ${textarea('bio',term('Описание (по желанию)','Сипаттама (міндетті емес)'),'','maxlength="1000"')}${actions(term('Создать аккаунт','Аккаунт жасау'))}</form>`;break;
 }
 case 'order':{
  const srv=service(m.sid);if(!srv){return '';}title=term('Новый Micro-Case','Жаңа Micro-Case');wide=true;
  body=`<div class="info"><strong>${esc(ui().loc(srv.title))}</strong> · ${money(srv.price)} · ${term('срок 3 рабочих дня','мерзім 3 жұмыс күні')}</div>
  <form data-form="create-order" class="form-grid"><input type="hidden" name="sid" value="${esc(srv.id)}">
  ${formField('title',term('Название задания','Тапсырма атауы'),srv.id==='catalog'?term('Подготовить карточки новых товаров','Жаңа тауар карточкаларын дайындау'):srv.id==='excel'?term('Привести данные в порядок','Деректерді реттеу'):term('Сравнить пять конкурентов','Бес бәсекелесті салыстыру'),'text','required minlength="5" maxlength="130"')}
  ${formField('deadline',''+term('Срок выполнения','Орындалу мерзімі'),term('3 рабочих дня','3 жұмыс күні'),'text','disabled')}
  ${textarea('brief',term('Подробное техническое задание','Техникалық тапсырманың толық сипаттамасы'),'', 'required minlength="25" maxlength="3500" placeholder="'+esc(term('Что нужно получить? Укажите исходные данные, состав результата и критерии приемки.','Не алу керек? Бастапқы ақпарат, нәтиже және қабылдау шарттары.'))+'"')}
  ${textarea('notes',term('Дополнительные условия','Қосымша шарттар'),'', 'maxlength="2000"')}
  <div class="field span2"><label>${term('Файл с исходными данными (необязательно, до 128 KB для текстовых файлов)','Бастапқы файл (міндетті емес)')}</label><input type="file" name="source" accept=".txt,.csv,.json,.md,.tsv,.xlsx,.pdf"><small class="hint">${term('Только синтетические данные. Для бинарных файлов сохраняются только метаданные.','Тек демо деректер. Кейбір файлдардың тек атауы сақталады.')}</small></div>
  <div class="span2">${warn('<strong>DEMO ONLY.</strong> '+term('Оплата на следующем шаге — имитация; банковские карты не требуются.','Келесі төлем — имитация; карта қажет емес.'))}</div>${actions(term('Создать заказ','Тапсырыс жасау'))}</form>`;break;
 }
 case 'pay':{
  const o=getOrder(m.oid);title=term('Подтвердить демо-оплату','Демо төлемді растау');
  body=`<div class="surface" style="margin-bottom:14px"><h3>${esc(o.title)}</h3><div class="metric-line"><span>SME GMV</span><strong>${money(window.SBData.priceFor(o))}</strong></div><div class="metric-line"><span>${term('Студент 85%','Студент 85%')}</span><strong>${money(window.SBData.share(o))}</strong></div><div class="metric-line"><span>SkillBridge 15%</span><strong>${money(window.SBData.commission(o))}</strong></div></div>
 ${warn('<strong>DEMO ONLY — No real money is transferred.</strong><br>'+term('Операция создаст запись в JSON. Ни карта, ни банковский счет не используются.','Тек JSON ішінде жазба жасалады. Банк карта қажет емес.'))}
 <form data-form="pay"><input type="hidden" name="oid" value="${esc(o.id)}">${actions(term('Подтвердить демо-оплату','Демо төлемді растау'))}</form>`;break;
 }
 case 'test':{
  const srv=service(m.sid);if(!srv)return '';title=term('Тест навыков','Дағдылар тесті')+' · '+ui().loc(srv.title);wide=true;
  body=`<p class="muted mini">${term('Четыре задания. Для прохождения нужно минимум 3 из 4 правильных ответов.','Төрт сұрақ. Өту үшін кемінде 3 дұрыс жауап қажет.')}</p><form data-form="skill-test"><input type="hidden" name="sid" value="${esc(m.sid)}">
 ${window.SBTestBank[m.sid].map((q,i)=>`<div class="test-question"><strong>${i+1}. ${esc(ui().loc(q.q))}</strong>${q.a.map((a,j)=>`<label><input type="radio" name="q${i}" value="${j}" required> ${esc(ui().loc(a))}</label>`).join('')}</div>`).join('')}${actions(term('Завершить тест','Тестті аяқтау'))}</form>`;break;
 }
 case 'assign':{
  const o=getOrder(m.oid);title=term('Назначить студента','Студент тағайындау');
  const students=d().users.filter(x=>x.role==='student'&&x.available&&window.SBData.qualification(x.id,o.serviceId));
  body=`<div class="info">${esc(o.id)} · ${esc(ui().loc(service(o.serviceId)?.title))}</div>
 ${students.length?`<form data-form="assign"><input type="hidden" name="oid" value="${esc(o.id)}"><div class="field"><label>${term('Квалифицированный студент','Білікті студент')}</label><select name="studentId" required>${students.map(x=>`<option value="${esc(x.id)}">${esc(x.name)} · ${esc(x.university)}</option>`).join('')}</select></div>${actions(term('Назначить','Тағайындау'))}</form>`:warn(term('Нет доступных студентов, прошедших тест. Переключитесь на студента и пройдите проверку навыков.','Тесті өткен қолжетімді студент жоқ.'))}`;break;
 }
 case 'submit':{
  const o=getOrder(m.oid);title=term('Отправить результат работы','Нәтижені жіберу');wide=true;
  body=`<div class="info">${esc(o.id)} · ${esc(o.title)}</div><form data-form="submit-work"><input type="hidden" name="oid" value="${esc(o.id)}">${textarea('text',term('Описание и результаты','Сипаттама және нәтиже'),'','required minlength="12" maxlength="16000" placeholder="'+esc(term('Укажите выполненные действия и результат, используйте только демонстрационные данные.','Жасалған әрекеттер мен нәтижені жазыңыз.'))+'"')}
 <div class="field span2"><label>${term('Демо-вложение','Демо тіркеме')}</label><input name="file" type="file" accept=".txt,.csv,.json,.md,.tsv,.xlsx,.pdf"><small class="hint">${term('Содержимое небольшого текстового файла попадёт в JSON, остальное — только название и размер.','Шағын мәтіндік файл JSON-ға жазылады; қалғаны тек метадеректер.')}</small></div>${actions(term('Отправить на QA','QA тексеруге жіберу'))}</form>`;break;
 }
 case 'qa':{
  const o=getOrder(m.oid),srv=service(o.serviceId);title=term('Проверка качества QA','Сапаны тексеру QA');wide=true;
  body=`<div class="info"><strong>${esc(o.id)}</strong> · ${esc(o.title)}</div><div class="surface" style="margin-top:15px"><h3>${term('Результат студента','Студент нәтижесі')}</h3><p style="white-space:pre-wrap;overflow-wrap:anywhere">${esc(o.delivery?.text||'')}</p></div>
 <form data-form="qa"><input type="hidden" name="oid" value="${esc(o.id)}"><p><strong>${term('Проверка требований','Талаптарды тексеру')}</strong></p>${(srv.criteria[isKz()?'kz':'ru']||srv.criteria.ru).map((v,i)=>`<label class="check-row"><input type="checkbox" name="check${i}" value="yes"> ${esc(v)}</label>`).join('')}
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
function show(){const root=$('#app');if(!root)return;let markup='';if(state.route==='landing'||!state.uid){markup=ui().landing();}else{markup=ui().shell(ui().renderContent());}root.innerHTML=markup+(state.modal?modalContent():'');document.body.classList.toggle('modal-active',!!state.modal);if(state.modal){const focus=root.querySelector('.modal [name],.modal button');if(focus)focus.focus({preventScroll:true});}}
function render(keepScroll=false){let scroll=window.scrollY;show();if(!keepScroll)window.scrollTo(0,0);else window.scrollTo(0,scroll);}
function navigate(route,oid=null){state.modal=null;if(route==='landing'){state.route='landing';state.orderId=null;state.mobile=false;render();return;}
 if(!getUser()){state.modal={type:'account'};state.route='landing';render();return;}
 const role=getUser().role;
 const allowed={business:['dashboard','catalog','orders','messages','notifications','profile','order-detail','faq','about'],student:['dashboard','opportunities','mytasks','screening','portfolio','earnings','messages','notifications','profile','order-detail','faq','about'],admin:['dashboard','admin-orders','admin-students','qa','disputes','finance','messages','notifications','profile','order-detail','faq','about','data']};
 if(!allowed[role].includes(route)){toast(term('Этот раздел не доступен выбранной роли.','Бұл бөлім осы рөлге қолжетімсіз.'),true);return;}
 state.route=route;state.orderId=oid||state.orderId;state.mobile=false;state.filters={query:'',status:'',category:''};render();}
function choose(uid){const u=window.SBData.user(uid);if(!u){toast('Account not found.',true);return;}state.uid=uid;state.modal=null;state.route='dashboard';state.orderId=null;state.filters={query:'',status:'',category:''};state.mobile=false;try{sessionStorage.setItem('sb-current-user',uid);}catch(e){}render();toast(term(`Вы вошли как ${u.name} (DEMO)`,`Сіз ${u.name} ретінде кірдіңіз (DEMO)`));}
function open(type,meta={}){state.modal={type,...meta};render(true);}
function close(){state.modal=null;render(true);}
function tryAction(fn,success){try{let x=fn();if(success)toast(success);render(true);return x;}catch(e){toast(e.message||term('Операция не выполнена.','Әрекет орындалмады.'),true);}}
const success=msg=>toast(msg||term('Действие сохранено в JSON.','Әрекет JSON-ға сақталды.'));
const confirmAction=(question,fn)=>{if(window.confirm(question))return tryAction(fn,term('Готово','Дайын'));};
function certificate(oid){const o=getOrder(oid);if(o.status!=='completed'||o.studentId!==state.uid)throw Error('Certificate available after completion for the assigned student only.');const stu=getUser();const title=ui().loc(service(o.serviceId)?.title)||'';const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 580"><rect width="960" height="580" fill="#101a2b"/><rect x="30" y="30" width="900" height="520" fill="none" stroke="#14b8a6" stroke-width="4"/><text x="70" y="122" font-size="38" fill="#14b8a6" font-family="Arial" font-weight="bold">SkillBridge</text><text x="70" y="190" font-size="17" fill="#bedad7" font-family="Arial">DEMONSTRATION ONLY — NOT AN ACCREDITED QUALIFICATION</text><text x="70" y="280" font-size="37" fill="#fff" font-family="Arial" font-weight="bold">${esc(stu.name)}</text><text x="70" y="336" font-size="22" fill="#ddd" font-family="Arial">completed a demo Micro-Case</text><text x="70" y="378" font-size="26" fill="#14b8a6" font-family="Arial">${esc(title)}</text><text x="70" y="465" font-size="16" fill="#d3dce2" font-family="Arial">${esc(o.id)}  |  ${new Date(o.updatedAt).toISOString().slice(0,10)}  |  DEMO</text></svg>`;const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'}));let a=document.createElement('a');a.href=url;a.download=`SkillBridge-DEMO-${o.id}.svg`;a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);toast(term('Демо-сертификат сохранен в SVG.','Демо сертификат SVG ретінде сақталды.'));}
async function prepareFile(file){if(!file)return null;if(file.size>5_000_000)throw Error(term('Файл больше 5 MB; выберите меньший демо-файл.','Файл 5 MB-тен үлкен.'));const v={name:file.name,size:file.size,type:file.type||'application/octet-stream',demo:true};if(file.size<=131072&&(/\.(txt|md|csv|tsv|json)$/i.test(file.name)||file.type.startsWith('text/'))){v.content=await file.text();}return v;}
async function submitForm(form){const fd=new FormData(form), type=form.dataset.form;const val=k=>str(fd.get(k)||'').trim();const uid=state.uid;
 try{
 switch(type){
 case 'register':{
  const role=val('role'),name=val('name'),org=val('company');if(!['student','business'].includes(role))throw Error('Invalid role');if(name.length<2||org.length<2)throw Error('Enter your name and organization.');const id=window.SBData.id(role==='student'?'s':'b');const u={id,role,name,company:role==='business'?org:'',university:role==='student'?org:'',field:role==='student'?'General':'',year:'',bio:val('bio').slice(0,1000),skills:[],available:true,demo:true};d().users.push(u);window.SBStorage.save();choose(id);return;
 }
 case 'create-order':{
  const file=await prepareFile(fd.get('source') instanceof File&&fd.get('source').size?fd.get('source'):null);
  const o=window.SBData.createOrder(uid,{serviceId:val('sid'),title:val('title'),brief:val('brief'),notes:val('notes'),inputFile:file});state.modal=null;state.orderId=o.id;state.route='order-detail';render();success(term('Заказ создан. Следующий шаг — DEMO оплата.','Тапсырыс жасалды. Келесі қадам — DEMO төлем.'));return;
 }
 case 'pay':window.SBData.pay(uid,val('oid'));break;
 case 'skill-test':{
  const sid=val('sid'),qs=window.SBTestBank[sid];const answers=qs.map((q,i)=>fd.has('q'+i)?Number(fd.get('q'+i)):-1);const r=window.SBData.test(uid,sid,answers);state.modal=null;render();toast(`${r.passed?'✓ Passed':'✕ Not passed'} · ${r.score}/${r.total}`,!r.passed);return;
 }
 case 'assign':window.SBData.assign(uid,val('oid'),val('studentId'));break;
 case 'submit-work':{let file=await prepareFile(fd.get('file') instanceof File&&fd.get('file').size?fd.get('file'):null);window.SBData.submit(uid,val('oid'),{text:val('text'),file});break;}
 case 'qa':{const sid=getOrder(val('oid')).serviceId,count=service(sid).criteria.ru.length;let passed=val('verdict')==='pass',checks=Array.from({length:count},(_,i)=>fd.has('check'+i));window.SBData.qa(uid,val('oid'),passed,val('notes'),checks);break;}
 case 'revision':window.SBData.revision(uid,val('oid'),val('reason'));break;
 case 'dispute':window.SBData.dispute(uid,val('oid'),val('reason'));break;
 case 'resolve':window.SBData.resolve(uid,val('oid'),val('resolution'));break;
 case 'review':window.SBData.review(uid,val('oid'),val('rating'),val('review'),fd.has('consent'));break;
 case 'message':{
  window.SBData.message(uid,form.dataset.oid,val('text'));form.reset();render(true);const box=$('#chat-box');if(box)box.scrollTop=box.scrollHeight;return;
 }
 case 'filter':state.filters={query:val('query'),status:val('status'),category:val('category')};render(true);return;
 case 'profile':window.SBData.updateProfile(uid,{name:val('name'),bio:val('bio'),available:fd.has('available'),company:val('company'),university:val('university'),field:val('field'),year:val('year')});break;
 default:throw Error('Unknown form: '+type);
 }
 state.modal=null;render(true);success();
 }catch(e){toast(e.message||'Form error',true);}
}
async function clicked(el){const action=el.dataset.action,oid=el.dataset.oid,sid=el.dataset.sid,target=el.dataset.target;
 try{
 switch(action){
 case 'navigate':navigate(el.dataset.route||'dashboard');break;
 case 'open-order':navigate('order-detail',oid);break;
 case 'scroll-to':{if(state.route!=='landing'){navigate('landing');}requestAnimationFrame(()=>{const t=document.getElementById(target);if(t)t.scrollIntoView({behavior:'smooth',block:'start'});});break;}
 case 'menu':state.mobile=!state.mobile;render(true);break;
 case 'language':window.SBData.changeLanguage(isKz()?'ru':'kz');render(true);toast(term('Язык переключен.','Тіл ауыстырылды.'));break;
 case 'account-picker':open('account');break;
 case 'open-register':open('register');break;
 case 'switch-account':choose(el.dataset.uid);break;
 case 'start-order':if(getUser()?.role!=='business'){choose('b1');}open('order',{sid});break;
 case 'apply':tryAction(()=>window.SBData.apply(state.uid,oid),term('Отклик отправлен.','Өтінім жіберілді.'));break;
 case 'open-pay':open('pay',{oid});break;
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
const SBApp={uid:()=>state.uid,route:()=>state.route,orderId:()=>state.orderId,mobileOpen:()=>state.mobile,filters:()=>state.filters,render,navigate,choose,open,reset:()=>window.SBStorage.reset()};
window.SBApp=SBApp;
function initialize(){window.SBStorage.load();try{const selected=sessionStorage.getItem('sb-current-user');if(selected&&window.SBData.user(selected))state.uid=selected;}catch(e){}state.route='landing';render();
 document.addEventListener('click',e=>{const act=e.target.closest('[data-action]');if(act){e.preventDefault();clicked(act);return;}if(e.target.matches('[data-modal-backdrop]'))close();});
 document.addEventListener('submit',e=>{const form=e.target.closest('form[data-form]');if(!form)return;e.preventDefault();if(form.reportValidity())submitForm(form);});
 const importer=$('#json-import');importer?.addEventListener('change',async e=>{const f=e.target.files?.[0];if(!f)return;try{if(f.size>3_000_000)throw Error('JSON слишком большой (максимум 3 MB).');window.SBStorage.importData(await f.text());state.modal=null;state.filters={query:'',status:'',category:''};if(!window.SBData.user(state.uid))state.uid=null;render();toast(term('JSON успешно импортирован.','JSON сәтті импортталды.'));}catch(err){toast(err.message,true);}finally{importer.value='';}});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&state.modal)close();});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initialize);else initialize();
})();