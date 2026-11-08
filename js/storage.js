(function(){
'use strict';
const KEY='skillbridge_demo_v1', SNAP='skillbridge_demo_previous_snapshot_v1';
let current=null, fileHandle=null;
const clone=(v)=>JSON.parse(JSON.stringify(v));
function isData(d){return !!(d&&typeof d==='object'&&d.meta?.appName==='SkillBridge'&&Number(d.meta.schemaVersion)===1&&d.settings&&Number(d.settings.commissionRate)>=0&&Number(d.settings.commissionRate)<1&&['ru','kz'].includes(d.settings.language)&&['users','services','orders','applications','skillTests','messages','reviews','notifications','ledger','activityLog','profileConsent'].every(k=>Array.isArray(d[k]))&&d.users.every(x=>typeof x.id==='string'&&['business','student','admin'].includes(x.role))&&d.orders.every(x=>typeof x.id==='string'&&typeof x.status==='string'));}
function initial(){return clone(window.SBSeed);}
function load(){try{const raw=localStorage.getItem(KEY);if(raw){const data=JSON.parse(raw);if(isData(data)){current=data;return current;}}}catch(e){console.warn('SkillBridge: localStorage blocked/unreadable',e);}current=initial();save();return current;}
function state(){return current||load();}
function save(){const d=state();d.meta.lastModified=new Date().toISOString();try{localStorage.setItem(KEY,JSON.stringify(d));return true;}catch(e){console.warn('SkillBridge: save to localStorage unavailable',e);return false;}}
function backup(){try{localStorage.setItem(SNAP,JSON.stringify(state()));return true;}catch(e){return false;}}
function reset(){backup();current=initial();save();return current;}
function restore(){try{const v=JSON.parse(localStorage.getItem(SNAP));if(!isData(v))throw Error('No valid saved snapshot');const old=state();current=v;try{localStorage.setItem(SNAP,JSON.stringify(old));}catch(e){}save();return current;}catch(e){throw Error('Нет корректного снимка для восстановления / Қалпына келтіру нұсқасы табылмады.');}}
function importData(raw){let data;try{data=JSON.parse(raw);}catch(e){throw Error('Некорректный JSON: файл не удалось разобрать.');}if(!isData(data))throw Error('Некорректная структура SkillBridge JSON (schemaVersion 1).');if(data.users.length>5000||data.orders.length>10000)throw Error('Файл слишком большой для демо-версии.');backup();current=data;save();return current;}
function download(){const json=JSON.stringify(state(),null,2);const url=URL.createObjectURL(new Blob([json],{type:'application/json;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='skillbridge-demo-'+new Date().toISOString().slice(0,10)+'.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);return true;}
async function saveFile(){if('showSaveFilePicker' in window && window.isSecureContext){try{if(!fileHandle)fileHandle=await window.showSaveFilePicker({suggestedName:'skillbridge-demo.json',types:[{description:'SkillBridge JSON',accept:{'application/json':['.json']}}]});const writable=await fileHandle.createWritable();await writable.write(JSON.stringify(state(),null,2));await writable.close();return 'file';}catch(e){if(e.name==='AbortError')return 'cancel';console.warn('Save picker unavailable:',e);download();return 'download';}}download();return 'download';}
function stats(){const d=state();return {users:d.users.length,orders:d.orders.length,size:new Blob([JSON.stringify(d)]).size,modified:d.meta.lastModified};}
window.SBStorage={load,state,save,backup,reset,restore,importData,download,saveFile,isData,stats};
})();