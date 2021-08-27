export default {
    debounce(fn, delay = 500) {
        let timer
        // return function () {
            let ctx = this
            let args = arguments
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                timer = null
                fn.apply(ctx, args)
            }, delay)
        // }
    },
    throttle(fn, interval = 500) {
        let last
        let timer
        // return function () {
            let ctx = this
            let args = arguments
            let now = new Date()
            if (last && now - last < interval) {
                clearTimeout(timer)
                timer = setTimeout(function () {
                    last = now
                    fn.apply(ctx, args)
                }, interval)
            } else {
                last = now
                fn.apply(ctx, args)
            }
        // }
    }
}