import { BaseApp } from "@kiner/octopus-shared";
import { PluginPipelineData } from "./common";
export declare class PrettierFactory extends BaseApp<PluginPipelineData> {
    constructor();
    resolveData(data: PluginPipelineData[]): PluginPipelineData[] | Promise<PluginPipelineData[]>;
}
