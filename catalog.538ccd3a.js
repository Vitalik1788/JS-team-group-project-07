var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},r=e.parcelRequired7c6;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var o={id:e,exports:{}};return t[e]=o,r.call(o.exports,o,o.exports),o.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){n[e]=t},e.parcelRequired7c6=r),r.register("8oZBs",(function(e,t){var n=r("h85Iw");r("7pPMD");const o=Math.floor(20*Math.random())+0;var s=r("2shzp").default;const a={heroDiv:document.getElementById("hero-div"),heroTitle:document.getElementById("hero-title"),heroOverview:document.getElementById("hero-overview"),heroBtnDiv:document.getElementById("hero-btn-div"),heroFilmDataEl:document.querySelector(".hero-info-wrap")};function i(e,t,n){a.heroDiv.style.backgroundImage=`linear-gradient(79.39deg, #111111 32.37%, rgba(17, 17, 17, 0) 42.02%), \n  url(${e})`,a.heroTitle.textContent=`${t}`,a.heroOverview.textContent=`${n}`}window.addEventListener("load",(function(){(async function(){try{return await s.get("https://api.themoviedb.org/3/trending/movie/day?api_key=58fde9f9a3392c3dbee86a1f2142354e")}catch(e){!function(e){a.heroDiv.classList.add("hero-container-bg");i("../images/default-bgimage.jpg","Let’s Make Your Own Cinema","Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience."),function(){const e=document.createElement("button");e.textContent="Get Started",e.classList.add("css-btn-trailer"),e.setAttribute("type","button"),a.heroBtnDiv.append(e)}()}()}})().then((({data:e})=>{console.log(e);const t=e.results[o],r=`"https://image.tmdb.org/t/p/original/${t.backdrop_path}"`,s=t.title,l=t.overview,c=t.id,d=t.vote_average;var u,m;i(r,s,l),function(e){const t=document.createElement("button");t.textContent="Watch Trailer",t.classList.add("css-btn-trailer","watch-trailer-button"),t.setAttribute("type","button"),t.setAttribute("trailer-id",`${e}`),a.heroBtnDiv.append(t);const n=document.createElement("button");n.textContent="More Details",n.classList.add("css-bnt-info"),n.setAttribute("type","button"),n.setAttribute("data-id",e),a.heroBtnDiv.append(n)}(c),u=c,m=d,a.heroFilmDataEl.dataset.id=u,a.heroFilmDataEl.dataset.rating=m,(0,n.default)({voteAverage:d,isHero:!0})}))}))})),r.register("h85Iw",(function(e,t){var n,r,o,s;n=e.exports,r="default",o=function(){return u},Object.defineProperty(n,r,{get:o,set:s,enumerable:!0,configurable:!0});const a=document.querySelector(".stars-container"),i=document.querySelector("#defs").lastElementChild,l=document.querySelector(".mask");let c=0;const d={filled:'<use href="#star" fill="url(#star-fill--complete)"></use>',masked:"",empty:'<use href="#star" fill="none"></use>'};function u({voteAverage:e,isHero:t}){const n=function(e){return!e||e<=0||e>10?0:Number((e/2).toFixed(1))}(Number(e));return d.masked=`<use href="#star" mask="url(#star-fill--partly${c})" fill="url(#star-fill--complete)"></use><use href="#star" fill="none" stroke="url(#star-stroke)"></use>`,function(e,t){const n=Math.floor(100*(Number.parseFloat(t)-Number.parseInt(t)));if(0===e)l.innerHTML=`\n\t\t<rect x="0" y="0" width="18" height="16" fill="white" />\n\t\t<rect x="${n}%" y="0" width="18" height="16" fill="black" />`;else{const t=`\n\t\t<mask id="star-fill--partly${e}" class="mask">\n\t\t\t<rect x="0" y="0" width="18" height="16" fill="white" />\n\t\t\t<rect x="${n}%" y="0" width="18" height="16" fill="black" />\n\t\t</mask>`;i.insertAdjacentHTML("beforebegin",t)}}(c,n),c++,function(e,t){if(!t)return m(e);a.insertAdjacentHTML("beforeend",m(e));const n={starsList:document.querySelector(".stars-list"),starsListImg:document.querySelectorAll(".stars-list__img")};a.classList.add("stars-container--hero"),n.starsList.classList.add("stars-list--hero"),n.starsListImg.forEach((e=>e.classList.add("stars-list__img--hero")))}(n,t)}function m(e){if(!e)return'<p class="stars-absent">Not rated yet</p>';const t=Number.parseInt(e),n=e-t==0?0:1,r=5-t-n,{filled:o,masked:s,empty:a}=d,i=function(e){return`<ul class="stars-list" aria-label="Rating: ${e} stars out of 5.0" title="Rating: ${e} stars out of 5.0">`}(e);return i+f(t,o)+f(n,s)+f(r,a)+"</ul>"}function f(e,t){let n="";for(let r=1;r<=e;r++)n+=`\n\t\t\t<li class="stars-list__item">\n\t\t\t\t<svg class="stars-list__img" viewBox="0 0 18 16">\n\t\t\t\t\t${t}\n\t\t\t\t</svg>\n\t\t\t</li>`;return n}})),r.register("7pPMD",(function(e,t){function n(e){fetch(`https://api.themoviedb.org/3/movie/${e}/videos?api_key=41b8f9437bf3f899281f8a3f9bdc0891&language=en-US`).then((e=>e.json())).then((e=>{const t=`https://www.youtube.com/embed/${e.results[0].key}?rel=0&amp;controls=1&amp;showinfo=0`,n=document.createElement("iframe");n.src=t,n.width="560",n.height="315",n.frameBorder="0",n.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",n.allowFullscreen="";const r=document.createElement("span");r.className="close-button",r.innerHTML='\n          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.5 10.5" width="10.5px" height="10.5px">\n            <path fill="#FFFFFF" d="M9.2,1.3L8.2,0.3L5.25,3.25L2.3,0.3L1.3,1.3L4.25,4.25L1.3,7.2L2.3,8.2L5.25,5.25L8.2,8.2L9.2,7.2L6.25,4.25z"/>\n          </svg>\n        ',r.addEventListener("click",(()=>{const e=document.getElementById("modal");document.querySelector(".modal-content").innerHTML="",e.style.display="none",n.src=""}));const o=document.querySelector(".modal-content");o.innerHTML="",o.appendChild(n),o.appendChild(r);document.getElementById("modal").style.display="block"})).catch((()=>{!function(){const e=document.querySelector(".modal-content");e.innerHTML='\n      <div class="error-content">\n        <p class="error-message">OOPS... <br>We are very sorry!<br>\n        But we couldn’t find the trailer.</p>\n        <img class="error-image" src=\'../images/IMG9881.jpeg\' alt="Error image">\n        <button class="close-button">\n          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.5 10.5" width="10.5px" height="10.5px">\n            <path fill="#FFFFFF" d="M9.2,1.3L8.2,0.3L5.25,3.25L2.3,0.3L1.3,1.3L4.25,4.25L1.3,7.2L2.3,8.2L5.25,5.25L8.2,8.2L9.2,7.2L6.25,4.25z"/>\n          </svg>\n        </button>\n      </div>\n    ';const t=document.getElementById("modal");t.style.display="block";const n=e.querySelector(".close-button");n.addEventListener("click",(()=>{t.style.display="none"})),n.classList.add("close-button");e.querySelector(".error-content").classList.add("error-content")}()}))}window.addEventListener("DOMContentLoaded",(()=>{const e=document.querySelector(".hero-btn-wrap"),t=document.querySelector(".close-button"),r=document.getElementById("modal");e.addEventListener("click",(function(e){const t=e.target.closest(".watch-trailer-button");if(t){n(t.getAttribute("trailer-id"))}})),document.addEventListener("keydown",(e=>"Escape"===e.key?r.style.display="none":null)),window.addEventListener("click",(e=>e.target===r?r.style.display="none":null)),t.addEventListener("click",(()=>{r.style.display="none"}))}))}));
//# sourceMappingURL=catalog.538ccd3a.js.map
