"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.readFileFromDir = exports.upperCamelize = exports.capitalize = exports.camelize = exports.camelizeRE = exports.obj2querystr = exports.deepMergeOptions = exports.getSourceCodeFromMap = exports.filterObjectKey = exports.pathExcludeIgnore = exports.isPathValid = exports.runByFnNameWithPlatform = exports.shortid = exports.guid = exports.proxy = exports.isFunction = exports.noop = void 0;
var path_1 = require("path");
var fs_extra_1 = require("fs-extra");
var source_map_1 = require("source-map");
var lodash_1 = require("lodash");
/**
 * 空函数
 */
var noop = function () { };
exports.noop = noop;
/**
 * 判断传入的是否是函数
 * @param fn
 * @returns
 */
var isFunction = function (fn) { return typeof fn === 'function'; };
exports.isFunction = isFunction;
/**
 * 代理原始对象并注入指定代码实现特定逻辑
 * @param target 原始对象
 * @param inject 待注入函数
 * @param propNameList 属性列表，默认为 target 中所有的属性名，可指定只针对某几个属性名进行代理
 * @returns
 */
function proxy(target, inject, propNameList) {
    if (inject === void 0) { inject = exports.noop; }
    if (propNameList === void 0) { propNameList = Object.keys(target); }
    propNameList.forEach(function (propName) {
        var val = target[propName];
        if ((0, exports.isFunction)(val)) {
            target[propName] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                inject.apply(void 0, args);
                return val.apply(void 0, args);
            };
        }
    });
    return target;
}
exports.proxy = proxy;
function random(c) {
    var r = (Math.random() * 16) | 0;
    var v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
}
var guidSet = new Set();
var shortGuidSet = new Set();
/**
 * 生成长 guid 全局唯一
 * @returns
 */
function guid() {
    var curId;
    while (guidSet.has((curId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, random))))
        ;
    guidSet.add(curId);
    return curId;
}
exports.guid = guid;
/**
 * 生成短 guid 全局唯一
 * @returns
 */
function shortid() {
    var curId;
    while (shortGuidSet.has((curId = 'xxxx-4xxx-yxxx'.replace(/[xy]/g, random))))
        ;
    shortGuidSet.add(curId);
    return curId;
}
exports.shortid = shortid;
/**
 * 根据平台类型从对应平台中抽取 api 并执行
 * @param platform
 * @param fnName
 * @param rest
 * @returns
 */
function runByFnNameWithPlatform(platform, fnName) {
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
    return __awaiter(this, void 0, void 0, function () {
        var platformPkg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("@kiner/octopus-platform/".concat(platform))); })];
                case 1:
                    platformPkg = _a.sent();
                    return [2 /*return*/, platformPkg[fnName].apply(platformPkg, rest)];
            }
        });
    });
}
exports.runByFnNameWithPlatform = runByFnNameWithPlatform;
function isPathValid(path, include, exclude) {
    if (include === void 0) { include = []; }
    if (exclude === void 0) { exclude = []; }
    var flag = false;
    // 首先将满足 exclude 的路径都排除掉
    exclude.forEach(function (mod) {
        if (flag)
            return;
        if (typeof mod === 'object') {
            flag = mod.test(path);
        }
        else {
            flag = path.includes(mod);
        }
    });
    if (flag)
        return false;
    // 如果未显示指定 include 或 include 为空数组，则默认接受除 exclude 外的所有文件
    if (include.length === 0)
        return true;
    flag = false;
    include.forEach(function (mod) {
        if (flag)
            return;
        if (typeof mod === 'object') {
            flag = mod.test(path);
        }
        else {
            flag = path.includes(mod);
        }
    });
    return flag;
}
exports.isPathValid = isPathValid;
/**
 * 根据 include 和 exclude 挑选出符合条件的路径数组
 * @param paths 路径数组
 * @param include 包含规则数组
 * @param exclude 排除规则数组
 * @returns
 */
function pathExcludeIgnore(paths, include, exclude) {
    if (include === void 0) { include = []; }
    if (exclude === void 0) { exclude = []; }
    return paths.filter(function (item) { return isPathValid(item, include, exclude); });
}
exports.pathExcludeIgnore = pathExcludeIgnore;
function filterObjectKey(obj, paths) {
    var res = {};
    paths.forEach(function (key) {
        res[key] = obj[key];
    });
    return res;
}
exports.filterObjectKey = filterObjectKey;
function getSourceCodeFromMap(map, fileName) {
    return __awaiter(this, void 0, void 0, function () {
        var consumer;
        return __generator(this, function (_a) {
            consumer = new source_map_1.SourceMapConsumer(map);
            return [2 /*return*/, new Promise(function (resolve) {
                    consumer.then(function (res) {
                        var sources = res.sources
                            .map(function (source) {
                            return {
                                source: res.sourceContentFor(source),
                                filePath: source.replace('webpack:///', '').replace('._', '').replace(/_/g, '/'),
                            };
                        })
                            .filter(function (item) { return !!item.source; });
                        var outputFileName = (0, path_1.join)(__dirname, 'test', fileName);
                        var outputFilePath = (0, path_1.dirname)(outputFileName);
                        if (!(0, fs_extra_1.existsSync)(outputFilePath)) {
                            (0, fs_extra_1.mkdirpSync)(outputFilePath);
                        }
                        // writeFileSync(outputFileName, sources.slice(0,1)!.join('\n'));
                        resolve(sources);
                    });
                })];
        });
    });
}
exports.getSourceCodeFromMap = getSourceCodeFromMap;
/**
 * 深拷贝
 * @param target 基准对象
 * @param source 目标对象
 * @returns
 */
function deepMergeOptions(target) {
    if (target === void 0) { target = {}; }
    var source = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        source[_i - 1] = arguments[_i];
    }
    return lodash_1.merge.apply(void 0, __spreadArray([target], source, false));
}
exports.deepMergeOptions = deepMergeOptions;
/**
 * json 转 queryStr
 * @param obj 待转换对象
 * @returns
 */
function obj2querystr(obj, char) {
    if (char === void 0) { char = '|'; }
    return Object.keys(obj)
        .map(function (key) { return "".concat(key, "='").concat(obj[key], "'"); })
        .join(char);
}
exports.obj2querystr = obj2querystr;
/**
 * 识别用-作为分隔符的字符串，如："my-new-component"
 * @type {RegExp}
 */
exports.camelizeRE = /-(\w)/g;
/**
 * 用于将"my-new-component"类型的文本转换成小驼峰形式"myNewComponent"
 * @param str
 * @returns {string | void | *}
 */
var camelize = function (str) { return str.replace(exports.camelizeRE, function (a, b) { return (b ? b.toUpperCase() : ''); }); };
exports.camelize = camelize;
/**
 * 将字符串首字母转成大写
 * @type {function(*): *}
 */
var capitalize = function (str) { return str.charAt(0).toUpperCase() + str.slice(1); };
exports.capitalize = capitalize;
/**
 * 将以-连接的字符串转化成大驼峰形式
 */
var upperCamelize = function (str) { return (0, exports.capitalize)((0, exports.camelize)(str.startsWith('-') ? str : "-".concat(str))); };
exports.upperCamelize = upperCamelize;
function readFileFromDir(path, callback, ext, include) {
    if (ext === void 0) { ext = "js"; }
    if (include === void 0) { include = []; }
    var fileList = (0, fs_extra_1.readdirSync)(path);
    fileList.filter(function (item) { return item.endsWith(ext); }).forEach(function (filePath) {
        var fullPath = (0, path_1.join)(path, filePath);
        var stat = (0, fs_extra_1.statSync)(fullPath);
        if (stat.isDirectory()) {
            readFileFromDir(fullPath, callback, ext);
        }
        else {
            if (include.includes(filePath)) {
                callback(fullPath);
            }
        }
    });
}
exports.readFileFromDir = readFileFromDir;
