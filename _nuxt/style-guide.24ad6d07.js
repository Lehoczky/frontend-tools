import g from"./ContentRenderer.cdf7f34d.js";import{D as u,q as f,F as b,a1 as v,a as h,o as c,m as i,M as _,U as x,a2 as y,V as k,P as d,w as m,Q as w,S as C,a3 as B,j as H,c as N}from"./entry.7150ef7c.js";import S from"./ContentDoc.ed73d06c.js";import"./ContentRendererMarkdown.7cb08a88.js";import"./index.a6ef77ff.js";import"./preview.b25cf478.js";import"./ContentQuery.101a97df.js";import"./query.2e210a0c.js";import"./utils.54a6d093.js";const T=()=>{const s=u(),o=u([]),r=u([]);function l(e){e.forEach(t=>{const a=t.target.id;t.isIntersecting?o.value.push(a):o.value=o.value.filter(p=>p!==a)})}function n(e){e.forEach(t=>{s.value.observe(t)})}return f(o,(e,t)=>{r.value=e.length===0?t:e},{deep:!0}),b(()=>{s.value=new IntersectionObserver(l)}),v(()=>{var e;return(e=s.value)==null?void 0:e.disconnect()}),{visibleHeadings:o,activeHeadings:r,updateHeadings:n}},V={class:"hidden sm:block"},$={"aria-labelledby":"aside-toc"},q=_("div",{id:"aside-toc",class:"mb-2 text-2xl lg:text-lg"}," Table of contents ",-1),O={key:0,class:"flex-wrap gap-x-8 gap-y-1.5 sm:flex lg:flex-col lg:gap-0.5"},A=h({__name:"TableOfContents",props:{value:{type:Object,required:!0}},setup(s){const{updateHeadings:o,activeHeadings:r}=T();function l(n){return r.value.includes(n)}return setTimeout(()=>{o([...document.querySelectorAll("h1"),...document.querySelectorAll("h2")])},300),(n,e)=>{const t=H;return c(),i("aside",V,[_("nav",$,[q,s.value.links?(c(),i("ul",O,[(c(!0),i(x,null,y(s.value.links,a=>(c(),i("li",{key:a.text},[d(t,{to:`#${a.id}`,class:B(["bg-gradient-to-r from-base-300 to-base-300 bg-[length:0_2px] bg-right-bottom bg-no-repeat pb-px text-base-300 transition-[background-size] duration-300 hover:from-base-200 hover:to-base-200 hover:bg-[length:100%_2px] hover:bg-left-bottom hover:text-base-200 hover:text-opacity-100 motion-reduce:transition-none",{"!from-sky-500 !to-sky-500 bg-[length:100%_2px] !text-sky-500 ":l(a.id)}])},{default:m(()=>[w(C(a.text),1)]),_:2},1032,["to","class"])]))),128))])):k("",!0)])])}}}),D={class:"grid gap-y-8 font-sans lg:grid-cols-[auto_256px] lg:grid-rows-none lg:gap-x-10"},Q={__name:"style-guide",setup(s){return(o,r)=>{const l=g,n=A,e=S;return c(),N(e,null,{default:m(({doc:t})=>[_("div",D,[d(l,{class:"overflow-x-hidden",value:t},null,8,["value"]),d(n,{class:"top-28 row-start-1 self-baseline lg:sticky lg:row-start-auto",value:t.body.toc},null,8,["value"])])]),_:1})}}};export{Q as default};
