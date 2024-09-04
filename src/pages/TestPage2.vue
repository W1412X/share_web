<template>
  <div style="display: flex;flex-direction: column-reverse;">
    <report-card></report-card>
    <user-message-editor></user-message-editor>
    <user-message-reader></user-message-reader>
    <set-profile-card></set-profile-card>
    <question-editor ref="testRef"></question-editor>
    <message-bar></message-bar>
    <course-answer-editor></course-answer-editor>
    <course-answer></course-answer>
    <course-editor></course-editor>
    <source-bar></source-bar>
    <star-button></star-button>
    <like-button></like-button>
    <answer></answer>
    <article-bottom-bar></article-bottom-bar>
    <alert-button></alert-button>
    <article-item></article-item>
    <black-user-bar></black-user-bar>
    <follow-user-bar></follow-user-bar>
    <rating-course-card></rating-course-card>
  </div>
</template>
<script>
import ReportCard from '@/components/ReportCard.vue';
import SetProfileCard from '@/components/SetProfileCard.vue';
import UserMessageEditor from '@/components/UserMessageEditor.vue';
import UserMessageReader from '@/components/UserMessageReader.vue';
import QuestionEditor from '@/components/QuestionEditor.vue'
import MessageBar from '@/components/MessageBar.vue'
import CourseAnswerEditor from '@/components/CourseAnswerEditor.vue'
import CourseAnswer from '@/components/CourseAnswer.vue';
import CourseEditor from '@/components/CourseEditor.vue';
import SourceBar from '@/components/SourceBar.vue';
import StarButton from '@/components/StarButton.vue';
import LikeButton from '@/components/LikeButton.vue';
import Answer from '@/components/Answer.vue';
import ArticleBottomBar from '@/components/ArticleBottomBar.vue';
import AlertButton from '@/components/AlertButton.vue';
import ArticleItem from '@/components/ArticleItem.vue';
import BlackUserBar from '@/components/BlackUserBar.vue';
import FollowUserBar from '@/components/FollowUserBar.vue';
import RatingCourseCard from '@/components/RatingCourseCard.vue';
export default {
  methods: {
    test() {
      console.log(this.$refs.testRef.$data);
    },
  },
  components: {
    Answer,
    ReportCard,
    UserMessageEditor,
    UserMessageReader,
    SetProfileCard,
    QuestionEditor,
    MessageBar,
    CourseAnswerEditor,
    CourseAnswer,
    CourseEditor,
    StarButton,
    SourceBar,
    LikeButton,
    ArticleBottomBar,
    AlertButton,
    ArticleItem,
    BlackUserBar,
    FollowUserBar,
    RatingCourseCard,
  }
}
</script>