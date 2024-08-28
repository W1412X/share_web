<template>
    <div
      :style="{'padding':'0px','height':'95%','display':'relative'}"
    >
      <div :style="{'max-height':'100%','padding':'5px','overflow':'auto',}">
        <Answer v-for="(ans,index) in answerList" :answer="ans" :key="index"
        ></Answer>
        <v-btn variant="outlined" style="width:100%;color: #0074e8;" @click="loadMore()">加载更多的回答</v-btn>
      </div>
    </div>
    <div v-if="this.answerList.length!=0" style="width: 94%;margin-top: 10px;margin-left: 3%;margin-right: 3%;height: 5%;display: relative;">
        <v-btn variant="outlined" style="width:100%;color: #9c0c13;" @click="answer()">回答此问题</v-btn>
    </div>
</template>
<script>
import Answer from './Answer.vue';
export default{
    props:{
        question_id:{
            type:String,
            default:null,
        }
    },
    data(){
      const answerList=[
        {
          id: '00000000',
          name: '游客',
          time: '2022-09-01 00:00',
          content: '这是00000001回复内容',
          profileUrl: 'https://pic2.zhimg.com/v2-0dda71bc9ced142bf7bb2d6adbebe4f0_r.jpg?source=1940ef5c',
        },
        {
          id: '00000000',
          name: '游客',
          time: '2022-09-01 00:00',
          content: '这是00000001回复内容',
          profileUrl: 'https://pic2.zhimg.com/v2-0dda71bc9ced142bf7bb2d6adbebe4f0_r.jpg?source=1940ef5c',
        },
        {
          id: '00000000',
          name: '游客',
          time: '2022-09-01 00:00',
          content: '这是00000001回复内容',
          profileUrl: 'https://pic2.zhimg.com/v2-0dda71bc9ced142bf7bb2d6adbebe4f0_r.jpg?source=1940ef5c',
        }
      ]
      return{
        answerList,
      }
    },
    components:{
      Answer,
    },
    methods:{
      answer(){
        
      },
      load(){

      },
      loadMore(){

      }
    }
    
}
</script>
