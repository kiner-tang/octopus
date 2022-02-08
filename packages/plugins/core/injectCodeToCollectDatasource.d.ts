import { Statement, ObjectProperty } from '@babel/types';
import { BaseApp } from '@kiner/octopus-shared';
import type { CheerioAPI } from 'cheerio';
import { PluginPipelineData } from './common';
import { CodeGenInfo } from './codeGen';
export declare class InjectCodeToCollectDatasource extends BaseApp<PluginPipelineData> {
    constructor();
    /**
     * 为 wxml 打入补丁代码
     * @param $
     */
    patchCodeInitWxml($: CheerioAPI): void;
    /**
     * 由于 cheerio 输出的属性字符串会将 ' 转换成 &apos; ，因此再完成补丁输出源码前需要转换回来
     * @param html
     * @returns
     */
    replaceEncodeChar(html: string): string;
    /**
     * 注入代码到 wxml 文件中
     * @param code
     */
    injectCodeIntoWxml(code: PluginPipelineData['asts']['wxml']): void;
    _traverseJs({ code, filePath, injectDepCb, callDepCb, eventHandler, loadErrorHandler, customData, }: {
        code: PluginPipelineData['asts']['js'];
        filePath: string;
        injectDepCb?: (objectProperties: ObjectProperty[]) => void;
        callDepCb?: (body: Statement[]) => void;
        eventHandler?: (body: Statement[]) => void;
        loadErrorHandler?: (body: Statement[], eventObjName: string) => void;
        customData?: (data: string) => void;
    }): void;
    /**
     * 注入引入模块语句
     * @param code 抽象语法树集合
     * @param filePath 文件路径
     * @param injectFilePath 待注入模块的路径
     */
    _injectRequire(code: PluginPipelineData['asts']['js'], filePath: string, injectFilePath: string): void;
    /**
     * 在 js 中注入代码
     * @param code 抽象语法树集合
     */
    injectCodeIntoJs(code: PluginPipelineData['asts']['js']): void;
    /**
     * 将库文件的代码加入到源码队列当中
     * @param libs
     * @param config
     */
    injectCodeLib(libs: CodeGenInfo[], config: PluginPipelineData): void;
    /**
     * 注入代码入口
     * @param asts
     */
    injectCode(asts: PluginPipelineData['asts'], config: PluginPipelineData): void;
    /**
     * 处理数据
     * @param data
     * @returns
     */
    resolveData(data: PluginPipelineData[]): PluginPipelineData[] | Promise<PluginPipelineData[]>;
}
