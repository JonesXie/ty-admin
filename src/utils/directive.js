import Vue from 'vue'
import * as math from 'mathjs'

/*
  v-math 数学方法精准计算
  通过bind.arg传入需要使用的方法(默认为eval方法)
  字段通过 bind.value传入
*/
Vue.directive('math', (el, bind) => {
  function print(value) {
    var precision = 14
    return math.format(value, precision)
  }
  // function toNonExponential(num) {
  //   var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/)
  //   return num.toFixed(Math.max(0, (m[1] || '').length - m[2]))
  // }
  let arg = bind.arg
  if (!arg) arg = 'eval'
  let val = math[arg](bind.value)
  val = Number.parseFloat(print(val)) // 去除JS计算误差 并转换成数字
  el.innerHTML = val
})
