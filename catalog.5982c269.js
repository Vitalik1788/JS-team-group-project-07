function e(e,t,n,a){Object.defineProperty(e,t,{get:n,set:a,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a={},r={},i=n.parcelRequired7c6;null==i&&((i=function(e){if(e in a)return a[e].exports;if(e in r){var t=r[e];delete r[e];var n={id:e,exports:{}};return a[e]=n,t.call(n.exports,n,n.exports),n.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){r[e]=t},n.parcelRequired7c6=i),i.register("kyEFX",(function(t,n){var a,r;e(t.exports,"register",(function(){return a}),(function(e){return a=e})),e(t.exports,"resolve",(function(){return r}),(function(e){return r=e}));var i={};a=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)i[t[n]]=e[t[n]]},r=function(e){var t=i[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),i("kyEFX").register(JSON.parse('{"9NLH0":"catalog.5982c269.js","bfHyM":"default.183d728c.jpg","clsB6":"catalog.879308b0.js","1V5gE":"catalog.9cfc0aaa.js"}')),i("g3iFJ"),i("8oZBs");const o={searchForm:document.getElementById("movieSearchForm"),searchInput:document.getElementById("movieInput"),catalogList:document.getElementById("movieList"),errorContainer:document.querySelector(".error-container"),searchBtn:document.querySelector(".search-button"),cancelBtn:document.querySelector(".cancel-button"),paginationContainer:document.querySelector(".pagination-wrapper"),paginationButton:document.querySelector(".pagination-button"),nextPageBtn:document.querySelector(".next-button"),prevPageBtn:document.querySelector(".prev-button")};class s{static BASE_URL="https://api.themoviedb.org/3";static API_KEY="41b8f9437bf3f899281f8a3f9bdc0891";constructor(){this.searchQuery="",this.page=1,this.totalAmount=0}async getMovies(){const e={method:"GET",headers:{accept:"application/json",Authorization:`Bearer ${s.API_KEY}`}};let t="";t=this.searchQuery?`${s.BASE_URL}/search/movie?api_key=${s.API_KEY}&query=${this.searchQuery}&include_adult=false&language=en-US&page=${this.page}`:`${s.BASE_URL}/trending/all/week?api_key=${s.API_KEY}&language=en-US&page=${this.page}`;try{const n=await fetch(t,e);return await n.json()}catch(e){throw console.error(e),e}}incrementPage(){this.page+=1}decrementPage(){this.page-=1}resetPage(){this.page=1}get query(){return this.searchQuery}set query(e){this.searchQuery=e}get total(){return this.totalAmount}set total(e){this.totalAmount=e}resetTotal(){this.totalAmount=0}}let c=!1;const l=()=>{if(c)return;const e=document.createElement("div");e.innerHTML='<p class="error-information">OOPS...</p>\n  <p class="error-information">We are very sorry!</p>\n  <p class="error-information">\n    We don’t have any results matching your search.\n  </p>',o.errorContainer.appendChild(e),o.errorContainer.classList.remove("is-hidden"),o.paginationContainer.classList.add("is-hidden"),c=!0};var d;d=new URL(i("kyEFX").resolve("bfHyM"),import.meta.url).toString();var u=i("h85Iw"),g=i("6t6rc"),p=i("62bSP");async function f(e){const n=JSON.parse(localStorage.getItem("genres")),a=e.results.map((async e=>{const a=e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:`${t(d)}`,r=(0,g.validateGenres)(e.genre_ids,n),i=await r;return`<li class="card-item" data-id="${e.id}">\n        <img class="film-poster" src="${a}" alt="${e.original_title||e.name}" />\n        <div class="overlay">\n          <div class="film-info">\n            <p class="film-title">${e.original_title||e.name}</p>\n            <div class="film-details">\n              <span class="film-description">${i} | ${new Date(e.release_date).getFullYear()||new Date(e.first_air_date).getFullYear()}</span>\n    <div class="stars-container">${(0,u.default)({voteAverage:e.vote_average,isHero:!1})}</div>            \n      \x3c!-- <span class="film-rating">${e.vote_average.toFixed(1)}</span> --\x3e\n            </div>\n          </div>\n        </div>\n      </li>`})),r=await Promise.all(a);o.catalogList.innerHTML=r.join("");document.querySelector(".listListener").addEventListener("click",(e=>{const t=e.target.closest(".card-item").getAttribute("data-id");(0,p.openModalAboutFilm)(t)}))}const h=new s;let m=1;function v(e){h.getMovies(e).then(y).catch(_)}function y(e){var t;f(e),o.paginationButton.textContent=m,t=e.total_pages,m===t?o.nextPageBtn.setAttribute("disabled","disabled"):o.nextPageBtn.removeAttribute("disabled")}function _(e){o.catalogList.innerHTML="",l(),console.error("An error occurred:",e)}o.searchForm.addEventListener("submit",(function(e){e.preventDefault(),o.paginationContainer.classList.remove("is-hidden"),o.errorContainer.classList.add("is-hidden");const t=o.searchInput.value.trim();h.query=t,h.resetPage(),h.resetTotal(),""===t?(o.catalogList.innerHTML="",l()):async function(){try{const e=await h.getMovies();0===e.total_results?(o.catalogList.innerHTML="",l()):(h.total=e.total_results,f(e),m=e.page,o.paginationButton.textContent=m),o.searchInput.value=""}catch(e){_(e)}}()})),o.cancelBtn.addEventListener("click",(function(){o.cancelBtn.classList.add("is-hidden"),o.searchInput.value=""})),o.searchInput.addEventListener("input",(function(e){e.currentTarget.value.trim()?o.cancelBtn.classList.remove("is-hidden"):o.cancelBtn.classList.add("is-hidden")})),o.nextPageBtn.addEventListener("click",(function(){m+=1,h.incrementPage(),v(m)})),o.prevPageBtn.addEventListener("click",(function(){m>1&&(m-=1,h.decrementPage(),v(m))})),o.errorContainer.classList.add("is-hidden"),o.cancelBtn.classList.add("is-hidden"),v(m),i("7pPMD");
//# sourceMappingURL=catalog.5982c269.js.map
