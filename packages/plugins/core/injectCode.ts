import { CodeGenInfo } from './codeGen';
import { camelize, camelizeRE, capitalize, isFunction, noop, proxy, upperCamelize } from '@kiner/octopus-shared';
import pkg from '../package.json';
import {
  apiProxySymbol,
  exportSymbol,
  helpersSymbol,
  injectClassName,
  injectEventName,
  injectSymbol,
  libFilePath,
  libName,
  TaroOctopusPluginsOptions,
  wxLibName,
} from './common';

/**
 * 模块代码模版
 */
const fragment = `
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([
["${libName}"],
{
  "${libFilePath}": function(
    module,
    exports,
    __webpack_require__
  ) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.throttleTime = 30;
    exports.eventHelper = {};
    exports.audioErrorCodeMap = {
      '10001':	'系统错误',
      '10002':	'网络错误',
      '10003':	'文件错误',
      '10004':	'格式错误',
      '-1':	'未知错误',
    };
    ${helpersSymbol}
    ${exportSymbol}
    ${injectSymbol}
    ${apiProxySymbol}
  }
}
]);
`;

const octopusEventCollectionCore = `
    function(e) {
       var _es = exports;
       var type = e.type
       var subType = type;
       var errorMsg = "";
       var { data } = _es.getActivePage();
       if(!type && e.errMsg === "MediaError") {
         type = "error",
         subType = 'audioLoadError'
         errorMsg = '['+e.errMsg+'] ' + _es.audioErrorCodeMap[String(e.errCode)];
         var datasource = [
          {
            touchElem: {},
            pageData: data,
            type,
            subType: subType,
            errorMsg,
            oriEvent: e,
          }
         ]
        _es.logger('触发目标元素事件['+type+': '+subType+']', datasource);
       } else {
        var eventList = _es.config.pluginOptions.registerEventList;
        var loadErrorEventList = _es.config.pluginOptions.loadErrorEventList;
        var sid = e.mpEvent.target.dataset.sid;
        var tag = _es.camelize(e.mpEvent.target.dataset.tag);
        if(
          !eventList.includes(type) &&
          (!loadErrorEventList.includes(tag) || loadErrorEventList.includes(tag) && type !== "error")
          ) return;
        if(!_es.eventHelper[sid]) {
         _es.eventHelper[sid] = {
           [type]: 0
         }
        }
        if(_es.eventHelper[sid][type] === undefined) {
         _es.eventHelper[sid][type] = 0;
        }
        if(Math.abs(_es.eventHelper[sid][type] - e.mpEvent.timeStamp) <= _es.throttleTime) return;
        _es.eventHelper[sid][type] = e.mpEvent.timeStamp;
        if(loadErrorEventList.includes(tag) && type === "error") {
          errorMsg = e.detail.errMsg;
          switch(tag) {
            case "image": {subType = "imageLoadError"} break;
            case "coverImage": {subType = "coverImageLoadError"} break;
            case "video": {subType = "videoLoadError"} break;
          }
        }
        var hitTargets = [];
        var detail = e.detail && e.detail.x !== undefined ? e.detail : {
          x: e.mpEvent.target.offsetLeft,
          y: e.mpEvent.target.offsetTop
        }
        var curEleData = _es.getViewDataBySid(sid, data.root.cn);
        var text = _es.getTextBySid(sid, curEleData);
        _es.getBoundingClientRect(".${injectClassName}").then(async (res) => {
           res.boundingClientRect.forEach(async (item) => {
             var isHit = _es.isClickTrackArea(detail, item, res.scrollOffset);
             var dataset = item.dataset;
             if(isHit){
               var target = {
                 touchElem: e._userTap ? item : {},
                 dataset,
                 pageData: data,
                 elemData: curEleData,
                 text: text,
                 type: type,
                 subType: subType,
                 errorMsg,
                 oriEvent: e,
                 curEleSid: sid
               }
               hitTargets.push(target);
             }
           });
           var datasource = hitTargets;
           // 不是用户触发的,就没有所谓的事件冒泡,因此只需要返回当前触发事件的元素即可
           if(!e._userTap) datasource = datasource.slice(hitTargets.length - 1);
           _es.logger('触发目标元素事件['+e.type+': '+subType+']', datasource);
         });
       }
    }
`;
/**
 * 生成导出代码
 * @param exportSources
 * @returns
 */
export function createExportObjectSource(exportSources: Record<string, any>): string {
  return Object.keys(exportSources)
    .map(
      (name) =>
        `exports.${name} = ${
          typeof exportSources[name] === 'string' ? exportSources[name] : JSON.stringify(exportSources[name])
        }`
    )
    .join('\n');
}


/**
 * 注入到小程序中的 api 代理
 */
 export const apiProxySourceList: Record<string, any> = {
  // request
  // upload
  // download
  // websocket
  // createInnerAudioContext
  "proxyCreateInnerAudioContext": `
    function proxyCreateInnerAudioContext() {
      var _es = exports;
      var oriApi = wx.createInnerAudioContext;
      // 由于此 api 是只读属性,没办法代理,只能在 ${wxLibName} 命名空间下新增一个 api
      _es.createInnerAudioContext = function(object) {
        var oriReturnData = wx.createInnerAudioContext(object);
        var oriOnError = oriReturnData.onError;
        oriReturnData.onError = function(handler) {
          return oriOnError(function(...args) {
            _es.${injectEventName}(...args);
            handler(...args);
          });
        }
        return oriReturnData;
      }
      return function destroy() {
        _es.createInnerAudioContext = oriApi;
      }
    }
  `
};
/**
 * api 代理入口代码
 */
export const apiProxyEntry = `
  exports.destroyProxyApi = (function(){
    ${Object.keys(apiProxySourceList).map(api => {
      return `var ${api} = (${apiProxySourceList[api]})()`;
    }).join("\n")}
    return function destroy() {
      ${Object.keys(apiProxySourceList).map(api => {
        return `${api}()`
      }).join('\n')}
    }
  })();
`;

/**
 * 模块代码框架
 * @param core
 * @returns
 */
export function createWxModuleSourceFragment(
  core: string,
  exportSources: Record<string, any> = {},
  helpers: Record<string, any> = {},
  apiProxyEntry = "",
): string {
  return fragment
    .replace(injectSymbol, core)
    .replace(exportSymbol, createExportObjectSource(exportSources))
    .replace(helpersSymbol, createExportObjectSource(helpers))
    .replace(apiProxySymbol, apiProxyEntry);
}

/**
 * 注入微信开发者工具库，方便开发者在微信开发者工具中调用
 * @type {string}
 */
export const injectLibInWxApi = `

const timer = setInterval(()=>{

  if(wx&&!${wxLibName}){
    clearInterval(timer);

    ${wxLibName} = {
      version: '${pkg.version}',
      ...exports
    };
  }

},60);
 `;
/**
 * 将函数转换成字符串
 * @param fn
 * @returns
 */
export function getFunctionStr(fn: (...params: any[]) => any) {
  return fn.toString();
}
/**
 * 对外导出的属性和方法
 */
const initExportSources = (config: TaroOctopusPluginsOptions) => ({
  config: {
    version: pkg.version,
    libName,
    libFilePath,
    loggerNamespace: 'OCTOPUS',
    pluginOptions: config,
  },
  getBoundingClientRect: getFunctionStr(function (element) {
    return new Promise((reslove) => {
      const query = wx.createSelectorQuery();
      query.selectAll(element).boundingClientRect();
      query.selectViewport().scrollOffset();
      query.exec((res) => reslove({ boundingClientRect: res[0], scrollOffset: res[1] }));
    });
  }),
  isClickTrackArea: getFunctionStr(function (clickInfo, boundingClientRect, scrollOffset) {
    if (!boundingClientRect) return false;
    const { x, y } = clickInfo; // 点击的x y坐标
    const { left, right, top, height } = boundingClientRect;
    const { scrollTop } = scrollOffset;
    // console.log(top, y, scrollTop);
    return left <= x && x <= right && scrollTop + top <= y && y <= scrollTop + top + height;
  }),
  getPrevPage: getFunctionStr(function () {
    const curPages = getCurrentPages();
    if (curPages.length > 1) {
      return curPages[curPages.length - 2];
    }
    return {};
  }),
  getActivePage: getFunctionStr(function () {
    const curPages = getCurrentPages();
    if (curPages.length) {
      return curPages[curPages.length - 1];
    }
    return {};
  }),
  logger: getFunctionStr(function (msg, ...rest) {
    const label = '[' + exports.config.loggerNamespace + ':Plugin] ' + msg;
    console.groupCollapsed(label);
    rest.forEach((item) => {
      console.log(item);
    });
    console.groupEnd();
  }),
  getViewDataBySid: `
  function getViewDataBySid(sid, cn) {
    // 根据组件id获取渲染组件的相关信息
    var _es = exports;
    var res = null;
    var source = cn;
    if(!source) {
      var { data } = _es.getActivePage();
      source = data.root.cn;
    }
    for(var i=0;i<source.length;i++) {
      var item = source[i];
      if(item.sid === sid) {
        return item
      }
      if(item.cn) {
        var ret = _es.getViewDataBySid(sid, item.cn);
        if(ret) {
          return ret;
        }
      }
    }
    return res;
  }
  `,
  getTextBySid: `
  function getTextBySid(sid, data) {
    // 根据组件id获取渲染组件的文本
    var _es = exports;
    var source = data;
    if(!source) {
      source = _es.getViewDataBySid(sid);
    }
    let target;
    if(target = (source.cn||[]).filter(item => !!item.v).map(item => item.v)) {
      if(target) return target.join("┘");
    };
    return "";
  }
  `,
  [injectEventName]: octopusEventCollectionCore,
});

/**
 * 注入到小程序中的辅助工具函数
 */
export const helpers: Record<string, any> = {
  camelizeRE: camelizeRE.toString(),
  camelize: getFunctionStr(camelize),
  capitalize: getFunctionStr(capitalize),
  upperCamelize: getFunctionStr(upperCamelize),
  isFunction: getFunctionStr(isFunction),
  noop: getFunctionStr(noop),
  proxy: getFunctionStr(proxy),
};

/**
 * 生成库文件代码
 * @returns
 */
function createLibSource(config: TaroOctopusPluginsOptions) {
  return createWxModuleSourceFragment(injectLibInWxApi, initExportSources(config), helpers, apiProxyEntry);
}
/**
 * 需要注入的库文件
 */
export const injectLibFiles = function initLibFiles(config: TaroOctopusPluginsOptions): CodeGenInfo[] {
  return [
    {
      filePath: libFilePath.substring(2),
      code: `${createLibSource(config)}`,
      prettier: true,
      prettierOptions: { semi: true, parser: 'babel' },
    },
  ];
};
