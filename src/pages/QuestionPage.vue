<template>
  <LoadingView v-model="progressMsg"></LoadingView>
  <div style="display: flex;justify-content: center;">
    <div style="
        justify-content: center;
        display: flex;
        flex-direction: column;
        height: 100vh;
        flex-direction:column;
        width: 800px;
        background-color: rgba(256, 256, 256, 0.95);
      ">
      <div :style="{ 'padding': '0px', 'margin-left': '20px', 'display': 'relative' }">
        <v-card style="width: 750px">
          <div style="display: flex; flex-direction: column">
            <v-card-title style="font-weight: bold">{{ question.title }}</v-card-title>
            <div style="
              padding-left: 10px;
              padding-right: 10px;
              display: flex;
              flex-direction: row;">
              <user-profile :name="question.authorName" :url="question.profileUrl"
                style="margin-left: 10px;"></user-profile>
              <span :style="{ 'margin-right': '10px', 'margin-left': '10px', 'font-size': '14px' }">{{
                question.authorName }}</span>
              <v-spacer></v-spacer>
              <div :no-gutters="true"
                :style="{ 'max-width': '100px', 'margin-top': '10px', 'margin-left': '15px', 'margin-right': '0px', 'padding-left': '0px', 'padding-right': '0px' }">
                <v-row :style="{ 'margin-top': '0px', 'margin-left': '0px', 'margin-right': '0px' }">
                  <svg-icon type="mdi" :path="icons.viewCount" size="18"
                    :style="{ 'padding-top': '0px', 'margin-bottom': '0px', 'margin-left': '5px', 'color': '#8a8a8a' }"></svg-icon>
                  <span :style="{ 'margin-left': '5px', 'font-size': '14px', 'color': '#8a8a8a' }">{{ question.scanCount
                    }}</span>
                </v-row>
              </div>
              <div
                :style="{ 'max-width': '100px', 'margin-top': '10px', 'margin-left': '10px', 'margin-right': '0px', 'padding-left': '0px', 'padding-right': '0px' }">
                <v-row :style="{ 'margin-top': '0px', 'margin-left': '0px', 'margin-right': '0px' }">
                  <svg-icon type="mdi" :path="icons.starCount" size="18"
                    :style="{ 'padding-top': '0px', 'margin-bottom': '0px', 'margin-left': '5px', 'color': '#8a8a8a' }"></svg-icon>
                  <span :style="{ 'margin-left': '4px', 'font-size': '14px', 'color': '#8a8a8a' }">{{ question.starCount
                    }}</span>
                </v-row>
              </div>
              <div
                :style="{ 'max-width': '100px', 'margin-top': '10px', 'margin-left': '10px', 'margin-right': '50px', 'padding-left': '0px', 'padding-right': '0px' }">
                <v-row :style="{ 'margin-top': '0px', 'margin-left': '0px', 'margin-right': '0px' }">
                  <svg-icon type="mdi" :path="icons.replyCount" size="18"
                    :style="{ 'padding-top': '0px', 'margin-bottom': '0px', 'margin-left': '5px', 'color': '#8a8a8a' }"></svg-icon>
                  <span :style="{ 'margin-left': '4px', 'font-size': '14px', 'color': '#8a8a8a' }"> {{ question.replyCount
                    }} </span>
                </v-row>
              </div>
            </div>
            <div style="display: flex; flex-direction: row; margin: 10px">
              <div style="font-size: 16px; color: #8a8a8a; font-weight: 600">
                问题内容：
              </div>
              <div style="font-size: 16px; color: #4a4a4a">
                {{ question.content }}
              </div>
            </div>
            <div style="display: flex;flex-direction: row;padding-left:10px;padding-bottom:10px;padding-right:10px;">
              <svg-icon type="mdi" :path="icons.timeClock" size="18"
                :style="{ 'padding-top': '0px', 'color': '#8a8a8a', 'margin-bottom': '0px', 'margin-left': '5px' }"></svg-icon>
              <div :style="{ 'margin-left': '5px', 'font-size': '14px', 'color': '#8a8a8a' }">编辑于 {{ question.time }}
              </div>
              <v-spacer></v-spacer>
            </div>
          </div>
        </v-card>
        <v-btn variant="tonal" style="margin-top: 5px; height: 30px; font-weight: bold; width: 750px"
          color="#9c0c13">关联链接</v-btn>
      </div>
      <div
        :style="{ 'padding': '0px', 'margin-left': '20px', 'height': '100%', 'display': 'relative', 'overflow': 'auto' }">
        <Answer v-for="(answer, index) in answerList" :key="index" :init-answer="answer" @alert="alert"></Answer>
        <v-pagination v-model="answerPage" :length="answerPageNum" :total-visible="5" :size="30"></v-pagination>
      </div>
      <div
        :style="{ 'width': '750px', 'max-width': '750px', 'height': '60px', 'display': 'flex', 'flex-direction': 'row', 'margin-left': '20px', 'border': 'solid 1px #8a8a8a' }">
        <div v-if="ifEditAnswer"
          style="width: 100%;margin-top: 10px;display: flex;flex-direction: row;margin-right: 10px;">
          <SensitiveTextArea variant="outlined" rows="1" density="compact" :model-value="editingAnswer"
            style="margin-left: 5px;width: 80%;padding: 0px;"></SensitiveTextArea>
          <v-btn variant="outlined" color="#9c0c13"
            style="height: 35px;width: 50px;;margin-top: 5px;margin-left: 10px;">发表</v-btn>
          <v-btn @click="() => { this.ifEditAnswer = false; }" variant="outlined" color="#9c0c13"
            style="height: 35px;width:50px;margin-top: 5px;margin-left: 10px;">取消</v-btn>
        </div>
        <div v-if="!ifEditAnswer"
          style="width: 100%;margin-top: 10px;display: flex;flex-direction: row-reverse;margin-right: 10px;">
          <AlertButton :type="'question'" :id="question.id" style="margin-right: 20px;"></AlertButton>
          <StarButton :state="question.starState" :type="'question'" :id="question.id" style="margin-right: 10px;">
          </StarButton>
          <svg-icon @click="() => { this.ifEditAnswer = true; }" type="mdi" :path="icons.replyCount" size="22"
            style="margin-right: 10px;margin-top: 5px;color: #8a8a8a;"></svg-icon>
        </div>
      </div>
    </div>
  </div>
  <v-snackbar :timeout="3000" :color="alertSet.color" v-model="alertSet.state">
    <div class="text-subtitle-1 pb-2">{{ alertSet.title }}</div>
    <p>{{ alertSet.content }}</p>
  </v-snackbar>
</template>

<script>
import { useRoute } from 'vue-router'
import UserProfile from '@/components/UserProfile.vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAlertCircleOutline, mdiClock, mdiEyeOutline, mdiStar, mdiStarOutline, mdiMessage } from '@mdi/js';
import Answer from '@/components/Answer.vue';
import SensitiveTextArea from '@/components/SensitiveTextArea.vue';
import StarButton from '@/components/StarButton.vue';
import AlertButton from '@/components/AlertButton.vue';
export default {
  props: {

  },
  setup() {
  },
  data() {
    const question = {
      id: '',
      title: '这是一个测试题?',
      content: '这是问题的描述',
      time: '2022-09-01 00:00',
      replyCount: '99999',
      starCount: '99999',
      authorName: 'visitor',
      scanCount: '99999',
      profileUrl: 'https://pic2.zhimg.com/v2-0dda71bc9ced142bf7bb2d6adbebe4f0_r.jpg?source=1940ef5c',
      starState: false,
    }
    var answerList = [
      {
        id: '00000000',
        name: 'visitor',
        time: 'xxxx-xx-xx xx:xx',
        content: 'XXXXXXXX',
        profileUrl: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.PO7d9IfnPUy2RO173QYt6wHaHV?w=216&h=213&c=7&r=0&o=5&pid=1.7',
      }
    ]
    return {
      question,
      alertSet: {
        state: false,
        color: 'success',
        title: '',
        content: ''
      },
      answerList,
      answerPage: 1,
      answerPageNum: 10,
      icons: {
        alert: mdiAlertCircleOutline,
        star: mdiStarOutline,
        timeClock: mdiClock,
        viewCount: mdiEyeOutline,
        starCount: mdiStar,
        replyCount: mdiMessage,
      },
      ifEditAnswer: false,
      editingAnswer: '',
      progressMsg: {
        state: false,
        text: '正在加载',
        progress: -1,
      }
    }
  },
  components: {
    UserProfile,
    SvgIcon,
    Answer,
    SensitiveTextArea,
    StarButton,
    AlertButton,
  },
  methods: {
    alert(msg) {
      this.alertSet = msg;
    }
  },
  created() {
    /*this.progressMsg={
            state:true,
            text:'正在加载问题信息',
            progress:-1,
        };*/
    //
    for (var i = 0; i < 10; i++) {
      this.answerList.push(this.answerList[0]);
    }
    //
    const route = useRoute();
    this.question.id = route.params.id;
    console.log('Load question page', this.question.id);
    if ('from' in route.params && route.params.from == 'message') {
      //逻辑
    }

  }
}
</script>