import { IPluginContext } from '@tarojs/service';
import { deepMergeOptions, Logger, Output, TaroOctopusPluginsOptions, TransporterMode } from '@kiner/octopus-shared';
import { AstCreator } from './core/astCreator';
import {
  AppAPI,
  appApiStr,
  BuildInEventName,
  buildInEventNameStr,
  buildInLoadErrorEventNameStr,
  CollectMode,
  PageAPI,
  pageApiStr,
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
    ],
    networkApi: {
      request: {
        isSuccess: (data) => {
          return !!data;
        },
      },
      uploadFile: true,
      downloadFile: true,
    },
    loadErrorEventList: buildInLoadErrorEventNameStr,
    pageLifecycleEventList: [
      PageAPI.onShareTimeline,
      PageAPI.onShareAppMessage,
      PageAPI.onTabItemTap,
      PageAPI.onAddToFavorites,
      PageAPI.onShow,
      PageAPI.onHide,
      PageAPI.onReady,
    ],
    appLifecycleEventList: [AppAPI.onLaunch, AppAPI.onPageNotFound, AppAPI.onUnhandledRejection],
    transporterOptions: {
      mode: TransporterMode.sendWhenPush
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
    pageLifecycleEventList: pageApiStr,
    appLifecycleEventList: appApiStr,
    loadErrorEventList: buildInLoadErrorEventNameStr,
    networkApi: {
      request: {
        isSuccess: (data) => {
          return !!data;
        },
      },
      uploadFile: true,
      downloadFile: true,
    },
    transporterOptions: {
      mode: TransporterMode.sendWhenPush
    },
  },
  [CollectMode.manual]: {
    debug: false,
    complieOptions: {
      include: [/pages\/.*\.(js|js\.map)$/, /app\.(js|js\.map)$/, 'base.wxml', 'taro.js'],
      exclude: [],
    },
    mode: CollectMode.manual,
    registerEventList: [],
    loadErrorEventList: [],
    pageLifecycleEventList: [],
    appLifecycleEventList: [],
    transporterOptions: {
      mode: TransporterMode.none
    },
  },
  [CollectMode.custom]: {
    debug: false,
    complieOptions: {
      include: [],
      exclude: [],
    },
    mode: CollectMode.custom,
    registerEventList: [],
    loadErrorEventList: [],
    pageLifecycleEventList: [],
    appLifecycleEventList: [],
    transporterOptions: {
      mode: TransporterMode.none
    },
  },
};
/**
 * ????????????????????????????????????????????????????????????????????????
 * ????????????????????????????????????????????????????????????????????????
 * @param updateOptions
 * @returns
 */
export function createPluginOptions(
  updateOptions: (buildInOptions: Record<CollectMode, TaroOctopusPluginsOptions>) => TaroOctopusPluginsOptions
) {
  return updateOptions(taroOctopusPluginsDefaultOptions);
}
/**
 * ????????????????????? plugin options ???????????????????????????????????????
 * @param options
 * @returns
 */
export const defineConfig = (options: Partial<TaroOctopusPluginsOptions>): Partial<TaroOctopusPluginsOptions> => {
  return options;
};

export default (ctx: IPluginContext, pluginOpts: TaroOctopusPluginsOptions) => {
  const logger = new Logger('TaroPlugin');
  pluginOpts = deepMergeOptions(taroOctopusPluginsDefaultOptions[(pluginOpts.mode || CollectMode.default) as CollectMode], pluginOpts);
  Logger.showLog = pluginOpts.debug;
  logger.log('??????????????????', pluginOpts);
  ctx.modifyBuildAssets(({ assets }) => {
    Logger.showLog = false;
    const app = new AstCreator(assets, pluginOpts, ctx);
    app
      .pipe(new Output('??????AST??????'))
      .pipe(new InjectCodeToCollectDatasource())
      .pipe(new Output('????????????'))
      .pipe(new CodeGen())
      .pipe(new Output('?????????????????????'))
      .pipe(new PrettierFactory())
      .pipe(new Output('???????????????'))
      .pipe(new FsManager())
      .pipe(new Output('???????????????????????????'));
  });
};

export * from '@kiner/octopus-shared/src/types';
export * from './core';
