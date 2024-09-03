<template>
  <v-snackbar
    :timeout="3000"
    :color="alertSet.color"
    v-model="alertSet.state"
  >
    <div class="text-subtitle-1 pb-2">{{ alertSet.title }}</div>
    <p>{{ alertSet.content }}</p>
  </v-snackbar>
  <div>
    <main
      :style="{ 'justify-content': 'center', 'width': '100%', 'display': 'flex', 'padding-bottom': '50px' }"
    >
      <v-card
        :style="{ 'max-width': '1000px', 'width': '1000px', 'background-color': '#eef0f4' }"
      >
        <v-card
          :style="{ 'margin-right': '2px', 'margin-left': '2px', 'margin-top': '2px'}"
        >
          <v-card-title
            :style="{ 'font-size': '30px', 'font-weight': 'bold', 'color': '#2f2f2f','margin-bottom':'0px','padding-bottom':'0px'}"
          >
            {{ article.title }}
          </v-card-title>
          <v-row
            :style="{ 'margin-top':'0px','padding-left': '20px', 'color': '#8a8a8a' }"
          >
            <v-avatar
              @click="toAuthorPage"
              size="25"
              :style="{ 'margin-top': '8px', 'margin-right': '0px', 'margin-left': '10px', 'font-size': '14px' }"
            >
              <v-img :src="article.authorProfileUrl"></v-img>
            </v-avatar>
            <span
              @click="toAuthorPage"
              :style="{ 'margin-top': '10px', 'margin-right': '10px', 'margin-left': '10px', 'font-size': '14px' }"
              >{{ article.authorName }}</span
            >
            <v-spacer></v-spacer>
            <div
              :no-gutters="true"
              :style="{ 'margin-top': '10px', 'margin-left': '10px', 'margin-right': '10px', 'padding-left': '0px', 'padding-right': '0px' }"
            >
              <v-row :style="{ 'margin-top': '0px' }">
                <svg-icon
                  type="mdi"
                  :path="icons.timeClock"
                  size="18"
                  :style="{ 'padding-top': '0px', 'margin-bottom': '0px', 'margin-left': '5px' }"
                ></svg-icon>
                <span :style="{ 'margin-left': '5px', 'font-size': '14px' }"
                  >编辑于 {{ article.publishTime }}</span
                >
              </v-row>
            </div>
            <div
              :no-gutters="true"
              :style="{ 'max-width': '100px', 'margin-top': '10px', 'margin-left': '15px', 'margin-right': '0px', 'padding-left': '0px', 'padding-right': '0px' }"
            >
              <v-row
                :style="{ 'margin-top': '0px', 'margin-left': '0px', 'margin-right': '0px' }"
              >
                <svg-icon
                  type="mdi"
                  :path="icons.viewCount"
                  size="18"
                  :style="{ 'padding-top': '0px', 'margin-bottom': '0px', 'margin-left': '5px' }"
                ></svg-icon>
                <span :style="{ 'margin-left': '5px', 'font-size': '14px' }"
                  >{{ article.scanCount }}</span
                >
              </v-row>
            </div>
            <div
              :style="{ 'max-width': '100px', 'margin-top': '10px', 'margin-left': '10px', 'margin-right': '10px', 'padding-left': '0px', 'padding-right': '0px' }"
            >
              <v-row
                :style="{ 'margin-top': '0px', 'margin-left': '0px', 'margin-right': '0px' }"
              >
                <svg-icon
                  type="mdi"
                  :path="icons.starCount"
                  size="18"
                  :style="{ 'padding-top': '0px', 'margin-bottom': '0px', 'margin-left': '5px' }"
                ></svg-icon>
                <span :style="{ 'margin-left': '4px', 'font-size': '14px' }"
                  >{{ article.starCount }}</span
                >
              </v-row>
            </div>
            <div
              :style="{ 'max-width': '100px', 'margin-top': '10px', 'margin-left': '10px', 'margin-right': '50px', 'padding-left': '0px', 'padding-right': '0px' }"
            >
              <v-row
                :style="{ 'margin-top': '0px', 'margin-left': '0px', 'margin-right': '0px' }"
              >
                <svg-icon
                  type="mdi"
                  :path="icons.comment"
                  size="18"
                  :style="{ 'padding-top': '0px', 'margin-bottom': '0px', 'margin-left': '5px' }"
                ></svg-icon>
                <span :style="{ 'margin-left': '4px', 'font-size': '14px' }"
                  >{{ article.replyCount }}</span
                >
              </v-row>
            </div>
          </v-row>
          <v-row
            :style="{'margin-top':'20px','margin-left':'10px','margin-right':'10px'}"
          >
            <span :style="{'margin-left':'10px','color':'#8a8a8a'}">标签:</span>
            <div :style="{'overflow':'auto', 'white-space': 'nowrap'}">
              <tag-button v-for="(tag,index) in article.tags" :tag="tag" :key="index"></tag-button>
            </div>
          </v-row>
          <div
            :style="{ 'display':'flex','flex-direction':'row','font-size': '12px', 'color': '#8a8a8a', 'font-weight': 'bold', 'margin-left': '20px', 'margin-top': '18px','margin-bottom':'5px' }"
          >
            {{article.type}}<span style="width:10px;"></span> <span v-if="article.type=='原创'">{{ article.authorName }}</span>
            <a v-if="article.type=='转载'" href="#" @click="toSource">原文链接</a>
            <v-spacer></v-spacer>
            <div style="display: flex;flex-direction: row;">
              <svg-icon type="mdi" :path="icons.file" color=""></svg-icon>
            </div>
          </div>
          <source-bar></source-bar>
        </v-card>
        <div
          v-html="renderedContent"
          :style="{ 'max-width': '900px', 'margin-left': '10px', 'margin-right': '10px', 'margin-top': '30px', 'margin-bottom': '30px', 'width': '900px' }"
        ></div>
      </v-card>
    </main>
    <div :style="{ 'justify-content': 'center', 'display': 'flex' }">
      <v-spacer></v-spacer>
      <div ref="bottomBar" :style="{'width':'1000px','max-width':'1000px','height':'50px','box-shadow':'none','box-radius':'0','border-top':'1px solid #8a8a8a','border-bottom':'1px solid #8a8a8a','position':'fixed','justify-content':'center','bottom':'0'}">
        <article-bottom-bar  @get_comment="getComment"/>
      </div>
      <v-spacer></v-spacer>
    </div>
  </div>
  <div ref="questionAndAnswerRef" v-if="ifShowComment"  style="right: 0;position: fixed;top: 0;background-color: rgba(255,255,255,0);">
    <question-and-answers :id="article.id" :type="'article'" @close_comment="closeComment" @alert="alert"></question-and-answers>
  </div>
</template>
<script>
  import {marked} from 'marked';
  import {useRoute,useRouter} from 'vue-router';
  import ArticleBottomBar from '@/components/ArticleBottomBar.vue';
  import { mdiClock,mdiEyeOutline,mdiStar,mdiMessage } from '@mdi/js';
  import SvgIcon from '@jamescoyle/vue-icon'
import TagButton from '@/components/TagButton.vue';
import QuestionAndAnswers from '@/components/QuestionAndAnswers.vue';
import SourceBar from '@/components/SourceBar.vue';
  export default {
    setup(){
      const articleId='00000000';
      const router=useRouter();
      return {
        router,
        articleId,
      }
    },
    components:{
      ArticleBottomBar,
      SvgIcon,
      TagButton,
      QuestionAndAnswers,
      SourceBar,
    },
    data() {
      return {
        alertSet:{
          state:false,
          color:'success',
          title:'获取成功',
          content:''
        },
        icons:{
          timeClock:mdiClock,
          viewCount:mdiEyeOutline,
          starCount:mdiStar,
          comment:mdiMessage,
        },
        article: {
          title: '这是一个标题',
          authorName: '这是作者名称',
          authorProfileUrl:'https://pic2.zhimg.com/v2-0dda71bc9ced142bf7bb2d6adbebe4f0_r.jpg?source=1940ef5c',
          publishTime: '2024-09-01 00:00',
          tags: ['计算机','测试'],
          starCount: '0',
          scanCount: '0',
          replyCount:'0',
          content: '',
          type:'转载',
          originLink:'https://sss',//如果文章类型为转载，反之为'',
          sourceUrl:'https://sss.zip',//如果文章含有资源，反之为'',
        },
        renderedContent:'',
        ifShowComment:false,
      }
    },
    methods:{
      toSource(){//去文章的源站  
        window.location.replace(this.article.originLink);
      },
      toAuthorPage(){
        this.router.push({name:'AuthorPage',params:{name:this.article.authorName}})
      },
      getComment(){
        this.ifShowComment=true;
      },
      closeComment(){
        this.ifShowComment=false;
      },
      alert(msg){
        this.alertSet=msg;
      }
    },
    mounted() {
      const route=useRoute();
      this.articleId=route.params.id;
      console.log('load article page',this.articleId);
      //在这里获取文章的内容

      //在组件加载完成后，将Markdown文本解析为HTML并赋值给renderedMarkdown
      this.renderedContent = marked(this.article.content);
    },
    beforeUnmount() {
    },
  }
</script>

<style>
  /* 可选样式 */
</style>