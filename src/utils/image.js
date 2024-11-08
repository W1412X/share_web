/* 本文件提供对上传的图片进行操作的函数
 * 目前主要是压缩图片至size*size大小  
 * 就是取中间正方形区域进行压缩/扩张  
 */
export const compressImage = async (file, size) => {
  // 返回一个Promise来处理异步操作
  return new Promise((resolve, reject) => {
    try {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const ori_width = img.width;
        const ori_height = img.height;
        // 计算裁剪区域，确保裁剪为正方形
        let crop_width = ori_width > ori_height ? (ori_width - ori_height) / 2 : 0;
        let crop_height = ori_height > ori_width ? (ori_height - ori_width) / 2 : 0;
        canvas.width = size;
        canvas.height = size;
        ctx.drawImage(
          img,
          crop_width,
          crop_height,
          ori_width - crop_width * 2,
          ori_height - crop_height * 2,
          0,
          0,
          size,
          size
        );
        // 将canvas内容转换为Blob并返回
        canvas.toBlob(function(blob) {
          if (blob) {
            console.log(blob);
            resolve(blob); //通过Promise返回Blob
          } else {
            reject('Image compression failed');
          }
        }, 'image/jpeg', 0.7);
      };

      img.onerror = function() {
        reject('Failed to load image');
      };
    } catch (error) {
      reject('Error processing image');
    }
  });
};