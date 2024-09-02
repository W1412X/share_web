<template>
  <v-dialog v-model="ifShowDialog"
    style="width: 100%;height:100%;background-color: rgba(255,255,255,0.5);justify-content: center;">
    <div v-if="ifShowReportCard" style="width: 100%;height:100%;justify-content: center;display: flex">
      <report-card :report="{type:'课程评价',id:this.answer.id}" @close="close()"></report-card>
    </div>
  </v-dialog>
    <div
      style="
        width: 750px;
        border-top: #8a8a8a solid 1px;
        display: flex;
        flex-direction: column;
        padding: 10px;
        background-color: #ffffff;
      "
    >
      <div style="display: flex; flex-direction: row">
        <v-avatar @click="toAuthorPage" size="35" :image="avatarUrl"></v-avatar>
        <span
           @click="toAuthorPage"
          style="
            margin-left: 10px;
            display: flex;
            align-items: center;
            color: #000000;
            font-size: 18px;
            font-weight: 600;
          "
          >{{answer.authorName}}</span
        >
      </div>
      <div style="display: flex; align-items: center">
        <!--<span
          style="
            font-size: 15px;
            font-weight: 600;
            color: #8a8a8a;
            margin-top: 4px;
            margin-right: 10px;
          "
          >他的评分:</span
        >-->
        <v-rating
          :model-value="answer.rate"
          size="small"
          density="compact"
          style="margin: 0px; padding: 0px"
          color="#9c0c13"
          :disabled="true"
        ></v-rating>
        <!---<span
          style="
            font-size: 15px;
            font-weight: 600;
            color: #8a8a8a;
            margin-top: 4px;
            margin-left: 10px;
          "
          >{{answer.rate}}</span
        >-->
      </div>
      <div style="font-size: 18px;">
      {{answer.content}}
      </div>
      <div style="display:flex;flex-direction: row;margin-top:5px;color:#8a8a8a">
        <span style="font-size: 16px;">{{answer.time}}</span>
        <v-spacer></v-spacer>
        <svg-icon type="mdi" :path="icons.heart" style="margin-right: 10px;"></svg-icon>
        <svg-icon @click="report" type="mdi" :path="icons.alert"></svg-icon>
      </div>
    </div>
  </template>
  <script>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiHeartOutline,mdiAlertCircleOutline} from '@mdi/js'
import { ref,computed } from 'vue';
import {useRouter} from 'vue-router';
import ReportCard from './ReportCard.vue';
    export default {
      props: {
        answer:{
          type:Object,
          default:function(){
            return {
              id:'0000000',
              authorName:'test',
              rate:4,
              content:'这是评论内容',
              time:'2024-09-01 09:00'
            }
          }
        },
      },
      components:{
        SvgIcon,
        ReportCard,
      },
      setup() {
        const router = useRouter();
        const ifShowReportCard=ref(false);
        const ifShowDialog=computed(()=>{
          return ifShowReportCard.value;
        })
        const setReportCardState=(state)=>{
          ifShowReportCard.value=state;
        }
        return {
          router,
          ifShowDialog,
          ifShowReportCard,
          setReportCardState,
        }
      },
      data() {
        const icons={
            heart:mdiHeartOutline,
            alert:mdiAlertCircleOutline,
        }
        const avatarUrl = 'https://pic2.zhimg.com/v2-0dda71bc9ced142bf7bb2d6adbebe4f0_r.jpg?source=1940ef5c'
        return {
          avatarUrl,
          icons,
        }
      },
      methods: {
        toAuthorPage(){
          this.router.push({name:'AuthorPage',params:{name:this.answer.authorName}});
        },
        report(){
          this.setReportCardState(true);
        },
        close(){
          this.setReportCardState(false);
        }
      },
    }
  </script>
  