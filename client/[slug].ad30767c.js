import{S as s,i as e,s as t,e as a,a as l,t as r,b as c,f as i,d as n,c as h,g as o,h as f,k as v,l as m,m as u,n as g,C as d,j as p,o as w,y as E,z as I,A as $,r as x,v as D,B as V,q as b,D as y,E as k}from"./client.f661b37e.js";function z(s){let e,t,d,p,w,E,I,$,x,D,V,b,y,k,z,A,M,j,q,G,T,H,L,N,B,C,P,R,Y,S,F,J,K,O,Q=s[0].title+"",U=s[1].title+"";return{c(){e=a("div"),t=a("div"),d=a("div"),p=a("a"),w=a("img"),x=l(),D=a("div"),V=a("div"),b=r("⬿ Previous"),y=l(),k=a("div"),z=a("a"),A=r(Q),j=l(),q=a("div"),G=a("div"),T=a("a"),H=a("img"),C=l(),P=a("div"),R=a("div"),Y=r("Next ⤳"),S=l(),F=a("div"),J=a("a"),K=r(U),this.h()},l(s){e=c(s,"DIV",{class:!0});var a=i(e);t=c(a,"DIV",{class:!0});var l=i(t);d=c(l,"DIV",{class:!0});var r=i(d);p=c(r,"A",{href:!0,class:!0});var f=i(p);w=c(f,"IMG",{class:!0,src:!0,alt:!0}),f.forEach(n),r.forEach(n),x=h(l),D=c(l,"DIV",{class:!0});var v=i(D);V=c(v,"DIV",{class:!0});var m=i(V);b=o(m,"⬿ Previous"),m.forEach(n),y=h(v),k=c(v,"DIV",{class:!0});var u=i(k);z=c(u,"A",{href:!0,class:!0});var g=i(z);A=o(g,Q),g.forEach(n),u.forEach(n),v.forEach(n),l.forEach(n),j=h(a),q=c(a,"DIV",{class:!0});var E=i(q);G=c(E,"DIV",{class:!0});var I=i(G);T=c(I,"A",{href:!0,class:!0});var $=i(T);H=c($,"IMG",{class:!0,src:!0,alt:!0}),$.forEach(n),I.forEach(n),C=h(E),P=c(E,"DIV",{class:!0});var M=i(P);R=c(M,"DIV",{class:!0});var L=i(R);Y=o(L,"Next ⤳"),L.forEach(n),S=h(M),F=c(M,"DIV",{class:!0});var N=i(F);J=c(N,"A",{href:!0,class:!0});var B=i(J);K=o(B,U),B.forEach(n),N.forEach(n),M.forEach(n),E.forEach(n),a.forEach(n),this.h()},h(){f(w,"class"," svelte-23hweo"),w.src!==(E="/articles/"+s[0].img)&&f(w,"src",E),f(w,"alt",I=s[0].title),f(p,"href",$="/articles/"+s[0].slug),f(p,"class","svelte-23hweo"),f(d,"class","image"),f(V,"class","label svelte-23hweo"),f(z,"href",M="/articles/"+s[0].slug),f(z,"class","svelte-23hweo"),f(k,"class","title svelte-23hweo"),f(D,"class","text svelte-23hweo"),f(t,"class","w-1/2 prev svelte-23hweo"),f(H,"class"," svelte-23hweo"),H.src!==(L="/articles/"+s[1].img)&&f(H,"src",L),f(H,"alt",N=s[1].title),f(T,"href",B="/articles/"+s[1].slug),f(T,"class","svelte-23hweo"),f(G,"class","image"),f(R,"class","label svelte-23hweo"),f(J,"href",O="/articles/"+s[1].slug),f(J,"class","svelte-23hweo"),f(F,"class","title svelte-23hweo"),f(P,"class","text svelte-23hweo"),f(q,"class","w-1/2 next svelte-23hweo"),f(e,"class","flex justify-between w-100 main svelte-23hweo")},m(s,a){v(s,e,a),m(e,t),m(t,d),m(d,p),m(p,w),m(t,x),m(t,D),m(D,V),m(V,b),m(D,y),m(D,k),m(k,z),m(z,A),m(e,j),m(e,q),m(q,G),m(G,T),m(T,H),m(q,C),m(q,P),m(P,R),m(R,Y),m(P,S),m(P,F),m(F,J),m(J,K)},p(s,[e]){1&e&&w.src!==(E="/articles/"+s[0].img)&&f(w,"src",E),1&e&&I!==(I=s[0].title)&&f(w,"alt",I),1&e&&$!==($="/articles/"+s[0].slug)&&f(p,"href",$),1&e&&Q!==(Q=s[0].title+"")&&u(A,Q),1&e&&M!==(M="/articles/"+s[0].slug)&&f(z,"href",M),2&e&&H.src!==(L="/articles/"+s[1].img)&&f(H,"src",L),2&e&&N!==(N=s[1].title)&&f(H,"alt",N),2&e&&B!==(B="/articles/"+s[1].slug)&&f(T,"href",B),2&e&&U!==(U=s[1].title+"")&&u(K,U),2&e&&O!==(O="/articles/"+s[1].slug)&&f(J,"href",O)},i:g,o:g,d(s){s&&n(e)}}}function A(s,e,t){let{prev:a}=e,{next:l}=e;return s.$$set=s=>{"prev"in s&&t(0,a=s.prev),"next"in s&&t(1,l=s.next)},[a,l]}class M extends s{constructor(s){super(),e(this,s,A,z,t,{prev:0,next:1})}}function j(s,e,t){const a=s.slice();return a[1]=e[t],a[3]=t,a}function q(s){let e,t=s[3]<5&&function(s){let e,t,g,d,p,w,E,I,$,x,D,V,b,y,k,z=s[1].author+"",A=s[1].title+"";return{c(){e=a("div"),t=a("a"),g=a("div"),d=a("img"),E=l(),I=a("div"),$=a("div"),x=r(z),D=l(),V=a("div"),b=r(A),k=l(),this.h()},l(s){e=c(s,"DIV",{class:!0});var a=i(e);t=c(a,"A",{href:!0,class:!0});var l=i(t);g=c(l,"DIV",{class:!0});var r=i(g);d=c(r,"IMG",{class:!0,src:!0,alt:!0}),r.forEach(n),E=h(l),I=c(l,"DIV",{class:!0});var f=i(I);$=c(f,"DIV",{class:!0});var v=i($);x=o(v,z),v.forEach(n),D=h(f),V=c(f,"DIV",{class:!0});var m=i(V);b=o(m,A),m.forEach(n),f.forEach(n),l.forEach(n),a.forEach(n),k=h(s),this.h()},h(){f(d,"class"," svelte-1ms1wir"),d.src!==(p="/articles/"+s[1].img)&&f(d,"src",p),f(d,"alt",w=s[1].title),f(g,"class","image"),f($,"class","label svelte-1ms1wir"),f(V,"class","title svelte-1ms1wir"),f(I,"class","text svelte-1ms1wir"),f(t,"href",y="/articles/"+s[1].slug),f(t,"class","svelte-1ms1wir"),f(e,"class","item w-20 center svelte-1ms1wir")},m(s,a){v(s,e,a),m(e,t),m(t,g),m(g,d),m(t,E),m(t,I),m(I,$),m($,x),m(I,D),m(I,V),m(V,b),v(s,k,a)},p(s,e){1&e&&d.src!==(p="/articles/"+s[1].img)&&f(d,"src",p),1&e&&w!==(w=s[1].title)&&f(d,"alt",w),1&e&&z!==(z=s[1].author+"")&&u(x,z),1&e&&A!==(A=s[1].title+"")&&u(b,A),1&e&&y!==(y="/articles/"+s[1].slug)&&f(t,"href",y)},d(s){s&&n(e),s&&n(k)}}}(s);return{c(){t&&t.c(),e=d()},l(s){t&&t.l(s),e=d()},m(s,a){t&&t.m(s,a),v(s,e,a)},p(s,e){s[3]<5&&t.p(s,e)},d(s){t&&t.d(s),s&&n(e)}}}function G(s){let e,t=s[0],l=[];for(let e=0;e<t.length;e+=1)l[e]=q(j(s,t,e));return{c(){e=a("div");for(let s=0;s<l.length;s+=1)l[s].c();this.h()},l(s){e=c(s,"DIV",{class:!0,style:!0});var t=i(e);for(let s=0;s<l.length;s+=1)l[s].l(t);t.forEach(n),this.h()},h(){f(e,"class","flex flex-wrap justify-between w-100 main svelte-1ms1wir"),p(e,"width","100%")},m(s,t){v(s,e,t);for(let s=0;s<l.length;s+=1)l[s].m(e,null)},p(s,[a]){if(1&a){let r;for(t=s[0],r=0;r<t.length;r+=1){const c=j(s,t,r);l[r]?l[r].p(c,a):(l[r]=q(c),l[r].c(),l[r].m(e,null))}for(;r<l.length;r+=1)l[r].d(1);l.length=t.length}},i:g,o:g,d(s){s&&n(e),w(l,s)}}}function T(s,e,t){let{similar:a}=e;return s.$$set=s=>{"similar"in s&&t(0,a=s.similar)},[a]}class H extends s{constructor(s){super(),e(this,s,T,G,t,{similar:0})}}function L(s){let e,t,l,h,g,d=s[0].base.title+"";return{c(){e=a("div"),t=r("Translated from "),l=a("a"),h=r(d),this.h()},l(s){e=c(s,"DIV",{class:!0});var a=i(e);t=o(a,"Translated from "),l=c(a,"A",{href:!0});var r=i(l);h=o(r,d),r.forEach(n),a.forEach(n),this.h()},h(){f(l,"href",g="/articles/"+s[0].base.slug),f(e,"class","translated-from")},m(s,a){v(s,e,a),m(e,t),m(e,l),m(l,h)},p(s,e){1&e&&d!==(d=s[0].base.title+"")&&u(h,d),1&e&&g!==(g="/articles/"+s[0].base.slug)&&f(l,"href",g)},d(s){s&&n(e)}}}function N(s){let e,t,u,g,d,p,w,b,y;return b=new H({props:{similar:s[0].tagmatches}}),{c(){e=a("img"),u=l(),g=a("div"),d=a("h2"),p=r("You may also like:"),w=l(),E(b.$$.fragment),this.h()},l(s){e=c(s,"IMG",{class:!0,src:!0,alt:!0}),u=h(s),g=c(s,"DIV",{class:!0});var t=i(g);d=c(t,"H2",{class:!0});var a=i(d);p=o(a,"You may also like:"),a.forEach(n),w=h(t),I(b.$$.fragment,t),t.forEach(n),this.h()},h(){f(e,"class","hr svelte-1rkznfd"),e.src!==(t="/squiggle.svg")&&f(e,"src","/squiggle.svg"),f(e,"alt","hr"),f(d,"class","svelte-1rkznfd"),f(g,"class","similar svelte-1rkznfd")},m(s,t){v(s,e,t),v(s,u,t),v(s,g,t),m(g,d),m(d,p),m(g,w),$(b,g,null),y=!0},p(s,e){const t={};1&e&&(t.similar=s[0].tagmatches),b.$set(t)},i(s){y||(x(b.$$.fragment,s),y=!0)},o(s){D(b.$$.fragment,s),y=!1},d(s){s&&n(e),s&&n(u),s&&n(g),V(b)}}}function B(s){let e,t,g,d,p,w,z,A,j,q,G,T,H,B,C,P,R,Y,S,F,J,K,O,Q,U,W,X,Z,_=s[0].title+"",ss=s[0].author+"",es=s[0].html+"";document.title=e=s[0].title+" by "+s[0].author+" | 𝑺𝒂𝒄𝒓𝒆𝒅-𝑻𝒓𝒂𝒅𝒊𝒕𝒊𝒐𝒏𝒔.𝒐𝒓𝒈";let ts="en"!=s[0].language&&L(s);O=new M({props:{next:s[0].nextinfo,prev:s[0].previnfo}});let as=s[0].tagmatches&&s[0].tagmatches.length>1&&N(s);return{c(){t=a("meta"),d=l(),p=a("article"),w=a("h1"),z=r(_),A=l(),j=a("img"),T=l(),H=a("h5"),B=r("by "),C=r(ss),P=l(),R=a("div"),Y=l(),ts&&ts.c(),F=l(),J=a("br"),K=l(),E(O.$$.fragment),Q=l(),as&&as.c(),U=l(),W=a("img"),this.h()},l(s){const e=b('[data-svelte="svelte-72iiwn"]',document.head);t=c(e,"META",{"data-key":!0,name:!0,content:!0}),e.forEach(n),d=h(s),p=c(s,"ARTICLE",{id:!0});var a=i(p);w=c(a,"H1",{class:!0});var l=i(w);z=o(l,_),l.forEach(n),A=h(a),j=c(a,"IMG",{class:!0,src:!0,alt:!0}),T=h(a),H=c(a,"H5",{class:!0});var r=i(H);B=o(r,"by "),C=o(r,ss),r.forEach(n),P=h(a),R=c(a,"DIV",{class:!0}),i(R).forEach(n),Y=h(a),ts&&ts.l(a),a.forEach(n),F=h(s),J=c(s,"BR",{}),K=h(s),I(O.$$.fragment,s),Q=h(s),as&&as.l(s),U=h(s),W=c(s,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){f(t,"data-key","description"),f(t,"name","description"),f(t,"content",g=s[0].snip),f(w,"class","title svelte-1rkznfd"),f(j,"class","primary-image svelte-1rkznfd"),j.src!==(q="/articles/"+s[0].img)&&f(j,"src",q),f(j,"alt",G=s[0].author),f(H,"class","author svelte-1rkznfd"),f(R,"class","content svelte-1rkznfd"),f(p,"id",S=s[0].id),f(W,"class","hr svelte-1rkznfd"),W.src!==(X="/squiggle.svg")&&f(W,"src","/squiggle.svg"),f(W,"alt","hr")},m(s,e){m(document.head,t),v(s,d,e),v(s,p,e),m(p,w),m(w,z),m(p,A),m(p,j),m(p,T),m(p,H),m(H,B),m(H,C),m(p,P),m(p,R),R.innerHTML=es,m(p,Y),ts&&ts.m(p,null),v(s,F,e),v(s,J,e),v(s,K,e),$(O,s,e),v(s,Q,e),as&&as.m(s,e),v(s,U,e),v(s,W,e),Z=!0},p(s,[a]){(!Z||1&a)&&e!==(e=s[0].title+" by "+s[0].author+" | 𝑺𝒂𝒄𝒓𝒆𝒅-𝑻𝒓𝒂𝒅𝒊𝒕𝒊𝒐𝒏𝒔.𝒐𝒓𝒈")&&(document.title=e),(!Z||1&a&&g!==(g=s[0].snip))&&f(t,"content",g),(!Z||1&a)&&_!==(_=s[0].title+"")&&u(z,_),(!Z||1&a&&j.src!==(q="/articles/"+s[0].img))&&f(j,"src",q),(!Z||1&a&&G!==(G=s[0].author))&&f(j,"alt",G),(!Z||1&a)&&ss!==(ss=s[0].author+"")&&u(C,ss),(!Z||1&a)&&es!==(es=s[0].html+"")&&(R.innerHTML=es),"en"!=s[0].language?ts?ts.p(s,a):(ts=L(s),ts.c(),ts.m(p,null)):ts&&(ts.d(1),ts=null),(!Z||1&a&&S!==(S=s[0].id))&&f(p,"id",S);const l={};1&a&&(l.next=s[0].nextinfo),1&a&&(l.prev=s[0].previnfo),O.$set(l),s[0].tagmatches&&s[0].tagmatches.length>1?as?(as.p(s,a),1&a&&x(as,1)):(as=N(s),as.c(),x(as,1),as.m(U.parentNode,U)):as&&(k(),D(as,1,1,()=>{as=null}),y())},i(s){Z||(x(O.$$.fragment,s),x(as),Z=!0)},o(s){D(O.$$.fragment,s),D(as),Z=!1},d(s){n(t),s&&n(d),s&&n(p),ts&&ts.d(),s&&n(F),s&&n(J),s&&n(K),V(O,s),s&&n(Q),as&&as.d(s),s&&n(U),s&&n(W)}}}async function C({params:s,query:e}){const t=await this.fetch(`articles/${s.slug}.json`),a=await t.json();if(200===t.status)return{article:a};this.error(t.status,a.message)}function P(s,e,t){let{article:a}=e;return s.$$set=s=>{"article"in s&&t(0,a=s.article)},[a]}export default class extends s{constructor(s){super(),e(this,s,P,B,t,{article:0})}}export{C as preload};
