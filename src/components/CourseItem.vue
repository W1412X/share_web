<template>
  <v-card :style="{'width':'750px','max-width':'750px'}" @click="navigateToCourse()">
    <v-row :style="{'margin':'0px','padding':'0px'}">
      <div :style="{'width':'750px'}">
        <div
          :style="{'font-size':'22px','font-weight':'600','white-space':'nowrap','text-overflow':'ellipsis','overflow':'hidden','margin-left':'10px','margin-top':'10px'}"
        >
          {{ course.name }}
        </div>
        <div style="display: flex; flex-direction: row"></div>
        <div style="display: flex; flex-direction: row">
          <div
            :style="{'font-size':'18px','color':'#8a8a8a','margin-right':'30px','font-weight':'normal','white-space':'nowrap','text-overflow':'ellipsis','overflow':'hidden','margin-left':'15px','margin-top':'5px'}"
          >
            课程类型: {{ course.type }}
          </div>
          <div
            :style="{'font-size':'18px','margin-right':'30px','color':'#8a8a8a','white-space':'nowrap','font-weight':'normal','text-overflow':'ellipsis','overflow':'hidden','margin-left':'15px','margin-top':'5px'}"
          >
            上课学期: {{ course.semester }}
          </div>
        </div>
        <div style="display: flex; flex-direction: row">
          <div
            :style="{'font-size':'18px','color':'#8a8a8a','margin-right':'30px','white-space':'nowrap','font-weight':'normal','text-overflow':'ellipsis','overflow':'hidden','margin-left':'15px','margin-top':'5px'}"
          >
            授课教师: {{ course.teacher }}
          </div>
          <div
            :style="{'font-size':'18px','color':'#8a8a8a','margin-right':'30px','white-space':'nowrap','font-weight':'normal','text-overflow':'ellipsis','overflow':'hidden','margin-left':'15px','margin-top':'5px'}"
          >
            教学方式: {{ course.teachMethod }}
          </div>
          <div
            :style="{'font-size':'18px','color':'#8a8a8a','white-space':'nowrap','font-weight':'normal','text-overflow':'ellipsis','overflow':'hidden','margin-left':'15px','margin-top':'5px'}"
          >
            考核方式: {{ course.examineMethod }}
          </div>
        </div>
      </div>
      <div style="display: flex; flex-direction: row">
        <v-rating
          style="margin: 0px"
          :model-value="3"
          color="rgba(156,12,19,0.8)"
          half-increments
        ></v-rating>
        <div
          style="
            font-size: 16px;
            margin-top: 14px;
            margin-left: 15px;
            font-weight: 800;
            color: #8a8a8a;
          "
        >
          平均评分 {{ course.rate.rate }}
        </div>
      </div>
    </v-row>
  </v-card>
</template>
<script>
import {useRouter} from 'vue-router';
  export default {
    props: {
      course: {
        type: Object,
        default: function () {
          return {
            id:'00000000',
            name: '程序思维设计与实践',
            teacher: '蔡晓军',
            type: '必修课 通识选修',
            teachMethod: '线上教学',
            examineMethod: '考试',
            rate: {
              rate: 3.5,
            },
            semester: '大二 上学期',
          }
        },
      },
    },
    setup(){
      const router=useRouter();
      const navigateToCourse=()=>{
        router.push({name:'CoursePage',params:{id:'00000000'}});
      }
      return {
        navigateToCourse,
      }
    },
    data() {
      return {

      }
    },
    methods:{
    }
  }
</script>
