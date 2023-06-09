var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var r={id:e,exports:{}};return t[e]=r,o.call(r.exports,r,r.exports),r.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){n[e]=t},e.parcelRequired7c6=o),o.register("6q4Ta",(function(e,t){var n=o("7DS8N");o("4E5Dt");const r=Math.floor(20*Math.random())+0;var a=o("2shzp").default;const i={heroDiv:document.getElementById("hero-div"),heroTitle:document.getElementById("hero-title"),heroOverview:document.getElementById("hero-overview"),heroBtnDiv:document.getElementById("hero-btn-div"),heroFilmDataEl:document.querySelector(".hero-info-wrap")};function c(e,t,n){i.heroDiv.style.backgroundImage=`linear-gradient(79.39deg, #111111 32.37%, rgba(17, 17, 17, 0) 72.02%), \n  url(${e})`,i.heroTitle.textContent=`${t}`,i.heroOverview.textContent=`${n}`}window.addEventListener("load",(function(){(async function(){try{return await a.get("https://api.themoviedb.org/3/trending/movie/day?api_key=58fde9f9a3392c3dbee86a1f2142354e")}catch(e){!function(e){i.heroDiv.classList.add("hero-container-bg");c("../images/default-bgimage.jpg","Let’s Make Your Own Cinema","Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience."),function(){const e=document.createElement("button");e.textContent="Get Started",e.classList.add("css-btn-trailer"),e.setAttribute("type","button"),i.heroBtnDiv.append(e)}()}()}})().then((({data:e})=>{const t=e.results[r],o=`"https://image.tmdb.org/t/p/original/${t.backdrop_path}"`,a=t.title,d=t.overview,l=t.id,s=t.vote_average;var u,m;c(o,a,d),function(e){const t=document.createElement("button");t.textContent="Watch Trailer",t.classList.add("css-btn-trailer","watch-trailer-button"),t.setAttribute("type","button"),t.setAttribute("trailer-id",`${e}`),i.heroBtnDiv.append(t);const n=document.createElement("button");n.textContent="More Details",n.classList.add("css-bnt-info"),n.setAttribute("type","button"),n.setAttribute("data-id",e),i.heroBtnDiv.append(n)}(l),u=l,m=s,i.heroFilmDataEl.dataset.id=u,i.heroFilmDataEl.dataset.rating=m,(0,n.default)({voteAverage:s,isHero:!0})}))}))})),o.register("4E5Dt",(function(e,t){const n=defaultImgTr;let o=!1;function r(e){fetch(`https://api.themoviedb.org/3/movie/${e}/videos?api_key=41b8f9437bf3f899281f8a3f9bdc0891&language=en-US`).then((e=>e.json())).then((e=>{const t=`https://www.youtube.com/embed/${e.results[0].key}?rel=0&amp;controls=1&amp;showinfo=0`,n=document.createElement("iframe");n.src=t,n.width="560",n.height="315",n.frameBorder="0",n.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",n.allowFullscreen="";const o=document.createElement("span");o.className="close-button",o.innerHTML='\n          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.5 10.5" width="10.5px" height="10.5px">\n            <path fill="#FFFFFF" d="M9.2,1.3L8.2,0.3L5.25,3.25L2.3,0.3L1.3,1.3L4.25,4.25L1.3,7.2L2.3,8.2L5.25,5.25L8.2,8.2L9.2,7.2L6.25,4.25z"/>\n          </svg>\n        ',o.addEventListener("click",(()=>{i()}));const r=document.querySelector(".modal-content");r.innerHTML="",r.appendChild(n),r.appendChild(o);document.getElementById("modal");a()})).catch((()=>{!function(){const e=document.querySelector(".modal-content");e.innerHTML=`\n      <div class="error-content">\n        <p class="error-message">OOPS... <br>We are very sorry!<br>\n        But we couldn’t find the trailer.</p>\n         <img class="error-image" src='${n}' alt="Error!">\n        <button class="close-button">\n          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.5 10.5" width="10.5px" height="10.5px">\n            <path fill="#FFFFFF" d="M9.2,1.3L8.2,0.3L5.25,3.25L2.3,0.3L1.3,1.3L4.25,4.25L1.3,7.2L2.3,8.2L5.25,5.25L8.2,8.2L9.2,7.2L6.25,4.25z"/>\n          </svg>\n        </button>\n      </div>\n    `,a();const t=e.querySelector(".close-button");t.addEventListener("click",(()=>{i()})),t.classList.add("close-button");e.querySelector(".error-content").classList.add("error-content")}()}))}function a(){document.getElementById("modal").style.display="block",document.body.style.overflow="hidden",o=!0}function i(){const e=document.getElementById("modal");document.querySelector(".modal-content").innerHTML="",e.style.display="none",document.body.style.overflow="auto",o=!1}window.addEventListener("DOMContentLoaded",(()=>{const e=document.querySelector(".hero-btn-wrap"),t=document.querySelector(".close-button"),n=document.getElementById("modal");e.addEventListener("click",(function(e){const t=e.target.closest(".watch-trailer-button");if(t){r(t.getAttribute("trailer-id"))}})),document.addEventListener("keydown",(e=>{"Escape"===e.key&&o&&i()})),window.addEventListener("click",(e=>{e.target===n&&o&&i()})),t.addEventListener("click",(()=>{i()}))}))})),o.register("haKcb",(function(e,t){var n=o("a3ItO"),r=o("3ycwV");window.addEventListener("click",(e=>{const t=document.querySelector(".css-bnt-info"),o=(document.querySelector(".watch-trailer-button"),document.querySelector(".btn")),a=e.target.dataset.id;switch(e.target){case t:(0,n.openModalAboutFilm)(a);break;case o:(0,r.handleFilm)(e)}}))}));
//# sourceMappingURL=index.bd78865f.js.map
