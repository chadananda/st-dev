import{S as s,i as l,s as e,e as a,a as t,b as i,f as r,c as n,d as c,h as u,k as d,l as p,u as o,C as $,r as h,v as m,p as f,Y as v}from"./client.f661b37e.js";function b(s){let l,e;return{c(){e=$(),this.h()},l(s){e=$(),this.h()},h(){l=new v(e)},m(a,t){l.m(s[0],a,t),d(a,e,t)},p(s,e){1&e&&l.p(s[0])},d(s){s&&c(e),s&&l.d()}}}function g(s){let l,e,v=s[1]&&function(s){let l,e,$;const v=s[4].default,g=f(v,s,s[3],null);let y=s[0]&&b(s);return{c(){l=a("div"),g&&g.c(),e=t(),y&&y.c(),this.h()},l(s){l=i(s,"DIV",{id:!0,class:!0});var a=r(l);g&&g.l(a),e=n(a),y&&y.l(a),a.forEach(c),this.h()},h(){u(l,"id","debug"),u(l,"class","svelte-y31xmj")},m(s,a){d(s,l,a),g&&g.m(l,null),p(l,e),y&&y.m(l,null),$=!0},p(s,e){g&&g.p&&8&e&&o(g,v,s,s[3],e,null,null),s[0]?y?y.p(s,e):(y=b(s),y.c(),y.m(l,null)):y&&(y.d(1),y=null)},i(s){$||(h(g,s),$=!0)},o(s){m(g,s),$=!1},d(s){s&&c(l),g&&g.d(s),y&&y.d()}}}(s);return{c(){v&&v.c(),l=$()},l(s){v&&v.l(s),l=$()},m(s,a){v&&v.m(s,a),d(s,l,a),e=!0},p(s,[l]){s[1]&&v.p(s,l)},i(s){e||(h(v),e=!0)},o(s){m(v),e=!1},d(s){v&&v.d(s),s&&c(l)}}}function y(s,l,e){let a,{$$slots:t={},$$scope:i}=l,{variable:r}=l;return s.$$set=s=>{"variable"in s&&e(2,r=s.variable),"$$scope"in s&&e(3,i=s.$$scope)},s.$$.update=()=>{4&s.$$.dirty&&e(0,a=JSON.stringify(r).replace(/</g,"&lt;").replace(/\{/g,'<div style="margin-left:1em;">$&').replace(/\},?/g,"$&</div>").replace(/,(["\[\{<])/g,",<br>$1"))},[a,!1,r,i,t]}class x extends s{constructor(s){super(),l(this,s,y,g,e,{variable:2})}}export{x as D};
