<template>
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
              size="25"
              :style="{ 'margin-top': '8px', 'margin-right': '0px', 'margin-left': '10px', 'font-size': '14px' }"
            >
              <v-img :src="author.avatarUrl"></v-img>
            </v-avatar>
            <span
              :style="{ 'margin-top': '10px', 'margin-right': '10px', 'margin-left': '10px', 'font-size': '14px' }"
              >{{ author.name }}</span
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
                  >{{ article.views }}</span
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
                  :path="icons.starCount"
                  size="18"
                  :style="{ 'padding-top': '0px', 'margin-bottom': '0px', 'margin-left': '5px' }"
                ></svg-icon>
                <span :style="{ 'margin-left': '4px', 'font-size': '14px' }"
                  >{{ article.stars }}</span
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
            :style="{ 'font-size': '12px', 'color': '#8a8a8a', 'font-weight': 'bold', 'margin-left': '20px', 'margin-top': '18px','margin-bottom':'5px' }"
          >
            原创 <span click="toSource">{{ author.name }}</span>
          </div>
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
        <articlue-bottom-bar  @get_comment="getComment"/>
      </div>
      <v-spacer></v-spacer>
    </div>
  </div>
  <div ref="questionAndAnswer" style="right: 0;z-index: 9999;position: fixed;top: 0;">
    <question-and-answers v-if="ifShowComment"></question-and-answers>
  </div>
</template>
<script>
  import {marked} from 'marked';
  import { useStore } from 'vuex';
  import { computed } from 'vue';
  import {useRouter} from 'vue-router';
  import { useRoute } from 'vue-router';
  import ArticlueBottomBar from '@/components/ArticlueBottomBar.vue';
  import { mdiClock,mdiEyeOutline,mdiStar } from '@mdi/js';
  import SvgIcon from '@jamescoyle/vue-icon'
import TagButton from '@/components/TagButton.vue';
import QuestionAndAnswers from '@/components/QuestionAndAnswers.vue';
  export default {
    setup(){
      const router=useRouter();
      const store=useStore();
      const user=computed(() => store.getters.getUser);
      const navigateToLogin =() =>{
        router.push({name:'LoginPage'})
      }
      return {
        user,
        router,
        navigateToLogin,
      }
    },
    components:{
      ArticlueBottomBar,
      SvgIcon,
      TagButton,
      QuestionAndAnswers,
    },
    data() {
      return {
        icons:{
          timeClock:mdiClock,
          viewCount:mdiEyeOutline,
          starCount:mdiStar,
        },
        article: {
          id:'00000000',
          title: '这是一个标题',
          authorName: '这是作者名称',
          publishTime: '2024-09-01 00:00',
          tags: ['计算机','测试'],
          stars: '0',
          views: '0',
          content: '# 这是内容  \n\n '
        },
        author: {
          name: '游客',
          avatarUrl:
            'https://pic2.zhimg.com/v2-0dda71bc9ced142bf7bb2d6adbebe4f0_r.jpg?source=1940ef5c',
        },
        renderedContent:'',
        ifShowComment:false,
      }
    },
    methods:{
      toSource(){//去文章的源站  
      },
      getComment(){
        this.ifShowComment=!this.ifShowComment;
      },
      handleDocumentClick(event) {
        if(this.ifShowComment && this.$refs.bottomBar.contains(event.target)){//点击的事件发生在bottombar而且为打开评论
          return event;
        }
        else if (this.ifShowComment && !this.$refs.questionAndAnswer.contains(event.target)) {//如果已经显示而且点击在控件之外，隐藏
          this.ifShowComment=!this.ifShowComment;
          return;
        }else{
          return event;
        }
      },
    },
    mounted() {
      const route=useRoute();
      console.log(route);
      //获取文章内容(通过 route.params.id)带访问
      document.addEventListener('click', this.handleDocumentClick);
      //在组件加载完成后，将Markdown文本解析为HTML并赋值给renderedMarkdown
      this.renderedContent = marked(this.article.content);
    },
    beforeUnmount() {
      document.removeEventListener('click', this.handleDocumentClick);
    },
  }
</script>

<style>
  /* 可选样式 */
</style>