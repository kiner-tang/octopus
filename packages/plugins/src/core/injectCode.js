"use strict";
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
exports.injectLibFiles = exports.injectWxss = exports.performanceCollectCode = exports.helpers = exports.utilWxsCode = exports.createUtilWxsCode = exports.wxsCodeFrame = exports.getObjectFn = exports.getFunctionStr = exports.injectLibInWxApi = exports.createWxModuleSourceFragment = exports.depsSource = exports.injectDeps = exports.apiProxyEntry = exports.apiProxyList = exports.apiProxySourceList = exports.createExportObjectSource = exports.depsTpl = exports.catchGlobalError = void 0;
var octopus_shared_1 = require("@kiner/octopus-shared");
var common_1 = require("./common");
var _1 = require(".");
var fs_1 = require("fs");
var path_1 = require("path");
/**
 * 监听全局报错
 */
exports.catchGlobalError = "\n wx.onError((e) => {\n   _es.".concat(common_1.injectEventName, "({\n     type: \"globalCatchError\",\n     subType: \"globalCatchError\",\n     errorMsg: e.split('\\n')[2],\n     oriEvent: e\n   });\n });\n");
/**
 * 模块代码模版
 */
var fragment = "\n(wx[\"webpackJsonp\"] = wx[\"webpackJsonp\"] || []).push([\n[\"".concat(common_1.libName, "\"],\n{\n  \"").concat(common_1.libFilePath, "\": function(\n    module,\n    exports,\n    __webpack_require__\n  ) {\n    \"use strict\";\n    Object.defineProperty(exports, \"__esModule\", {\n      value: true\n    });\n    exports.throttleTime = 30;\n    exports.eventHelper = {};\n    exports.").concat(common_1.injectEventName, " = function(){};\n    exports.audioErrorCodeMap = {\n      '10001':\t'\u7CFB\u7EDF\u9519\u8BEF',\n      '10002':\t'\u7F51\u7EDC\u9519\u8BEF',\n      '10003':\t'\u6587\u4EF6\u9519\u8BEF',\n      '10004':\t'\u683C\u5F0F\u9519\u8BEF',\n      '-1':\t'\u672A\u77E5\u9519\u8BEF',\n    };\n    ").concat(exports.catchGlobalError, "\n    ").concat(common_1.helpersSymbol, "\n    ").concat(common_1.exportSymbol, "\n    ").concat(common_1.injectSymbol, "\n    ").concat(common_1.apiProxySymbol, "\n    ").concat(common_1.performanceSymbol, "\n    exports.debug = exports.config.pluginOptions.debug;\n  },\n  ").concat(_1.injectDepsSymbol, "\n}\n]);\n");
var depsTpl = function (name, content) { return "\"".concat(name, "\": function(module, exports, __webpack_require__){\n  ").concat(content, "\n}"); };
exports.depsTpl = depsTpl;
/**
 * 通用事件收集方法代码
 */
var octopusEventCollectionCore = "\n    function(e) {\n       var _es = exports;\n       var type = e.type\n       var subType = e.subType || type;\n       var isManual = !!e.manual;\n       var errorMsg = \"\";\n       var { data } = _es.getActivePage();\n       var curPages = getCurrentPages();\n       var cur = curPages[curPages.length-1] || {};\n       var { route, config } = cur;\n       var datasource = {\n         type,\n         subType,\n         isManual,\n         pageData: cur.data,\n         oriEvent: e,\n         touchElem: {},\n         customData: e.customData || {},\n         route,\n         pageConfig: config,\n         timeStamp: Date.now()\n       };\n       function collect(ds, ...log) {\n        _es.logger(...log);\n        _es.transformer(ds[0], _es.config.pluginOptions).pipe(_es.transporter());\n       }\n       if(!type && e.errMsg === \"MediaError\") {\n         type = \"error\",\n         subType = 'audioLoadError'\n         errorMsg = '['+e.errMsg+'] ' + _es.audioErrorCodeMap[String(e.errCode)];\n         datasource = [\n          {\n            ...datasource,\n            type,\n            subType: subType,\n            errorMsg,\n          }\n         ]\n         collect(datasource, '\u89E6\u53D1\u76EE\u6807\u5143\u7D20\u4E8B\u4EF6['+type+': '+subType+']', datasource);\n       } else if(type === \"requestFail\") {\n        datasource = [\n          {\n            ...datasource,\n            errorMsg: e.errorMsg,\n          }\n         ]\n         collect(datasource, '\u7F51\u7EDC\u8BF7\u6C42\u5931\u8D25['+type+': '+e.subType+']', datasource);\n       } else if(type === \"performance\") {\n        datasource = [\n          {\n            ...datasource,\n            performance: e.performance\n          }\n         ]\n         collect(datasource, '\u5C0F\u7A0B\u5E8F\u6027\u80FD\u76D1\u63A7['+type+': '+e.subType+']', datasource);\n       } else if(type === \"globalCatchError\") {\n        datasource = [\n          {\n            ...datasource,\n            errorMsg: e.errorMsg,\n          }\n         ]\n         collect(datasource, '\u5168\u5C40\u62A5\u9519\u76D1\u542C['+type+': '+e.subType+']', datasource);\n       } else if(type === \"pageApi\" || type === \"appApi\") {\n        datasource = [\n          {\n            ...datasource,\n            detail: e.detail,\n          }\n         ]\n         collect(datasource, 'App/Page\u65B9\u6CD5\u76D1\u542C['+type+': '+e.subType+']', datasource);\n       } else if(isManual && e.__inner_call__ === undefined){\n        if(".concat(JSON.stringify(common_1.buildInEventNameStr), ".includes(type) && e.oriEvent) {\n          _es.").concat(common_1.injectEventName, "({\n            ...e.oriEvent,\n            subType: e.subType,\n            __inner_call__: true\n          });\n        } else {\n          datasource = [\n            {\n              ...datasource,\n              customData: e.customData,\n            }\n           ]\n           collect(datasource, '\u624B\u52A8\u8C03\u7528api['+type+': '+e.subType+']', datasource);\n        }\n       } else {\n        var eventList = _es.config.pluginOptions.registerEventList;\n        var loadErrorEventList = _es.config.pluginOptions.loadErrorEventList;\n        var sid = e.mpEvent.target.dataset.sid;\n        var customData = _es.getCustomDataBySid(sid, data.root.cn);\n        var tag = _es.camelize(e.mpEvent.target.dataset.tag);\n        if(\n          !eventList.includes(type) &&\n          (!loadErrorEventList.includes(tag) || loadErrorEventList.includes(tag) && type !== \"error\")\n          ) return;\n        if(!_es.eventHelper[sid]) {\n         _es.eventHelper[sid] = {\n           [type]: 0\n         }\n        }\n        if(_es.eventHelper[sid][type] === undefined) {\n         _es.eventHelper[sid][type] = 0;\n        }\n        if(Math.abs(_es.eventHelper[sid][type] - e.mpEvent.timeStamp) <= _es.throttleTime) return;\n        _es.eventHelper[sid][type] = e.mpEvent.timeStamp;\n        if(loadErrorEventList.includes(tag) && type === \"error\") {\n          errorMsg = e.detail.errMsg;\n          switch(tag) {\n            case \"image\": {subType = \"imageLoadError\"} break;\n            case \"coverImage\": {subType = \"coverImageLoadError\"} break;\n            case \"video\": {subType = \"videoLoadError\"} break;\n          }\n        }\n        var hitTargets = [];\n        var detail = e.detail && e.detail.x !== undefined ? e.detail : {\n          x: e.mpEvent.target.offsetLeft,\n          y: e.mpEvent.target.offsetTop\n        }\n        var curEleData = _es.getViewDataBySid(sid, data.root.cn);\n        if(curEleData.cl === \"").concat(_1.ignoreClassName, "\" && !e.__inner_call__) return;\n        var text = _es.getTextBySid(sid, curEleData);\n        _es.getBoundingClientRect(\".").concat(common_1.injectClassName, "\").then(async (res) => {\n           res.boundingClientRect.forEach(async (item) => {\n             var isHit = _es.isClickTrackArea(detail, item, res.scrollOffset);\n             var dataset = item.dataset;\n             if(isHit){\n               var target = {\n                 ...datasource,\n                 touchElem: e._userTap ? item : {},\n                 dataset,\n                 elemData: curEleData,\n                 text: text,\n                 type: type,\n                 errorMsg,\n                 curEleSid: sid,\n                 customData\n               }\n               hitTargets.push(target);\n             }\n           });\n           datasource = hitTargets;\n           // \u4E0D\u662F\u7528\u6237\u89E6\u53D1\u7684,\u5C31\u6CA1\u6709\u6240\u8C13\u7684\u4E8B\u4EF6\u5192\u6CE1,\u56E0\u6B64\u53EA\u9700\u8981\u8FD4\u56DE\u5F53\u524D\u89E6\u53D1\u4E8B\u4EF6\u7684\u5143\u7D20\u5373\u53EF\n           if(!e._userTap) datasource = datasource.slice(hitTargets.length - 1);\n           collect(datasource, '\u89E6\u53D1\u76EE\u6807\u5143\u7D20\u4E8B\u4EF6['+e.type+': '+subType+']', datasource);\n         });\n       }\n    }\n");
/**
 * 生成导出代码
 * @param exportSources
 * @returns
 */
function createExportObjectSource(exportSources) {
    return Object.keys(exportSources)
        .map(function (name) {
        return "exports.".concat(name, " = ").concat(typeof exportSources[name] === 'string' ? exportSources[name] : JSON.stringify(exportSources[name]));
    })
        .join('\n');
}
exports.createExportObjectSource = createExportObjectSource;
/**
 * 注入到小程序中的 api 代理
 */
exports.apiProxySourceList = {
    // request
    proxyRequest: "\n    function proxyRequest() {\n      var _es = exports;\n      var config = _es.config.pluginOptions.networkApi.request;\n      var listen = !!config;\n      var isSuccess = function (){return true};\n      if(listen && config.isSuccess) {\n        var res = __webpack_require__(config.isSuccess);\n        isSuccess = res.isSuccess;\n      }\n      var oriApi = wx.request;\n      _es.request = function (options) {\n        var oriFailFn = options.fail || _es.noop;\n        var oriSuccessFn = options.success || _es.noop;\n        options.fail = function(res) {\n          listen && _es.".concat(common_1.injectEventName, "({\n            detail: res,\n            type: \"requestFail\",\n            subType: \"requestFail\",\n            requestOptions: options,\n            errorMsg: res.errMsg\n          });\n          oriFailFn(res);\n        }\n        options.success = function(res) {\n          if(res.statusCode === 200) {\n            if(!isSuccess(res.data, res, options)) {\n              listen && _es.").concat(common_1.injectEventName, "({\n                detail: res,\n                type: \"requestFail\",\n                subType: \"businessFail\",\n                requestOptions: options,\n                errorMsg: res.errMsg\n              })\n            }\n          } else {\n            listen && _es.").concat(common_1.injectEventName, "({\n              detail: res,\n              type: \"requestFail\",\n              subType: \"businessFail\",\n              requestOptions: options,\n              errorMsg: res.errMsg\n            })\n          }\n          oriSuccessFn(res);\n        }\n        oriApi(options);\n      }\n      return function destroy() {\n        _es.request = oriApi;\n      }\n    }\n  "),
    // proxyUploadFile
    proxyUploadFile: "\n    function proxyUploadFile() {\n      var _es = exports;\n      var config = _es.config.pluginOptions.networkApi.uploadFile;\n      var listen = !!config;\n      var isSuccess = function (){return true};\n      if(listen && config.isSuccess) {\n        var res = __webpack_require__(config.isSuccess);\n        isSuccess = res.isSuccess;\n      }\n      var oriApi = wx.uploadFile;\n      _es.uploadFile = function (options) {\n        var oriFailFn = options.fail || _es.noop;\n        var oriSuccessFn = options.success || _es.noop;\n        options.fail = function(res) {\n          listen && _es.".concat(common_1.injectEventName, "({\n            detail: res,\n            type: \"requestFail\",\n            subType: \"uploadFail\",\n            requestOptions: options,\n            errorMsg: res.errMsg\n          });\n          oriFailFn(res);\n        }\n        options.success = async function(res) {\n          if(res.statusCode === 200) {\n            if(!isSuccess(res.data, res, options)) {\n              listen && _es.").concat(common_1.injectEventName, "({\n                detail: res,\n                type: \"requestFail\",\n                subType: \"uploadFail\",\n                requestOptions: options,\n                errorMsg: res.errMsg\n              })\n            }\n          } else {\n            listen && _es.").concat(common_1.injectEventName, "({\n              detail: res,\n              type: \"requestFail\",\n              subType: \"uploadFail\",\n              requestOptions: options,\n              errorMsg: res.errMsg\n            })\n          }\n          oriSuccessFn(res);\n        }\n        oriApi(options);\n      }\n      return function destroy() {\n        _es.uploadFile = oriApi;\n      }\n    }\n  "),
    // downloadFile
    proxyDownloadFile: "\n    function proxyDownloadFile() {\n      var _es = exports;\n      var config = _es.config.pluginOptions.networkApi.downloadFile;\n      var listen = !!config;\n      var isSuccess = function (){return true};\n      if(listen && config.isSuccess) {\n        var res = __webpack_require__(config.isSuccess);\n        isSuccess = res.isSuccess;\n      }\n      var oriApi = wx.downloadFile;\n      _es.downloadFile = function (options) {\n        var oriFailFn = options.fail || _es.noop;\n        var oriSuccessFn = options.success || _es.noop;\n        options.fail = function(res) {\n          listen && _es.".concat(common_1.injectEventName, "({\n            detail: res,\n            type: \"requestFail\",\n            subType: \"downloadFail\",\n            requestOptions: options,\n            errorMsg: res.errMsg\n          });\n          oriFailFn(res);\n        }\n        options.success = function(res) {\n          if(res.statusCode === 200) {\n            if(!isSuccess(res.data, res, options)) {\n              listen && _es.").concat(common_1.injectEventName, "({\n                detail: res,\n                type: \"requestFail\",\n                subType: \"downloadFail\",\n                requestOptions: options,\n                errorMsg: res.errMsg\n              })\n            }\n          } else {\n            listen && _es.").concat(common_1.injectEventName, "({\n              detail: res,\n              type: \"requestFail\",\n              subType: \"downloadFail\",\n              requestOptions: options,\n              errorMsg: res.errMsg\n            })\n          }\n          oriSuccessFn(res);\n        }\n        oriApi(options);\n      }\n      return function destroy() {\n        _es.downloadFile = oriApi;\n      }\n    }\n  "),
    // app onLaunch,onShow,onHide,onPageNotFount,onUnhandledRejection,onThemeChange
    proxyApp: "\n  function proxyApp() {\n    var _es = exports;\n    var eventList = _es.config.pluginOptions.appLifecycleEventList;\n    var oriApi = App;\n    App = function(options) {\n      [\"onLaunch\",\"onThemeChange\",\"onUnhandledRejection\",\"onShow\",\"onHide\",\"onPageNotFound\"].forEach(method => {\n        var oriFn = options[method];\n        options[method] = function(opt) {\n          if(!_es.eventHelper[method]) {\n            _es.eventHelper[method] = 0;\n          }\n          if(Math.abs(_es.eventHelper[method] - Date.now()) >= _es.throttleTime) {\n            eventList.includes(method) && _es.".concat(common_1.injectEventName, "({\n              type: \"appApi\",\n              subType: method,\n              detail: opt\n            });\n            _es.eventHelper[method] = Date.now();\n          }\n          return oriFn && oriFn.call(this,opt);\n        }\n        return oriApi(options);\n      });\n    }\n    return function destroy() {\n      App = oriApi;\n    }\n  }\n  "),
    // page onPageScroll,onShareAppMessage,onShareTimeline,onAddToFavorites,onTabItemTap,onShow,onHide
    proxyPage: "\n    function proxyPage() {\n      var _es = exports;\n      var eventList = _es.config.pluginOptions.pageLifecycleEventList;\n      var oriApi = Page;\n      Page = function(options) {\n        [\"onShow\",\"onHide\",\"onPageScroll\",\"onTabItemTap\"].forEach(method => {\n          var oriFn = options[method];\n          options[method] = function(opt) {\n            eventList.includes(method) && _es.".concat(common_1.injectEventName, "({\n              type: \"pageApi\",\n              subType: method,\n              detail: opt\n            });\n            return oriFn && oriFn.call(this,opt);\n          }\n        });\n        [\"onShareAppMessage\",\"onShareTimeline\",\"onAddToFavorites\"].forEach(method => {\n          var oriFn = options[method];\n          if(!oriFn){\n            console.warn(\"\uD83D\uDC19 \u8BF7\u5148\u5728\u9875\u9762\u4E0A\u914D\u7F6E'\"+method+\"'\");\n            return;\n          }\n          options[method] = function(opt) {\n            eventList.includes(method) && _es.").concat(common_1.injectEventName, "({\n              type: \"pageApi\",\n              subType: method,\n              detail: opt\n            });\n            return oriFn.call(this, opt);\n          }\n        });\n        oriApi(options);\n      }\n      return function destroy() {\n        Page = oriApi;\n      }\n    }\n  "),
    // websocket
    // todo
    // createInnerAudioContext
    proxyCreateInnerAudioContext: "\n    function proxyCreateInnerAudioContext() {\n      var _es = exports;\n      var oriApi = wx.createInnerAudioContext;\n      // \u7531\u4E8E\u6B64 api \u662F\u53EA\u8BFB\u5C5E\u6027,\u6CA1\u529E\u6CD5\u4EE3\u7406,\u53EA\u80FD\u5728 ".concat(common_1.wxLibName, " \u547D\u540D\u7A7A\u95F4\u4E0B\u65B0\u589E\u4E00\u4E2A api\n      _es.createInnerAudioContext = function(object) {\n        var oriReturnData = wx.createInnerAudioContext(object);\n        var oriOnError = oriReturnData.onError;\n        oriReturnData.onError = function(handler) {\n          return oriOnError(function(...args) {\n            _es.").concat(common_1.injectEventName, "(...args);\n            handler(...args);\n          });\n        }\n        return oriReturnData;\n      }\n      return function destroy() {\n        _es.createInnerAudioContext = oriApi;\n      }\n    }\n  "),
};
exports.apiProxyList = Object.keys(exports.apiProxySourceList);
/**
 * api 代理入口代码
 */
function apiProxyEntry() {
    return "\n  exports.destroyProxyApi = (function(){\n    ".concat(exports.apiProxyList
        .map(function (api) {
        return "var ".concat(api, " = (").concat(exports.apiProxySourceList[api], ")()");
    })
        .join('\n'), "\n    return function destroy() {\n      ").concat(exports.apiProxyList
        .map(function (api) {
        return "".concat(api, "()");
    })
        .join('\n'), "\n    }\n  })();\n");
}
exports.apiProxyEntry = apiProxyEntry;
var fnMap = {};
function injectDeps(name, content) {
    return "\n  \"".concat(name, "\": function(\n    module,\n    exports,\n    __webpack_require__\n  ) {\n    ").concat(content, "\n  }\n  ");
}
exports.injectDeps = injectDeps;
var depsSource = function () {
    return __spreadArray([
        injectDeps(_1.transformerPath, (0, fs_1.readFileSync)((0, path_1.resolve)(__dirname, _1.transformerPath), 'utf-8')),
        injectDeps(_1.transporterPath, (0, fs_1.readFileSync)((0, path_1.resolve)(__dirname, _1.transporterPath), 'utf-8'))
    ], Object.keys(fnMap).map(function (filePath) {
        var keys = filePath.split('_');
        var fnName = keys[keys.length - 1];
        return injectDeps(filePath, "\n      \"use strict\";\n      Object.defineProperty(exports, \"__esModule\", {\n        value: true\n      });\n      exports.".concat(fnName, " = ").concat(fnMap[filePath].toString(), "\n      "));
    }), true).join(',\n');
};
exports.depsSource = depsSource;
/**
 * 模块代码框架
 * @param core
 * @returns
 */
function createWxModuleSourceFragment(core, exportSources, helpers, apiProxyEntryStr, performanceStr) {
    if (exportSources === void 0) { exportSources = {}; }
    if (helpers === void 0) { helpers = {}; }
    if (apiProxyEntryStr === void 0) { apiProxyEntryStr = ''; }
    if (performanceStr === void 0) { performanceStr = ''; }
    return fragment
        .replace(common_1.injectSymbol, core)
        .replace(common_1.exportSymbol, createExportObjectSource(exportSources))
        .replace(common_1.helpersSymbol, createExportObjectSource(helpers))
        .replace(common_1.apiProxySymbol, apiProxyEntryStr)
        .replace(common_1.performanceSymbol, performanceStr)
        .replace(_1.injectDepsSymbol, (0, exports.depsSource)())
        .replace(/'(__webpack_require__.*)'/g, '$1');
}
exports.createWxModuleSourceFragment = createWxModuleSourceFragment;
/**
 * 注入微信开发者工具库，方便开发者在微信开发者工具中调用
 * @type {string}
 */
exports.injectLibInWxApi = "\n\nconst timer = setInterval(()=>{\n\n  if(wx){\n    clearInterval(timer);\n    if(!".concat(common_1.wxLibName, ") {\n      ").concat(common_1.wxLibName, " = {\n        version: '").concat(common_1.version, "',\n        ...exports\n      };\n    }\n  }\n\n},60);\n ");
/**
 * 将函数转换成字符串
 * @param fn
 * @returns
 */
function getFunctionStr(fn) {
    return fn.toString();
}
exports.getFunctionStr = getFunctionStr;
function getObjectFn(obj, fnKeyPath, keypath) {
    if (keypath === void 0) { keypath = []; }
    Object.keys(obj).forEach(function (key) {
        keypath.push(key);
        if (typeof obj[key] === 'function') {
            var curKeyPath = keypath.join('_');
            fnKeyPath[curKeyPath] = obj[key];
            obj[key] = curKeyPath;
        }
        else if (typeof obj[key] === 'object') {
            getObjectFn(obj[key], fnKeyPath, keypath);
        }
        keypath.pop();
    });
}
exports.getObjectFn = getObjectFn;
/**
 * 对外导出的属性和方法
 */
var initExportSources = function (config) {
    var _a;
    getObjectFn(config, fnMap);
    return _a = {
            config: {
                version: common_1.version,
                libName: common_1.libName,
                libFilePath: common_1.libFilePath,
                loggerNamespace: 'OCTOPUS',
                pluginOptions: config,
            },
            getBoundingClientRect: getFunctionStr(function (element) {
                return new Promise(function (reslove) {
                    var query = wx.createSelectorQuery();
                    query.selectAll(element).boundingClientRect();
                    query.selectViewport().scrollOffset();
                    query.exec(function (res) { return reslove({ boundingClientRect: res[0], scrollOffset: res[1] }); });
                });
            }),
            isClickTrackArea: getFunctionStr(function (clickInfo, boundingClientRect, scrollOffset) {
                if (!boundingClientRect)
                    return false;
                var x = clickInfo.x, y = clickInfo.y; // 点击的x y坐标
                var left = boundingClientRect.left, right = boundingClientRect.right, top = boundingClientRect.top, height = boundingClientRect.height;
                var scrollTop = scrollOffset.scrollTop;
                return left <= x && x <= right && scrollTop + top <= y && y <= scrollTop + top + height;
            }),
            getPrevPage: getFunctionStr(function () {
                var curPages = getCurrentPages();
                if (curPages.length > 1) {
                    return curPages[curPages.length - 2];
                }
                return {};
            }),
            getActivePage: getFunctionStr(function () {
                var curPages = getCurrentPages();
                if (curPages.length) {
                    return curPages[curPages.length - 1];
                }
                return {};
            }),
            logger: getFunctionStr(function (msg) {
                var rest = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    rest[_i - 1] = arguments[_i];
                }
                if (!exports.debug)
                    return;
                var label = '[' + exports.config.loggerNamespace + ':Plugin] ' + msg;
                console.groupCollapsed(label);
                rest.forEach(function (item) {
                    console.log(item);
                });
                console.groupEnd();
            }),
            showViewBySid: "\n    function showViewBySid(sid){\n      const query = wx.createSelectorQuery();\n      const nodes = query.selectAll('.'+sid)\n      nodes.boundingClientRect();\n      query.selectViewport().scrollOffset();\n      nodes.fields({\n        dataset: true,\n        size: true,\n        scrollOffset: true,\n        properties: ['scrollX', 'scrollY'],\n        computedStyle: ['margin', 'backgroundColor'],\n        context: true,\n      });\n      query.exec(function(res){\n        exports.logger('\u9009\u4E2D\u5143\u7D20\u76F8\u5173\u4FE1\u606F[\u5206\u522B\u4E3A\uFF1A\u5143\u7D20\u7684rect\u4FE1\u606F\uFF08boundingClientRect\uFF09\u3001\u89C6\u7A97\u4FE1\u606F\uFF08selectViewport\uFF09\u3001\u5143\u7D20\u8BE6\u7EC6\u5B57\u6BB5\u4FE1\u606F\uFF08fields\uFF09]:',...res);\n      });\n      const curPages = getCurrentPages();\n      const cur = curPages[curPages.length-1];\n      cur.setData({root: {...cur.data.root, ".concat(common_1.octopusActiveElemSelector, ": sid}});\n      wx.pageScrollTo({selector: '.'+sid});\n      return \"[").concat(common_1.wxLibName, ".showViewBySid] \u9009\u4E2D\u5143\u7D20\u3010\"+sid+\"\u3011\u6267\u884C\u6210\u529F\";\n    }\n    "),
            cancelShowView: "\n    function cancelShowView(){\n      const curPages = getCurrentPages();\n      const cur = curPages[curPages.length-1];\n      cur.setData({root: {...cur.data.root, ".concat(common_1.octopusActiveElemSelector, ": ''}});\n    }\n    "),
            getViewDataBySid: "\n    function getViewDataBySid(sid, cn) {\n      // \u6839\u636E\u7EC4\u4EF6id\u83B7\u53D6\u6E32\u67D3\u7EC4\u4EF6\u7684\u76F8\u5173\u4FE1\u606F\n      var _es = exports;\n      var res = null;\n      var source = cn;\n      if(!source) {\n        var { data } = _es.getActivePage();\n        source = data.root.cn;\n      }\n      for(var i=0;i<source.length;i++) {\n        var item = source[i];\n        if(item.sid === sid) {\n          return item\n        }\n        if(item.cn) {\n          var ret = _es.getViewDataBySid(sid, item.cn);\n          if(ret) {\n            return ret;\n          }\n        }\n      }\n      return res;\n    }\n    ",
            flatCn: "\n    function flatCn(cn) {\n      var res = [];\n      function _flatCn(_cn) {\n        _cn.forEach(item => {\n          item.sid && res.push(item);\n          if(item.cn) {\n            _flatCn(item.cn);\n          }\n        });\n      }\n      _flatCn(cn);\n      return res;\n    }\n    ",
            getCustomDataBySid: "\n    function getCustomDataBySid(sid, cn) {\n      var _es = exports;\n      var { data } = _es.getActivePage();\n      var { customData } = data.root;\n      if(!cn) cn = data.root.cn;\n      var flatedCn = _es.flatCn(cn);\n      var targetIdx = flatedCn.findIndex(item => item.sid === sid);\n      if(targetIdx !== -1) {\n        // \u9700\u8981\u51CF\u53BB\u6839\u8282\u70B9\u7684\u6570\u91CF1\n        return customData[targetIdx - 1] || {};\n      }\n      return {};\n    }\n    ",
            getTextBySid: "\n    function getTextBySid(sid, data) {\n      // \u6839\u636E\u7EC4\u4EF6id\u83B7\u53D6\u6E32\u67D3\u7EC4\u4EF6\u7684\u6587\u672C\n      var _es = exports;\n      var source = data;\n      if(!source) {\n        source = _es.getViewDataBySid(sid);\n      }\n      let target;\n      if(target = (source.cn||[]).filter(item => !!item.v).map(item => item.v)) {\n        if(target) return target.join(\"\u2518\");\n      };\n      return \"\";\n    }\n    ",
            // todo 通过 api 手动添加埋点事件
            pushData: "\n    function pushData(data) {\n      var _es = exports;\n      var {type, oriEvent} = data;\n      if(".concat(JSON.stringify(common_1.buildInEventNameStr), ".includes(type) && !oriEvent) {\n        console.warn(\"\uD83D\uDC19 \u624B\u52A8\u7684\u89E6\u53D1\u4E8B\u4EF6\u7C7B\u578B: \"+type+\" \u4E3A\u5185\u90E8\u4E8B\u4EF6, \u4F60\u9700\u8981\u5728\u8C03\u7528\u65F6\u5C06\u539F\u59CB\u4E8B\u4EF6\u5BF9\u8C61\u901A\u8FC7 oriEvent \u5B57\u6BB5\u4F20\u5165\");\n        return;\n      }\n      _es.").concat(common_1.injectEventName, "({\n        ...data,\n        manual: true\n      });\n    }\n    ")
        },
        _a[common_1.injectEventName] = octopusEventCollectionCore,
        _a.transformer = "\n      function transformer(datasource, pluginOptions) {\n        var _es = exports;\n        if(_es.curTransformer) {\n          _es.curTransformer.push([\n            {\n              datasource,\n              pluginOptions,\n            }\n          ])\n          return _es.curTransformer;\n        }\n        var { Transformer } = __webpack_require__(\"".concat(_1.transformerPath, "\");\n        return (_es.curTransformer = new Transformer(datasource, pluginOptions));\n      }\n    "),
        _a.transporter = "\n      function transporter() {\n        var _es = exports;\n        if(_es.curTransporter) {\n          return _es.curTransporter;\n        }\n        var { Transporter } = __webpack_require__(\"".concat(_1.transporterPath, "\");\n        return (_es.curTransporter = new Transporter());\n      }\n    "),
        _a;
};
exports.wxsCodeFrame = "\n  module.exports = {\n    ".concat(common_1.injectSymbol, "\n  };\n");
function createUtilWxsCode(prop) {
    var code = Object.keys(prop)
        .map(function (item) { return "".concat(item, ": ").concat(getFunctionStr(prop[item])); })
        .join(',');
    return exports.wxsCodeFrame.replace(common_1.injectSymbol, code);
}
exports.createUtilWxsCode = createUtilWxsCode;
exports.utilWxsCode = createUtilWxsCode({
    s: function (o) {
        return JSON.stringify(o);
    },
    c: function (activeElemSid, curSid, selector) {
        return activeElemSid === curSid ? selector : '';
    }
});
/**
 * 注入到小程序中的辅助工具函数
 */
exports.helpers = {
    camelizeRE: octopus_shared_1.camelizeRE.toString(),
    camelize: getFunctionStr(octopus_shared_1.camelize),
    capitalize: getFunctionStr(octopus_shared_1.capitalize),
    upperCamelize: getFunctionStr(octopus_shared_1.upperCamelize),
    isFunction: getFunctionStr(octopus_shared_1.isFunction),
    noop: getFunctionStr(octopus_shared_1.noop),
    proxy: getFunctionStr(octopus_shared_1.proxy),
};
/**
 * 收集和监听页面性能指标相关代码
 */
exports.performanceCollectCode = "\n  var _es = exports;\n  var performance = wx.getPerformance();\n  var observer = performance.createObserver((entryList) => {\n    _es.".concat(common_1.injectEventName, "({\n      type: \"performance\",\n      subType: \"performance\",\n      performance: entryList._list\n    })\n  })\n  observer.observe({ entryTypes: ['render', 'script', 'navigation'] })\n");
exports.injectWxss = "\n.".concat(common_1.octopusActiveElemSelector, " {\n  box-shadow: 0 0 10px #333;\n}\n");
/**
 * 生成库文件代码
 * @returns
 */
function createLibSource(config) {
    var source = initExportSources(config);
    return createWxModuleSourceFragment(exports.injectLibInWxApi, source, exports.helpers, apiProxyEntry(), exports.performanceCollectCode);
}
/**
 * 需要注入的库文件
 */
var injectLibFiles = function initLibFiles(config) {
    return [
        {
            filePath: common_1.libFilePath.substring(2),
            code: "".concat(createLibSource(config)),
            prettier: true,
            prettierOptions: { semi: true, parser: 'babel' },
        },
        {
            filePath: common_1.utilFilePath.substring(2),
            code: exports.utilWxsCode,
            prettier: true,
            prettierOptions: { semi: true, parser: 'babel' },
        },
        {
            filePath: common_1.styleFilePath.substring(2),
            code: exports.injectWxss,
            prettier: true,
            prettierOptions: { semi: true, parser: 'css' },
            isAppend: true
        },
    ];
};
exports.injectLibFiles = injectLibFiles;
