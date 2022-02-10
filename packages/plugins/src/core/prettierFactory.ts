import { BaseApp, PluginPipelineData } from "@kiner/octopus-shared";
import prettier from 'prettier';

export class PrettierFactory extends BaseApp<PluginPipelineData> {
    constructor() {
        super("Prettier");
    }
    resolveData(data: PluginPipelineData[]): PluginPipelineData[] | Promise<PluginPipelineData[]> {
        data.forEach(item => item.codes.forEach(code => {
            if(code.prettier) {
                code.code = prettier.format(code.code, code.prettierOptions);
            }
        }))
        return super.resolveData(data);
    }
}