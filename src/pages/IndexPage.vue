<template>
  <v-layout>
    <div style="position: relative;height: 100%;">
      <v-app-bar color="#9c0c13" style="margin-bottom:5px">
        <v-app-bar-title>资源分享</v-app-bar-title>
        <v-autocomplete v-model="inputValue" type="text" ref="searchInput" class="search_input" label="search"
          :items="['计算机图形学', '数据结构', '机器学习', '自主机器人', '计算机网络', '操作系统']" variant="outlined"></v-autocomplete>
        <v-btn icon>
          <svg-icon type="mdi" :path="icon.magnify"></svg-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon>
          <svg-icon type="mdi" :path="icon.upload"></svg-icon>
        </v-btn>
        <v-btn icon>
          <svg-icon type="mdi" :path="icon.history"></svg-icon>
        </v-btn>
        <v-btn icon @click="navigateToSelf">
          <svg-icon type="mdi" :path="icon.account"></svg-icon>
        </v-btn>
      </v-app-bar>
        <div style="padding-top: 64px;">
          <v-tabs v-model="itemType" bg-color="indigo-darken-2" fixed-tabs>
            <v-tab
              :style="{background:'rgba(255,255,255,1)','font-size':'18px','color':this.itemType=='article'?'#000000':'#8a8a8a'}"
              value="article"
              text="文章"
            ></v-tab>
            <v-tab
              :style="{background:'rgba(255,255,255,1)','font-size':'18px','color':this.itemType=='question'?'#000000':'#8a8a8a'}"
              value="question"
              text="问答"
            ></v-tab>
            <v-tab
              :style="{background:'rgba(255,255,255,1)','font-size':'18px','color':this.itemType=='course'?'#000000':'#8a8a8a'}"
              value="course"
              text="课程"
            ></v-tab>
          </v-tabs>
          <div v-if="this.itemType=='article'" style="width: 770px;">
            <article-list :articleList="this.items"></article-list>
          </div>
          <div v-if="this.itemType=='question'" style="">
            <question-and-answers></question-and-answers>
          </div>
          <div>
          </div>
        </div>
    </div>
  </v-layout>
</template>

<style scoped>
  .search_input {
    position: relative;
    margin-bottom: 10%;
    height: 80%;
    margin-top: 10%;
  }
</style>

<style scoped>
  .search_input {
    position: relative;
    margin-bottom: 10%;
    height: 80%;
    margin-top: 10%;
  }
</style>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiMagnify,mdiHistory,mdiUpload,mdiAccountOutline } from '@mdi/js'
import {useRouter} from 'vue-router';
import {computed} from 'vue'
import { useStore } from 'vuex';
import ArticleList from '@/components/ArticleList.vue';
import QuestionAndAnswers from '@/components/QuestionAndAnswers.vue';
export default {
  setup() {
    const router = useRouter();
    const navigateToIndex = () => {
      router.push({ name: 'IndexPage' }); // 使用路由名称跳转
    };
    const navigateToSelf = () => {
      router.push({name: 'SelfPage'});
    };
    const navigateToLogin =() =>{
      router.push({name:'LoginPage'})
    }
    const store=useStore();
    const user= computed(() => store.getters.getUser);
    return {
      user,
      router,
      navigateToIndex,
      navigateToSelf,
      navigateToLogin,
    };
  },
  components: {
    SvgIcon,
    ArticleList,
    QuestionAndAnswers,
  },
  data() {
    return {
      icon:{
        magnify:mdiMagnify,
        history:mdiHistory,
        account:mdiAccountOutline,
        upload:mdiUpload,
      },
      searchContent: 'RECOMMAND',
      items: [

      ],//存储展示的文章的信息数组 
      itemType:'article',
    }
  },
  methods: {
    showAlert() {
      // 获取v-autocomplete组件的值
      const iv = this.inputValue; 
      console.log(iv)
      // 弹出警告框显示文本框内容
      alert(iv)
    },
    load_items() {//在向下划时调用
      const new_item = {
        id: '00000001',
        title: '这是文章2标题',
        tags: ['计算机2', '测试2'],
        description:
          '这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介',
        publishTime: '2022-09-01 00:00',
        imgUrl:
          'https://tse2-mm.cn.bing.net/th/id/OIP-C.B6see3otwDOwdcSecD_W8QHaHa?w=173&h=180&c=7&r=0&o=5&pid=1.7',
        authorName: '测试用户',
        profileUrl:
          'https://tse1-mm.cn.bing.net/th/id/OIP-C.PO7d9IfnPUy2RO173QYt6wHaHV?w=216&h=213&c=7&r=0&o=5&pid=1.7',
      }
      this.items.push(new_item)
    },
    test(){
      for(var i=0;i<10;i++){
        this.load_items();      
      }
    }
  },
  mounted(){
    this.test();
  }
}
</script>