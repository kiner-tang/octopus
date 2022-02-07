import { timeFormat } from "./utils";
import { BaseApp } from "./inner";

export enum LoggerLevel {
    all = 4,
    error = 3,
    warning = 2,
    log = 1,
}

export class Logger {
    static showLog = false;
    static showTime = true;
    static showLevel = LoggerLevel.all;
    constructor(private namespace: string = "__DEFAULT_LOGGER_NAMESPACE__"){}
    static log(namespace: string, message: string, ...args: any[]) {
        if(Logger.showLog && (Logger.showLevel === LoggerLevel.log || Logger.showLevel === LoggerLevel.all)) {
            const time = Logger.showTime ? `<${timeFormat(new Date())}>`:'';
            args.push("\n");
            console.log(`\n🐙 ${time}[${namespace}] ${message}\n`, ...args);
        }
    }
    static warning(namespace: string, message: string, ...args: any[]) {
        if(Logger.showLog && (Logger.showLevel === LoggerLevel.warning || Logger.showLevel === LoggerLevel.all)) {
            const time = Logger.showTime ? `<${timeFormat(new Date())}>`:'';
            args.push("\n");
            console.warn(`\n🐙 ${time}[${namespace}] ${message}\n`, ...args);
        }
    }
    static error(namespace: string, message: string, ...args: any[]) {
        if(Logger.showLog && (Logger.showLevel === LoggerLevel.error || Logger.showLevel === LoggerLevel.all)) {
            const time = Logger.showTime ? `<${timeFormat(new Date())}>`:'';
            args.push("\n");
            console.error(`\n🐙 ${time}[${namespace}] ${message}\n`, ...args);
        }
    }
    log(message: string, ...args: any[]) {
        Logger.log(this.namespace, message, ...args);
    }
    warning(message: string, ...args: any[]) {
        Logger.warning(this.namespace, message, ...args);
    }
    error(message: string, ...args: any[]) {
        Logger.error(this.namespace, message, ...args);
    }
}