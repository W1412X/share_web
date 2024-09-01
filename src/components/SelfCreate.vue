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
        <article-item v-for="(article,index) in articleList" :key="index" :article="article" :status="'writer'"></article-item>
      </div>
      <div  v-if="type=='question'" style="width: 100%;display: flex;flex-direction: column;">
        <v-btn variant="outlined" style="width: 94%;margin-left: 3%;margin-right: 3%;color:#9c0c13" @click="editQuestion()">发布新问题</v-btn>
        <question-with-out-image v-for="(question,index) in questionList" :key="index" :question="question" :status="'writer'"></question-with-out-image>
      </div>
    </v-card>
  </template>
  <script>
import { computed,ref } from 'vue';
import ArticleItem from './ArticleItem.vue';
import QuestionWithOutImage from './QuestionWithOutImage.vue';
import QuestionEditor from './QuestionEditor.vue';
import { useRouter } from 'vue-router';
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
        QuestionWithOutImage,
        QuestionEditor,
      },
      data() {
        const articleList=[//个人创作文章列表
        {
          id: '00000000',
            title: '这是文章标题',
            tags: ['计算机', '测试'],
            description:
              '这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介',
            publishTime: '2022-09-01 00:00',
            imgUrl:
              'https://tse2-mm.cn.bing.net/th/id/OIP-C.B6see3otwDOwdcSecD_W8QHaHa?w=173&h=180&c=7&r=0&o=5&pid=1.7',
            authorName: '测试用户',
            profileUrl:
              'https://tse1-mm.cn.bing.net/th/id/OIP-C.PO7d9IfnPUy2RO173QYt6wHaHV?w=216&h=213&c=7&r=0&o=5&pid=1.7',
            likeCount:'99999',
            scanCount:'99999',
            replyCount:'99999',
        },
        {
          id: '00000000',
            title: '这是文章标题',
            tags: ['计算机', '测试'],
            description:
              '这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介',
            publishTime: '2022-09-01 00:00',
            imgUrl:
              'https://tse2-mm.cn.bing.net/th/id/OIP-C.B6see3otwDOwdcSecD_W8QHaHa?w=173&h=180&c=7&r=0&o=5&pid=1.7',
            authorName: '测试用户',
            profileUrl:
              'https://tse1-mm.cn.bing.net/th/id/OIP-C.PO7d9IfnPUy2RO173QYt6wHaHV?w=216&h=213&c=7&r=0&o=5&pid=1.7',
            likeCount:'99999',
            scanCount:'99999',
            replyCount:'99999',
        }
        ];
        const questionList=[//问题列表
        {
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
        },
        {
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
        ];
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
  