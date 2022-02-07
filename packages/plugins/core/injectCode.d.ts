import { CodeGenInfo } from './codeGen';
import { TaroOctopusPluginsOptions } from './common';
/**
 * 监听全局报错
 */
export declare const catchGlobalError: string;
/**
 * 生成导出代码
 * @param exportSources
 * @returns
 */
export declare function createExportObjectSource(exportSources: Record<string, any>): string;
/**
 * 注入到小程序中的 api 代理
 */
export declare const apiProxySourceList: Record<string, any>;
export declare const apiProxyList: string[];
/**
 * api 代理入口代码
 */
export declare function apiProxyEntry(): string;
/**
 * 模块代码框架
 * @param core
 * @returns
 */
export declare function createWxModuleSourceFragment(core: string, exportSources?: Record<string, any>, helpers?: Record<string, any>, apiProxyEntryStr?: string, performanceStr?: string): string;
/**
 * 注入微信开发者工具库，方便开发者在微信开发者工具中调用
 * @type {string}
 */
export declare const injectLibInWxApi: string;
/**
 * 将函数转换成字符串
 * @param fn
 * @returns
 */
export declare function getFunctionStr(fn: (...params: any[]) => any): string;
/**
 * 注入到小程序中的辅助工具函数
 */
export declare const helpers: Record<string, any>;
/**
 * 收集和监听页面性能指标相关代码
 */
export declare const performanceCollectCode: string;
/**
 * 需要注入的库文件
 */
export declare const injectLibFiles: (config: TaroOctopusPluginsOptions) => CodeGenInfo[];
