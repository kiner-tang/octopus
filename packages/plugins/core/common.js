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
Object.defineProperty(exports, "__esModule", { value: true });
exports.customParamsClassName = exports.ignoreClassName = exports.componentReactPath = exports.needCatchLoadErrorComponentsList = exports.needCatchLoadErrorComponents = exports.taroModule2wxComponent = exports.buildInLoadErrorEventNameStr = exports.appApiStr = exports.pageApiStr = exports.buildInEventNameStr = exports.wxLibName = exports.injectClassName = exports.buildInView = exports.performanceSymbol = exports.helpersSymbol = exports.exportSymbol = exports.injectSymbol = exports.apiProxySymbol = exports.injectEventName = exports.libName = exports.utilModuleName = exports.utilFilePath = exports.libFilePath = exports.defaultAstParserOption = void 0;
var octopus_shared_1 = require("@kiner/octopus-shared");
exports.defaultAstParserOption = {
    sourceType: 'module',
    plugins: [
        'typescript',
        ['decorators', { decoratorsBeforeExport: true }],
        'classProperties',
        'classPrivateProperties',
        'jsx',
    ],
};
exports.libFilePath = './octopusLib.js';
exports.utilFilePath = './octopusUtil.wxs';
exports.utilModuleName = 'octopus';
exports.libName = 'octopusLib';
exports.injectEventName = 'collectDataEvent';
exports.apiProxySymbol = "/////////apiProxy/////////";
exports.injectSymbol = "/////////inject/////////";
exports.exportSymbol = "/////////exports/////////";
exports.helpersSymbol = "/////////helpers/////////";
exports.performanceSymbol = "/////////performance/////////";
exports.buildInView = 'cover-image,cover-view,match-media,movable-area,movable-view,page-container,scroll-view,share-element,swiper,swiper-item,view,icon,progress,rich-text,text,button,checkbox,checkbox-group,editor,form,input,keyboard-accessory,label,picker,picker-view,picker-view-column,radio,radio-groupslider,switch,textarea,navigator,audio,camera,image,live-player,live-pusher,video,voip-room,map,canvas,ad,ad-custom,official-account,open-data,web-view,aria-component';
exports.injectClassName = "".concat(exports.libName, "-inject-class");
exports.wxLibName = "wx.".concat(exports.libName);
/**
 * 内置监听事件名称字符串数组
 */
exports.buildInEventNameStr = Object.keys(octopus_shared_1.BuildInEventName);
exports.pageApiStr = Object.keys(octopus_shared_1.PageAPI);
exports.appApiStr = Object.keys(octopus_shared_1.AppAPI);
/**
 * 内置加载失败事件名称字符串数组
 */
exports.buildInLoadErrorEventNameStr = Object.keys(octopus_shared_1.BuildInLoadErrorEventName);
/**
 * taro 内部编译后模块名到微信内置部分组件的映射
 */
exports.taroModule2wxComponent = {
    a: 'button',
    b: 'cover-image',
    c: 'image',
    d: 'input',
    e: 'text',
    f: 'video',
    g: 'view',
};
/**
 * 需要捕获加载失败事件的组件
 */
exports.needCatchLoadErrorComponents = 'b,c,f';
exports.needCatchLoadErrorComponentsList = exports.needCatchLoadErrorComponents.split(',');
exports.componentReactPath = './node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js';
exports.ignoreClassName = 'octopus-ignore';
exports.customParamsClassName = 'octopus-customData';
__exportStar(require("@kiner/octopus-shared/inner"), exports);
