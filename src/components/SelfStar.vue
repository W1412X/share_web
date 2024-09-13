<template>
  <v-card :style="{ width: '100%', display: 'relative', 'margin-top': '10px' }">
    <v-tabs v-model="type" style="width: 750px;background-color: #8a8a8a;" bg-color="indigo-darken-2" fixed-tabs>
      <v-tab :style="{ background: '#bbbbbb', 'font-size': '18px', 'min-width': '250px' }" value="article" text="文章"></v-tab>
      <v-tab :style="{ background: '#bbbbbb', 'font-size': '18px', 'min-width': '250px' }" value="question" text="问答"></v-tab>
      <v-tab :style="{ background: '#bbbbbb', 'font-size': '18px', 'min-width': '250px' }" value="course" text="课程"></v-tab>
    </v-tabs>
    <div style="height:100%;overflow:scroll;">
    <div v-if="type == 'article'" style="width: 100%;display: flex;flex-direction: column;">
      <article-item v-for="(article, index) in articleList" :key="index" :article="article"
        :status="'reader'"></article-item>
    </div>
    <div v-if="type == 'question'" style="width: 100%;display: flex;flex-direction: column;">
      <single-question v-for="(question, index) in questionList" :key="index" :question="question"
        :status="'reader'"></single-question>
    </div>
    <div v-if="type == 'course'" style="width: 100%;display: flex;flex-direction: column;">
      <course-item v-for="(course, index) in courseList" :key="index" :course="course"></course-item>
    </div>
  </div>
  </v-card>
</template>
<script>
import ArticleItem from './ArticleItem.vue';
import CourseItem from './CourseItem.vue';
import SingleQuestion from './SingleQuestion.vue';
//import QuestionWithOutImage from './QuestionWithOutImage.vue';

export default {
  setup() { },
  components: {
    ArticleItem,
    //QuestionWithOutImage,
    CourseItem,
    SingleQuestion,
  },
  data() {
    const articleList = [//个人创作文章列表
      '00000000',
      '00000001',
      '00000002',
      '00000003',
      '00000004',
      '00000005',
      '00000006'
    ];
    const questionList = [//问题列表
      '00000000',
      '00000001',
      '00000002',
      '00000003',
      '00000004',
      '00000005',
      '00000006',
    ];
    const courseList = [
      '00000000',
      '00000001',
      '00000002',
      '00000003',
      '00000004',
      '00000005',
      '00000006',
    ]
    const type = 'article'
    return {
      type,
      questionList,
      articleList,
      courseList
    }
  },
}
</script>