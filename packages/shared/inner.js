"use strict";
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
exports.BaseApp = void 0;
/**
 * 一个实现了管道数据流和时间的订阅发布接口的应用基础类，项目中其他类基本都需要集成此类
 */
var BaseApp = /** @class */ (function () {
    function BaseApp() {
        /**
         * 注册的事件列表，用事件名加以管理
         */
        this.handlers = {};
    }
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
        return data;
    };
    return BaseApp;
}());
exports.BaseApp = BaseApp;
