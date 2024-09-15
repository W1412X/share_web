<template>
  <v-card :style="{ 'width': '750px', 'max-width': '750px' }">
    <v-row :style="{ 'margin': '0px', 'padding': '0px' }">
      <div :style="{ 'width': '750px' }">
        <div style="display: flex; flex-direction: row">
          <div
            :style="{ 'max-width':'600px','font-size': '22px', 'font-weight': '600', 'white-space': 'nowrap', 'text-overflow': 'ellipsis', 'overflow': 'hidden', 'margin-left': '10px', 'margin-top': '10px' }">
            {{ course.name }}
          </div>
          <v-spacer></v-spacer>
          <div style="display: flex;flex-direction: row;margin-top: 10px;margin-right: 10px;">
            <star-button :id="course.id" :type="'course'" style="margin-right: 5px;"></star-button>
            <alert-button :id="course.id" :type="'course'"></alert-button>
          </div>
        </div>
        <div style="display: flex; flex-direction: row">
          <div
            :style="{'font-size':'18px','color':'#8a8a8a','margin-right':'30px','font-weight':'normal','white-space':'nowrap','text-overflow':'ellipsis','overflow':'hidden','margin-left':'15px','margin-top':'5px'}"
          >
            课程类型: {{ course.type }}
          </div>
          <div
            :style="{'font-size':'18px','color':'#8a8a8a','margin-right':'30px','white-space':'nowrap','font-weight':'normal','text-overflow':'ellipsis','overflow':'hidden','margin-left':'15px','margin-top':'5px'}"
          >
            授课教师: {{ course.teacher }}
          </div>
          <div
            :style="{'font-size':'18px','color':'#8a8a8a','margin-right':'30px','white-space':'nowrap','font-weight':'normal','text-overflow':'ellipsis','overflow':'hidden','margin-left':'15px','margin-top':'5px'}"
          >
            教学方式: {{ course.teacheMethod }}
          </div>
        </div>
        <div style="display: flex; flex-direction: row">
          <div
            :style="{'font-size':'18px','color':'#8a8a8a','margin-right':'30px','white-space':'nowrap','font-weight':'normal','text-overflow':'ellipsis','overflow':'hidden','margin-left':'15px','margin-top':'5px'}"
          >
            开设校区: {{ course.campus }}
          </div>
          <div
            :style="{'font-size':'18px','color':'#8a8a8a','white-space':'nowrap','font-weight':'normal','text-overflow':'ellipsis','overflow':'hidden','margin-left':'15px','margin-right':'15px','margin-top':'5px'}"
          >
            开设学院: {{ course.college }}
          </div>
          <div
            :style="{'font-size':'18px','color':'#8a8a8a','margin-right':'30px','white-space':'nowrap','font-weight':'normal','text-overflow':'ellipsis','overflow':'hidden','margin-left':'15px','margin-top':'5px'}"
          >
            考核方式: {{ course.examineMethod }}
          </div>
        </div>
        <div style="width: 100%;display: flex;flex-direction: row-reverse;margin-top:5px">
          <span style="font-size:16px;color:#8a8a8a;margin-right: 10px;">{{ course.updateTime }}
            <v-tooltip  style="margin-left: 2px;margin-bottom: 8px;" activator="parent" location="top">课程信息更新时间</v-tooltip>
          </span>
          <svg-icon type="mdi" :path="icons.timeClock" style="margin-right: 5px;max-width: 25px;max-height: 25px;" color="#8a8a8a"></svg-icon>
        </div>
      </div>
      <div style="width: 100%">
        <div style="
            background-color: rgba(156, 12, 19, 0.1);
            display: flex;
            flex-direction: row;
            padding: 10px;
            border-radius: 10px;
            margin: 10px;
          ">
          <div class="d-flex align-center flex-column my-auto">
            <div class="text-h3 mt-5">
              3.5
              <span class="text-h6 ml-n3">/5</span>
            </div>
            <v-rating :model-value="3.5" color="#9c0c13" :disabled="true" half-increments></v-rating>
            <div class="px-3">{{ course.rate.rateNum }} 个评分</div>
          </div>
          <v-list style="width: 400px" bg-color="transparent" class="d-flex flex-column-reverse" density="compact">
            <v-list-item v-for="(rating, i) in course.rate.ratePropotion" :key="i">
              <v-progress-linear :max="100" :model-value="100 * rating / course.rate.rateNum" class="mx-n5"
                color="#9c0c13" height="10" rounded></v-progress-linear>
              <template v-slot:prepend>
                <span>{{ i + 1 }}</span>
                <v-icon class="mx-3" icon="mdi-star" color="#9c0c13"></v-icon>
              </template>
              <template v-slot:append>
                <div style="width: 20px; max-width: 20px">
                  <span class="d-flex justify-end"> {{ rating }} </span>
                </div>
              </template>
            </v-list-item>
          </v-list>
        </div>
      </div>
      <div style="
          width: 100%;
          display: flex;
          flex-direction: row-reverse;
          padding-left: 10px;
          padding-right: 10px;
          padding-bottom: 5px;
        ">
        <self-course-answer :id="selfAnswer.id" :course-id="course.id" :course-name="course.name" :init-answer="{id:this.selfAnswer.id,rate:this.selfAnswer.rate,content:this.selfAnswer.comment,time:this.selfAnswer.time}"></self-course-answer>
      </div>
    </v-row>
  </v-card>
</template>
<script>
import StarButton from './StarButton.vue';
import AlertButton from './AlertButton.vue';
  import SvgIcon from '@jamescoyle/vue-icon';
import { mdiClock } from '@mdi/js';
import SelfCourseAnswer from './SelfCourseAnswer.vue';
export default {
  props: {
    ifRated:{
      type:Boolean,
      default:false,
    },
    course:{
      type:Object,
      default:function(){
        return {
          id: '00000000',
          name: '程序思维设计与实践',
          teacher: '蔡晓军',
          type: '通识选修,人文社科',
          college: '计算机科学与技术学院',
          campus: '青岛校区',
          examineMethod: '项目展示',
          teacheMethod: '线上',
          updateTime:'xxxx-xx-xx xx:xx',
          rate: {
            averageRate: 3.5,
            rateNum: 100,
            ratePropotion: [10, 20, 20, 30, 20],//从1->5
          },
        }
      }
    }
  },
  setup(){

  },
  components:{
    StarButton,
    AlertButton,
    SvgIcon,
    SelfCourseAnswer,
  },
  data() {
    const selfAnswer={//获取自己的回答状态
      id:'',
      rate:3,
      comment:'sssssss',
      time:'sss',
    }
    return {
      icons:{
        timeClock:mdiClock,
      },
      selfAnswer,
    }
  },
  methods:{
  },
  mounted(){//需要同时加载自己的回答状态到selfAnswer中
    if(this.id==''){////如果没有id，传入initCourse
      
    }else{//否则组件请求
      console.log(this.id);
    }
  }
}
</script>
