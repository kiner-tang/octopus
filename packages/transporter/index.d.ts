import { BaseApp, Datasource, NormalDatasource } from '@kiner/octopus-shared/inner';
import { Queue } from '@kiner/octopus-shared/queque';
export declare class Transporter extends BaseApp<Datasource> {
    constructor();
    transporterConsole(eventQueue: Queue<NormalDatasource>): void;
    transporterSendAll({ eventQueue, pluginOptions: { transporterOptions } }: Datasource): Promise<void>;
    resolveData(data: Datasource[]): Datasource[] | Promise<Datasource[]>;
}
