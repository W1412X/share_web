<template>
  <div style="display: flex;justify-content: center;">
    <div
      style="
        justify-content: center;
        display: flex;
        flex-direction: column;
        height: 100vh;
        flex-direction:column;
        width: 800px;
        background-color: rgba(256, 256, 256, 0.95);
      "
    >
      <div
        :style="{'padding':'0px','margin-left': '20px','display':'relative'}"
      >
        <div>
          <SingleQuestion
            style="margin-bottom: 50px;"
            :question="question"
          ></SingleQuestion>
        </div>
      </div>
      <div
        :style="{'padding':'0px','margin-left': '20px','height':'100%','display':'relative','overflow':'auto'}"
      >
        <AnswerList :question_id="question.id"></AnswerList>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import AnswerList from '../components/AnswerList.vue';
import SingleQuestion from '@/components/SingleQuestion.vue';
import {useRoute} from 'vue-router'
    export default {
      props:{
      },
      setup(){
        const questionId='0000000';
        return {
          questionId,
        }
      },
      data(){
        const question = {
          title: '这是一个测试题?',
          content: '这是问题的描述',
          time: '2022-09-01 00:00',
          replyCount: '99999',
          starCount: '99999',
          authorName: 'visitor',
          authorId: '00000000',
          scanCount: '99999',
          profileUrl: 'https://pic2.zhimg.com/v2-0dda71bc9ced142bf7bb2d6adbebe4f0_r.jpg?source=1940ef5c'
        }
        return{
          question,
        }
      },
      components: {
        SingleQuestion,
        AnswerList,
      },
      methods:{
      },
      onMounted(){
        const route=useRoute();
        this.courseId=route.params.id;
        console.log('Load question page',this.courseId);
      }
    }
  </script>
  