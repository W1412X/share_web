<template>
  <v-dialog v-model="ifShowDialog"
    style="display: flex;width: 100%;height:100%;justify-content: center;">
    <div style="display: flex;justify-content: center;">
      <QuestionEditor v-if="ifShowQuestionEditor" @close="close"></QuestionEditor>
      <CourseEditor v-if="ifShowCourseEditor" @close="close"></CourseEditor>
      <div v-if="ifShowNotice">
        <NoticeCard @close="close"></NoticeCard>
      </div>
    </div>
  </v-dialog>
  <v-layout style="background-color: #ffffff;display: flex;justify-content: center;">
    <div style="display: flex;flex-direction: column;width: 100%;">
      <div style="display: flex;justify-content: center;">
        <v-btn @click="showNotice" style="width: 100%;margin: 3px;height: 30px;background-color: #eaeaea;" color="#9c0c13" variant="tonal">📢 本站公告</v-btn>
      </div>
      <div style="display: flex;width: 100%;justify-content: center;">
        <v-app-bar color="#9c0c13" style="margin-bottom:10px;padding-bottom: 5px;margin-top: 35px;">
          <v-app-bar-title>Share ⛰️ SDU</v-app-bar-title>
          <v-select variant="outlined"
            style="margin-left: 200px;padding:0px;max-width: 100px;font-size: 16px;position: relative;margin-top: 10%;margin-bottom: 10%;height: 90%;"
            v-model="searchType" :items="['文章', '课程', '问答']" label="搜索类型"></v-select>
          <v-autocomplete v-model="inputValue" type="text" ref="searchInput"
            style="position: relative;margin-bottom: 10%;height: 90%;margin-top: 10%;margin-left:10px;" label="search"
            :items="['计算机图形学', '数据结构', '机器学习', '自主机器人', '计算机网络', '操作系统']" variant="outlined"></v-autocomplete>
          <v-btn icon>
            <svg-icon type="mdi" :path="icon.magnify"></svg-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="writeCourse">
            <svg-icon type="mdi" :path="icon.course"></svg-icon>
            <v-tooltip style="margin-left: 2px;margin-bottom: 8px;" activator="parent" location="top">发布新的课程</v-tooltip>
          </v-btn>
          <v-btn icon @click="writeQuestion">
            <svg-icon type="mdi" :path="icon.question"></svg-icon>
            <v-tooltip style="margin-left: 2px;margin-bottom: 8px;" activator="parent" location="top">编辑问题</v-tooltip>
          </v-btn>
          <v-btn icon @click="writeArticle">
            <svg-icon type="mdi" :path="icon.article"></svg-icon>
            <v-tooltip style="margin-left: 2px;margin-bottom: 8px;" activator="parent" location="top">写文章</v-tooltip>
          </v-btn>
          <v-btn icon @click="navigateToSelf">
            <svg-icon type="mdi" :path="icon.account"></svg-icon>
          </v-btn>
        </v-app-bar>
        <div style="padding-top: 64px;display: flex;flex-direction: column;">
          <v-tabs v-model="itemType" bg-color="indigo-darken-2" fixed-tabs style="width: 750px;">
            <v-tab
              :style="{ background: 'rgba(255,255,255,1)', 'font-size': '18px', 'color': this.itemType == 'article' ? '#000000' : '#8a8a8a' }"
              value="article" text="文章"></v-tab>
            <v-tab
              :style="{ background: 'rgba(255,255,255,1)', 'font-size': '18px', 'color': this.itemType == 'question' ? '#000000' : '#8a8a8a' }"
              value="question" text="问答"></v-tab>
            <v-tab
              :style="{ background: 'rgba(255,255,255,1)', 'font-size': '18px', 'color': this.itemType == 'course' ? '#000000' : '#8a8a8a' }"
              value="course" text="课程"></v-tab>
          </v-tabs>
          <div v-if="this.itemType == 'article'" style="width: 770px;">
            <article-list :articleList="this.articleItems"></article-list>
          </div>
          <div v-if="this.itemType == 'question'" style="width: 770px;">
            <component :is="AsyncSingleQuestion" v-for="(question, index) in this.questionItems" :key="index"
              :question="question" style="margin: 5px;"></component>
          </div>
          <div v-if="this.itemType == 'course'" style="width: 770px;">
            <CourseItem v-for="(course, index) in this.courseItems" :key="index" :course="course" style="margin: 5px;">
            </CourseItem>
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  </v-layout>
</template>
<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiMagnify, mdiHistory, mdiUpload, mdiAccountOutline, mdiCommentQuestionOutline, mdiFileEditOutline, mdiBookPlusOutline } from '@mdi/js'
import { useRouter } from 'vue-router';
import { computed, ref, defineAsyncComponent } from 'vue'
import ArticleList from '@/components/ArticleList.vue';
import CourseItem from '@/components/CourseItem.vue';
import CourseEditor from '@/components/CourseEditor.vue';
import QuestionEditor from '@/components/QuestionEditor.vue';
import NoticeCard from '@/components/NoticeCard.vue'
import { getUser } from '@/utils/storage';
export default {
  setup() {
    const userName = getUser('userName');
    //定义路由跳转
    const router = useRouter();
    const navigateToIndex = () => {
      router.push({ name: 'IndexPage' }); // 使用路由名称跳转
    };
    const navigateToSelf = () => {
      router.push({ name: 'SelfPage', params: { name: userName } });
    };
    const navigateToLogin = () => {
      router.push({ name: 'LoginPage' })
    }
    const ifShowQuestionEditor = ref(false);
    const ifShowCourseEditor = ref(false);
    const ifShowNotice=ref(false);
    const ifShowDialog = computed(() => {
      return ifShowQuestionEditor.value || ifShowCourseEditor.value || ifShowNotice.value;
    })
    const setQuestionEditorState = (state) => {
      ifShowQuestionEditor.value = state;
    }
    const setCourseEditorState = (state) => {
      ifShowCourseEditor.value = state;
    }
    const setNoticeState=(state)=>{
      ifShowNotice.value=state;
    }
    //懒加载部分  
    const AsyncSingleQuestion = defineAsyncComponent(() => import('@/components/SingleQuestion.vue'))
    return {
      userName,
      navigateToIndex,
      navigateToSelf,
      navigateToLogin,
      ifShowDialog,
      ifShowQuestionEditor,
      setQuestionEditorState,
      setCourseEditorState,
      ifShowCourseEditor,
      router,
      AsyncSingleQuestion,
      ifShowNotice,
      setNoticeState,
    };
  },
  components: {
    SvgIcon,
    ArticleList,
    CourseItem,
    QuestionEditor,
    CourseEditor,
    NoticeCard,
  },
  data() {
    return {
      icon: {
        magnify: mdiMagnify,
        history: mdiHistory,
        account: mdiAccountOutline,
        upload: mdiUpload,
        question: mdiCommentQuestionOutline,
        article: mdiFileEditOutline,
        course: mdiBookPlusOutline,
      },
      searchContent: 'RECOMMAND',
      searchType: '文章',
      articleItems: [
        { id: '00000000' },
        { id: '00000001' }
      ],//存储展示的文章的信息数组
      courseItems: [
        { id: '00000000' },
        { id: '00000001' }
      ],
      questionItems: [
        { id: '00000000' },
        { id: '00000001' }
      ],
      itemType: 'article',
      inputValue: '',
    }
  },
  methods: {
    showNotice(){
      this.setNoticeState(true);
    },
    showAlert() {
      // 获取v-autocomplete组件的值
      const iv = this.inputValue;
      console.log(iv)
      // 弹出警告框显示文本框内容
      alert(iv)
    },
    load_items() {//在向下划时调用
    },
    writeArticle() {
      this.router.push({ name: 'EditorPage', params: { id: "00000000" } });
    },
    writeQuestion() {
      this.setQuestionEditorState(true);
    },
    writeCourse() {
      this.setCourseEditorState(true);
    },
    close() {
      this.setQuestionEditorState(false);
      this.setCourseEditorState(false);
      this.setNoticeState(false);
    }
  },
  created() {
  }
}
</script>