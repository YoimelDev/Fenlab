import{x as g,Q as k,B as y,q as v,c as B,s as C,u as P,v as $}from"./utils-DP4q4KRi.js";import{d as p,o as u,c as f,w as d,m,A as D,B as O,u as s,p as w,l as b,a as z,C as h}from"./app-CWI92P17.js";const j=p({__name:"DropdownMenu",props:{defaultOpen:{type:Boolean},open:{type:Boolean},dir:{},modal:{type:Boolean}},emits:["update:open"],setup(e,{emit:o}){const n=g(e,o);return(r,l)=>(u(),f(s(k),D(O(s(n))),{default:d(()=>[m(r.$slots,"default")]),_:3},16))}}),K=p({__name:"DropdownMenuTrigger",props:{disabled:{type:Boolean},asChild:{type:Boolean},as:{}},setup(e){const t=y(e);return(a,n)=>(u(),f(s(v),w({class:"outline-none"},s(t)),{default:d(()=>[m(a.$slots,"default")]),_:3},16))}}),L=p({__name:"DropdownMenuContent",props:{forceMount:{type:Boolean},loop:{type:Boolean},side:{},sideOffset:{default:4},align:{},alignOffset:{},avoidCollisions:{type:Boolean},collisionBoundary:{},collisionPadding:{},arrowPadding:{},sticky:{},hideWhenDetached:{type:Boolean},updatePositionStrategy:{},prioritizePosition:{type:Boolean},asChild:{type:Boolean},as:{},class:{}},emits:["escapeKeyDown","pointerDownOutside","focusOutside","interactOutside","closeAutoFocus"],setup(e,{emit:o}){const t=e,a=o,n=b(()=>{const{class:l,...i}=t;return i}),r=g(n,a);return(l,i)=>(u(),f(s(P),null,{default:d(()=>[z(s(C),w(s(r),{class:s(B)("z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",t.class)}),{default:d(()=>[m(l.$slots,"default")]),_:3},16,["class"])]),_:3}))}}),Q=p({__name:"DropdownMenuItem",props:{disabled:{type:Boolean},textValue:{},asChild:{type:Boolean},as:{},class:{},inset:{type:Boolean}},setup(e){const o=e,t=b(()=>{const{class:n,...r}=o;return r}),a=y(t);return(n,r)=>(u(),f(s($),w(s(a),{class:s(B)("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",n.inset&&"pl-8",o.class)}),{default:d(()=>[m(n.$slots,"default")]),_:3},16,["class"]))}});/**
 * @license lucide-vue-next v0.447.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-vue-next v0.447.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var c={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-vue-next v0.447.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=({size:e,strokeWidth:o=2,absoluteStrokeWidth:t,color:a,iconNode:n,name:r,class:l,...i},{slots:_})=>h("svg",{...c,width:e||c.width,height:e||c.height,stroke:a||c.stroke,"stroke-width":t?Number(o)*24/Number(e):o,class:["lucide",`lucide-${M(r??"icon")}`],...i},[...n.map(x=>h(...x)),..._.default?[_.default()]:[]]);/**
 * @license lucide-vue-next v0.447.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=(e,o)=>(t,{slots:a})=>h(A,{...t,iconNode:o,name:e},a);/**
 * @license lucide-vue-next v0.447.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=I("EllipsisIcon",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]]);export{S as E,K as _,L as a,Q as b,j as c};
