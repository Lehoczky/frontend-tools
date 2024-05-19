function le(e){const t=`algoliasearch-client-js-${e.key}`;let r;const n=()=>(r===void 0&&(r=e.localStorage||window.localStorage),r),s=()=>JSON.parse(n().getItem(t)||"{}"),a=c=>{n().setItem(t,JSON.stringify(c))},o=()=>{const c=e.timeToLive?e.timeToLive*1e3:null,h=s(),m=Object.fromEntries(Object.entries(h).filter(([,u])=>u.timestamp!==void 0));if(a(m),!c)return;const d=Object.fromEntries(Object.entries(m).filter(([,u])=>{const f=new Date().getTime();return!(u.timestamp+c<f)}));a(d)};return{get(c,h,m={miss:()=>Promise.resolve()}){return Promise.resolve().then(()=>{o();const d=JSON.stringify(c);return s()[d]}).then(d=>Promise.all([d?d.value:h(),d!==void 0])).then(([d,u])=>Promise.all([d,u||m.miss(d)])).then(([d])=>d)},set(c,h){return Promise.resolve().then(()=>{const m=s();return m[JSON.stringify(c)]={timestamp:new Date().getTime(),value:h},n().setItem(t,JSON.stringify(m)),h})},delete(c){return Promise.resolve().then(()=>{const h=s();delete h[JSON.stringify(c)],n().setItem(t,JSON.stringify(h))})},clear(){return Promise.resolve().then(()=>{n().removeItem(t)})}}}function R(e){const t=[...e.caches],r=t.shift();return r===void 0?he():{get(n,s,a={miss:()=>Promise.resolve()}){return r.get(n,s,a).catch(()=>R({caches:t}).get(n,s,a))},set(n,s){return r.set(n,s).catch(()=>R({caches:t}).set(n,s))},delete(n){return r.delete(n).catch(()=>R({caches:t}).delete(n))},clear(){return r.clear().catch(()=>R({caches:t}).clear())}}}function he(){return{get(e,t,r={miss:()=>Promise.resolve()}){return t().then(s=>Promise.all([s,r.miss(s)])).then(([s])=>s)},set(e,t){return Promise.resolve(t)},delete(e){return Promise.resolve()},clear(){return Promise.resolve()}}}function G(e={serializable:!0}){let t={};return{get(r,n,s={miss:()=>Promise.resolve()}){const a=JSON.stringify(r);if(a in t)return Promise.resolve(e.serializable?JSON.parse(t[a]):t[a]);const o=n(),c=s&&s.miss||(()=>Promise.resolve());return o.then(h=>c(h)).then(()=>o)},set(r,n){return t[JSON.stringify(r)]=e.serializable?JSON.stringify(n):n,Promise.resolve(n)},delete(r){return delete t[JSON.stringify(r)],Promise.resolve()},clear(){return t={},Promise.resolve()}}}function $(e,t,r){const n={"x-algolia-api-key":r,"x-algolia-application-id":t};return{headers(){return e===N.WithinHeaders?n:{}},queryParameters(){return e===N.WithinQueryParameters?n:{}}}}function S(e){let t=0;const r=()=>(t++,new Promise(n=>{setTimeout(()=>{n(e(r))},Math.min(100*t,1e3))}));return e(r)}function p(e,t=(r,n)=>Promise.resolve()){return Object.assign(e,{wait(r){return p(e.then(n=>Promise.all([t(n,r),n])).then(n=>n[1]))}})}function me(e){let t=e.length-1;for(t;t>0;t--){const r=Math.floor(Math.random()*(t+1)),n=e[t];e[t]=e[r],e[r]=n}return e}function v(e,t){return t&&Object.keys(t).forEach(r=>{e[r]=t[r](e)}),e}function l(e,...t){let r=0;return e.replace(/%s/g,()=>encodeURIComponent(t[r++]))}const z="4.23.3",N={WithinQueryParameters:0,WithinHeaders:1};function w(e,t){const r=e||{},n=r.data||{};return Object.keys(r).forEach(s=>{["timeout","headers","queryParameters","data","cacheable"].indexOf(s)===-1&&(n[s]=r[s])}),{data:Object.entries(n).length>0?n:void 0,timeout:r.timeout||t,headers:r.headers||{},queryParameters:r.queryParameters||{},cacheable:r.cacheable}}const T={Read:1,Write:2,Any:3},E={Up:1,Down:2,Timeouted:3},V=2*60*1e3;function Y(e,t=E.Up){return{...e,status:t,lastUpdate:Date.now()}}function pe(e){return e.status===E.Up||Date.now()-e.lastUpdate>V}function ge(e){return e.status===E.Timeouted&&Date.now()-e.lastUpdate<=V}function Z(e){return typeof e=="string"?{protocol:"https",url:e,accept:T.Any}:{protocol:e.protocol||"https",url:e.url,accept:e.accept||T.Any}}const i={Delete:"DELETE",Get:"GET",Post:"POST",Put:"PUT"};function fe(e,t){return Promise.all(t.map(r=>e.get(r,()=>Promise.resolve(Y(r))))).then(r=>{const n=r.filter(c=>pe(c)),s=r.filter(c=>ge(c)),a=[...n,...s],o=a.length>0?a.map(c=>Z(c)):t;return{getTimeout(c,h){return(s.length===0&&c===0?1:s.length+3+c)*h},statelessHosts:o}})}const ye=({isTimedOut:e,status:t})=>!e&&~~t===0,Pe=e=>{const t=e.status;return e.isTimedOut||ye(e)||~~(t/100)!==2&&~~(t/100)!==4},Ie=({status:e})=>~~(e/100)===2,xe=(e,t)=>Pe(e)?t.onRetry(e):Ie(e)?t.onSuccess(e):t.onFail(e);function L(e,t,r,n){const s=[],a=je(r,n),o=Te(e,n),c=r.method,h=r.method!==i.Get?{}:{...r.data,...n.data},m={"x-algolia-agent":e.userAgent.value,...e.queryParameters,...h,...n.queryParameters};let d=0;const u=(f,I)=>{const g=f.pop();if(g===void 0)throw Re(Q(s));const x={data:a,headers:o,method:c,url:Oe(g,r.path,m),connectTimeout:I(d,e.timeouts.connect),responseTimeout:I(d,n.timeout)},D=y=>{const O={request:x,response:y,host:g,triesLeft:f.length};return s.push(O),O},b={onSuccess:y=>be(y),onRetry(y){const O=D(y);return y.isTimedOut&&d++,Promise.all([e.logger.info("Retryable failure",te(O)),e.hostsCache.set(g,Y(g,y.isTimedOut?E.Timeouted:E.Down))]).then(()=>u(f,I))},onFail(y){throw D(y),De(y,Q(s))}};return e.requester.send(x).then(y=>xe(y,b))};return fe(e.hostsCache,t).then(f=>u([...f.statelessHosts].reverse(),f.getTimeout))}function W(e){const{hostsCache:t,logger:r,requester:n,requestsCache:s,responsesCache:a,timeouts:o,userAgent:c,hosts:h,queryParameters:m,headers:d}=e,u={hostsCache:t,logger:r,requester:n,requestsCache:s,responsesCache:a,timeouts:o,userAgent:c,headers:d,queryParameters:m,hosts:h.map(f=>Z(f)),read(f,I){const g=w(I,u.timeouts.read),x=()=>L(u,u.hosts.filter(y=>(y.accept&T.Read)!==0),f,g);if((g.cacheable!==void 0?g.cacheable:f.cacheable)!==!0)return x();const b={request:f,mappedRequestOptions:g,transporter:{queryParameters:u.queryParameters,headers:u.headers}};return u.responsesCache.get(b,()=>u.requestsCache.get(b,()=>u.requestsCache.set(b,x()).then(y=>Promise.all([u.requestsCache.delete(b),y]),y=>Promise.all([u.requestsCache.delete(b),Promise.reject(y)])).then(([y,O])=>O)),{miss:y=>u.responsesCache.set(b,y)})},write(f,I){return L(u,u.hosts.filter(g=>(g.accept&T.Write)!==0),f,w(I,u.timeouts.write))}};return u}function we(e){const t={value:`Algolia for JavaScript (${e})`,add(r){const n=`; ${r.segment}${r.version!==void 0?` (${r.version})`:""}`;return t.value.indexOf(n)===-1&&(t.value=`${t.value}${n}`),t}};return t}function be(e){try{return JSON.parse(e.content)}catch(t){throw ke(t.message,e)}}function De({content:e,status:t},r){let n=e;try{n=JSON.parse(e).message}catch{}return Se(n,t,r)}function Oe(e,t,r){const n=ee(r);let s=`${e.protocol}://${e.url}/${t.charAt(0)==="/"?t.substr(1):t}`;return n.length&&(s+=`?${n}`),s}function ee(e){const t=r=>Object.prototype.toString.call(r)==="[object Object]"||Object.prototype.toString.call(r)==="[object Array]";return Object.keys(e).map(r=>l("%s=%s",r,t(e[r])?JSON.stringify(e[r]):e[r])).join("&")}function je(e,t){if(e.method===i.Get||e.data===void 0&&t.data===void 0)return;const r=Array.isArray(e.data)?e.data:{...e.data,...t.data};return JSON.stringify(r)}function Te(e,t){const r={...e.headers,...t.headers},n={};return Object.keys(r).forEach(s=>{const a=r[s];n[s.toLowerCase()]=a}),n}function Q(e){return e.map(t=>te(t))}function te(e){const t=e.request.headers["x-algolia-api-key"]?{"x-algolia-api-key":"*****"}:{};return{...e,request:{...e.request,headers:{...e.request.headers,...t}}}}function Se(e,t,r){return{name:"ApiError",message:e,status:t,transporterStackTrace:r}}function ke(e,t){return{name:"DeserializationError",message:e,response:t}}function Re(e){return{name:"RetryError",message:"Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.",transporterStackTrace:e}}const Ne=e=>{const t=e.region||"us",r=$(N.WithinHeaders,e.appId,e.apiKey),n=W({hosts:[{url:`analytics.${t}.algolia.com`}],...e,headers:{...r.headers(),"content-type":"application/json",...e.headers},queryParameters:{...r.queryParameters(),...e.queryParameters}}),s=e.appId;return v({appId:s,transporter:n},e.methods)},Ee=e=>(t,r)=>e.transporter.write({method:i.Post,path:"2/abtests",data:t},r),Ae=e=>(t,r)=>e.transporter.write({method:i.Delete,path:l("2/abtests/%s",t)},r),qe=e=>(t,r)=>e.transporter.read({method:i.Get,path:l("2/abtests/%s",t)},r),ve=e=>t=>e.transporter.read({method:i.Get,path:"2/abtests"},t),Ce=e=>(t,r)=>e.transporter.write({method:i.Post,path:l("2/abtests/%s/stop",t)},r),Ue=e=>{const t=e.region||"us",r=$(N.WithinHeaders,e.appId,e.apiKey),n=W({hosts:[{url:`personalization.${t}.algolia.com`}],...e,headers:{...r.headers(),"content-type":"application/json",...e.headers},queryParameters:{...r.queryParameters(),...e.queryParameters}});return v({appId:e.appId,transporter:n},e.methods)},Ge=e=>t=>e.transporter.read({method:i.Get,path:"1/strategies/personalization"},t),ze=e=>(t,r)=>e.transporter.write({method:i.Post,path:"1/strategies/personalization",data:t},r);function H(e){const t=r=>e.request(r).then(n=>{if(e.batch!==void 0&&e.batch(n.hits),!e.shouldStop(n))return n.cursor?t({cursor:n.cursor}):t({page:(r.page||0)+1})});return t({})}const $e=e=>{const t=e.appId,r=$(e.authMode!==void 0?e.authMode:N.WithinHeaders,t,e.apiKey),n=W({hosts:[{url:`${t}-dsn.algolia.net`,accept:T.Read},{url:`${t}.algolia.net`,accept:T.Write}].concat(me([{url:`${t}-1.algolianet.com`},{url:`${t}-2.algolianet.com`},{url:`${t}-3.algolianet.com`}])),...e,headers:{...r.headers(),"content-type":"application/x-www-form-urlencoded",...e.headers},queryParameters:{...r.queryParameters(),...e.queryParameters}});return v({transporter:n,appId:t,addAlgoliaAgent(a,o){n.userAgent.add({segment:a,version:o})},clearCache(){return Promise.all([n.requestsCache.clear(),n.responsesCache.clear()]).then(()=>{})}},e.methods)};function We(){return{name:"MissingObjectIDError",message:"All objects must have an unique objectID (like a primary key) to be valid. Algolia is also able to generate objectIDs automatically but *it's not recommended*. To do it, use the `{'autoGenerateObjectIDIfNotExist': true}` option."}}function He(){return{name:"ObjectNotFoundError",message:"Object not found."}}const Je=e=>(t,r)=>{const{queryParameters:n,...s}=r||{},a={acl:t,...n!==void 0?{queryParameters:n}:{}},o=(c,h)=>S(m=>A(e)(c.key,h).catch(d=>{if(d.status!==404)throw d;return m()}));return p(e.transporter.write({method:i.Post,path:"1/keys",data:a},s),o)},Me=e=>(t,r,n)=>{const s=w(n);return s.queryParameters["X-Algolia-User-ID"]=t,e.transporter.write({method:i.Post,path:"1/clusters/mapping",data:{cluster:r}},s)},Be=e=>(t,r,n)=>e.transporter.write({method:i.Post,path:"1/clusters/mapping/batch",data:{users:t,cluster:r}},n),_e=e=>(t,r)=>p(e.transporter.write({method:i.Post,path:l("/1/dictionaries/%s/batch",t),data:{clearExistingDictionaryEntries:!0,requests:{action:"addEntry",body:[]}}},r),(n,s)=>k(e)(n.taskID,s)),C=e=>(t,r,n)=>{const s=(a,o)=>q(e)(t,{methods:{waitTask:P}}).waitTask(a.taskID,o);return p(e.transporter.write({method:i.Post,path:l("1/indexes/%s/operation",t),data:{operation:"copy",destination:r}},n),s)},Fe=e=>(t,r,n)=>C(e)(t,r,{...n,scope:[F.Rules]}),Le=e=>(t,r,n)=>C(e)(t,r,{...n,scope:[F.Settings]}),Qe=e=>(t,r,n)=>C(e)(t,r,{...n,scope:[F.Synonyms]}),Ke=e=>(t,r)=>t.method===i.Get?e.transporter.read(t,r):e.transporter.write(t,r),Xe=e=>(t,r)=>{const n=(s,a)=>S(o=>A(e)(t,a).then(o).catch(c=>{if(c.status!==404)throw c}));return p(e.transporter.write({method:i.Delete,path:l("1/keys/%s",t)},r),n)},Ve=e=>(t,r,n)=>{const s=r.map(a=>({action:"deleteEntry",body:{objectID:a}}));return p(e.transporter.write({method:i.Post,path:l("/1/dictionaries/%s/batch",t),data:{clearExistingDictionaryEntries:!1,requests:s}},n),(a,o)=>k(e)(a.taskID,o))},A=e=>(t,r)=>e.transporter.read({method:i.Get,path:l("1/keys/%s",t)},r),re=e=>(t,r)=>e.transporter.read({method:i.Get,path:l("1/task/%s",t.toString())},r),Ye=e=>t=>e.transporter.read({method:i.Get,path:"/1/dictionaries/*/settings"},t),Ze=e=>t=>e.transporter.read({method:i.Get,path:"1/logs"},t),et=e=>t=>e.transporter.read({method:i.Get,path:"1/clusters/mapping/top"},t),tt=e=>(t,r)=>e.transporter.read({method:i.Get,path:l("1/clusters/mapping/%s",t)},r),rt=e=>t=>{const{retrieveMappings:r,...n}=t||{};return r===!0&&(n.getClusters=!0),e.transporter.read({method:i.Get,path:"1/clusters/mapping/pending"},n)},q=e=>(t,r={})=>{const n={transporter:e.transporter,appId:e.appId,indexName:t};return v(n,r.methods)},nt=e=>t=>e.transporter.read({method:i.Get,path:"1/keys"},t),st=e=>t=>e.transporter.read({method:i.Get,path:"1/clusters"},t),at=e=>t=>e.transporter.read({method:i.Get,path:"1/indexes"},t),ot=e=>t=>e.transporter.read({method:i.Get,path:"1/clusters/mapping"},t),it=e=>(t,r,n)=>{const s=(a,o)=>q(e)(t,{methods:{waitTask:P}}).waitTask(a.taskID,o);return p(e.transporter.write({method:i.Post,path:l("1/indexes/%s/operation",t),data:{operation:"move",destination:r}},n),s)},ct=e=>(t,r)=>{const n=(s,a)=>Promise.all(Object.keys(s.taskID).map(o=>q(e)(o,{methods:{waitTask:P}}).waitTask(s.taskID[o],a)));return p(e.transporter.write({method:i.Post,path:"1/indexes/*/batch",data:{requests:t}},r),n)},ut=e=>(t,r)=>e.transporter.read({method:i.Post,path:"1/indexes/*/objects",data:{requests:t}},r),K=e=>(t,r)=>{const n=t.map(s=>({...s,params:ee(s.params||{})}));return e.transporter.read({method:i.Post,path:"1/indexes/*/queries",data:{requests:n},cacheable:!0},r)},X=e=>(t,r)=>Promise.all(t.map(n=>{const{facetName:s,facetQuery:a,...o}=n.params;return q(e)(n.indexName,{methods:{searchForFacetValues:ce}}).searchForFacetValues(s,a,{...r,...o})})),dt=e=>(t,r)=>{const n=w(r);return n.queryParameters["X-Algolia-User-ID"]=t,e.transporter.write({method:i.Delete,path:"1/clusters/mapping"},n)},lt=e=>(t,r,n)=>{const s=r.map(a=>({action:"addEntry",body:a}));return p(e.transporter.write({method:i.Post,path:l("/1/dictionaries/%s/batch",t),data:{clearExistingDictionaryEntries:!0,requests:s}},n),(a,o)=>k(e)(a.taskID,o))},ht=e=>(t,r)=>{const n=(s,a)=>S(o=>A(e)(t,a).catch(c=>{if(c.status!==404)throw c;return o()}));return p(e.transporter.write({method:i.Post,path:l("1/keys/%s/restore",t)},r),n)},mt=e=>(t,r,n)=>{const s=r.map(a=>({action:"addEntry",body:a}));return p(e.transporter.write({method:i.Post,path:l("/1/dictionaries/%s/batch",t),data:{clearExistingDictionaryEntries:!1,requests:s}},n),(a,o)=>k(e)(a.taskID,o))},pt=e=>(t,r,n)=>e.transporter.read({method:i.Post,path:l("/1/dictionaries/%s/search",t),data:{query:r},cacheable:!0},n),gt=e=>(t,r)=>e.transporter.read({method:i.Post,path:"1/clusters/mapping/search",data:{query:t}},r),ft=e=>(t,r)=>p(e.transporter.write({method:i.Put,path:"/1/dictionaries/*/settings",data:t},r),(n,s)=>k(e)(n.taskID,s)),yt=e=>(t,r)=>{const n=Object.assign({},r),{queryParameters:s,...a}=r||{},o=s?{queryParameters:s}:{},c=["acl","indexes","referers","restrictSources","queryParameters","description","maxQueriesPerIPPerHour","maxHitsPerQuery"],h=d=>Object.keys(n).filter(u=>c.indexOf(u)!==-1).every(u=>{if(Array.isArray(d[u])&&Array.isArray(n[u])){const f=d[u];return f.length===n[u].length&&f.every((I,g)=>I===n[u][g])}else return d[u]===n[u]}),m=(d,u)=>S(f=>A(e)(t,u).then(I=>h(I)?Promise.resolve():f()));return p(e.transporter.write({method:i.Put,path:l("1/keys/%s",t),data:o},a),m)},k=e=>(t,r)=>S(n=>re(e)(t,r).then(s=>s.status!=="published"?n():void 0)),ne=e=>(t,r)=>{const n=(s,a)=>P(e)(s.taskID,a);return p(e.transporter.write({method:i.Post,path:l("1/indexes/%s/batch",e.indexName),data:{requests:t}},r),n)},Pt=e=>t=>H({shouldStop:r=>r.cursor===void 0,...t,request:r=>e.transporter.read({method:i.Post,path:l("1/indexes/%s/browse",e.indexName),data:r},t)}),It=e=>t=>{const r={hitsPerPage:1e3,...t};return H({shouldStop:n=>n.hits.length<r.hitsPerPage,...r,request(n){return ue(e)("",{...r,...n}).then(s=>({...s,hits:s.hits.map(a=>(delete a._highlightResult,a))}))}})},xt=e=>t=>{const r={hitsPerPage:1e3,...t};return H({shouldStop:n=>n.hits.length<r.hitsPerPage,...r,request(n){return de(e)("",{...r,...n}).then(s=>({...s,hits:s.hits.map(a=>(delete a._highlightResult,a))}))}})},J=e=>(t,r,n)=>{const{batchSize:s,...a}=n||{},o={taskIDs:[],objectIDs:[]},c=(h=0)=>{const m=[];let d;for(d=h;d<t.length&&(m.push(t[d]),m.length!==(s||1e3));d++);return m.length===0?Promise.resolve(o):ne(e)(m.map(u=>({action:r,body:u})),a).then(u=>(o.objectIDs=o.objectIDs.concat(u.objectIDs),o.taskIDs.push(u.taskID),d++,c(d)))};return p(c(),(h,m)=>Promise.all(h.taskIDs.map(d=>P(e)(d,m))))},wt=e=>t=>p(e.transporter.write({method:i.Post,path:l("1/indexes/%s/clear",e.indexName)},t),(r,n)=>P(e)(r.taskID,n)),bt=e=>t=>{const{forwardToReplicas:r,...n}=t||{},s=w(n);return r&&(s.queryParameters.forwardToReplicas=1),p(e.transporter.write({method:i.Post,path:l("1/indexes/%s/rules/clear",e.indexName)},s),(a,o)=>P(e)(a.taskID,o))},Dt=e=>t=>{const{forwardToReplicas:r,...n}=t||{},s=w(n);return r&&(s.queryParameters.forwardToReplicas=1),p(e.transporter.write({method:i.Post,path:l("1/indexes/%s/synonyms/clear",e.indexName)},s),(a,o)=>P(e)(a.taskID,o))},Ot=e=>(t,r)=>p(e.transporter.write({method:i.Post,path:l("1/indexes/%s/deleteByQuery",e.indexName),data:t},r),(n,s)=>P(e)(n.taskID,s)),jt=e=>t=>p(e.transporter.write({method:i.Delete,path:l("1/indexes/%s",e.indexName)},t),(r,n)=>P(e)(r.taskID,n)),Tt=e=>(t,r)=>p(se(e)([t],r).then(n=>({taskID:n.taskIDs[0]})),(n,s)=>P(e)(n.taskID,s)),se=e=>(t,r)=>{const n=t.map(s=>({objectID:s}));return J(e)(n,j.DeleteObject,r)},St=e=>(t,r)=>{const{forwardToReplicas:n,...s}=r||{},a=w(s);return n&&(a.queryParameters.forwardToReplicas=1),p(e.transporter.write({method:i.Delete,path:l("1/indexes/%s/rules/%s",e.indexName,t)},a),(o,c)=>P(e)(o.taskID,c))},kt=e=>(t,r)=>{const{forwardToReplicas:n,...s}=r||{},a=w(s);return n&&(a.queryParameters.forwardToReplicas=1),p(e.transporter.write({method:i.Delete,path:l("1/indexes/%s/synonyms/%s",e.indexName,t)},a),(o,c)=>P(e)(o.taskID,c))},Rt=e=>t=>ae(e)(t).then(()=>!0).catch(r=>{if(r.status!==404)throw r;return!1}),Nt=e=>(t,r,n)=>e.transporter.read({method:i.Post,path:l("1/answers/%s/prediction",e.indexName),data:{query:t,queryLanguages:r},cacheable:!0},n),Et=e=>(t,r)=>{const{query:n,paginate:s,...a}=r||{};let o=0;const c=()=>ie(e)(n||"",{...a,page:o}).then(h=>{for(const[m,d]of Object.entries(h.hits))if(t(d))return{object:d,position:parseInt(m,10),page:o};if(o++,s===!1||o>=h.nbPages)throw He();return c()});return c()},At=e=>(t,r)=>e.transporter.read({method:i.Get,path:l("1/indexes/%s/%s",e.indexName,t)},r),qt=()=>(e,t)=>{for(const[r,n]of Object.entries(e.hits))if(n.objectID===t)return parseInt(r,10);return-1},vt=e=>(t,r)=>{const{attributesToRetrieve:n,...s}=r||{},a=t.map(o=>({indexName:e.indexName,objectID:o,...n?{attributesToRetrieve:n}:{}}));return e.transporter.read({method:i.Post,path:"1/indexes/*/objects",data:{requests:a}},s)},Ct=e=>(t,r)=>e.transporter.read({method:i.Get,path:l("1/indexes/%s/rules/%s",e.indexName,t)},r),ae=e=>t=>e.transporter.read({method:i.Get,path:l("1/indexes/%s/settings",e.indexName),data:{getVersion:2}},t),Ut=e=>(t,r)=>e.transporter.read({method:i.Get,path:l("1/indexes/%s/synonyms/%s",e.indexName,t)},r),Gt=e=>(t,r)=>e.transporter.read({method:i.Get,path:l("1/indexes/%s/task/%s",e.indexName,t.toString())},r),zt=e=>(t,r)=>p(oe(e)([t],r).then(n=>({objectID:n.objectIDs[0],taskID:n.taskIDs[0]})),(n,s)=>P(e)(n.taskID,s)),oe=e=>(t,r)=>{const{createIfNotExists:n,...s}=r||{},a=n?j.PartialUpdateObject:j.PartialUpdateObjectNoCreate;return J(e)(t,a,s)},$t=e=>(t,r)=>{const{safe:n,autoGenerateObjectIDIfNotExist:s,batchSize:a,...o}=r||{},c=(g,x,D,b)=>p(e.transporter.write({method:i.Post,path:l("1/indexes/%s/operation",g),data:{operation:D,destination:x}},b),(y,O)=>P(e)(y.taskID,O)),h=Math.random().toString(36).substring(7),m=`${e.indexName}_tmp_${h}`,d=M({appId:e.appId,transporter:e.transporter,indexName:m});let u=[];const f=c(e.indexName,m,"copy",{...o,scope:["settings","synonyms","rules"]});u.push(f);const I=(n?f.wait(o):f).then(()=>{const g=d(t,{...o,autoGenerateObjectIDIfNotExist:s,batchSize:a});return u.push(g),n?g.wait(o):g}).then(()=>{const g=c(m,e.indexName,"move",o);return u.push(g),n?g.wait(o):g}).then(()=>Promise.all(u)).then(([g,x,D])=>({objectIDs:x.objectIDs,taskIDs:[g.taskID,...x.taskIDs,D.taskID]}));return p(I,(g,x)=>Promise.all(u.map(D=>D.wait(x))))},Wt=e=>(t,r)=>B(e)(t,{...r,clearExistingRules:!0}),Ht=e=>(t,r)=>_(e)(t,{...r,clearExistingSynonyms:!0}),Jt=e=>(t,r)=>p(M(e)([t],r).then(n=>({objectID:n.objectIDs[0],taskID:n.taskIDs[0]})),(n,s)=>P(e)(n.taskID,s)),M=e=>(t,r)=>{const{autoGenerateObjectIDIfNotExist:n,...s}=r||{},a=n?j.AddObject:j.UpdateObject;if(a===j.UpdateObject){for(const o of t)if(o.objectID===void 0)return p(Promise.reject(We()))}return J(e)(t,a,s)},Mt=e=>(t,r)=>B(e)([t],r),B=e=>(t,r)=>{const{forwardToReplicas:n,clearExistingRules:s,...a}=r||{},o=w(a);return n&&(o.queryParameters.forwardToReplicas=1),s&&(o.queryParameters.clearExistingRules=1),p(e.transporter.write({method:i.Post,path:l("1/indexes/%s/rules/batch",e.indexName),data:t},o),(c,h)=>P(e)(c.taskID,h))},Bt=e=>(t,r)=>_(e)([t],r),_=e=>(t,r)=>{const{forwardToReplicas:n,clearExistingSynonyms:s,replaceExistingSynonyms:a,...o}=r||{},c=w(o);return n&&(c.queryParameters.forwardToReplicas=1),(a||s)&&(c.queryParameters.replaceExistingSynonyms=1),p(e.transporter.write({method:i.Post,path:l("1/indexes/%s/synonyms/batch",e.indexName),data:t},c),(h,m)=>P(e)(h.taskID,m))},ie=e=>(t,r)=>e.transporter.read({method:i.Post,path:l("1/indexes/%s/query",e.indexName),data:{query:t},cacheable:!0},r),ce=e=>(t,r,n)=>e.transporter.read({method:i.Post,path:l("1/indexes/%s/facets/%s/query",e.indexName,t),data:{facetQuery:r},cacheable:!0},n),ue=e=>(t,r)=>e.transporter.read({method:i.Post,path:l("1/indexes/%s/rules/search",e.indexName),data:{query:t}},r),de=e=>(t,r)=>e.transporter.read({method:i.Post,path:l("1/indexes/%s/synonyms/search",e.indexName),data:{query:t}},r),_t=e=>(t,r)=>{const{forwardToReplicas:n,...s}=r||{},a=w(s);return n&&(a.queryParameters.forwardToReplicas=1),p(e.transporter.write({method:i.Put,path:l("1/indexes/%s/settings",e.indexName),data:t},a),(o,c)=>P(e)(o.taskID,c))},P=e=>(t,r)=>S(n=>Gt(e)(t,r).then(s=>s.status!=="published"?n():void 0)),j={AddObject:"addObject",UpdateObject:"updateObject",PartialUpdateObject:"partialUpdateObject",PartialUpdateObjectNoCreate:"partialUpdateObjectNoCreate",DeleteObject:"deleteObject",DeleteIndex:"delete",ClearIndex:"clear"},F={Settings:"settings",Synonyms:"synonyms",Rules:"rules"};function Ft(e){return{debug(t,r){return Promise.resolve()},info(t,r){return Promise.resolve()},error(t,r){return console.error(t,r),Promise.resolve()}}}const U=e=>(t,r)=>{const n=t.map(s=>({...s,threshold:s.threshold||0}));return e.transporter.read({method:i.Post,path:"1/indexes/*/recommendations",data:{requests:n},cacheable:!0},r)},Lt=e=>(t,r)=>U(e)(t.map(n=>({...n,fallbackParameters:{},model:"bought-together"})),r),Qt=e=>(t,r)=>U(e)(t.map(n=>({...n,model:"related-products"})),r),Kt=e=>(t,r)=>{const n=t.map(s=>({...s,model:"trending-facets",threshold:s.threshold||0}));return e.transporter.read({method:i.Post,path:"1/indexes/*/recommendations",data:{requests:n},cacheable:!0},r)},Xt=e=>(t,r)=>{const n=t.map(s=>({...s,model:"trending-items",threshold:s.threshold||0}));return e.transporter.read({method:i.Post,path:"1/indexes/*/recommendations",data:{requests:n},cacheable:!0},r)},Vt=e=>(t,r)=>U(e)(t.map(n=>({...n,model:"looking-similar"})),r),Yt=e=>(t,r)=>{const n=t.map(s=>({...s,model:"recommended-for-you",threshold:s.threshold||0}));return e.transporter.read({method:i.Post,path:"1/indexes/*/recommendations",data:{requests:n},cacheable:!0},r)};function Zt(){return{send(e){return new Promise(t=>{const r=new XMLHttpRequest;r.open(e.method,e.url,!0),Object.keys(e.headers).forEach(o=>r.setRequestHeader(o,e.headers[o]));const n=(o,c)=>setTimeout(()=>{r.abort(),t({status:0,content:c,isTimedOut:!0})},o*1e3),s=n(e.connectTimeout,"Connection timeout");let a;r.onreadystatechange=()=>{r.readyState>r.OPENED&&a===void 0&&(clearTimeout(s),a=n(e.responseTimeout,"Socket timeout"))},r.onerror=()=>{r.status===0&&(clearTimeout(s),clearTimeout(a),t({content:r.responseText||"Network request failed",status:r.status,isTimedOut:!1}))},r.onload=()=>{clearTimeout(s),clearTimeout(a),t({content:r.responseText,status:r.status,isTimedOut:!1})},r.send(e.data)})}}}function er(e,t,r){const n={appId:e,apiKey:t,timeouts:{connect:1,read:2,write:30},requester:Zt(),logger:Ft(),responsesCache:G(),requestsCache:G({serializable:!1}),hostsCache:R({caches:[le({key:`${z}-${e}`}),G()]}),userAgent:we(z).add({segment:"Browser"})},s={...n,...r},a=()=>o=>Ue({...n,...o,methods:{getPersonalizationStrategy:Ge,setPersonalizationStrategy:ze}});return $e({...s,methods:{search:K,searchForFacetValues:X,multipleBatch:ct,multipleGetObjects:ut,multipleQueries:K,copyIndex:C,copySettings:Le,copySynonyms:Qe,copyRules:Fe,moveIndex:it,listIndices:at,getLogs:Ze,listClusters:st,multipleSearchForFacetValues:X,getApiKey:A,addApiKey:Je,listApiKeys:nt,updateApiKey:yt,deleteApiKey:Xe,restoreApiKey:ht,assignUserID:Me,assignUserIDs:Be,getUserID:tt,searchUserIDs:gt,listUserIDs:ot,getTopUserIDs:et,removeUserID:dt,hasPendingMappings:rt,clearDictionaryEntries:_e,deleteDictionaryEntries:Ve,getDictionarySettings:Ye,getAppTask:re,replaceDictionaryEntries:lt,saveDictionaryEntries:mt,searchDictionaryEntries:pt,setDictionarySettings:ft,waitAppTask:k,customRequest:Ke,initIndex:o=>c=>q(o)(c,{methods:{batch:ne,delete:jt,findAnswers:Nt,getObject:At,getObjects:vt,saveObject:Jt,saveObjects:M,search:ie,searchForFacetValues:ce,waitTask:P,setSettings:_t,getSettings:ae,partialUpdateObject:zt,partialUpdateObjects:oe,deleteObject:Tt,deleteObjects:se,deleteBy:Ot,clearObjects:wt,browseObjects:Pt,getObjectPosition:qt,findObject:Et,exists:Rt,saveSynonym:Bt,saveSynonyms:_,getSynonym:Ut,searchSynonyms:de,browseSynonyms:xt,deleteSynonym:kt,clearSynonyms:Dt,replaceAllObjects:$t,replaceAllSynonyms:Ht,searchRules:ue,getRule:Ct,deleteRule:St,saveRule:Mt,saveRules:B,replaceAllRules:Wt,browseRules:It,clearRules:bt}}),initAnalytics:()=>o=>Ne({...n,...o,methods:{addABTest:Ee,getABTest:qe,getABTests:ve,stopABTest:Ce,deleteABTest:Ae}}),initPersonalization:a,initRecommendation:()=>o=>(s.logger.info("The `initRecommendation` method is deprecated. Use `initPersonalization` instead."),a()(o)),getRecommendations:U,getFrequentlyBoughtTogether:Lt,getLookingSimilar:Vt,getRecommendedForYou:Yt,getRelatedProducts:Qt,getTrendingFacets:Kt,getTrendingItems:Xt}})}er.version=z;export{er as default};
