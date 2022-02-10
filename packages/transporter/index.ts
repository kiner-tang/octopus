/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BaseApp, Datasource, NormalDatasource, TransporterMode } from '@kiner/octopus-shared/inner';
import { Queue } from '@kiner/octopus-shared/queque';

export class Transporter extends BaseApp<Datasource> {
  constructor() {
    super('Transporter');
  }
  transporterConsole(eventQueue: Queue<NormalDatasource>) {
    let curData: NormalDatasource | undefined;
    while ((curData = eventQueue.dequeue())) {
      curData && console.log('🐙 章鱼埋点上报数据', curData);
    }
  }
  async transporterSendAll({ eventQueue, pluginOptions: { transporterOptions } }: Datasource) {
    const { transformParams, customRequest, requestOptions, isSendEventList } = transporterOptions;
    const transfromParamFnId = transformParams as unknown as string;
    const customRequestFnId = customRequest as unknown as string;
    let transfromParam = (data: NormalDatasource) => JSON.stringify(data);
    let customRequestFn = async (data: any) => {
      const { server, method, header } = requestOptions!;
      wx.request({
        url: server,
        method: method.toUpperCase() as any,
        header,
        data
      });
    };
    if (transfromParamFnId) {
      // @ts-ignore
      const mod = __webpack_require__(transfromParamFnId);
      transfromParam = mod.transfromParam;
    }
    if (customRequestFnId) {
      // @ts-ignore
      const mod = __webpack_require__(customRequestFnId);
      customRequestFn = mod.customRequest;
    }
    if (isSendEventList) {
      const all = eventQueue.all();
      eventQueue.clear();
      const params = all.map((item) => transfromParam(item));
      await customRequestFn(params);
    } else {
      eventQueue.flush(async (data) => {
        await customRequestFn(transfromParam(data));
      });
    }
  }
  resolveData(data: Datasource[]): Datasource[] | Promise<Datasource[]> {
    for (let i = 0; i < data.length; i++) {
      const { eventQueue, pluginOptions } = data[i];
      this.showInnerLog = pluginOptions.debug|| false;
      const { transporterOptions } = pluginOptions;
      if (!transporterOptions) {
        continue;
      }
      const { transformParams, mode, limit = 10 } = transporterOptions;
      const transfromParamFnId = transformParams as unknown as string;
      let transfromParam = (data: NormalDatasource) => JSON.stringify(data);

      if (transfromParamFnId) {
        // @ts-ignore
        const mod = __webpack_require__(transfromParamFnId);
        transfromParam = mod.transfromParam;
      }
      if (mode === TransporterMode.none) continue;
      else if (mode === TransporterMode.console) this.transporterConsole(eventQueue);
      else if (mode === TransporterMode.sendWhenPush) {
        this.transporterSendAll(data[i]);
      } else if (mode === TransporterMode.sendAllOverflow) {
        if (eventQueue.size() >= limit) {
          this.transporterSendAll(data[i]);
        }
      }
    }
    return super.resolveData(data);
  }
}
