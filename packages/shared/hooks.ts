import { AppLifecycleName } from "./baseData";

/**
 * 项目生命周期触发的钩子
 */
export type InnerHooks = {
    onDatasource: () => void | Promise<void>
};
/**
 * 项目运行时触发的钩子
 */
export type RuntimeHooks = {
    onAppLifecycle: (name: AppLifecycleName) => void | Promise<void>;
};