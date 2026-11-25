const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const {createStore} = require('./store');
const {localDate} = require('./seed');
function normalize(v=''){return String(v).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[đĐ]/g,'d').toLowerCase();}
function validate(t){
  if(!t || typeof t!=='object' || Array.isArray(t))throw new Error('Dữ liệu không hợp lệ.');
  const title=typeof t.title==='string'?t.title.trim():'';
  const description=typeof t.description==='string'?t.description.trim():'';
  const {due_date,category,priority,status}=t;
  if(!title || title.length>150)throw new Error('Tên công việc phải có từ 1 đến 150 ký tự.');
  if(description.length>1000)throw new Error('Mô tả tối đa 1000 ký tự.');
  if(typeof due_date!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(due_date)||!Number.isFinite(Date.parse(due_date))||new Date(due_date).toISOString().slice(0,10)!==due_date)throw new Error('Ngày không hợp lệ.');
  if(!['study','work','personal'].includes(category)||!['low','medium','high'].includes(priority)||!['todo','doing','done'].includes(status))throw new Error('Danh mục, ưu tiên hoặc trạng thái không hợp lệ.');
  return {title,description,due_date,category,priority,status};
}
function stats(tasks){
  const today=localDate();
  const count=(field,value)=>tasks.filter(t=>t[field]===value).length;
  const done=count('status','done');
  const trend=Array.from({length:7},(_,i)=>{const date=localDate(i-6);const items=tasks.filter(t=>t.due_date===date);return {date,total:items.length,done:items.filter(t=>t.status==='done').length};});
  return {total:tasks.length,done,todo:count('status','todo'),doing:count('status','doing'),today:count('due_date',today),overdue:tasks.filter(t=>t.due_date<today&&t.status!=='done').length,rate:tasks.length?Math.round(done/tasks.length*100):0,categories:['study','work','personal'].map(key=>({key,total:count('category',key)})),trend};
}
async function body(req){let size=0;const chunks=[];for await(const chunk of req){size+=chunk.length;if(size>32768)throw new Error('Dữ liệu quá lớn.');chunks.push(chunk);}try{return JSON.parse(Buffer.concat(chunks).toString());}catch{throw new Error('JSON không hợp lệ.');}}
function createApp({memory=false,dbPath}={}){
  const store=createStore(memory,dbPath);
  const staticFiles={'/':['index.html','text/html'],'/index.html':['index.html','text/html'],'/style.css':['style.css','text/css'],'/app.js':['app.js','text/javascript']};
  const server=http.createServer(async(req,res)=>{
    const send=(code,data)=>{res.writeHead(code,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(data));};
    try {
      const url=new URL(req.url,'http://localhost');const p=url.pathname;const method=req.method;
      if(method==='GET'&&staticFiles[p]){const [file,type]=staticFiles[p];res.writeHead(200,{'Content-Type':type+'; charset=utf-8'});return res.end(fs.readFileSync(path.join(__dirname,'public',file)));}
      if(method==='GET'&&p==='/api/info')return send(200,{mode:memory?'memory':'sqlite',today:localDate()});
      if(method==='GET'&&p==='/api/stats')return send(200,stats(store.list()));
      if(p==='/api/tasks'&&method==='GET'){
        const q=url.searchParams;let items=store.list();const term=normalize(q.get('q')||'');
        if(term)items=items.filter(t=>normalize(t.title+' '+t.description).includes(term));
        for(const f of ['status','category','priority'])if(q.get(f)&&q.get(f)!=='all')items=items.filter(t=>t[f]===q.get(f));
        if(q.get('scope')==='today')items=items.filter(t=>t.due_date===localDate());
        if(q.get('scope')==='overdue')items=items.filter(t=>t.due_date<localDate()&&t.status!=='done');
        const weights={high:0,medium:1,low:2};items.sort((a,b)=>a.due_date.localeCompare(b.due_date)||weights[a.priority]-weights[b.priority]||b.id-a.id);
        return send(200,items);
      }
      if(p==='/api/tasks'&&method==='POST'){let t;try{t=validate(await body(req));}catch(e){return send(400,{error:e.message});}return send(201,store.add(t));}
      const match=p.match(/^\/api\/tasks\/(\d+)$/);
      if(match){const id=Number(match[1]);if(!store.get(id))return send(404,{error:'Không tìm thấy công việc.'});
        if(method==='PUT'){let t;try{t=validate(await body(req));}catch(e){return send(400,{error:e.message});}return send(200,store.update(id,t));}
        if(method==='DELETE'){store.remove(id);return send(200,{ok:true});}
      }
      return send(404,{error:'Không tìm thấy tài nguyên.'});
    }catch(e){console.error(e);if(!res.headersSent)send(500,{error:'Lỗi máy chủ.'});else res.end();}
  });
  server.on('close',()=>store.close());return server;
}
if(require.main===module){const memory=process.argv.includes('--memory');const port=Number(process.env.PORT||3000);const server=createApp({memory});server.listen(port,'127.0.0.1',()=>console.log(`TODO App: http://localhost:${port}\nStorage: ${memory?'Memory (no database)':'SQLite database'}`));}
module.exports={createApp};
