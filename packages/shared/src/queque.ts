import { eventQueueStorageKey } from "./constant";

export class Queue<T = unknown> {
    private readonly _queue: T[] = [];
    constructor(init: T[] = []){
        this._queue.push(...init);
    }
    push(data: T): void {
        this._queue.push(data);
        wx.setStorageSync(eventQueueStorageKey, this._queue);
    }
    dequeue(): T | undefined {
        const cur = this._queue.shift();
        wx.setStorageSync(eventQueueStorageKey, this._queue);
        return cur;
    }
    size(): number {
        return this._queue.length;
    }
    tail(): T | undefined {
        if(this.empty()) return undefined;
        return this._queue[this.size() - 1];
    }
    head(): T | undefined {
        if(this.empty()) return undefined;
        return this._queue[0];
    }
    empty(): boolean {
        return this.size() === 0;
    }
    clear(): void {
        this._queue.length = 0;
    }
    all(): T[] {
        return [...this._queue];
    }
    flush(callback: (data: T) => void): void {
        while(!this.empty()) {
            const item = this.dequeue();
            item && callback(item);
        }
    }
    stringify() {
        return JSON.stringify(this._queue);
    }
}