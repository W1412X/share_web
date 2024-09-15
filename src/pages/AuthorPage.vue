<template>
  <v-app>
    <div style="display: flex;justify-content: center;">
      <div style="display: flex;flex-direction: column;">
        <user-message-reader :name="authorName"></user-message-reader>
        <div style="display: flex;width: 100%;justify-content: center;">
          <v-card :style="{ width: '100%', display: 'relative', 'margin-top': '5px' }">
            <v-tabs v-model="type" style="width: 750px;background-color: #8a8a8a;" bg-color="indigo-darken-2"
              fixed-tabs>
              <v-tab :style="{ background: '#bbbbbb', 'font-size': '18px', 'min-width': '375px' }" value="article"
                text="文章"></v-tab>
              <v-tab :style="{ background: '#bbbbbb', 'font-size': '18px', 'min-width': '375px' }" value="question"
                text="问答"></v-tab>
              <!--<v-tab :style="{ background: '#bbbbbb', 'font-size': '18px', 'min-width': '250px' }" value="course"
                text="课程"></v-tab>-->
            </v-tabs>
            <div v-if="type == 'article'" style="width: 100%;display: flex;flex-direction: column;">
              <article-item v-for="(article, index) in articleList" :key="index" :article="article"
                :status="'reader'"></article-item>
            </div>
            <div v-if="type == 'question'" style="width: 100%;display: flex;flex-direction: column;">
              <single-question v-for="(question, index) in questionList" :key="index" :question="question"
                :status="'reader'"></single-question>
            </div>
            <!--<div v-if="type == 'course'" style="width: 100%;display: flex;flex-direction: column;">
              <course-item v-for="(course, index) in courseList" :key="index" :course="course"></course-item>
            </div>--->
          </v-card>
        </div>
      </div>
    </div>
  </v-app>
</template>
<script>
import UserMessageReader from '@/components/UserMessageReader.vue';
import ArticleItem from '@/components/ArticleItem.vue';
//import CourseItem from '@/components/CourseItem.vue';
import {useRoute} from 'vue-router';
import SingleQuestion from '@/components/SingleQuestion.vue';
export default {
  setup(){
    const authorName='visitor';
    return {
      authorName,
    }
  },
  data() {
    const articleList = [//个人创作文章列表
      {id:'00000000'},
      {id:'00000000'},
      {id:'00000000'}
    ];
    const questionList = [//问题列表
      {id:'00000000'},
      {id:'00000000'},
      {id:'00000000'}
    ];
    const courseList = [
      {id:'00000000'},
      {id:'00000000'},
      {id:'00000000'}
    ]
    const type = 'course'
    return {
      type,
      questionList,
      articleList,
      courseList
    }
  },
  components: {
    UserMessageReader,
    ArticleItem,
    SingleQuestion,
//    CourseItem,
  },
  methods: {

  },
  created(){
    const route=useRoute();
    this.authorName=route.params.name;
    console.log('load author page',this.authorName);
  }
}
</script>