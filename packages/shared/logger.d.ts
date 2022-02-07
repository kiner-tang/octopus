export declare enum LoggerLevel {
    all = 4,
    error = 3,
    warning = 2,
    log = 1
}
export declare class Logger {
    private namespace;
    static showLog: boolean;
    static showTime: boolean;
    static showLevel: LoggerLevel;
    constructor(namespace?: string);
    static log(namespace: string, message: string, ...args: any[]): void;
    static warning(namespace: string, message: string, ...args: any[]): void;
    static error(namespace: string, message: string, ...args: any[]): void;
    log(message: string, ...args: any[]): void;
    warning(message: string, ...args: any[]): void;
    error(message: string, ...args: any[]): void;
}
