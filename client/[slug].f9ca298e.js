import{S as t,i as e,s,y as a,z as r,A as n,r as o,v as i,B as c,a as f,C as m,c as u,k as l,d as $}from"./client.f661b37e.js";import"./getUrl.1df57fa7.js";import{g}from"./getSessions.87acd7e0.js";import"./Debug.ac838e80.js";import{S as p}from"./SignupForm.49e822ff.js";import{C as S}from"./Content.a309c5a7.js";function d(t){let e,s,g,d;e=new S({props:{content:t[0]}});let D=t[2].length&&function(t){let e,s;return e=new p({props:{sessions:t[2],course:t[0],StartDate:t[1]}}),{c(){a(e.$$.fragment)},l(t){r(e.$$.fragment,t)},m(t,a){n(e,t,a),s=!0},p(t,s){const a={};1&s&&(a.course=t[0]),2&s&&(a.StartDate=t[1]),e.$set(a)},i(t){s||(o(e.$$.fragment,t),s=!0)},o(t){i(e.$$.fragment,t),s=!1},d(t){c(e,t)}}}(t);return{c(){a(e.$$.fragment),s=f(),D&&D.c(),g=m()},l(t){r(e.$$.fragment,t),s=u(t),D&&D.l(t),g=m()},m(t,a){n(e,t,a),l(t,s,a),D&&D.m(t,a),l(t,g,a),d=!0},p(t,[s]){const a={};1&s&&(a.content=t[0]),32&s&&(a.$$scope={dirty:s,ctx:t}),e.$set(a),t[2].length&&D.p(t,s)},i(t){d||(o(e.$$.fragment,t),o(D),d=!0)},o(t){i(e.$$.fragment,t),i(D),d=!1},d(t){c(e,t),t&&$(s),D&&D.d(t),t&&$(g)}}}async function D({params:t,query:e}){const s=await this.fetch(`courses/${t.slug}.json`),a=await s.json(),r=e.date?e.date:localStorage.getItem("sessionDate"),n=await g().then(t=>t.filter(t=>t.CourseID===a.meta.id));if(200===s.status)return{course:a,StartDate:r,sessions:n,noSerialize:()=>{}};this.error(res.status,a.message)}function j(t,e,s){let{course:a}=e,{StartDate:r}=e,{sessions:n}=e,{noSerialize:o}=e;o();let i=n.filter(t=>t.Confirmed);return t.$$set=t=>{"course"in t&&s(0,a=t.course),"StartDate"in t&&s(1,r=t.StartDate),"sessions"in t&&s(3,n=t.sessions),"noSerialize"in t&&s(4,o=t.noSerialize)},[a,r,i,n,o]}export default class extends t{constructor(t){super(),e(this,t,j,d,s,{course:0,StartDate:1,sessions:3,noSerialize:4})}}export{D as preload};