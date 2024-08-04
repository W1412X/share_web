<template>
  <v-card
    @click="this.select()"
    :style="{'width':'750px','margin':'3px','border-width':border_width,'border-color':border_color,'background-color':backgound_color}"
  >
    <div
      :style="{'font-size':'20px',
        'font-weight':'bold',
        'width':'600px',
        'white-space': 'nowrap',
        'overflow': 'hidden',
        'margin-left':'10px',
        'margin-top':'5px',
        'padding-bottom':'5px',
        'text-overflow': 'ellipsis'}"
    >
      {{question.title}}
    </div>
    <v-row :style="{'padding-left':'20px','color':'#8a8a8a'}">
        <v-avatar
          size="25"
          :style="{'margin-top':'8px','margin-right':'0px','margin-left':'10px','font-size':'14px'}"
        >
          <v-img :src="question.profileUrl"></v-img>
        </v-avatar>
        <span
          :style="{'margin-top':'10px','margin-right':'10px','margin-left':'10px','font-size':'14px'}"
          >{{ question.authorName }}</span
        >
        <v-spacer></v-spacer>
        <div
          :no-gutters="true"
          :style="{'max-width':'100px','margin-top':'10px','margin-left':'15px','margin-right':'0px','padding-left':'0px','padding-right':'0px'}"
        >
          <v-row :style="{'margin-top':'0px','margin-left':'0px','margin-right':'0px'}">
            <svg-icon type="mdi" :path="icons.viewCount" size="18" :style="{'padding-top':'0px','margin-bottom':'0px','margin-left':'5px'}"></svg-icon>
            <span :style="{'margin-left':'5px','font-size':'14px'}">{{ question.scanCount }}</span>
          </v-row>
        </div>
        <div
          :style="{'max-width':'100px','margin-top':'10px','margin-left':'10px','margin-right':'0px','padding-left':'0px','padding-right':'0px'}"
        >
          <v-row :style="{'margin-top':'0px','margin-left':'0px','margin-right':'0px'}">
            <svg-icon type="mdi" :path="icons.heartCount" size="18" :style="{'padding-top':'0px','margin-bottom':'0px','margin-left':'5px'}"></svg-icon>
            <span :style="{'margin-left':'4px','font-size':'14px'}">{{ question.likeCount }}</span>
          </v-row>
        </div>
        <div
          :style="{'max-width':'100px','margin-top':'10px','margin-left':'10px','margin-right':'50px','padding-left':'0px','padding-right':'0px'}"
        >
          <v-row :style="{'margin-top':'0px','margin-left':'0px','margin-right':'0px'}">
            <svg-icon type="mdi" :path="icons.replyCount" size="18" :style="{'padding-top':'0px','margin-bottom':'0px','margin-left':'5px'}"></svg-icon>
            <span :style="{'margin-left':'4px','font-size':'14px'}"> {{ question.replyCount }} </span>
          </v-row>
        </div>
      </v-row>
    <v-row
      :style="{'margin-left':'5px','margin-right':'5px','margin-bottom':'5px','padding-top':'0px'}"
    >
      <v-col
        cols="12"
        :style="{'margin-top':'0px','padding':'0px','margin-left':'0px','margin-right':'0px'}"
      >
        <v-col
          :style="{'padding-left':'px',
            'padding-right':'5px',
            'margin-left':'0px',
            'margin-top':'0px',
            'margin-right':'0px',
            'font-size':'16px',
            'font-color':'#8a8a8a',
            'line-height':'1.3',
            'text-overflow': 'ellipsis',
            'overflow-y': 'hidden',
            'display': '-webkit-box',
            '-webkit-line-clamp': '4',
            '-webkit-box-orient': 'vertical',
          }"
          >{{ question.content }}
        </v-col>
        <div :style="{'display':'flex','flex-direction':'row'}">
          <div
            :no-gutters="true"
            :style="{'margin-top':'0px','margin-left':'15px','margin-right':'10px','padding-left':'0px','padding-right':'0px'}"
          >
            <v-row :style="{'margin-top':'0px'}">
              <svg-icon type="mdi" :path="icons.timeClock" size="18" :style="{'padding-top':'0px','color':'#8a8a8a','margin-bottom':'0px','margin-left':'5px'}"></svg-icon>
              <div :style="{'margin-left':'5px','font-size':'14px','color':'#8a8a8a'}"
              >编辑于 {{ question.time }}</div>
            </v-row>
          </div>
          <v-btn
            elevation="0"
            icon
            :style="{'width':'25px',
              'background-color':'rgb(0,0,0,0)',
              'padding':'0px',
              'height':'25px',
              'color':'#8a8a8a',            
              'margin-top':'0px',
              'margin-left':'450px'
              }">
            <svg-icon type="mdi" :path="icons.heart"></svg-icon>
          </v-btn>
          <v-btn
            elevation="0"
            icon
            :style="{'width':'25px',
              'background-color':'rgb(0,0,0,0)',
              'padding':'0px',
              'height':'25px',
              'margin-top':'0px',
              'color':'#8a8a8a',
              'margin-left':'10px'}">
            <svg-icon type="mdi" :path="icons.alert"></svg-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAlertCircleOutline,mdiClock,mdiEyeOutline,mdiHeart,mdiHeartOutline, mdiMessage, mdiStar } from '@mdi/js';
import { computed } from 'vue';
  export default {
    name: 'QuestionWithoutImage',
    props: {
      question: {
        type: Object,
        default: function () {
          return {
            id: '',
            title: '',
            content: '',
            time:'',
            replyCount: '',
            likeCount: '',
            authorName: '',
            authorId: '',
            scanCount: '',
            profileUrl:'',
          }
        },
      },
      isSelected:{
        type:Boolean,
        default:false,
      }
    },
    components:{
      SvgIcon,
    },
    data(){
      const backgound_color=computed(()=>{
        return  this.isSelected ? '#def2f8' : '';
      })
      const border_color=computed(()=>{
        return this.isSelected ? '#0074e8':'#8a8a8a'
      })
      const border_width=computed(()=>{
        return this.isSelected ? '2px':'1px'
      })
      return{
        icons:{
          alert:mdiAlertCircleOutline,
          heart:mdiHeartOutline,
          timeClock:mdiClock,
          viewCount:mdiEyeOutline,
          starCount:mdiStar,
          replyCount:mdiMessage,
          heartCount:mdiHeart,
        },
        backgound_color,
        border_color,
        border_width,
      }
    },
    methods:{
      select(){//点击按钮时选中次函数
        this.$emit('select_question',this.question.id);
      }
    },
    computed:{
    }
  }
</script>
<style scoped>
</style>