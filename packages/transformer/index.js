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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.Transformer = void 0;
/* eslint-disable @typescript-eslint/ban-ts-comment */
var inner_1 = require("@kiner/octopus-shared/inner");
var queque_1 = require("@kiner/octopus-shared/queque");
var Transformer = /** @class */ (function (_super) {
    __extends(Transformer, _super);
    function Transformer(datasource, pluginOptions) {
        var _this = _super.call(this, 'Transformer') || this;
        _this.showInnerLog = true;
        _this.eventQueue = new queque_1.Queue();
        _this.push([
            {
                datasource: datasource,
                pluginOptions: pluginOptions,
                eventQueue: _this.eventQueue,
            },
        ]);
        return _this;
    }
    Transformer.prototype.resolveData = function (data) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var i, item, _b, type, subType, oriEvent, dataset, elemData, errorMsg, detail, pageData, customData, curEleSid, isManual, text, touchElem, route, pageConfig, transformerOptions, normalData, fnId, transformer;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(i < data.length)) return [3 /*break*/, 5];
                        item = data[i];
                        _b = item.datasource, type = _b.type, subType = _b.subType, oriEvent = _b.oriEvent, dataset = _b.dataset, elemData = _b.elemData, errorMsg = _b.errorMsg, detail = _b.detail, pageData = _b.pageData, customData = _b.customData, curEleSid = _b.curEleSid, isManual = _b.isManual, text = _b.text, touchElem = _b.touchElem, route = _b.route, pageConfig = _b.pageConfig;
                        transformerOptions = item.pluginOptions.transformerOptions;
                        normalData = {
                            type: type,
                            subType: subType,
                            oriEvent: oriEvent,
                            detail: detail,
                            value: (_a = oriEvent === null || oriEvent === void 0 ? void 0 : oriEvent.detail) === null || _a === void 0 ? void 0 : _a.value,
                            target: {
                                dataset: dataset,
                                elemData: elemData,
                                curEleSid: curEleSid,
                                text: text,
                                touchElem: touchElem,
                            },
                            errorMsg: errorMsg,
                            customData: customData,
                            isManual: isManual,
                            pageData: pageData,
                            route: route,
                            pageConfig: pageConfig
                        };
                        if (!transformerOptions) return [3 /*break*/, 3];
                        fnId = transformerOptions === null || transformerOptions === void 0 ? void 0 : transformerOptions.transformer;
                        transformer = __webpack_require__(fnId).transformer;
                        return [4 /*yield*/, transformer({
                                datasource: item.datasource,
                                pluginOptions: item.pluginOptions,
                            })];
                    case 2:
                        normalData = _c.sent();
                        _c.label = 3;
                    case 3:
                        this.eventQueue.push(normalData);
                        _c.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/, _super.prototype.resolveData.call(this, data.map(function (item) { return (__assign(__assign({}, item), { eventQueue: _this.eventQueue })); }))];
                }
            });
        });
    };
    return Transformer;
}(inner_1.BaseApp));
exports.Transformer = Transformer;
