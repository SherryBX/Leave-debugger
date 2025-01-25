// ==UserScript==
// @name         Leave-debugger
// @namespace    https://github.com/SherryBX/Leave-debugger
// @version      v1.0.0
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
    console.log('%c Version: v1.0.0 📦', 'color: #666; font-size: 12px;');

    // 保存原始的console.error
    const originalError = console.error;
    const originalWarn = console.warn;

    // 过滤掉特定错误信息
    console.error = function (...args) {
        if (args[0] && typeof args[0] === 'string') {
            if (args[0].includes("Cannot read properties of undefined (reading 'contains')")) {
                return; // 忽略这类错误
            }
        }
        originalError.apply(console, args);
    };

    console.warn = function (...args) {
        if (args[0] && typeof args[0] === 'string') {
            if (args[0].includes("Cannot read properties of undefined")) {
                return; // 忽略这类警告
            }
        }
        originalWarn.apply(console, args);
    };

    // 保存原始的Function构造器
    const originalFunction = Function;

    // 创建一个新的Function构造器
    function NewFunction(...args) {
        const lastArg = args[args.length - 1];
        if (typeof lastArg === 'string') {
            // 替换所有的debugger语句
            args[args.length - 1] = lastArg.replace(/debugger/g, '');
        }
        return originalFunction.apply(this, args);
    }

    // 复制原始Function的属性
    Object.defineProperties(NewFunction, Object.getOwnPropertyDescriptors(originalFunction));

    // 安全地替换全局Function
    try {
        window.Function = NewFunction;
    } catch (e) {
        console.warn('无法替换Function构造器，但脚本仍将继续运行');
    }

    // 添加防止检测的代码
    const nativeToString = Function.prototype.toString;
    Function.prototype.toString = function () {
        if (this === NewFunction) {
            return nativeToString.call(originalFunction);
        }
        return nativeToString.call(this);
    };
})();
