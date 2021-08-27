var timerArray = []
let timerMap = new Map();

export default {
  setInterval (fun, ms) {
    var timer = window.setInterval(fun, ms)
    timerArray.push(timer)
    return timer
  },
  clearInterval (timer) {
    // 关闭定时器
    window.clearInterval(timer)
  },
  clearAllTimer () {
    if (timerArray && timerArray.length > 0) {
      for (var i = 0; i < timerArray.length; i++) {
        window.clearInterval(timerArray[i])
      }
    }
    timerArray = []
  },

  /**
   * 添加一个倒计时
   *
   * @param {Object} timeoutName
   * @param {Object} timeoutFun
   * @param {Object} ms
   */
  addTimeout (timeoutName, timeoutFun, ms) {
    let timer = setTimeout(timeoutFun, ms)
    timerMap.push(timeoutName, timer)
  },
  /**
   * 添加一个定时器
   *
   * @param {Object} intervalName
   * @param {Object} intervalFun
   * @param {Object} ms
   */
  addInterval (intervalName, intervalFun, ms) {
    let timer = setInterval(intervalFun, ms)
    timerMap.set(intervalName, timer)
  },
  /**
   * 清除指定的倒计时
   *
   * @param {Object} timeoutName
   */
  clearTimeout(timeoutName) {
    if (timerMap.has(timeoutName)) {
      let timer = timerMap.get(timeoutName);
      clearTimeout(timer);
      timer = null;
    }
  }

}
