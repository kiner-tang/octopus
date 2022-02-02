
/**
 * App 生命周期统计指标集
 */
export type AppLifecycleIndexSet = {};

/**
 * APP 各个生命周期收集的统计指标集
 */
export type AppLifecycle = {
    onLaunch: AppLifecycleIndexSet,
    onShow: AppLifecycleIndexSet,
    onHide: AppLifecycleIndexSet,
    onError: AppLifecycleIndexSet,
    onPageNotFound: AppLifecycleIndexSet,
    onUnhandledRejection: AppLifecycleIndexSet,
    onThemeChange: AppLifecycleIndexSet,
};

/**
 * Page 生命周期统计指标集
 */
 export type PageLifecycleIndexSet = {};
/**
 * Page 各个生命周期手机的统计指标集
 */
export type PageLifecycle = {
    onLoad: PageLifecycleIndexSet,
    onShow: PageLifecycleIndexSet,
    onHide: PageLifecycleIndexSet,
    onReady: PageLifecycleIndexSet,
    onReachBottom: PageLifecycleIndexSet,
    onPullDownRefresh: PageLifecycleIndexSet,
    onShareAppMessage: PageLifecycleIndexSet,
    onShareTimeline: PageLifecycleIndexSet,
    onAddToFavorites: PageLifecycleIndexSet,
    onPageScroll: PageLifecycleIndexSet,
    onResize: PageLifecycleIndexSet,
    onTabItemTap: PageLifecycleIndexSet,
    onSaveExitState: PageLifecycleIndexSet,
};

/**
 * 用户行为统计指标集
 */
export type UserBehaviorIndexSet = {};
/** 用户行为统计指标 */
export type UserBehavior = {
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
export type AppPerformanceIndexSet = {};
/**
 * 应用性能指标
 */
export type AppPerformance = {
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
}

/**
 * 需要收集的统计指标
 */
export type BaseData = {
    /** app 生命周期 */
    appLifecycle: AppLifecycle;
    /** 页面生命周期 */
    pageLifecycle: PageLifecycle;
    /** 用户行为 */
    userBehavior: UserBehavior;
    /** 性能指标 */
    performance: AppPerformance
};