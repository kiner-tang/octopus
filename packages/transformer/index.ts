import { BaseApp, TaroOctopusPluginsOptions } from "@kiner/octopus-shared"

export type Datasource = {
    datasource: {
        type: string;
        subType: string;
        isManual: boolean;
        pageData: Record<string, any>;
        oriEvent: WechatMiniprogram.CustomEvent<any>;
        touchElem: Record<string, any>;
        customData: Record<string, any>;
        errorMsg?: string;
        performance?: Record<string, any>;
        detail: Record<string, any>;
        dataset: Record<string, any>;
        elemData: Record<string, any>;
        text: Record<string, any>;
        curEleSid: Record<string, any>;
    };
    pluginOptions: TaroOctopusPluginsOptions
}

export class Transformer extends BaseApp<Datasource> {
    constructor() {
        super("Transformer")
    }
}