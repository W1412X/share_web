<template>
  <v-dialog v-model="ifShowDialog"
    style="width: 100%;height:100%;background-color: rgba(255,255,255,0.5);justify-content: center;">
    <div v-if="ifShowReportCard" style="width: 100%;height:100%;justify-content: center;display: flex">
      <report-card :report="{type:'文章',id:this.articleId}" @close="close"></report-card>
    </div>
  </v-dialog>
    <v-card
      :style="{'width':'1000px','max-width':'1000px','height':'50px','box-shadow':'none','box-radius':'0','border-top':'1px solid #8a8a8a','border-bottom':'1px solid #8a8a8a','position':'fixed','justify-content':'center','bottom':'0'}"
    >
      <v-row :style="{'margin-top':'0px'}">
        <v-col>
          <v-avatar
            size="25"
            :style="{'margin-top':'0px','margin-right':'0px','margin-left':'10px','font-size':'14px'}"
          >
            <v-img :src="avatarUrl"></v-img>
          </v-avatar>
          <span
            :style="{'margin-top':'0px','margin-right':'10px','margin-left':'10px','font-size':'14px'}"
            >{{ authorName }}</span
          >
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="4" class="text-right" :style="{}">
          <star-button :id="articleId" :type="'article'" :style="{'margin-left':'5px','margin-right':'8px','margin-bottom':'18px'}"></star-button>
          <svg-icon type="mdi" :path="icons.commentQuestion" @click="this.showComment()" size="25" :style="{'color':'#8a8a8a','margin-left':'8px','margin-right':'8px'}"></svg-icon>
          <svg-icon @click="report" type="mdi" :path="icons.alertCircle" size="25" :style="{'color':'#8a8a8a','margin-left':'8px','margin-right':'20px'}"></svg-icon>
        </v-col>
      </v-row>
    </v-card>
  </template>
  
  <script>
    import {ref,computed} from 'vue';
    import SvgIcon from '@jamescoyle/vue-icon';
    import ReportCard from './ReportCard.vue';
    import { mdiStar,mdiAlertCircle,mdiCommentQuestion } from '@mdi/js';
import StarButton from './StarButton.vue';
    export default {
      props: {
        articleId: {
          type: String,
          default: '00000000',
        },
        authorId: {
          type: String,
          default: '00000000',
        },
        avatarUrl: {
          type: String,
          default:
            'https://pic2.zhimg.com/v2-0dda71bc9ced142bf7bb2d6adbebe4f0_r.jpg?source=1940ef5c',
        },
        authorName:{
          type:String,
          default:'游客',
        }
      },
      components:{
        SvgIcon,
        ReportCard,
        StarButton,
      },
      setup(){
        const ifShowReportCard=ref(false);
        const ifShowDialog=computed(()=>{
          return ifShowReportCard.value;
        })
        const setRepordCardState=(state)=>{
          ifShowReportCard.value=state;
        }
        return {
          ifShowDialog,
          ifShowReportCard,
          setRepordCardState
        }
      },
      data(){
        return{
          icons:{
            star:mdiStar,
            alertCircle:mdiAlertCircle,
            commentQuestion:mdiCommentQuestion,
          }
        }
      },
      methods: {
        report(){
          this.setRepordCardState(true);
        },
        showComment(){
          this.$emit('get_comment',null);
        },
        close(){
          this.setRepordCardState(false);
        }
      },
    }
  </script>
  