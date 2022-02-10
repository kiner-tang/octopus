export declare class Queue<T = unknown> {
    private readonly _queue;
    push(data: T): void;
    dequeue(): T | undefined;
    size(): number;
    tail(): T | undefined;
    head(): T | undefined;
    empty(): boolean;
    clear(): void;
    all(): T[];
    flush(callback: (data: T) => void): void;
    stringify(): string;
}
