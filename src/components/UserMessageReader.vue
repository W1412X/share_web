<template>
  <v-card style="width: 750px">
    <div style="display: flex; padding: 10px; flex-direction: column">
      <div style="display: flex; flex-direction: row">
        <v-avatar size="25" :image="user.profileUrl" style="margin-top:3px;"> </v-avatar>
        <div style="font-size: 20px; margin-left: 15px; color: #000000">
          {{ user.userName }}
        </div>
        <v-btn
          variant="outlined"
          :color="this.followButtonColor"
          style="margin-left: 550px;border-radius: 50px 50px 50px 50px;height:30px;"
          @click="this.follow()"
          >{{this.followButtonText}}</v-btn
        >
      </div>
      <div :v-if="ifWithCount==true" style="display: flex;flex-direction: row;padding-top:10px">
        <span style="font-size: 14px;color:#8a8a8a;font-weight: 600;margin-left: 0px;">关注量: {{ user.followCount }}</span>
        <span style="font-size: 14px;color:#8a8a8a;font-weight: 600;margin-left: 10px;">总浏览量: {{ user.scanCount }}</span>
        <span style="font-size: 14px;color:#8a8a8a;font-weight: 600;margin-left: 10px;">总收藏量: {{ user.starCount }}</span>
      </div>
      <div :v-if="ifWithIntroduce==true" style="display: flex; flex-direction: row;">
        <div style="font-size: 16px;margin-top: 10px;color:#8a8a8a;min-width: 45px;font-weight: 600;">简介:</div>
        <div style="font-size: 16px;margin-top: 10px;color:#8a8a8a;">{{ user.introduce }}</div>
      </div>
    </div>
  </v-card>
</template>
<script>
import { computed } from 'vue';
  export default {
    props: {
      name:{
        type:String,
        default:'visitor',
      },
      ifWithIntroduce:{
        type:Boolean,
        dafault:false,
      },
      ifWithCount:{
        type:Boolean,
        dafault:true,
      },
    },
    data() {
      const user = {
        userId: '00000000',
        userName: this.name,
        followState: false,
        introduce: '这是介绍部分',
        starCount: '9999',
        scanCount: '9999',
        followCount: '9999',
        profileUrl:
          'https://tse1-mm.cn.bing.net/th/id/OIP-C.PO7d9IfnPUy2RO173QYt6wHaHV?w=216&h=213&c=7&r=0&o=5&pid=1.7',
      }
      const followState=user.followState;
      const followButtonColor=computed(()=>{
          return this.followState ? "#8a8a8a" : "#9c0c13";
      })
      const followButtonText=computed(()=>{
          return this.followState ? "已关注" : "关注";
      })
      return{
          followButtonColor,
          followButtonText,
          followState,
          user,
      }
    },
    methods: {
      follow() {
        console.log(this.user.userId)
        if(this.followState){//如果已经关注，则取消关注
          //提交如果提交成功，就修改状态
          this.followState=false;
        }else{//关注
          this.followState=true;
        }
      },
    },
  }
</script>
