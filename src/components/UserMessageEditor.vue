<template>
  <v-card style="padding: 10px; width: 700px">
    <div style="display: flex; flex-direction: row">
      <div
        style="
          width: 400px;
          margin: 10px;
          display: flex;
          flex-direction: column;
        "
      >
        <div style="display: flex; flex-direction: row; margin: 10px">
          <div
            style="
              font-size: 16px;
              width: 75px;
              color: #8a8a8a;
              font-weight: 600;
              margin-top: 8px;
            "
          >
            头像:
          </div>
          <v-avatar
            :image="userMessage.profileUrl"
            style="margin-right: 20px"
          ></v-avatar>
        </div>
        <div style="display: flex; flex-direction: row; margin: 10px">
          <div
            style="
              font-size: 16px;
              width: 75px;
              color: #8a8a8a;
              font-weight: 600;
              margin-top: 8px;
            "
          >
            用户名:
          </div>
          <v-textarea
            v-model="this.editedMessage.userName"
            :disabled="!ifAbleEditUserName"
            density="compact"
            row-height="15"
            rows="1"
            label="用户名"
            variant="outlined"
            auto-grow
            style="margin-right: 20px"
          ></v-textarea>
        </div>
        <div style="display: flex; flex-direction: row; margin: 10px">
          <div
            style="
              font-size: 16px;
              width: 75px;
              color: #8a8a8a;
              font-weight: 600;
              margin-top: 8px;
            "
          >
            邮箱:
          </div>
          <v-textarea
            v-model="this.editedMessage.email"
            :disabled="!ifAbleEditEmail"
            label="邮箱"
            density="compact"
            row-height="15"
            rows="1"
            variant="outlined"
            auto-grow
            style="margin-right: 20px"
          ></v-textarea>
        </div>
        <div style="display: flex; flex-direction: row; margin: 10px">
          <div
            style="
              font-size: 16px;
              width: 75px;
              color: #8a8a8a;
              font-weight: 600;
              margin-top: 8px;
            "
          >
            密码:
          </div>
          <v-textarea
            v-model="this.editedMessage.passwd"
            :disabled="!ifAbleEditPasswd"
            label="密码"
            density="compact"
            row-height="15"
            rows="1"
            variant="outlined"
            auto-grow
            style="margin-right: 20px"
          ></v-textarea>
        </div>
        <div style="display: flex; flex-direction: row; margin: 10px">
          <div
            style="
              font-size: 16px;
              width: 75px;
              color: #8a8a8a;
              font-weight: 600;
              margin-top: 8px;
            "
          >
            简介:
          </div>
          <v-textarea
            v-model="this.editedMessage.introduce"
            :disabled="!ifAbleEditIntroduce"
            label="简介"
            density="compact"
            row-height="15"
            rows="3"
            variant="outlined"
            auto-grow
            style="margin-right: 20px"
          ></v-textarea>
        </div>
      </div>
      <div style="display: flex; flex-direction: column">
        <div style="display: flex; flex-direction: row; margin: 10px">
          <v-btn variant="outlined" color="#8a8a8a" @click="this.editProfile()"
            >修改头像</v-btn
          >
        </div>
        <div
          style="
            display: flex;
            flex-direction: row;
            margin: 10px;
            margin-top: 25px;
          "
        >
          <v-btn
            variant="outlined"
            :color="this.userNameButtonColor"
            @click="this.editUserName()"
            >{{buttonText.userName}}</v-btn
          >
          <v-btn
            style="margin-left: 20px"
            v-if="ifAbleEditUserName"
            variant="outlined"
            :color="userNameButtonColor"
            @click="this.cancelUserName()"
            >取消</v-btn
          >
        </div>
        <div
          style="
            display: flex;
            flex-direction: row;
            margin: 10px;
            margin-top: 36px;
          "
        >
          <v-btn
            variant="outlined"
            :color="this.emailButtonColor"
            @click="this.editEmail()"
            >{{buttonText.email}}</v-btn
          >
          <v-btn
            style="margin-left: 20px"
            v-if="ifAbleEditEmail"
            variant="outlined"
            :color="emailButtonColor"
            @click="this.cancelEmail()"
            >取消</v-btn
          >
        </div>
        <div
          style="
            display: flex;
            flex-direction: row;
            margin: 10px;
            margin-top: 36px;
          "
        >
          <v-btn
            variant="outlined"
            :color="this.passwdButtonColor"
            @click="this.editPasswd()"
            >{{buttonText.passwd}}</v-btn
          >
          <v-btn
            style="margin-left: 20px"
            v-if="ifAbleEditPasswd"
            variant="outlined"
            :color="passwdButtonColor"
            @click="this.cancelPasswd()"
            >取消</v-btn
          >
        </div>
        <div
          style="
            display: flex;
            flex-direction: row;
            margin: 10px;
            margin-top: 55px;
          "
        >
          <v-btn
            variant="outlined"
            :color="this.introduceButtonColor"
            @click="this.editIntroduce()"
            >{{buttonText.introduce}}</v-btn
          >
          <v-btn
            style="margin-left: 20px"
            v-if="ifAbleEditIntroduce"
            variant="outlined"
            :color="introduceButtonColor"
            @click="this.cancelIntroduce()"
            >取消</v-btn
          >
        </div>
      </div>
    </div>
    <div>
      <v-btn
        style="margin-left: 500px"
        variant="outlined"
        color="#8a8a8a"
        @click="this.logout()"
        >退出在此设备的登陆</v-btn
      >
    </div>
  </v-card>
</template>
<script>
  import { computed } from 'vue'

  export default {
    props: {
      userMessage: {
        type: Object,
        default: function () {
          return {
            userId:'',
            userName: 'test',
            profileUrl:
              'https://tse1-mm.cn.bing.net/th/id/OIP-C.PO7d9IfnPUy2RO173QYt6wHaHV?w=216&h=213&c=7&r=0&o=5&pid=1.7',
            passwd: 'test',
            email: 'test',
          }
        },
      },
    },
    data() {
      const buttonText = {
        email: computed(() => {
          return this.ifAbleEditEmail ? '确认修改' : '修改绑定邮箱'
        }),
        passwd: computed(() => {
          return this.ifAbleEditPasswd ? '确认修改' : '修改密码'
        }),
        userName: computed(() => {
          return this.ifAbleEditUserName ? '确认修改' : '修改用户民'
        }),
        introduce: computed(() => {
          return this.ifAbleEditIntroduce ? '确认修改' : '修改简介'
        }),
      }
      const editedMessage = {
        //存储编辑的信息，默认传入的属性
        userName: this.userMessage.userName,
        passwd: this.userMessage.passwd,
        email: this.userMessage.email,
        introduce: this.userMessage.introduce,
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
        buttonText,
        ifAbleEditEmail,
        ifAbleEditPasswd,
        ifAbleEditUserName,
        emailButtonColor,
        userNameButtonColor,
        passwdButtonColor,
        editedMessage,
        introduceButtonColor,
        ifAbleEditIntroduce,
      }
    },
    methods: {
      editProfile() {
        console.log(this.userMessage.profileUrl);
        this.$emit('set_profile',this.userMessage.userId);
      },
      editUserName() {
        if (this.ifAbleEditUserName) {
          //如果已经开始编辑了，那么执行提交的逻辑
          console.log(this.editedMessage.userName)
          this.ifAbleEditUserName = false
        } else {
          //如果没有编辑，就开启编辑
          this.ifAbleEditUserName = true
        }
      },
      editEmail() {
        if (this.ifAbleEditEmail) {
          console.log(this.editedMessage.email)
          this.ifAbleEditEmail = false
        } else {
          this.ifAbleEditEmail = true
        }
      },
      editPasswd() {
        if (this.ifAbleEditPasswd) {
          console.log(this.editedMessage.passwd)
          this.ifAbleEditPasswd = false
        } else {
          this.ifAbleEditPasswd = true
        }
      },
      editIntroduce() {
        if (this.ifAbleEditIntroduce) {
          console.log(this.editedMessage.introduce)
          this.ifAbleEditIntroduce = false
        } else {
          this.ifAbleEditIntroduce = true
        }
      },
      cancelUserName() {
        this.editedMessage.userName = this.userMessage.userName
        this.ifAbleEditUserName = false
      },
      cancelEmail() {
        this.editedMessage.email = this.userMessage.email
        this.ifAbleEditEmail = false
      },
      cancelPasswd() {
        this.editedMessage.passwd = this.userMessage.passwd
        this.ifAbleEditPasswd = false
      },
      cancelIntroduce() {
        this.editedMessage.introduce = this.userMessage.introduce
        this.ifAbleEditIntroduce = false
      },
      logout() {
        window.alert('推出登陆')
      },
    },
  }
</script>
