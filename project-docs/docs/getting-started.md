---
nav:
  title: 快速上手
  order: 1
---

# 快速上手

## 📦 安装

```bash
yarn add @kiner/octopus-plugins @kiner/octopus-transformer @kiner/octopus-transporter
```

## 🔌 使用

以下为基础调用示例，详细信息请看 API 文档

```js
// config/index.js

const { defineConfig } = require('@kiner/octopus-plugins');

const config = {
  // ...
  plugins: [
    [
      '@kiner/octopus-plugins',
      defineConfig({
        debug: true,
        transformerOptions: {
          transformer(ds) {
            // console.log("=====>", ds);
            ds.datasource.text = '哈哈哈哈';
            return ds.datasource;
          },
        },
        transporterOptions: {
          mode: "sendAllOverflow",
          limit: 5,
          isSendEventList: true,
          requestOptions: {
            server: 'https://www.baidu.com/log',
            method: 'POST',
            header: {
              'test-header': "xxxx"
            }
          },
        },
      }),
    ],
  ],
  // ...
};
```
