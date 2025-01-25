// ==UserScript==
// @name         Leave-debugger
// @namespace    https://github.com/SherryBX/Leave-debugger
// @version      v2.1.1
// @description  用于破解网页无限debugger
// @author       Sherry
// @match        *://*/*
// @include      *://*/*
// @run-at       document-start
// @license MIT
// @icon         https://mms0.baidu.com/it/u=2886239489,318124131&fm=253&app=138&f=JPEG?w=800&h=800
// ==/UserScript==

(function () {
    'use strict';

    // 输出启动标识
    console.log('%c Leave-debugger 已启动 🚀', 'color: #43bb88; font-size: 14px; font-weight: bold;');
    console.log('%c Version: v2.1.1 📦', 'color: #666; font-size: 12px;');

    // 用于记录每种hook的提示状态
    const hookNotified = {
        constructor: false,
        setInterval: false,
        setTimeout: false,
        eval: false
    };

    // Hook constructor
    (function () {
        const constructorCache = Function.prototype.constructor;
        Function.prototype.constructor = function (string) {
            if (string === "debugger") {
                if (!hookNotified.constructor) {
                    console.log("%c ⚡ Hook constructor debugger! 🛡️", "color: #43bb88");
                    hookNotified.constructor = true;
                }
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
                if (!hookNotified.setInterval) {
                    console.log("%c ⏰ Hook setInterval debugger! 🔄", "color: #43bb88");
                    hookNotified.setInterval = true;
                }
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
                if (!hookNotified.setTimeout) {
                    console.log("%c ⏱️ Hook setTimeout debugger! ⚔️", "color: #43bb88");
                    hookNotified.setTimeout = true;
                }
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
                if (!hookNotified.eval) {
                    console.log("%c 📝 Hook eval debugger! 🎯", "color: #43bb88");
                    hookNotified.eval = true;
                }
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
