export declare class Queue<T = unknown> {
    private readonly _queue;
    push(data: T): void;
    dequeue(): T | undefined;
    size(): number;
    tail(): T | undefined;
    head(): T | undefined;
    empty(): boolean;
    clear(): void;
    flush(callback: (data: T) => void): void;
}
