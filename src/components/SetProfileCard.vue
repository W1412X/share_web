<template>
    <v-card
      style="
        width: 400px;
        height: 240px;
        padding: 10px;
        border-color: #8a8a8a;
        border-width: 2px;
        background-color: #ffffff;
      "
      variant="outlined"
    >
      <div style="display: flex; flex-direction: column">
        <div
          style="
            display: flex;
            flex-direction: row;
            font-size: 18px;
            justify-content: center;
            color: #8a8a8a;
            font-weight: 600;
          "
        >
          设置头像
        </div>
        <div
          style="
            display: flex;
            flex-direction: row;
            font-size: 15px;
            justify-content: center;
            margin-top: 10px;
            color: #8a8a8a;
            font-weight: 400;
          "
        >
          默认使用随机的头像，上传一个图片作为你的头像，上传的头像大小会被自动缩放至64*64大小
        </div>
        <div
          style="
            justify-content: center;
            width: 100%;
            display: flex;
            margin-top: 20px;
          "
        >
          <v-avatar :image="this.nowProfileUrl" :size="60" @click="this.uploadImage()"></v-avatar>
        </div>
        <div
          style="
            justify-content: center;
            width: 100%;
            display: flex;
            margin-top: 20px;
            flex-direction: row;
          "
        >
          <v-btn variant="outlined" style="height: 35px" color="#9c0c13" @click="this.finish()"
            >完成</v-btn
          >
        </div>
      </div>
    </v-card>
  </template>
  <script>
    export default {
      props: {
        userName:{
          type:String,
          default:'visitor'
        }
      },
      data() {
        const nowProfileUrl = ''
        return {
          nowProfileUrl,
        }
      },
      methods: {
        uploadImage() {//完成选取图片，上传图片的逻辑
          this.$emit('close');
          const message={
            color:'info',
              title:'上传头像成功',
              state:true,
              content:''
          }
          this.$emit('alert',message);
        },
        finish(){//关闭此窗口的逻辑
          this.$emit('close');
          const message={
            color:'info',
              title:'上传头像成功',
              state:true,
              content:''
          }
          console.log(message);
          this.$emit('alert',message);
        },
      },
    }
  </script>
  