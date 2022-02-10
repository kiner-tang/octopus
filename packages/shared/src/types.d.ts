/// <reference path="../wx-typings/types/index.d.ts" />
import { TaroOctopusPluginsOptions, BuildInEventKey } from "./inner";
declare global {
    export interface GetBoundingClientRect {
        boundingClientRect: {
            left: number;
            right: number;
            top: number;
            height: number;
        };
        scrollOffset: {
            scrollTop: number;
            scrollLeft: number;
        };
    }
    export function PushData(data: {
        type: BuildInEventKey | string;
        oriEvent?: WechatMiniprogram.CustomEvent<any>;
        subType?: string;
        customData: Record<string, any>;
    }): void | Promise<void>;
    export interface OctopusLib {
        /**
         * octopus 基本配置信息
         */
        config: {
            /**
             * octopus-plugin 版本号
             */
            version: string;
            /**
             * 库名称
             */
            libName: string;
            /**
             * 库文件路径
             */
            libFilePath: string;
            /**
             * 日志打印的命名空间
             */
            loggerNamespace: string;
            /**
             * 插件运行的参数，即在 config/index.js 中调用插件时传入的参数
             */
            pluginOptions: TaroOctopusPluginsOptions;
        };
        /**
         * 获取元素的边界信息
         */
        getBoundingClientRect: (elementSelector: string) => Promise<GetBoundingClientRect>;
        /**
         * 内部工具方法，给定的元素位置是否在用户点击的区域内
         */
        isClickTrackArea: (clickInfo: {
            x: number;
            y: number;
        }, boundingClientRect: GetBoundingClientRect['boundingClientRect'], scrollOffset: GetBoundingClientRect['scrollOffset']) => boolean;
        /**
         * 获取上一个页面数据
         */
        getPrevPage: () => Record<string, unknown>;
        /**
         * 获取当前打开的页面数据
         */
        getActivePage: () => Record<string, unknown>;
        /**
         * 内部日志方法
         */
        logger: (msg: string, ...args: any[]) => void;
        /**
         * 内部工具方法，根据 sid 获取当前组件的渲染信息
         */
        getViewDataBySid: (sid: string, cn: Record<string, unknown>[]) => Record<string, unknown>;
        /**
         * 内部工具方法，用于将页面数据拍平成一维数组
         */
        flatCn: <T extends Record<string, unknown>>(cn: T[]) => T[];
        /**
         * 工具方法，根据 sid 获取该元素的自定义埋点字段对象
         * e.g.
         * react:
         * <Button data-octopus-customData={{name: "kiner", age: 18}}>自定义用户参数</Button>
         *
         * ## 设当前组件的内部 sid 为 "_n_12"
         * getCustomDataBySid("_n_12");// {name: "kiner", age: 18}
         */
        getCustomDataBySid: <T extends Record<string, unknown>>(sid: string, cn: Record<string, unknown>[]) => T;
        /**
         * 工具方法，根据 sid 获取该元素的文本内容
         * e.g.
         * ## 由于 sid 是在编译过程中自动生成的，因此，下面的代码是通过 taro 编译后生成的 wxml 代码：
         *
         * <view id="_n_17">这是文本内容</view>
         *
         * getTextBySid('_n_17');// 这是文本内容
         *
         */
        getTextBySid: (sid: string, data?: Record<string, unknown>) => string;
        /**
         * 内部统一事件处理方法
         */
        collectDataEvent: (e: WechatMiniprogram.CustomEvent<any>) => any;
        /**
         * 用于手动添加埋点数据
         */
        pushData: typeof PushData;
        /**
         * 创建音频播放示例 api 代理
         */
        createInnerAudioContext: WechatMiniprogram.Wx['createInnerAudioContext'];
        /**
         * 接口请求 api 代理
         */
        request: WechatMiniprogram.Wx['request'];
        /**
         * 上传文件 api 代理
         */
        uploadFile: WechatMiniprogram.Wx['uploadFile'];
        /**
         * 下载文件 api 代理
         */
        downloadFile: WechatMiniprogram.Wx['downloadFile'];
    }
}
