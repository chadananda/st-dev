import{S as t,i as s,s as e,e as n,t as l,b as r,f as a,g as o,d as h,h as i,k as c,l as f,m as u,n as g,o as m}from"./client.f661b37e.js";function p(t,s,e){const n=t.slice();return n[1]=s[e],n}function d(t){let s,e,g,m,p=t[1]+"";return{c(){s=n("li"),e=n("a"),g=l(p),this.h()},l(t){s=r(t,"LI",{});var n=a(s);e=r(n,"A",{href:!0});var l=a(e);g=o(l,p),l.forEach(h),n.forEach(h),this.h()},h(){i(e,"href",m=t[1])},m(t,n){c(t,s,n),f(s,e),f(e,g)},p(t,s){1&s&&p!==(p=t[1]+"")&&u(g,p),1&s&&m!==(m=t[1])&&i(e,"href",m)},d(t){t&&h(s)}}}function j(t){let s,e=t[0],l=[];for(let s=0;s<e.length;s+=1)l[s]=d(p(t,e,s));return{c(){s=n("ul");for(let t=0;t<l.length;t+=1)l[t].c()},l(t){s=r(t,"UL",{});var e=a(s);for(let t=0;t<l.length;t+=1)l[t].l(e);e.forEach(h)},m(t,e){c(t,s,e);for(let t=0;t<l.length;t+=1)l[t].m(s,null)},p(t,[n]){if(1&n){let r;for(e=t[0],r=0;r<e.length;r+=1){const a=p(t,e,r);l[r]?l[r].p(a,n):(l[r]=d(a),l[r].c(),l[r].m(s,null))}for(;r<l.length;r+=1)l[r].d(1);l.length=e.length}},i:g,o:g,d(t){t&&h(s),m(l,t)}}}async function k(){return{links:[...await this.fetch("/articles.json").then(t=>t.json()).then(t=>t.map(t=>"/articles/"+t.slug+".json")),...await this.fetch("/courses.json").then(t=>t.json()).then(t=>t.map(t=>"/courses/"+t.meta.slug+".json")),"/courses/detail"]}}function v(t,s,e){let{links:n}=s;return t.$$set=t=>{"links"in t&&e(0,n=t.links)},[n]}export default class extends t{constructor(t){super(),s(this,t,v,j,e,{links:0})}}export{k as preload};