import { File } from '@babel/types';
import { BaseApp, PluginPipelineData, TaroOctopusPluginsOptions } from '@kiner/octopus-shared';
import { IPluginsObject } from '@tarojs/service/src/utils/types';
/**
 * 根据单个 js 文件代码生成 ast 对象数组
 * @param fileName 文件名
 * @param code 源代码，包括编译后代码和 sourceMap
 * @param extra 一些额外信息
 * @returns
 */
export declare function getAstFromJsCode(fileName: string, code: {
    source: string;
    map: string;
}, extra?: Record<string, any>): Promise<File[]>;
/**
 * 将 codes 资源列表中的所有 js 代码生成抽象语法树
 * @param codes 代码资源列表
 * @param extra
 * @returns
 */
export declare function transformJsCodeToAsts(codes: Record<string, any>, extra?: Record<string, any>): Promise<Record<string, File[]>>;
/**
 * wxml 转换成 asts
 * @param codes
 * @param extra
 * @returns
 */
export declare function transformWXMLCodeToAsts(codes: Record<string, any>): Promise<Record<string, string>>;
/**
 * 将 wxml 和 js 转换为 ast对象
 * @param assets taro 编译完成后的资源列表
 * @param pluginOpts taro 插件选项
 * @param ctx taro 插件上下文
 * @returns
 */
export declare function transformCodeToAsts(assets: Record<string, any>, pluginOpts: TaroOctopusPluginsOptions, ctx: IPluginsObject): Promise<PluginPipelineData['asts']>;
/**
 * 抽象语法树构建者，根据小程序代码生成抽象语法树
 */
export declare class AstCreator extends BaseApp<PluginPipelineData> {
    constructor(assets: Record<string, any>, pluginOpts: TaroOctopusPluginsOptions, ctx: IPluginsObject);
    resolveData(data: PluginPipelineData[]): PluginPipelineData[] | Promise<PluginPipelineData[]>;
}
