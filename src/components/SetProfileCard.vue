<template>
  <input type="file" ref="imgInput" style="display: none;" @change="handleSelectedImage" />
  <v-card style="
        width: 400px;
        height: 240px;
        padding: 10px;
        border-color: #8a8a8a;
        border-width: 2px;
        background-color: #ffffff;
      " variant="outlined">
    <div style="display: flex; flex-direction: column">
      <div style="
            display: flex;
            flex-direction: row;
            font-size: 18px;
            justify-content: center;
            color: #8a8a8a;
            font-weight: 600;
          ">
        设置头像
      </div>
      <div style="
            display: flex;
            flex-direction: row;
            font-size: 15px;
            justify-content: center;
            margin-top: 10px;
            color: #8a8a8a;
            font-weight: 400;
          ">
        默认使用随机的头像，上传一个图片作为你的头像，上传的头像大小会被自动缩放至64*64大小
      </div>
      <div style="
            justify-content: center;
            width: 100%;
            display: flex;
            margin-top: 20px;
          ">
        <v-avatar ref="file" :image="this.nowProfileUrl" variant="tonal" :size="60" @click="this.selectImage()"></v-avatar>
      </div>
      <div style="
            justify-content: center;
            width: 100%;
            display: flex;
            margin-top: 20px;
            flex-direction: row;
          ">
        <v-btn variant="outlined" style="height: 35px" color="#9c0c13" @click="this.finish()">完成</v-btn>
      </div>
    </div>
  </v-card>
</template>
<script>
import { compressImage } from '@/utils/image';
export default {
  props: {
    userName: {
      type: String,
      default: 'visitor'
    }
  },
  data() {
    const nowProfileUrl = ''
    return {
      nowProfileUrl,
    }
  },
  methods: {
    selectImage(){
      this.$refs.imgInput.click();
    },
    async handleSelectedImage(event) {//完成选取图片，压缩图片，上传图片的逻辑 
      let file=event.target.files[0];
      //压缩图片  
      const blob = await compressImage(file,64);  
      this.nowProfileUrl = URL.createObjectURL(blob);
      const message = {
        color: 'info',
        title: '图片预览',
        state: true,
        content: '由于服务器资源限制，头像将会被压缩至64*64'
      }
      this.$emit('alert', message);
    },
    finish() {//关闭此窗口的逻辑，点击此按钮开始上传  
      //执行上传图片  
    },
  },
}
</script>