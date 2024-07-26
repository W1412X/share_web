<template>
  <div :style="{'justify-content':'center','width':'100%','display':'flex'}">
    <v-card
      :style="{'max-width':'1000px','width':'1000px','background-color':'#eef0f4'}"
    >
      <v-card
        :style="{'margin-right':'2px','margin-left':'2px','margin-top':'2px','height':'110px'}"
      >
        <v-card-title
          :style="{'font-size':'22px','font-weight':'bold','color':'#2f2f2f'}"
        >
          这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题
        </v-card-title>
        <v-row :style="{'padding-left':'20px','color':'#8a8a8a'}">
          <v-avatar
            size="25"
            :style="{'margin-top':'8px','margin-right':'0px','margin-left':'10px','font-size':'14px'}"
          >
            <v-img :src="author.avatarUrl"></v-img>
          </v-avatar>
          <span
            :style="{'margin-top':'10px','margin-right':'10px','margin-left':'10px','font-size':'14px'}"
            >{{ author.name }}</span
          >
          <v-spacer></v-spacer>
          <div
            :no-gutters="true"
            :style="{'margin-top':'10px','margin-left':'10px','margin-right':'10px','padding-left':'0px','padding-right':'0px'}"
          >
            <v-icon
              icon="mdi-clock"
              size="18"
              :style="{'margin-top':'-2px','margin-left':'5px'}"
            ></v-icon>
            <span :style="{'margin-left':'5px','font-size':'14px'}"
              >编辑于 2024-07-28 08:55</span
            >
          </div>
          <div
            :no-gutters="true"
            :style="{'max-width':'100px','margin-top':'10px','margin-left':'10px','margin-right':'10px','padding-left':'0px','padding-right':'0px'}"
          >
            <v-icon
              size="18"
              icon="mdi-eye-outline"
              :style="{'margin-top':'-2px','margin-left':'5px'}"
            ></v-icon>
            <span :style="{'margin-left':'5px','font-size':'14px'}">9999</span>
          </div>
          <div
            :style="{'max-width':'px','margin-top':'10px','margin-left':'10px','margin-right':'50px','padding-left':'0px','padding-right':'0px'}"
          >
            <v-icon
              icon="mdi-star"
              size="18"
              :style="{'margin-top':'-3px','margin-left':'10px'}"
            ></v-icon>
            <span :style="{'margin-left':'4px','font-size':'14px'}">9999</span>
          </div>
        </v-row>
        <div :style="{'font-size':'12px','color':'#8a8a8a','font-weight':'bold','margin-left':'20px','margin-top':'22px'}">原创 <span click="toSource">{{author.name}}</span></div>
      </v-card>
      <div v-html="renderedContent" :style="{'max-width':'900px','width':'900px'}"></div>
    </v-card>
  </div>
</template>
<script>
  import {marked} from 'marked';
  import { useStore } from 'vuex';
  import { computed } from 'vue';
  import {useRouter} from 'vue-router';
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
    data() {
      return {
        article: {
          title: '这是一个标题',
          authorName: '这是作者名称',
          publishTime: '2024-09-01 00:00',
          tags: [],
          stars: '0',
          views: '0',
          content: '# 计算机网络复习  \n'
        },
        author: {
          name: '游客',
          avatarUrl:
            'https://pic2.zhimg.com/v2-0dda71bc9ced142bf7bb2d6adbebe4f0_r.jpg?source=1940ef5c',
        },
        renderedContent:'',
      }
    },
    methods:{
      toSource(){//去文章的源站  
      },
      checkLoginState(){//检查登陆状态，游客状态就跳转到登陆界面
        if(this.user.id=='00000000'){
          window.alert('请登陆');
          this.navigateToLogin();
        }
      },
    },
    mounted() {
      // 在组件加载完成后，将Markdown文本解析为HTML并赋值给renderedMarkdown
      this.renderedContent = marked(this.article.content)
      this.checkLoginState();
    },
  }
</script>

<style>
  /* 可选样式 */
</style>