<template>
  <v-dialog v-model="ifShowDialog" style="width: 100%;height:100%;display: flex;justify-content: center;z-index:3;">
    <div v-if="ifShowQuestionEditor" style="display: flex;justify-content: center;">
      <QuestionEditor @close="close"></QuestionEditor>
    </div>
  </v-dialog>
  <div style="
      z-index: 2;
      min-width: 750px;
      display: flex;
      height: 100vh;
      flex-direction: row;
      background-color: rgba(0, 0, 0, 0);
    ">
    <div style="height: 100%;display: flex;justify-content: center;align-items: center;background-color: rgba(255,255,255,0);">
      <v-btn @click="closeComment" icon size="30" style="background-color: rgba(255,255,255,0);">
        <svg-icon type="mdi" color="#ffffff" :path="icons.closeQuestion"></svg-icon>
      </v-btn>
    </div>
    <div :style="{'padding':'0px','height':'100%','display':'relative','overflow':'auto','background-color':'rgba(255,255,255,1)'}">
      <AnswerList :question_id="this.selectedQuestionId"></AnswerList>
    </div>
    <div :style="{'padding':'0px','height':'100%','background-color':'rgba(255,255,255,1)','min-width':'750px'}">
      <div :style="{'min-height':'95%','display':'relative','overflow':'auto'}">
        <QuestionWithOutImage v-for="(question,index) in questionList" :key="index" :question="question"
          :isSelected="question.id==selectedQuestionId" @select_question="selectQuestion"></QuestionWithOutImage>
        <v-btn variant="outlined" style="width: 750px;">加载更多问题</v-btn>
      </div>
      <v-btn @click="publishQuestion"
        style="height: 4%;min-width: 700px;margin-left: 25px;margin-right: 25px;margin-top:1%;font-weight:bold;"
        variant="outlined" color="#9c0c13">＋</v-btn>
    </div>
  </div>
</template>

<script>
import { getPostList } from '@/axios/post';
import AnswerList from './AnswerList.vue';
import QuestionWithOutImage from './QuestionWithOutImage.vue';
import { computed, ref } from 'vue';
import QuestionEditor from './QuestionEditor.vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChevronDoubleRight } from '@mdi/js';
  export default {
    props:{
      id:{
        type:String,
        default:'00000000',
      },
      type:{
        type:String,
        default:'article',
      },
      /*questionList:{
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
      },*/
    },
    setup(){
      const ifShowQuestionEditor=ref(false);
      const ifShowDialog=computed(()=>{
        return ifShowQuestionEditor.value;
      })
      const setQuestionEditorState=(state)=>{
        ifShowQuestionEditor.value=state;
      }
      return {
        setQuestionEditorState,
        ifShowDialog,
        ifShowQuestionEditor,
      }
    },
    data(){
      const selectedQuestionId=null;
      const questionList=[//问题列表

      ];
      const gotPageNum=1;
      return {
        icons:{
          closeQuestion:mdiChevronDoubleRight,
        },
        questionList,
        selectedQuestionId,
        gotPageNum,
      }
    },
    components: {
      QuestionWithOutImage,
      AnswerList,
      QuestionEditor,
      SvgIcon,
    },
    methods:{
      closeComment(){
        this.$emit('close_comment');
      },
      selectQuestion(id){
        if(this.selectedQuestionId==id){
          this.selectedQuestionId=null;
        }else{
          this.selectedQuestionId=id;
        }
      },
      publishQuestion(){
        this.setQuestionEditorState(true);
      },
      close(){
        this.setQuestionEditorState(false);
      }
    },
    mounted(){
      getPostList(this.type=='article'?0:1,Number(this.id),this.gotPageNum,20)
      .then(response=>{
        console.log(response);
      })
      .catch(error=>{
        console.error('error',error);
        const alertSet={
          state:true,
          color:'error',
          title:'未知错误',
          content:'可能是网络错误，检查网络状态后若仍无法运行，请联系开发者'
        }
        this.$emit('alert',alertSet)
      })
    },
    expose(){
      const dialogState=computed(()=>{
        return this.ifShowDialog;
      })
      return{
        dialogState
      }
    }
  }
</script>
