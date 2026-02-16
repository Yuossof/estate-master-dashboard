import{r as d,j as e,Y as c,p as i,q as x}from"./index-DSdmN7-O.js";const y=({label:t,value:o,onChange:l})=>{const[r,a]=d.useState(!1),s=n=>{l(n),a(!1)};return e.jsx("div",{className:"w-full",children:e.jsxs("div",{className:"flex-1 flex flex-col min-w-[150px]",children:[t&&e.jsx("label",{htmlFor:"toggle-select",className:"px-1 text-sm font-medium text-gray-700 dark:text-gray-200",children:t}),e.jsxs("div",{className:"relative mt-2",children:[e.jsxs("button",{type:"button",onClick:()=>a(!r),className:`px-3 py-2 text-sm border w-full rounded-md flex items-center justify-between text-left 
              bg-white dark:bg-[var(--surface-elevated)] 
              border-gray-200 dark:border-[var(--border-primary)] 
              shadow-sm hover:border-gray-300 dark:hover:border-[var(--border-primary)]
              c-focus`,children:[e.jsx("span",{className:"text-gray-800 dark:text-gray-200",children:o?"Active":"Inactive"}),e.jsx(c,{className:`h-4 w-4 text-gray-400 dark:text-gray-500 transition-transform ${r?"rotate-180":""}`})]}),e.jsx(i,{children:r&&e.jsxs(x.div,{initial:{opacity:0,y:-10,scale:.95},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:-10,scale:.95},transition:{duration:.2,ease:"easeInOut"},className:`absolute z-50 w-full mt-1 bg-white dark:bg-[var(--surface-elevated)] \r
                  border border-gray-200 dark:border-[var(--border-primary)] \r
                  rounded-sm shadow-md`,children:[e.jsx("button",{type:"button",onClick:()=>s(1),className:`w-full px-3 py-2 text-sm text-left \r
                    hover:bg-gray-100 dark:hover:bg-[var(--surface-hover)]\r
                    text-gray-900 dark:text-gray-100`,children:"Active"}),e.jsx("button",{type:"button",onClick:()=>s(0),className:`w-full px-3 py-2 text-sm text-left \r
                    hover:bg-gray-100 dark:hover:bg-[var(--surface-hover)]\r
                    text-gray-900 dark:text-gray-100`,children:"Inactive"})]})})]})]})})};export{y as T};
