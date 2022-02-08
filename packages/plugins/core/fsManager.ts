import { BaseApp, PluginPipelineData } from "@kiner/octopus-shared";
import { ConcatSource } from "webpack-sources";

export class FsManager extends BaseApp<PluginPipelineData> {
    constructor() {
        super("FsManager");
    }
    resolveData(data: PluginPipelineData[]): PluginPipelineData[] | Promise<PluginPipelineData[]> {
        // 将代码重新放回原始的资源列表当中
        data.forEach(item => {
            const { codes, oriAssets } = item;
            codes.forEach(code => {
                oriAssets[code.filePath] = new ConcatSource(code.code);
            });
        });
        return super.resolveData(data);
    }
}