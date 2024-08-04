<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      height: 100vh;
      flex-direction: row;
      background-color: rgba(256, 256, 256, 0.95);
    "
  >
    <div
      :style="{'padding':'0px','height':'100%','display':'relative','overflow':'auto'}"
    >
      <AnswerList :question_id="this.selectedQuestionId"></AnswerList>
    </div>
    <div
      :style="{'padding':'0px','height':'100%','display':'relative','overflow':'auto'}"
    >
      <div :style="{'max-height':'100%'}">
        <QuestionWithOutImage v-for="(question,index) in questionList" 
          :key="index"
          :question="question"
          :isSelected="question.id==selectedQuestionId"
          @select_question="selectQuestion"
        ></QuestionWithOutImage>
      </div>
    </div>
  </div>
</template>

<script>
import AnswerList from './AnswerList.vue';
import QuestionWithOutImage from './QuestionWithOutImage.vue';

  export default {
    props:{
      questionList:{
        type:Array,
        default:function(){
          return [{
            id: '00000000',
            title: '这是一个测试题?',
            content: '这是问题的描述',
            time:'2022-09-01 00:00',
            replyCount: '99999',
            likeCount: '99999',
            authorName: 'visitor',
            authorId: '00000000',
            scanCount: '99999',
            profileUrl:'https://pic2.zhimg.com/v2-0dda71bc9ced142bf7bb2d6adbebe4f0_r.jpg?source=1940ef5c',
          },{
            id: '00000001',
            title: '这是一个测试题?',
            content: '这是问题的描述',
            time:'2022-09-01 00:00',
            replyCount: '99999',
            likeCount: '99999',
            authorName: 'visitor',
            authorId: '00000000',
            scanCount: '99999',
            profileUrl:'https://pic2.zhimg.com/v2-0dda71bc9ced142bf7bb2d6adbebe4f0_r.jpg?source=1940ef5c',
          }]
        }
      },
    },
    data(){
      const selectedQuestionId=null;
      return {
        selectedQuestionId,
      }
    },
    components: {
      QuestionWithOutImage,
      AnswerList,
    },
    methods:{
      selectQuestion(id){
        if(this.selectedQuestionId==id){
          this.selectedQuestionId=null;
        }else{
          this.selectedQuestionId=id;
        }
      },
    }
  }
</script>
