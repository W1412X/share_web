<template>
  <div style="height:100%">
    <div :style="{ 'padding': '0px', 'height': '100%', 'display': 'relative' }">
      <div style="display: flex;flex-direction: row;height: 7%;min-height: 60px;position: relative;">
        <SensitiveTextArea variant="outlined" label="编辑你的回答" color="#9a9a9a" :rows="1" v-model="answerContent"
          :style="{ 'max-width':'700px', 'max-height': '35px', 'font-size': '18px', 'padding-top': '4px' }"></SensitiveTextArea>
        <v-btn size="50" icon @click="publishAnswer" style="margin-left: 5px;margin-top: 5px;" color="rgba(0,0,0,0)">
          <svg-icon size="50" type="mdi" :path="icons.send" color="#9c0c13"></svg-icon>
        </v-btn>
      </div>
      <div style="max-height: 93%;overflow: auto;">
        <Answer v-for="(answer, index) in answerList" :key="index" :init-answer="answer"></Answer>
        <v-btn variant="outlined" style="width:750px;color: #0074e8;" @click="loadMore()">加载更多的回答</v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiSendCircleOutline } from '@mdi/js'
import Answer from './Answer.vue';
import SensitiveTextArea from './SensitiveTextArea.vue';
export default {
  props: {
    questionId: {
      type: String,
      default: null,
    }
  },
  data() {
    const icons = {
      send: mdiSendCircleOutline,
    }
    const answerList = [];
    for (var i = 0; i < 20; i++) {
      answerList.push({
        id: '00000000',
        name: 'visitor',
        time: 'xxxx-xx-xx xx:xx',
        content: 'XXXXXXXX',
        profileUrl: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.PO7d9IfnPUy2RO173QYt6wHaHV?w=216&h=213&c=7&r=0&o=5&pid=1.7',
      })
    }
    console.log(answerList)
    return {
      answerList,
      icons,
      answerContent:'',
    }
  },
  components: {
    Answer,
    SvgIcon,
    SensitiveTextArea,
  },
  methods: {
    publishAnswer() {

    },
    load() {

    },
    loadMore() {

    }
  },
  mounted() {//根据question获取问题列表

  }

}
</script>