!function(){function t(t){return t&&t.__esModule?t.default:t}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},i=e.parcelRequired7c6;null==i&&((i=function(t){if(t in n)return n[t].exports;if(t in r){var e=r[t];delete r[t];var i={id:t,exports:{}};return n[t]=i,e.call(i.exports,i,i.exports),i.exports}var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}).register=function(t,e){r[t]=e},e.parcelRequired7c6=i),i.register("kFnCB",(function(t,e){var n=document.getElementById("menu"),r=document.querySelector("nav"),i=document.getElementById("overlay"),c=document.querySelector("body");n.addEventListener("click",(function(){r.style.left="0",i.style.display="block",c.style.overflow="hidden"})),i.addEventListener("click",(function(){r.style.left="-64%",i.style.display="none",c.style.overflow="auto"}));var a=document.querySelector(".switcher"),o="true"===localStorage.getItem("isLight");document.body.classList.toggle("light",o),a.onclick=function(){o=!o,document.body.classList.toggle("light",o),localStorage.setItem("isLight",o)};var s=window.location.href,l=document.querySelectorAll(".mobile-menu__link, .header__nav-link");if(l[0].classList.add("current__nav-link"),l[3].classList.add("current__nav-link"),!s.includes("index"))return s.includes("catalog")?(l[0].classList.remove("current__nav-link"),l[3].classList.remove("current__nav-link"),l[1].classList.add("current__nav-link"),void l[4].classList.add("current__nav-link")):s.includes("library")?(l[0].classList.remove("current__nav-link"),l[3].classList.remove("current__nav-link"),l[1].classList.remove("current__nav-link"),l[4].classList.remove("current__nav-link"),l[2].classList.add("current__nav-link"),void l[5].classList.add("current__nav-link")):void 0})),i("2j4vU"),i("kFnCB"),i("60y4I");var c=i("bpxeT"),a=i("2TvXO"),o=i("dIxxU");c=i("bpxeT"),a=i("2TvXO"),c=i("bpxeT"),a=i("2TvXO"),o=i("dIxxU");function s(){return(s=t(c)(t(a).mark((function e(){var n;return t(a).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,o.default.get("https://api.themoviedb.org/3/genre/movie/list?api_key=41b8f9437bf3f899281f8a3f9bdc0891");case 3:return n=t.sent,localStorage.setItem("genres",JSON.stringify(n.data.genres)),t.abrupt("return",n);case 8:t.prev=8,t.t0=t.catch(0),v(t.t0);case 11:case"end":return t.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function l(t,e){return u.apply(this,arguments)}function u(){return(u=t(c)(t(a).mark((function e(n,r){var i,c,o;return t(a).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,i=Array.from(r),c=n.map((function(t){var e=i.find((function(e){return e.id===t}));return e?e.name:""})),o="",o=c.length>2?c.slice(0,2).join(", ")+" and other":c.join(", "),console.log(o),t.abrupt("return",o);case 9:return t.prev=9,t.t0=t.catch(0),v(t.t0),t.abrupt("return","");case 13:case"end":return t.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}var d=i("2j4vU");function p(e){var n,r=e.map((n=t(c)(t(a).mark((function e(n){var r,i,c,o,s,u,p,f,v,m;return t(a).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=n.id,i=n.poster_path,c=n.release_date,o=n.title,s=n.genre_ids,u=n.vote_average,p=l(s,JSON.parse(localStorage.getItem("genres"))),f="https://image.tmdb.org/t/p/original/".concat(i),v="",v="undefind"===c?"Date unknown":c.split("-")[0],t.next=7,p;case 7:return m=t.sent,t.abrupt("return",'<li class="card-item item" data-id="'.concat(r,'">\n            <img class="film-poster" src="https://image.tmdb.org/t/p/original/').concat(f,'" alt="').concat(o,' poster" />\n            <div class="overlay">\n              <div class="film-info">\n                <p class="film-title">').concat(o,'</p>\n                <div class="film-details">\n                  <span class="film-description">').concat(m," | ").concat(v,'</span>\n                  <div class="stars-container">').concat((0,d.default)({voteAverage:u,isHero:!1}),'</div>\n\t\t\t\t\t\t\t\t\t<span class="film-rating">').concat(u,"</span>;\n                </div>\n              </div>\n            </div>\n          </li>"));case 9:case"end":return t.stop()}}),e)}))),function(t){return n.apply(this,arguments)}));return Promise.all(r).then((function(t){var e=t.join("");document.querySelector(".cards-list").insertAdjacentHTML("beforeend",e)}))}document.querySelector(".cards-list");function f(){return(f=t(c)(t(a).mark((function e(){var n;return t(a).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,o.default.get("https://api.themoviedb.org/3/trending/all/week?api_key=41b8f9437bf3f899281f8a3f9bdc0891");case 3:return n=t.sent,t.abrupt("return",n);case 7:t.prev=7,t.t0=t.catch(0),v(t.t0);case 10:case"end":return t.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}function v(t){console.log(" error  ".concat(t))}!function(){s.apply(this,arguments)}();c=i("bpxeT"),a=i("2TvXO"),o=i("dIxxU");var m,g=i("l5bVx"),h=/^\s+|\s+$/g,y=/^[-+]0x[0-9a-f]+$/i,_=/^0b[01]+$/i,b=/^0o[0-7]+$/i,w=parseInt,x="object"==typeof e&&e&&e.Object===Object&&e,k="object"==typeof self&&self&&self.Object===Object&&self,L=x||k||Function("return this")(),T=Object.prototype.toString,j=Math.max,O=Math.min,I=function(){return L.Date.now()};function S(e){var n=void 0===e?"undefined":t(g)(e);return!!e&&("object"==n||"function"==n)}function N(e){if("number"==typeof e)return e;if(function(e){return"symbol"==(void 0===e?"undefined":t(g)(e))||function(t){return!!t&&"object"==typeof t}(e)&&"[object Symbol]"==T.call(e)}(e))return NaN;if(S(e)){var n="function"==typeof e.valueOf?e.valueOf():e;e=S(n)?n+"":n}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(h,"");var r=_.test(e);return r||b.test(e)?w(e.slice(2),r?2:8):y.test(e)?NaN:+e}m=function(t,e,n){var r,i,c,a,o,s,l=0,u=!1,d=!1,p=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function f(e){var n=r,c=i;return r=i=void 0,l=e,a=t.apply(c,n)}function v(t){return l=t,o=setTimeout(g,e),u?f(t):a}function m(t){var n=t-s;return void 0===s||n>=e||n<0||d&&t-l>=c}function g(){var t=I();if(m(t))return h(t);o=setTimeout(g,function(t){var n=e-(t-s);return d?O(n,c-(t-l)):n}(t))}function h(t){return o=void 0,p&&r?f(t):(r=i=void 0,a)}function y(){var t=I(),n=m(t);if(r=arguments,i=this,s=t,n){if(void 0===o)return v(s);if(d)return o=setTimeout(g,e),f(s)}return void 0===o&&(o=setTimeout(g,e)),a}return e=N(e)||0,S(n)&&(u=!!n.leading,c=(d="maxWait"in n)?j(N(n.maxWait)||0,e):c,p="trailing"in n?!!n.trailing:p),y.cancel=function(){void 0!==o&&clearTimeout(o),l=0,r=s=i=o=void 0},y.flush=function(){return void 0===o?a:h(I())},y};function M(t){var e,n,r=t.backdrop_path,i=t.poster_path,c=t.title,a=t.release_date,o=t.popularity,s=t.vote_count,l=t.vote_average,u=(t.genre_ids,t.overview),d=a.replaceAll("-","."),p=(e=o,Math.floor(10*e)/10),f=window.screen.width<768?i:r,v=(n=["comedy","action","thriller"]).length>2?"".concat(n.slice(0,2).join(", "),", ..."):"".concat(n.join(", "));document.createDocumentFragment(),document.querySelector(".upcoming-card"),document.styleSheets[document.styleSheets.length-1].cssRules[0];return"\n        <div class='upcoming-card__figure'>\n          <div class='upcoming-card__layout'></div>\n          <img\n            src=\"https://image.tmdb.org/t/p/original".concat(f,'"\n            alt="').concat(c,"\"\n            loading='lazy'\n            class='upcoming-card__img'\n          > \n          </div>\n        </div>\n\n          <div class='upcoming-card__body'>\n            <h3 class=\"upcoming-card__title\">").concat(c,'</h3>\n\n            <div class=\'metrics-list__main-container\'>\n                <ul class="list metrics-list">\n                  <li class="metrics-list__item">\n                    <p class="metrics-text">Release date</p>\n                    <p class="metrics-text metrics-text--date">').concat(d,'</p>\n                  </li>\n                  <li class="metrics-list__item">\n                    <p class="metrics-text">Vote / Votes</p>\n                    <p class="metrics-text metrics-text--vote">\n                      <span class="vote-wrapper">').concat(l,'</span>\n                      /\n                      <span class="vote-wrapper">').concat(s,'</span>\n                    </p>\n                  </li>\n                  <li class="metrics-list__item">\n                    <p class="metrics-text">Popularity</p>\n                    <p class="metrics-text">').concat(p,'</p>\n                  </li>\n                  <li class="metrics-list__item">\n                    <p class="metrics-text">Genre</p>\n                    <p class="metrics-text">\n                      ').concat(v,'\n                    </p>\n                  </li>\n                </ul>\n            </div>\n            <h4 class="upcoming-card__subtitle metrics-text">ABOUT</h4>\n              <p class="upcoming-card__text" >\n              ').concat(u,'\n              </p>\n            <button class="btn" type="button">Add to my library</button>\n          </div>')}var q=document.querySelector(".upcoming-card");function E(){return(E=t(c)(t(a).mark((function e(){var n,r,i;return t(a).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,z();case 3:n=e.sent,r=J(n),console.log(r),D(M(r)),i=t(m)((function(){return U(r)}),200),window.addEventListener("resize",i),e.next=17;break;case 12:e.prev=12,e.t0=e.catch(0),console.log("error:",e.t0),console.log("error code:",e.t0.code);case 17:case"end":return e.stop()}}),e,null,[[0,12]])})))).apply(this,arguments)}function U(t){var e=t.poster_path,n=t.backdrop_path,r=(t.title,window.matchMedia("(max-width: 767px)"),document.querySelector(".upcoming-card__img"));if(!r)return console.log("no upcoming section");var i="https://image.tmdb.org/t/p/original".concat(e),c="https://image.tmdb.org/t/p/original".concat(n);return window.screen.width<768&&r.src!==i?r.src=i:window.screen.width>=768&&r.src!==c?r.src=c:void 0}function J(t){return t[Math.floor(Math.random()*t.length)]}function D(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";q.innerHTML=t}window.addEventListener("DOMContentLoaded",(function(){return E.apply(this,arguments)}));var A=o.default.create({baseURL:"https://api.themoviedb.org/3/movie/upcoming",headers:{Authorization:"Bearer ".concat("eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmODU0Y2RkODdhYTkwNTNjYTAwMjI5ZmVhNzNlNTkyNSIsInN1YiI6IjYxODZmYWFkZmU2MzE4MDA2NDgzZTdkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vm-UaTyMPJ2HhXiSRvz-VpPqqqKEF-3PBdhfYlg5v3g")}});function z(){return B.apply(this,arguments)}function B(){return(B=t(c)(t(a).mark((function e(){var n;return t(a).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,A.get();case 2:return n=t.sent,t.abrupt("return",n.data.results);case 4:case"end":return t.stop()}}),e)})))).apply(this,arguments)}window.addEventListener("load",(function(){var t=window.innerWidth<768?1:3;(function(){return f.apply(this,arguments)})().then((function(e){var n=e.data;p(n.results.slice(0,t)).then((function(){console.log(n)}))}))}))}();
//# sourceMappingURL=index.166f9825.js.map
