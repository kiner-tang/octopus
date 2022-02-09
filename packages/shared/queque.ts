export class Queue<T = unknown> {
    private readonly _queue: T[] = [];
    push(data: T): void {
        this._queue.push(data);
    }
    dequeue(): T | undefined {
        return this._queue.shift();
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
    flush(callback: (data: T) => void): void {
        while(!this.empty()) {
            const item = this.dequeue();
            item && callback(item);
        }
    }
}