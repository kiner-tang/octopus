import { BaseApp, Datasource } from '@kiner/octopus-shared/inner';
export declare class Transformer extends BaseApp<Datasource> {
    constructor(datasource: Datasource['datasource'], pluginOptions: Datasource['pluginOptions']);
    resolveData(data: Datasource[]): Promise<Datasource[]>;
}
