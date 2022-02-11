"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.LoggerLevel = exports.timeFormat = exports.fitNum = void 0;
function fitNum(num, len) {
    if (len === void 0) { len = 2; }
    return String(num).padStart(len, '0');
}
exports.fitNum = fitNum;
function timeFormat(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var H = date.getHours();
    var M = date.getMinutes();
    var S = date.getSeconds();
    var MS = date.getMilliseconds();
    return y + "-" + fitNum(m) + "-" + fitNum(d) + " " + fitNum(H) + ":" + fitNum(M) + ":" + fitNum(S) + "." + fitNum(MS, 3);
}
exports.timeFormat = timeFormat;
var LoggerLevel;
(function (LoggerLevel) {
    LoggerLevel[LoggerLevel["all"] = 4] = "all";
    LoggerLevel[LoggerLevel["error"] = 3] = "error";
    LoggerLevel[LoggerLevel["warning"] = 2] = "warning";
    LoggerLevel[LoggerLevel["log"] = 1] = "log";
})(LoggerLevel = exports.LoggerLevel || (exports.LoggerLevel = {}));
var Logger = /** @class */ (function () {
    function Logger(namespace) {
        if (namespace === void 0) { namespace = '__DEFAULT_LOGGER_NAMESPACE__'; }
        this.namespace = namespace;
    }
    Logger.log = function (namespace, message) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (Logger.showLog && (Logger.showLevel === LoggerLevel.log || Logger.showLevel === LoggerLevel.all)) {
            var time = Logger.showTime ? "<" + timeFormat(new Date()) + ">" : '';
            args.push('\n');
            console.log.apply(console, __spreadArray(["\n\uD83D\uDC19 " + time + "[" + namespace + "] " + message + "\n"], args));
        }
    };
    Logger.warning = function (namespace, message) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (Logger.showLog && (Logger.showLevel === LoggerLevel.warning || Logger.showLevel === LoggerLevel.all)) {
            var time = Logger.showTime ? "<" + timeFormat(new Date()) + ">" : '';
            args.push('\n');
            console.warn.apply(console, __spreadArray(["\n\uD83D\uDC19 " + time + "[" + namespace + "] " + message + "\n"], args));
        }
    };
    Logger.error = function (namespace, message) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (Logger.showLog && (Logger.showLevel === LoggerLevel.error || Logger.showLevel === LoggerLevel.all)) {
            var time = Logger.showTime ? "<" + timeFormat(new Date()) + ">" : '';
            args.push('\n');
            console.error.apply(console, __spreadArray(["\n\uD83D\uDC19 " + time + "[" + namespace + "] " + message + "\n"], args));
        }
    };
    Logger.prototype.log = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        Logger.log.apply(Logger, __spreadArray([this.namespace, message], args));
    };
    Logger.prototype.warning = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        Logger.warning.apply(Logger, __spreadArray([this.namespace, message], args));
    };
    Logger.prototype.error = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        Logger.error.apply(Logger, __spreadArray([this.namespace, message], args));
    };
    Logger.showLog = false;
    Logger.showTime = true;
    Logger.showLevel = LoggerLevel.all;
    return Logger;
}());
exports.Logger = Logger;
