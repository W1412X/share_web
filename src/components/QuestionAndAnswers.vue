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
        <svg-icon type="mdi" color="#8a8a8a" :path="icons.closeQuestion"></svg-icon>
      </v-btn>
    </div>
    <div v-if="!isMobile" :style="{'padding':'0px','height':'100%','display':'relative','overflow':'auto','background-color':'rgba(255,255,255,1)'}">
      <AnswerList :question_id="this.selectedQuestionId"></AnswerList>
    </div>
    <div :style="{'padding':'0px','height':'100%','background-color':'rgba(255,255,255,1)','min-width':'750px'}">
      <div :style="{'height':'95%','display':'flow','overflow':'auto'}">
        <SingleQuestion v-for="(questionId,index) in questionList" :key="index" :id="questionId" :type="'article'"
          :isSelected="questionId==selectedQuestionId" @select_question="selectQuestion"></SingleQuestion>
        <v-btn variant="outlined" style="width: 750px;" color="#0074e8">加载更多问题</v-btn>
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
import { computed, ref } from 'vue';
import QuestionEditor from './QuestionEditor.vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChevronDoubleRight } from '@mdi/js';
import SingleQuestion from './SingleQuestion.vue';
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
      presetedQuestion:{
        type:String,
        default:'',
      }
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
        '00000001',
        '00000002',
        '00000003',
        '00000004',
        '00000005',
        '00000006',
        '00000007',
        '00000008',
      ];
      const gotPageNum=1;
      return {
        icons:{
          closeQuestion:mdiChevronDoubleRight,
        },
        questionList,
        selectedQuestionId,
        gotPageNum,
        isMobile:false,
      }
    },
    components: {
      SingleQuestion,
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
    created(){
      this.isMobile = /Mobi|Android/i.test(navigator.userAgent);
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
