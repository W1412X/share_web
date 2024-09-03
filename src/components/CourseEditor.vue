<template>
    <v-card style="width: 750px; padding: 10px">
      <div style="display: flex; flex-direction: column">
        <div style="display: flex; flex-direction: row">
          <span style="font-size: 18px; font-weight: 600"> 编辑新课程 </span>
        </div>
        <div style="display: flex; flex-direction: row; margin-top: 10px">
          <v-textarea
            label="课程名称"
            variant="outlined"
            density="compact"
            rows="1"
            max-rows="1"
            style="margin: 2px"
            v-model="course.name"
          ></v-textarea>
        </div>
        <div style="display: flex; flex-direction: row; margin-top: 0px">
          <v-textarea
            label="授课教师"
            variant="outlined"
            density="compact"
            rows="1"
            max-rows="1"
            max-width="300px"
            v-model="course.teacher"
            style="margin: 2px"
          ></v-textarea>
          <v-combobox
            variant="outlined"
            density="compact"
            style="max-width: 300px; margin-left: 20px"
            v-model="course.type"
            :items="types"
            label="课程类型"
            multiple
            chips
          ></v-combobox>
        </div>
        <div style="display: flex; flex-direction: row; margin-top: 0px">
          <v-combobox
            variant="outlined"
            density="compact"
            style="max-width: 300px"
            v-model="course.college"
            :items="colleges"
            label="开设学院"
          ></v-combobox>
          <v-combobox
            variant="outlined"
            density="compact"
            style="max-width: 300px; margin-left: 20px"
            v-model="course.campu"
            :items="campus"
            label="开设校区"
          ></v-combobox>
        </div>
        <div style="display: flex; flex-direction: row-reverse; margin-top: 0px">
          <v-btn
            @click="submit"
            variant="outlined"
            style="height: 30px; margin-left: 20px"
            color="#9c0c13"
            >提交</v-btn
          >
          <v-btn
            @click="cancel"
            variant="outlined"
            style="height: 30px; margin-left: 20px"
            color="#9c0c13"
            >取消</v-btn
          >
        </div>
      </div>
    </v-card>
  </template>
  
  <script>
    export default {
      props:{
        id:{
          type:String,
          default:'00000000',
        }
      },
      data() {
        const colleges = [
          '计算机科学与技术学院',
          '智能学院',
          '法学院',
          '物理学院',
          '网络安全学院',
        ]
        const campus = [
          '青岛校区',
          '威海校区',
          '中心校区',
          '软件园校区',
          '兴隆山校区',
          '洪家楼校区',
          '千佛山校区',
          '洪家楼校区',
        ]
        const types = [
          '必修课',
          '限选课',
          '全校通选课',
          '通识核心课',
          '国学修养',
          '创新创业',
          '艺术审美',
          '人文学科',
          '自然科学',
          '社会科学',
          '工程技术',
        ]
        return {
          course: {
            name: '',
            teacher: '',
            college: '',
            campu: '',
            type: [],
          },
          colleges,
          campus,
          types,
        }
      },
      methods: {
        cancel() {
          this.$emit('close')
        },
        submit() {
          console.log(this.course)
        },
      },
    }
  </script>
  