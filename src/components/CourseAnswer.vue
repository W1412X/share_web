<template>
    <div
      style="
        width: 750px;
        border-top: #8a8a8a solid 1px;
        display: flex;
        flex-direction: column;
        padding: 10px;
        background-color: #ffffff;
      "
    >
      <div style="display: flex; flex-direction: row">
        <user-profile :size="'35px'" :url="answer.profileUrl" :name="answer.authorName"></user-profile>
        <span
           @click="toAuthorPage"
          style="
            margin-left: 10px;
            display: flex;
            align-items: center;
            color: #000000;
            font-size: 18px;
            font-weight: 600;
          "
          >{{answer.authorName}}</span
        >
      </div>
      <div style="display: flex; align-items: center">
        <!--<span
          style="
            font-size: 15px;
            font-weight: 600;
            color: #8a8a8a;
            margin-top: 4px;
            margin-right: 10px;
          "
          >他的评分:</span
        >-->
        <v-rating
          :model-value="answer.rate"
          size="small"
          density="compact"
          style="margin: 0px; padding: 0px"
          color="#9c0c13"
          :disabled="true"
        ></v-rating>
        <!---<span
          style="
            font-size: 15px;
            font-weight: 600;
            color: #8a8a8a;
            margin-top: 4px;
            margin-left: 10px;
          "
          >{{answer.rate}}</span
        >-->
      </div>
      <div style="font-size: 18px;">
      {{answer.content}}
      </div>
      <div style="display:flex;flex-direction: row;margin-top:5px;color:#8a8a8a">
        <span style="font-size: 16px;">{{answer.time}}</span>
        <v-spacer></v-spacer>
        <like-button :id="this.id" :type="'courseAnswer'" style="margin-right:10px;"></like-button>
        <alert-button :id="this.id" :type="'课程回答'"></alert-button>
      </div>
    </div>
  </template>
  <script>
import LikeButton from './LikeButton.vue';
import AlertButton from './AlertButton.vue';
import UserProfile from './UserProfile.vue';
    export default {
      props: {
        id:{
          type:String,
          default:'00000000',
        }
      },
      components:{
        LikeButton,
        AlertButton,
        UserProfile,
      },
      setup() {
      },
      data() {
        const answer = {
          id: this.id,
          authorName: 'visitor',
          rate: 4,
          content: '这是评论内容',
          time: '2024-09-01 09:00',
          profileUrl:'https://pic2.zhimg.com/v2-0dda71bc9ced142bf7bb2d6adbebe4f0_r.jpg?source=1940ef5c',
        }
        return {
          answer,
        }
      },
      methods: {
      },
    }
  </script>
  