!function(o){var e={};function n(t){if(e[t])return e[t].exports;var c=e[t]={i:t,l:!1,exports:{}};return o[t].call(c.exports,c,c.exports,n),c.l=!0,c.exports}n.m=o,n.c=e,n.d=function(o,e,t){n.o(o,e)||Object.defineProperty(o,e,{enumerable:!0,get:t})},n.r=function(o){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})},n.t=function(o,e){if(1&e&&(o=n(o)),8&e)return o;if(4&e&&"object"==typeof o&&o&&o.__esModule)return o;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:o}),2&e&&"string"!=typeof o)for(var c in o)n.d(t,c,function(e){return o[e]}.bind(null,c));return t},n.n=function(o){var e=o&&o.__esModule?function(){return o.default}:function(){return o};return n.d(e,"a",e),e},n.o=function(o,e){return Object.prototype.hasOwnProperty.call(o,e)},n.p="",n(n.s=0)}([function(o,e){!function(){if(console.log("socket.io livereload loaded."),window.location===top.location){var o=function(o){var e=document.querySelector(".socket-io-livereload-helper");if(!e){(e=document.createElement("div")).className="socket-io-livereload-helper";"top: 0px; right: 0px; padding: 5px 5px; background-color: rgba(255,255,255,0.8);",e.style.cssText="pointer-events: none; position: absolute; z-index: 99998;top: 0px; right: 0px; padding: 5px 5px; background-color: rgba(255,255,255,0.8);",document.body.appendChild(e)}o?(console.log(o),e.innerHTML=o,e.style.display="block"):e.style.display="none"},e=document.createElement("script");e.src="socket.io.js",e.onload=function(){!function(){if(window.io){var e=window.io.connect("/"),n=!1,t=!1,c=0,r=function(){e.close(),window.location.reload()};e.on("data",(function(e){n&&(o(e.message),"reload"===e.action&&r())})),e.on("connect",(function(e){console.log("Socket Connected"),n&&t&&(o("Reloading for socket reconnected ..."),r()),n=!0,t=!1,c=0})),e.on("connect_error",(function(o){console.log("Socket Connect error"),t=!0})),e.on("connect_timeout",(function(o){console.log("Socket Connect timeout")})),e.on("reconnecting",(function(o){c+=1,console.log("Socket Reconnecting ... "+c),c>20&&(e.close(),console.log("Socket closed after retry "+c+" times."))})),e.on("reconnect_error",(function(o){console.log("Socket Reconnect error"),t=!0})),e.on("reconnect_failed",(function(o){console.log("Socket Reconnect failed"),t=!0}))}else console.log()}()},e.onerror=function(){console.log("Failed to load: socket.io.js")},document.body.appendChild(e)}else console.log("disabled livereload in frame.")}()}]);