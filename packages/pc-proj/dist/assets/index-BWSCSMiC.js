import{j as a,ab as g,I as j}from"./index-64wCEMT-.js";import{i as o}from"./aiTextGener-a3QDKtBZ.js";import{I as y}from"./index-DRC_xhUG.js";const w="/assets/upload-DECVLlAV.svg";function v({value:r,img:t,textareaProps:c={},onChange:u,onPressEnter:m,onUploadImg:i,onRemoveImg:p}){const{TextArea:x}=j,d=async s=>{const e=s.target.files;if(!(e!=null&&e[0]))return;const n=await o(e[0]);i({file:e[0],base64:n})},f=async s=>{s.keyCode!==229&&m(r)},h=async s=>{const e=[...s.clipboardData.items].map(l=>l.getAsFile()).filter(l=>l&&l.type.includes("image"));if(!(e!=null&&e[0]))return;const n=await o(e[0]);i({file:e[0],base64:n})};return a.jsxs("div",{className:"flex items-center gap-[20px]",children:[a.jsx(x,{value:r,onChange:s=>u(s.target.value),onPaste:h,onPressEnter:s=>f(s),placeholder:"请输入问题",style:{height:120,resize:"none"},...c}),a.jsxs("div",{className:"flex-none w-[100px] h-[100px]",children:[t&&a.jsxs("div",{className:"relative w-full h-full flex justify-center items-center ",children:[a.jsx(g,{className:"absolute z-10  right-0 top-0 translate-x-1/2 -translate-y-1/2 text-gray-500 bg-white rounded-full",onClick:()=>p(t)}),a.jsx(y,{src:t.base64,alt:"img",className:"max-w-[100px] max-h-[100px] h-auto w-auto"})]}),!t&&a.jsxs("label",{htmlFor:"upload",className:"cursor-pointer w-full h-full",children:[a.jsx("img",{src:w,alt:"upload",className:"w-full h-full"}),a.jsx("input",{className:"hidden",type:"file",id:"upload",accept:"image/*",multiple:!1,onChange:d})]})]})]})}export{v as I};