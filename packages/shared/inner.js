"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildInLoadErrorEventName = exports.AppAPI = exports.PageAPI = exports.BuildInEventName = exports.CollectMode = exports.Output = exports.PlatformType = exports.BaseApp = void 0;
var logger_1 = require("./logger");
/**
 * 一个实现了管道数据流和时间的订阅发布接口的应用基础类，项目中其他类基本都需要集成此类
 */
var BaseApp = /** @class */ (function () {
    function BaseApp(appName) {
        if (appName === void 0) { appName = "__DEFAULT_APP_NAME__"; }
        this.appName = appName;
        this._showInnerLog = false;
        /**
         * 注册的事件列表，用事件名加以管理
         */
        this.handlers = {};
        this.logger = new logger_1.Logger(appName);
    }
    Object.defineProperty(BaseApp.prototype, "showInnerLog", {
        get: function () {
            return this._showInnerLog;
        },
        set: function (value) {
            logger_1.Logger.showLog = value;
            this._showInnerLog = value;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 接受到数据后，使用 resolveData 处理获得新书局后，将新数据推送到下一节管道
     * @param data
     */
    BaseApp.prototype.push = function (data) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.resolveData(data)];
                    case 1:
                        data = _b.sent();
                        (_a = this.next) === null || _a === void 0 ? void 0 : _a.push(data);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 链接管道
     * 让 pipe 的返回值始终是下一节管道的引用，这样就可以链式调用
     * @param _next
     * @returns
     */
    BaseApp.prototype.pipe = function (_next) {
        this.next = _next;
        return _next;
    };
    /**
     * 通过事件名将事件回调注册到事件列表当中
     * @param {string} eventName 事件名
     * @param {EventHandler} handler 事件回调
     */
    BaseApp.prototype.on = function (eventName, handler) {
        (this.handlers[eventName] || (this.handlers[eventName] = [])).push(handler);
    };
    /**
     * 发布事件，将所有相同事件名的回调函数用 data 作为事件参数内容调用一遍
     * @param eventName 事件名
     * @param data 事件参数
     */
    BaseApp.prototype.emit = function (eventName, data) {
        var _a;
        (_a = this.handlers[eventName]) === null || _a === void 0 ? void 0 : _a.forEach(function (fn) {
            return fn({
                eventName: eventName,
                detail: data,
            });
        });
    };
    /**
     * 数据处理，返回最新的数据对象
     * @param data
     * @returns
     */
    BaseApp.prototype.resolveData = function (data) {
        if (this.showInnerLog) {
            this.logger.log('数据处理完毕', data);
        }
        return data;
    };
    return BaseApp;
}());
exports.BaseApp = BaseApp;
/**
 * 支持平台类型
 */
var PlatformType;
(function (PlatformType) {
    PlatformType["wx"] = "wx";
})(PlatformType = exports.PlatformType || (exports.PlatformType = {}));
var Output = /** @class */ (function (_super) {
    __extends(Output, _super);
    function Output(namespace) {
        return _super.call(this, namespace || "OUTPUT") || this;
    }
    Output.prototype.resolveData = function (data) {
        this.logger.log("当前数据", data);
        return data;
    };
    return Output;
}(BaseApp));
exports.Output = Output;
/**
 * 事件收集力度模式类型
 */
var CollectMode;
(function (CollectMode) {
    /**
     * 默认力度，插件会给出一个常用的事件收集力度的配置，用这个配置可以满足大部分需求的数据收集力度需求
     */
    CollectMode["default"] = "default";
    /**
     * 全量力度，将会收集插件支持的所有事件的信息，适合一些复杂的事件分析需求
     */
    CollectMode["all"] = "all";
    /**
     * 自定义力度，插件将不会注入默认的收集事件，由用户通过自定义指定 complieOptions.include，complieOptions.exclude，registerEventList，loadErrorEventList 完成
     */
    CollectMode["custom"] = "custom";
    /** 如果不希望称触发自动埋点，而是希望通过 api 手动提交，则使用此模式 */
    CollectMode["manual"] = "manual";
})(CollectMode = exports.CollectMode || (exports.CollectMode = {}));
/**
 * 内置监听事件列表
 */
var BuildInEventName;
(function (BuildInEventName) {
    BuildInEventName["tap"] = "tap";
    BuildInEventName["click"] = "click";
    BuildInEventName["touchstart"] = "touchstart";
    BuildInEventName["touchmove"] = "touchmove";
    BuildInEventName["touchend"] = "touchend";
    BuildInEventName["touchcancel"] = "touchcancel";
    BuildInEventName["scroll"] = "scroll";
    BuildInEventName["input"] = "input";
    BuildInEventName["change"] = "change";
    BuildInEventName["focus"] = "focus";
    BuildInEventName["blur"] = "blur";
    BuildInEventName["longpress"] = "longpress";
    BuildInEventName["longtap"] = "longtap";
})(BuildInEventName = exports.BuildInEventName || (exports.BuildInEventName = {}));
var PageAPI;
(function (PageAPI) {
    PageAPI["onPageScroll"] = "onPageScroll";
    PageAPI["onShareAppMessage"] = "onShareAppMessage";
    PageAPI["onShareTimeline"] = "onShareTimeline";
    PageAPI["onAddToFavorites"] = "onAddToFavorites";
    PageAPI["onTabItemTap"] = "onTabItemTap";
    PageAPI["onShow"] = "onShow";
    PageAPI["onHide"] = "onShow";
})(PageAPI = exports.PageAPI || (exports.PageAPI = {}));
var AppAPI;
(function (AppAPI) {
    AppAPI["onLaunch"] = "onLaunch";
    AppAPI["onThemeChange"] = "onThemeChange";
    AppAPI["onUnhandledRejection"] = "onUnhandledRejection";
    AppAPI["onShow"] = "onShow";
    AppAPI["onHide"] = "onHide";
    AppAPI["onPageNotFound"] = "onPageNotFound";
})(AppAPI = exports.AppAPI || (exports.AppAPI = {}));
/**
 * 内置加载失败事件
 */
var BuildInLoadErrorEventName;
(function (BuildInLoadErrorEventName) {
    BuildInLoadErrorEventName["image"] = "image";
    BuildInLoadErrorEventName["coverImage"] = "coverImage";
    BuildInLoadErrorEventName["video"] = "video";
    BuildInLoadErrorEventName["audio"] = "audio";
})(BuildInLoadErrorEventName = exports.BuildInLoadErrorEventName || (exports.BuildInLoadErrorEventName = {}));
