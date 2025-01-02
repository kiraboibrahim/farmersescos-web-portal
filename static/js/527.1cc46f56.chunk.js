"use strict";(self.webpackChunkfarmersescos_web_portal=self.webpackChunkfarmersescos_web_portal||[]).push([[527],{8527:(e,r,t)=>{t.r(r),t.d(r,{AgroProcessorInstallationList:()=>_,EscoInstallationList:()=>z,FarmerInstallationList:()=>k,GroupInstallationList:()=>C});var n=t(7111),s=t(9335),l=t(9344),i=t(2996),o=t(5269),a=t(9978),c=t(4207),d=t(4217),h=t(5475),u=t(3216),g=t(5797),x=t(5043),A=t(7677),f=t(4066),p=t(2155),j=t(2994),m=t(579);function v(e){let{value:r,sx:t=[],...n}=e;return(0,m.jsx)(a.A,{direction:"row",sx:Array.isArray(t)?t:[t],...n,children:Array.from({length:5}).map(((e,t)=>(0,m.jsx)(j.A,{fontSize:"lg",variant:"solid",color:t+1<=r?"warning":"neutral",fill:"warning"})))})}var w=t(7191),S=t(7836),y=t(6480),b=t(8033),F=t(1251),P=t(8742),I=t(6276);function L(e){let{installation:r}=e;return(0,m.jsxs)(n.A,{size:"sm",variant:"soft",sx:{borderRadius:"lg"},children:[(0,m.jsxs)(s.A,{orientation:"horizontal",children:[(0,m.jsx)(l.A,{src:(0,S.A)(r.esco.profilePhoto),sx:{marginRight:1},children:r.esco.name}),(0,m.jsx)(i.Ay,{level:"body-sm",sx:{display:"block",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontWeight:"bold",width:1,alignSelf:"center"},children:r.esco.name})]}),(0,m.jsx)(o.A,{children:(0,m.jsx)("img",{src:(0,S.A)(r.product.coverPhoto),alt:r.name})}),(0,m.jsx)(v,{value:3}),(0,m.jsxs)(a.A,{direction:"row",children:[(0,m.jsx)(c.Ay,{children:(0,m.jsx)(g.A,{})}),(0,m.jsx)(i.Ay,{level:"body-sm",sx:{alignSelf:"center"},children:null!==r&&void 0!==r&&r.farmer?(0,F.A)(r.farmer):"N/A"})]}),(0,m.jsx)(d.A,{sx:{display:"block",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},component:h.N_,to:"#",overlay:!0,underline:"none",children:(0,m.jsx)(i.Ay,{level:"body-md",children:r.product.name})})]})}function k(){const{id:e}=(0,u.g)(),[r,t]=(0,x.useState)(1),{data:n,error:s,isFetching:l}=(0,f.cp)({farmerId:e,page:r});return(0,m.jsx)(M,{installations:n,error:s,isFetching:l,onSelectPage:t})}function z(){const{id:e}=(0,u.g)(),[r,t]=(0,x.useState)(1),{data:n,error:s,isFetching:l}=(0,p.Rs)({escoId:e,page:r});return(0,m.jsx)(M,{installations:n,error:s,isFetching:l,onSelectPage:t})}function _(){const{id:e}=(0,u.g)(),[r,t]=(0,x.useState)(1),{data:n,error:s,isFetching:l}=(0,I.Uy)({agroProcessorId:e,page:r});return(0,m.jsx)(M,{installations:n,error:s,isFetching:l,onSelectPage:t})}function C(){const{id:e}=(0,u.g)(),[r,t]=(0,x.useState)(1),{data:n,error:s,isFetching:l}=(0,P.ee)({groupId:e,page:r});return(0,m.jsx)(M,{installations:n,error:s,isFetching:l,onSelectPage:t})}function M(e){let{installations:r,error:t=null,isFetching:n=!1,onSelectPage:s=e=>e}=e;return n?(0,m.jsx)(A.A,{}):t?(0,m.jsx)(w.A,{error:t}):(0,m.jsx)(b.A,{data:r,renderItem:e=>(0,m.jsx)(L,{installation:e}),renderEmpty:()=>(0,m.jsx)(y.A,{children:"No installations found"}),onSelectPage:s})}},5797:(e,r,t)=>{var n=t(4994);r.A=void 0;var s=n(t(39)),l=t(579);r.A=(0,s.default)([(0,l.jsx)("path",{d:"M4 9h5c0-1.1-.9-2-2-2H4c-.55 0-1 .45-1 1s.45 1 1 1"},"0"),(0,l.jsx)("path",{d:"M22 14.06V8c0-1.1-.9-2-2-2h-6.29l-1.06-1.06 1.41-1.41-.71-.71-3.53 3.53.71.71 1.41-1.41L13 6.71V9c0 1.1-.9 2-2 2H8.96c-.22-.16-.45-.3-.69-.43l-.4.89-.46-.21.4-.9C7.26 10.13 6.64 10 6 10c-.53 0-1.04.11-1.52.26l.34.91-.47.18-.35-.93c-1.06.46-1.91 1.28-2.43 2.31l.89.4-.21.46-.9-.4C1.13 13.74 1 14.36 1 15c0 .53.11 1.04.26 1.52l.91-.34.18.47-.93.35c.46 1.06 1.28 1.91 2.31 2.43l.4-.89.46.21-.4.9c.55.22 1.17.35 1.81.35.53 0 1.04-.11 1.52-.26l-.34-.91.47-.18.35.93c1.06-.46 1.91-1.28 2.43-2.31l-.89-.4.21-.46.9.4c.1-.26.18-.54.24-.82h5.16c-.02.17-.05.34-.05.51 0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5c0-.95-.38-1.81-1-2.44M6 18c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3m4.87-4c-.04-.18-.08-.35-.13-.52l-.91.34-.18-.47.93-.35H11c2.21 0 4-1.79 4-4V8h5v5.05c-.16-.02-.33-.05-.5-.05-.95 0-1.81.38-2.44 1zm8.63 4c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5"},"1")],"AgricultureOutlined")},2994:(e,r,t)=>{var n=t(4994);r.A=void 0;var s=n(t(39)),l=t(579);r.A=(0,s.default)((0,l.jsx)("path",{d:"m22 9.24-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28z"}),"StarBorder")}}]);
//# sourceMappingURL=527.1cc46f56.chunk.js.map