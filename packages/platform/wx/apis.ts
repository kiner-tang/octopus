// function getApp(...rest: any[]) {
//     console.log('调用微信 getApp 方法：', rest);
//     return {} as WechatMiniprogram.App.Constructor;
// }
/**
 * 获取微信小程序 APP 对象的方法
 */
export const getWxApp: () => WechatMiniprogram.App.Constructor = getApp;