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
exports.AstCreator = exports.transformCodeToAsts = exports.transformWXMLCodeToAsts = exports.transformJsCodeToAsts = exports.getAstFromJsCode = void 0;
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */
var parser_1 = require("@babel/parser");
var octopus_shared_1 = require("@kiner/octopus-shared");
var common_1 = require("./common");
/**
 * 根据单个 js 文件代码生成 ast 对象数组
 * @param fileName 文件名
 * @param code 源代码，包括编译后代码和 sourceMap
 * @param extra 一些额外信息
 * @returns
 */
function getAstFromJsCode(fileName, code, extra) {
    if (extra === void 0) { extra = { ctx: {} }; }
    return __awaiter(this, void 0, void 0, function () {
        var ast;
        return __generator(this, function (_a) {
            ast = parser_1.parse(code.source, common_1.defaultAstParserOption);
            ast.extra = __assign({ fileName: fileName }, extra);
            return [2 /*return*/, [ast]];
        });
    });
}
exports.getAstFromJsCode = getAstFromJsCode;
/**
 * 将 codes 资源列表中的所有 js 代码生成抽象语法树
 * @param codes 代码资源列表
 * @param extra
 * @returns
 */
function transformJsCodeToAsts(codes, extra) {
    if (extra === void 0) { extra = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var res, keys, i, fileName, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    res = {};
                    keys = Object.keys(codes);
                    i = 0;
                    _c.label = 1;
                case 1:
                    if (!(i < keys.length)) return [3 /*break*/, 4];
                    fileName = keys[i];
                    if (!fileName.endsWith('.js'))
                        return [3 /*break*/, 3];
                    _a = res;
                    _b = fileName;
                    return [4 /*yield*/, getAstFromJsCode(fileName, {
                            source: codes[fileName].children.map(function (item) { return item._value; }).join('\n'),
                            map: codes[fileName + ".map"]._value,
                        }, extra)];
                case 2:
                    _a[_b] = _c.sent();
                    _c.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, res];
            }
        });
    });
}
exports.transformJsCodeToAsts = transformJsCodeToAsts;
/**
 * wxml 转换成 asts
 * @param codes
 * @param extra
 * @returns
 */
function transformWXMLCodeToAsts(codes) {
    return __awaiter(this, void 0, void 0, function () {
        var res, keys, i, fileName;
        return __generator(this, function (_a) {
            res = {};
            keys = Object.keys(codes);
            for (i = 0; i < keys.length; i++) {
                fileName = keys[i];
                if (!fileName.endsWith('.wxml'))
                    continue;
                res[fileName] = codes[fileName].source();
            }
            return [2 /*return*/, res];
        });
    });
}
exports.transformWXMLCodeToAsts = transformWXMLCodeToAsts;
/**
 * 将 wxml 和 js 转换为 ast对象
 * @param assets taro 编译完成后的资源列表
 * @param pluginOpts taro 插件选项
 * @param ctx taro 插件上下文
 * @returns
 */
function transformCodeToAsts(assets, pluginOpts, ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, include, _c, exclude, allowAssets, jsAsts, wxmlAsts;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = pluginOpts.complieOptions, _b = _a.include, include = _b === void 0 ? [] : _b, _c = _a.exclude, exclude = _c === void 0 ? [] : _c;
                    allowAssets = octopus_shared_1.filterObjectKey(assets, octopus_shared_1.pathExcludeIgnore(Object.keys(assets), include, exclude));
                    return [4 /*yield*/, transformJsCodeToAsts(allowAssets, {
                            pluginOpts: pluginOpts,
                            ctx: ctx,
                        })];
                case 1:
                    jsAsts = _d.sent();
                    return [4 /*yield*/, transformWXMLCodeToAsts(allowAssets)];
                case 2:
                    wxmlAsts = _d.sent();
                    return [2 /*return*/, {
                            js: jsAsts,
                            wxml: wxmlAsts,
                        }];
            }
        });
    });
}
exports.transformCodeToAsts = transformCodeToAsts;
/**
 * 抽象语法树构建者，根据小程序代码生成抽象语法树
 */
var AstCreator = /** @class */ (function (_super) {
    __extends(AstCreator, _super);
    function AstCreator(assets, pluginOpts, ctx) {
        var _this = _super.call(this, 'AstCreator') || this;
        transformCodeToAsts(assets, pluginOpts, ctx).then(function (asts) {
            _this.push([
                {
                    asts: asts,
                    pluginOptions: pluginOpts,
                    ctx: ctx,
                    codes: [],
                    oriAssets: assets
                },
            ]);
        });
        return _this;
    }
    AstCreator.prototype.resolveData = function (data) {
        return _super.prototype.resolveData.call(this, data);
    };
    return AstCreator;
}(octopus_shared_1.BaseApp));
exports.AstCreator = AstCreator;
