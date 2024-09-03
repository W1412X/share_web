<template>
  <v-dialog v-model="ifShowDialog"
    style="width: 100%;height:100%;background-color: rgba(255,255,255,0.5);justify-content: center;">
    <div v-if="ifShowEditQuestion" style="width: 100%;height:100%;justify-content: center;display: flex">
      <question-editor @close="close"></question-editor>
    </div>
  </v-dialog>
    <v-card
      :style="{width:'100%',display:'relative','margin-top':'10px'}"
    >
      <v-tabs v-model="type" style="width: 750px;background-color: #8a8a8a;" bg-color="indigo-darken-2" fixed-tabs>
        <v-tab
          :style="{background:'#bbbbbb','font-size':'18px','min-width':'375px'}"
          value="article"
          text="文章"
        ></v-tab>
        <v-tab
          :style="{background:'#bbbbbb','font-size':'18px','min-width':'375px'}"
          value="question"
          text="问答"
        ></v-tab>
      </v-tabs>
      <div v-if="type=='article'" style="width: 100%;display: flex;flex-direction: column;">
        <v-btn variant="outlined" style="width: 94%;margin-left: 3%;margin-right: 3%;color:#9c0c13" @click="editArticle()">编辑新文章</v-btn>
        <article-item v-for="(articleId,index) in articleList" :key="index" :id="articleId" :status="'writer'"></article-item>
      </div>
      <div  v-if="type=='question'" style="width: 100%;display: flex;flex-direction: column;">
        <v-btn variant="outlined" style="width: 94%;margin-left: 3%;margin-right: 3%;color:#9c0c13" @click="editQuestion()">发布新问题</v-btn>
        <single-question v-for="(questionId,index) in questionList" :key="index" :id="questionId" :status="'writer'"></single-question>
      </div>
    </v-card>
  </template>
  <script>
import { computed,ref } from 'vue';
import ArticleItem from './ArticleItem.vue';
//import QuestionWithOutImage from './QuestionWithOutImage.vue';
import QuestionEditor from './QuestionEditor.vue';
import { useRouter } from 'vue-router';
import SingleQuestion from './SingleQuestion.vue';
    export default {
      setup() {
        const router=useRouter();
        const ifShowEditQuestion=ref(false);
        const ifShowDialog=computed(()=>{
          return ifShowEditQuestion.value;
        })
        const setEditQuestionState=(state)=>{
          ifShowEditQuestion.value=state;
        }
        return {
          router,
          ifShowDialog,
          ifShowEditQuestion,
          setEditQuestionState,
        }
      },
      components:{
        ArticleItem,
        SingleQuestion,
        //QuestionWithOutImage,
        QuestionEditor,
      },
      data() {
        const articleList=[//个人创作文章列表
          '00000001',
          '00000002',
          '00000003',
          '00000004',
          '00000005',
          '00000006',
          '00000007',
          '00000008'
        ];
        const questionList=[
          '00000001',
          '00000002',
          '00000003',
          '00000004',
          '00000005',
          '00000006',
          '00000007',
          '00000008'
        ]
        const type = 'article'
        return {
          type,
          questionList,
          articleList
        }
      },
      methods:{
        editArticle(){
          this.router.push({name:'EditorPage'});
        },
        editQuestion(){
          this.setEditQuestionState(true);
        },
        close(){
          this.setEditQuestionState(false);
        }
      }
    }
  </script>
  