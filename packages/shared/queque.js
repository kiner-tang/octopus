"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
var Queue = /** @class */ (function () {
    function Queue() {
        this._queue = [];
    }
    Queue.prototype.push = function (data) {
        this._queue.push(data);
    };
    Queue.prototype.dequeue = function () {
        return this._queue.shift();
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
        return __spreadArray([], this._queue, true);
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
