import { BaseApp, Datasource, NormalDatasource } from '@kiner/octopus-shared/src/inner';
import { Queue } from "@kiner/octopus-shared/src/queque";
export declare class Transformer extends BaseApp<Datasource> {
    eventQueue: Queue<NormalDatasource>;
    constructor(datasource: Datasource['datasource'], pluginOptions: Datasource['pluginOptions']);
    resolveData(data: Datasource[]): Promise<Datasource[]>;
}
