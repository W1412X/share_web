<template>
    <v-card style="width: 750px">
      <div style="display: flex; padding: 10px; flex-direction: column">
        <div style="display: flex; flex-direction: row">
          <user-profile :url="user.profileUrl" :name="user.userName" style="margin-top: 3px;"></user-profile>
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
      </div>
    </v-card>
  </template>
  <script>
  import { computed } from 'vue';
import UserProfile from './UserProfile.vue';
    export default {
      props: {
        name:{
          type:String,
          default:'visitor',
        }
      },
      components:{
        UserProfile,
      },
      data() {
        const user = {
          userId: '00000000',
          userName: this.name,
          followState: false,
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
  