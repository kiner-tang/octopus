import { PlatformType } from '.';
import { join, dirname } from 'path';
import { mkdirpSync, existsSync } from 'fs-extra';
import { SourceMapConsumer } from 'source-map';
import { merge } from 'lodash';

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
/**
 * 根据平台类型从对应平台中抽取 api 并执行
 * @param platform
 * @param fnName
 * @param rest
 * @returns
 */
export async function runByFnNameWithPlatform(platform: PlatformType, fnName: string, ...rest: any[]) {
  const platformPkg = await import(`@kiner/octopus-platform/${platform}`);
  return platformPkg[fnName](...rest);
}
export type IncludeOrExclude = (RegExp | string)[];
export function isPathValid(path: string, include: IncludeOrExclude = [], exclude: IncludeOrExclude = []): boolean {
  let flag = false;
  // 首先将满足 exclude 的路径都排除掉
  exclude.forEach((mod) => {
    if (flag) return;
    if (typeof mod === 'object') {
      flag = mod.test(path);
    } else {
      flag = path.includes(mod);
    }
  });

  if (flag) return false;
  // 如果未显示指定 include 或 include 为空数组，则默认接受除 exclude 外的所有文件
  if (include.length === 0) return true;
  flag = false;
  include.forEach((mod) => {
    if (flag) return;
    if (typeof mod === 'object') {
      flag = mod.test(path);
    } else {
      flag = path.includes(mod);
    }
  });

  return flag;
}
/**
 * 根据 include 和 exclude 挑选出符合条件的路径数组
 * @param paths 路径数组
 * @param include 包含规则数组
 * @param exclude 排除规则数组
 * @returns
 */
export function pathExcludeIgnore(
  paths: string[],
  include: IncludeOrExclude = [],
  exclude: IncludeOrExclude = []
): string[] {
  return paths.filter((item) => isPathValid(item, include, exclude));
}

export function filterObjectKey(obj: Record<string, any>, paths: string[]): Record<string, any> {
  const res: Record<string, any> = {};
  paths.forEach((key) => {
    res[key] = obj[key];
  });
  return res;
}

export function fitNum(num: number, len = 2): string {
  return String(num).padStart(len, '0');
}
export function timeFormat(date: Date): string {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const H = date.getHours();
  const M = date.getMinutes();
  const S = date.getSeconds();
  const MS = date.getMilliseconds();

  return `${y}-${fitNum(m)}-${fitNum(d)} ${fitNum(H)}:${fitNum(M)}:${fitNum(S)}.${fitNum(MS, 3)}`;
}
export type Source = { source: string; filePath: string };
export async function getSourceCodeFromMap(map: string, fileName: string): Promise<Source[]> {
  const consumer = new SourceMapConsumer(map);
  return new Promise((resolve) => {
    consumer.then((res) => {
      const sources = res.sources
        .map((source) => {
          return {
            source: res.sourceContentFor(source),
            filePath: source.replace('webpack:///', '').replace('._', '').replace(/_/g, '/'),
          };
        })
        .filter((item) => !!item.source) as [];
      const outputFileName = join(__dirname, 'test', fileName);
      const outputFilePath = dirname(outputFileName);
      if (!existsSync(outputFilePath)) {
        mkdirpSync(outputFilePath);
      }
      // writeFileSync(outputFileName, sources.slice(0,1)!.join('\n'));
      resolve(sources);
    });
  });
}
/**
 * 深拷贝
 * @param target 基准对象
 * @param source 目标对象
 * @returns
 */
export function deepMergeOptions(target: Record<string, any> = {}, ...source: Record<string, any>[]) {
  return merge(target, ...source);
}
/**
 * json 转 queryStr
 * @param obj 待转换对象
 * @returns
 */
export function obj2querystr(obj: Record<string, string>, char = '|'): string {
  return Object.keys(obj)
    .map((key) => `${key}='${obj[key]}'`)
    .join(char);
}

/**
 * 识别用-作为分隔符的字符串，如："my-new-component"
 * @type {RegExp}
 */
export const camelizeRE = /-(\w)/g;

/**
 * 用于将"my-new-component"类型的文本转换成小驼峰形式"myNewComponent"
 * @param str
 * @returns {string | void | *}
 */
export const camelize = (str: string) => str.replace(camelizeRE, (a: string, b: string) => (b ? b.toUpperCase() : ''));
/**
 * 将字符串首字母转成大写
 * @type {function(*): *}
 */
export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * 将以-连接的字符串转化成大驼峰形式
 */
export const upperCamelize = (str: string) => capitalize(camelize(str.startsWith('-') ? str : `-${str}`));
