<template>
    <v-dialog v-model="ifShowDialog"
        style="width: 100%;height:100%;justify-content: center;">
        <div v-if="ifShowCourseAnswerEditor" style="width: 100%;height:100%;justify-content: center;display: flex">
            <course-answer-editor @close="close"
                :init-answer="{ courseId: courseId, rate: answer.rate, comment: answer.content }"
                :course-name="courseName"></course-answer-editor>
        </div>
    </v-dialog>
    <v-card style="background-color: rgba(0, 0, 0, 0.05); width: 750px; padding: 0px">
        <div style="
          border-top: #000000 solid 1px;
          display: flex;
          flex-direction: column;
          padding: 15px;
          padding-bottom: 5px;
        ">
            <div style="display: flex; align-items: center">
                <div style="display: flex; flex-direction: row">
                    <span style="
                font-size: 18px;
                font-weight: 600;
                margin-right: 10px;
                margin-top: 2px;
              ">{{ titleText }}</span>
                    <v-rating v-if="initAnswer.id != ''" :model-value="answer.rate" density="compact"
                        style="margin: 0px; padding: 0px" color="#9c0c13" :disabled="true"></v-rating>
                    <v-rating v-if="initAnswer.id == ''" density="compact" style="margin: 0px; padding: 0px" color="#8a8a8a"
                        :disabled="true"></v-rating>
                </div>
            </div>
            <div v-if="initAnswer.id != ''" style="display: flex; flex-direction: row">
                <div style="font-size: 18px">{{ answer.content }}</div>
            </div>
            <div v-if="initAnswer.id != ''" style="display: flex; flex-direction: row-reverse; margin-bottom: 10px">
                <span style="font-size: 16px; color: #8a8a8a; margin-right: 10px">{{ answer.time }}</span>
            </div>
            <v-btn @click="editAnswer" variant="tonal" color="#9c0c13" style="margin-top: 10px">{{ buttonText }}</v-btn>
        </div>
    </v-card>
</template>
<script>
import { computed,ref } from 'vue'
import CourseAnswerEditor from './CourseAnswerEditor.vue';

export default {
    props: {
        courseId: {
            type: String,
            default: "",
        },
        courseName: {
            type: String,
            default: "课程名称",
        },
        initAnswer: {
            id: '',
            rate: 0,
            content: '这是评论内容',
            time: '2024-09-01 09:00',
        }
    },
    components: {
        CourseAnswerEditor,
    },
    setup() {
        const ifShowCourseAnswerEditor = ref(false);
        const ifShowDialog = computed(() => {//
            return ifShowCourseAnswerEditor.value;
        })
        const setCourseAnswerEditorState = (state) => {
            ifShowCourseAnswerEditor.value = state;
        }
        return {
            ifShowCourseAnswerEditor,
            ifShowDialog,
            setCourseAnswerEditorState,
        }
    },
    data() {
        const buttonText = computed(() => {
            return this.initAnswer.id == '' ? '添加评价' : '修改评价'
        })
        const titleText = computed(() => {
            return this.initAnswer.id == '' ? '暂未评价此课程' : '我的评价'
        })
        const answer = this.initAnswer;
        return {
            answer,
            buttonText,
            titleText,
        }
    },
    methods: {
        editAnswer() {
            this.setCourseAnswerEditorState(true);
        },
        close() {
            this.setCourseAnswerEditorState(false);
        },
    },
}
</script>