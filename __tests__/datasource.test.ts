import { BaseApp } from "@/shared/inner";


describe("🔫 数据源 Datasource", () => {
  it("🧼 [BaseApp] 管道数据流 Pipeline 数据流向与处理", (done) => {
    type UserInfo = {
      name: string;
      age?: number;
      friends?: string[];
    };
    const fn = jest.fn();
    class App1 extends BaseApp<UserInfo> {
      constructor() {
        super();
        this.push([{ name: "kiner" }]);
      }
    }
    class App2 extends BaseApp<UserInfo> {
      constructor() {
        super();
      }
      resolveData(data: UserInfo[]): UserInfo[] | Promise<UserInfo[]> {
        data.forEach((item) => (item.age = 18));
        return data;
      }
    }
    class App3 extends BaseApp<UserInfo> {
      constructor() {
        super();
      }
      resolveData(data: UserInfo[]): UserInfo[] | Promise<UserInfo[]> {
        data.forEach((item) => (item.friends = ["kanger", "wenhui"]));
        return data;
      }
    }
    class Output extends BaseApp<UserInfo> {
      constructor() {
        super();
      }
      resolveData(data: UserInfo[]): UserInfo[] | Promise<UserInfo[]> {
        const str = JSON.stringify(data);
        fn(str);
        return data;
      }
    }
    class End extends BaseApp<UserInfo> {
      constructor() {
        super();
      }
      resolveData(data: UserInfo[]): UserInfo[] | Promise<UserInfo[]> {
        expect(fn).toBeCalledTimes(3);
        expect(fn).toHaveBeenCalledWith('[{"name":"kiner","age":18}]')
        expect(fn).toHaveBeenCalledWith('[{"name":"kiner","age":18,"friends":["kanger","wenhui"]}]')
        expect(fn).toHaveBeenLastCalledWith('[{"name":"kiner","age":18,"friends":["kanger","wenhui"]}]')
        done();
        return data;
      }
    }

    const app = new App1();
    app
      .pipe(new Output())
      .pipe(new App2())
      .pipe(new Output())
      .pipe(new App3())
      .pipe(new Output())
      .pipe(new End());
  });
  it("🧼 [BaseApp] 事件的订阅发布", () => {
    type UserInfo = {
      name: string;
      age?: number;
      friends?: string[];
    };
    type EventInfo = {
      userName: string;
      pass: string;
    };
    const fn = jest.fn();
    const fn2 = jest.fn();
    class App1 extends BaseApp<UserInfo, EventInfo> {
      constructor() {
        super();
        this.on('login', (e) => {
          fn(e.eventName, e.detail.userName);
        });
        this.on('login', (e) => {
          fn2(e.eventName, e.detail.pass);
        });
        this.emit('login', {
          userName: 'kiner',
          pass: '123456'
        });
      }
    }
    new App1();
    expect(fn).toBeCalledWith('login', 'kiner');
    expect(fn2).toBeCalledWith('login', '123456');
  });
});
