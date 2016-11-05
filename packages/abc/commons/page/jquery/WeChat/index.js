import $ from 'jquery';
import './assets/index.less';
import wechat from './assets/wechat'

/**
 * Sample
 */

const shareConfig = {
  title: '分享标题',
  desc: '分享描述',
  link: '点击之后跳转链接',
  imgUrl: '图片地址',
  type: null, // 分享类型,music、video或link，不填默认为link
  dataUrl: null , // 如果type是music或video，则要提供数据链接，默认为空
  success: function () {},
  cancel: function () {}
};


$(function init() {
  wechat(shareConfig)
})
