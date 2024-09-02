<template>
  <v-dialog v-model="ifShowDialog"
    style="width: 100%;height:100%;background-color: rgba(255,255,255,0.5);justify-content: center;">
    <div v-if="ifShowCourseAnswerEditor" style="width: 100%;height:100%;justify-content: center;display: flex">
      <course-answer-editor @close="close" :courseId="course.id" :courseName="course.name"></course-answer-editor>
    </div>
    <div v-if="ifShowReportCard" style="width: 100%;height:100%;justify-content: center;display: flex">
      <report-card :report="{type:'课程',id:this.course.id}" @close="close()"></report-card>
    </div>
  </v-dialog>
  <v-card :style="{ 'width': '750px', 'max-width': '750px' }">
    <v-row :style="{ 'margin': '0px', 'padding': '0px' }">
      <div :style="{ 'width': '750px' }">
        <div style="display: flex; flex-direction: row">
          <div
            :style="{ 'max-width':'600px','font-size': '22px', 'font-weight': '600', 'white-space': 'nowrap', 'text-overflow': 'ellipsis', 'overflow': 'hidden', 'margin-left': '10px', 'margin-top': '10px' }">
            {{ course.name }}
          </div>
          <v-spacer></v-spacer>
          <svg-icon @click="report" type="mdi" :path="icons.alert" color="#8a8a8a" style="margin-top:10px;margin-right: 10px"></svg-icon>
        </div>
        <div style="display: flex; flex-direction: row">
          <div
            :style="{'font-size':'18px','color':'#8a8a8a','margin-right':'30px','font-weight':'normal','white-space':'nowrap','text-overflow':'ellipsis','overflow':'hidden','margin-left':'15px','margin-top':'5px'}">
            课程类型: {{ course.type }}
          </div>
          <div
            :style="{'font-size':'18px','color':'#8a8a8a','margin-right':'30px','white-space':'nowrap','font-weight':'normal','text-overflow':'ellipsis','overflow':'hidden','margin-left':'15px','margin-top':'5px'}">
            授课教师: {{ course.teacher }}
          </div>
        </div>
        <div style="display: flex; flex-direction: row">
          <div
            :style="{'font-size':'18px','color':'#8a8a8a','margin-right':'30px','white-space':'nowrap','font-weight':'normal','text-overflow':'ellipsis','overflow':'hidden','margin-left':'15px','margin-top':'5px'}">
            开设校区: {{ course.campus }}
          </div>
          <div
            :style="{'font-size':'18px','color':'#8a8a8a','white-space':'nowrap','font-weight':'normal','text-overflow':'ellipsis','overflow':'hidden','margin-left':'15px','margin-top':'5px'}">
            开设学院: {{ course.college }}
          </div>
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
        <v-btn @click="editAnswer" variant="outlined" color="#9c0c13" style="width: 730px; height: 30px">添加课程评价</v-btn>
      </div>
    </v-row>
  </v-card>
</template>
<script>
import CourseAnswerEditor from '@/components/CourseAnswerEditor.vue';
import {ref,computed} from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAlertCircleOutline } from '@mdi/js';
import ReportCard from './ReportCard.vue';
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
          college:'计算机科学与技术学院',
          campus:'青岛校区',
          rate: {
            averageRate: 3.5,
            rateNum: 100,
            ratePropotion: [10, 20, 20, 30, 20],
          },
        }
      },
    },
  },
  setup(){
    const ifShowCourseAnswerEditor=ref(false);
    const ifShowReportCard=ref(false);
    const ifShowDialog=computed(()=>{//
      return ifShowCourseAnswerEditor.value || ifShowReportCard.value;
    })
    const setCourseAnswerEditorState=(state)=>{
      ifShowCourseAnswerEditor.value=state;
    }
    const setReportCardState=(state)=>{
      ifShowReportCard.value=state;
    }
    return {
      ifShowCourseAnswerEditor,
      ifShowDialog,
      ifShowReportCard,
      setReportCardState,
      setCourseAnswerEditorState,
    }
  },
  components:{
    CourseAnswerEditor,
    SvgIcon,
    ReportCard,
  },
  data() {
    return {
      icons:{
        alert:mdiAlertCircleOutline,
      }
    }
  },
  methods:{
    editAnswer(){
      this.setCourseAnswerEditorState(true);
    },
    close(){
      this.setCourseAnswerEditorState(false);
      this.setReportCardState(false);
    },
    report(){
      this.setReportCardState(true);
    }
  }
}
</script>
