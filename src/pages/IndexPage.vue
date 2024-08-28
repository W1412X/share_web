<template>
  <v-layout style="background-color: #ffffff;display: flex;justify-content: center;">
    <div style="position: relative;height: 100%;">
      <v-app-bar color="#9c0c13" style="margin-bottom:5px">
        <v-app-bar-title>☯SDU</v-app-bar-title>
        <v-autocomplete v-model="inputValue" type="text" ref="searchInput" class="search_input" label="search"
          style="margin-left: 100px;"
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
            <article-list :articleList="this.articleItems"></article-list>
          </div>
          <div v-if="this.itemType=='question'" style="">
            <SingleQuestion v-for="(obj,index) in this.questionItems" :key="index" :question="obj" style="margin: 5px;"></SingleQuestion>
          </div>
          <div v-if="this.itemType=='course'" style="">
            <CourseItem v-for="(obj,index) in this.courseItems" :key="index" :course="obj" style="margin: 5px;"></CourseItem>
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
import SingleQuestion from '@/components/SingleQuestion.vue';
import CourseItem from '@/components/CourseItem.vue';
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
    SingleQuestion,
    CourseItem,
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
      articleItems: [

      ],//存储展示的文章的信息数组
      courseItems:[

      ], 
      questionItems:[

      ],
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
      const article_item = {
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
        likeCount:10000,
        replyCount:10000,
        scanCount:100000,
      }
      const course_item={
        name: '程序思维设计与实践',
        teacher: '蔡晓军',
        type: '必修',
        teachMethod: '线上教学',
        examineMethod: '考试',
        rate: {
          rate: 3.5,
        },
        semester: '大二 上学期',
      }
      const question_item={
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
      this.articleItems.push(article_item );
      this.courseItems.push(course_item);
      this.questionItems.push(question_item);
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