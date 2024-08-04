<template>
    <div
      :style="{'padding':'0px','height':'100%','display':'relative','overflow':'auto'}"
    >
      <div :style="{'max-height':'100%',padding:'5px'}">
        <Answer v-for="(ans,index) in computedAnswerList" :answer="ans" :key="index"
        ></Answer>
      </div>
    </div>
</template>
<script>
import { computed } from 'vue';
import Answer from './Answer.vue';
export default{
    props:{
        answerList:{
            type:Array,
            default:function(){
                return [
                  {question_id:'00000000',
                    answers:
                    [
                      {
                        id: '00000000',
                        name: '游客',
                        time: '2022-09-01 00:00',
                        content: '这是00000000回复内容',
                        profileUrl: 'https://pic2.zhimg.com/v2-0dda71bc9ced142bf7bb2d6adbebe4f0_r.jpg?source=1940ef5c',
                      },
                      {
                        id: '00000000',
                        name: '游客',
                        time: '2022-09-01 00:00',
                        content: '这是00000000回复内容',
                        profileUrl: 'https://pic2.zhimg.com/v2-0dda71bc9ced142bf7bb2d6adbebe4f0_r.jpg?source=1940ef5c',
                      }
                    ]
                  },
                  {question_id:'00000001',
                    answers:
                    [
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
                  }
                ]
            }
        },
        question_id:{
            type:String,
            default:null,
        }
    },
    data(){
      const computedAnswerList=computed(()=>{
        const item=this.answerList.find(q=>q.question_id==this.question_id);
        if(item){
          return item.answers ? item.answers : [];
        }else{
          return [];
        }
      })
      return{
        computedAnswerList,
      }
    },
    components:{
      Answer,
    }
    
}
</script>