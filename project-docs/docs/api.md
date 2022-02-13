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

## 扩展API

### 基础调用方法

`octopus`会在`wx`这个命名空间下面增加一个子命名空间`octopusLib`的命名空间，我们的扩展工具都放在这个命名空间下。

```typescript
wx.octopusLib.xxxx
```

### config - 配置信息

这里存放着包括版本号、插件选项等基础信息

| 属性                | 描述         |
|:-----------------:|:----------:|
| `version`         | 当前插件的版本号   |
| `libName`         | 工具库名称      |
| `libFilePath`     | 当前工具库的文件地址 |
| `loggerNamespace` | 日志打印的命名空间  |
| `pluginOptions`   | 插件配置，同上    |

### getBoundingClientRect

根据元素选择器获取元素的边界信息的工具方法

```typescript
const rect = await wx.octopusLib.getBoundingClientRect('._n_17');
console.log(rect);
// {
//     "boundingClientRect": [
//         {
//             "id": "_n_13",
//             "dataset": {
//                 "attrs": "size='default'|type=''|plain='false'|disabled=''|loading='false'|form-type=''|open-type=''|hover-class='button-hover'|hover-stop-propagation='false'|hover-start-time='20'|hover-stay-time='70'|name=''|bindtouchstart='eh'|bindtouchmove='eh'|bindtouchend='eh'|bindtouchcancel='eh'|bindlongpress='eh'|lang=''|session-from=''|send-message-title=''|send-message-path=''|send-message-img=''|app-parameter=''|show-message-card='false'|business-id=''|bindgetuserinfo='eh'|bindcontact='eh'|bindgetphonenumber='eh'|binderror='eh'|bindopensetting='eh'|bindlaunchapp='eh'|style=''|class=' octopusLib-inject-class  _n_13'|bindtap='eh'|id='_n_13'|data-sid='_n_13'|data-tag='button'",
//                 "sid": "_n_13",
//                 "tag": "button"
//             },
//             "left": 12,
//             "right": 308,
//             "top": 186,
//             "bottom": 232,
//             "width": 296,
//             "height": 46
//         }
//     ],
//     "scrollOffset": {
//         "id": "",
//         "dataset": {},
//         "scrollLeft": 0,
//         "scrollTop": 0,
//         "scrollWidth": 320,
//         "scrollHeight": 1269
//     }
// }
```

### isClickTrackArea

根据点击位置和页面元素的`rect`判断是否点中某个元素

```typescript
const [boundingClientRect, scrollOffset] = await wx.octopusLib.getBoundingClientRect('._n_17');
const isHit = wx.octopusLib.isClickTrackArea({x: 0, y: 0}, boundingClientRect, scrollOffset);

console.log(isHit);
// true
```

### getPrevPage

获取当前页面的上一个页面实例

```typescript
const prevPage = wx.octopusLib.getPrevPage();
```

### getActivePage

获取当前正打开的页面

```typescript
const prevPage = wx.octopusLib.getActivePage();
```

### logger

内部日志打印方法，传入的第一个参数为字符串，作为日志标题，后面的所有参数类型不限，将会被折叠起来，方便查看。

```typescript
wx.octopusLib.logger('测试消息', {userInfo: {name: "kiner"}});
```

### getViewDataBySid

根据`sid`获取组件数据

- params

  - `sid` - 目标组件的`sid`

  - [可选] `cn` - 组件数据树，默认为根节点数据树

```typescript
const data1 = wx.octopusLib.getViewDataBySid('_n_17');
// 或
const { data } = wx.octopusLib.getActivePage();
const data2 = wx.octopusLib.getViewDataBySid(sid, data.root.cn);
```

### flatCn

将组件数据树拍平成一维数组

```typescript
const { data } = wx.octopusLib.getActivePage();
console.log(wx.octopusLib.flatCn(data.root.cn));
```

### getCustomDataBySid

工具方法，根据 sid 获取该元素的自定义埋点字段对象

```typescript
// <Button data-octopus-customData={{name: "kiner", age: 18}}>自定义用户参数</Button>
// 设当前组件的内部 sid 为 "_n_12"
wx.octopusLib.getCustomDataBySid("_n_12"); // {name: "kiner", age: 18}
```

### getTextBySid

工具方法，根据 sid 获取该元素的文本内容

```typescript
// 由于 sid 是在编译过程中自动生成的，因此，下面的代码是通过 taro 编译后生成的 wxml 代码：
// <view id="_n_17">这是文本内容</view>

wx.octopusLib.getTextBySid('_n_17');// 这是文本内容
```

### collectDataEvent

内部统一的用于收集数据的事件，内部所有事件收集都是用这个方法

```typescript
wx.octopusLib.collectDataEvent({
    type: "customEvent",
    subType: "loadError",
    detail: {
        // ....
    }
})
```

### pushData

手动往事件队列里面添加事件，当自动埋点无法完全满足需求时，可以辅助此方法将要埋点的事件手动添加到事件队列中。

```typescript
wx.octopusLib.pushData({
  type: "custom",
  subType: "customEvent",
  customData: {
    userInfo: {
      name: "kiner",
      age: 18
    }
  }
});
```

### request

重载微信接口请求的方法，如果想要监控`request`请求失败的事件，请用这个方法替代`wx.request`，调用方式和返回结果跟原`API`相同

```typescript
wx.octopusLib.request({
    url: "https://www.baidu.com/xxx.png",
    fail: (options) => {
      console.log('请求失败---->', options, options.errMsg)
    },
    success: (res => {
      console.log('请求成功---->', res);
    })
});
```

### createInnerAudioContext

重载微信创建内部音频上下文方法，如果想要监控音频加载失败事件，请使用这个方法替代`wx.createInnerAudioContext`，调用方式与返回结果跟原`API`相同

```typescript
const audio = wx.octopusLib.createInnerAudioContext();
audio.src = "https://www.baidu.com/1.mp3";
audio.play();
audio.onError((err) => {
console.log("播放背景音乐失败", err);
});
```

### uploadFile

重载微信上传文件方法，如果想监控文件上传失败事件，请使用此方法替代`wx.uploadFile`，调用方式与返回结果跟原`API`相同

```typescript
wx.chooseImage({
  count: 1,
  sourceType: ["album"],
  success: res => {
    wx.octopusLib.uploadFile({
      filePath: res.tempFilePaths[0],
      name: "file",
      url: "https://www.xxx.com/upload.json",
      fail: res => {
        console.log("上传失败：", res);
      }
    })
  }
})
```

### downloadFile

冲债微信下载文件的方法，如果想监控文件下载失败事件，请使用此方法替代`wx.downloadFile`，调用方式与返回结果跟原`API`相同

```typescript
wx.octopusLib.downloadFile({
  url: "https://www.baidu.com/xxx.png",
  fail: res => {
    console.log("下载失败：", res)
  }
});
```
