<template>
  <v-card
    :style="{ 'width': '750px', 'margin': '3px', 'border-width': border_width, 'border-color': border_color, 'background-color': backgound_color }">
    <div style="display: flex;flex-direction: row;margin-top:5px;margin-left: 10px;padding-bottom: 5px;">
      <div @click="click" :style="{
        'font-size': '20px',
        'font-weight': 'bold',
        'width': '500px',
        'white-space': 'nowrap',
        'overflow': 'hidden',
        'max-width': '500px',
        'text-overflow': 'ellipsis'
      }">
        {{ question.title }}
      </div>
      <div style="width: 200px;height: 100%;margin-right:20px;margin-top:5px;display: flex;justify-content: center;align-items: center;">
        <relative-bar v-if="question.relativeUrl!=''" :relative-url="question.relativeUrl"></relative-bar>
      </div>
    </div>
    <v-row :style="{ 'padding-left': '20px', 'color': '#8a8a8a' }">
      <user-profile :url="this.question.profileUrl" :name="question.authorName" style="margin-top: 8px;margin-left: 10px;"></user-profile>
      <span @click="toAuthorPage"
        :style="{ 'margin-top': '10px', 'margin-right': '10px', 'margin-left': '10px', 'font-size': '14px' }">{{
        question.authorName }}</span>
      <v-spacer @click="click"></v-spacer>
      <div :no-gutters="true"
        :style="{ 'max-width': '100px', 'margin-top': '10px', 'margin-left': '15px', 'margin-right': '0px', 'padding-left': '0px', 'padding-right': '0px' }">
        <v-row :style="{ 'margin-top': '0px', 'margin-left': '0px', 'margin-right': '0px' }">
          <svg-icon type="mdi" :path="icons.viewCount" size="18"
            :style="{ 'padding-top': '0px', 'margin-bottom': '0px', 'margin-left': '5px' }"></svg-icon>
          <span :style="{ 'margin-left': '5px', 'font-size': '14px' }">{{ question.scanCount }}</span>
        </v-row>
      </div>
      <div
        :style="{ 'max-width': '100px', 'margin-top': '10px', 'margin-left': '10px', 'margin-right': '0px', 'padding-left': '0px', 'padding-right': '0px' }">
        <v-row :style="{ 'margin-top': '0px', 'margin-left': '0px', 'margin-right': '0px' }">
          <svg-icon type="mdi" :path="icons.starCount" size="18"
            :style="{ 'padding-top': '0px', 'margin-bottom': '0px', 'margin-left': '5px' }"></svg-icon>
          <span :style="{ 'margin-left': '4px', 'font-size': '14px' }">{{ question.starCount }}</span>
        </v-row>
      </div>
      <div
        :style="{ 'max-width': '100px', 'margin-top': '10px', 'margin-left': '10px', 'margin-right': '50px', 'padding-left': '0px', 'padding-right': '0px' }">
        <v-row :style="{ 'margin-top': '0px', 'margin-left': '0px', 'margin-right': '0px' }">
          <svg-icon type="mdi" :path="icons.replyCount" size="18"
            :style="{ 'padding-top': '0px', 'margin-bottom': '0px', 'margin-left': '5px' }"></svg-icon>
          <span :style="{ 'margin-left': '4px', 'font-size': '14px' }"> {{ question.replyCount }} </span>
        </v-row>
      </div>
    </v-row>
    <v-row :style="{ 'margin-left': '5px', 'margin-right': '5px', 'margin-bottom': '5px', 'padding-top': '0px' }">
      <v-col cols="12" :style="{ 'margin-top': '0px', 'padding': '0px', 'margin-left': '0px', 'margin-right': '0px' }">
        <v-col @click="click" :style="{
          'padding-left': 'px',
          'padding-right': '5px',
          'margin-left': '0px',
          'margin-top': '0px',
          'margin-right': '0px',
          'font-size': '16px',
          'font-color': '#8a8a8a',
          'line-height': '1.3',
          'text-overflow': 'ellipsis',
          'overflow-y': 'hidden',
          'display': '-webkit-box',
          '-webkit-line-clamp': '4',
          '-webkit-box-orient': 'vertical',
        }">{{ question.content }}
        </v-col>
        <div :style="{ 'display': 'flex', 'flex-direction': 'row' }">
          <div :no-gutters="true"
            :style="{ 'margin-top': '0px', 'margin-left': '15px', 'margin-right': '10px', 'padding-left': '0px', 'padding-right': '0px' }">
            <v-row @click="click" :style="{ 'margin-top': '0px' }">
              <svg-icon type="mdi" :path="icons.timeClock" size="18"
                :style="{ 'padding-top': '0px', 'color': '#8a8a8a', 'margin-bottom': '0px', 'margin-left': '5px' }"></svg-icon>
              <div :style="{ 'margin-left': '5px', 'font-size': '14px', 'color': '#8a8a8a' }">编辑于 {{ question.time }}
              </div>
            </v-row>
          </div>
          <v-spacer @click="click"></v-spacer>
          <star-button :id="this.id" :type="'question'" v-if="status == 'reader'" elevation="0" icon
            :style="{}"></star-button>
          <alert-button v-if="status=='reader'" :id="question.id" :type="'问题'" style="margin-left: 10px;"></alert-button>
          <v-btn v-if="status == 'writer'" elevation="0" icon :style="{
            'width': '25px',
            'background-color': 'rgb(0,0,0,0)',
            'padding': '0px',
            'height': '25px',
            'margin-top': '0px',
            'margin-left': '500px',
            'color': '#8a8a8a'
          }">
            <svg-icon type="mdi" :path="icons.delete"></svg-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAlertCircleOutline, mdiClock, mdiEyeOutline, mdiStar, mdiStarOutline, mdiTrashCanOutline, mdiMessage } from '@mdi/js';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import StarButton from './StarButton.vue';
import RelativeBar from './RelativeBar.vue';
import UserProfile from './UserProfile.vue';
import AlertButton from './AlertButton.vue';
export default {
  name: 'QuestionWithoutImage',
  props: {
    status: {
      type: String,
      default: 'reader',
    },
    id: {
      type: String,
      default: '',
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
    type:{
      type:String,
      default:'question',
    }
  },
  components: {
    SvgIcon,
    StarButton,
    RelativeBar,
    UserProfile,
    AlertButton,
  },
  setup() {
    const router = useRouter();
    return {
      router,
    }
  },
  data() {
    const question = {
      id: this.id,
      title: '这是问题',
      content: '这是内容',
      time: 'xxxx-xx-xx xx:xx',
      replyCount: 'xxxxx',
      starCount: 'xxxx',
      authorName: 'visitor',
      authorId: 'xxxx',
      scanCount: 'xxxx',
      profileUrl: 'xxxx',
      relativeUrl:'xxxx',
    };
    const backgound_color = computed(() => {
      return this.isSelected ? '#def2f8' : '';
    })
    const border_color = computed(() => {
      return this.isSelected ? '#0074e8' : '#8a8a8a'
    })
    const border_width = computed(() => {
      return this.isSelected ? '2px' : '1px'
    })
    return {
      icons: {
        alert: mdiAlertCircleOutline,
        star: mdiStarOutline,
        timeClock: mdiClock,
        viewCount: mdiEyeOutline,
        starCount: mdiStar,
        replyCount: mdiMessage,
        delete: mdiTrashCanOutline,
      },
      backgound_color,
      border_color,
      border_width,
      question,
      isMobile:false,
    }
  },
  methods: {
    toQuestion() {
      this.router.push({ name: 'QuestionPage', params: { id: '00000000' } });
    },
    select(){//点击按钮时选中次函数
      this.$emit('select_question',this.question.id);
    },
    click(){
      if(this.type=='question' || this.isMobile){
        this.toQuestion();
      }else{
        this.select();
      }
    },
  },
  computed: {
  },
  created(){
      this.isMobile = /Mobi|Android/i.test(navigator.userAgent);
  },
}
</script>