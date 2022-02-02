/**
 * 空函数
 */
export const noop: () => void = () => {};
/**
 * 判断传入的是否是函数
 * @param fn
 * @returns
 */
export const isFunction: (fn: unknown) => boolean = (fn: unknown) => typeof fn === 'function';
/**
 * 注入函数类型
 */
export type ProxyInjectFn = (...args: unknown[]) => unknown;
/**
 * 代理原始对象并注入指定代码实现特定逻辑
 * @param target 原始对象
 * @param inject 待注入函数
 * @param propNameList 属性列表，默认为 target 中所有的属性名，可指定只针对某几个属性名进行代理
 * @returns
 */
export function proxy(
  target: Record<string, any>,
  inject: ProxyInjectFn = noop,
  propNameList: string[] = Object.keys(target)
): Record<string, any> {
  propNameList.forEach((propName) => {
    const val = target[propName];
    if (isFunction(val)) {
      target[propName] = (...args: unknown[]) => {
        inject(...args);
        return val(...args);
      };
    }
  });
  return target;
}

function random(c: string): string {
  const r: number = (Math.random() * 16) | 0;
  const v: number = c === 'x' ? r : (r & 0x3) | 0x8;
  return v.toString(16);
}

const guidSet: Set<string> = new Set();
const shortGuidSet: Set<string> = new Set();

/**
 * 生成长 guid 全局唯一
 * @returns
 */
export function guid(): string {
  let curId: string;
  while (guidSet.has((curId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, random))));
  guidSet.add(curId);
  return curId;
}

/**
 * 生成短 guid 全局唯一
 * @returns
 */
export function shortid(): string {
  let curId: string;
  while (shortGuidSet.has((curId = 'xxxx-4xxx-yxxx'.replace(/[xy]/g, random))));
  shortGuidSet.add(curId);
  return curId;
}
