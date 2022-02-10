import { IPluginContext } from '@tarojs/service';
import { TaroOctopusPluginsOptions } from '@kiner/octopus-shared';
import { CollectMode } from './core/common';
/**
 * 对外提供的根据内置选项动态调整插件运行参数的方法
 * 开发者可以根据需要在原始插件参数的基础上进行修改
 * @param updateOptions
 * @returns
 */
export declare function createPluginOptions(updateOptions: (buildInOptions: Record<CollectMode, TaroOctopusPluginsOptions>) => TaroOctopusPluginsOptions): TaroOctopusPluginsOptions;
/**
 * 向外抛出的设置 plugin options 的方法，方便编辑器智能提示
 * @param options
 * @returns
 */
export declare const defineConfig: (options: Partial<TaroOctopusPluginsOptions>) => Partial<TaroOctopusPluginsOptions>;
declare const _default: (ctx: IPluginContext, pluginOpts: TaroOctopusPluginsOptions) => void;
export default _default;
export * from '@kiner/octopus-shared/src/types';
export * from './core';
