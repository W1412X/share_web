<template>
    <v-card
      style="
        width: 750px;
        border-width: 2px;
        border-color: #8a8a8a;
        padding: 10px;
      "
    >
      <div style="justify-content: center; display: flex; flex-direction: column">
        <div
          style="
            display: flex;
            justify-content: center;
            font-size: 20px;
            color: #000000;
            font-weight: 600;
            margin-bottom: 20px;
          "
        >
          <div>问题编辑</div>
        </div>
        <div style="display: flex; flex-direction: column">
          <div style="font-size: 16px; color: #8a8a8a; font-weight: 600">
            问题标题:
          </div>
          <sensitive-text-area
            style="width: 100%; margin-top: 20px"
            v-model="question.title"
            label="编辑问题标题"
            row-height="10"
            rows="1"
            variant="outlined"
            auto-grow
          ></sensitive-text-area>
        </div>
        <div style="display: flex; flex-direction: column">
          <div style="font-size: 16px; color: #8a8a8a; font-weight: 600">
            问题详细描述:
          </div>
          <sensitive-text-area
            style="width: 100%; margin-top: 20px"
            v-model="question.content"
            label="编辑问题更具体的描述"
            row-height="10"
            rows="4"
            variant="outlined"
            auto-grow
          ></sensitive-text-area>
        </div>
        <div style="display: flex; flex-direction: column">
          <div style="font-size: 16px; color: #8a8a8a; font-weight: 600">
            问题关联项目网页地址:
          </div>
          <div style="font-size: 14px; color: #8a8a8a; font-weight: 400">
            -
            如果本问题是基于某一个本站内的文章、课程或者其他网站的内容提出的，则你需要添加对应的网页地址
          </div>
          <sensitive-text-area
            style="width: 100%; margin-top: 20px"
            v-model="question.title"
            label="添加一个有效地址"
            row-height="10"
            rows="1"
            variant="outlined"
            auto-grow
          ></sensitive-text-area>
        </div>
        <div
          style="
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: right;
          "
        >
          <v-btn @click="this.cancel()" color="#9c0c13" variant="outlined"
            >取消</v-btn
          >
          <v-btn
            @click="this.publish()"
            color="#9c0c13"
            style="margin-left: 25px"
            variant="outlined"
            >发布问题</v-btn
          >
        </div>
      </div>
    </v-card>
  </template>
  <script>
import SensitiveTextArea from './SensitiveTextArea.vue';

    export default {
      props: {
        id:{
          type:String,
          default:'00000000',
        }
      },
      components:{
        SensitiveTextArea,
      },
      data() {
        const question = {
          title: '',
          content: '',
          relativeItemUrl: '', //与之关联的文章，课程链接
        };
        return {
          question,
        }
      },
      methods: {
        publish() {
          console.log('提交问题')
        },
        cancel() {
          console.log('取消编辑')
          this.$emit('close');
        },
      },
    }
  </script>
  