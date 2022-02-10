import { BaseApp, PluginPipelineData } from '@kiner/octopus-shared';
export declare class FsManager extends BaseApp<PluginPipelineData> {
    constructor();
    resolveData(data: PluginPipelineData[]): PluginPipelineData[] | Promise<PluginPipelineData[]>;
}
