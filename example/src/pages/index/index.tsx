import { Component } from 'react'
import { View, Button, Text, Input, Image, CoverImage, Video } from '@tarojs/components'
import { observer, inject } from 'mobx-react';
import Detail from '../../components/detail';

import './index.scss'

type PageStateProps = {
  store: {
    counterStore: {
      counter: number,
      increment: Function,
      decrement: Function,
      incrementAsync: Function
    }
  }
}
interface Index {
  props: PageStateProps;
}

@inject('store')
@observer
class Index extends Component {
  componentWillMount () { }

  componentDidMount () {
    setTimeout(() => {
      const audio = wx.octopusLib.createInnerAudioContext();
      audio.src = "https://www.baidu.com/1.mp3";
      audio.play();
      audio.onError((err) => {
        console.log("播放背景音乐失败", err);
      });
      wx.octopusLib.request({
        url: "https://www.baidu.com/xxx.png",
        fail: (options) => {
          console.log('请求失败---->', options, options.errMsg)
        },
        success: (res => {
          console.log('请求成功---->', res);
        })
      });
      wx.octopusLib.request({
        url: "https://raw.githubusercontent.com/paazmaya/shuji/master/package.json",
        fail: (options) => {
          console.log('请求失败---->', options, options.errMsg)
        },
        success: (res => {
          console.log('请求成功---->', res);
        })
      });
    }, 1000);
  }

  uploadFile() {
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
  }
  downloadFile() {
    wx.octopusLib.downloadFile({
      url: "https://www.baidu.com/xxx.png",
      fail: res => {
        console.log("下载失败：", res)
      }
    });
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  increment = () => {
    const { counterStore } = this.props.store
    counterStore.increment()
  }

  decrement = () => {
    const { counterStore } = this.props.store
    counterStore.decrement()
  }

  incrementAsync = () => {
    const { counterStore } = this.props.store
    counterStore.incrementAsync()
  }

  manual(e) {
    wx.octopusLib.pushData({
      type: "click",
      subType: "customClickEvent",
      customData: {
        userInfo: {
          uuid: "1234",
          name: "testtest"
        }
      },
      oriEvent: e
    });
  }
  manualCustom() {
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
  }

  onShareAppMessage (res) {
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  }

  doError() {
    console.log(a + b);
  }

  render () {
    const { counterStore: { counter } } = this.props.store
    return (
      <View className='index' onClick={() => {
        console.log('11111');
      }}>
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementAsync}>Add Async</Button>
        <Button onClick={this.uploadFile}>上传文件测试</Button>
        <Button onClick={this.downloadFile}>下载文件测试</Button>
        <Button onClick={this.doError}>触发报错</Button>
        <Button className='octopus-ignore' onClick={(e) => {
          console.log('-=-=-=->', e);
        }}>忽略事件</Button>
        <Button data-octopus-customData={{name: "kiner", age: 18}}>自定义用户参数</Button>
        <Button data-octopus-customData={{name: "kanger", age: 8, sex: '女'}}>自定义用户参数2</Button>
        <Button data-octopus-customData={{name: "zongheng", age: 3}}>自定义用户参数3</Button>
        <Button onClick={this.manual}>手动埋点(内置事件名)</Button>
        <Button onClick={this.manualCustom}>手动埋点(自定义事件名)</Button>
        <Text>{counter}</Text>
        <Input placeholder='请输入你的姓名' id="input" />
        <Detail />
        <Image src="https://www.baidu.com/a.png" data-octopus-customData={{uid: "111111", name: 'ddddd'}}/>
        <CoverImage src="https://www.baidu.com/b.png" data-octopus-customData={{uid: "2222222", name: 'ddddd'}} onError={(error) => {
          console.log('CoverImage加载失败', error);
        }} />
        <Video src="https://www.baidu.com/c.mp4" onError={() => {
          console.log('视频加载失败')
        }} />
      </View>
    )
  }
}

export default Index
