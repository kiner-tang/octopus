import {
  AppAPI,
  AppAPIKey,
  BuildInEventKey,
  BuildInEventName,
  BuildInLoadErrorEventName,
  BuildInLoadErrorEventNameKey,
  PageAPI,
  PageAPIKey,
} from '@kiner/octopus-shared';
import { ParserOptions } from '@babel/parser';

export const version = "0.0.1";

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
export const injectDepsSymbol = `/////////injectDeps/////////`;

export const buildInView =
  'cover-image,cover-view,match-media,movable-area,movable-view,page-container,scroll-view,share-element,swiper,swiper-item,view,icon,progress,rich-text,text,button,checkbox,checkbox-group,editor,form,input,keyboard-accessory,label,picker,picker-view,picker-view-column,radio,radio-groupslider,switch,textarea,navigator,audio,camera,image,live-player,live-pusher,video,voip-room,map,canvas,ad,ad-custom,official-account,open-data,web-view,aria-component';
export const injectClassName = `${libName}-inject-class`;
export const wxLibName = `wx.${libName}`;

/**
 * 内置监听事件名称字符串数组
 */
export const buildInEventNameStr: BuildInEventKey[] = Object.keys(BuildInEventName) as BuildInEventKey[];

export const pageApiStr = Object.keys(PageAPI) as PageAPIKey[];

export const appApiStr = Object.keys(AppAPI) as AppAPIKey[];

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
export const transformerPath = '../../transformer/dist/octopus-transformer.cjs.js';
export const sharedPath = './octopus/shared';
export const transporterPath = './octopus/transporter';

export function replaceInnerDeps(code: string) {
  return code
    .replace(/require\("@kiner\/octopus-(transformer.*)"\)/g, 'require("../$1/index.js")')
    .replace(/require\("@kiner\/octopus-(shared.*)"\)/g, 'require("../$1/index.js")')
    .replace(/require\("@kiner\/octopus-(transporter.*)"\)/g, 'require("../$1/index.js")');
}

export const ignoreClassName = 'octopus-ignore';
export const customParamsClassName = 'octopus-customData';

export * from '@kiner/octopus-shared/inner';
