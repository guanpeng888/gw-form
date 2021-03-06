export default {
    sortBy(attr, rev) {
        //第二个参数没有传递 默认升序排列
        if (rev === undefined) {
            rev = 1;
        } else {
            rev = (rev) ? 1 : -1;
        }

        return function(a, b) {
            a = Number(a[attr]);
            b = Number(b[attr]);
            if (a < b) {
                return rev * -1;
            }
            if (a > b) {
                return rev * 1;
            }
            return 0;
        }
    }
}