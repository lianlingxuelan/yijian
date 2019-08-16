Date.prototype.Format = function (fmt) {
  let o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  }
  return fmt
}
Date.prototype.FormatDefault = function () {
  return this.Format('yyyy/MM/dd HH:mm:ss')
}
Date.prototype.NatureTime = function (time) {
  if (!time) time = new Date().getTime()
  let c = (time - this.getTime()) / 1000
  if (c <= 10) { return '刚刚' } else if (c < 60) { return c.toFixed(0) + ' 秒前' } else if (c < 3600) { return (c / 60).toFixed(0) + ' 分钟前' } else if (c < 3600 * 24) { return (c / 3600).toFixed(0) + ' 小时前' } else if (c < 3600 * 24 * 30) { return (c / 3600 / 24).toFixed(0) + ' 天前' } else { return (c / 3600 / 24).toFixed(0) + ' 天前' }
}
