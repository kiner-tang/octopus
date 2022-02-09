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
    return "".concat(y, "-").concat(fitNum(m), "-").concat(fitNum(d), " ").concat(fitNum(H), ":").concat(fitNum(M), ":").concat(fitNum(S), ".").concat(fitNum(MS, 3));
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
            var time = Logger.showTime ? "<".concat(timeFormat(new Date()), ">") : '';
            args.push('\n');
            console.log.apply(console, __spreadArray(["\n\uD83D\uDC19 ".concat(time, "[").concat(namespace, "] ").concat(message, "\n")], args, false));
        }
    };
    Logger.warning = function (namespace, message) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (Logger.showLog && (Logger.showLevel === LoggerLevel.warning || Logger.showLevel === LoggerLevel.all)) {
            var time = Logger.showTime ? "<".concat(timeFormat(new Date()), ">") : '';
            args.push('\n');
            console.warn.apply(console, __spreadArray(["\n\uD83D\uDC19 ".concat(time, "[").concat(namespace, "] ").concat(message, "\n")], args, false));
        }
    };
    Logger.error = function (namespace, message) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (Logger.showLog && (Logger.showLevel === LoggerLevel.error || Logger.showLevel === LoggerLevel.all)) {
            var time = Logger.showTime ? "<".concat(timeFormat(new Date()), ">") : '';
            args.push('\n');
            console.error.apply(console, __spreadArray(["\n\uD83D\uDC19 ".concat(time, "[").concat(namespace, "] ").concat(message, "\n")], args, false));
        }
    };
    Logger.prototype.log = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        Logger.log.apply(Logger, __spreadArray([this.namespace, message], args, false));
    };
    Logger.prototype.warning = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        Logger.warning.apply(Logger, __spreadArray([this.namespace, message], args, false));
    };
    Logger.prototype.error = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        Logger.error.apply(Logger, __spreadArray([this.namespace, message], args, false));
    };
    Logger.showLog = false;
    Logger.showTime = true;
    Logger.showLevel = LoggerLevel.all;
    return Logger;
}());
exports.Logger = Logger;
