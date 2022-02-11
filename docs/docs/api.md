---
nav:
  title: API
---

# API

## 插件配置

### debug - 调试模式

- **类型:** `boolean`

- **必传:** `否`

- **默认:** `true`

当该选项设置为`true`时，会在小程序运行阶段打印一些必要的日志，辅助查找问题。

### complieOptions - 编译选项

#### include - 编译包含文件

- **类型:** `(string|RegExp)[]`

- **必传:** `否`

- **默认:** `[/pages\/.*\.(js|js\.map)$/, /app\.(js|js\.map)$/, 'base.wxml', 'taro.js']`

该选项用于指定我们需要在编译时需要处理的代码（代码为编译后的代码路径），正常情况下不需要传入，使用默认参数即可，但有一些特殊的外需求时可能会用到，比如我们的`js`文件，出了`pages`目录下存在，还可能放在`components`目录，此时我们就可以指定该目录到包含数组当中。

#### exclude - 编译排除文件

- **类型:** `(string|RegExp)[]`

- **必传:** `否`

- **默认:** `[]`

我们某些文件需要排除的，可以添加进入排除数组，用法与`include`类似。

### mode - 模式

- **类型:** `'default' | 'all' | 'custom' | 'manual'`

- **必传:** `否`

- **默认:** `'default'`

插件运行模式，不同的模式又不同的默认配置。

- `deault模式`
  > 默认模式：该模式下有着适合大部分业务场景埋点的相关配置，配置中的相关字段说明见下文：

  ```typescript
  {
    debug: false,
    complieOptions: {
      include: [/pages\/.*\.(js|js\.map)$/, /app\.(js|js\.map)$/, 'base.wxml', 'taro.js'],
      exclude: [],
    },
    mode: "default",
    registerEventList: [
      "tap",
      "input",
      "focus",
      "blur",
      "longpress",
    ],
    networkApi: {
      request: {
        isSuccess: (data) => {
          return !!data;
        },
      },
      uploadFile: true,
      downloadFile: true,
    },
    loadErrorEventList: [
        'image',
        'coverImage',
        'video',
        'audio',
    ],
    pageLifecycleEventList: [
      "onShareTimeline",
      "onShareAppMessage",
      "onTabItemTap",
      "onAddToFavorites",
      "onReady",
      "onShow",
      "onHide",
    ],
    appLifecycleEventList: ["onLaunch", "onPageNotFound", "onUnhandledRejection"],
    transporterOptions: {
      mode: "sendWhenPush"
    },
  }
  ```

- `all模式`

> 全量模式：与默认模式仅收集一些常用高频事件不同的是，此模式会收集支持的所有事件

```typescript
{
    debug: false,
    complieOptions: {
      include: [/pages\/.*\.(js|js\.map)$/, /app\.(js|js\.map)$/, 'base.wxml', 'taro.js'],
      exclude: [],
    },
    mode: "default",
    registerEventList: [
        "tap"
        "click"
        "touchstart"
        "touchmove"
        "touchend"
        "touchcancel"
        "scroll"
        "input"
        "change"
        "focus"
        "blur"
        "longpress"
        "longtap"
    ],
    pageLifecycleEventList: [
        "onPageScroll",
        "onShareAppMessage",
        "onShareTimeline",
        "onAddToFavorites",
        "onTabItemTap",
        "onReady",
        "onShow",
        "onHide",
    ],
    appLifecycleEventList: [
        "onLaunch",
        "onThemeChange",
        "onUnhandledRejection",
        "onShow",
        "onHide",
        "onPageNotFound",
    ],
    loadErrorEventList: [
        'image',
        'coverImage',
        'video',
        'audio',
    ],
    networkApi: {
      request: {
        isSuccess: (data) => {
          console.log('isSuccess: ', data);
          return !!data;
        },
      },
      uploadFile: true,
      downloadFile: true,
    },
    transporterOptions: {
      mode: "sendWhenPush"
    },
}

```

- `manual模式`

> 手动模式：只有一些基础的编译选项相关参数，所有的事件都交由开发者自己指定注册

```typescript
{
    debug: false,
    complieOptions: {
      include: [/pages\/.*\.(js|js\.map)$/, /app\.(js|js\.map)$/, 'base.wxml', 'taro.js'],
      exclude: [],
    },
    mode: "manual",
    registerEventList: [],
    loadErrorEventList: [],
    pageLifecycleEventList: [],
    appLifecycleEventList: [],
    transporterOptions: {
      mode: "console"
    },
}

```

- `custom模式`

> 自定义模式：完全由开发者自定义，不设置默认参数

```typescript
{
    debug: false,
    complieOptions: {
      include: [],
      exclude: [],
    },
    mode: "custom",
    registerEventList: [],
    loadErrorEventList: [],
    pageLifecycleEventList: [],
    appLifecycleEventList: [],
    transporterOptions: {
      mode: "none"
    },
}

```

### registerEventList - 用户触发类事件列表

- **类型:** `string[]`

- **必传:** `否`

- **默认:** `["tap", "input", "focus", "blur", "longpress"]`

需要收集的用户触发类事件列表，以下为支持的完整事件列表：

```typescript
[
    "tap"
    "click"
    "touchstart"
    "touchmove"
    "touchend"
    "touchcancel"
    "scroll"
    "input"
    "change"
    "focus"
    "blur"
    "longpress"
    "longtap"
]
```

### loadErrorEventList - 资源加载失败类事件监听列表

- **类型:** `string[]`

- **必传:** `否`

- **默认:** `['image','coverImage','video','audio']`

需要收集资源加载失败类事件监听列表，由于资源加载失败算是比较重要的事件，因此默认全部监听，以下为支持的完整事件列表：

```typescript
[
    'image',
    'coverImage',
    'video',
    'audio',
]
```

### pageLifecycleEventList - 页面生命周期函数监听

- **类型:** `string[]`

- **必传:** `否`

- **默认:** `['onShareTimeline','onShareAppMessage','onTabItemTap','onAddToFavorites','onShow','onHide','onReady']`

页面生命周期函数监听事件列表，以下为支持的完整事件列表：

```typescript
[
    'onPageScroll',
    'onShareAppMessage',
    'onShareTimeline',
    'onAddToFavorites',
    'onTabItemTap',
    'onReady',
    'onHide',
    'onShow',
]
```

### appLifecycleEventList - 小程序生命周期函数监听

- **类型:** `string[]`

- **必传:** `否`

- **默认:** `["onLaunch","onPageNotFound","onUnhandledRejection"]`

小程序生命周期事件监听列表，以下为支持的完整事件列表：

```typescript
[
    'onLaunch',
    'onThemeChange',
    'onUnhandledRejection',
    'onShow',
    'onHide',
    'onPageNotFound',
]
```

### networkApi - 网络请求Api相关配置

- **类型:** `object|boolean`

- **必传:** `否`

- **默认:** `{request: {isSuccess: data => !!data}, uploadFile: true, downloadFile: true}`

包括接口请求、文件上传、下载在内的网络请求监控的相关配置，由于有时我们不仅仅要判断接口是否请求成功，还需要判断业务逻辑是否正常，因此，增加一个判断从网络请求和业务逻辑双重层面成功的方法`isSuccess`。该方法会传入以下参数作为入参供给判断是否成功：

- `responseData` - 接口返回的响应结果(下载文件没有返回结果，直接下载，因此没有此参数)
- `res` - 微信小程序调用 api 实际返回结果(下载文件没有返回结果，直接下载，因此没有此参数)
- `options` - 调用当前 api 传入的参数

### transformerOptions - 数据转换器选项

#### transformer - 自定义转换函数

- **类型:** `(datasource) => NormalDatasource | Promise<NormalDatasource>`

- **必传:** `否`

- **默认:** `无`

函数接受一个标准数据源对象作为入参，需要返回修改过后的数据源作为返回值完成对原始数据源的修改，如：

```typescript
{
    transformerOptions: {
        transformer(ds) {
        // console.log("=====>", ds);
        ds.datasource.text = '哈哈哈哈';
        return ds.datasource;
        },
    },
}
```

### transporterOptions - 上报通道选项

#### mode - 上报模式

- **类型:** `'none' | 'console' | 'sendAllOverflow' | 'sendWhenPush'`

- **必传:** `否`

- **默认:** `'sendWhenPush'`

开发者可以根据需要选择不同的上报模式：

- `none` - 不进行上报，也不在控制台输出

- `console` - 不进行上报，但会将收集整理的数据信息打印在控制台上，通常用于开发环境调试

- `sendAllOverflow` - 当事件队列中事件的数量达到规定阈值时一次性全部提交上报，如果未达到阈值，则暂缓上报，不过事件队列将会保存在小程序的本地存储当中，防止未发送的事件丢失。

- `sendWhenPush` - 每有一条数据被收集到事件队列就会发送一条，即实时发送。

### limit - 事件队列阈值

- **类型:** `number`

- **必传:** `否`

- **默认:** `10`

事件队列的阈值，当选择上报模式为：`sendAllOverflow`用于控制发送实际

### transformParams - 请求参数转换函数

- **类型:** `(datasoureList: NormalDatasource[]) => any;`

- **必传:** `否`

- **默认:** `无`

当使用默认的上报方式上报数据时，可能需要将数据源转换为`querystring`或指定格式的数据再提交，可以使用这个函数

### isSendEventList - 是否合并发送事件列表

- **类型:** `boolean`

- **必传:** `否`

- **默认:** `false`

如果一次需要发送的数据比较多时，是否合并成一次请求以数组形式发送

### requestOptions - 默认请求配置

#### server - 上报的日志服务器 url

#### method - 上报方法

#### header - 自定义请求头

- **类型:** `object`

- **必传:** `否`

- **默认:** `{}`

### customRequest - 自定义请求方法

- **类型:** `(options: { pluginOptions: TaroOctopusPluginsOptions; datasource: NormalDatasource;}) => Promise<void>`

- **必传:** `否`

- **默认:** `无`

如果是比较复杂的上报，无法使用默认的上报方法，可以使用此方法进行自定已上报
