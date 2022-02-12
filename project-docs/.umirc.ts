import { defineConfig } from 'dumi';

export default defineConfig({
  title: '章鱼埋点',
  mode: 'site',
  logo: '/octopus/octopus-logo.png',
  locales: [['zh-CN', '中文']],
  favicon: '/octopus-logo.png',
  outputPath: '../docs',
  publicPath: '/octopus/',
  base: '/octopus',
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/kiner-tang/octopus',
    },
  ]
  // more config: https://d.umijs.org/config
});
