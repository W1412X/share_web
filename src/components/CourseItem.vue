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
            :style="{'font-size':'18px','color':'#8a8a8a','margin-right':'30px','white-space':'nowrap','font-weight':'normal','text-overflow':'ellipsis','overflow':'hidden','margin-left':'15px','margin-top':'5px'}"
          >
            授课教师: {{ course.teacher }}
          </div>
        </div>
        <div style="display: flex; flex-direction: row">
          <div
            :style="{'font-size':'18px','color':'#8a8a8a','margin-right':'30px','white-space':'nowrap','font-weight':'normal','text-overflow':'ellipsis','overflow':'hidden','margin-left':'15px','margin-top':'5px'}"
          >
            开设校区: {{ course.campus }}
          </div>
          <div
            :style="{'font-size':'18px','color':'#8a8a8a','white-space':'nowrap','font-weight':'normal','text-overflow':'ellipsis','overflow':'hidden','margin-left':'15px','margin-top':'5px'}"
          >
            开设学院: {{ course.college }}
          </div>
        </div>
      </div>
      <div style="display: flex; flex-direction: row">
        <v-rating
          style="margin: 0px"
          :model-value="course.rate"
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
          平均评分 {{ course.rate }}
        </div>
      </div>
    </v-row>
  </v-card>
</template>
<script>
import {useRouter} from 'vue-router';
  export default {
    props: {
      id:{
        type:String,
        default:'00000000',
      }
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
      const course = {
        id: this.id,
        name: '程序思维设计与实践',
        teacher: '蔡晓军',
        type: '必修课 通识选修',
        college: '计算机科学与技术学院',
        campus: '青岛校区',
        rate: 3.5,
      }
      return {
        course,
      }
    },
    methods:{
    }
  }
</script>
