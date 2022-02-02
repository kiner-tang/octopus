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
