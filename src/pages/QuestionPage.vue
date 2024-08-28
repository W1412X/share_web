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
        :style="{'padding':'0px','margin-left': '20px','display':'relative','overflow':'auto'}"
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
    export default {
      props:{
        question:{
            type:Object,
            default:function(){
                return{
                    id: '00000000',
                    title: '这是一个测试题?',
                    content: '这是问题的描述',
                    time: '2022-09-01 00:00',
                    replyCount: '99999',
                    likeCount: '99999',
                    authorName: 'visitor',
                    authorId: '00000000',
                    scanCount: '99999',
                    profileUrl: 'https://pic2.zhimg.com/v2-0dda71bc9ced142bf7bb2d6adbebe4f0_r.jpg?source=1940ef5c'
                }
            }
        }
      },
      data(){
      },
      components: {
        SingleQuestion,
        AnswerList,
      },
      methods:{
      }
    }
  </script>
  