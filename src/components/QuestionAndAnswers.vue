<template>
  <v-dialog v-model="ifShowDialog" style="width: 100%;height:100%;display: flex;justify-content: center;z-index:3;">
    <div v-if="ifShowQuestionEditor" style="display: flex;justify-content: center;">
      <QuestionEditor @close="close"></QuestionEditor>
    </div>
  </v-dialog>
  <div style="
      z-index: 2;
      min-width: 750px;
      display: flex;
      height: 100vh;
      flex-direction: row;
      background-color: rgba(0, 0, 0, 0);
    ">
    <div
      style="height: 100%;display: flex;justify-content: center;align-items: center;background-color: rgba(255,255,255,0);">
      <v-btn @click="closeComment" icon size="30" style="background-color: rgba(255,255,255,0);">
        <svg-icon type="mdi" color="#8a8a8a" :path="icons.closeQuestion"></svg-icon>
      </v-btn>
    </div>
    <div :style="{ 'padding': '0px', 'height': '100%', 'background-color': 'rgba(255,255,255,1)', 'min-width': '750px' }">
      <div v-if="!isMobile" :style="{ 'height': '94%', 'display': 'flow', 'overflow': 'auto' }">
        <Answer v-for="(answer, index) in answerList" :key="index" @alert="alert" :init-answer="answer"></Answer>
        <v-pagination v-model="answerPage" :length="answerPageNum" :total-visible="5" :size="30"></v-pagination>
      </div>
      <div style="display: flex;flex-direction: row;height: 6%;min-width: 700px;margin-left: 10px;margin-right: 10px;margin-top:1%;">
        <SensitiveTextArea variant="outlined" rows="1" density="compact" :model-value="editingAnswer" style="width: 80%;padding: 0px;"></SensitiveTextArea>
        <v-btn variant="outlined" color="#9c0c13" style="height: 35px;margin-top: 5px;margin-left: 10px;">发表</v-btn>
      </div>
    </div>
    <div :style="{ 'padding': '0px', 'height': '100%', 'background-color': 'rgba(255,255,255,1)', 'min-width': '750px' }">
      <div :style="{ 'height': '95%', 'display': 'flow', 'overflow': 'auto' }">
        <SingleQuestion v-for="(question, index) in questionList" :key="index" :question="question" :type="'article'"
          :isSelected="question.id == selectedQuestionId" @select_question="selectQuestion"></SingleQuestion>
        <v-pagination v-model="questionPage" :length="questionPageNum" :total-visible="5" :size="30"></v-pagination>
      </div>
      <v-btn @click="publishQuestion"
        style="height: 4%;min-width: 700px;margin-left: 25px;margin-right: 25px;margin-top:1%;font-weight:bold;"
        variant="outlined" color="#9c0c13">＋</v-btn>
    </div>
  </div>
</template>

<script>
import { getPostList } from '@/axios/post';
import { computed, ref } from 'vue';
import QuestionEditor from './QuestionEditor.vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChevronDoubleRight } from '@mdi/js';
import SingleQuestion from './SingleQuestion.vue';
import Answer from './Answer.vue';
import SensitiveTextArea from './SensitiveTextArea.vue';
export default {
  props: {
    id: {
      type: String,
      default: '00000000',
    },
    type: {
      type: String,
      default: 'article',
    },
  },
  setup() {
    const ifShowQuestionEditor = ref(false);
    const ifShowDialog = computed(() => {
      return ifShowQuestionEditor.value;
    })
    const setQuestionEditorState = (state) => {
      ifShowQuestionEditor.value = state;
    }
    return {
      setQuestionEditorState,
      ifShowDialog,
      ifShowQuestionEditor,
    }
  },
  data() {
    const selectedQuestionId = null;
    const questionList = [//问题列表
      {
        id: '00000000',
        title: '这是问题',
        content: '这是内容',
        time: 'xxxx-xx-xx xx:xx',
        replyCount: 'xxxxx',
        starCount: 'xxxx',
        authorName: 'visitor',
        authorId: 'xxxx',
        scanCount: 'xxxx',
        profileUrl: 'xxxx',
        relativeUrl: 'xxxx',
      }
    ];
    const answerList = [
      {
        id: '00000000',
        name: 'visitor',
        time: 'xxxx-xx-xx xx:xx',
        content: 'XXXXXXXX',
        profileUrl: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.PO7d9IfnPUy2RO173QYt6wHaHV?w=216&h=213&c=7&r=0&o=5&pid=1.7',
      }
    ]
    const gotPageNum = 1;
    return {
      icons: {
        closeQuestion: mdiChevronDoubleRight,
      },
      questionList,
      answerList,
      selectedQuestionId,
      gotPageNum,
      isMobile: false,
      answerPage: 1,
      questionPage: 1,
      answerPageNum: 10,
      questionPageNum: 10,
      editingAnswer:'',
    }
  },
  components: {
    SingleQuestion,
    Answer,
    QuestionEditor,
    SvgIcon,
    SensitiveTextArea,
  },
  methods: {
    closeComment() {
      this.$emit('close_comment');
    },
    selectQuestion(id) {
      if (this.selectedQuestionId == id) {
        this.selectedQuestionId = null;
      } else {
        this.selectedQuestionId = id;
      }
    },
    publishQuestion() {
      this.setQuestionEditorState(true);
    },
    close() {
      this.setQuestionEditorState(false);
    },
    alert(msg) {
      this.$emit('alert', msg);
    }
  },
  mounted() {
    //
    for (var i = 0; i < 10; i++) {
      this.answerList.push(this.answerList[0]);
      this.questionList.push(this.questionList[0]);
    }
    //
    getPostList(this.type == 'article' ? 0 : 1, Number(this.id), this.gotPageNum, 20)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error('error', error);
        const alertSet = {
          state: true,
          color: 'error',
          title: '未知错误',
          content: '可能是网络错误，检查网络状态后若仍无法运行，请联系开发者'
        }
        this.$emit('alert', alertSet)
      })
  },
  created() {
    this.isMobile = /Mobi|Android/i.test(navigator.userAgent);
  },
  expose() {
    const dialogState = computed(() => {
      return this.ifShowDialog;
    })
    return {
      dialogState
    }
  }
}
</script>
