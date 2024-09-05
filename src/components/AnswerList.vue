<template>
    <div
      :style="{'padding':'0px','height':'95%','display':'relative'}"
    >
      <div :style="{'max-height':'100%','padding':'5px','overflow':'auto',}">
        <Answer v-for="(answerId,index) in answerList" :id="answerId" :key="index"
        ></Answer>
        <v-btn variant="outlined" style="width:750px;color: #0074e8;" @click="loadMore()">加载更多的回答</v-btn>
      </div>
    </div>
    <div v-if="this.answerList.length!=0" style="display:flex;justify-content: center;width: 94%;margin-top: 10px;margin-left: 3%;margin-right: 3%;height: 5%;max-height: 40px;display: relative;">
        <div style="display: flex;flex-direction: row;">
          <textarea variant="outlined" label="编辑你的回答" color="#9a9a9a" style="width: 95%;max-height:35px;font-size:18px;padding-top:4px;border:#8a8a8a solid 1px;" v-model="editingAnswerContent"></textarea>
          <v-btn size="35" icon @click="publishAnswer" style="margin-left: 5px;" color="rgba(0,0,0,0)" >
              <svg-icon size="35" type="mdi" :path="icons.send" color="#9c0c13"></svg-icon>
            </v-btn>
        </div>
    </div>
</template>
<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiSendCircleOutline } from '@mdi/js'
import Answer from './Answer.vue';
export default{
    props:{
        questionId:{
            type:String,
            default:null,
        }
    },
    data(){
      const icons={
        send:mdiSendCircleOutline,
      }
      const editingAnswerContent='';
      const answerList=[
        '00000000',
        '00000001',
        '00000002',
        '00000003',
        '00000000',
        '00000001',
        '00000002',
        '00000003',
      ];
      return{
        answerList,
        editingAnswerContent,
        icons,
      }
    },
    components:{
      Answer,
      SvgIcon,
    },
    methods:{
      publishAnswer(){
        
      },
      load(){

      },
      loadMore(){

      }
    }
    
}
</script>
