"use strict";(self.webpackChunkfarmersescos_web_portal=self.webpackChunkfarmersescos_web_portal||[]).push([[844],{1844:(e,r,t)=>{t.r(r),t.d(r,{default:()=>Q});var o=t(9263),n=t(5269),i=t(9978),s=t(3077),a=t(1773),l=t(2996),c=t(7111),d=t(9335),u=t(9344),x=t(4207),h=t(3261),m=t(3513),p=t(8620),g=t(3216),A=t(5475),j=t(1269),f=t(7677),y=t(5043),v=t(7836),b=t(439),w=t(7191),C=t(1036);var L=t(600),O=t(3892),R=t(8331),k=t(5124),D=t(6459),P=t(8656),S=t(7058),T=t(459),z=t(579);function I(e){let{name:r,label:t,defaultOptions:n=!0,getOptions:i,getOptionLabel:s,getOptionValue:a,isMulti:c,placeholder:d,sx:u,...x}=e;const h=(0,T.D)(),[,{value:m,touched:p,error:g},{setValue:A,setTouched:j}]=(0,O.Mt)({name:r,...x}),{required:f}=x,y=p&&!!g;return(0,z.jsxs)(k.A,{sx:Array.isArray(u)?u:[u],error:y,children:[(0,z.jsxs)(D.A,{children:[t,!!f&&(0,z.jsx)(l.Ay,{color:"danger",level:"body-sm",children:"*"})]}),(0,z.jsx)(o.A,{sx:{display:"flex",flexWrap:"wrap"},children:(0,z.jsx)(S.A,{isMulti:c,loadOptions:i,defaultOptions:n,value:m,getOptionLabel:s,getOptionValue:a,isClearable:!1,onChange:e=>{j(!0),A(e)},placeholder:d,styles:{container:e=>({...e,display:"inline-block",flexGrow:1}),control:e=>({...e,border:g?`1px solid ${h.palette.danger.outlinedBorder}`:null===e||void 0===e?void 0:e.border})}})}),y&&(0,z.jsx)(P.A,{sx:{fontSize:"sm"},children:g})]})}var M=t(899);const W=M.Ik({name:M.Yj().max(100).required("Product name is required"),description:M.Yj().max(500).required("Description is required"),categories:M.YO().min(1,"Specify atleast one category")});var F=t(4399),V=t(5847),q=t(6250),Y=t(8863),_=t(4021);var U=t(8843);function B(e){let{product:r}=e;const[t,o]=(0,y.useState)(!1),[n,s]=function(){const[e,{isLoading:r}]=(0,j.vM)();return[async function(r,t){const o=structuredClone(t),{categories:n}=o;null!==n&&void 0!==n&&n.length&&(o.categoriesIds=n.map((e=>e.id)),delete o.categories);const{unwrap:i}=e({productId:r,...o});try{const e=await i();return C.oR.success("Product updated"),e}catch(s){C.oR.error(`Product update failed. Reason: ${(0,_.A)(s)}`)}},r]}(),[l]=(0,q.c)();return(0,z.jsx)(Y.A,{initialValues:{...r},validationSchema:W,onSubmit:async e=>{const t=(0,F.A)(r,e);(0,V.A)(t)||await n(r.id,t)},onDirty:e=>o(e),children:(0,z.jsxs)(O.lV,{children:[(0,z.jsx)(L.A,{sx:{marginTop:3},name:"name",label:"Product name"}),(0,z.jsx)(I,{sx:{marginTop:2},isMulti:!0,name:"categories",label:"Categories",getOptionLabel:e=>e.name,getOptionValue:e=>e.id,getOptions:(e,r)=>{l().unwrap().then((t=>{let{data:o}=t;r(o.filter((r=>{let{name:t}=r;return t.toLowerCase().includes(e.toLowerCase())})))})).catch((e=>C.oR.error(null===e||void 0===e?void 0:e.message)))}}),(0,z.jsx)(R.A,{sx:{marginTop:2},name:"description",label:"Description"}),(0,z.jsxs)(i.A,{direction:"row",sx:{marginTop:2,width:"100%"},children:[(0,z.jsx)(a.A,{sx:{flexGrow:1},type:"reset",size:"md",variant:"soft",color:"success",disabled:!t||s,children:"Undo Changes"}),(0,z.jsx)(a.A,{size:"md",color:"success",variant:"solid",startDecorator:(0,z.jsx)(U.A,{}),sx:{flexGrow:2,marginLeft:2},type:"submit",disabled:!t||s,loading:s,loadingPosition:"start",children:"Save"})]})]})})}var G=t(243),$=t(3510),N=t(9469),Z=t.n(N),E=t(1834),X=t(259);function H(e){let{item:r,sx:t=[],...o}=e;const[n,{isLoading:i}]=(0,j.FL)(),{id:s,videoUrl:u,title:x}=r;return(0,z.jsxs)(c.A,{size:"sm",sx:[{minWidth:1,maxWidth:1,borderRadius:"lg"},{...Array.isArray(t)?t:[t]}],...o,children:[(0,z.jsxs)(d.A,{orientation:"horizontal",sx:{alignItems:"center"},children:[(0,z.jsx)(l.Ay,{level:"body-sm",sx:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:x}),(0,z.jsx)(a.A,{size:"sm",sx:{borderRadius:50,marginLeft:"auto"},color:"danger",disabled:i,loading:i,loadingPosition:"start",onClick:async()=>await async function(){const{unwrap:e}=n(s);try{await e(),C.oR.success("Learning material deleted")}catch(r){C.oR.error((0,_.A)(r))}}(),children:"Delete"})]}),(0,z.jsx)(d.A,{children:(0,z.jsx)(Z(),{url:u,width:"100%",height:200})})]})}function J(){const[,e]=(0,X.Ot)();return(0,z.jsx)(E.A,{variant:"soft",color:"neutral",sx:{minWidth:1,height:200,display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"lg"},children:(0,z.jsxs)(i.A,{direction:"column",sx:{alignItems:"center"},children:[(0,z.jsx)($.A,{fontSize:"xl3"}),(0,z.jsx)(l.Ay,{level:"body-sm",children:"No Learning Materials"}),(0,z.jsx)(a.A,{size:"sm",variant:"soft",color:"success",sx:{borderRadius:50,marginTop:1},onClick:()=>e(),children:"Upload"})]})})}function K(e){let{productId:r}=e;const{data:t,isFetching:o,error:n}=(0,j.y6)(r);return o?(0,z.jsx)(f.A,{size:"sm"}):n?(0,z.jsx)(w.A,{error:n}):t.length?(0,z.jsx)(i.A,{direction:"row",spacing:2,sx:{overflowX:"scroll",overflowY:"hidden",overflow:"scroll","&::-webkit-scrollbar":{display:"none"},"&":{scrollbarWidth:"none",msOverflowStyle:"none"}},children:t.map(((e,r)=>(0,z.jsx)(H,{item:e,sx:{flex:"1 1 auto"}},r)))}):(0,z.jsx)(J,{})}function Q(){const{id:e}=(0,g.g)(),[r,t]=(0,y.useState)(null),[,L]=(0,G.Zj)(),[,O]=(0,X.Ot)(),[R,k]=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/products";const r=(0,g.Zp)(),[t,{isLoading:o}]=(0,j.lY)();return[async function(o){const{unwrap:n}=t(o);try{await n(),C.oR.success("Product deleted"),r(e)}catch(i){C.oR.error("Product deletion failed")}},o]}(),{data:D,error:P,isFetching:S}=(0,j.tA)(e);return S?(0,z.jsx)(f.A,{}):P?(0,z.jsx)(w.A,{error:P}):D?(0,z.jsxs)(o.A,{sx:{padding:2,marginBottom:3,maxWidth:800,marginLeft:"auto",marginRight:"auto",position:"relative"},children:[(0,z.jsxs)(o.A,{sx:{marginLeft:"auto",marginRight:"auto",maxWidth:500},children:[(0,z.jsx)(n.A,{variant:"plain",children:(0,z.jsx)("img",{src:r||(0,v.A)(D.coverPhoto),alt:D.name})}),(0,z.jsx)(i.A,{spacing:2,direction:"row",sx:{marginTop:2,justifyContent:"center"},children:[D.coverPhoto,D.photo1,D.photo2,D.photo3,D.photo4].map(((e,r)=>(0,z.jsx)(n.A,{sx:{width:100,cursor:"pointer"},children:(0,z.jsx)("img",{src:(0,v.A)(e),alt:D.name,onClick:()=>t((0,v.A)(e))})},r)))}),(0,z.jsxs)(s.A,{variant:"soft",color:"warning",buttonFlex:1,sx:{marginTop:3},children:[(0,z.jsx)(a.A,{disabled:k,loading:k,loadingPosition:"start",startDecorator:(0,z.jsx)(m.A,{}),onClick:async()=>{await R(e)},children:"Delete"}),(0,z.jsx)(a.A,{startDecorator:(0,z.jsx)(p.A,{}),disabled:D.isFeatured,onClick:()=>L(),children:"Promote"}),(0,z.jsx)(a.A,{startDecorator:(0,z.jsx)($.A,{}),onClick:()=>O(),children:"Upload"})]}),(0,z.jsx)(l.Ay,{level:"h4",sx:{marginTop:3},children:(0,b.A)(D.name)}),(0,z.jsx)(l.Ay,{sx:{marginTop:2},level:"body-md",children:"Sold by"}),(0,z.jsx)(c.A,{children:(0,z.jsxs)(d.A,{orientation:"horizontal",children:[(0,z.jsx)(u.A,{src:(0,v.A)(D.esco.profilePhoto),alt:D.esco.name}),(0,z.jsx)(l.Ay,{level:"body-sm",children:(0,b.A)(D.esco.name)}),(0,z.jsx)(x.Ay,{sx:{marginLeft:"auto"},component:A.N_,to:`/escos/${D.esco.id}`,children:(0,z.jsx)(h.A,{})})]})}),(0,z.jsx)(l.Ay,{level:"body-md",sx:{marginTop:3,marginBottom:1},children:"Learning Materials"}),(0,z.jsx)(K,{productId:e}),(0,z.jsx)(B,{product:D})]}),(0,z.jsx)(G.Ay,{product:D}),(0,z.jsx)(X.Ay,{product:D})]}):void 0}},8863:(e,r,t)=>{t.d(r,{A:()=>a});var o=t(3892),n=t(5043),i=t(579);function s(e){let{onDirty:r,children:t}=e;const{dirty:s}=(0,o.j7)();return(0,n.useEffect)((()=>{r(s)}),[s,r]),(0,i.jsx)(i.Fragment,{children:t})}function a(e){let{children:r,onDirty:t,...n}=e;return(0,i.jsx)(o.l1,{...n,children:(0,i.jsx)(s,{onDirty:t,children:r})})}},4399:(e,r,t)=>{t.d(r,{A:()=>a});const o=t(9159),n=t(67),i=t(6878),{isArray:s}=Array;function a(e,r){return function e(r,t){return o(r,(function(r,o,a){n(o,t[a])||(r[a]=i(o)&&i(t[a])&&!s(o)&&!s(t[a])?e(o,t[a]):o)}))}(r,e)}}}]);
//# sourceMappingURL=844.50db29c6.chunk.js.map