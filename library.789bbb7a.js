!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},l=e.parcelRequired7c6;null==l&&((l=function(e){if(e in n)return n[e].exports;if(e in t){var l=t[e];delete t[e];var r={id:e,exports:{}};return n[e]=r,l.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){t[e]=n},e.parcelRequired7c6=l),l.register("kFnCB",(function(e,n){var t=document.getElementById("menu"),l=document.querySelector("nav"),r=document.getElementById("overlay"),i=document.querySelector("body");t.addEventListener("click",(function(){l.style.left="0",r.style.display="block",i.style.overflow="hidden"})),r.addEventListener("click",(function(){l.style.left="-64%",r.style.display="none",i.style.overflow="auto"}));var o=document.querySelector(".switcher"),s="true"===localStorage.getItem("isLight");document.body.classList.toggle("light",s),o.onclick=function(){s=!s,document.body.classList.toggle("light",s),localStorage.setItem("isLight",s)};var c=window.location.href,a=document.querySelectorAll(".mobile-menu__link, .header__nav-link");if(a[0].classList.add("current__nav-link"),a[3].classList.add("current__nav-link"),!c.includes("index"))return c.includes("catalog")?(a[0].classList.remove("current__nav-link"),a[3].classList.remove("current__nav-link"),a[1].classList.add("current__nav-link"),void a[4].classList.add("current__nav-link")):c.includes("library")?(a[0].classList.remove("current__nav-link"),a[3].classList.remove("current__nav-link"),a[1].classList.remove("current__nav-link"),a[4].classList.remove("current__nav-link"),a[2].classList.add("current__nav-link"),void a[5].classList.add("current__nav-link")):void 0})),l("kFnCB")}();
//# sourceMappingURL=library.789bbb7a.js.map
