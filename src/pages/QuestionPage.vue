<template>
  <div style="display: flex;justify-content: center;">
    <div
      style="
        justify-content: center;
        display: flex;
        flex-direction: column;
        height: 100vh;
        flex-direction:column;
        width: 800px;
        background-color: rgba(256, 256, 256, 0.95);
      "
    >
      <div
        :style="{'padding':'0px','margin-left': '20px','display':'relative'}"
      >
        <div>
          <SingleQuestion
            style="margin-bottom: 50px;"
            :question="question"
          ></SingleQuestion>
        </div>
      </div>
      <div
        :style="{'padding':'0px','margin-left': '20px','height':'100%','display':'relative','overflow':'auto'}"
      >
        <AnswerList :question-id="question.id"></AnswerList>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import AnswerList from '../components/AnswerList.vue';
import SingleQuestion from '@/components/SingleQuestion.vue';
import {useRoute} from 'vue-router'
import { getQuestionDetail } from '@/axios/detail';
import { getStatusMessage } from '@/statusCodeMessages';
    export default {
      props:{
        
      },
      setup(){
      },
      data(){
        const question = {
          id:'',
          title: '这是一个测试题?',
          content: '这是问题的描述',
          time: '2022-09-01 00:00',
          replyCount: '99999',
          starCount: '99999',
          authorName: 'visitor',
          scanCount: '99999',
          profileUrl: 'https://pic2.zhimg.com/v2-0dda71bc9ced142bf7bb2d6adbebe4f0_r.jpg?source=1940ef5c'
        }
        return{
          question,
        }
      },
      components: {
        SingleQuestion,
        AnswerList,
      },
      methods:{
      },
      mounted(){
        const route=useRoute();
        this.question.id=route.params.id;
        console.log('Load question page',this.question.id);
        getQuestionDetail(this.question.id)
        .then(response=>{
          console.log(response)
          const status=response.status;
          if (status == 200) {
            this.question.title = response.title;
            this.question.authorName = response.author_name;
            this.question.profileUrl = response.author_profile_url;
            this.question.starCount = response.star_count;
            this.question.scanCount = response.scan_count;
            this.question.replyCount = response.reply_count;
            this.question.content = response.content;
            this.question.time = response.publish_time;
          }else{
            this.$router.push({name:'ErrorPage',params:{reason:getStatusMessage('common',status).content}});
          }
        })
        .catch(error=>{
          console.error(error);
          this.$router.push({name:'ErrorPage',params:{reason:'网络错误'}});
        })
        if('from' in route.params && route.params.from=='message'){
          //逻辑
        }
        
      }
    }
  </script>
  