function H(e){const t=`algoliasearch-client-js-${e.key}`;let r;const n=()=>(r===void 0&&(r=e.localStorage||window.localStorage),r),s=()=>JSON.parse(n().getItem(t)||"{}"),a=o=>{n().setItem(t,JSON.stringify(o))},u=()=>{const o=e.timeToLive?e.timeToLive*1e3:null,d=s(),h=Object.fromEntries(Object.entries(d).filter(([,c])=>c.timestamp!==void 0));if(a(h),!o)return;const l=Object.fromEntries(Object.entries(h).filter(([,c])=>{const m=new Date().getTime();return!(c.timestamp+o<m)}));a(l)};return{get(o,d,h={miss:()=>Promise.resolve()}){return Promise.resolve().then(()=>{u();const l=JSON.stringify(o);return s()[l]}).then(l=>Promise.all([l?l.value:d(),l!==void 0])).then(([l,c])=>Promise.all([l,c||h.miss(l)])).then(([l])=>l)},set(o,d){return Promise.resolve().then(()=>{const h=s();return h[JSON.stringify(o)]={timestamp:new Date().getTime(),value:d},n().setItem(t,JSON.stringify(h)),d})},delete(o){return Promise.resolve().then(()=>{const d=s();delete d[JSON.stringify(o)],n().setItem(t,JSON.stringify(d))})},clear(){return Promise.resolve().then(()=>{n().removeItem(t)})}}}function b(e){const t=[...e.caches],r=t.shift();return r===void 0?W():{get(n,s,a={miss:()=>Promise.resolve()}){return r.get(n,s,a).catch(()=>b({caches:t}).get(n,s,a))},set(n,s){return r.set(n,s).catch(()=>b({caches:t}).set(n,s))},delete(n){return r.delete(n).catch(()=>b({caches:t}).delete(n))},clear(){return r.clear().catch(()=>b({caches:t}).clear())}}}function W(){return{get(e,t,r={miss:()=>Promise.resolve()}){return t().then(s=>Promise.all([s,r.miss(s)])).then(([s])=>s)},set(e,t){return Promise.resolve(t)},delete(e){return Promise.resolve()},clear(){return Promise.resolve()}}}function N(e={serializable:!0}){let t={};return{get(r,n,s={miss:()=>Promise.resolve()}){const a=JSON.stringify(r);if(a in t)return Promise.resolve(e.serializable?JSON.parse(t[a]):t[a]);const u=n(),o=s&&s.miss||(()=>Promise.resolve());return u.then(d=>o(d)).then(()=>u)},set(r,n){return t[JSON.stringify(r)]=e.serializable?JSON.stringify(n):n,Promise.resolve(n)},delete(r){return delete t[JSON.stringify(r)],Promise.resolve()},clear(){return t={},Promise.resolve()}}}function M(e,t,r){const n={"x-algolia-api-key":r,"x-algolia-application-id":t};return{headers(){return e===v.WithinHeaders?n:{}},queryParameters(){return e===v.WithinQueryParameters?n:{}}}}function L(e){let t=e.length-1;for(t;t>0;t--){const r=Math.floor(Math.random()*(t+1)),n=e[t];e[t]=e[r],e[r]=n}return e}function $(e,t){return t&&Object.keys(t).forEach(r=>{e[r]=t[r](e)}),e}function C(e,...t){let r=0;return e.replace(/%s/g,()=>encodeURIComponent(t[r++]))}const w="4.23.3",v={WithinQueryParameters:0,WithinHeaders:1};function E(e,t){const r=e||{},n=r.data||{};return Object.keys(r).forEach(s=>{["timeout","headers","queryParameters","data","cacheable"].indexOf(s)===-1&&(n[s]=r[s])}),{data:Object.entries(n).length>0?n:void 0,timeout:r.timeout||t,headers:r.headers||{},queryParameters:r.queryParameters||{},cacheable:r.cacheable}}const O={Read:1,Write:2,Any:3},S={Up:1,Down:2,Timeouted:3},q=2*60*1e3;function J(e,t=S.Up){return{...e,status:t,lastUpdate:Date.now()}}function Q(e){return e.status===S.Up||Date.now()-e.lastUpdate>q}function G(e){return e.status===S.Timeouted&&Date.now()-e.lastUpdate<=q}function D(e){return typeof e=="string"?{protocol:"https",url:e,accept:O.Any}:{protocol:e.protocol||"https",url:e.url,accept:e.accept||O.Any}}const y={Delete:"DELETE",Get:"GET",Post:"POST",Put:"PUT"};function _(e,t){return Promise.all(t.map(r=>e.get(r,()=>Promise.resolve(J(r))))).then(r=>{const n=r.filter(o=>Q(o)),s=r.filter(o=>G(o)),a=[...n,...s],u=a.length>0?a.map(o=>D(o)):t;return{getTimeout(o,d){return(s.length===0&&o===0?1:s.length+3+o)*d},statelessHosts:u}})}const B=({isTimedOut:e,status:t})=>!e&&~~t===0,V=e=>{const t=e.status;return e.isTimedOut||B(e)||~~(t/100)!==2&&~~(t/100)!==4},X=({status:e})=>~~(e/100)===2,K=(e,t)=>V(e)?t.onRetry(e):X(e)?t.onSuccess(e):t.onFail(e);function x(e,t,r,n){const s=[],a=ne(r,n),u=se(e,n),o=r.method,d=r.method!==y.Get?{}:{...r.data,...n.data},h={"x-algolia-agent":e.userAgent.value,...e.queryParameters,...d,...n.queryParameters};let l=0;const c=(m,g)=>{const f=m.pop();if(f===void 0)throw ce(R(s));const T={data:a,headers:u,method:o,url:re(f,r.path,h),connectTimeout:g(l,e.timeouts.connect),responseTimeout:g(l,n.timeout)},A=i=>{const P={request:T,response:i,host:f,triesLeft:m.length};return s.push(P),P},p={onSuccess:i=>ee(i),onRetry(i){const P=A(i);return i.isTimedOut&&l++,Promise.all([e.logger.info("Retryable failure",k(P)),e.hostsCache.set(f,J(f,i.isTimedOut?S.Timeouted:S.Down))]).then(()=>c(m,g))},onFail(i){throw A(i),te(i,R(s))}};return e.requester.send(T).then(i=>K(i,p))};return _(e.hostsCache,t).then(m=>c([...m.statelessHosts].reverse(),m.getTimeout))}function Y(e){const{hostsCache:t,logger:r,requester:n,requestsCache:s,responsesCache:a,timeouts:u,userAgent:o,hosts:d,queryParameters:h,headers:l}=e,c={hostsCache:t,logger:r,requester:n,requestsCache:s,responsesCache:a,timeouts:u,userAgent:o,headers:l,queryParameters:h,hosts:d.map(m=>D(m)),read(m,g){const f=E(g,c.timeouts.read),T=()=>x(c,c.hosts.filter(i=>(i.accept&O.Read)!==0),m,f);if((f.cacheable!==void 0?f.cacheable:m.cacheable)!==!0)return T();const p={request:m,mappedRequestOptions:f,transporter:{queryParameters:c.queryParameters,headers:c.headers}};return c.responsesCache.get(p,()=>c.requestsCache.get(p,()=>c.requestsCache.set(p,T()).then(i=>Promise.all([c.requestsCache.delete(p),i]),i=>Promise.all([c.requestsCache.delete(p),Promise.reject(i)])).then(([i,P])=>P)),{miss:i=>c.responsesCache.set(p,i)})},write(m,g){return x(c,c.hosts.filter(f=>(f.accept&O.Write)!==0),m,E(g,c.timeouts.write))}};return c}function Z(e){const t={value:`Algolia for JavaScript (${e})`,add(r){const n=`; ${r.segment}${r.version!==void 0?` (${r.version})`:""}`;return t.value.indexOf(n)===-1&&(t.value=`${t.value}${n}`),t}};return t}function ee(e){try{return JSON.parse(e.content)}catch(t){throw oe(t.message,e)}}function te({content:e,status:t},r){let n=e;try{n=JSON.parse(e).message}catch{}return ae(n,t,r)}function re(e,t,r){const n=U(r);let s=`${e.protocol}://${e.url}/${t.charAt(0)==="/"?t.substr(1):t}`;return n.length&&(s+=`?${n}`),s}function U(e){const t=r=>Object.prototype.toString.call(r)==="[object Object]"||Object.prototype.toString.call(r)==="[object Array]";return Object.keys(e).map(r=>C("%s=%s",r,t(e[r])?JSON.stringify(e[r]):e[r])).join("&")}function ne(e,t){if(e.method===y.Get||e.data===void 0&&t.data===void 0)return;const r=Array.isArray(e.data)?e.data:{...e.data,...t.data};return JSON.stringify(r)}function se(e,t){const r={...e.headers,...t.headers},n={};return Object.keys(r).forEach(s=>{const a=r[s];n[s.toLowerCase()]=a}),n}function R(e){return e.map(t=>k(t))}function k(e){const t=e.request.headers["x-algolia-api-key"]?{"x-algolia-api-key":"*****"}:{};return{...e,request:{...e.request,headers:{...e.request.headers,...t}}}}function ae(e,t,r){return{name:"ApiError",message:e,status:t,transporterStackTrace:r}}function oe(e,t){return{name:"DeserializationError",message:e,response:t}}function ce(e){return{name:"RetryError",message:"Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.",transporterStackTrace:e}}const ie=e=>{const t=e.appId,r=M(e.authMode!==void 0?e.authMode:v.WithinHeaders,t,e.apiKey),n=Y({hosts:[{url:`${t}-dsn.algolia.net`,accept:O.Read},{url:`${t}.algolia.net`,accept:O.Write}].concat(L([{url:`${t}-1.algolianet.com`},{url:`${t}-2.algolianet.com`},{url:`${t}-3.algolianet.com`}])),...e,headers:{...r.headers(),"content-type":"application/x-www-form-urlencoded",...e.headers},queryParameters:{...r.queryParameters(),...e.queryParameters}});return $({transporter:n,appId:t,addAlgoliaAgent(a,u){n.userAgent.add({segment:a,version:u})},clearCache(){return Promise.all([n.requestsCache.clear(),n.responsesCache.clear()]).then(()=>{})}},e.methods)},ue=e=>(t,r)=>t.method===y.Get?e.transporter.read(t,r):e.transporter.write(t,r),z=e=>(t,r={})=>{const n={transporter:e.transporter,appId:e.appId,indexName:t};return $(n,r.methods)},j=e=>(t,r)=>{const n=t.map(s=>({...s,params:U(s.params||{})}));return e.transporter.read({method:y.Post,path:"1/indexes/*/queries",data:{requests:n},cacheable:!0},r)},I=e=>(t,r)=>Promise.all(t.map(n=>{const{facetName:s,facetQuery:a,...u}=n.params;return z(e)(n.indexName,{methods:{searchForFacetValues:F}}).searchForFacetValues(s,a,{...r,...u})})),le=e=>(t,r,n)=>e.transporter.read({method:y.Post,path:C("1/answers/%s/prediction",e.indexName),data:{query:t,queryLanguages:r},cacheable:!0},n),de=e=>(t,r)=>e.transporter.read({method:y.Post,path:C("1/indexes/%s/query",e.indexName),data:{query:t},cacheable:!0},r),F=e=>(t,r,n)=>e.transporter.read({method:y.Post,path:C("1/indexes/%s/facets/%s/query",e.indexName,t),data:{facetQuery:r},cacheable:!0},n);function me(e){return{debug(t,r){return Promise.resolve()},info(t,r){return Promise.resolve()},error(t,r){return console.error(t,r),Promise.resolve()}}}const he=e=>(t,r)=>{const n=t.map(s=>({...s,threshold:s.threshold||0}));return e.transporter.read({method:y.Post,path:"1/indexes/*/recommendations",data:{requests:n},cacheable:!0},r)};function fe(){return{send(e){return new Promise(t=>{const r=new XMLHttpRequest;r.open(e.method,e.url,!0),Object.keys(e.headers).forEach(u=>r.setRequestHeader(u,e.headers[u]));const n=(u,o)=>setTimeout(()=>{r.abort(),t({status:0,content:o,isTimedOut:!0})},u*1e3),s=n(e.connectTimeout,"Connection timeout");let a;r.onreadystatechange=()=>{r.readyState>r.OPENED&&a===void 0&&(clearTimeout(s),a=n(e.responseTimeout,"Socket timeout"))},r.onerror=()=>{r.status===0&&(clearTimeout(s),clearTimeout(a),t({content:r.responseText||"Network request failed",status:r.status,isTimedOut:!1}))},r.onload=()=>{clearTimeout(s),clearTimeout(a),t({content:r.responseText,status:r.status,isTimedOut:!1})},r.send(e.data)})}}}function ge(e,t,r){const n={appId:e,apiKey:t,timeouts:{connect:1,read:2,write:30},requester:fe(),logger:me(),responsesCache:N(),requestsCache:N({serializable:!1}),hostsCache:b({caches:[H({key:`${w}-${e}`}),N()]}),userAgent:Z(w).add({segment:"Browser",version:"lite"}),authMode:v.WithinQueryParameters};return ie({...n,...r,methods:{search:j,searchForFacetValues:I,multipleQueries:j,multipleSearchForFacetValues:I,customRequest:ue,initIndex:s=>a=>z(s)(a,{methods:{search:de,searchForFacetValues:F,findAnswers:le}}),getRecommendations:he}})}ge.version=w;export{ge as default};
