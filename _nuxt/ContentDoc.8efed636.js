import{j as h,l as g,O as y,P as _,u as w,Q as C,g as v,R as D,S,U as r}from"./entry.4537489b.js";import x from"./ContentRenderer.c5f62648.js";import q from"./ContentQuery.727460e2.js";import"./ContentRendererMarkdown.a147c3d7.js";import"./index.9b0bef9c.js";import"./preview.bc42ae0c.js";import"./query.b7838172.js";import"./utils.3a8467be.js";const a=(u,e=y())=>{const f=h(u),p=C();g(()=>h(u),(t=f)=>{if(!e.path||!t)return;const n=Object.assign({},(t==null?void 0:t.head)||{});n.meta=[...n.meta||[]],n.link=[...n.link||[]];const c=n.title||(t==null?void 0:t.title);c&&(n.title=c),p.public.content.host;const s=(n==null?void 0:n.description)||(t==null?void 0:t.description);s&&n.meta.filter(i=>i.name==="description").length===0&&n.meta.push({name:"description",content:s}),n!=null&&n.image||(t==null||t.image),_(()=>w(n))},{immediate:!0})},H=v({name:"ContentDoc",props:{tag:{type:String,required:!1,default:"div"},excerpt:{type:Boolean,default:!1},path:{type:String,required:!1,default:void 0},query:{type:Object,required:!1,default:void 0},head:{type:Boolean,required:!1,default:!0}},render(u){const e=D(),{tag:f,excerpt:p,path:m,query:t,head:n}=u,c={...t||{},path:m||(t==null?void 0:t.path)||S(y().path),find:"one"},s=(i,o)=>r("pre",null,JSON.stringify({message:"You should use slots with <ContentDoc>",slot:i,data:o},null,2));return r(q,c,{default:e!=null&&e.default?({data:i,refresh:o,isPartial:d})=>{var l;return n&&a(i),(l=e.default)==null?void 0:l.call(e,{doc:i,refresh:o,isPartial:d,excerpt:p,...this.$attrs})}:({data:i})=>(n&&a(i),r(x,{value:i,excerpt:p,tag:f,...this.$attrs},{empty:o=>e!=null&&e.empty?e.empty(o):s("default",i)})),empty:i=>{var o;return((o=e==null?void 0:e.empty)==null?void 0:o.call(e,i))||r("p",null,"Document is empty, overwrite this content with #empty slot in <ContentDoc>.")},"not-found":i=>{var o;return((o=e==null?void 0:e["not-found"])==null?void 0:o.call(e,i))||r("p",null,"Document not found, overwrite this content with #not-found slot in <ContentDoc>.")}})}}),P=H;export{P as default};
