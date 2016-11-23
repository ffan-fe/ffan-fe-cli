import $ from 'jquery';

/**
 * Sample
 */

const apiUrl = 'http://api.ffan.com/ffan/v2/wechat/accessToken';
const apiAccount = 'ffanguangjie';

export default function init(shareConfig){
  console.log('WeChat');

  $.ajax({
    type: 'get',
    url: apiUrl,
    data: {
      account: apiAccount,
      shareUrl: base64encode(window.location.href)
    },
    dataType: 'jsonp',
    success: function (res){
      if(res && res.status == 200) {
        getWXinfoSuccess(res.data, shareConfig);
      }
    }
  });

}

function base64encode(str){
  var out,i,len,base64EncodeChars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var c1,c2,c3;
  len=str.length;
  i=0;
  out="";
  while(i<len){
    c1=str.charCodeAt(i++)&0xff;
    if(i==len){
      out+=base64EncodeChars.charAt(c1>>2);
      out+=base64EncodeChars.charAt((c1&0x3)<<4);
      out+="==";
      break;
    }
    c2=str.charCodeAt(i++);
    if(i==len){
      out+=base64EncodeChars.charAt(c1>>2);
      out+=base64EncodeChars.charAt(((c1&0x3)<<4)|((c2&0xF0)>>4));
      out+=base64EncodeChars.charAt((c2&0xF)<<2);
      out+="=";
      break;
    }
    c3=str.charCodeAt(i++);
    out+=base64EncodeChars.charAt(c1>>2);
    out+=base64EncodeChars.charAt(((c1&0x3)<<4)|((c2&0xF0)>>4));
    out+=base64EncodeChars.charAt(((c2&0xF)<<2)|((c3&0xC0)>>6));
    out+=base64EncodeChars.charAt(c3&0x3F);
  }
  return out;
}

function getWXinfoSuccess(data, shareConfig) {
  wx.config({
    debug: true,
    appId: data.appId, // 必填，公众号的唯一标识
    timestamp: data.timestamp, // 必填，生成签名的时间戳
    nonceStr: data.nonceStr, // 必填，生成签名的随机串
    signature: data.signature,// 必填，签名，见附录1
    jsApiList: [
      "onMenuShareTimeline",
      "onMenuShareAppMessage",
      "onMenuShareQQ",
      "onMenuShareWeibo",
      "onMenuShareQZone",
      "showMenuItems"
    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  });

  wx.ready(function(){
    // 分享到朋友圈
    wx.onMenuShareTimeline(shareConfig);
    // 分享给朋友
    wx.onMenuShareAppMessage(shareConfig);
    // 分享到QQ
    wx.onMenuShareQQ(shareConfig);
    // 分享到QQ空间
    wx.onMenuShareQZone(shareConfig);
  });
}
