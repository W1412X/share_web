<template>
  <report-card></report-card>
  <user-message-editor></user-message-editor>
  <user-message-reader></user-message-reader>
  <set-profile-card></set-profile-card>
  <question-editor ref="testRef"></question-editor>
  <message-bar></message-bar>
  <course-answer-editor></course-answer-editor>
  <course-answer></course-answer>
  <course-editor></course-editor>
  <v-btn @click="test()"></v-btn>
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
export default{
  methods:{
    test(){
      console.log(this.$refs.testRef.$data);
    },
  },
  components:{
    ReportCard,
    UserMessageEditor,
    UserMessageReader,
    SetProfileCard,
    QuestionEditor,
    MessageBar,
    CourseAnswerEditor,
    CourseAnswer,
    CourseEditor,
  }
}
</script>