import { IncludeOrExclude } from '@kiner/octopus-shared';
import { IPluginsObject } from '@tarojs/service/src/utils/types';
import { CodeGenInfo } from './codeGen';
import { File } from '@babel/types';
import { ParserOptions } from '@babel/parser';
export interface WxmlNode {
    tag: string;
    attr?: {
        [x: string]: string | boolean;
    };
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
export declare enum CollectMode {
    /**
     * 默认力度，插件会给出一个常用的事件收集力度的配置，用这个配置可以满足大部分需求的数据收集力度需求
     */
    default = "default",
    /**
     * 全量力度，将会收集插件支持的所有事件的信息，适合一些复杂的事件分析需求
     */
    all = "all",
    /**
     * 自定义力度，插件将不会注入默认的收集事件，由用户通过自定义指定 complieOptions.include，complieOptions.exclude，registerEventList，loadErrorEventList 完成
     */
    custom = "custom"
}
/**
 * Taro插件选项
 */
export declare type TaroOctopusPluginsOptions = {
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
    registerEventList: string[];
    /**
     * 需要监听的资源加载失败事件列表
     */
    loadErrorEventList: string[];
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
            isSuccess?: <T = unknown>(responseData: T, res: WechatMiniprogram.RequestSuccessCallbackResult<string | WechatMiniprogram.IAnyObject | ArrayBuffer>, options: WechatMiniprogram.RequestOption<string | WechatMiniprogram.IAnyObject | ArrayBuffer>) => boolean | Promise<boolean>;
        } | boolean;
        uploadFile?: {
            /**
             * 当接口调用成功，但业务异常时，
             * 用这个方法判断接口是否请求成功，用户可以传入此方法对请求结果进行校验
             */
            isSuccess?: <T = unknown>(responseData: T, res: WechatMiniprogram.UploadFileSuccessCallbackResult, options: WechatMiniprogram.UploadFileOption) => boolean | Promise<boolean>;
        } | boolean;
        downloadFile?: {
            /**
             * 当接口调用成功，但业务异常时，
             * 用这个方法判断接口是否请求成功，用户可以传入此方法对请求结果进行校验
             */
            isSuccess?: <T = unknown>(responseData: T, options: WechatMiniprogram.DownloadFileOption) => boolean | Promise<boolean>;
        } | boolean;
    };
    /**
     * 上报通道选项
     */
    transporterOptions: {
        env: string;
    };
};
export declare type WXMLInfo = {
    fileName: string;
    ast: Root;
};
/**
 * Taro 插件生命周期内的统一数据格式，通过这个格式一路向下流传，不断的完善加工数据
 */
export declare type PluginPipelineData = {
    asts: {
        js: Record<string, File[]>;
        wxml: Record<string, string>;
    };
    pluginOptions: TaroOctopusPluginsOptions;
    ctx: IPluginsObject;
    codes: CodeGenInfo[];
    oriAssets: Record<string, any>;
};
export declare const defaultAstParserOption: ParserOptions;
export declare const libFilePath = "./octopusLib.js";
export declare const utilFilePath = "./octopusUtil.wxs";
export declare const utilModuleName = "octopus";
export declare const libName = "octopusLib";
export declare const injectEventName = "collectDataEvent";
export declare const apiProxySymbol = "/////////apiProxy/////////";
export declare const injectSymbol = "/////////inject/////////";
export declare const exportSymbol = "/////////exports/////////";
export declare const helpersSymbol = "/////////helpers/////////";
export declare const performanceSymbol = "/////////performance/////////";
export declare const buildInView = "cover-image,cover-view,match-media,movable-area,movable-view,page-container,scroll-view,share-element,swiper,swiper-item,view,icon,progress,rich-text,text,button,checkbox,checkbox-group,editor,form,input,keyboard-accessory,label,picker,picker-view,picker-view-column,radio,radio-groupslider,switch,textarea,navigator,audio,camera,image,live-player,live-pusher,video,voip-room,map,canvas,ad,ad-custom,official-account,open-data,web-view,aria-component";
export declare const injectClassName: string;
export declare const wxLibName: string;
/**
 * 内置监听事件列表
 */
export declare enum BuildInEventName {
    tap = "tap",
    click = "click",
    touchstart = "touchstart",
    touchmove = "touchmove",
    touchend = "touchend",
    touchcancel = "touchcancel",
    scroll = "scroll",
    input = "input",
    change = "change",
    focus = "focus",
    blur = "blur",
    longpress = "longpress",
    longtap = "longtap"
}
/**
 * 内置监听事件名称字符串数组
 */
export declare const buildInEventNameStr: string[];
/**
 * 内置加载失败事件
 */
export declare enum BuildInLoadErrorEventName {
    'image' = "image",
    'coverImage' = "coverImage",
    'video' = "video",
    'audio' = "audio"
}
/**
 * 内置加载失败事件名称字符串数组
 */
export declare const buildInLoadErrorEventNameStr: string[];
/**
 * taro 内部编译后模块名到微信内置部分组件的映射
 */
export declare const taroModule2wxComponent: Record<string, string>;
/**
 * 需要捕获加载失败事件的组件
 */
export declare const needCatchLoadErrorComponents = "b,c,f";
export declare const needCatchLoadErrorComponentsList: string[];
export declare const componentReactPath = "./node_modules/@tarojs/plugin-platform-weapp/dist/components-react.js";
export declare const ignoreClassName = "octopus-ignore";
export declare const customParamsClassName = "octopus-customData";
