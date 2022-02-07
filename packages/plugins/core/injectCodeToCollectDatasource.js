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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectCodeToCollectDatasource = void 0;
var types_1 = require("@babel/types");
var octopus_shared_1 = require("@kiner/octopus-shared");
var cheerio_1 = require("cheerio");
var traverse_1 = __importDefault(require("@babel/traverse"));
var common_1 = require("./common");
var utils_1 = require("./utils");
var injectCode_1 = require("./injectCode");
var InjectCodeToCollectDatasource = /** @class */ (function (_super) {
    __extends(InjectCodeToCollectDatasource, _super);
    function InjectCodeToCollectDatasource() {
        return _super.call(this, 'InjectCodeToCollectDatasource') || this;
    }
    /**
     * 为 wxml 打入补丁代码
     * @param $
     */
    InjectCodeToCollectDatasource.prototype.patchCodeInitWxml = function ($) {
        $(common_1.buildInView)
            .addClass(common_1.injectClassName)
            .map(function (idx, item) {
            item.attribs['data-tag'] = item.tagName;
            item.attribs['data-attrs'] = (0, octopus_shared_1.obj2querystr)(item.attribs);
            return item;
        });
        // 在 taro 中，caver-image 报错会触发统一事件 eventHandler, 而 image 不会，因此，image 单独捕获 error 事件
        // $('image').map((idx: number, item: Element) => {
        //   item.attribs["binderror"]
        //   return item;
        // });
    };
    /**
     * 由于 cheerio 输出的属性字符串会将 ' 转换成 &apos; ，因此再完成补丁输出源码前需要转换回来
     * @param html
     * @returns
     */
    InjectCodeToCollectDatasource.prototype.replaceEncodeChar = function (html) {
        return html.replace(/&apos;/g, "'");
    };
    /**
     * 注入代码到 wxml 文件中
     * @param code
     */
    InjectCodeToCollectDatasource.prototype.injectCodeIntoWxml = function (code) {
        var _this = this;
        var filePaths = Object.keys(code);
        filePaths.forEach(function (path) {
            var wxml = code[path];
            var $ = (0, cheerio_1.load)("<view id=\"wxmlWrapper\">".concat(wxml, "</view>"), {
                xml: true,
                xmlMode: true,
            });
            _this.patchCodeInitWxml($);
            code[path] = _this.replaceEncodeChar($('#wxmlWrapper').html());
        });
    };
    InjectCodeToCollectDatasource.prototype._traverseJs = function (_a) {
        var code = _a.code, filePath = _a.filePath, _b = _a.injectDepCb, injectDepCb = _b === void 0 ? octopus_shared_1.noop : _b, _c = _a.callDepCb, callDepCb = _c === void 0 ? octopus_shared_1.noop : _c, _d = _a.eventHandler, eventHandler = _d === void 0 ? octopus_shared_1.noop : _d, _e = _a.loadErrorHandler, loadErrorHandler = _e === void 0 ? octopus_shared_1.noop : _e;
        var appJs = code[filePath];
        var flag = 0;
        (0, traverse_1.default)(appJs === null || appJs === void 0 ? void 0 : appJs[0], {
            enter: function (path) {
                var _a, _b;
                // 依赖注入
                if (path.isArrayExpression() && flag <= 1) {
                    // 代码中第 2 个数组定义
                    if (flag === 1) {
                        var properties = path.node.elements[1].properties;
                        injectDepCb(properties);
                    }
                    flag++;
                }
                // 依赖调用
                if (path.isObjectProperty() && path.node.key.value === './src/app.tsx') {
                    var body = path.node.value.body.body;
                    callDepCb(body);
                }
                /**
                 * 所有事件统一回调
                 */
                if (path.isFunctionExpression() && ((_a = path.node.id) === null || _a === void 0 ? void 0 : _a.name) === 'dispatch') {
                    if (filePath === 'taro.js') {
                        path.node.body && eventHandler(path.node.body.body);
                    }
                }
                // 处理图片加载失败事件监听
                if (path.isVariableDeclarator() &&
                    ((_b = path.node.init) === null || _b === void 0 ? void 0 : _b.type) === 'CallExpression' &&
                    path.node.init.arguments.find(function (item) {
                        return item.type === 'StringLiteral' && item.value === common_1.componentReactPath;
                    }) &&
                    path.node.id.type === 'Identifier') {
                    // 先根据条件获取 component-react 的模块 id,
                    var componentReactModuleId_1 = path.node.id.name;
                    (0, traverse_1.default)(appJs === null || appJs === void 0 ? void 0 : appJs[0], {
                        enter: function (_path) {
                            var _a;
                            if (_path.isMemberExpression() &&
                                _path.node.object.type === 'Identifier' &&
                                _path.node.object.name === componentReactModuleId_1 &&
                                _path.node.property.type === 'StringLiteral' &&
                                common_1.needCatchLoadErrorComponents.includes(_path.node.property.value)) {
                                if (_path.parentPath.node.type === 'CallExpression') {
                                    var imageComp = _path.parentPath.node.arguments[1];
                                    if (imageComp.type === 'ObjectExpression') {
                                        var onError = (_a = imageComp.properties.find(function (item) {
                                            return item.key.name === 'onError';
                                        })) === null || _a === void 0 ? void 0 : _a.value;
                                        var eventObjName = "e";
                                        if (onError) {
                                            if (onError.params.length === 0) {
                                                onError.params.push((0, types_1.identifier)('e'));
                                            }
                                            else {
                                                eventObjName = onError.params[0].type === "Identifier" ? onError.params[0].name : "e";
                                            }
                                            loadErrorHandler(onError.body.body, eventObjName);
                                        }
                                        else {
                                            var body = [];
                                            imageComp.properties.push((0, utils_1.astObjectPropertyFn)({ name: 'onError', params: [(0, types_1.identifier)('e')], body: body }));
                                            loadErrorHandler(body, eventObjName);
                                        }
                                    }
                                }
                            }
                        },
                    });
                }
            },
        });
    };
    /**
     * 注入引入模块语句
     * @param code 抽象语法树集合
     * @param filePath 文件路径
     * @param injectFilePath 待注入模块的路径
     */
    InjectCodeToCollectDatasource.prototype._injectRequire = function (code, filePath, injectFilePath) {
        var appJs = code[filePath];
        appJs[0].program.body.unshift((0, types_1.expressionStatement)((0, types_1.callExpression)((0, types_1.identifier)('require'), [(0, types_1.stringLiteral)(injectFilePath)])));
    };
    /**
     * 在 js 中注入代码
     * @param code 抽象语法树集合
     */
    InjectCodeToCollectDatasource.prototype.injectCodeIntoJs = function (code) {
        var _this = this;
        this._injectRequire(code, 'app.js', common_1.libFilePath);
        this._traverseJs({
            code: code,
            filePath: 'app.js',
            injectDepCb: function (properties) {
                properties.push((0, utils_1.astObjectPropertyFn)({
                    name: 'octopus_inject_code',
                    id: 'OctopusInjectCode',
                    body: [
                        (0, types_1.expressionStatement)((0, utils_1.astCallObjectMethod)('console', 'log', [
                            (0, types_1.stringLiteral)('🐙 可以在这里加入一些小程序启动时要执行的预处理代码'),
                        ])),
                    ],
                }));
            },
            callDepCb: function (body) {
                body.unshift((0, types_1.variableDeclaration)('var', [
                    (0, types_1.variableDeclarator)((0, types_1.identifier)(common_1.libName), (0, types_1.callExpression)((0, types_1.identifier)('__webpack_require__'), [(0, types_1.stringLiteral)(common_1.libFilePath)])),
                ]), (0, types_1.variableDeclaration)('var', [
                    (0, types_1.variableDeclarator)((0, types_1.identifier)('octopus_inject_code'), (0, types_1.callExpression)((0, types_1.identifier)('__webpack_require__'), [(0, types_1.stringLiteral)('octopus_inject_code')])),
                ]));
            },
        });
        // 注入通用事件监听代码
        this._traverseJs({
            code: code,
            filePath: 'taro.js',
            eventHandler: function (body) {
                body.push((0, types_1.expressionStatement)((0, utils_1.astCallObjectMethod)(common_1.wxLibName, common_1.injectEventName, [(0, types_1.identifier)('e')])));
            },
        });
        // 注入 image 加载失败监听代码
        Object.keys(code).forEach(function (filePath) {
            _this._traverseJs({
                code: code,
                filePath: filePath,
                loadErrorHandler: function (body, eventObjName) {
                    body.unshift((0, types_1.expressionStatement)((0, utils_1.astCallObjectMethod)(common_1.wxLibName, common_1.injectEventName, [(0, types_1.identifier)(eventObjName)])));
                },
            });
        });
    };
    /**
     * 将库文件的代码加入到源码队列当中
     * @param libs
     * @param config
     */
    InjectCodeToCollectDatasource.prototype.injectCodeLib = function (libs, config) {
        var _a;
        (_a = config.codes).push.apply(_a, libs);
    };
    /**
     * 注入代码入口
     * @param asts
     */
    InjectCodeToCollectDatasource.prototype.injectCode = function (asts, config) {
        this.injectCodeIntoJs(asts.js);
        this.injectCodeIntoWxml(asts.wxml);
        this.injectCodeLib((0, injectCode_1.injectLibFiles)(config.pluginOptions), config);
    };
    /**
     * 处理数据
     * @param data
     * @returns
     */
    InjectCodeToCollectDatasource.prototype.resolveData = function (data) {
        var _this = this;
        data.forEach(function (item) { return _this.injectCode(item.asts, item); });
        return _super.prototype.resolveData.call(this, data);
    };
    return InjectCodeToCollectDatasource;
}(octopus_shared_1.BaseApp));
exports.InjectCodeToCollectDatasource = InjectCodeToCollectDatasource;
