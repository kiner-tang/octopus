import { defineConfig } from 'dumi';

export default defineConfig({
  title: '章鱼埋点',
  mode: 'site',
  logo: '/octopus-logo.png',
  locales: [['zh-CN', '中文']],
  favicon: '/octopus-logo.png',
  outputPath: '../docs',
  publicPath: '/octopus/'
  // more config: https://d.umijs.org/config
});
