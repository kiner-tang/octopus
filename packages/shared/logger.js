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
exports.Logger = exports.LoggerLevel = void 0;
var utils_1 = require("./utils");
var LoggerLevel;
(function (LoggerLevel) {
    LoggerLevel[LoggerLevel["all"] = 4] = "all";
    LoggerLevel[LoggerLevel["error"] = 3] = "error";
    LoggerLevel[LoggerLevel["warning"] = 2] = "warning";
    LoggerLevel[LoggerLevel["log"] = 1] = "log";
})(LoggerLevel = exports.LoggerLevel || (exports.LoggerLevel = {}));
var Logger = /** @class */ (function () {
    function Logger(namespace) {
        if (namespace === void 0) { namespace = "__DEFAULT_LOGGER_NAMESPACE__"; }
        this.namespace = namespace;
    }
    Logger.log = function (namespace, message) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (Logger.showLog && (Logger.showLevel === LoggerLevel.log || Logger.showLevel === LoggerLevel.all)) {
            var time = Logger.showTime ? "<".concat((0, utils_1.timeFormat)(new Date()), ">") : '';
            args.push("\n");
            console.log.apply(console, __spreadArray(["\n\uD83D\uDC19 ".concat(time, "[").concat(namespace, "] ").concat(message, "\n")], args, false));
        }
    };
    Logger.warning = function (namespace, message) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (Logger.showLog && (Logger.showLevel === LoggerLevel.warning || Logger.showLevel === LoggerLevel.all)) {
            var time = Logger.showTime ? "<".concat((0, utils_1.timeFormat)(new Date()), ">") : '';
            args.push("\n");
            console.warn.apply(console, __spreadArray(["\n\uD83D\uDC19 ".concat(time, "[").concat(namespace, "] ").concat(message, "\n")], args, false));
        }
    };
    Logger.error = function (namespace, message) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (Logger.showLog && (Logger.showLevel === LoggerLevel.error || Logger.showLevel === LoggerLevel.all)) {
            var time = Logger.showTime ? "<".concat((0, utils_1.timeFormat)(new Date()), ">") : '';
            args.push("\n");
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
