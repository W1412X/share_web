<template>
  <v-dialog v-model="ifShowDialog" style="width: 100%;height:100%;justify-content: center;">
    <div v-if="ifShowEmailExmineCode" style="width: 100%;height:100%;justify-content: center;display: flex">
      <email-exmine-card :form="this.formToSubmit" :type="this.cardType" @alert="alert" @close="closeExamineCode" @set_loading="setLoading"></email-exmine-card>
    </div>
    <div v-if="ifShowPrivacyPolicy" style="display: flex;justify-content: center;">
      <v-card style="padding:5px;width:750px;max-width:750px;">
        <div style="width: 100%;display: flex;flex-direction: row-reverse;">
          <div>
            <v-btn size="20" variant="outlined" style="
                    border-radius: 50px;
                    height: 20px;
                    margin: 5px;
                    color: #8a8a8a;
                    font-weight: 600;
                " @click="this.setPrivacyPolicyState(false)">✕</v-btn>
          </div>
          <div
            style="padding:5px;margin-top: 20px;margin-left: 10px;margin-right: 10px;max-height: 800px;overflow:scroll;">
            <div v-html="privacyContent"></div>
          </div>
        </div>
        <div style="overflow: auto;max-height:800px;">{{ this.privacyPolicy }}</div>
      </v-card>
    </div>
    <div v-if="ifShowToKnow" style="display: flex;justify-content: center;">
      <v-card style="padding:5px;width:750px;max-width:750px;">
        <div style="width: 100%;display: flex;flex-direction: row-reverse;">
          <div>
            <v-btn size="20" variant="outlined" style="
                    border-radius: 50px;
                    height: 20px;
                    margin: 5px;
                    color: #8a8a8a;
                    font-weight: 600;
                " @click="this.setToKnowState(false)">✕</v-btn>
          </div>
          <div
            style="padding:5px;margin-top: 20px;margin-left: 10px;margin-right: 10px;max-height: 800px;overflow:scroll;">
            <div v-html="toKnowContent"></div>
          </div>
        </div>
        <div style="overflow: auto;max-height:800px;">{{ this.privacyPolicy }}</div>
      </v-card>
    </div>
  </v-dialog>
  <v-card :style="{ width: '600px', display: 'relative', 'margin-top': '50px' }">
    <v-tabs v-model="logtab" bg-color="indigo-darken-2" fixed-tabs>
      <v-tab :style="{ background: '#9c0c13', 'font-size': '18px' }" value="login" text="登陆"></v-tab>
      <v-tab :style="{ background: '#9c0c13', 'font-size': '18px' }" value="register" text="注册"></v-tab>
    </v-tabs>
    <v-tabs-window v-model="logtab">
      <!-- 用户名登录 -->
      <v-tabs-window-item v-if="loginMethod === 'username'" value="login">
        <v-card-text :style="{ 'margin-bottom': '0px', 'padding-bottom': '0px' }">
          <sensitive-text-field label="用户名" v-model="loginByUsernameForm.user_name"
            :rules="[rules.usernameRules]"></sensitive-text-field>
          <sensitive-text-field label="密码" type="passwd" v-model="loginByUsernameForm.pass_word"
            :rules="[rules.passwdRules]"></sensitive-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn variant="outlined" @click="loginByUsername" :disabled="!canLoginByUsername"
            :style="{ 'font-size': '18px', width: '350px', height: '40px', 'margin-left': '110px', 'color': '#9c0c13' }">帐号登陆
          </v-btn>
        </v-card-actions>
        <div style="width: 100%;display: flex;flex-direction: row-reverse;">
          <v-btn variant="plain" :style="{ 'margin-top': '40px', 'margin-right': '5px' }" @click="changeLoginMethod">
            忘记用户名?使用邮箱验证码登陆</v-btn>
        </div>
      </v-tabs-window-item>

      <!-- 邮箱登录 -->
      <v-tabs-window-item v-if="loginMethod === 'email'" value="login">
        <v-card-text :style="{ 'margin-bottom': '0px', 'padding-bottom': '0px' }">
          <sensitive-text-field label="邮箱" v-model="loginByEmailForm.email"
            :rules="[rules.emailRules]"></sensitive-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn variant="outlined" @click="loginByEmail"
            :style="{ 'font-size': '18px', width: '350px', height: '40px', 'margin-left': '110px', 'color': '#9c0c13' }"
            :disabled="!canLoginByEmail">邮箱登陆
          </v-btn>
        </v-card-actions>
        <div style="width: 100%;display: flex;flex-direction: row-reverse;">
          <v-btn variant="plain" :style="{ 'margin-top': '40px', 'margin-right': '5px' }" @click="changeLoginMethod">
            忘记用户名?使用邮箱验证码登陆</v-btn>
        </div>
      </v-tabs-window-item>
      <!-- 注册部分 -->

      <!-- 注册第一部分 -->
      <v-tabs-window-item v-if="registerStep === 0" value="register">
        <v-card-text :style="{ 'margin-bottom': '0px', 'padding-bottom': '0px' }">
          <!-- 注册表单内容 -->
          <sensitive-text-field label="起一个名字" v-model="registerForm.user_name"
            :rules="[rules.usernameRules]"></sensitive-text-field>
          <sensitive-text-field label="密码" type="passwd" v-model="registerForm.pass_word"
            :rules="[rules.passwdRules]"></sensitive-text-field>
          <sensitive-text-field label="确认密码" type="passwd" v-model="registerConfirmPasswd"
            :rules="[rules.passwdRules]"></sensitive-text-field>
        </v-card-text>
        <v-card-actions>
          <!-- 下一步按钮 -->
          <v-btn :disabled="!canRegisterNextStep1" variant="outlined" @click="register1"
            :style="{ 'font-size': '18px', width: '100px', height: '30px', 'margin-left': '250px', 'color': '#9c0c13' }">下一步
          </v-btn>
        </v-card-actions>
      </v-tabs-window-item>
      <!-- 注册第二部分 -->
      <v-tabs-window-item v-if="registerStep === 1" value="register">
        <v-card-text :style="{ 'margin-bottom': '0px', 'padding-bottom': '0px' }">
          <div style="display: flex;flex-direction: row;">
            <v-select style="max-width: 125px;margin-right: 15px;" variant="outlined" density="compact" v-model="registerForm.campu" :items="campu_list" label="您的校区"
            ></v-select>
            <v-select style="max-width: 250px;" variant="outlined" density="compact" v-model="registerForm.college" :items="college_list" label="您的学院"
            ></v-select>
            <sensitive-text-field variant="outlined" label="您的专业" density="compact" v-model="registerForm.major" style="max-width: 125px;margin-left: 15px;margin-bottom: 5px;padding-bottom: 0px;"></sensitive-text-field>
          </div>
          <div style="margin-top: 5px;margin-bottom: 15px">
            <span style="font-weight: bold;">注:</span>
            校区，学院，专业信息均为选填(填写有助于您的贡献被他人精确查找)
          </div>
          <!-- 注册表单内容 -->
          <sensitive-text-field variant="outlined" label="您的校园邮箱地址(@mail.sdu.edu.cn)" v-model="registerForm.email"
            :rules="[rules.emailRules]"></sensitive-text-field>
        </v-card-text>
        <div style="display: flex;flex-direction: row-reverse;">
          <v-radio-group v-model="agreementStatus">
            <v-radio color="#8a8a8a" style="margin-left: 10px" density="compact" value="agree">
              <template v-slot:label>
                <div>
                  我已阅读并同意<strong style="color: #0074e8;text-decoration: underline;" @click="showToKnow">入站须知</strong>与
                  <strong style="color: #0074e8;text-decoration: underline;" @click="showPrivacy">隐私政策</strong>
                </div>
              </template>
            </v-radio>
          </v-radio-group>
        </div>
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
import { computed, ref } from 'vue';
import { setUser } from '@/utils/storage';
import SensitiveTextField from './SensitiveTextField.vue';
import { getCurrentInstance } from 'vue';
import { loginWithPassword } from '@/axios/account';
import { getStatusMessage } from '@/axios/statusCodeMessages';
export default {
  setup() {
    const router = useRouter();
    const navigateToIndex = () => {
      router.push({ name: 'IndexPage' });
    }
    const store = useStore();
    //控制对话框显示状态
    const ifShowEmailExmineCode = ref(false);
    const ifShowPrivacyPolicy = ref(false);
    const ifShowToKnow=ref(false);
    const ifShowDialog = computed(() => {
      return ifShowEmailExmineCode.value || ifShowPrivacyPolicy.value || ifShowToKnow.value;
    })
    const setEmailExmineCodeCardState = (state) => {
      ifShowEmailExmineCode.value = state;
    }
    const setToKnowState=(state)=>{
      ifShowToKnow.value=state;
    }
    const setPrivacyPolicyState = (state) => {
      ifShowPrivacyPolicy.value = state;
    }
    return {
      store,
      router,
      navigateToIndex,
      ifShowDialog,
      ifShowEmailExmineCode,
      setEmailExmineCodeCardState,
      setPrivacyPolicyState,
      ifShowPrivacyPolicy,
      ifShowToKnow,
      setToKnowState,
    }
  },
  data() {
    const college_list=getCurrentInstance().appContext.config.globalProperties.$colleges;
    const campu_list=getCurrentInstance().appContext.config.globalProperties.$campus;
    return {
      college_list,
      campu_list,
      privacyContent: '',//隐私政策的HTML内容  
      toKnowContent:'',//入站须知的HTML内容  
      cardType: 'register',
      rules: {
        passwdRules: value =>
          this.checkpasswd(value) ||
          '密码必须由大小字母，数字，符号组成且不少于8个字符',
        usernameRules: value =>
          this.checkUsername(value) ||
          '用户名只允许包含字母，数字以及汉字且不少于一个字符，不允许特殊用户名',
        emailRules: value => this.checkEmail(value) || '邮箱格式非法',
      },
      formValid: false,
      logtab: null, //登录或注册的选项卡
      loggedIn: false, //登录状态
      loginMethod: 'username', //是否通过用户名登陆
      registerStep: 0, //注册的步骤，第一步输入用户名密码，第二步输入邮箱，第三步输入验证码，最后返回登录界面
      loginByUsernameForm: {
        //通过用户名登录时提交的表单
        user_name: '',
        pass_word: ''
      },
      loginByEmailForm: {
        //通过邮箱登录时提交的表单
        email: '',
        email_code: '',
      },
      registerForm: {
        //注册时提交的表单
        user_name: '',
        pass_word: '',
        email: '',
        email_code: '',
        college:'',
        major:'',
        campu:'',
      },
      registerConfirmPasswd:'',//注册时的二次密码输入
      formToSubmit: null,//待提交的表单，主要针对向验证码卡片传递信息
      agreementStatus: null,
    }
  },
  components: {
    EmailExmineCard,
    SensitiveTextField
  },
  computed: {
    canLoginByUsername() {
      return (
        this.loginByUsernameForm.user_name &&
        this.loginByUsernameForm.pass_word &&
        this.checkpasswd(this.loginByUsernameForm.pass_word) &&
        this.checkUsername(this.loginByUsernameForm.user_name)
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
        this.registerForm.user_name &&
        this.registerForm.pass_word &&
        this.registerConfirmPasswd &&
        this.checkUsername(this.registerForm.user_name) &&
        this.checkpasswd(this.registerForm.pass_word) &&
        this.registerForm.pass_word === this.registerConfirmPasswd
      )
    },
    canRegisterNextStep2() {
      return (
        this.registerForm.email &&
        this.checkEmail(this.registerForm.email) &&
        this.checkEmail(this.registerForm.email) &&
        this.agreementStatus == 'agree'
      )
    },
  },
  methods: {
    ...mapActions(['storeLogin']),//导入cookie的处理函数
    closeExamineCode() {
      this.setEmailExmineCodeCardState(false);
    },
    changeLoginMethod() {
      if (this.loginMethod === 'username') {
        this.loginMethod = 'email'
      } else {
        this.loginMethod = 'username'
      }
    },
    async loginByUsername() {//通过用户名登陆
      //登陆
      this.loginByUsernameForm;
      this.setLoading({state:true,progress:-1,text:'登陆中...'});  
      const response=await loginWithPassword(this.loginByUsernameForm); 
      this.setLoading({state:false,progress:-1,text:''});  
      var alertSet=getStatusMessage('login',response.status);
      this.alert(alertSet);
      if (response.status==200) {
        setUser({
          id: '00000000',
          userName: 'sharesdu',
          email: 'sharesdu@sharesdu.com'
        });
        this.router.push({ name: 'IndexPage' });
        return;
      }
    },
    loginByEmail() {
      this.cardType = 'login';
      this.formToSubmit = this.loginByEmailForm;
      this.setEmailExmineCodeCardState(true);
    },
    register1() {
      //注册第一步，用户名，密码设置完成
      //显示输入邮箱的控件
      this.registerStep = 1
    },
    register2() {//显示验证码界面
      //注册第二步，邮箱设置完毕
      this.registerStep = 0;
      this.cardType = 'register';
      this.formToSubmit=this.registerForm;
      this.setEmailExmineCodeCardState(true);
    },
    registerLast() {//跳转的注册的上一步
      this.registerStep = 0;
    },
    checkUsername(username) {
      const pattern = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/  
      const disabled_names=["admin", "root", "superuser", "moderator", "guest", 
        "test", "support", "webmaster", "system", "info", 
        "service", "help", "contact", "feedback", "welcome", 
        "update", "error", "default", "demo", "password", 
        "管理员", "超级管理员", "访客", "测试账号", "用户名", 
        "支持", "客服", "系统管理员", "客户", "反馈", 
        "维护", "帮助", "错误", "默认", "更新", 
        "禁止", "账号", "密码", "数据库", "系统"];
      // 测试字符串是否符合模式，并且不可以包含禁止的名字
      return pattern.test(username) && username.length >= 1 && !disabled_names.includes(username);
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
    alert(message) {
      this.$emit('alert', message);
    },
    setLoading(loading_msg) {//这里的loading不显示进度
      this.$emit('set_loading', loading_msg);
    },
    async showToKnow() {
      try {
        const response = await fetch('/htmls/to_know.html'); // 直接使用路径
        if (response.ok) {
          this.toKnowContent = await response.text();
          this.setToKnowState(true);
        } else {
          console.error('Failed to load HTML content');
        }
      } catch (error) {
        console.error('Error loading HTML content:', error);
      }
    },
    async showPrivacy() {
      try {
        const response = await fetch('/htmls/privacy.html'); // 直接使用路径
        if (response.ok) {
          this.privacyContent = await response.text();
          this.setPrivacyPolicyState(true);
        } else {
          console.error('Failed to load HTML content');
        }
      } catch (error) {
        console.error('Error loading HTML content:', error);
      }
    },
  },
}
</script>