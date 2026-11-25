const fs = require('node:fs');
const path = require('node:path');
const {seedTasks} = require('./seed');
const fields = ['title','description','due_date','category','priority','status'];
function createStore(memory, dbPath = path.join(__dirname,'database','tasks.db')) {
  if(memory) {
    let nextId=1;
    let tasks=seedTasks().map(t=>({...t,id:nextId++,created_at:new Date().toISOString()}));
    return {
      list:()=>tasks.map(t=>({...t})),
      get:id=>tasks.find(t=>t.id===id),
      add:t=>{const task={...t,id:nextId++,created_at:new Date().toISOString()};tasks.push(task);return task;},
      update:(id,t)=>{const i=tasks.findIndex(x=>x.id===id);if(i<0)return;tasks[i]={...tasks[i],...t};return tasks[i];},
      remove:id=>{const n=tasks.length;tasks=tasks.filter(t=>t.id!==id);return tasks.length<n;},
      close:()=>{}
    };
  }
  const {DatabaseSync} = require('node:sqlite');
  fs.mkdirSync(path.dirname(dbPath),{recursive:true});
  const db = new DatabaseSync(dbPath);
  db.exec(fs.readFileSync(path.join(__dirname,'database','schema.sql'),'utf8'));
  const insert=db.prepare('INSERT INTO tasks (title,description,due_date,category,priority,status) VALUES (?,?,?,?,?,?)');
  const get=db.prepare('SELECT * FROM tasks WHERE id=?');
  const values=t=>fields.map(f=>t[f]);
  if(!db.prepare("SELECT value FROM app_meta WHERE key='seeded'").get()) {
    db.exec('BEGIN');
    try { for(const t of seedTasks())insert.run(...values(t)); db.exec("INSERT INTO app_meta VALUES ('seeded','1'); COMMIT"); }
    catch(e){db.exec('ROLLBACK');throw e;}
  }
  return {
    list:()=>db.prepare('SELECT * FROM tasks ORDER BY id DESC').all(),
    get:id=>get.get(id),
    add:t=>get.get(insert.run(...values(t)).lastInsertRowid),
    update:(id,t)=>{db.prepare('UPDATE tasks SET title=?,description=?,due_date=?,category=?,priority=?,status=? WHERE id=?').run(...values(t),id);return get.get(id);},
    remove:id=>db.prepare('DELETE FROM tasks WHERE id=?').run(id).changes>0,
    close:()=>db.close()
  };
}
module.exports={createStore};
