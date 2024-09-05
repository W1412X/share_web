<template>
  <v-dialog v-model="ifShowDialog"
    style="width: 100%;height:100%;background-color: rgba(255,255,255,0.5);justify-content: center;">
    <div v-if="ifShowReportCard" style="width: 100%;height:100%;justify-content: center;display: flex">
      <report-card :report="{type:'问题回答',id:this.id}" @close="close()"></report-card>
    </div>
  </v-dialog>
  <v-card
    :style="{'width':'750px','box-shadow':'none','box-radius':'0','border':'1px solid #8a8a8a'}"
    outline
    tile
  >
    <v-container :style="{'margin-bottom':'4px'}">
      <v-row>
        <v-col cols="1">
          <user-profile :name="answer.name" :url="answer.profileUrl" :size="35" :style="{width: '35px',height: '35px'}"></user-profile>
        </v-col>
        <v-col cols="11">
          <span @click="toAuthorPage" :style="{'color':'#8a8a8a','margin-left':'0px','font-size':'18px'}"
            >{{ answer.name }}
        </span>
          <br />
          <span :style="{'margin-left':'5px'}">{{ answer.content }}</span>
          <br />
          <v-row :style="{width: '100%',height: '30px'}">
            <v-col cols="4" :style="{'font-size':'14px','color':'#8a8a8a'}">
              {{answer.time}}
            </v-col>
            <v-col cols="8" style="margin-bottom: 5px;">
              <v-row justify="end">
                <v-col :style="{'max-width':'25px'}">
                  <like-button
                    :id="this.id"
                    :type="'answer'"
                  ></like-button>  
                </v-col>
                <v-col :style="{'max-width':'25px'}">
                  <alert-button :id="this.answer.id" :type="'问题回答'" style="margin-left: 10px;"></alert-button>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import UserProfile from './UserProfile.vue';
//import SvgIcon from '@jamescoyle/vue-icon'
//import { ref,computed } from 'vue';
import ReportCard from '@/components/ReportCard.vue';
import LikeButton from './LikeButton.vue';
import AlertButton from './AlertButton.vue';
  export default {
    name: 'ResourceItem',
  props: {
    id: {
      type: String,
      default: '',
    },
    initAnswer: {
      type: Object,
      default:
        function () {
          return {
            id: '00000000',
            name: 'visitor',
            time: 'xxxx-xx-xx xx:xx',
            content: 'XXXXXXXX',
            profileUrl: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.PO7d9IfnPUy2RO173QYt6wHaHV?w=216&h=213&c=7&r=0&o=5&pid=1.7',
          }
        }
    },
  },
    setup(){
    },
    data(){
      var answer = {
        id: this.id,
        name: 'xxx',
        time: 'xxxx-xx-xx xx:xx',
        content: 'XXXXXXXX',
        profileUrl: 'xxx',
      }
      if(this.id==''){//如果id为空，传入的为answer结构体，无需再次请求
        answer=this.initAnswer;
      }
      return{
        answer,
      }
    },
    components:{
      //SvgIcon,
      ReportCard,
      LikeButton,
      UserProfile,
      AlertButton,
    },
    methods:{
      report(){
        this.setAlertCardState(true);
      },
      close(){
        this.setAlertCardState(false);
      }
    },
    mounted(){
      if(this.id!=''){//传入的id不为空，请求内容

      }
    }
  }
</script>
<style scoped></style>
