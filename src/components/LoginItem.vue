<template>
  <v-card :style="{width:'600px',height:'350px',display:'relative'}">
    <v-tabs v-model="logtab" bg-color="indigo-darken-2" fixed-tabs>
      <v-tab
        :style="{background:'#9c0c13','font-size':'18px'}"
        value="login"
        text="登陆"
      ></v-tab>
      <v-tab
        :style="{background:'#9c0c13','font-size':'18px'}"
        value="register"
        text="注册"
      ></v-tab>
    </v-tabs>
    <v-tabs-window v-model="logtab">
      <!-- 用户名登录 -->
      <v-tabs-window-item v-if="loginMethod === 'username'" value="login">
        <v-card-text :style="{'margin-bottom':'0px','padding-bottom':'0px'}">
          <v-text-field
            label="用户名"
            v-model="loginByUsernameForm.username"
            :rules="[rules.usernameRules]"
          ></v-text-field>
          <v-text-field
            label="密码"
            type="password"
            v-model="loginByUsernameForm.password"
            :rules="[rules.passwordRules]"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            variant="outlined"
            @click="loginByUsername"
            :disabled="!canLoginByUsername"
            :style="{'font-size':'18px',width:'350px',height:'40px','margin-left':'110px','color':'#9c0c13'}"
            >帐号登陆
          </v-btn>
        </v-card-actions>
        <v-btn
          variant="plain"
          :style="{'margin-top':'40px','margin-left':'345px'}"
          @click="changeLoginMethod"
        >
          忘记用户名?使用邮箱验证码登陆</v-btn
        >
      </v-tabs-window-item>

      <!-- 邮箱登录 -->
      <v-tabs-window-item v-if="loginMethod === 'email'" value="login">
        <v-card-text :style="{'margin-bottom':'0px','padding-bottom':'0px'}">
          <v-text-field
            label="邮箱"
            v-model="loginByEmailForm.email"
            :rules="[rules.emailRules]"
          ></v-text-field>
          <v-text-field
            label="验证码"
            type="password"
            v-model="loginByEmailForm.exmineCode"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            variant="outlined"
            @click="loginByEmail"
            :style="{'font-size':'18px',width:'350px',height:'40px','margin-left':'110px','color':'#9c0c13'}"
            :disabled="!canLoginByEmail"
            >邮箱登陆
          </v-btn>
        </v-card-actions>
        <v-btn
          variant="plain"
          @click="changeLoginMethod"
          :style="{'margin-top':'40px','margin-left':'345px'}"
        >
          忘记邮箱？使用用户名密码登录
        </v-btn>
      </v-tabs-window-item>
      <!-- 注册部分 -->

      <!-- 注册第一部分 -->
      <v-tabs-window-item v-if="registerStep===0" value="register">
        <v-card-text :style="{'margin-bottom':'0px','padding-bottom':'0px'}">
          <!-- 注册表单内容 -->
          <v-text-field
            label="起一个名字"
            v-model="registerForm.username"
            :rules="[rules.usernameRules]"
          ></v-text-field>
          <v-text-field
            label="密码"
            type="password"
            v-model="registerForm.password"
            :rules="[rules.passwordRules]"
          ></v-text-field>
          <v-text-field
            label="确认密码"
            type="password"
            v-model="registerForm.confirmPassword"
            :rules="[rules.passwordRules]"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <!-- 下一步按钮 -->
          <v-btn
            :disabled="!canRegisterNextStep1"
            variant="outlined"
            @click="register1"
            :style="{'font-size':'18px',width:'100px',height:'30px','margin-left':'250px','color':'#9c0c13'}"
            >下一步
          </v-btn>
        </v-card-actions>
      </v-tabs-window-item>

      <!-- 注册第二部分 -->
      <v-tabs-window-item v-if="registerStep===1" value="register">
        <v-card-text :style="{'margin-bottom':'0px','padding-bottom':'0px'}">
          <!-- 注册表单内容 -->
          <v-text-field
            label="输入您的邮箱地址"
            v-model="registerForm.email"
            :rules="[rules.emailRules]"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <!-- 发送邮箱验证码按钮 -->
          <v-btn
            :disabled="!canRegisterNextStep2"
            variant="outlined"
            @click="register2"
            :style="{'font-size':'18px',width:'200px',height:'30px','margin-left':'200px','color':'#9c0c13'}"
            >发送验证码
          </v-btn>
        </v-card-actions>
      </v-tabs-window-item>

      <!-- 注册第三部分 -->
      <v-tabs-window-item v-if="registerStep===2" value="register">
        <v-card-title :style="{'margin-left':'0px','font-size':'25px'}">
          验证您的账户
        </v-card-title>
        <v-card-text
          :style="{width:'600px','font-size':'20px','margin-bottom':'0px','padding-bottom':'0px'}"
        >
          我们已经向您的邮箱发送验证码,请检查您的邮箱以获取验证码并输入(注意检查垃圾邮箱)
        </v-card-text>
        <v-sheet
          color="surface"
          :style="{'margin-bottom':'0px','padding-bottom':'0px'}"
        >
          <v-otp-input
            v-model="registerForm.exmineCode"
            variant="solo"
          ></v-otp-input>
        </v-sheet>
        <v-btn
          class="my-4"
          color="#9c0c13"
          height="40"
          text="验证"
          variant="flat"
          width="70%"
          @click="register3"
          :style="{width:'200px','margin-left':'0px'}"
        ></v-btn>
        <div
          class="text-caption"
          :style="{'font-size':'20px','margin-left':'425px','margin-top':'10px'}"
        >
          没有收到验证码?
          <a href="#" @click.prevent="registerForm.exmineCode = ''">重新发送</a>
        </div>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>
<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
  export default {
    setup(){
      const router=useRouter();
      const store=useStore();
      const updateUser = (user) => {
        store.dispatch('updateUser', user);
      };
      const navigateToIndex=()=>{
        router.push({name:'IndexPage'});
      }
      return{
        router,
        updateUser,
        navigateToIndex,
      }
    },
    data() {
      return {
        rules: {
          passwordRules: value =>
            this.checkPassword(value) ||
            '密码必须由字母，数字，符号中的任意两者组成且不少于8个字符',
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
          password: '',
          showPassword: false,
        },
        loginByEmailForm: {
          //通过邮箱登录时提交的表单
          email: '',
          exmineCode: '',
        },
        registerForm: {
          //注册时提交的表单
          username: '',
          password: '',
          confirmPassword: '',
          email: '',
          exmineCode: '',
          showPassword: false,
        },
      }
    },
    computed: {
      canLoginByUsername() {
        return (
          this.loginByUsernameForm.username &&
          this.loginByUsernameForm.password &&
          this.checkPassword(this.loginByUsernameForm.password) &&
          this.checkUsername(this.loginByUsernameForm.username)
        )
      },
      canLoginByEmail() {
        return (
          this.loginByEmailForm.email &&
          this.loginByEmailForm.exmineCode &&
          this.checkEmail(this.loginByEmailForm.email)
        )
      },
      canRegisterNextStep1() {
        return (
          this.registerForm.username &&
          this.registerForm.password &&
          this.registerForm.confirmPassword &&
          this.checkUsername(this.registerForm.username) &&
          this.checkPassword(this.registerForm.password) &&
          this.registerForm.password === this.registerForm.confirmPassword
        )
      },
      canRegisterNextStep2() {
        return (
          this.registerForm.email &&
          this.checkEmail(this.registerForm.email) &&
          this.checkEmail(this.registerForm.email)
        )
      },
      canRegisterNextStep3() {
        return this.registerForm.exmineCode
      },
    },
    methods: {
      changeLoginMethod() {
        if (this.loginMethod === 'username') {
          this.loginMethod = 'email'
        } else {
          this.loginMethod = 'username'
        }
      },
      loginByUsername() {
        // 登陆逻辑
        const user={id:'12345678',name:this.loginByUsernameForm.username,cookie:'None'};
        this.updateUser(user);
        window.alert(user.id);
        this.navigateToIndex();
        //补充获取到结果的逻辑
      },
      loginByEmail() {
        window.alert(this.loginByEmailForm.email)
        window.alert(this.loginByEmailForm.exmineCode)
        //补充获取到结果的逻辑
      },
      register1() {
        //注册第一步，用户名，密码设置完成
        //显示输入邮箱的控件
        this.registerStep = 1
      },
      register2() {
        //注册第二步，邮箱设置完毕
        this.registerStep = 2
      },
      register3() {
        //注册第三步，显示输入验证码的控件，点击按钮后提交表单
        this.logtab = 'login'
        this.registerStep = 0
        //这里需要补充获取到结果的逻辑
      },
      checkUsername(username) {
        const pattern = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/
        // 测试字符串是否符合模式
        return pattern.test(username) && username.length >= 1
      },
      checkPassword(password) {
        // 正则表达式用于检查是否包含至少两种类型的字符
        const regex =
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
        // 此外，确保所有字符都是ASCII
        const asciiRegex = /^[\x20-\x7E]*$/;
        return (
          regex.test(password) &&
          asciiRegex.test(password) &&
          password.length >= 8
        )
      },
      checkEmail(email) {
        const regex = /.+@.+\..+/;
        return regex.test(email) && email.length >= 1
      },
    },
  }
</script>