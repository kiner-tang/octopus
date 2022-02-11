"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
var constant_1 = require("./constant");
var Queue = /** @class */ (function () {
    function Queue(init) {
        var _a;
        if (init === void 0) { init = []; }
        this._queue = [];
        (_a = this._queue).push.apply(_a, init);
    }
    Queue.prototype.push = function (data) {
        this._queue.push(data);
        wx.setStorageSync(constant_1.eventQueueStorageKey, this._queue);
    };
    Queue.prototype.dequeue = function () {
        var cur = this._queue.shift();
        wx.setStorageSync(constant_1.eventQueueStorageKey, this._queue);
        return cur;
    };
    Queue.prototype.size = function () {
        return this._queue.length;
    };
    Queue.prototype.tail = function () {
        if (this.empty())
            return undefined;
        return this._queue[this.size() - 1];
    };
    Queue.prototype.head = function () {
        if (this.empty())
            return undefined;
        return this._queue[0];
    };
    Queue.prototype.empty = function () {
        return this.size() === 0;
    };
    Queue.prototype.clear = function () {
        this._queue.length = 0;
    };
    Queue.prototype.all = function () {
        return __spreadArray([], this._queue);
    };
    Queue.prototype.flush = function (callback) {
        while (!this.empty()) {
            var item = this.dequeue();
            item && callback(item);
        }
    };
    Queue.prototype.stringify = function () {
        return JSON.stringify(this._queue);
    };
    return Queue;
}());
exports.Queue = Queue;
