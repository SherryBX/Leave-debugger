// ==UserScript==
// @name         Leave-debugger
// @namespace    https://github.com/SherryBX/Leave-debugger
// @version      v2.0.0
// @description  用于破解网页无限debugger
// @author       Sherry
// @match        *://*/*
// @include      *://*/*
// @run-at       document-start
// @license MIT
// ==/UserScript==

(function () {
    'use strict';

    // 输出启动标识
    console.log('%c Leave-debugger 已启动 🚀', 'color: #43bb88; font-size: 14px; font-weight: bold;');
    console.log('%c Version: v2.0.0 📦', 'color: #666; font-size: 12px;');

    // Hook constructor
    (function () {
        const constructorCache = Function.prototype.constructor;
        Function.prototype.constructor = function (string) {
            if (string === "debugger") {
                console.log("%c Hook constructor debugger!", "color: #43bb88");
                return function () { };
            }
            return constructorCache(string);
        };
    })();

    // Hook setInterval
    (function () {
        const setIntervalCache = setInterval;
        window.setInterval = function (func, delay) {
            if (func.toString().indexOf("debugger") !== -1) {
                console.log("%c Hook setInterval debugger!", "color: #43bb88");
                return function () { };
            }
            return setIntervalCache(func, delay);
        };
    })();

    // Hook setTimeout
    (function () {
        const setTimeoutCache = setTimeout;
        window.setTimeout = function (func, delay) {
            if (func.toString().indexOf("debugger") !== -1) {
                console.log("%c Hook setTimeout debugger!", "color: #43bb88");
                return function () { };
            }
            return setTimeoutCache(func, delay);
        };
    })();

    // Hook eval
    (function () {
        const evalCache = window.eval;
        window.eval = function (string) {
            if (string.includes("debugger")) {
                console.log("%c Hook eval debugger!", "color: #43bb88");
            }
            return evalCache(string.replace(/debugger\s*;?/g, ""));
        };
        window.eval.toString = function () {
            return evalCache.toString();
        };
    })();

    // 使用 window.addEventListener 来捕获错误
    window.addEventListener('error', function (event) {
        // 检查错误信息
        if (event.error && event.error.message && (
            event.error.message.includes("Cannot read properties of undefined (reading 'contains')") ||
            event.error.message.includes("Cannot set property error of [object Object]")
        )) {
            event.preventDefault(); // 阻止错误继续传播
            return false;
        }
    }, true);
})();
