import { BaseApp, guid, shortid, isFunction, proxy, pathExcludeIgnore } from '@kiner/octopus-shared';
import { isPathValid } from '..';
import { PlatformType } from '..';
import { runByFnNameWithPlatform } from '..';

describe('🪛 [packages/shared/utils] 公共分包工具集', () => {
  it('🔩 [utils/guid] 测试 guid 生成', (done) => {
    const set: Set<string> = new Set();
    let cnt = 10000;
    while (--cnt) {
      const id = guid();
      if (set.has(id)) {
        throw new Error('生成的全局唯一id重复了');
      }
      set.add(id);
    }
    done();
  });
  it('🔩 [utils/shortid] 测试短 guid 生成', (done) => {
    const set: Set<string> = new Set();
    let cnt = 10000;
    while (--cnt) {
      const id = shortid();
      if (set.has(id)) {
        throw new Error('生成的短全局唯一id重复了');
      }
      set.add(id);
    }
    done();
  });

  it('🔩 [utils/isFunction] 判断是否是函数', () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(function () {})).toBe(true);
    expect(isFunction({ name: function () {} })).toBe(false);
    expect(isFunction(222)).toBe(false);
    expect(isFunction(Date)).toBe(true);
    expect(isFunction(new Function())).toBe(true);
  });

  it('🔩 [utils/proxy] 通用代理封装方法的通常使用方法', () => {
    const fnLoad = jest.fn();
    const fnReady = jest.fn();
    const fnShow = jest.fn();
    const fnHide = jest.fn();
    const fnInject = jest.fn();
    const options: Record<string, any> = {
      onLoad: (options: any) => {
        fnLoad(options);
      },
      onReady: (...args: any) => {
        fnReady(...args);
      },
      onShow: (...args: any) => {
        fnShow(...args);
      },
      onHide: (...args: any) => {
        fnHide(...args);
      },
    };
    const newOptions = proxy(options, (options: any) => {
      fnInject(options);
    });

    newOptions.onLoad('onLoad');
    newOptions.onReady('onReady');
    newOptions.onShow('onShow');
    newOptions.onHide('onHide');

    expect(fnLoad).toBeCalledTimes(1);
    expect(fnLoad).toBeCalledWith('onLoad');
    expect(fnReady).toBeCalledTimes(1);
    expect(fnShow).toBeCalledTimes(1);
    expect(fnHide).toBeCalledTimes(1);
    expect(fnInject).toBeCalledTimes(4);
    expect(fnInject).toHaveBeenCalledWith('onLoad');
  });
  it('🔩 [utils/proxy] 通用代理封装方法指定代理属性', () => {
    const fnLoad = jest.fn();
    const fnReady = jest.fn();
    const fnShow = jest.fn();
    const fnHide = jest.fn();
    const fnInject = jest.fn();
    const options: Record<string, any> = {
      onLoad: (options: any) => {
        fnLoad(options);
      },
      onReady: (...args: any) => {
        fnReady(...args);
      },
      onShow: (...args: any) => {
        fnShow(...args);
      },
      onHide: (...args: any) => {
        fnHide(...args);
      },
    };
    const newOptions = proxy(
      options,
      (options: any) => {
        fnInject(options);
      },
      ['onLoad', 'onShow']
    );

    newOptions.onLoad('onLoad');
    newOptions.onReady('onReady');
    newOptions.onShow('onShow');
    newOptions.onHide('onHide');

    expect(fnLoad).toBeCalledTimes(1);
    expect(fnLoad).toBeCalledWith('onLoad');
    expect(fnReady).toBeCalledTimes(1);
    expect(fnShow).toBeCalledTimes(1);
    expect(fnHide).toBeCalledTimes(1);
    expect(fnInject).toBeCalledTimes(2);
    expect(fnInject).toHaveBeenCalledWith('onLoad');
  });
  it('🔩 [utils/isPathValid] 检测一个路径是否同时满足 include 和 exclude 规则', () => {
    expect(isPathValid('app.js', ['pages', 'app.js'])).toBe(true);
    expect(isPathValid('app.js', [/pages.*/, new RegExp('.*.js$')])).toBe(true);
    expect(isPathValid('pages/index/index.js', ['pages', 'app.js'])).toBe(true);
    expect(isPathValid('pages/index/index.js', ['pages', 'app.js'], [new RegExp('pages/index/.*.js')])).toBe(false);
    expect(isPathValid('pages/index/detail.js', [])).toBe(true);
  });
  it('🔩 [utils/isPathValid] 从路径数组中查找同时满足 include 和 exclude 规则的路径', () => {
    expect(
      pathExcludeIgnore(
        ['app.js', 'pages/index/index.js', 'pages/detail/index.js', 'taro.js', 'vendors.js', 'runtime.js', 'components/Modal/index.js'],
        ['pages', 'components', "app.js"],
        ['taro.js', 'runtime.js', 'vendors.js']
      )
    ).toStrictEqual(["app.js", 'pages/index/index.js', 'pages/detail/index.js', 'components/Modal/index.js']);

    expect(
      pathExcludeIgnore(
        ['app.js', 'pages/index/index.js', 'pages/detail/index.js', 'taro.js', 'vendors.js', 'runtime.js', 'components/Modal/index.js'],
        [],
        ['taro.js', 'runtime.js', 'vendors.js']
      )
    ).toStrictEqual(["app.js", 'pages/index/index.js', 'pages/detail/index.js', 'components/Modal/index.js']);
  });
});
