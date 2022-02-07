/**
 * App 生命周期统计指标集
 */
export declare type AppLifecycleIndexSet = {
    /** 触发该生命周期的时间 */
    time: number;
    /** 如果是 onError 则记录错误堆栈 */
    err?: string;
    /** 页面找不到的相关信息 */
    pageNotFountInfo?: {
        /** 不存在页面的路径 (代码包路径) */
        path: string;
        /** 打开不存在页面的 query 参数 */
        query: Record<string, any>;
        /** 是否本次启动的首个页面（例如从分享等入口进来，首个页面是开发者配置的分享页面） */
        isEntryPage: boolean;
    };
    /** 未处理的 Promise 拒绝事件相关信息 */
    unhandledRejectionInfo?: {
        /** 拒绝原因，一般是一个 Error 对象 */
        reason: string;
        /** 被拒绝的 Promise 对象 */
        promise: PromiseLike<any>;
    };
    /** 主题改变事件信息 */
    themeChangeInfo?: {
        theme: string;
    };
};
/**
 * APP 各个生命周期收集的统计指标集
 */
export declare type AppLifecycle = {
    onLaunch: AppLifecycleIndexSet;
    onShow: AppLifecycleIndexSet;
    onHide: AppLifecycleIndexSet;
    onError: AppLifecycleIndexSet;
    onPageNotFound: AppLifecycleIndexSet;
    onUnhandledRejection: AppLifecycleIndexSet;
    onThemeChange: AppLifecycleIndexSet;
};
/**
 * APP 各生命周期名称
 */
export declare type AppLifecycleName = keyof AppLifecycle;
/**
 * Page 生命周期统计指标集
 */
export declare type PageLifecycleIndexSet = {
    time: number;
};
/**
 * Page 各个生命周期手机的统计指标集
 */
export declare type PageLifecycle = {
    onLoad: PageLifecycleIndexSet;
    onShow: PageLifecycleIndexSet;
    onHide: PageLifecycleIndexSet;
    onReady: PageLifecycleIndexSet;
    onReachBottom: PageLifecycleIndexSet;
    onPullDownRefresh: PageLifecycleIndexSet;
    onShareAppMessage: PageLifecycleIndexSet;
    onShareTimeline: PageLifecycleIndexSet;
    onAddToFavorites: PageLifecycleIndexSet;
    onPageScroll: PageLifecycleIndexSet;
    onResize: PageLifecycleIndexSet;
    onTabItemTap: PageLifecycleIndexSet;
    onSaveExitState: PageLifecycleIndexSet;
};
/**
 * 用户行为统计指标集
 */
export declare type UserBehaviorIndexSet = {
    time: number;
};
/** 用户行为统计指标 */
export declare type UserBehavior = {
    /** 点击事件 */
    tap: UserBehaviorIndexSet;
    /** 滚动事件 */
    pageScroll: UserBehaviorIndexSet;
    /** 视图组件滚动事件 */
    viewScroll: UserBehaviorIndexSet;
    /** 表单输入事件 */
    input: UserBehaviorIndexSet;
    /** 手指开始触摸事件 */
    touchstart: UserBehaviorIndexSet;
    /** 手指触摸后移动事件 */
    touchmove: UserBehaviorIndexSet;
    /** 手指触摸被打断事件 */
    touchcancel: UserBehaviorIndexSet;
    /** 手指触摸后，超过350ms再离开事件 */
    longpress: UserBehaviorIndexSet;
    /** 手指触摸后，超过350ms再离开事件 */
    longtap: UserBehaviorIndexSet;
};
/**
 * 应用性能指标集
 */
export declare type AppPerformanceIndexSet = {
    time: number;
};
/**
 * 应用性能指标
 */
export declare type AppPerformance = {
    /** 路由性能 */
    route: AppPerformanceIndexSet;
    /** 小程序启动耗时 */
    appLaunch: AppPerformanceIndexSet;
    /** 页面首次渲染耗时 */
    firstRender: AppPerformanceIndexSet;
    /** 页面首次绘制耗时 */
    firstPaint: AppPerformanceIndexSet;
    /** 页面首次内容绘制耗时 */
    firstContentfulPaint: AppPerformanceIndexSet;
    /** 注入脚本耗时 */
    evaluateScript: AppPerformanceIndexSet;
};
/**
 * 需要收集的统计指标
 */
export declare type BaseData = {
    /** app 生命周期 */
    appLifecycle: Partial<AppLifecycle>;
    /** 页面生命周期 */
    pageLifecycle: Partial<PageLifecycle>;
    /** 用户行为 */
    userBehavior: Partial<UserBehavior>;
    /** 性能指标 */
    performance: Partial<AppPerformance>;
};
