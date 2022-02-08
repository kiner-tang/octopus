/* eslint-disable @typescript-eslint/triple-slash-reference */

/// <reference path="./wx-typings/types/index.d.ts" />

import { TaroOctopusPluginsOptions } from './core/common';

declare global {
  export interface GetBoundingClientRect {
    boundingClientRect: { left: number; right: number; top: number; height: number };
    scrollOffset: { scrollTop: number; scrollLeft: number };
  }
  export interface OctopusLib {
    config: {
      version: string;
      libName: string;
      libFilePath: string;
      loggerNamespace: string;
      pluginOptions: TaroOctopusPluginsOptions;
    };
    getBoundingClientRect: (elementSelector: string) => Promise<GetBoundingClientRect>;
    isClickTrackArea: (
      clickInfo: { x: number; y: number },
      boundingClientRect: GetBoundingClientRect['boundingClientRect'],
      scrollOffset: GetBoundingClientRect['scrollOffset']
    ) => boolean;
    getPrevPage: () => Record<string, unknown>;
    getActivePage: () => Record<string, unknown>;
    logger: (msg: string, ...args: any[]) => void;
    getViewDataBySid: (sid: string, cn: Record<string, unknown>[]) => Record<string, unknown>;
    flatCn: <T extends Record<string, unknown>>(cn: T[]) => T[];
    getCustomDataBySid: <T extends Record<string, unknown>>(sid: string, cn: Record<string, unknown>[]) => T;
    getTextBySid: (sid: string, data?: Record<string, unknown>) => string;
    collectDataEvent: (e: WechatMiniprogram.CustomEvent<any>) => any;
    createInnerAudioContext: WechatMiniprogram.Wx['createInnerAudioContext'];
    request: WechatMiniprogram.Wx['request'];
    uploadFile: WechatMiniprogram.Wx["uploadFile"];
    downloadFile: WechatMiniprogram.Wx["downloadFile"];
  }
}
