import { IPluginsObject } from '@tarojs/service/src/utils/types';
import prettier from "prettier";
import { Node, File } from "@babel/types";
import { Logger } from "./logger";
import { IncludeOrExclude } from "./utils";


/**
 * 基础管道数据流结构
 */
export type Pipeline<T = any> = {
  /**
   * 实现该方法可以将数据通过管道一层层传递下去
   * @param data 
   */
  push(data: T[]): Promise<void>;
  /**
   * 将多节管道链接起来
   * e.g.
   * const app = new BaseApp();
   * app.pipe(new TestApp1()).pipe(new TestApp2()).pipe(new TestApp3()).pipe(new Output()).pipe(new End())
   * @param _next 
   */
  pipe(_next: Pipeline<T>): Pipeline<T>;
  /**
   * 用于接受从上一节管道传递下来的数据，可进行加工后传递到下一节管道
   * @param data 
   */
  resolveData(data: T[]): T[] | Promise<T[]>;
};

/**
 * 事件类型
 */
export type EventLike<T = any> = {
  eventName: string;
  detail: T;
};
/**
 * 订阅事件回调函数类型
 */
export type EventHandler<T> = (event: EventLike<T>) => void | Promise<void>;
/**
 * 每个需要支持事件订阅发布的类都要实现这个接口
 */
export type Emitter<T> = {
  /**
   * 订阅事件
   * @param {string} eventName 事件名
   * @param {EventHandler} handler 回调
   */
  on(eventName: string, handler: EventHandler<T>): void | Promise<void>;
  /**
   * 发布事件
   * @param {string} eventName 事件名
   * @param {*} data 事件参数
   */
  emit(eventName: string, data: T): void | Promise<void>;
};

/**
 * 一个实现了管道数据流和时间的订阅发布接口的应用基础类，项目中其他类基本都需要集成此类
 */
export class BaseApp<P = any, K = any>
  implements Pipeline<P>, Emitter<K>
{
  protected logger: Logger;
  protected showInnerLog = process.env.NODE_ENV === 'development' || false;
  constructor(private appName: string = "__DEFAULT_APP_NAME__") {
    this.logger = new Logger(appName);
  }
  /**
   * 注册的事件列表，用事件名加以管理
   */
  protected readonly handlers: Record<string, EventHandler<K>[]> = {};
  /**
   * 仅内部使用，下一节管道的引用
   */
  protected next: Pipeline<P> | undefined;
  /**
   * 接受到数据后，使用 resolveData 处理获得新书局后，将新数据推送到下一节管道
   * @param data 
   */
  async push(data: P[]): Promise<void> {
    data = await this.resolveData(data);
    this.next?.push(data);
  }
  /**
   * 链接管道
   * 让 pipe 的返回值始终是下一节管道的引用，这样就可以链式调用
   * @param _next 
   * @returns 
   */
  pipe(_next: Pipeline<P>): Pipeline<P> {
    this.next = _next;
    return _next;
  }
  /**
   * 通过事件名将事件回调注册到事件列表当中
   * @param {string} eventName 事件名
   * @param {EventHandler} handler 事件回调
   */
  on(eventName: string, handler: EventHandler<K>): void | Promise<void> {
    (this.handlers[eventName] || (this.handlers[eventName] = [])).push(handler);
  }
  /**
   * 发布事件，将所有相同事件名的回调函数用 data 作为事件参数内容调用一遍
   * @param eventName 事件名
   * @param data 事件参数
   */
  emit(eventName: string, data: K): void | Promise<void> {
    this.handlers[eventName]?.forEach((fn) =>
      fn({
        eventName,
        detail: data,
      })
    );
  }
  /**
   * 数据处理，返回最新的数据对象
   * @param data 
   * @returns 
   */
  resolveData(data: P[]): P[] | Promise<P[]> {
    if(this.showInnerLog) {
      this.logger.log('数据处理完毕', data);
    }
    return data;
  }
}

/**
 * 支持平台类型
 */
export enum PlatformType {
  wx = 'wx'
}


export type CodeGenInfo = {
  filePath: string,
  code: string,
  prettier?: boolean,
  prettierOptions?: prettier.Options
}

export type CodeGenOptionInfo = {
  filePath: string,
  ast: Node
}


export class Output extends BaseApp<any> {
  constructor(namespace?: string) {
      super(namespace || "OUTPUT");
  }
  resolveData(data: any[]): any[] | Promise<any[]> {
      this.logger.log("当前数据", data);
      return data;
  }
}



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



export enum PageAPI {
  onPageScroll = "onPageScroll",
  onShareAppMessage = "onShareAppMessage",
  onShareTimeline = "onShareTimeline",
  onAddToFavorites = "onAddToFavorites",
  onTabItemTap = "onTabItemTap",
  onShow = "onShow",
  onHide = "onShow",
}

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

export type WXMLInfo = { fileName: string; ast: Root };

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