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
