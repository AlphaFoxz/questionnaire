export default function (fn: Function, delay: number = 500): Function {
  let timer: NodeJS.Timeout
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn()
    }, delay)
  }
}
