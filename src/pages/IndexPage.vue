<template>
  <LoadingView v-model="progressMsg"></LoadingView>
  <v-dialog v-model="ifShowDialog" style="display: flex;width: 100%;height:100%;justify-content: center;">
    <div style="display: flex;justify-content: center;">
      <QuestionEditor v-if="ifShowQuestionEditor" @close="close"></QuestionEditor>
      <CourseEditor v-if="ifShowCourseEditor" @close="close"></CourseEditor>
      <div v-if="ifShowNotice">
        <NoticeCard @close="close"></NoticeCard>
      </div>
    </div>
  </v-dialog>
  <main style="background-color: #ffffff;display: flex;justify-content: center;">
    <div style="display: flex;flex-direction: column;width: 100%;background-color: #ffffff">
      <div
        style="height: 35px;width: 100%;;display: flex;justify-content: center;background-color: #ffffff;z-index: 1000;position: fixed">
        <v-btn @click="showNotice" style="width: 100%;margin: 3px;height: 30px;background-color: #eaeaea;"
          color="#9c0c13" variant="tonal">
          <span style="font-weight: bold;">📢 本站公告 ↥ </span>
          <span style="width: 10px;"></span>
          <span style="font-weight: bold;">当前为测试阶段 遇到BUG或者其他问题请联系网站管理员</span>
        </v-btn>
      </div>
      <div style="display: flex;width: 100%;justify-content: center;">
        <v-app-bar color="#9c0c13" style="margin-bottom:10px;padding-bottom: 5px;margin-top: 35px;position: fixed;">
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
        <div style="padding-top: 100px;display: flex;flex-direction: column;">
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
            <v-pagination v-model="articlePage" :length="articlePageNum" :size="30" :total-visible="5"></v-pagination>
          </div>
          <div v-if="this.itemType == 'question'" style="width: 770px;">
            <component :is="AsyncSingleQuestion" v-for="(question, index) in this.questionItems" :key="index"
              :question="question" style="margin: 5px;"></component>
            <v-pagination v-model="questionPage" :length="questionPageNum" :total-visible="5" :size="30"></v-pagination>
          </div>
          <div v-if="this.itemType == 'course'" style="width: 770px;">
            <CourseItem v-for="(course, index) in this.courseItems" :key="index" :course="course" style="margin: 5px;">
            </CourseItem>
            <v-pagination v-model="coursePage" :length="coursePageNum" :total-visible="5" :size="30"></v-pagination>
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  </main>
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
    const ifShowNotice = ref(false);
    const ifShowDialog = computed(() => {
      return ifShowQuestionEditor.value || ifShowCourseEditor.value || ifShowNotice.value;
    })
    const setQuestionEditorState = (state) => {
      ifShowQuestionEditor.value = state;
    }
    const setCourseEditorState = (state) => {
      ifShowCourseEditor.value = state;
    }
    const setNoticeState = (state) => {
      ifShowNotice.value = state;
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
          starCount: '99999',
          scanCount: '99999',
          replyCount: '99999',
        }
      ],//存储展示的文章的信息数组
      courseItems: [
        {
          id: '00000000',
          name: '程序思维设计与实践',
          teacher: '蔡晓军',
          type: '必修课 通识选修',
          college: '计算机科学与技术学院',
          campus: '青岛校区',
          examineMethod: '',//考试/论文/项目展示/其他
          teacheMethod: '线上',//线上/线下/混合
          rate: 3.5,
        }
      ],
      questionItems: [
        {
          id: '00000000',
          title: '这是问题',
          content: '这是内容',
          time: 'xxxx-xx-xx xx:xx',
          replyCount: 'xxxxx',
          starCount: 'xxxx',
          authorName: 'visitor',
          authorId: 'xxxx',
          scanCount: 'xxxx',
          profileUrl: 'xxxx',
          relativeUrl: 'xxxx',
        }
      ],
      itemType: 'article',
      inputValue: '',
      articlePage: 1,
      questionPage: 1,
      coursePage: 1,
      articlePageNum: 10,
      questionPageNum: 10,
      coursePageNum: 10,
      progressMsg: {
        state: false,
        text: '正在加载',
        progress: -1,
      }
    }
  },
  methods: {
    showNotice() {
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
    for (var i = 0; i < 10; i++) {
      this.articleItems.push(this.articleItems[0])
      this.questionItems.push(this.questionItems[0])
      this.courseItems.push(this.courseItems[0])
    }
  }
}
</script>