export function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  } else {
    return null
  }
}

export const getLocal = (name) => {
  return localStorage.getItem(name)
}

export const setLocal = (name, value) => {
  localStorage.setItem(name, value)
}



// 图片前缀方法，生产环境使用相对路径由Nginx代理
export const prefix = (url) => {
  if (url && url.startsWith('http')) {
    return url
  } else {
    // 开发环境直连后端，生产环境走Nginx代理
    const baseUrl = import.meta.env.MODE === 'development' ? 'http://localhost:28019' : ''
    url = `${baseUrl}${url}`
    return url
  }
}
