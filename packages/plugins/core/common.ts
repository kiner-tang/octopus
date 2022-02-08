import { IncludeOrExclude } from '@kiner/octopus-shared';
import { IPluginsObject } from '@tarojs/service/src/utils/types';
import { CodeGenInfo } from './codeGen';
import { File } from '@babel/types';
import { ParserOptions } from '@babel/parser';

export interface WxmlNode {
  tag: string;
  attr?: { [x: string]: string | boolean };
  children: Array<WxmlNode | string>;
  unary: boolean;
}

export interface Root {
  tag: string;
  attr: Record<string, any>;
  children: Array<WxmlNode | string>;
  extra?: Record<string, any>;
}
/**
 * 事件收集力度模式类型
 */
export enum CollectMode {
  /**
   * 默认力度，插件会给出一个常用的事件收集力度的配置，用这个配置可以满足大部分需求的数据收集力度需求
   */
  default = 'default',
  /**
   * 全量力度，将会收集插件支持的所有事件的信息，适合一些复杂的事件分析需求
   */
  all = 'all',
  /**
   * 自定义力度，插件将不会注入默认的收集事件，由用户通过自定义指定 complieOptions.include，complieOptions.exclude，registerEventList，loadErrorEventList 完成
   */
  custom = 'custom',
  /** 如果不希望称触发自动埋点，而是希望通过 api 手动提交，则使用此模式 */
  manual = 'manual'
}

/**
 * Taro插件选项
 */
export type TaroOctopusPluginsOptions = {
  /**
   * 是否开启调试模式，若开启则会显示内置日志打印输出
   */
  debug: boolean;
  /**
   * 编译选项
   */
  complieOptions: {
    include?: IncludeOrExclude;
    exclude?: IncludeOrExclude;
  };
  /**
   * 数据收集模式
   */
  mode: CollectMode;
  /**
   * 需要收集数据的事件列表
   */
  registerEventList: BuildInEventKey[];
  /**
   * 需要监听的资源加载失败事件列表
   */
  loadErrorEventList: BuildInLoadErrorEventNameKey[];
  /**
   * 页面生命周期函数监听
   */
  pageLifecycleEventList: PageAPIKey[];
  /**
   * app生命周期函数监听
   */
  appLifecycleEventList: AppAPIKey[];
  /**
   * 需要监听的网络请求
   */
  networkApi?: {
    /**
     * http 接口请求
     */
    request?: {
      /**
       * 当接口调用成功，但业务异常时，
       * 用这个方法判断接口是否请求成功，用户可以传入此方法对请求结果进行校验
       */
      isSuccess?: <T = unknown>(
        responseData: T,
        res: WechatMiniprogram.RequestSuccessCallbackResult<string | WechatMiniprogram.IAnyObject | ArrayBuffer>,
        options: WechatMiniprogram.RequestOption<string | WechatMiniprogram.IAnyObject | ArrayBuffer>
      ) => boolean | Promise<boolean>;
    } | boolean;
    uploadFile?: {
      /**
       * 当接口调用成功，但业务异常时，
       * 用这个方法判断接口是否请求成功，用户可以传入此方法对请求结果进行校验
       */
      isSuccess?: <T = unknown>(
        responseData: T,
        res: WechatMiniprogram.UploadFileSuccessCallbackResult,
        options: WechatMiniprogram.UploadFileOption
      ) => boolean | Promise<boolean>;
    } | boolean;
    downloadFile?: {
      /**
       * 当接口调用成功，但业务异常时，
       * 用这个方法判断接口是否请求成功，用户可以传入此方法对请求结果进行校验
       */
      isSuccess?: <T = unknown>(
        responseData: T,
        options: WechatMiniprogram.DownloadFileOption
      ) => boolean | Promise<boolean>;
    } | boolean;
  };
  /**
   * 上报通道选项
   */
  transporterOptions: {
    env: string;
  };
};

export type WXMLInfo = { fileName: string; ast: Root };

/**
 * Taro 插件生命周期内的统一数据格式，通过这个格式一路向下流传，不断的完善加工数据
 */
export type PluginPipelineData = {
  asts: {
    js: Record<string, File[]>;
    wxml: Record<string, string>;
  };
  pluginOptions: TaroOctopusPluginsOptions;
  ctx: IPluginsObject;
  codes: CodeGenInfo[];
  oriAssets: Record<string, any>;
};

export const defaultAstParserOption: ParserOptions = {
  sourceType: 'module',
  plugins: [
    'typescript',
    ['decorators', { decoratorsBeforeExport: true }],
    'classProperties',
    'classPrivateProperties',
    'jsx',
  ],
};

export const libFilePath = './octopusLib.js';
export const utilFilePath = './octopusUtil.wxs';
export const utilModuleName = 'octopus';
export const libName = 'octopusLib';
export const injectEventName = 'collectDataEvent';

export const apiProxySymbol = `/////////apiProxy/////////`;
export const injectSymbol = `/////////inject/////////`;
export const exportSymbol = `/////////exports/////////`;
export const helpersSymbol = `/////////helpers/////////`;
export const performanceSymbol = `/////////performance/////////`;

export const buildInView =
  'cover-image,cover-view,match-media,movable-area,movable-view,page-container,scroll-view,share-element,swiper,swiper-item,view,icon,progress,rich-text,text,button,checkbox,checkbox-group,editor,form,input,keyboard-accessory,label,picker,picker-view,picker-view-column,radio,radio-groupslider,switch,textarea,navigator,audio,camera,image,live-player,live-pusher,video,voip-room,map,canvas,ad,ad-custom,official-account,open-data,web-view,aria-component';
export const injectClassName = `${libName}-inject-class`;
export const wxLibName = `wx.${libName}`;

/**
 * 内置监听事件列表
 */
export enum BuildInEventName {
  tap = 'tap',
  click = 'click',
  touchstart = 'touchstart',
  touchmove = 'touchmove',
  touchend = 'touchend',
  touchcancel = 'touchcancel',
  scroll = 'scroll',
  input = 'input',
  change = 'change',
  focus = 'focus',
  blur = 'blur',
  longpress = 'longpress',
  longtap = 'longtap',
}

export type BuildInEventKey =
| "tap"
| "click"
| "touchstart"
| "touchmove"
| "touchend"
| "touchcancel"
| "scroll"
| "input"
| "change"
| "focus"
| "blur"
| "longpress"
| "longtap"

/**
 * 内置监听事件名称字符串数组
 */
export const buildInEventNameStr: BuildInEventKey[] = Object.keys(BuildInEventName) as BuildInEventKey[];

export enum PageAPI {
  onPageScroll = "onPageScroll",
  onShareAppMessage = "onShareAppMessage",
  onShareTimeline = "onShareTimeline",
  onAddToFavorites = "onAddToFavorites",
  onTabItemTap = "onTabItemTap",
  onShow = "onShow",
  onHide = "onShow",
}
export const pageApiStr = Object.keys(PageAPI) as PageAPIKey[];
export type PageAPIKey =
| "onPageScroll"
| "onShareAppMessage"
| "onShareTimeline"
| "onAddToFavorites"
| "onTabItemTap"
| "onHide"
| "onShow";

export enum AppAPI {
  onLaunch = "onLaunch",
  onThemeChange = "onThemeChange",
  onUnhandledRejection = "onUnhandledRejection",
  onShow = "onShow",
  onHide = "onHide",
  onPageNotFound = "onPageNotFound",
}
export const appApiStr = Object.keys(AppAPI) as AppAPIKey[];
export type AppAPIKey =
| "onLaunch"
| "onThemeChange"
| "onUnhandledRejection"
| "onShow"
| "onHide"
| "onPageNotFound"

/**
 * 内置加载失败事件
 */
export enum BuildInLoadErrorEventName {
  'image' = 'image',
  'coverImage' = 'coverImage',
  'video' = 'video',
  'audio' = 'audio',
}
export type BuildInLoadErrorEventNameKey =
| "image"
| "coverImage"
| "video"
| "audio";
/**
 * 内置加载失败事件名称字符串数组
 */
export const buildInLoadErrorEventNameStr = Object.keys(BuildInLoadErrorEventName) as BuildInLoadErrorEventNameKey[];

/**
 * taro 内部编译后模块名到微信内置部分组件的映射
 */
export const taroModule2wxComponent: Record<string, string> = {
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
export const needCatchLoadErrorComponents = 'b,c,f';
export const needCatchLoadErrorComponentsList = needCatchLoadErrorComponents.split(',');

export const componentReactPath = './node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js';

export const ignoreClassName = 'octopus-ignore';
export const customParamsClassName = 'octopus-customData';