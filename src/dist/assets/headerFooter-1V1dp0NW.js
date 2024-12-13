(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const c of e)if(c.type==="childList")for(const s of c.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const c={};return e.integrity&&(c.integrity=e.integrity),e.referrerPolicy&&(c.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?c.credentials="include":e.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(e){if(e.ep)return;e.ep=!0;const c=n(e);fetch(e.href,c)}})();async function l(o){try{const t=await fetch(o);if(!t.ok)throw new Error(`Failed to load template from ${o}`);return await t.text()}catch(t){console.error("Error loading template:",t)}}async function w(){try{const o=await fetch("../data/products.json");if(!o.ok)throw new Error("Failed to fetch products data");return await o.json()}catch(o){console.error("Error fetching products data:",o)}}function d(o,t,n,r){t?t.insertAdjacentHTML("afterbegin",o(n)):console.error(`Element not found for selector: ${t}`)}function i(o){return o.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")}function m(o,t){const n=Array.from({length:o.length+1},(r,e)=>Array(t.length+1).fill(e));for(let r=1;r<=t.length;r++)n[0][r]=r;for(let r=1;r<=o.length;r++)for(let e=1;e<=t.length;e++){const c=o[r-1]===t[e-1]?0:1;n[r][e]=Math.min(n[r-1][e]+1,n[r][e-1]+1,n[r-1][e-1]+c)}return n[o.length][t.length]}async function y(o,t="../data/products.json"){try{const n=await fetch(t);if(!n.ok)throw new Error("Error al cargar el archivo JSON");const r=await n.json(),e=i(o),c=r.filter(s=>{const a=i(s.name),u=i(s.category),f=a.includes(e)||u.includes(e),h=m(e,a)<=2;return f||h});return c.length>0?c:null}catch(n){throw console.error("Error al buscar productos:",n),n}}async function p(){const o=document.querySelector(".logo"),t=document.querySelector("#search"),n=document.querySelector(".absolute-search"),r=document.querySelector(".user"),e=document.querySelector(".cart i");o&&o.addEventListener("click",()=>{window.location.href="index.html"}),t?t.addEventListener("keydown",async function(c){if(c.key==="Enter"){const s=c.target.value;try{const a=await y(s);a?(localStorage.setItem("searchResults",JSON.stringify(a)),window.location.href="search.html"):window.location.href="search.html?results=not_found"}catch{alert("There was a problem with the search. Please try again.")}}}):console.error("Search input element not found"),n&&n.addEventListener("click",()=>{t.value.trim()!==""&&t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter"}))}),r&&r.addEventListener("click",()=>{window.location.href="product-details.html"}),e&&e.addEventListener("click",()=>{window.location.href="#"})}async function g(){const o=await l("../components/header.html"),t=await l("../components/footer.html"),n=document.getElementById("main-header"),r=document.getElementById("main-footer");n?d(()=>o,n):console.error("Header element not found"),r?d(()=>t,r):console.error("Footer element not found"),await p()}export{w as f,g as l};
