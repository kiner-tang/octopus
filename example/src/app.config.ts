export default defineAppConfig({
  pages: ['pages/index/index', 'pages/mine/index'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    color: '#333',
    selectedColor: 'red',
    backgroundColor: '#f2f3f7',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '้ฆ้กต',
      },
      {
        pagePath: 'pages/mine/index',
        text: 'ๆ็',
      },
    ],
  },
});
