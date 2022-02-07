/// <reference path="node_modules/@tarojs/taro/types/index.d.ts" />
/// <reference path="node_modules/@kiner/octopus-plugins/wx-typings/types/index.d.ts" />
/// <reference path="node_modules/@kiner/octopus-plugins/types.d.ts" />

declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.styl";

declare namespace JSX {
    interface IntrinsicElements {
        'import': React.DetailedHTMLProps<React.EmbedHTMLAttributes<HTMLEmbedElement>, HTMLEmbedElement>
    }
}

// @ts-ignore
declare const process: {
  env: {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd';
    [key: string]: any;
  }
}

declare namespace WechatMiniprogram {
  interface Wx {
      octopusLib: OctopusLib;
  }
}