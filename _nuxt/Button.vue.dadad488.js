import{a as i,s as a,k as c,o as d,c as u,w as b,h as f,a0 as g,u as s,a3 as m}from"./entry.dd9801bd.js";const y=i({__name:"Button",props:{color:{type:String,default:"default"},size:{type:String,default:"default"},to:{type:[String,Object],default:void 0,required:!1}},setup(e){const t=e,r=a(()=>t.to?c:"button"),n=a(()=>t.to&&l(t.to)?{target:"_blank"}:{});function l(o){return o.startsWith("http")}return(o,p)=>(d(),u(m(s(r)),g({to:e.to,class:["transition-color inline-flex items-center gap-1.5 rounded-md ease-out active:scale-95 disabled:opacity-50 disabled:active:scale-100",{"bg-base-500 hover:bg-base-400 disabled:hover:bg-base-500":e.color==="default","bg-sky-800 hover:bg-sky-700 disabled:hover:bg-sky-800":e.color==="blue","bg-rose-800 hover:bg-rose-700 disabled:hover:bg-rose-800":e.color==="red","px-6 py-4 sm:px-4 sm:py-2":e.size==="default","px-8 py-5 text-2xl":e.size==="large"}]},s(n)),{default:b(()=>[f(o.$slots,"default")]),_:3},16,["to","class"]))}});export{y as _};