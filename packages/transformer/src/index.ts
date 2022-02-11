/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BaseApp, Datasource, NormalDatasource } from '@kiner/octopus-shared/src/inner';
import { Queue } from "@kiner/octopus-shared/src/queque";
import { eventQueueStorageKey } from "@kiner/octopus-shared/src/constant";

export class Transformer extends BaseApp<Datasource> {
  eventQueue: Queue<NormalDatasource>;
  constructor(datasource: Datasource['datasource'], pluginOptions: Datasource['pluginOptions']) {
    super('Transformer');
    this.showInnerLog = pluginOptions.debug || false;
    const old = wx.getStorageSync<NormalDatasource[]>(eventQueueStorageKey) || [];
    this.eventQueue = new Queue<NormalDatasource>(old);
    this.push([
      {
        datasource,
        pluginOptions,
        eventQueue: this.eventQueue,
      },
    ]);
  }
  async resolveData(data: Datasource[]): Promise<Datasource[]> {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const {
        type,
        subType,
        oriEvent,
        dataset,
        elemData,
        errorMsg,
        detail,
        pageData,
        customData,
        curEleSid,
        isManual,
        text,
        touchElem,
        route,
        pageConfig,
        timeStamp,
        baseDeviceInfo
      } = item.datasource;
      const { transformerOptions } = item.pluginOptions;
      let normalData: NormalDatasource = {
        type,
        subType,
        oriEvent,
        detail,
        value: oriEvent?.detail?.value,
        target: {
          dataset,
          elemData,
          curEleSid,
          text,
          touchElem,
        },
        errorMsg,
        customData,
        isManual,
        pageData,
        route,
        pageConfig,
        timeStamp,
        baseDeviceInfo
      };
      if (transformerOptions) {
        // 由于对象属性是方法时转换成字符串输出到代码中后会被过滤掉
        // 因此，通过 plugin 参数传递过来的方法会转换为模块id,使用时
        // 会根据模块id请求对应模块代码
        const fnId = transformerOptions?.transformer as unknown as string;
        // @ts-ignore
        const { transformer } = __webpack_require__(fnId);

        normalData = await transformer({
          datasource: item.datasource,
          pluginOptions: item.pluginOptions,
        });
      }
      this.eventQueue.push(normalData);
    }
    return super.resolveData(data.map(item => ({...item, eventQueue: this.eventQueue})));
  }
}
