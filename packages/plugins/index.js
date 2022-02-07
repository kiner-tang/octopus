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
