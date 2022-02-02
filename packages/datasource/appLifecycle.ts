import { BaseApp, BaseData } from '@kiner/octopus-shared';


export class AppLifecycleWorker extends BaseApp<Partial<BaseData>> {
    constructor() {
        super();
        this.push([{
            appLifecycle: {
                
            }
        }])
    }
}