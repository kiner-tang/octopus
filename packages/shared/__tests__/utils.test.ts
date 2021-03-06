import { BaseApp, guid, shortid, isFunction, proxy, pathExcludeIgnore } from '@kiner/octopus-shared';
import { isPathValid } from '..';
import { PlatformType } from '..';
import { runByFnNameWithPlatform } from '..';

describe('πͺ [packages/shared/utils] ε¬ε±εεε·₯ε·ι', () => {
  it('π© [utils/guid] ζ΅θ― guid ηζ', (done) => {
    const set: Set<string> = new Set();
    let cnt = 10000;
    while (--cnt) {
      const id = guid();
      if (set.has(id)) {
        throw new Error('ηζηε¨ε±ε―δΈidιε€δΊ');
      }
      set.add(id);
    }
    done();
  });
  it('π© [utils/shortid] ζ΅θ―η­ guid ηζ', (done) => {
    const set: Set<string> = new Set();
    let cnt = 10000;
    while (--cnt) {
      const id = shortid();
      if (set.has(id)) {
        throw new Error('ηζηη­ε¨ε±ε―δΈidιε€δΊ');
      }
      set.add(id);
    }
    done();
  });

  it('π© [utils/isFunction] ε€ζ­ζ―ε¦ζ―ε½ζ°', () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(function () {})).toBe(true);
    expect(isFunction({ name: function () {} })).toBe(false);
    expect(isFunction(222)).toBe(false);
    expect(isFunction(Date)).toBe(true);
    expect(isFunction(new Function())).toBe(true);
  });

  it('π© [utils/proxy] ιη¨δ»£ηε°θ£ζΉζ³ηιεΈΈδ½Ώη¨ζΉζ³', () => {
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
  it('π© [utils/proxy] ιη¨δ»£ηε°θ£ζΉζ³ζε?δ»£ηε±ζ§', () => {
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
  it('π© [utils/isPathValid] ζ£ζ΅δΈδΈͺθ·―εΎζ―ε¦εζΆζ»‘θΆ³ include ε exclude θ§ε', () => {
    expect(isPathValid('app.js', ['pages', 'app.js'])).toBe(true);
    expect(isPathValid('app.js', [/pages.*/, new RegExp('.*.js$')])).toBe(true);
    expect(isPathValid('pages/index/index.js', ['pages', 'app.js'])).toBe(true);
    expect(isPathValid('pages/index/index.js', ['pages', 'app.js'], [new RegExp('pages/index/.*.js')])).toBe(false);
    expect(isPathValid('pages/index/detail.js', [])).toBe(true);
  });
  it('π© [utils/isPathValid] δ»θ·―εΎζ°η»δΈ­ζ₯ζΎεζΆζ»‘θΆ³ include ε exclude θ§εηθ·―εΎ', () => {
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
