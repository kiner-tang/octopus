---
hero:
  title: 🐙 章鱼埋点
  desc: 让小程序埋点随心所欲，触手可及
  actions:
    - text: 快速上手
      link: /getting-started
features:
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png
    title: 接入便捷灵活
    desc: 以 Taro 插件方式接入，方便快捷，配置灵活，开箱即用
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png
    title: 自动全面点监控
    desc: 可根据配置选择开启自动全埋点监控，将针对常见小程序事件和性能指标进行监控，像章鱼一样八爪共用，岂不快哉
  - icon: https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png
    title: 扩展 API
    desc: 利用插件扩展的微信 API 可以更加灵活的处理更多业务场景的复杂问题
footer: Open-source MIT Licensed | Copyright © 2021<br />Powered by [kiner-tang](https://github.com/kiner-tang/octopus)
---

## 简介

相信很多用户侧的小程序都会有各种各样的数据埋点需求，埋点不难，关键是繁琐，有些项目，一个页面甚至要加几十个埋点，监控该类用户行为事件，还有一些项目，需要手机用户设备的性能指标作为后续性能优化的依据。

为了解决这些繁琐有重复的问题，**章鱼埋点**应运而生。就像我们可爱的logo一样，本项目的初衷就是让我们们能够以最小的工作量完成尽可能多的埋点任务，让真正宝贵的时间留给核心业务和性能优化上。

## 设计思路

本项目通过`Taro`的插件作为桥梁链接小程序与章鱼埋点的核心代码。用户在使用时，仅需要在项目中引入本插件即可使用，并可根据具体需求灵活配置插件。此外，还提供了一些扩展 `api`，开发者可以使用`wx.octopusLib.xxx`调用相关`api`辅助我们完成复杂的埋点任务和调试任务。
