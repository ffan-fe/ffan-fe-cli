import $ from 'jquery';
import ffanSDK from '../_commons/js/ffan-sdk.min';
import './assets/index.less';

/**
 * Sample
 */
$(function init() {
  console.log('NativeShare');

  ffanSDK.ready(()=>{
    const shareData = {
      title: '畅游一夏购幸运，天天签到抽好礼！',
      content: '暑期礼不停!',
      content_tencent: '好礼天天送!',
      content_weibo: 'sdsdsdsdsd！',
      picSrc: src,
      url: 'http://h5.ffan.com/newactivity/160730_slot_share.html',
      shareChannel: 15
    };

    // 设置分享信息，显示分享按钮
    ffanSDK.share({
      data: shareData,
      success: function(res) {},
      fail: function(err) {}
    })

    // 唤起分享
    ffanSDK.shareTo({
      data: shareData,
      success: function(res) {},
      fail: function(err) {}
    })
  })

});


