<template>
  <v-card style="width: 750px">
    <div style="display: flex; padding: 10px; flex-direction: column">
      <div style="display: flex; flex-direction: row">
        <user-profile :name="user.userName" :url="user.profileUrl" style="margin-top:3px"></user-profile>
        <div style="font-size: 20px; margin-left: 15px; color: #000000">
          {{ user.userName }}
        </div>
        <v-btn variant="outlined" :color="this.buttonColor" style="
            margin-left: 550px;
            border-radius: 50px 50px 50px 50px;
            height: 30px;
          " @click="this.follow()">{{ this.buttonText }}</v-btn>
      </div>
    </div>
  </v-card>
</template>
<script>
import { computed } from 'vue'
import UserProfile from './UserProfile.vue';
export default {
  props: {
    user: {
      type: Object,
      default: function () {
        return {
          userName: 'test',
          state: false,
          profileUrl:
            'https://tse1-mm.cn.bing.net/th/id/OIP-C.PO7d9IfnPUy2RO173QYt6wHaHV?w=216&h=213&c=7&r=0&o=5&pid=1.7',
        }
      }
    }
  },
  components: {
    UserProfile,
  },
  data() {
    const state = this.user.state
    const buttonColor = computed(() => {
      return this.state ? '#000000' : '#8a8a8a'
    })
    const buttonText = computed(() => {
      return this.state ? '拉黑' : '取消拉黑'
    })
    return {
      buttonColor,
      buttonText,
      state,
    }
  },
  methods: {
    follow() {
      console.log(this.user.userId)
      if (this.state) {
        //如果已经关注，则取消关注
        //提交如果提交成功，就修改状态
        this.state = false
      } else {
        //关注
        this.state = true
      }
    },
  },
}
</script>
