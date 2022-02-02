import {
  BaseApp,
  guid,
  shortid,
  isFunction,
  proxy,
} from "@kiner/octopus-shared";

describe("🪛 [packages/shared/utils] 公共分包工具集", () => {
  it("🔩 [utils/guid] 测试 guid 生成", (done) => {
    const set: Set<string> = new Set();
    let cnt = 10000;
    while (--cnt) {
      const id = guid();
      if (set.has(id)) {
        throw new Error("生成的全局唯一id重复了");
      }
      set.add(id);
    }
    done();
  });
  it("🔩 [utils/shortid] 测试短 guid 生成", (done) => {
    const set: Set<string> = new Set();
    let cnt = 10000;
    while (--cnt) {
      const id = shortid();
      if (set.has(id)) {
        throw new Error("生成的短全局唯一id重复了");
      }
      set.add(id);
    }
    done();
  });

  it("🔩 [utils/isFunction] 判断是否是函数", () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(function () {})).toBe(true);
    expect(isFunction({ name: function () {} })).toBe(false);
    expect(isFunction(222)).toBe(false);
    expect(isFunction(Date)).toBe(true);
    expect(isFunction(new Function())).toBe(true);
  });

  it("🔩 [utils/proxy] 通用代理封装方法的通常使用方法", () => {
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

    newOptions.onLoad("onLoad");
    newOptions.onReady("onReady");
    newOptions.onShow("onShow");
    newOptions.onHide("onHide");

    expect(fnLoad).toBeCalledTimes(1);
    expect(fnLoad).toBeCalledWith("onLoad");
    expect(fnReady).toBeCalledTimes(1);
    expect(fnShow).toBeCalledTimes(1);
    expect(fnHide).toBeCalledTimes(1);
    expect(fnInject).toBeCalledTimes(4);
    expect(fnInject).toHaveBeenCalledWith("onLoad");
  });
  it("🔩 [utils/proxy] 通用代理封装方法指定代理属性", () => {
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
    }, ["onLoad", "onShow"]);

    newOptions.onLoad("onLoad");
    newOptions.onReady("onReady");
    newOptions.onShow("onShow");
    newOptions.onHide("onHide");

    expect(fnLoad).toBeCalledTimes(1);
    expect(fnLoad).toBeCalledWith("onLoad");
    expect(fnReady).toBeCalledTimes(1);
    expect(fnShow).toBeCalledTimes(1);
    expect(fnHide).toBeCalledTimes(1);
    expect(fnInject).toBeCalledTimes(2);
    expect(fnInject).toHaveBeenCalledWith("onLoad");
  });
});
