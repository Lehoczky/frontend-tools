import{P as N,a as C,s as m,o as c,b as _,e as t,u as a,h as R,Q as j,z as M,I as U,j as d,w as f,R as b,S as v,i as k,c as y,U as P,V as z,W as S,X as I,C as E,r as $,Y as g}from"./entry.415f09a9.js";import{_ as T}from"./NumberInput.vue.a7f3cd17.js";import{t as D,a as W,r as B}from"./index.d003c9c5.js";import{_ as X}from"./InlineLink.458b90a1.js";const F=Symbol("RadioGroupContext");function H(i){const e=N(F,null);if(e===null)throw new Error(`<${i} /> is missing a parent <RadioGroup /> component.`);return e}const L={class:"cursor-pointer"},O=["name","checked","value"],q=C({__name:"RadioButton",props:{value:{}},setup(i){const e=i,s=H("RadioGroupOption"),o=m(()=>s.value.value===e.value);return(n,u)=>(c(),_("label",L,[t("input",{type:"radio",class:"mr-1 inline-flex h-7 w-7 cursor-pointer appearance-none items-center justify-center rounded-full border-2 border-base-200 after:h-5 after:w-5 after:scale-0 after:rounded-full after:bg-base-200 after:transition-transform after:duration-200 after:ease-out checked:after:scale-100 sm:h-5 sm:w-5 sm:after:h-3 sm:after:w-3",name:a(s).id,checked:a(o),value:n.value,onChange:u[0]||(u[0]=x=>a(s).change(n.value))},null,40,O),t("span",null,[R(n.$slots,"default")])]))}}),A=C({__name:"RadioGroup",props:{id:{},modelValue:{default:void 0}},emits:["update:modelValue"],setup(i,{emit:e}){const s=i,o=m(()=>s.modelValue);return j(F,{value:o,id:s.id,change(n){e("update:modelValue",n)}}),(n,u)=>(c(),_("fieldset",null,[R(n.$slots,"default")]))}}),Q={class:"grid grid-cols-[auto_1fr] items-center gap-2 sm:gap-7"},Y=t("div",{class:"text-2xl"},"Units:",-1),J={class:"col-span-2 mb-2.5 sm:col-span-1 sm:mb-0"},K=t("div",{class:"text-2xl"},"Range:",-1),Z={class:"col-span-2 mb-2.5 flex items-center gap-2 text-xl sm:col-span-1 sm:mb-0 sm:gap-5"},ee=t("div",{class:"hidden sm:block"},"from",-1),te=t("div",null,"to",-1),ne=t("div",{class:"text-2xl"},"Viewport:",-1),oe={class:"col-span-2 flex items-center gap-2 text-xl sm:col-span-1 sm:gap-5"},se=t("div",{class:"hidden sm:block"},"from",-1),ae=t("div",null,"to",-1),le=C({__name:"InputGrid",props:{minValue:{},maxValue:{},minViewport:{},maxViewport:{},unit:{}},emits:["update:minValue","update:maxValue","update:minViewport","update:maxViewport","update:unit"],setup(i,{emit:e}){const s=i;return M(U(s,"unit"),o=>{const n=o==="px"?D:W;e("update:minValue",n(s.minValue)),e("update:maxValue",n(s.maxValue)),e("update:minViewport",n(s.minViewport)),e("update:maxViewport",n(s.maxViewport))}),(o,n)=>{const u=q,x=A,l=T;return c(),_("div",Q,[Y,t("div",J,[d(x,{id:"fluid-css-unit","model-value":o.unit,class:"flex gap-5","onUpdate:modelValue":n[0]||(n[0]=r=>o.$emit("update:unit",r))},{default:f(()=>[d(u,{value:"rem"},{default:f(()=>[b("REM")]),_:1}),d(u,{value:"px"},{default:f(()=>[b("PX")]),_:1})]),_:1},8,["model-value"])]),K,t("div",Z,[ee,d(l,{"model-value":o.minValue,class:"max-w-[9rem]","onUpdate:modelValue":n[1]||(n[1]=r=>o.$emit("update:minValue",r))},null,8,["model-value"]),te,d(l,{"model-value":o.maxValue,class:"max-w-[9rem]","onUpdate:modelValue":n[2]||(n[2]=r=>o.$emit("update:maxValue",r))},null,8,["model-value"]),t("div",null,v(o.unit),1)]),ne,t("div",oe,[se,d(l,{"model-value":o.minViewport,class:"max-w-[9rem]","onUpdate:modelValue":n[3]||(n[3]=r=>o.$emit("update:minViewport",r))},null,8,["model-value"]),ae,d(l,{"model-value":o.maxViewport,class:"max-w-[9rem]","onUpdate:modelValue":n[4]||(n[4]=r=>o.$emit("update:maxViewport",r))},null,8,["model-value"]),t("div",null,v(o.unit),1)])])}}}),ie={},ue={xmlns:"http://www.w3.org/2000/svg",class:"h-7 w-7",viewBox:"0 0 16 16"},re=t("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1.5",d:"m2.75 8.75l3.5 3.5l7-7.5"},null,-1),ce=[re];function de(i,e){return c(),_("svg",ue,ce)}const me=k(ie,[["render",de]]),pe={},_e={xmlns:"http://www.w3.org/2000/svg",class:"h-7 w-7",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},ve=t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"},null,-1),xe=[ve];function fe(i,e){return c(),_("svg",_e,xe)}const we=k(pe,[["render",fe]]);const he={};function Ve(i,e){return c(),y(P,{name:"fade"},{default:f(()=>[R(i.$slots,"default",{},void 0,!0)]),_:3})}const $e=k(he,[["render",Ve],["__scopeId","data-v-83855477"]]),ge={__name:"CopyButton",props:{text:{type:String,required:!0}},setup(i){const e=i,{copy:s,copied:o}=z({source:U(e,"text")});return(n,u)=>{const x=me,l=we,r=$e;return c(),_("button",{class:"text-code-natural hover:text-white active:scale-90","aria-label":"Copy CSS",onClick:u[0]||(u[0]=w=>a(s)())},[d(r,{mode:"out-in"},{default:f(()=>[a(o)?(c(),y(x,{key:0,class:"text-green-500"})):(c(),y(l,{key:1}))]),_:1})])}}},Ce={class:"relative min-h-[4rem] rounded-sm bg-base-800 py-5 pl-5 pr-14"},ke={class:"leading-none"},be=t("span",{class:"text-code-blue"},"clamp",-1),ye=t("span",{class:"text-code-purple"},"(",-1),Re={class:"text-code-yellow"},Se={class:"text-code-red"},Ie=t("span",{class:"text-code-natural"},", ",-1),Be={class:"text-code-yellow"},Ue={class:"text-code-red"},Fe=t("span",{class:"text-code-blue"}," + ",-1),Ge={class:"text-code-yellow"},Ne=t("span",{class:"text-code-red"},"vw",-1),je=t("span",{class:"text-code-natural"},", ",-1),Me={class:"text-code-yellow"},Pe={class:"text-code-red"},ze=t("span",{class:"text-code-purple"},")",-1),Ee=C({__name:"CodeBlock",props:{minValue:{},maxValue:{},minViewport:{},maxViewport:{},unit:{}},setup(i){const e=i,s=m(()=>e.maxValue-e.minValue),o=m(()=>e.maxViewport-e.minViewport),n=m(()=>isNaN(s.value)||isNaN(o.value)),u=m(()=>Math.min(e.minValue,e.maxValue)),x=m(()=>Math.max(e.minValue,e.maxValue)),l=m(()=>1/o.value*s.value),r=m(()=>B(e.minValue-e.minViewport*l.value,4)),w=m(()=>r.value!==0),h=m(()=>B(100*l.value,4)),p=m(()=>{if(n.value)return"";const V=w.value?`${r.value}${e.unit} + ${h.value}vw`:`${h.value}vw`;return`clamp(${u.value}${e.unit}, ${V}, ${x.value}${e.unit})`});return(V,Le)=>{const G=ge;return c(),_("div",Ce,[t("code",ke,[a(n)?I("",!0):(c(),_(S,{key:0},[be,ye,t("span",Re,v(a(u)),1),t("span",Se,v(V.unit),1),Ie,a(w)?(c(),_(S,{key:0},[t("span",Be,v(a(r)),1),t("span",Ue,v(V.unit),1),Fe],64)):I("",!0),t("span",Ge,v(a(h)),1),Ne,je,t("span",Me,v(a(x)),1),t("span",Pe,v(V.unit),1),ze],64))]),d(G,{class:"absolute right-5 top-5",text:a(p)},null,8,["text"])])}}}),Te={},De=t("span",{class:"mr-1"},"Or use",-1);function We(i,e){const s=X;return c(),_("div",null,[De,d(s,{to:"https://github.com/Lehoczky/postcss-fluid",target:"_blank"},{default:f(()=>[b("@lehoczky/postcss-fluid")]),_:1})])}const Xe=k(Te,[["render",We]]),He=t("h1",{class:"mb-article-heading text-3xl"},"Fluid CSS calculator",-1),Ye=C({__name:"fluid-css",setup(i){E({title:"Fluid CSS"});const e=$("rem"),s=$(1),o=$(1.5),n=$(40),u=$(120);return(x,l)=>{const r=le,w=Ee,h=Xe;return c(),_("div",null,[He,d(r,{"min-value":a(s),"onUpdate:minValue":l[0]||(l[0]=p=>g(s)?s.value=p:null),"max-value":a(o),"onUpdate:maxValue":l[1]||(l[1]=p=>g(o)?o.value=p:null),"min-viewport":a(n),"onUpdate:minViewport":l[2]||(l[2]=p=>g(n)?n.value=p:null),"max-viewport":a(u),"onUpdate:maxViewport":l[3]||(l[3]=p=>g(u)?u.value=p:null),unit:a(e),"onUpdate:unit":l[4]||(l[4]=p=>g(e)?e.value=p:null)},null,8,["min-value","max-value","min-viewport","max-viewport","unit"]),d(w,{class:"mt-5","min-value":a(s),"max-value":a(o),"min-viewport":a(n),"max-viewport":a(u),unit:a(e)},null,8,["min-value","max-value","min-viewport","max-viewport","unit"]),d(h,{class:"mt-4"})])}}});export{Ye as default};
