<template>
  <div style="
        width: 750px;
        border-top: #8a8a8a solid 1px;
        display: flex;
        flex-direction: column;
        padding: 10px;
        background-color: #ffffff;
      ">
    <div style="display: flex; flex-direction: row">
      <user-profile :size="'35px'" :url="answer.profileUrl" :name="answer.name"></user-profile>
      <span @click="toAuthorPage" style="
            margin-left: 10px;
            display: flex;
            align-items: center;
            color: #000000;
            font-size: 18px;
            font-weight: 600;
          ">{{ answer.name }}</span>
    </div>
    <div style="font-size: 18px;word-wrap: break-word;">
      {{ answer.content }}
    </div>
    <div style="display:flex;flex-direction: row;margin-top:5px;color:#8a8a8a">
      <span style="font-size: 16px;">{{ answer.time }}</span>
      <v-spacer></v-spacer>
      <like-button :id="this.answer.id" :type="'evaluation'" style="margin-right:10px;"></like-button>
      <alert-button :id="this.answer.id" :type="'evaluation'"></alert-button>
    </div>
  </div>
</template>
<script>
import UserProfile from './UserProfile.vue';
//import SvgIcon from '@jamescoyle/vue-icon'
//import { ref,computed } from 'vue';
import LikeButton from './LikeButton.vue';
import AlertButton from './AlertButton.vue';
import { defineAsyncComponent } from 'vue';
  export default {
    name: 'ResourceItem',
  props: {
    initAnswer: {
      type: Object,
      default:
        function () {
          return {
            id: '00000000',
            name: 'visitor',
            time: 'xxxx-xx-xx xx:xx',
            content: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            profileUrl: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.PO7d9IfnPUy2RO173QYt6wHaHV?w=216&h=213&c=7&r=0&o=5&pid=1.7',
          }
        }
    },
  },
    setup(){
      const AsyncReportCard=defineAsyncComponent(()=>import('@/components/ReportCard.vue'))
      return{
        AsyncReportCard
      }
    },
    data(){
      var answer = this.initAnswer;
      return {
        answer,
      }
    },
    components:{
      //SvgIcon,
      LikeButton,
      UserProfile,
      AlertButton,
    },
    methods:{
      close(){
        this.setAlertCardState(false);
      }
    },
    mounted(){//
    }
  }
</script>
<style scoped></style>
