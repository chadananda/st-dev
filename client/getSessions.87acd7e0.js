import{u as t}from"./getUrl.1df57fa7.js";async function e(){let e=[],a=await fetch(t).then(t=>t.json()),r=await fetch("/courses.json").then(t=>t.json()).then(t=>t.reduce((t,e)=>(-1===t.indexOf(e.meta.id)&&t.push(e.meta.id),t),[]));if(!a.data)throw new Error("No database connection.");return e=a.data.filter(t=>t.CourseID).sort((t,e)=>t.StartDate<e.StartDate?-1:t.StartDate>e.StartDate?1:t.Title<e.Title?-1:1).map(t=>(t.StartDate=t.StartDate.substring(0,10),t.EndDate=t.EndDate.substring(0,10),t.meta={id:t.CourseID,title:t.Title},t.meta.href="/courses/",-1===r.indexOf(t.CourseID)&&(t.meta.href+=`detail?date=${t.StartDate}&id=`),t.meta.href+=t.CourseID,t)),e=e.map((t,a)=>{let r;t.next=[],t.prev=[];let s=new Date(t.StartDate+"T00:00:00.000Z");s.setDate(s.getDate()-3),s=s.toISOString().split("T")[0];let n=new Date(t.EndDate+"T00:00:00.000Z");for(n.setDate(n.getDate()+3),n=n.toISOString().split("T")[0],r=a;r>0&&(e[r-1].EndDate>=s&&e[r-1].EndDate<=t.EndDate);r--)t.prev.push(Object.assign({},e[r-1],{next:void 0,prev:void 0}));for(r=a+1;r<e.length&&(e[r].StartDate<=n&&e[r].StartDate>=t.EndDate);r--)t.next.push(Object.assign({},e[r]));return t}),localStorage.setItem("sessions",JSON.stringify(e)),localStorage.setItem("sessionCacheTime",new Date),e}async function a(t=!1){let a=[];{if(t)return a=await e(),a;a=JSON.parse(localStorage.getItem("sessions")||"[]");let r=new Date;r.setMinutes(r.getMinutes()-15),(localStorage.getItem("sessionCacheTime")||"0")<r.toString()&&(a=await e())}return a}export{a as g};
