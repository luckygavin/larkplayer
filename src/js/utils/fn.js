/**
 * @file fn.js 函数相关的一些方法
 * @author yuhui06@baidu.com
 * @date 2017/11/3
 */

import {newGUID} from './guid';

/**
 * 绑定函数到指定的上下文
 *
 * @todo videojs 在返回的函数上还加了 guid 做更加个性化的处理，目前暂时用不上就没写
 *
 * @param {Funtion} fn 要绑定上下文的函数
 * @param {Object} thisArg 函数要绑定的上下文
 * @return {Function} 该函数会在指定的上下文中执行
 */
export function bind(fn, thisArg) {
    if (!fn.guid) {
        fn.guid = newGUID();
    }

    return function (...args) {
        return fn.apply(thisArg, args);
    };
}

/**
 * 限制函数的执行的频率
 *
 * @param {Function} fn 要控制执行频率的函数
 * @param {number} wait 函数的执行间隔大于等于此数值（单位：ms）
 * @return {Funtion} 限制了执行频率的函数
 */
export function throttle(fn, wait) {
    let lastTimestamp = Date.now();
    return function (...args) {
        const now = Date.now();
        if (now - lastTimestamp >= wait) {
            fn(...args);
            lastTimestamp = now;
        }
    };
}