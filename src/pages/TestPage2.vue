<template>
  <report-card></report-card>
  <user-message-editor></user-message-editor>
  <user-message-reader></user-message-reader>
  <set-profile-card></set-profile-card>
  <question-editor ref="testRef"></question-editor>
  <message-bar></message-bar>
  <v-btn @click="test()"></v-btn>
</template>
<script>
import ReportCard from '@/components/ReportCard.vue';
import SetProfileCard from '@/components/SetProfileCard.vue';
import UserMessageEditor from '@/components/UserMessageEditor.vue';
import UserMessageReader from '@/components/UserMessageReader.vue';
import QuestionEditor from '@/components/QuestionEditor.vue'
import MessageBar from '@/components/MessageBar.vue'
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
  }
}
</script>