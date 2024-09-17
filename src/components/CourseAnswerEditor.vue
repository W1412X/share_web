<template>
  <v-card style="padding: 15px; width: 750px">
    <div style="display: flex; flex-direction: column">
      <div style="font-size: 18px; font-weight: 600;margin-bottom: 5px;">
        编辑对课程 『{{ courseName }}』 评价
      </div>
      <div style="display: flex; flex-direction: row;margin-bottom: 5px;">
        <span
          style="
            font-size: 16px;
            color: #8a8a8a;
            font-weight: 600;
            margin-top: 2px;
          "
          >评分:
          <v-tooltip
            style="margin-left: 2px; margin-bottom: 8px"
            activator="parent"
            location="top"
            >对课程总体进行评分，有助于帮助同学选到自己喜欢的课</v-tooltip
          >
        </span>
        <span style="width: 10px"></span>
        <v-rating
          :model-value="answerForm.rate"
          size="23"
          style="margin: 0px; padding: 0px"
          color="#9c0c13"
          @update:model-value="intRate"
        ></v-rating>
        <span
          style="
            margin-top: 2px;
            margin-left: 10px;
            color: #8a8a8a;
            font-weight: 600;
          "
          >{{ answerForm.rate }}</span
        >
      </div>
      <div style="margin-top: 5px">
        <span
          style="
            font-size: 16px;
            font-weight: 600;
            color: #8a8a8a;
            margin-top: 10px;
          "
          >问题:
          <v-tooltip
            style="margin-left: 2px; margin-bottom: 8px"
            activator="parent"
            location="top"
            >可以回答这些常见的问题来丰富您的评分内容，点击这些问题可以设置</v-tooltip
          >
        </span>
        <v-btn
          @click="clickQuestion(questionText,index)"
          :disabled="questionState[index]"
          :key="index"
          v-for="(questionText,index) in questions"
          style="
            margin-left: 5px;
            margin-right: 10px;
            margin-bottom: 10px;
            height: 25px;
          "
          variant="outlined"
          :color="questionState[index]? '#8a8a8a':'#9c0c13'"
          >{{questionText}}</v-btn
        >
      </div>
      <div style="display: flex; flex-direction: row; margin-top: 10px">
        <span
          style="
            font-size: 16px;
            font-weight: 600;
            color: #8a8a8a;
            margin-right: 5px;
          "
          >内容:
          <v-tooltip
            style="margin-left: 2px; margin-bottom: 8px"
            activator="parent"
            location="top"
            >这是您的评论的内容</v-tooltip
          >
        </span>
        <sensitive-text-area
          variant="outlined"
          label="写下您对此课程的评价"
          v-model="answerForm.comment"
          @input="checkComment"
        >
        </sensitive-text-area>
      </div>
      <div style="display: flex; flex-direction: row-reverse; width: 100%">
        <v-btn
          @click="submit"
          variant="outlined"
          style="height: 25px; margin-left: 10px"
          color="#9c0c13"
          >提交</v-btn
        >
        <v-btn 
          variant="outlined" style="height: 25px" color="#9c0c13" @click="cancel"
          >取消</v-btn
        >
      </div>
    </div>
  </v-card>
</template>
<script>
import SensitiveTextArea from './SensitiveTextArea.vue';

  export default {
    props: {
      courseName: {
        type: String,
        default: '',
      },
      initAnswer:{
        type:Object,
        default:function(){
          return {
            courseId:'',
            rate:0,
            comment:'',
          }
        }
      }
    },
    setup() {},
    data() {
      //使用传入的属性初始化问题表单
      const answerForm=this.initAnswer;
      const questions = [
        '老师怎么样？',
        '上课会点名么？',
        '平时有作业么？',
        '平时作业难么？',
        '有期中考试么？',
        '平时有测试么？',
        '实验难度怎么样？',
        '考试给分怎么样？',
        '平时分怎么算的？',
        '有实验课么？',
        '实验课难么？',
        '有大作业么?',
        '你是哪一年选的这门课程？'
      ]
      const questionState = []
      for (var i = 0; i < questions.length; i++) {
        questionState.push(false)
      }
      return {
        questionState,
        questions,
        answerForm,
      }
    },
    components:{
      SensitiveTextArea
    },
    methods: {
      checkComment() {
        for (var i = 0; i < this.questions.length; i++) {
          if (this.answerForm.comment.includes(this.questions[i])) {
            continue
          } else {
            this.questionState[i] = false
          }
        }
      },
      intRate(value) {
        this.answerForm.rate = Math.round(value)
      },
      clickQuestion(text, index) {
        this.questionState[index] = true
        if (this.answerForm.comment == '') {
          this.answerForm.comment += text
        } else {
          this.answerForm.comment += '\n' + text
        }
      },
      cancel() {
        this.$emit('close')
      },
      submit() {
        //输出提交的表单信息，方便调试
        console.log(this.answerForm);
      },
    },
  }
</script>
