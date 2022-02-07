/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */
import { ParserOptions, parse } from '@babel/parser';
import { File } from '@babel/types';
import { BaseApp, filterObjectKey, getSourceCodeFromMap, pathExcludeIgnore } from '@kiner/octopus-shared';
import { IPluginsObject } from '@tarojs/service/src/utils/types';
import { defaultAstParserOption, PluginPipelineData, Root, TaroOctopusPluginsOptions, WXMLInfo, WxmlNode } from './common';


/**
 * 根据单个 js 文件代码生成 ast 对象数组
 * @param fileName 文件名
 * @param code 源代码，包括编译后代码和 sourceMap
 * @param extra 一些额外信息
 * @returns
 */
export async function getAstFromJsCode(
  fileName: string,
  code: { source: string; map: string },
  extra: Record<string, any> = { ctx: {} }
): Promise<File[]> {
  //   const oriSource = await getSourceCodeFromMap(code.map, fileName);
  //   const asts: File[] = oriSource.filter(item => !item.filePath.startsWith("node/modules") && /\.(j|t)sx?$/.test(item.filePath))
  //     .map((source) => {
  //       const ast = parse(source.source, defaultAstParserOption);
  //       ast.extra = {
  //         fileName: source.filePath,
  //         ...extra,
  //       };

  //       return ast;
  //     })
  //     .filter((item) => !!item) as File[];

  const ast = parse(code.source, defaultAstParserOption);
  ast.extra = {
    fileName,
    ...extra,
  };

  return [ast];
}
/**
 * 将 codes 资源列表中的所有 js 代码生成抽象语法树
 * @param codes 代码资源列表
 * @param extra
 * @returns
 */
export async function transformJsCodeToAsts(
  codes: Record<string, any>,
  extra: Record<string, any> = {}
): Promise<Record<string, File[]>> {
  const res: Record<string, File[]> = {};
  const keys = Object.keys(codes);
  for (let i = 0; i < keys.length; i++) {
    const fileName = keys[i];
    if (!fileName.endsWith('.js')) continue;
    res[fileName] = await getAstFromJsCode(
      fileName,
      {
        source: codes[fileName].children.map((item: any) => item._value).join('\n'),
        map: codes[`${fileName}.map`]._value,
      },
      extra
    );
  }
  return res;
}

/**
 * wxml 转换成 asts
 * @param codes
 * @param extra
 * @returns
 */
export async function transformWXMLCodeToAsts(
  codes: Record<string, any>
): Promise<Record<string, string>> {
  const res: Record<string, string> = {};
  const keys = Object.keys(codes);
  for (let i = 0; i < keys.length; i++) {
    const fileName = keys[i];
    if (!fileName.endsWith('.wxml')) continue;
    res[fileName] = codes[fileName].source();
  }
  return res;
}

/**
 * 将 wxml 和 js 转换为 ast对象
 * @param assets taro 编译完成后的资源列表
 * @param pluginOpts taro 插件选项
 * @param ctx taro 插件上下文
 * @returns
 */
export async function transformCodeToAsts(
  assets: Record<string, any>,
  pluginOpts: TaroOctopusPluginsOptions,
  ctx: IPluginsObject
): Promise<PluginPipelineData['asts']> {
  const {
    complieOptions: { include = [], exclude = [] },
  } = pluginOpts;
  const allowAssets = filterObjectKey(assets, pathExcludeIgnore(Object.keys(assets), include, exclude));
  // 解析 js 文件
  const jsAsts = await transformJsCodeToAsts(allowAssets, {
    pluginOpts,
    ctx,
  });
  // 解析 wxml 文件
  const wxmlAsts = await transformWXMLCodeToAsts(allowAssets);

  return {
    js: jsAsts,
    wxml: wxmlAsts,
  };
}
/**
 * 抽象语法树构建者，根据小程序代码生成抽象语法树
 */
export class AstCreator extends BaseApp<PluginPipelineData> {
  constructor(assets: Record<string, any>, pluginOpts: TaroOctopusPluginsOptions, ctx: IPluginsObject) {
    super('AstCreator');

    transformCodeToAsts(assets, pluginOpts, ctx).then((asts) => {
      this.push([
        {
          asts,
          pluginOptions: pluginOpts,
          ctx,
          codes: [],
          oriAssets: assets
        },
      ]);
    });
  }
  resolveData(data: PluginPipelineData[]): PluginPipelineData[] | Promise<PluginPipelineData[]> {
    return super.resolveData(data);
  }
}
