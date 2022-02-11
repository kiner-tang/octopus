import { AppAPIKey, BuildInEventKey, BuildInLoadErrorEventNameKey, PageAPIKey } from '@kiner/octopus-shared';
import { ParserOptions } from '@babel/parser';
export declare const version = "0.0.1";
export declare const defaultAstParserOption: ParserOptions;
export declare const libFilePath = "./octopusLib.js";
export declare const utilFilePath = "./octopusUtil.wxs";
export declare const styleFilePath = "./app.wxss";
export declare const utilModuleName = "octopus";
export declare const libName = "octopusLib";
export declare const injectEventName = "collectDataEvent";
export declare const apiProxySymbol = "/////////apiProxy/////////";
export declare const injectSymbol = "/////////inject/////////";
export declare const exportSymbol = "/////////exports/////////";
export declare const helpersSymbol = "/////////helpers/////////";
export declare const performanceSymbol = "/////////performance/////////";
export declare const injectDepsSymbol = "/////////injectDeps/////////";
export declare const octopusActiveElemSelector = "octopusActiveElem";
export declare const buildInView = "cover-image,cover-view,match-media,movable-area,movable-view,page-container,scroll-view,share-element,swiper,swiper-item,view,icon,progress,rich-text,text,button,checkbox,checkbox-group,editor,form,input,keyboard-accessory,label,picker,picker-view,picker-view-column,radio,radio-groupslider,switch,textarea,navigator,audio,camera,image,live-player,live-pusher,video,voip-room,map,canvas,ad,ad-custom,official-account,open-data,web-view,aria-component";
export declare const injectClassName: string;
export declare const wxLibName: string;
/**
 * 内置监听事件名称字符串数组
 */
export declare const buildInEventNameStr: BuildInEventKey[];
export declare const pageApiStr: PageAPIKey[];
export declare const appApiStr: AppAPIKey[];
/**
 * 内置加载失败事件名称字符串数组
 */
export declare const buildInLoadErrorEventNameStr: BuildInLoadErrorEventNameKey[];
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
export declare const transformerPath: string;
export declare const transporterPath: string;
export declare function replaceInnerDeps(code: string): string;
export declare const ignoreClassName = "octopus-ignore";
export declare const customParamsClassName = "octopus-customData";
export * from '@kiner/octopus-shared/src/inner';
