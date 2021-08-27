export default {
    async operateFile(fileData) {
        let filesArr = [];
        if (fileData && fileData.length) {
            for (let i = 0; i < fileData.length; i++) {
                let fileObj = fileData[i];
                let fileItemObj = {
                    fileid: '',
                    filetypecode: '',
                    filetypename: '',
                    filename: '',
                    fileextname: '',
                    fileencode: '',
                    filecontent: '',
                    filelocationflag: '',
                    fileurl: ''
                };
                if (fileObj.type.indexOf('audio') >= 0) {
                    fileItemObj.filetypecode = '2';
                    fileItemObj.filetypename = '音频文件';
                } else if (fileObj.type.indexOf('video') >= 0) {
                    fileItemObj.filetypecode = '3';
                    fileItemObj.filetypename = '视频文件';
                } else if (fileObj.type.indexOf('image') >= 0) {
                    fileItemObj.filetypecode = '4';
                    fileItemObj.filetypename = '图片文件';
                } else {
                    fileItemObj.filetypecode = '1';
                    fileItemObj.filetypename = '普通文件';
                }
                fileItemObj.filesize = fileObj.size || 0;
                fileItemObj.filename = fileObj.name || '';
                fileItemObj.fileextname = fileObj.name.split('.')[fileObj.name.split('.').length - 1];
                // 将文件转换成base64
                let base64str = await this.transferFileToBase64(fileObj);
                if (base64str) {
                    // 选中文件是图片类型是则将该图片进行压缩，否则不压缩
                    if (fileItemObj.filetypecode == '4') {
                        fileItemObj.filecontent = await this.compressImage(base64str, fileObj.type);
                    } else {
                        fileItemObj.filecontent = base64str;
                    }
                }
                filesArr.push(fileItemObj);
            }
        }
        return filesArr;
    },
    transferFileToBase64(file) {
        return new Promise((resolve, reject) => {
            let base64Str = "";
            let reader = new FileReader(); //实例化文件读取对象
            reader.readAsDataURL(file);
            reader.onloadend = (ev) => {
                base64Str = ev.target.result;
                resolve(base64Str)
            };
            // 报错
            reader.onerror = (err) => {
                    reject(err)
                }
                // 中断
            reader.onabort = (err) => {
                reject(err)
            }
        })
    },
    compressImage(path, filetype = '', obj) {
        return new Promise((resolve, reject) => {
            var img = new Image();
            img.src = path;
            img.onload = function() {
                var that = this;
                // 默认按比例压缩
                var w = that.width;
                var h = that.height;
                var quality = 0.7; // 默认图片质量为0.7
                // 图像质量根据配置项
                // var scale = w / h; 
                // w = obj.width || w;
                // h = obj.height || w / scale;        
                // 
                // if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
                //   quality = obj.quality;
                // }

                //生成canvas
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                // 创建属性节点
                var anw = document.createAttribute("width");
                anw.nodeValue = w;
                var anh = document.createAttribute("height");
                anh.nodeValue = h;
                canvas.setAttributeNode(anw);
                canvas.setAttributeNode(anh);
                ctx.drawImage(that, 0, 0, w, h);
                // quality值越小，所绘制出的图像越模糊
                var base64 = canvas.toDataURL(filetype, quality) || "";
                if (base64) {
                    base64 = base64.split(';base64,')[1] || '';
                    resolve(base64);
                };
            }
        })
    }
}