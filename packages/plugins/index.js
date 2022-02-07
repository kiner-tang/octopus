"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPluginOptions = void 0;
var octopus_shared_1 = require("@kiner/octopus-shared");
var astCreator_1 = require("./core/astCreator");
var common_1 = require("./core/common");
var codeGen_1 = require("./core/codeGen");
var injectCodeToCollectDatasource_1 = require("./core/injectCodeToCollectDatasource");
var fsManager_1 = require("./core/fsManager");
var prettierFactory_1 = require("./core/prettierFactory");
var taroOctopusPluginsDefaultOptions = (_a = {},
    _a[common_1.CollectMode.default] = {
        debug: false,
        complieOptions: {
            include: [/pages\/.*\.(js|js\.map)$/, /app\.(js|js\.map)$/, 'base.wxml', 'taro.js'],
            exclude: [],
        },
        mode: common_1.CollectMode.default,
        registerEventList: [
            common_1.BuildInEventName.tap,
            common_1.BuildInEventName.input,
            common_1.BuildInEventName.focus,
            common_1.BuildInEventName.blur,
            common_1.BuildInEventName.longpress,
            common_1.BuildInEventName.scroll,
        ],
        networkApi: {
            request: {
                isSuccess: function (data) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, !!data];
                    });
                }); }
            },
            uploadFile: true,
            downloadFile: true,
        },
        loadErrorEventList: common_1.buildInLoadErrorEventNameStr,
        transporterOptions: {
            env: 'production',
        },
    },
    _a[common_1.CollectMode.all] = {
        debug: false,
        complieOptions: {
            include: [/pages\/.*\.(js|js\.map)$/, /app\.(js|js\.map)$/, 'base.wxml', 'taro.js'],
            exclude: [],
        },
        mode: common_1.CollectMode.default,
        registerEventList: common_1.buildInEventNameStr,
        loadErrorEventList: common_1.buildInLoadErrorEventNameStr,
        networkApi: {
            request: {
                isSuccess: function (data) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        console.log("isSuccess: ", data);
                        return [2 /*return*/, !!data];
                    });
                }); }
            },
            uploadFile: true,
            downloadFile: true,
        },
        transporterOptions: {
            env: 'production',
        },
    },
    _a[common_1.CollectMode.custom] = {
        debug: false,
        complieOptions: {
            include: [],
            exclude: [],
        },
        mode: common_1.CollectMode.default,
        registerEventList: [],
        loadErrorEventList: [],
        transporterOptions: {
            env: 'production',
        },
    },
    _a);
/**
 * 对外提供的根据内置选项动态调整插件运行参数的方法
 * 开发者可以根据需要在原始插件参数的基础上进行修改
 * @param updateOptions
 * @returns
 */
function createPluginOptions(updateOptions) {
    return updateOptions(taroOctopusPluginsDefaultOptions);
}
exports.createPluginOptions = createPluginOptions;
exports.default = (function (ctx, pluginOpts) {
    var logger = new octopus_shared_1.Logger('TaroPlugin');
    pluginOpts = (0, octopus_shared_1.deepMergeOptions)(taroOctopusPluginsDefaultOptions[pluginOpts.mode || common_1.CollectMode.default], pluginOpts);
    octopus_shared_1.Logger.showLog = pluginOpts.debug;
    logger.log('当前插件选项', pluginOpts);
    ctx.modifyBuildAssets(function (_a) {
        var assets = _a.assets;
        octopus_shared_1.Logger.showLog = false;
        var app = new astCreator_1.AstCreator(assets, pluginOpts, ctx);
        app
            .pipe(new octopus_shared_1.Output('生成AST结果'))
            .pipe(new injectCodeToCollectDatasource_1.InjectCodeToCollectDatasource())
            .pipe(new octopus_shared_1.Output('注入代码'))
            .pipe(new codeGen_1.CodeGen())
            .pipe(new octopus_shared_1.Output('生成代码字符串'))
            .pipe(new prettierFactory_1.PrettierFactory())
            .pipe(new octopus_shared_1.Output('代码格式化'))
            .pipe(new fsManager_1.FsManager())
            .pipe(new octopus_shared_1.Output('文件输出到目标目录'));
    });
});
__exportStar(require("./types"), exports);
__exportStar(require("./core"), exports);
