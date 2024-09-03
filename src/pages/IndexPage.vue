<template>
  <v-dialog v-model="ifShowDialog"
    style="display: flex;width: 100%;height:100%;background-color: rgba(255,255,255,0.5);justify-content: center;">
    <div style="display: flex;justify-content: center;">
      <QuestionEditor v-if="ifShowQuestionEditor" @close="close"></QuestionEditor>
      <CourseEditor v-if="ifShowCourseEditor" @close="close"></CourseEditor>
    </div>
  </v-dialog>
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
        <v-btn icon @click="writeCourse">
          <svg-icon type="mdi" :path="icon.course"></svg-icon>
          <v-tooltip  style="margin-left: 2px;margin-bottom: 8px;" activator="parent" location="top">发布新的课程</v-tooltip>
        </v-btn>
        <v-btn icon @click="writeQuestion">
          <svg-icon type="mdi" :path="icon.question"></svg-icon>
          <v-tooltip  style="margin-left: 2px;margin-bottom: 8px;" activator="parent" location="top">编辑问题</v-tooltip>
        </v-btn>
        <v-btn icon @click="writeArticle">
          <svg-icon type="mdi" :path="icon.article"></svg-icon>
          <v-tooltip  style="margin-left: 2px;margin-bottom: 8px;" activator="parent" location="top">写文章</v-tooltip>
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
          <div v-if="this.itemType=='question'" style="width: 770px;">
            <SingleQuestion v-for="(questionId,index) in this.questionItems" :key="index" :id="questionId" style="margin: 5px;"></SingleQuestion>
          </div>
          <div v-if="this.itemType=='course'" style="width: 770px;">
            <CourseItem v-for="(courseId,index) in this.courseItems" :key="index" :id="courseId" style="margin: 5px;"></CourseItem>
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
import QuestionEditor from '@/components/QuestionEditor.vue';
import { mdiMagnify,mdiHistory,mdiUpload,mdiAccountOutline, mdiCommentQuestionOutline, mdiFileEditOutline,mdiBookPlusOutline } from '@mdi/js'
import {useRouter} from 'vue-router';
import {computed,ref} from 'vue'
import ArticleList from '@/components/ArticleList.vue';
import SingleQuestion from '@/components/SingleQuestion.vue';
import CourseItem from '@/components/CourseItem.vue';
import CourseEditor from '@/components/CourseEditor.vue';
import { getUser } from '@/utils/storage';
export default {
  setup() {
    const userName=getUser('userName');
    //定义路由跳转
    const router = useRouter();
    const navigateToIndex = () => {
      router.push({ name: 'IndexPage' }); // 使用路由名称跳转
    };
    const navigateToSelf = () => {
      router.push({name: 'SelfPage',params:{name:userName}});
    };
    const navigateToLogin =() =>{
      router.push({name:'LoginPage'})
    }
    const ifShowQuestionEditor=ref(false);
    const ifShowCourseEditor=ref(false);
    const ifShowDialog=computed(()=>{
      return ifShowQuestionEditor.value || ifShowCourseEditor.value;
    })
    const setQuestionEditorState=(state)=>{
      ifShowQuestionEditor.value=state;
    }
    const setCourseEditorState=(state)=>{
      ifShowCourseEditor.value=state;
    }
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
      router
    };
  },
  components: {
    SvgIcon,
    ArticleList,
    SingleQuestion,
    CourseItem,
    QuestionEditor,
    CourseEditor,
  },
  data() {
    return {
      icon:{
        magnify:mdiMagnify,
        history:mdiHistory,
        account:mdiAccountOutline,
        upload:mdiUpload,
        question:mdiCommentQuestionOutline,
        article:mdiFileEditOutline,
        course:mdiBookPlusOutline,
      },
      searchContent: 'RECOMMAND',
      articleItems: [
      '00000001',
        '00000002',
        '00000003',
        '00000004',
        '00000005',
        '00000006',
        '00000007',
        '00000008'
      ],//存储展示的文章的信息数组
      courseItems:[
      '00000001',
        '00000002',
        '00000003',
        '00000004',
        '00000005',
        '00000006',
        '00000007',
        '00000008'
      ], 
      questionItems:[
      '00000001',
        '00000002',
        '00000003',
        '00000004',
        '00000005',
        '00000006',
        '00000007',
        '00000008'
      ],
      itemType:'article',
      inputValue:'',
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
    },
    writeArticle(){
      this.router.push({name:'EditorPage',params:{id:"00000000"}});
    },
    writeQuestion(){
      this.setQuestionEditorState(true);
    },
    writeCourse(){
      this.setCourseEditorState(true); 
    },
    close(){
      this.setQuestionEditorState(false);
      this.setCourseEditorState(false);
    }
  },
  mounted(){
  }
}
</script>