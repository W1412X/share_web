<template>
  <v-card
    :style="{ 'width': '1000px', 'max-width': '1000px', 'height': '50px', 'box-shadow': 'none', 'box-radius': '0', 'border-top': '1px solid #8a8a8a', 'border-bottom': '1px solid #8a8a8a', 'position': 'fixed', 'justify-content': 'center', 'bottom': '0' }">
    <v-row :style="{ 'margin-top': '15px' }">
      <div style="display: flex; flex-direction: row;margin-left: 10px;">
        <user-profile :name="userName" :url="profileUrl" :size="25" :style="{ 'margin-top': '0px', 'margin-right': '0px', 'margin-left': '10px', 'font-size': '14px' }"></user-profile>
        <span :style="{ 'margin-top': '0px', 'margin-right': '10px', 'margin-left': '10px', 'font-size': '14px' }">{{ authorName
          }}</span>
      </div>
      <v-spacer></v-spacer>
      <div style="display: flex;flex-direction: row-reverse;margin-right: 40px;">
        <alert-button :id="this.articleId" :type="'article'" style="margin-left: 8px;margin-right: 20px;"></alert-button>
        <svg-icon type="mdi" :path="icons.commentQuestion" @click="this.showComment()" size="25"
          :style="{ 'color': '#8a8a8a','margin-right': '10px' }"></svg-icon>
        <star-button :id="articleId" :type="'article'"
          :style="{'margin-right': '10px', 'margin-bottom': '18px' }"></star-button>
      </div>
    </v-row>
  </v-card>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiCommentQuestionOutline } from '@mdi/js';
import StarButton from './StarButton.vue';
import UserProfile from './UserProfile.vue';
import AlertButton from './AlertButton.vue';
export default {
  props: {
    articleId: {
      type: String,
      default: '00000000',
    },
    profileUrl: {
      type: String,
      default:
        'https://pic2.zhimg.com/v2-0dda71bc9ced142bf7bb2d6adbebe4f0_r.jpg?source=1940ef5c',
    },
    userName: {
      type: String,
      default: 'visitor',
    }
  },
  components: {
    SvgIcon,
    StarButton,
    UserProfile,
    AlertButton,
  },
  setup() {
  },
  data() {
    return {
      icons: {
        commentQuestion: mdiCommentQuestionOutline,
      },
      isMobile:false,
    }
  },
  methods: {
    showComment() {
      this.$emit('get_comment', null); 
    },
  },
  created() {
    this.isMobile = /Mobi|Android/i.test(navigator.userAgent);
  },
}
</script>