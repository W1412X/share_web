<template>
  <v-dialog v-model="ifShowDialog"
    style="width: 100%;height:100%;justify-content: center;z-index:10000;">
    <div v-if="ifShowEmailExmineCode" style="width: 100%;height:100%;justify-content: center;display: flex">
      <email-exmine-card :email="emailCardMessage.email" :new-passwd="this.userMessage.passwd"
        :user-name="this.userMessage.userName" :type="this.cardType" @alert="alert" @close="close"
        @submit="submitExamineState"></email-exmine-card>
    </div>
    <div v-if="ifShowSetProfileCard" style="width: 100%;height:100%;justify-content: center;display: flex">
      <set-profile-card :user-name="this.userMessage.userName" @close="close" @alert="alert"></set-profile-card>
    </div>
  </v-dialog>
  <v-card style="padding: 10px; width: 700px">
    <div style="display: flex; flex-direction: row">
      <div style="
          width: 400px;
          margin: 10px;
          display: flex;
          flex-direction: column;
        ">
        <div style="display: flex; flex-direction: row; margin: 10px">
          <div style="
              font-size: 16px;
              width: 75px;
              color: #8a8a8a;
              font-weight: 600;
              margin-top: 8px;
            ">
            头像:
          </div>
          <v-avatar :image="userMessage.profileUrl" style="margin-right: 20px"></v-avatar>
        </div>
        <div style="display: flex; flex-direction: row; margin: 10px">
          <div style="
              font-size: 16px;
              width: 75px;
              color: #8a8a8a;
              font-weight: 600;
              margin-top: 8px;
            ">
            用户名:
          </div>
          <sensitive-text-area v-model="this.userMessage.userName" :disabled="!ifAbleEditUserName" density="compact"
            row-height="15" rows="1" label="用户名" variant="outlined" auto-grow style="margin-right: 20px"></sensitive-text-area>
        </div>
        <div style="display: flex; flex-direction: row; margin: 10px">
          <div style="
              font-size: 16px;
              width: 75px;
              color: #8a8a8a;
              font-weight: 600;
              margin-top: 8px;
            ">
            邮箱:
          </div>
          <sensitive-text-area v-model="this.userMessage.email" :disabled="!ifAbleEditEmail" label="邮箱" density="compact"
            row-height="15" rows="1" variant="outlined" auto-grow style="margin-right: 20px"></sensitive-text-area>
        </div>
        <div style="display: flex; flex-direction: row; margin: 10px">
          <div style="
              font-size: 16px;
              width: 75px;
              color: #8a8a8a;
              font-weight: 600;
              margin-top: 8px;
            ">
            密码:
          </div>
          <sensitive-text-area v-model="this.userMessage.passwd" :disabled="!ifAbleEditPasswd" label="密码" density="compact"
            row-height="15" rows="1" variant="outlined" auto-grow style="margin-right: 20px"></sensitive-text-area>
        </div>
        <div style="display: flex; flex-direction: row; margin: 10px">
          <div style="
              font-size: 16px;
              width: 75px;
              color: #8a8a8a;
              font-weight: 600;
              margin-top: 8px;
            ">
            简介:
          </div>
          <sensitive-text-area v-model="this.userMessage.introduce" :disabled="!ifAbleEditIntroduce" label="简介"
            density="compact" row-height="15" rows="3" variant="outlined" auto-grow
            style="margin-right: 20px"></sensitive-text-area>
        </div>
      </div>
      <div style="display: flex; flex-direction: column">
        <div style="display: flex; flex-direction: row; margin: 10px">
          <v-btn variant="outlined" color="#8a8a8a" @click="this.editProfile()">修改头像</v-btn>
        </div>
        <div style="
            display: flex;
            flex-direction: row;
            margin: 10px;
            margin-top: 25px;
          ">
          <v-btn variant="outlined" :color="this.userNameButtonColor"
            @click="this.editUserName()">{{ buttonText.userName }}</v-btn>
          <v-btn style="margin-left: 20px" v-if="ifAbleEditUserName" variant="outlined" :color="userNameButtonColor"
            @click="this.cancelUserName()">取消</v-btn>
        </div>
        <div style="
            display: flex;
            flex-direction: row;
            margin: 10px;
            margin-top: 36px;
          ">
          <v-btn variant="outlined" :color="this.emailButtonColor"
            @click="this.editEmail()">{{ buttonText.email }}</v-btn>
          <v-btn style="margin-left: 20px" v-if="ifAbleEditEmail" variant="outlined" :color="emailButtonColor"
            @click="this.cancelEmail()">取消</v-btn>
        </div>
        <div style="
            display: flex;
            flex-direction: row;
            margin: 10px;
            margin-top: 36px;
          ">
          <v-btn variant="outlined" :color="this.passwdButtonColor"
            @click="this.editPasswd()">{{ buttonText.passwd }}</v-btn>
          <v-btn style="margin-left: 20px" v-if="ifAbleEditPasswd" variant="outlined" :color="passwdButtonColor"
            @click="this.cancelPasswd()">取消</v-btn>
        </div>
        <div style="
            display: flex;
            flex-direction: row;
            margin: 10px;
            margin-top: 55px;
          ">
          <v-btn variant="outlined" :color="this.introduceButtonColor"
            @click="this.editIntroduce()">{{ buttonText.introduce }}</v-btn>
          <v-btn style="margin-left: 20px" v-if="ifAbleEditIntroduce" variant="outlined" :color="introduceButtonColor"
            @click="this.cancelIntroduce()">取消</v-btn>
        </div>
      </div>
    </div>
    <div style="display: flex;flex-direction: row-reverse;">
      <v-btn style="margin-left: 5px;" variant="outlined" color="#8a8a8a" @click="this.logout()">退出在此设备的登陆</v-btn>
    </div>
  </v-card>
</template>
<script>
import SetProfileCard from '@/components/SetProfileCard.vue';
import EmailExmineCard from './EmailExmineCard.vue';
import { deleteUser, getUser } from '@/utils/storage';
import { computed, ref } from 'vue';
import SensitiveTextArea from './SensitiveTextArea.vue';
export default {
  props: {
    name: {
      type: String,
      default: 'visitor',
    }
  },
  components: {
    EmailExmineCard,
    SetProfileCard,
    SensitiveTextArea,
  },
  setup() {
    const ifShowEmailExmineCode = ref(false);
    const ifShowSetProfileCard = ref(false);
    const ifShowDialog = computed(() => {
      return ifShowEmailExmineCode.value || ifShowSetProfileCard.value;
    })
    const setEmailExmineCodeCardState = (state) => {
      ifShowEmailExmineCode.value = state;
    }
    const setProfileCardState = (state) => {
      ifShowSetProfileCard.value = state;
    }
    return {
      ifShowDialog,
      ifShowEmailExmineCode,
      ifShowSetProfileCard,
      setEmailExmineCodeCardState,
      setProfileCardState,
    }
  },
  data() {
    const userMessage = {
      userId: '',
      userName: this.name,
      profileUrl:
        'https://tse1-mm.cn.bing.net/th/id/OIP-C.PO7d9IfnPUy2RO173QYt6wHaHV?w=216&h=213&c=7&r=0&o=5&pid=1.7',
      passwd: 'test',
      email: 'test',
    };
    const lastSavedUserMessage=userMessage;
    const buttonText = {
      email: computed(() => {
        return this.ifAbleEditEmail ? '确认修改' : '修改绑定邮箱'
      }),
      passwd: computed(() => {
        return this.ifAbleEditPasswd ? '确认修改' : '修改密码'
      }),
      userName: computed(() => {
        return this.ifAbleEditUserName ? '确认修改' : '修改用户名'
      }),
      introduce: computed(() => {
        return this.ifAbleEditIntroduce ? '确认修改' : '修改简介'
      }),
    }
    //显示的邮箱验证码的卡片
    const cardType = 'reset_passwd';
    const emailCardMessage = {
      email: getUser('email')
    }
    const ifAbleEditUserName = false
    const ifAbleEditPasswd = false
    const ifAbleEditEmail = false
    const ifAbleEditIntroduce = false
    const emailButtonColor = computed(() => {
      return this.ifAbleEditEmail == true ? '#9c0c13' : '#8a8a8a'
    })
    const userNameButtonColor = computed(() => {
      return this.ifAbleEditUserName == true ? '#9c0c13' : '#8a8a8a'
    })
    const passwdButtonColor = computed(() => {
      return this.ifAbleEditPasswd == true ? '#9c0c13' : '#8a8a8a'
    })
    const introduceButtonColor = computed(() => {
      return this.ifAbleEditIntroduce == true ? '#9c0c13' : '#8a8a8a'
    })
    return {
      cardType,
      buttonText,
      ifAbleEditEmail,
      ifAbleEditPasswd,
      ifAbleEditUserName,
      emailButtonColor,
      userNameButtonColor,
      passwdButtonColor,
      userMessage,
      lastSavedUserMessage,
      introduceButtonColor,
      ifAbleEditIntroduce,
      emailCardMessage
    }
  },
  methods: {
    editProfile() {
      this.setProfileCardState(true);
    },
    editUserName() {
      if (this.ifAbleEditUserName) {
        //如果已经开始编辑了，那么执行提交的逻辑
        this.alert({state:true,title:'功能暂不支持',content:'此功能暂不支持，开发者正在开发中，敬请期待！'})
        this.ifAbleEditUserName = false
      } else {
        //如果没有编辑，就开启编辑
        this.ifAbleEditUserName = true
      }
    },
    editEmail() {
      if (this.ifAbleEditEmail) {
        this.alert({state:true,title:'功能暂不支持',content:'此功能暂不支持，开发者正在开发中，敬请期待！'})
        this.ifAbleEditEmail = false
      } else {
        this.ifAbleEditEmail = true
      }
    },
    editPasswd() {
      if (this.ifAbleEditPasswd) {//修改ing密码，显示邮箱验证谭传
        this.alert({state:true,title:'功能暂不支持',content:'此功能暂不支持，开发者正在开发中，敬请期待！'})
        this.setEmailExmineCodeCardState(true)//显示对应的邮箱验证码
      } else {
        this.ifAbleEditPasswd = true
      }
    },
    editIntroduce() {
      if (this.ifAbleEditIntroduce) {
        this.alert({state:true,title:'功能暂不支持',content:'此功能暂不支持，开发者正在开发中，敬请期待！'})
        this.ifAbleEditIntroduce = false
      } else {
        this.ifAbleEditIntroduce = true
      }
    },
    close() {//关闭邮箱验证码的窗口
      this.setEmailExmineCodeCardState(false);
      this.setProfileCardState(false);
    },
    submitExamineState(msg) {//验证码的验证状态  //验证成功
      if (msg.type == 'reset_passwd' && msg.state == 'success') {//如果对应的状态为成功
        this.ifAbleEditPasswd = false;
        this.alert({
          state: true,
          color: 'success',
          title: '修改成功',
          content: '现在您可以使用新密码登陆'
        })
        this.lastSavedUserMessage=this.userMessage;
        this.ifAbleEditPasswd = false;//在这里更新
      } else {
        this.alert({
          state: true,
          color: 'error',
          title: '修改失败',
          content: '验证身份时出现错误，请重新尝试'
        })
        this.cancelPasswd();//修改失败，模拟恢复原状
      }
    },
    cancelUserName() {
      this.userMessage.userName = this.lastSavedUserMessage.userName
      this.ifAbleEditUserName = false
    },
    cancelEmail() {
      this.userMessage.email = this.lastSavedUserMessage.email
      this.ifAbleEditEmail = false
    },
    cancelPasswd() {
      this.userMessage.passwd = this.lastSavedUserMessage.passwd
      this.ifAbleEditPasswd = false
    },
    cancelIntroduce() {
      this.userMessage.introduce = this.lastSavedUserMessage.introduce
      this.ifAbleEditIntroduce = false
    },
    logout() {
      deleteUser();
    },
    alert(msg) {
      this.$emit('alert', msg);
    }
  },
}
</script>
