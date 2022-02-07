import { IPluginContext } from '@tarojs/service';
import { CollectMode, TaroOctopusPluginsOptions } from './core/common';
/**
 * 对外提供的根据内置选项动态调整插件运行参数的方法
 * 开发者可以根据需要在原始插件参数的基础上进行修改
 * @param updateOptions
 * @returns
 */
export declare function createPluginOptions(updateOptions: (buildInOptions: Record<CollectMode, TaroOctopusPluginsOptions>) => TaroOctopusPluginsOptions): TaroOctopusPluginsOptions;
declare const _default: (ctx: IPluginContext, pluginOpts: TaroOctopusPluginsOptions) => void;
export default _default;
export * from "./types";
export * from "./core";
