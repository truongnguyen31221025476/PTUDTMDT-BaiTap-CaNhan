const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const os=require('node:os');
const path=require('node:path');
const {createApp}=require('../server');
const {localDate}=require('../seed');
async function start(options){const server=createApp(options);await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));return {server,url:`http://127.0.0.1:${server.address().port}`};}
async function stop(server){await new Promise(resolve=>server.close(resolve));}
async function request(url,route,method='GET',data){const response=await fetch(url+route,{method,headers:{'Content-Type':'application/json'},body:data===undefined?undefined:JSON.stringify(data)});return {status:response.status,data:await response.json()};}
const sample={title:'Kiểm thử ứng dụng',description:'Test dữ liệu',due_date:localDate(),category:'study',priority:'high',status:'todo'};
for(const memory of [true,false])test(memory?'CRUD và thống kê không CSDL':'CRUD và thống kê SQLite',async()=>{
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'todo-test-'));const dbPath=path.join(dir,'tasks.db');let app=await start({memory,dbPath});
  try{
    let r=await request(app.url,'/api/info');assert.equal(r.data.mode,memory?'memory':'sqlite');
    const page=await fetch(app.url+'/');assert.equal(page.status,200);assert.match(await page.text(),/Danh sách công việc/);
    r=await request(app.url,'/api/tasks?scope=today');assert.equal(r.data.length,4);assert.ok(r.data.every(t=>t.due_date===localDate()));
    r=await request(app.url,'/api/tasks?scope=overdue');assert.equal(r.data.length,1);
    r=await request(app.url,'/api/tasks','POST',sample);assert.equal(r.status,201);const id=r.data.id;
    r=await request(app.url,'/api/tasks?scope=today&q=kiem%20thu&category=study&priority=high&status=todo');assert.equal(r.data.length,1);assert.equal(r.data[0].id,id);
    r=await request(app.url,`/api/tasks/${id}`,'PUT',{...sample,title:'Đã sửa công việc',status:'done'});assert.equal(r.data.status,'done');
    r=await request(app.url,'/api/stats');assert.equal(r.data.total,8);assert.equal(r.data.done,3);assert.equal(r.data.rate,38);
    r=await request(app.url,'/api/tasks','POST',{...sample,title:''});assert.equal(r.status,400);
    r=await request(app.url,'/api/tasks','POST',{...sample,due_date:'2026-02-30'});assert.equal(r.status,400);
    await stop(app.server);app=await start({memory,dbPath});
    r=await request(app.url,'/api/tasks?q='+encodeURIComponent('Đã sửa công việc'));assert.equal(r.data.length,memory?0:1);
    if(!memory){r=await request(app.url,`/api/tasks/${id}`,'DELETE');assert.equal(r.status,200);r=await request(app.url,`/api/tasks/${id}`,'DELETE');assert.equal(r.status,404);}
    else {r=await request(app.url,'/api/tasks','POST',sample);const newId=r.data.id;r=await request(app.url,`/api/tasks/${newId}`,'DELETE');assert.equal(r.status,200);}
    r=await request(app.url,'/api/stats');assert.equal(r.data.total,7);assert.equal(r.data.done,2);
  }finally{if(app.server.listening)await stop(app.server);fs.rmSync(dir,{recursive:true,force:true});}
});
