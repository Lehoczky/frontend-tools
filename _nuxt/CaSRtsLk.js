const __vite__fileDeps=["./BgjyxHTp.js","./BXPlgg2r.js","./entry.Wc4d9z5H.css"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{o as d,c as k,r as Z,I as F,g as j,h as M,v as B,j as t,z as X,A as e1,a as _,x as T,J as U,_ as b,b as s,w as l,n as R,T as Y,p as t1,f as c1,y as o1,K as n1,G as s1,u as a1,l as l1,d as h,t as S,s as r1,L as A1,M as i1}from"./BXPlgg2r.js";import{i as u1,d as d1,b as z}from"./CYNFVGaV.js";import{_ as $}from"./CkO6MCar.js";const f1={__name:"TimerDigit",props:{fade:{type:Boolean,default:!1},hide:{type:Boolean,default:!1},showCaret:{type:Boolean,default:!1}},setup(c){return(e,A)=>(d(),k("div",{class:F(["relative w-[1ch] text-center after:absolute after:-right-0 after:bottom-0.5 after:left-0 after:h-0.5 after:bg-current after:opacity-0",{"opacity-50":c.fade,"opacity-0":c.hide,"after:opacity-100":c.showCaret}])},[Z(e.$slots,"default")],2))}},m1={__name:"TimerCharacter",props:{fade:{type:Boolean,default:!1},hide:{type:Boolean,default:!1}},setup(c){return(e,A)=>(d(),k("div",{class:F({"opacity-50":c.fade,"opacity-0":c.hide})},[Z(e.$slots,"default")],2))}},p1=["disabled"],P=6,h1=j({__name:"TimerInput",props:{disabled:{type:Boolean,default:!1},modelValue:{default:void 0}},emits:["update:modelValue","caret-position-change"],setup(c,{emit:e}){const A=c,r=e,i=M({get(){return A.modelValue},set(g){r("update:modelValue",g)}}),f=B(),a=B(!1);function C(g){u1(g.key)||g.preventDefault()}const w=B(0);function K(){w.value=Math.min(w.value+1,f.value.value.length)}function W(){w.value=Math.max(w.value-1,0)}function E(){f.value.selectionStart=f.value.value.length,f.value.focus()}function N(){a.value=!0}function V(){a.value=!1,w.value=0}return(g,u)=>(d(),k("div",{class:F(["flex cursor-text justify-center rounded-md bg-base-500 px-5 py-4 text-4xl outline-none ring-gray-600 focus-within:ring sm:justify-normal",{"text-opacity-50":t(a)}]),onClick:E},[Z(g.$slots,"default",{editing:t(a),caretPosition:t(w)}),X(_("input",{ref_key:"input",ref:f,"onUpdate:modelValue":u[0]||(u[0]=x=>T(i)?i.value=x:null),type:"tel",class:"sr-only",maxlength:P,disabled:g.disabled,onKeypress:u[1]||(u[1]=x=>C(x)),onKeydown:[u[2]||(u[2]=U(x=>K(),["left"])),u[3]||(u[3]=U(x=>W(),["right"]))],onFocus:u[4]||(u[4]=x=>N()),onBlur:u[5]||(u[5]=x=>V())},null,40,p1),[[e1,t(i)]])],2))}}),_1={},v1={xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},w1=_("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"},null,-1),g1=_("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M21 12a9 9 0 11-18 0 9 9 0 0118 0z"},null,-1),k1=[w1,g1];function x1(c,e){return d(),k("svg",v1,k1)}const I1=b(_1,[["render",x1]]),y1={},C1={xmlns:"http://www.w3.org/2000/svg",class:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},B1=_("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"},null,-1),b1=[B1];function Q1(c,e){return d(),k("svg",C1,b1)}const D1=b(y1,[["render",Q1]]),q=c=>(t1("data-v-d2bd79e4"),c=c(),c1(),c),S1={class:"relative h-14 sm:w-28"},E1=q(()=>_("span",{class:"text-2xl sm:text-lg"},"Start",-1)),L1=q(()=>_("span",{class:"text-2xl sm:text-base"},"Pause",-1)),M1=j({__name:"TimerControlButtons",props:{countingDown:{type:Boolean,default:!1},startDisabled:{type:Boolean,default:!1}},emits:["update:countingDown"],setup(c,{emit:e}){const A=e;return(r,i)=>{const f=I1,a=$,C=D1;return d(),k("div",S1,[s(Y,{name:"slide-up"},{default:l(()=>[c.countingDown?(d(),R(a,{key:1,class:"absolute w-full justify-center !p-4 will-change-transform sm:h-full sm:px-6 sm:py-4",color:"red","aria-label":"Pause",onClick:i[1]||(i[1]=w=>A("update:countingDown",!1))},{default:l(()=>[L1,s(C,{class:"h-9 w-9 sm:h-5 sm:w-5"})]),_:1})):(d(),R(a,{key:0,class:"absolute w-full justify-center !p-4 will-change-transform sm:h-full sm:px-6 sm:py-4",color:"blue",disabled:c.startDisabled,"aria-label":"Start",onClick:i[0]||(i[0]=w=>A("update:countingDown",!0))},{default:l(()=>[E1,s(f,{class:"h-9 w-9 sm:h-5 sm:w-5"})]),_:1},8,["disabled"]))]),_:1})])}}}),U1=b(M1,[["__scopeId","data-v-d2bd79e4"]]),R1={},Z1={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 640 512"},K1=_("path",{d:"M512 32H120c-13.25 0-24 10.75-24 24L96.01 288c0 53 43 96 96 96h192C437 384 480 341 480 288h32c70.63 0 128-57.38 128-128S582.6 32 512 32zM512 224h-32V96h32c35.25 0 64 28.75 64 64S547.3 224 512 224zM560 416h-544C7.164 416 0 423.2 0 432C0 458.5 21.49 480 48 480h480c26.51 0 48-21.49 48-48C576 423.2 568.8 416 560 416z"},null,-1),W1=[K1];function N1(c,e){return d(),k("svg",Z1,W1)}const V1=b(R1,[["render",N1]]),G1={},T1={xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",viewBox:"0 0 48 48"},F1=o1('<mask id="ipSChickenLeg0"><g fill="none"><path fill="#fff" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M33.375 33.874c4.242-4.242 1.414-18.384-4.95-24.748c-2.828-2.829-10.96-8.84-19.799 0c-8.839 8.838-2.828 16.97 0 19.799c6.364 6.364 20.506 9.192 24.749 4.95Z"></path><path stroke="#fff" stroke-width="4" d="m41 41l-7-7"></path><circle cx="42.193" cy="40.071" r="2.5" fill="#fff" transform="rotate(135 42.193 40.071)"></circle><circle cx="40.072" cy="42.192" r="2.5" fill="#fff" transform="rotate(135 40.072 42.192)"></circle><circle cx="17" cy="18" r="2" fill="#000"></circle><circle cx="12" cy="21" r="2" fill="#000"></circle><circle cx="17" cy="24" r="2" fill="#000"></circle></g></mask><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSChickenLeg0)"></path>',2),j1=[F1];function z1(c,e){return d(),k("svg",T1,j1)}const Y1=b(G1,[["render",z1]]),$1={},P1={xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",viewBox:"0 0 64 64"},q1=_("path",{fill:"currentColor",d:"M31.999 13c-5.822 0-11.257 1.002-15.861 2.729c-.515.11-1.044.294-1.519.609a32.99 32.99 0 0 0-2.252 1.07a1.895 1.895 0 0 0-.997.539a25.58 25.58 0 0 0-3.574 2.433a2.029 2.029 0 0 0-.552-.083c-.55 0-1.063.226-1.446.634c-.592.633-.738 1.384-.701 2.106c-.057.07-.107.142-.163.212c-.615.225-1.163.752-1.301 1.666c-.012.078-.004.159-.01.237C2.573 26.98 2 28.938 2 30.976c0 4.288 2.522 8.229 6.72 11.323C12.433 47.396 21.443 51 32 51c10.558 0 19.573-3.605 23.285-8.705C59.479 39.201 62 35.262 62 30.976C62 21.063 48.541 13 31.999 13M5.611 24.613c.513 0 1.262.61 1.558.915c-.36.359-.729.918-1.009 1.602a6.802 6.802 0 0 0-.161.442c-.056-.161-.167-.348-.354-.659c-.303-.502-.619-1.166-.528-1.773c.057-.385.248-.527.494-.527M4.14 30.315c-.151-.545.466-.814.882-.904c.458-.099.632-.079.729-.189c.034.338.144.571.334.631c.482.15 1.296-.826 1.856-2.113c.562-1.293.641-2.434.141-2.621c-.232-.086-.547.063-.871.372c-.135-.966-1.131-2.665-.319-3.532a.466.466 0 0 1 .352-.16c.321 0 .667.303.858.516c.08.088.163.141.247.178l-.001.064c.044 1.307.53 2.311 1.082 2.236c.391-.051.719-.61.875-1.375c.426.282 1.485-.268 2.439-1.172c.972-.925 1.461-1.874 1.052-2.206c-.406-.334-1.558.084-2.53 1.021c-.17.164-.316.332-.451.499c-1.565-.119.763-1.833 1.425-2.087c.091-.476.289-.613.537-.613c.116 0 .245.033.377.073c-.066.119-.092.234-.053.339c.177.469 1.41.518 2.774.184c1.366-.336 2.361-.898 2.207-1.334c-.153-.434-1.415-.604-2.804-.301c-.042.009-.079.021-.12.031c.982-1.068 3.173-.563 4.074-1.309c.108-.091.256-.121.411-.121a2.3 2.3 0 0 1 .557.09c.178.046.312.063.43.063c.258 0 .438-.079.819-.102c.034-.002.07-.004.106-.004c.234 0 .498.059.594.297c.453-.068.687-.064 1.08-.24c-.856-.573.269-.777.854-.818c-.193.121-.29.256-.243.395c.131.393 1.288.625 2.632.613c.38.031.797.043 1.232.027c1.411-.059 2.444-.34 2.304-.711c-.084-.215-.559-.419-1.217-.55a10.172 10.172 0 0 1 1.231-.146h.009c-.459-.578-.337-.766.001-.766c.5 0 1.471.408 1.747.572c.017.01.033.023.05.034c-.489.065-.574.76-.178 1.603c.42.904 1.217 1.604 1.789 1.605c.574.006.721-.662.312-1.539c-.03-.064-.066-.126-.101-.189c.275.347.22.473.75.666c.828.301.438.531.929.971c.442.111.886.277 1.304.459c.214.092 1.7 1.798.982 1.798c-.035 0-.073-.002-.115-.005c-.399-.029-.798-.143-1.176-.266a.418.418 0 0 0-.22-.264c-.479-.268-1.552-.09-2.374.471c-.486.33-.772.705-.832 1.006a2.93 2.93 0 0 0-.42-.131c.247-.232.443-.574.533-.969c.178-.791-.151-1.539-.747-1.674c-.59-.133-1.209.439-1.369 1.285c-.089.461-.024.889.143 1.201c-.172-.002-.35 0-.529.01c-1.396.07-2.414.49-2.29.86c.052.152.291.266.642.342c-.355.1-.734.244-1.102.445c-.602.326-1.027.709-1.229 1.033a6.78 6.78 0 0 0-1.511.139c-1.35.268-2.314.867-2.176 1.262c.139.398 1.314.414 2.646.109c1.069-.246 1.912-.604 2.143-.922a7.105 7.105 0 0 0 1.457-.59c.95-.508 1.518-1.055 1.375-1.375c.153-.006.31-.014.469-.025c1.063-.084 1.918-.281 2.206-.52c.219.098.555.08.925-.004c-.058.561.408 1.352-.069 1.91a.617.617 0 0 1-.484.227c-.305 0-.628-.191-.841-.4c-.292-.287-.931-.547-1.417-.547a.856.856 0 0 0-.376.074c-.576.285-.924.1-1.425.469c.209.016 1.254.121.781.604c.037-.002.157-.007.321-.007c.625 0 1.895.061 1.686.501c-.279.592-1.703.73-2.233.82c-.458.077-.975.15-1.485.15c-.441 0-.877-.055-1.265-.209c-.282-.113-.508-.204-.738-.204c-.179 0-.359.056-.57.198c-.356.243.296.457.748.457c.36 0 .681.068.771.297c.171.436-.966.881-1.204.984c-.184.081-1.993.63-2.922.63c-.417 0-1.459-.272-1.872.183c-.164.176-.423.229-.686.229c-.221 0-1.91.208-2.722.421c-.287.201-.279.354.024.459c.097.125.104.254.021.383c-.2.348-.667.545-1.016.684c-.036.014-.074.025-.11.039c-.002-.01.002-.021-.001-.029c-.132-.361-1.011-.35-2.047.039c-.221-.363-1.09-.619-2.186-.592c-.417.01-.808.068-1.156.154c.236-.471.384-1.193.369-1.975c-.023-1.27-.49-2.244-1.046-2.178s-.967 1.188-.912 2.508c.039.955.296 1.723.634 2.037c-.217.15-.357.316-.373.494c-.049.535.96.889 2.254.803c.158-.012.314-.027.465-.047c-.362.365-.544.717-.455.949c.065.17.259.249.539.251a12.06 12.06 0 0 1-.59.468c-.567.412.429.846-.232 1.35c-.223.17-.514.228-.803.228c-.178 0-.355-.022-.515-.052a3.588 3.588 0 0 1-1.048-.367c.224-.492.125-1.39-.306-2.26c-.526-1.061-1.357-1.691-1.829-1.363c-.342.235-.389.923-.183 1.697a3.844 3.844 0 0 1-.415-.289a4.43 4.43 0 0 1-1.054.133c-.098 0-.195-.004-.292-.012c-.38-.029-1.04-.154-1.072-.648c-.034-.625.489-.227-.169-.75a1.147 1.147 0 0 1-.419-.554m26.883-2.578l-.093-.746c.467-.08.998-.205 1.48-.436l1.466-.184l.124.993l-2.977.373M33 37.226l-.496.867l-2.604-1.488l.496-.867L33 37.226m.277-1.553c.776-1.621 1.394-2.219 2.242-2.467c.495-.146.731-.609 1.08-.885L34.1 30.893l.496-.869l2.604 1.488l-.391.684c.216-.099.477-.126.854.016c1.216.459 2.277-.68 2.592 1.291c.313 1.971-1.951 1.855-2.327 3.064c-.374 1.205-2.235.641-3.045 1.809c-.812 1.168-2.56-.711-1.606-2.703m.838-13.711a4.7 4.7 0 0 0 1.348-.577c.071-.045.133-.09.195-.135c.344.46.965 1.507.159 1.624a.99.99 0 0 1-.133.008c-.592 0-1.194-.514-1.569-.92M38 28.604l.496-.867l2.604 1.488l-.496.867L38 28.604m2.241-3.455c-.945-.441-2.174.535-3.127 1.607c-.953 1.07-.838-.715-.617-1.426c.229-.732.405-.999.485-1.366c.275-.21.488-.49.611-.823c.134-.365.143-.738.078-1.092c.354-.008.651-.09.895-.218c.438.023 1.324-.065 2.155 1.042c.889 1.187.467 2.718-.48 2.276m-12.464 6.864c.996.123 1.004 1.609.423 2.377c-.581.766-1.271 3.143-2.433 3.611c-1.165.467-2.17-.93-2.012-2.846c.161-1.916 2.371-3.345 4.022-3.142m-2.229-.735l.946-2.482c.183-.059.324-.107.374-.129l.041-.017c.027-.012.047-.024.074-.036l.569.217l-1.069 2.803l-.935-.356M23 33.226l-.496.869l-2.604-1.488l.496-.869L23 33.226m8.999 13.727c-14.004 0-25.627-5.899-27.667-13.571c.354.196.793.34 1.354.383a5.45 5.45 0 0 0 .642.01c.142.236.339.441.586.599l.074.048l.079.038c.265.128.543.205.83.229c.678.768 1.68 1.318 2.761 1.517c.268.05.534.076.785.076c.23 0 .444-.029.651-.071c1.236.771 2.675 1.469 4.291 2.072c.313.313.589.896.107 1.951c-.826 1.807 2.068 4.128 4.672 2.751c2.604-1.378 6.375-.942 7.789 0c1.414.939 5.415 1.23 7.514 0c2.1-1.233 3.699-2.204 7.25-2.153s6.218-3.244 8.023-4.508l.006-.005c3.111-1.892 4.957-4.244 4.957-6.794c0-5.125-7.483-9.447-17.724-10.827c-.296-.504-.877-.948-1.752-1.324a10.878 10.878 0 0 0-.934-.359c-.272-.506-.678-.833-1.304-1.073a3.775 3.775 0 0 0-.313-.397a7.412 7.412 0 0 0-.484-.488C48.609 15.696 60 22.589 60 30.976c0 8.809-12.562 15.977-28.001 15.977m15.139-15.7c-.621-.205-1.33-.947-2.51-.646s-3.295 1.008-2.559-1.166c.443-1.314 1.258-4.631 3.621-4.568c2.362.063 1.884 2.805 1.884 2.805s.184 3.782-.436 3.575m-2.262 2.121l.124.992l-2.977.371l-.124-.992l2.977-.371m3.023-7.266l2.977-.371l.124.992l-2.977.371l-.124-.992"},null,-1),J1=_("path",{fill:"currentColor",d:"M27.364 18.361c1.401.33 2.642.346 2.784.021c.145-.324-.875-.912-2.294-1.295c-1.416-.385-2.681-.375-2.808.004c-.128.38.916.94 2.318 1.27m-9.306 7.712c-1.299.449-2.198 1.219-2.041 1.646c.158.434 1.3.332 2.575-.152c1.273-.484 2.218-1.139 2.078-1.535c-.136-.392-1.319-.408-2.612.041"},null,-1),H1=_("path",{fill:"currentColor",d:"M14.067 29.257c.292-.109.484-.501.555-1.023a.41.41 0 0 0 .214.047c.538-.039 1.076-1.047 1.211-2.236c.006-.055.006-.105.011-.158a.325.325 0 0 0 .084.113c.396.311 1.485-.211 2.478-1.074c.234-.205.438-.41.613-.609c.148.271.339.434.558.422a.63.63 0 0 0 .354-.164a.402.402 0 0 0 .173.139c.492.182 1.389-.633 2.039-1.75a5.46 5.46 0 0 0 .414-.881c.537.084 1.336-.54 1.842-1.396c.148-.25.249-.494.313-.723c.141.68.489 1.225.889 1.43a4.99 4.99 0 0 0-1.257.55c-1.059.641-1.585 1.475-1.205 1.766c.379.293 1.518-.055 2.575-.682c1.058-.633 1.633-1.317 1.256-1.624c-.115-.092-.31-.133-.547-.135c.293-.293.446-.852.354-1.5c-.13-.924-.716-1.703-1.307-1.713c-.418-.008-.711.393-.797.969a.553.553 0 0 0-.293-.242c.292-.156.449-.326.394-.492c-.135-.402-1.398-.662-2.816-.508c-1.385.148-2.377.666-2.274 1.096l-.004-.006c-.387-.322-1.571-.057-2.61.684c-.831.59-1.309 1.291-1.272 1.709a6.588 6.588 0 0 0-.524.107c-1.362.332-2.309 1.028-2.139 1.479c.171.453 1.376.461 2.716.092c1.335-.369 2.318-.947 2.168-1.366c-.05-.141-.234-.245-.499-.313c.313-.152.639-.34.959-.563c.882-.619 1.409-1.273 1.309-1.654c.351.322 1.463.412 2.691.248c.246-.033.476-.076.694-.121a3.228 3.228 0 0 0-.942 1.379c-.406-.002-.971.393-1.465 1.029c-.081-.816-.398-1.398-.837-1.416c-.579-.02-1.123.994-1.206 2.28c-.008.121-.007.236-.007.352c-.51.127-1.152.469-1.74.988c-.585.518-.976 1.086-1.121 1.53c-.045-.831-.347-1.428-.789-1.438c-.505-.011-.998.77-1.176 1.814c-.308-.512-.697-.8-1.039-.703c-.547.156-.746 1.271-.455 2.471s.937 1.993 1.457 1.796"},null,-1),O1=[q1,J1,H1];function X1(c,e){return d(),k("svg",P1,O1)}const e2=b($1,[["render",X1]]),t2={};function c2(c,e){return d(),R(Y,{name:"slide-left"},{default:l(()=>[Z(c.$slots,"default",{},void 0,!0)]),_:3})}const o2=b(t2,[["render",c2],["__scopeId","data-v-79e4a4f2"]]);function n2(){let c;const{pause:e,resume:A}=n1(()=>void c.play(),2500,{immediate:!1,immediateCallback:!0});function r(){c||(c=new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU="))}return{load:r,pause:e,resume:A}}const s2=c=>{let e;return s1(()=>{e=a2(()=>{let i;self.addEventListener("message",f=>{switch(f.data){case"start":i=self.setInterval(()=>self.postMessage("tick"),1e3);break;case"pause":clearInterval(i);break}})}),e.addEventListener("message",c)}),{startInterval:()=>e==null?void 0:e.postMessage("start"),pauseInterval:()=>e==null?void 0:e.postMessage("pause")}};function a2(c){const e=URL.createObjectURL(new Blob(["(",c.toString(),")()"],{type:"application/javascript"})),A=new Worker(e);return URL.revokeObjectURL(e),A}const l2=A1(()=>i1(()=>import("./BgjyxHTp.js"),__vite__mapDeps([0,1,2]),import.meta.url).then(c=>c.default||c)),r2=_("h1",{class:"mb-article-heading text-3xl"},"Timer",-1),A2={class:"mb-12 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end"},i2={class:"flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:gap-3"},m2=j({__name:"timer",setup(c){const e=B(""),A=B("Timer"),r=B(!1),i=B(!1),f=n2();a1({title:A});const a=M(()=>{const m=Array.from(e.value,Number),n=P-e.value.length;return[...new Array(n).fill(0,0,n),...m]}),C=M(()=>{const[m,n,p,I,v,y]=a.value,L=m*10+n,Q=p*10+I,G=v*10+y;return L*60*60+Q*60+G}),w=()=>{if(C.value>1){const m=C.value-1;e.value=N(m),A.value=`${E(m)}`}else r.value=!1,e.value="",u()},{startInterval:K,pauseInterval:W}=s2(w);l1(r,m=>{if(m){f.load();const n=E(C.value);A.value=`${n}`,K()}else A.value="Timer",W()});const E=m=>{const{hours:n,minutes:p,seconds:I}=z(m);return[n,p,I].map(v=>v<10?`0${v}`:v).filter((v,y)=>v!=="00"||y>0).join(":")},N=m=>{const{hours:n,minutes:p,seconds:I}=z(m),v=[n,p,I].map(y=>y<10?`0${y}`:y).join("");return d1(v)},V=M(()=>r.value||C.value===0);function g(){r.value=!0}const u=()=>{i.value=!0,f.resume()},x=()=>{i.value=!1,f.pause()};return(m,n)=>{const p=f1,I=m1,v=h1,y=U1,L=V1,Q=$,G=Y1,J=e2,H=l2,O=o2;return d(),k("div",null,[r2,_("div",A2,[s(v,{modelValue:t(e),"onUpdate:modelValue":n[0]||(n[0]=o=>T(e)?e.value=o:null),disabled:t(r),onKeyup:[U(g,["enter"]),U(g,["space"])]},{default:l(({editing:o,caretPosition:D})=>[s(p,{fade:o&&t(e).length<=5,hide:!o&&t(a)[0]===0&&t(e).length<=5,"show-caret":o&&D===5},{default:l(()=>[h(S(t(a)[0]),1)]),_:2},1032,["fade","hide","show-caret"]),s(p,{fade:o&&t(e).length<=4,hide:!o&&t(a)[1]===0&&t(e).length<=4,"show-caret":o&&D===4},{default:l(()=>[h(S(t(a)[1]),1)]),_:2},1032,["fade","hide","show-caret"]),s(I,{class:"mr-2",fade:o&&t(e).length<=4,hide:!o&&t(a)[1]===0&&t(e).length<=4},{default:l(()=>[h(" h ")]),_:2},1032,["fade","hide"]),s(p,{fade:o&&t(e).length<=3,hide:!o&&t(a)[2]===0&&t(e).length<=3,"show-caret":o&&D===3},{default:l(()=>[h(S(t(a)[2]),1)]),_:2},1032,["fade","hide","show-caret"]),s(p,{fade:o&&t(e).length<=2,hide:!o&&t(a)[3]===0&&t(e).length<=2,"show-caret":o&&D===2},{default:l(()=>[h(S(t(a)[3]),1)]),_:2},1032,["fade","hide","show-caret"]),s(I,{class:"mr-2",fade:o&&t(e).length<=2,hide:!o&&t(a)[3]===0&&t(e).length<=2},{default:l(()=>[h(" m ")]),_:2},1032,["fade","hide"]),s(p,{fade:o&&t(e).length<=1,hide:!o&&t(a)[4]===0&&t(e).length<=1,"show-caret":o&&D===1},{default:l(()=>[h(S(t(a)[4]),1)]),_:2},1032,["fade","hide","show-caret"]),s(p,{fade:o&&t(e).length===0,"show-caret":o&&D===0},{default:l(()=>[h(S(t(a)[5]),1)]),_:2},1032,["fade","show-caret"]),s(I,{fade:o&&t(e).length===0},{default:l(()=>[h(" s ")]),_:2},1032,["fade"])]),_:1},8,["modelValue","disabled"]),s(y,{"counting-down":t(r),"onUpdate:countingDown":n[1]||(n[1]=o=>T(r)?r.value=o:null),"start-disabled":t(V)},null,8,["counting-down","start-disabled"])]),_("div",i2,[s(Q,{disabled:t(r),onClick:n[2]||(n[2]=o=>e.value="500")},{default:l(()=>[s(L,{class:"h-5 w-5 fill-current"}),h(" Chamomile tea ")]),_:1},8,["disabled"]),s(Q,{disabled:t(r),onClick:n[3]||(n[3]=o=>e.value="800")},{default:l(()=>[s(L,{class:"h-5 w-5 fill-current"}),h(" Fruit tea ")]),_:1},8,["disabled"]),s(Q,{disabled:t(r),onClick:n[4]||(n[4]=o=>e.value="2500")},{default:l(()=>[s(G,{class:"h-5 w-5 fill-current"}),h(" Chicken ")]),_:1},8,["disabled"]),s(Q,{disabled:t(r),onClick:n[5]||(n[5]=o=>e.value="1500")},{default:l(()=>[s(J,{class:"h-5 w-5 fill-current"}),h(" Chickpea Curry ")]),_:1},8,["disabled"])]),s(O,null,{default:l(()=>[t(i)?(d(),R(H,{key:0,onOk:x})):r1("",!0)]),_:1})])}}});export{m2 as default};