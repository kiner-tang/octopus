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
    const audio = wx.octopusLib.createInnerAudioContext();
    audio.src = "https://www.baidu.com/1.mp3";
    audio.play();
    audio.onError((err) => {
      console.log("播放背景音乐失败", err);
    })
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

  render () {
    const { counterStore: { counter } } = this.props.store
    return (
      <View className='index' onClick={() => {
        console.log('11111');
      }}>
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementAsync}>Add Async</Button>
        <Text>{counter}</Text>
        <Input placeholder='请输入你的姓名' id="input" />
        <Detail />
        <Image src="https://www.baidu.com/a.png"/>
        <CoverImage src="https://www.baidu.com/b.png" onError={(error) => {
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
