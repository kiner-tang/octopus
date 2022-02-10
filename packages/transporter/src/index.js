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
exports.Transporter = void 0;
/* eslint-disable @typescript-eslint/ban-ts-comment */
var inner_1 = require("@kiner/octopus-shared/src/inner");
var constant_1 = require("@kiner/octopus-shared/src/constant");
var Transporter = /** @class */ (function (_super) {
    __extends(Transporter, _super);
    function Transporter() {
        return _super.call(this, 'Transporter') || this;
    }
    Transporter.prototype.transporterConsole = function (eventQueue) {
        var curData;
        while ((curData = eventQueue.dequeue())) {
            curData && console.log('🐙 章鱼埋点上报数据', curData);
        }
    };
    Transporter.prototype.transporterSendAll = function (_a) {
        var eventQueue = _a.eventQueue, transporterOptions = _a.pluginOptions.transporterOptions;
        return __awaiter(this, void 0, void 0, function () {
            var transformParams, customRequest, requestOptions, isSendEventList, transfromParamFnId, customRequestFnId, transfromParam, customRequestFn, mod, mod, all, params;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        transformParams = transporterOptions.transformParams, customRequest = transporterOptions.customRequest, requestOptions = transporterOptions.requestOptions, isSendEventList = transporterOptions.isSendEventList;
                        transfromParamFnId = transformParams;
                        customRequestFnId = customRequest;
                        transfromParam = function (data) { return JSON.stringify(data); };
                        customRequestFn = function (data) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, server, method, header;
                            return __generator(this, function (_b) {
                                _a = requestOptions, server = _a.server, method = _a.method, header = _a.header;
                                wx.request({
                                    url: server,
                                    method: method.toUpperCase(),
                                    header: header,
                                    data: data
                                });
                                return [2 /*return*/];
                            });
                        }); };
                        if (transfromParamFnId) {
                            mod = __webpack_require__(transfromParamFnId);
                            transfromParam = mod.transfromParam;
                        }
                        if (customRequestFnId) {
                            mod = __webpack_require__(customRequestFnId);
                            customRequestFn = mod.customRequest;
                        }
                        if (!isSendEventList) return [3 /*break*/, 2];
                        all = eventQueue.all();
                        eventQueue.clear();
                        params = all.map(function (item) { return transfromParam(item); });
                        return [4 /*yield*/, customRequestFn(params)];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        eventQueue.flush(function (data) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, customRequestFn(transfromParam(data))];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Transporter.prototype.resolveData = function (data) {
        var _loop_1 = function (i) {
            var _a = data[i], eventQueue = _a.eventQueue, pluginOptions = _a.pluginOptions;
            this_1.showInnerLog = pluginOptions.debug || false;
            var transporterOptions = pluginOptions.transporterOptions;
            if (!transporterOptions) {
                return "continue";
            }
            var transformParams = transporterOptions.transformParams, mode = transporterOptions.mode, _b = transporterOptions.limit, limit = _b === void 0 ? 10 : _b;
            var transfromParamFnId = transformParams;
            var transfromParam = function (data) { return JSON.stringify(data); };
            if (transfromParamFnId) {
                // @ts-ignore
                var mod = __webpack_require__(transfromParamFnId);
                transfromParam = mod.transfromParam;
            }
            if (mode === inner_1.TransporterMode.none)
                return "continue";
            else if (mode === inner_1.TransporterMode.console)
                this_1.transporterConsole(eventQueue);
            else if (mode === inner_1.TransporterMode.sendWhenPush) {
                this_1.transporterSendAll(data[i]);
            }
            else if (mode === inner_1.TransporterMode.sendAllOverflow) {
                if (eventQueue.size() >= limit) {
                    this_1.transporterSendAll(data[i]).then(function (res) {
                        if (!eventQueue.empty()) {
                            console.log("\uD83D\uDC19 \u961F\u5217\u5269\u4F59".concat(eventQueue.size(), "\u6761\u6570\u636E\u672A\u8FBE\u5230\u53D1\u9001\u6761\u4EF6\uFF0C\u6682\u5B58\u5230\u672C\u5730\u5B58\u50A8"));
                            wx.setStorageSync(constant_1.eventQueueStorageKey, eventQueue.all());
                        }
                    });
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < data.length; i++) {
            _loop_1(i);
        }
        return _super.prototype.resolveData.call(this, data);
    };
    return Transporter;
}(inner_1.BaseApp));
exports.Transporter = Transporter;
