"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortid = exports.guid = exports.proxy = exports.isFunction = exports.noop = void 0;
/**
 * 空函数
 */
var noop = function () { };
exports.noop = noop;
/**
 * 判断传入的是否是函数
 * @param fn
 * @returns
 */
var isFunction = function (fn) { return typeof fn === 'function'; };
exports.isFunction = isFunction;
/**
 * 代理原始对象并注入指定代码实现特定逻辑
 * @param target 原始对象
 * @param inject 待注入函数
 * @param propNameList 属性列表，默认为 target 中所有的属性名，可指定只针对某几个属性名进行代理
 * @returns
 */
function proxy(target, inject, propNameList) {
    if (inject === void 0) { inject = exports.noop; }
    if (propNameList === void 0) { propNameList = Object.keys(target); }
    propNameList.forEach(function (propName) {
        var val = target[propName];
        if ((0, exports.isFunction)(val)) {
            target[propName] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                inject.apply(void 0, args);
                return val.apply(void 0, args);
            };
        }
    });
    return target;
}
exports.proxy = proxy;
function random(c) {
    var r = (Math.random() * 16) | 0;
    var v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
}
var guidSet = new Set();
var shortGuidSet = new Set();
/**
 * 生成长 guid 全局唯一
 * @returns
 */
function guid() {
    var curId;
    while (guidSet.has((curId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, random))))
        ;
    guidSet.add(curId);
    return curId;
}
exports.guid = guid;
/**
 * 生成短 guid 全局唯一
 * @returns
 */
function shortid() {
    var curId;
    while (shortGuidSet.has((curId = 'xxxx-4xxx-yxxx'.replace(/[xy]/g, random))))
        ;
    shortGuidSet.add(curId);
    return curId;
}
exports.shortid = shortid;
