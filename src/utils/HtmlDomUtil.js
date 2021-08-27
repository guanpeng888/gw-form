export default {
    randomId: function() { // 获取随机的页面元素id
        return parseInt(Math.random() * 1000000)
    },
    getBodyWitdh() {
        return document.body.clientWidth
    },
    getBodyHeight() {
        return document.body.clientHeight
    },
    getClientWidth: function() {
        var width = 0
        if (window.innerWidth) {
            width = window.innerWidth
        } else if ((document.body) && (document.body.clientWidth)) {
            width = document.body.clientWidth
        }
        return width
    },
    getClientHeight: function() {
        var height = 0
        if (window.innerHeight) {
            height = window.innerHeight
        } else if ((document.body) && (document.body.clientHeight)) {
            height = document.body.clientHeight
        }
        return height
    },
    // html变焦缩放
    zoomHtml: function() {
        window.addEventListener('load', () => {
            document.body.style.zoom = "normal"; //避免zoom尺寸叠加
            let scale = document.body.clientWidth / 1920;
            document.body.style.zoom = scale;
        });
        (function() {
            var throttle = function(type, name, obj) {
                obj = obj || window;
                var running = false;
                var func = function() {
                    if (running) { return; }
                    running = true;
                    requestAnimationFrame(function() {
                        obj.dispatchEvent(new CustomEvent(name));
                        running = false;
                    });
                };
                obj.addEventListener(type, func);
            };

            /* init - you can init any event */
            throttle("resize", "optimizedResize");
        })();
        window.addEventListener('optimizedResize', () => {
            document.body.style.zoom = "normal";
            let scale = document.body.clientWidth / 1920;
            document.body.style.zoom = scale;
        });
    }
}