<template>
  <LoadingView v-model="progressMsg"></LoadingView>
  <v-snackbar
    :timeout="3000"
    :color="alertSet.color"
    v-model="alertSet.state"
  >
    <div class="text-subtitle-1 pb-2">{{ alertSet.title }}</div>
    <p>{{ alertSet.content }}</p>
  </v-snackbar>
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
            <user-profile :name="article.authorName" :url="article.authorProfileUrl" style="margin-top:8px;margin-left: 10px;"></user-profile>
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
          </div>
          <source-bar :source-link="article.sourceUrl" :source-name="article.sourceName"></source-bar>
        </v-card>
        <!--
        <div
          v-html="renderedContent"
          :style="{ 'max-width': '900px', 'margin-left': '10px', 'margin-right': '10px', 'margin-top': '30px', 'margin-bottom': '30px', 'width': '900px' }"
        ></div>
        -->
        <!--这里代码不高亮，先直接吧编辑器搬过来-->
          <article-display :initial-html="article.content"></article-display>
      </v-card>
    </main>
    <div :style="{ 'justify-content': 'center', 'display': 'flex' }">
      <v-spacer></v-spacer>
      <div ref="bottomBar"  :style="{'width':'1000px','max-width':'1000px','height':'50px','box-shadow':'none','box-radius':'0','border-top':'1px solid #8a8a8a','border-bottom':'1px solid #8a8a8a','position':'fixed','justify-content':'center','bottom':'0'}">
        <article-bottom-bar :article-id="article.id" :profile-url="profileUrl" :user-name="userName"  @get_comment="getComment"/>
      </div>
      <v-spacer></v-spacer>
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
import UserProfile from '@/components/UserProfile.vue';
import { getArticleDetail } from '@/axios/detail';//获取文章详细内容的请求
import { getStatusMessage,/*unknowError*/ } from '@/statusCodeMessages';
import { getUser } from '@/utils/storage';
import ArticleDisplay from '@/components/ArticleDisplay.vue';
  export default {
    setup(){
      const router=useRouter();
      return {
        router,
      }
    },
    components:{
      ArticleBottomBar,
      SvgIcon,
      TagButton,
      QuestionAndAnswers,
      SourceBar,
      UserProfile,
      ArticleDisplay,
    },
    data() {
      const userName=getUser('userName');
      const profileUrl=getUser('profileUrl');
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
          id:'00000000',
          title: '标题',
          authorName: '作者名称',
          authorProfileUrl:'https://pic2.zhimg.com/v2-0dda71bc9ced142bf7bb2d6adbebe4f0_r.jpg?source=1940ef5c',
          publishTime: '2024-09-01 00:00',
          tags: ['计算机','测试'],
          starCount: '0',
          scanCount: '0',
          replyCount:'0',
          content: `<p><span style="color: rgb(0, 0, 0); font-size: 24px; font-family: 楷体;"><strong>图片与视频：</strong></span></p><p><span style="color: rgb(0, 0, 0); font-size: 16px;"><strong>支持直接加载网络图片以及上传图片</strong></span></p><p><span style="color: rgb(0, 0, 0); font-size: 16px;"><strong>支持加载网络视频，不支持上传视频</strong></span></p><p><span style="color: rgb(0, 0, 0); font-size: 24px; font-family: 微软雅黑;"><strong>其他样式：</strong></span></p><p><span style="color: rgb(216, 68, 147); font-size: 48px;"><strong>标题</strong></span><span style="font-size: 48px;"><strong> </strong></span><span style="color: rgb(106, 57, 201); font-size: 40px;"><strong>标题</strong></span><span style="font-size: 48px;"><strong> </strong></span><span style="color: rgb(66, 144, 247); font-size: 32px;"><strong>标题</strong></span><span style="font-size: 32px;"><strong> </strong></span><span style="color: rgb(114, 192, 64); font-size: 24px;"><strong>标题</strong></span><span style="font-size: 32px;"><strong> </strong></span><span style="color: rgb(245, 219, 77); font-size: 16px;"><strong>标题</strong></span><span style="font-size: 32px;"><strong> </strong></span><span style="color: rgb(225, 60, 57); font-size: 12px;"><strong>标题</strong></span><span style="font-size: 14px;"><strong> </strong></span><span style="font-size: 22px;"><strong> </strong></span><span style="font-size: 24px;"><strong> </strong></span><span style="font-size: 32px;"><strong> </strong></span></p><p><span style="font-size: 48px;"><strong>😀</strong></span><span style="font-size: 32px;"><strong> </strong></span><span style="font-size: 40px;"><strong>😀</strong></span><span style="font-size: 32px;"><strong> 😀 </strong></span><span style="font-size: 24px;"><strong>😀</strong></span><span style="font-size: 32px;"><strong> </strong></span><span style="font-size: 16px;"><strong>😀</strong></span><span style="font-size: 32px;"><strong> </strong></span><span style="font-size: 12px;"><strong>😀</strong></span><span style="font-size: 32px;"><strong>   </strong></span></p><p><span data-w-e-type="formula" data-w-e-is-void data-w-e-is-inline data-value="\\frac{a}{b} a^2, a_i \\sqrt{a}, \\sqrt[n]{a} \\sum_{i=1}^{n} i, \\int_{a}^{b} x^2 , dx  x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}"></span></p><p> <a href="sss" target="_blank">链接</a> </p><table style="width: auto;"><tbody><tr><th colSpan="1" rowSpan="1" width="auto">111</th><th colSpan="1" rowSpan="1" width="auto">111</th><th colSpan="1" rowSpan="1" width="auto">111</th><th colSpan="1" rowSpan="1" width="auto">111</th></tr><tr><td colSpan="1" rowSpan="1" width="auto">111</td><td colSpan="1" rowSpan="1" width="auto">111</td><td colSpan="1" rowSpan="1" width="auto">111</td><td colSpan="1" rowSpan="1" width="auto">111</td></tr><tr><td colSpan="1" rowSpan="1" width="auto">111</td><td colSpan="1" rowSpan="1" width="auto">111</td><td colSpan="1" rowSpan="1" width="auto">111</td><td colSpan="1" rowSpan="1" width="auto">111</td></tr></tbody></table><pre><code class="language-python">import numpy
import pandas
import os
... ... </code></pre><blockquote>引用部分</blockquote><p><br></p>`,
          type:'转载',
          originLink:'https://sss',//如果文章类型为转载，反之为'',
          sourceUrl:'https://sss.zip',//如果文章含有资源，反之为'',
          sourceName:'这是资源',
        },
        renderedContent:'',
        ifShowComment:false,
        selectedQuestionId:'',
        userName,
        profileUrl,
        progressMsg:{
          state:false,
          text:'正在加载',
          progress:-1,
        }
      }
    },
    methods:{
      toSource(){//去文章的源站  
        window.location.replace(this.article.originLink);
      },
      getComment(){
        this.ifShowComment=true;
      },
      closeComment(){
        this.ifShowComment=false;
      },
      alert(msg){
        this.alertSet=msg;
      },
    },
    created() {//article.id的获取通过路径参数
      this.progressMsg={
            state:true,
            text:'正在加载文章信息',
            progress:-1,
        };
      const route=useRoute();
      this.article.id=route.params.id;
      console.log('load article page',this.article.id);
      //来自消息跳转
      getArticleDetail(this.article.id)
      .then(response=>{
        const status=response.status;
        if(status==200){//请求成功
          this.article.title=response.title;
          this.article.authorName=response.author_name;
          this.article.authorProfileUrl=response.author_profile_url;
          this.article.tags=response.tags;
          this.article.starCount=response.star_count;
          this.article.scanCount=response.scan_count;
          this.article.replyCount=response.reply_count;
          this.article.content=response.content;
          this.article.type=response.type;
          this.article.originLink=response.origin_link;
          this.article.sourceUrl=response.source_url;
          this.article.publishTime=response.publish_time;
        }else{
          this.$router.push({name:'ErrorPage',params:{reason:getStatusMessage('common',status).content}});
        }
      })
      .catch(error=>{
        console.error('Failed to fetch article detail',error);
        //测试不跳转
        return;
        /*
        
        this.alert(unknowError);
        //跳转到errorPage
        this.$router.push({name:'ErrorPage',params:{reason:'网络错误'}});*/
      })
      //在组件加载完成后，将Markdown文本解析为HTML并赋值给renderedMarkdown
      this.renderedContent = marked(this.article.content);
    },
  }
</script>

<style>
  /* 可选样式 */
</style>