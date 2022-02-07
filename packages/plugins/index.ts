import { IPluginContext } from '@tarojs/service';
import { deepMergeOptions, Logger, Output } from '@kiner/octopus-shared';
import { AstCreator } from './core/astCreator';
import {
  BuildInEventName,
  buildInEventNameStr,
  buildInLoadErrorEventNameStr,
  CollectMode,
  TaroOctopusPluginsOptions,
} from './core/common';
import { CodeGen } from './core/codeGen';
import { InjectCodeToCollectDatasource } from './core/injectCodeToCollectDatasource';
import { FsManager } from './core/fsManager';
import { PrettierFactory } from './core/prettierFactory';

const taroOctopusPluginsDefaultOptions: Record<CollectMode, TaroOctopusPluginsOptions> = {
  [CollectMode.default]: {
    debug: false,
    complieOptions: {
      include: [/pages\/.*\.(js|js\.map)$/, /app\.(js|js\.map)$/, 'base.wxml', 'taro.js'],
      exclude: [],
    },
    mode: CollectMode.default,
    registerEventList: [
      BuildInEventName.tap,
      BuildInEventName.input,
      BuildInEventName.focus,
      BuildInEventName.blur,
      BuildInEventName.longpress,
      BuildInEventName.scroll,
    ],
    networkApi: {
      request: {
        isSuccess: async (data) => {
          return !!data;
        }
      },
      uploadFile: true,
      downloadFile: true,
    },
    loadErrorEventList: buildInLoadErrorEventNameStr,
    transporterOptions: {
      env: 'production',
    },
  },
  [CollectMode.all]: {
    debug: false,
    complieOptions: {
      include: [/pages\/.*\.(js|js\.map)$/, /app\.(js|js\.map)$/, 'base.wxml', 'taro.js'],
      exclude: [],
    },
    mode: CollectMode.default,
    registerEventList: buildInEventNameStr,
    loadErrorEventList: buildInLoadErrorEventNameStr,
    networkApi: {
      request: {
        isSuccess: async (data) => {
          console.log("isSuccess: ", data);
          return !!data;
        }
      },
      uploadFile: true,
      downloadFile: true,
    },
    transporterOptions: {
      env: 'production',
    },
  },
  [CollectMode.custom]: {
    debug: false,
    complieOptions: {
      include: [],
      exclude: [],
    },
    mode: CollectMode.default,
    registerEventList: [],
    loadErrorEventList: [],
    transporterOptions: {
      env: 'production',
    },
  },
};
/**
 * 对外提供的根据内置选项动态调整插件运行参数的方法
 * 开发者可以根据需要在原始插件参数的基础上进行修改
 * @param updateOptions
 * @returns
 */
export function createPluginOptions(
  updateOptions: (buildInOptions: Record<CollectMode, TaroOctopusPluginsOptions>) => TaroOctopusPluginsOptions
) {
  return updateOptions(taroOctopusPluginsDefaultOptions);
}

export default (
  ctx: IPluginContext,
  pluginOpts: TaroOctopusPluginsOptions
) => {
  const logger = new Logger('TaroPlugin');
  pluginOpts = deepMergeOptions(taroOctopusPluginsDefaultOptions[pluginOpts.mode || CollectMode.default], pluginOpts);
  Logger.showLog = pluginOpts.debug;
  logger.log('当前插件选项', pluginOpts);
  ctx.modifyBuildAssets(({ assets }) => {
    Logger.showLog = false;
    const app = new AstCreator(assets, pluginOpts, ctx);
    app
      .pipe(new Output('生成AST结果'))
      .pipe(new InjectCodeToCollectDatasource())
      .pipe(new Output('注入代码'))
      .pipe(new CodeGen())
      .pipe(new Output('生成代码字符串'))
      .pipe(new PrettierFactory())
      .pipe(new Output('代码格式化'))
      .pipe(new FsManager())
      .pipe(new Output('文件输出到目标目录'));
  });
};

export * from "./types";
export * from "./core";