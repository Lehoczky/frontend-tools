import{a as l,f as t,j as c,o as d,c as i,w as b,r as u,Y as m,u as a,a0 as p}from"./entry.7150ef7c.js";const v=l({__name:"Button",props:{color:{type:String,default:"default"},to:{type:[String,Object],default:void 0,required:!1}},setup(e){const o=e,s=t(()=>o.to?c:"button"),r=t(()=>o.to?{target:"_blank"}:{});return(n,g)=>(d(),i(p(a(s)),m({to:e.to,class:["transition-color inline-flex items-center gap-1.5 rounded-md px-6 py-4 ease-out active:scale-95 disabled:opacity-50 disabled:active:scale-100 sm:px-4 sm:py-2",{"bg-base-500 hover:bg-base-400 disabled:hover:bg-base-500":e.color==="default","bg-sky-800 hover:bg-sky-700 disabled:hover:bg-sky-800":e.color==="blue","bg-rose-800 hover:bg-rose-700 disabled:hover:bg-rose-800":e.color==="red"}]},a(r)),{default:b(()=>[u(n.$slots,"default")]),_:3},16,["to","class"]))}});export{v as _};
