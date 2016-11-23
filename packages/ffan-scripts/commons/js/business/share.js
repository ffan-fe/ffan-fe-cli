import $ from 'jquery';

var shareScheme = 'wandaappfeifan://app/share';

/**
 * 通过Url参数做分享
 */
export function shareByUrl(params) {

  const {title, content, url} = params;
  if (!title || !content || !url) {
    console && console.log("-- 必选参数错误 --");
    return
  }

  location.href = shareScheme + "?" + $.param(params);
}
