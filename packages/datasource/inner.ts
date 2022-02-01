/**
 * 基础管道数据流结构
 */
export type Pipeline<T = unknown> = {
  /**
   * 实现该方法可以将数据通过管道一层层传递下去
   * @param data 
   */
  push(data: T[]): Promise<void>;
  /**
   * 将多节管道链接起来
   * e.g.
   * const app = new BaseApp();
   * app.pipe(new TestApp1()).pipe(new TestApp2()).pipe(new TestApp3()).pipe(new Output()).pipe(new End())
   * @param _next 
   */
  pipe(_next: Pipeline<T>): Pipeline<T>;
  /**
   * 用于接受从上一节管道传递下来的数据，可进行加工后传递到下一节管道
   * @param data 
   */
  resolveData(data: T[]): T[] | Promise<T[]>;
};

/**
 * 事件类型
 */
export type EventLike<T = unknown> = {
  eventName: string;
  detail: T;
};
/**
 * 订阅事件回调函数类型
 */
export type EventHandler<T> = (event: EventLike<T>) => void | Promise<void>;
/**
 * 每个需要支持事件订阅发布的类都要实现这个接口
 */
export type Emitter<T> = {
  /**
   * 订阅事件
   * @param {string} eventName 事件名
   * @param {EventHandler} handler 回调
   */
  on(eventName: string, handler: EventHandler<T>): void | Promise<void>;
  /**
   * 发布事件
   * @param {string} eventName 事件名
   * @param {*} data 事件参数
   */
  emit(eventName: string, data: T): void | Promise<void>;
};

/**
 * 一个实现了管道数据流和时间的订阅发布接口的应用基础类，项目中其他类基本都需要集成此类
 */
export class BaseApp<P = unknown, K = unknown>
  implements Pipeline<P>, Emitter<K>
{
  /**
   * 注册的事件列表，用事件名加以管理
   */
  protected readonly handlers: Record<string, EventHandler<K>[]> = {};
  /**
   * 仅内部使用，下一节管道的引用
   */
  protected next: Pipeline<P> | undefined;
  /**
   * 接受到数据后，使用 resolveData 处理获得新书局后，将新数据推送到下一节管道
   * @param data 
   */
  async push(data: P[]): Promise<void> {
    data = await this.resolveData(data);
    this.next?.push(data);
  }
  /**
   * 链接管道
   * 让 pipe 的返回值始终是下一节管道的引用，这样就可以链式调用
   * @param _next 
   * @returns 
   */
  pipe(_next: Pipeline<P>): Pipeline<P> {
    this.next = _next;
    return _next;
  }
  /**
   * 通过事件名将事件回调注册到事件列表当中
   * @param {string} eventName 事件名
   * @param {EventHandler} handler 事件回调
   */
  on(eventName: string, handler: EventHandler<K>): void | Promise<void> {
    (this.handlers[eventName] || (this.handlers[eventName] = [])).push(handler);
  }
  /**
   * 发布事件，将所有相同事件名的回调函数用 data 作为事件参数内容调用一遍
   * @param eventName 事件名
   * @param data 事件参数
   */
  emit(eventName: string, data: K): void | Promise<void> {
    this.handlers[eventName]?.forEach((fn) =>
      fn({
        eventName,
        detail: data,
      })
    );
  }
  /**
   * 数据处理，返回最新的数据对象
   * @param data 
   * @returns 
   */
  resolveData(data: P[]): P[] | Promise<P[]> {
    return data;
  }
}
