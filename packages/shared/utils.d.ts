import { PlatformType } from '.';
/**
 * 空函数
 */
export declare const noop: () => void;
/**
 * 判断传入的是否是函数
 * @param fn
 * @returns
 */
export declare const isFunction: (fn: unknown) => boolean;
/**
 * 注入函数类型
 */
export declare type ProxyInjectFn = (...args: unknown[]) => unknown;
/**
 * 代理原始对象并注入指定代码实现特定逻辑
 * @param target 原始对象
 * @param inject 待注入函数
 * @param propNameList 属性列表，默认为 target 中所有的属性名，可指定只针对某几个属性名进行代理
 * @returns
 */
export declare function proxy(target: Record<string, any>, inject?: ProxyInjectFn, propNameList?: string[]): Record<string, any>;
/**
 * 生成长 guid 全局唯一
 * @returns
 */
export declare function guid(): string;
/**
 * 生成短 guid 全局唯一
 * @returns
 */
export declare function shortid(): string;
/**
 * 根据平台类型从对应平台中抽取 api 并执行
 * @param platform
 * @param fnName
 * @param rest
 * @returns
 */
export declare function runByFnNameWithPlatform(platform: PlatformType, fnName: string, ...rest: any[]): Promise<any>;
export declare type IncludeOrExclude = (RegExp | string)[];
export declare function isPathValid(path: string, include?: IncludeOrExclude, exclude?: IncludeOrExclude): boolean;
/**
 * 根据 include 和 exclude 挑选出符合条件的路径数组
 * @param paths 路径数组
 * @param include 包含规则数组
 * @param exclude 排除规则数组
 * @returns
 */
export declare function pathExcludeIgnore(paths: string[], include?: IncludeOrExclude, exclude?: IncludeOrExclude): string[];
export declare function filterObjectKey(obj: Record<string, any>, paths: string[]): Record<string, any>;
export declare function fitNum(num: number, len?: number): string;
export declare function timeFormat(date: Date): string;
export declare type Source = {
    source: string;
    filePath: string;
};
export declare function getSourceCodeFromMap(map: string, fileName: string): Promise<Source[]>;
/**
 * 深拷贝
 * @param target 基准对象
 * @param source 目标对象
 * @returns
 */
export declare function deepMergeOptions(target?: Record<string, any>, ...source: Record<string, any>[]): any;
/**
 * json 转 queryStr
 * @param obj 待转换对象
 * @returns
 */
export declare function obj2querystr(obj: Record<string, string>, char?: string): string;
/**
 * 识别用-作为分隔符的字符串，如："my-new-component"
 * @type {RegExp}
 */
export declare const camelizeRE: RegExp;
/**
 * 用于将"my-new-component"类型的文本转换成小驼峰形式"myNewComponent"
 * @param str
 * @returns {string | void | *}
 */
export declare const camelize: (str: string) => string;
/**
 * 将字符串首字母转成大写
 * @type {function(*): *}
 */
export declare const capitalize: (str: string) => string;
/**
 * 将以-连接的字符串转化成大驼峰形式
 */
export declare const upperCamelize: (str: string) => string;
