"use strict";(self.webpackChunkfarmersescos_web_portal=self.webpackChunkfarmersescos_web_portal||[]).push([[315],{4315:(e,r,t)=>{t.r(r),t.d(r,{default:()=>$});var o=t(9263),n=t(5269),i=t(9978),s=t(3077),a=t(1773),l=t(2996),c=t(7111),d=t(9335),u=t(3514),x=t(4207),m=t(8843),p=t(3261),h=t(3513),g=t(8620),A=t(600),j=t(3216),f=t(5475),v=t(1269),y=t(7677),b=t(3892),w=t(8331),S=t(1036),O=t(5124),D=t(6459),C=t(8656),L=t(7058),k=t(459),T=t(579);const P="select-option",V="remove-value";function R(e){let{name:r,label:t,defaultOptions:n=!0,getOptions:i,getOptionLabel:s,getOptionValue:a,isMulti:l,placeholder:c,containerSx:d,...u}=e;const x=(0,k.D)(),[,{value:m,touched:p,error:h},{setValue:g,setError:A,setTouched:j}]=(0,b.Mt)({name:r,...u}),f=p&&!!h;function v(e,r){switch(j(!0),e){case P:return function(e){g(m.filter((r=>a(r)!==a(e))).concat([e]))}(r);case V:return function(e){g(m.filter((r=>a(r)!==a(e))))}(r);default:return A("Unknown action performed")}}return(0,T.jsxs)(O.A,{sx:d,error:f,children:[(0,T.jsx)(D.A,{children:t}),(0,T.jsx)(o.A,{sx:{display:"flex",flexWrap:"wrap"},children:(0,T.jsx)(L.A,{isMulti:l,loadOptions:i,defaultOptions:n,value:m,getOptionLabel:s,getOptionValue:a,isClearable:!1,onChange:(e,r)=>{const{action:t,option:o,removedValue:n}=r;return v(t,o||n)},placeholder:c,styles:{container:e=>({...e,display:"inline-block",flexGrow:1}),control:e=>({...e,border:h?`1px solid ${x.palette.danger.outlinedBorder}`:null===e||void 0===e?void 0:e.border})}})}),f&&(0,T.jsx)(C.A,{sx:{fontSize:"sm"},children:h})]})}var M=t(5043),_=t(899);const q=_.Ik({name:_.Yj().max(100).required("Product name is required"),description:_.Yj().max(500).required("Description is required"),categories:_.YO().min(1,"Specify atleast one category")});var z=t(4399),F=t(5847),E=t(6250),G=t(4021),W=t(8863),Y=t(9824);function $(){const[e,r]=(0,M.useState)(!1),[t]=(0,E.c)(),{id:O}=(0,j.g)(),[D,C]=(0,M.useState)(null),{data:L,error:k,isFetching:P}=(0,v.tA)(O),[V,{isError:_,error:$,isLoading:B,isSucess:I}]=(0,v.vM)();return P?(0,T.jsx)(y.A,{}):(k&&S.oR.error((0,G.A)(k)),_&&S.oR.error((0,G.A)($)),I&&S.oR.success("Product updated"),L?(0,T.jsxs)(o.A,{sx:{padding:2,marginBottom:3,maxWidth:800,marginLeft:"auto",marginRight:"auto",position:"relative"},children:[(0,T.jsxs)(o.A,{sx:{marginLeft:"auto",marginRight:"auto",maxWidth:500},children:[(0,T.jsx)(n.A,{variant:"plain",children:(0,T.jsx)("img",{src:D||(0,Y.A)(L.coverPhoto),alt:L.name})}),(0,T.jsx)(i.A,{spacing:2,direction:"row",sx:{marginTop:2,justifyContent:"center"},children:[L.coverPhoto,L.photo1,L.photo2,L.photo3,L.photo4].map(((e,r)=>(0,T.jsx)(n.A,{sx:{width:100,cursor:"pointer"},children:(0,T.jsx)("img",{src:(0,Y.A)(e),alt:L.name,onClick:()=>C((0,Y.A)(e))})},r)))}),(0,T.jsxs)(s.A,{variant:"soft",color:"warning",buttonFlex:1,sx:{marginTop:3},children:[(0,T.jsx)(a.A,{startDecorator:(0,T.jsx)(h.A,{}),children:"Delete"}),(0,T.jsx)(a.A,{startDecorator:(0,T.jsx)(g.A,{}),children:"Feature"})]}),(0,T.jsx)(l.Ay,{level:"h4",sx:{marginTop:3},children:L.name}),(0,T.jsx)(l.Ay,{sx:{marginTop:2},level:"body-md",children:"Sold by"}),(0,T.jsx)(c.A,{children:(0,T.jsxs)(d.A,{orientation:"horizontal",children:[(0,T.jsx)(u.A,{src:`https://farmersescosuploads.legitsystemsug.com/${L.esco.profilePhoto}`,alt:L.esco.name}),(0,T.jsx)(l.Ay,{level:"body-sm",children:L.esco.name}),(0,T.jsx)(x.Ay,{sx:{marginLeft:"auto"},component:f.N_,to:`/escos/${L.esco.id}`,children:(0,T.jsx)(p.A,{})})]})})]}),(0,T.jsx)(W.A,{initialValues:{...L},validationSchema:q,onSubmit:async e=>{const r=(0,z.A)(L,e);(0,F.A)(r)||await V({productId:O,...r})},onDirty:e=>r(e),children:(0,T.jsxs)(b.lV,{children:[(0,T.jsx)(A.A,{containerSx:{marginTop:3},name:"name",label:"Product name"}),(0,T.jsx)(R,{containerSx:{marginTop:2},isMulti:!0,name:"categories",label:"Categories",getOptionLabel:e=>e.name,getOptionValue:e=>e.id,getOptions:(e,r)=>{t().unwrap().then((t=>{let{data:o}=t;r(o.filter((r=>{let{name:t}=r;return t.toLowerCase().includes(e.toLowerCase())})))})).catch((e=>S.oR.error(null===e||void 0===e?void 0:e.message)))}}),(0,T.jsx)(w.A,{containerSx:{marginTop:2},name:"description",label:"Description"}),(0,T.jsxs)(i.A,{direction:"row",sx:{marginTop:2,position:"sticky",bottom:0},children:[(0,T.jsx)(a.A,{sx:{flexGrow:1},type:"reset",size:"md",variant:"soft",color:"success",disabled:!e||B,children:"Undo Changes"}),(0,T.jsx)(a.A,{size:"md",color:"success",variant:"solid",startDecorator:(0,T.jsx)(m.A,{}),sx:{flexGrow:2,marginLeft:2},type:"submit",disabled:!e||B,loading:B,loadingPosition:"start",children:"Save"})]})]})})]}):void 0)}},8863:(e,r,t)=>{t.d(r,{A:()=>a});var o=t(3892),n=t(5043),i=t(579);function s(e){let{onDirty:r,children:t}=e;const{dirty:s}=(0,o.j7)();return(0,n.useEffect)((()=>{r(s)}),[s,r]),(0,i.jsx)(i.Fragment,{children:t})}function a(e){let{children:r,onDirty:t,...n}=e;return(0,i.jsx)(o.l1,{...n,children:(0,i.jsx)(s,{onDirty:t,children:r})})}},4399:(e,r,t)=>{t.d(r,{A:()=>a});const o=t(9159),n=t(67),i=t(6878),{isArray:s}=Array;function a(e,r){return function e(r,t){let a=0;return o(r,(function(r,o,l){if(!n(o,t[l])){r[s(t)?a++:l]=i(o)&&i(t[l])?e(o,t[l]):o}}))}(r,e)}}}]);
//# sourceMappingURL=315.af042447.chunk.js.map