<template>
  <v-dialog v-model="ifShowDialog"
    style="width: 100%;height:100%;background-color: rgba(255,255,255,0.5);justify-content: center;">
    <div v-if="ifShowReportCard" style="width: 100%;height:100%;justify-content: center;display: flex">
      <report-card :report="{type:'问题回答',id:this.answer.id}" @close="close()"></report-card>
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
          <v-avatar @click="toAuthorPage" :style="{width: '35px',height: '35px'}">
            <img :src="answer.profileUrl" :style="{'max-width':'100%'}" />
          </v-avatar>
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
            <v-col cols="8">
              <v-row justify="end">
                <v-col :style="{'max-width':'25px'}">
                  <v-btn
                    elevation="0"
                    icon="mdi-heart-outline"
                    :style="{'width':'25px',
                        'padding':'0px',
                        'height':'25px',
                        'color':'#8a8a8a',            
                        'margin-top':'0px',
                        'margin-right':'0px',
                        'margin-left':'0px',
                        'margin-bottom':'20px'
                        }">
                    <svg-icon type="mdi" :path="icons.heart"></svg-icon>    
                  </v-btn>
                </v-col>
                <v-col :style="{'max-width':'25px'}">
                  <v-btn
                    elevation="0"
                    icon
                    @click="report"
                    :style="{'width':'25px',
                        'padding':'0px',
                        'height':'25px',
                        'color':'#8a8a8a',            
                        'margin-top':'0px',
                        'margin-right':'0px',
                        'margin-left':'5px',
                        'margin-bottom':'20px'
                        }">
                    <svg-icon type="mdi" :path="icons.alert"></svg-icon>    
                  </v-btn>
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
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAlertCircleOutline, mdiHeartOutline } from '@mdi/js';
import {useRouter} from 'vue-router';
import { ref,computed } from 'vue';
import ReportCard from '@/components/ReportCard.vue';
  export default {
    name: 'ResourceItem',
    props: {
      answer:{
        type:Object,
        default:function(){
          return {
            id: '00000000',
            name: 'visitor',
            time: '2022-09-01 00:00',
            content: '这是回复内容',
            profileUrl: 'https://pic2.zhimg.com/v2-0dda71bc9ced142bf7bb2d6adbebe4f0_r.jpg?source=1940ef5c',
          }
        }
      }
    },
    setup(){
      const router=useRouter();
      const ifShowReportCard=ref(false);
      const ifShowDialog=computed(()=>{
        return ifShowReportCard.value;
      })
      const setAlertCardState=(state)=>{
        ifShowReportCard.value=state;
      }
      return {
        router,
        setAlertCardState,
        ifShowReportCard,
        ifShowDialog,
      }
    },
    data(){
      return{
        icons:{
          heart:mdiHeartOutline,
          alert:mdiAlertCircleOutline,
        }
      }
    },
    components:{
      SvgIcon,
      ReportCard,
    },
    methods:{
      toAuthorPage(){
        this.router.push({name:'AuthorPage',params:{name:this.answer.name}});
      },
      report(){
        this.setAlertCardState(true);
      },
      close(){
        this.setAlertCardState(false);
      }
    }
  }
</script>
<style scoped></style>
