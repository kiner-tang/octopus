"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentReactPath = exports.needCatchLoadErrorComponentsList = exports.needCatchLoadErrorComponents = exports.taroModule2wxComponent = exports.buildInLoadErrorEventNameStr = exports.BuildInLoadErrorEventName = exports.buildInEventNameStr = exports.BuildInEventName = exports.wxLibName = exports.injectClassName = exports.buildInView = exports.helpersSymbol = exports.exportSymbol = exports.injectSymbol = exports.apiProxySymbol = exports.injectEventName = exports.libName = exports.libFilePath = exports.defaultAstParserOption = exports.CollectMode = void 0;
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
})(CollectMode = exports.CollectMode || (exports.CollectMode = {}));
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
exports.libName = 'octopusLib';
exports.injectEventName = 'collectDataEvent';
exports.apiProxySymbol = "/////////apiProxy/////////";
exports.injectSymbol = "/////////inject/////////";
exports.exportSymbol = "/////////exports/////////";
exports.helpersSymbol = "/////////helpers/////////";
exports.buildInView = "cover-image,cover-view,match-media,movable-area,movable-view,page-container,scroll-view,share-element,swiper,swiper-item,view,icon,progress,rich-text,text,button,checkbox,checkbox-group,editor,form,input,keyboard-accessory,label,picker,picker-view,picker-view-column,radio,radio-groupslider,switch,textarea,navigator,audio,camera,image,live-player,live-pusher,video,voip-room,map,canvas,ad,ad-custom,official-account,open-data,web-view,aria-component";
exports.injectClassName = "".concat(exports.libName, "-inject-class");
exports.wxLibName = "wx.".concat(exports.libName);
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
/**
 * 内置监听事件名称字符串数组
 */
exports.buildInEventNameStr = Object.keys(BuildInEventName);
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
/**
 * 内置加载失败事件名称字符串数组
 */
exports.buildInLoadErrorEventNameStr = Object.keys(BuildInLoadErrorEventName);
/**
 * taro 内部编译后模块名到微信内置部分组件的映射
 */
exports.taroModule2wxComponent = {
    a: "button",
    b: "cover-image",
    c: "image",
    d: "input",
    e: "text",
    f: "video",
    g: "view",
};
/**
 * 需要捕获加载失败事件的组件
 */
exports.needCatchLoadErrorComponents = "b,c,f";
exports.needCatchLoadErrorComponentsList = exports.needCatchLoadErrorComponents.split(',');
exports.componentReactPath = "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js";
