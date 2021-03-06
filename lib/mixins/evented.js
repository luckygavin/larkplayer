'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = evented;

var _events = require('../utils/events');

var Events = _interopRequireWildcard(_events);

var _dom = require('../utils/dom');

var Dom = _interopRequireWildcard(_dom);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * 使一个对象具有直接使用 on off one trigger 的能力
 *
 * @param {Object} target 要具有事件能力的对象
 * @param {Object} options 配置项
 * @param {string=} options.eventBusKey 很重要，整个事件流程所需的载体。target[eventBusKey] 应该是一个 DOM 元素
 */
/**
 * @file 给一个对象添加事件方面的 api
 * @author yuhui<yuhui06@baidu.com>
 * @date 2017/11/7
 */

function evented(target) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // @todo normalize args
    var eventBusKey = options.eventBusKey;
    if (target[eventBusKey] && target[eventBusKey]['nodeType'] === 1) {
        target.eventBusEl = target[eventBusKey];
    } else {
        target.eventBusEl = Dom.createEl('div');
    }

    target.on = function (type, fn) {
        Events.on(target.eventBusEl, type, fn);
    };

    target.off = function (type, fn) {
        Events.off(target.eventBusEl, type, fn);
    };

    target.one = function (type, fn) {
        Events.one(target.eventBusEl, type, fn);
    };

    target.trigger = function (type, data) {
        Events.trigger(target.eventBusEl, type, data);
    };
}
