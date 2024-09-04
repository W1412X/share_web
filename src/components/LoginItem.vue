<template>
  <v-dialog v-model="ifShowDialog"
    style="width: 100%;height:100%;background-color: rgba(255,255,255,0.5);justify-content: center;">
    <div v-if="ifShowEmailExmineCode" style="width: 100%;height:100%;justify-content: center;display: flex">
      <email-exmine-card :email="emailCardMessage.email" :passwd="emailCardMessage.passwd" :user-name="emailCardMessage.userName" :type="this.cardType" 
      @alert="alert" 
      @close="closeExamineCode"
      @submit="submitExamineState"
      ></email-exmine-card>
    </div>
  </v-dialog>
  <v-card :style="{width:'600px',display:'relative','margin-top':'50px'}">
    <v-tabs v-model="logtab" bg-color="indigo-darken-2" fixed-tabs>
      <v-tab :style="{background:'#9c0c13','font-size':'18px'}" value="login" text="登陆"></v-tab>
      <v-tab :style="{background:'#9c0c13','font-size':'18px'}" value="register" text="注册"></v-tab>
    </v-tabs>
    <v-tabs-window v-model="logtab">
      <!-- 用户名登录 -->
      <v-tabs-window-item v-if="loginMethod === 'username'" value="login">
        <v-card-text :style="{'margin-bottom':'0px','padding-bottom':'0px'}">
          <v-text-field label="用户名" v-model="loginByUsernameForm.username"
            :rules="[rules.usernameRules]"></v-text-field>
          <v-text-field label="密码" type="passwd" v-model="loginByUsernameForm.passwd"
            :rules="[rules.passwdRules]"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn variant="outlined" @click="loginByUsername" :disabled="!canLoginByUsername"
            :style="{'font-size':'18px',width:'350px',height:'40px','margin-left':'110px','color':'#9c0c13'}">帐号登陆
          </v-btn>
        </v-card-actions>
        <v-btn variant="plain" :style="{'margin-top':'40px','margin-left':'345px'}" @click="changeLoginMethod">
          忘记用户名?使用邮箱验证码登陆</v-btn>
      </v-tabs-window-item>

      <!-- 邮箱登录 -->
      <v-tabs-window-item v-if="loginMethod === 'email'" value="login">
        <v-card-text :style="{'margin-bottom':'0px','padding-bottom':'0px'}">
          <v-text-field label="邮箱" v-model="loginByEmailForm.email" :rules="[rules.emailRules]"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn variant="outlined" @click="loginByEmail"
            :style="{'font-size':'18px',width:'350px',height:'40px','margin-left':'110px','color':'#9c0c13'}"
            :disabled="!canLoginByEmail">邮箱登陆
          </v-btn>
        </v-card-actions>
        <v-btn variant="plain" @click="changeLoginMethod" :style="{'margin-top':'40px','margin-left':'345px'}">
          忘记邮箱？使用用户名密码登录
        </v-btn>
      </v-tabs-window-item>
      <!-- 注册部分 -->

      <!-- 注册第一部分 -->
      <v-tabs-window-item v-if="registerStep===0" value="register">
        <v-card-text :style="{'margin-bottom':'0px','padding-bottom':'0px'}">
          <!-- 注册表单内容 -->
          <v-text-field label="起一个名字" v-model="registerForm.username" :rules="[rules.usernameRules]"></v-text-field>
          <v-text-field label="密码" type="passwd" v-model="registerForm.passwd"
            :rules="[rules.passwdRules]"></v-text-field>
          <v-text-field label="确认密码" type="passwd" v-model="registerForm.confirmpasswd"
            :rules="[rules.passwdRules]"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <!-- 下一步按钮 -->
          <v-btn :disabled="!canRegisterNextStep1" variant="outlined" @click="register1"
            :style="{'font-size':'18px',width:'100px',height:'30px','margin-left':'250px','color':'#9c0c13'}">下一步
          </v-btn>
        </v-card-actions>
      </v-tabs-window-item>

      <!-- 注册第二部分 -->
      <v-tabs-window-item v-if="registerStep===1" value="register">
        <v-card-text :style="{'margin-bottom':'0px','padding-bottom':'0px'}">
          <!-- 注册表单内容 -->
          <v-text-field label="输入您的邮箱地址" v-model="registerForm.email" :rules="[rules.emailRules]"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <!-- 发送邮箱验证码按钮 -->
          <div style="width:100%;display: flex;flex-direction: row">
            <div style="width: 100%;display: flex;justify-content: center;">
              <div style="display: flex;justify-content: center;margin-right: 20px;">
                <v-btn variant="outlined" @click="registerLast"
                  :style="{ 'font-size': '18px', width: '150px', height: '30px', 'color': '#9c0c13' }">上一步
                </v-btn>
              </div>
              <div style="display: flex;justify-content: center;">
                <v-btn :disabled="!canRegisterNextStep2" variant="outlined" @click="register2"
                  :style="{ 'font-size': '18px', width: '150px', height: '30px', 'color': '#9c0c13' }">发送验证码
                </v-btn>
              </div>
            </div>
          </div>
        </v-card-actions>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>
<script>
import { useRouter } from 'vue-router';
import { mapActions } from 'vuex';
import { useStore } from 'vuex';
import EmailExmineCard from './EmailExmineCard.vue';
import { computed,ref } from 'vue';
import {loginWithPassword} from '@/axios/identify'
import { setUser } from '@/utils/storage';
import { getStatusMessage,unknowError } from '@/statusCodeMessages';
  export default {
    setup(){
      const router=useRouter();
      const navigateToIndex=()=>{
        router.push({name:'IndexPage'});
      }
      const store=useStore();
      //控制对话框显示状态
      const ifShowEmailExmineCode=ref(false);
      const ifShowDialog=computed(()=>{
        return ifShowEmailExmineCode.value;
      })
      const setEmailExmineCodeCardState=(state)=>{
        ifShowEmailExmineCode.value=state;
      }
      return{
        store,
        router,
        navigateToIndex,
        ifShowDialog,
        ifShowEmailExmineCode,
        setEmailExmineCodeCardState,
      }
    },
    data() {
      const emailCardMessage={
        email:'',
        passwd:'',
        userName:'',
      }
      return {
        emailCardMessage,
        cardType:'register',
        rules: {
          passwdRules: value =>
            this.checkpasswd(value) ||
            '密码必须由字母，数字，符号组成且不少于8个字符',
          usernameRules: value =>
            this.checkUsername(value) ||
            '用户名只允许包含字母，数字以及汉字且不少于一个字符',
          emailRules: value => this.checkEmail(value) || '邮箱格式非法',
        },
        formValid: false,
        logtab: null, //登录或注册的选项卡
        loggedIn: false, //登录状态
        loginMethod: 'username', //是否通过用户名登陆
        registerStep: 0, //注册的步骤，第一步输入用户名密码，第二步输入邮箱，第三步输入验证码，最后返回登录界面
        loginByUsernameForm: {
          //通过用户名登录时提交的表单
          username: '',
          passwd: '',
          showpasswd: false,
        },
        loginByEmailForm: {
          //通过邮箱登录时提交的表单
          email: '',
          exmineCode: '',
        },
        registerForm: {
          //注册时提交的表单
          username: '',
          passwd: '',
          confirmpasswd: '',
          email: '',
          exmineCode: '',
          showpasswd: false,
        },
      }
    },
    components:{
      EmailExmineCard,
    },
    computed: {
      canLoginByUsername() {
        return (
          this.loginByUsernameForm.username &&
          this.loginByUsernameForm.passwd &&
          this.checkpasswd(this.loginByUsernameForm.passwd) &&
          this.checkUsername(this.loginByUsernameForm.username)
        )
      },
      canLoginByEmail() {
        return (
          this.loginByEmailForm.email &&
          this.checkEmail(this.loginByEmailForm.email)
        )
      },
      canRegisterNextStep1() {
        return (
          this.registerForm.username &&
          this.registerForm.passwd &&
          this.registerForm.confirmpasswd &&
          this.checkUsername(this.registerForm.username) &&
          this.checkpasswd(this.registerForm.passwd) &&
          this.registerForm.passwd === this.registerForm.confirmpasswd
        )
      },
      canRegisterNextStep2() {
        return (
          this.registerForm.email &&
          this.checkEmail(this.registerForm.email) &&
          this.checkEmail(this.registerForm.email)
        )
      },
    },
    methods: {
      ...mapActions(['storeLogin']),//导入cookie的处理函数
      closeExamineCode(){
        this.setEmailExmineCodeCardState(false);
      },
      changeLoginMethod() {
        if (this.loginMethod === 'username') {
          this.loginMethod = 'email'
        } else {
          this.loginMethod = 'username'
        }
      },
      loginByUsername() {
        // 登陆逻辑
        const form={
          user_name:this.loginByUsernameForm.username,
          passwd:this.loginByUsernameForm.passwd
        }
        if(form.user_name=='test'){//特殊
          setUser({
            id:'00000000',
            userName:'test',
            email:'test@test.com'
          });
          window.alert('临时游客登陆');
          this.router.push({name:'IndexPage'});
          return;
        }
        loginWithPassword(form)
          .then(response => {
          // 处理成功登录后的逻辑
          console.log(response);
          const status=response.status;
          if(status==200){//如果是请求成功
            setUser({
              id:response.id,
              userName:response.user_name
            })
            this.$emit('alert',getStatusMessage('login',status));
            this.router.push({name:'IndexPage'});
          }else{
            this.$emit('alert',getStatusMessage('login',status));
          }
        })
        .catch(error => {
          // 处理登录失败的逻辑
          console.error('Error logging in:', error);
          this.$emit('alert',unknowError);
        });
        //补充获取到结果的逻辑
      },
      loginByEmail() {
        this.cardType='login'
        this.setEmailExmineCodeCardState(true);
        //补充获取到结果的逻辑
        this.emailCardMessage.email=this.loginByEmailForm.email;
      },
      register1() {
        //注册第一步，用户名，密码设置完成
        //显示输入邮箱的控件
        this.registerStep = 1
      },
      register2() {//显示验证码界面
        //注册第二步，邮箱设置完毕
        this.registerStep = 0;
        this.cardType='register';
        this.emailCardMessage.email=this.registerForm.email;
        this.emailCardMessage.passwd=this.registerForm.passwd;
        this.emailCardMessage.userName=this.registerForm.username;
        this.setEmailExmineCodeCardState(true);
      },
      registerLast(){//跳转的注册的上一步
        this.registerStep=0;
      },
      checkUsername(username) {
        const pattern = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/
        // 测试字符串是否符合模式
        return pattern.test(username) && username.length >= 1
      },
      checkpasswd(passwd) {
        // 正则表达式用于检查是否包含至少两种类型的字符
        const regex =
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
        // 此外，确保所有字符都是ASCII
        const asciiRegex = /^[\x20-\x7E]*$/;
        return (
          regex.test(passwd) &&
          asciiRegex.test(passwd) &&
          passwd.length >= 8
        )
      },
      checkEmail(email) {
        const regex = /.+@.+\..+/;
        return regex.test(email) && email.length >= 1
      },
      showEmailExamineCard(){//显示对应的验证码发送
        this.setEmailExmineCodeCardState(true);
      },
      submitExamineState(msg){//接收来自检验卡的状态信息，其中
        console.log(msg);
        if(msg.type=='register'){
          if(msg.state=='success'){
            this.logtab='login';
            const message={
              state:true,
              color:'info',
              title:'重新登陆',
              content:'现在你可以使用用户名密码或者邮箱在登陆界面进行登陆',
            }
            this.$emit('alert',message)
          }
        }else if(msg.type=='login'){
          if(msg.state=='success'){
            this.$router.push({name:'IndexPage'});
          }
        }
      },
      alert(message){
        this.$emit('alert',message);
      }
    },
  }
</script>