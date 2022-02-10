import { BaseApp, PluginPipelineData } from "@kiner/octopus-shared";
export declare class PrettierFactory extends BaseApp<PluginPipelineData> {
    constructor();
    resolveData(data: PluginPipelineData[]): PluginPipelineData[] | Promise<PluginPipelineData[]>;
}
