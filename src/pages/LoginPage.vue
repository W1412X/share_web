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
          ></v-text-field>
          <v-text-field
            label="密码"
            type="password"
            v-model="loginByUsernameForm.password"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            variant="outlined"
            @click="loginByUsername"
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

      <!-- 邮箱登录第一部分 -->
      <v-tabs-window-item
        v-if="loginMethod === 'email' && loginByEmailStep==0"
        value="login"
      >
        <v-card-text
          :style="{'margin-bottom':'0px','padding-bottom':'0px','margin-top':'50px'}"
        >
          <v-text-field
            label="邮箱"
            v-model="loginByEmailForm.email"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            variant="outlined"
            @click="loginByEmail"
            :style="{'font-size':'18px',width:'350px',height:'40px','margin-left':'110px','color':'#9c0c13'}"
            >发送验证码
          </v-btn>
        </v-card-actions>
        <v-btn
          variant="plain"
          @click="changeLoginMethod"
          :style="{'margin-top':'60px','margin-left':'345px'}"
        >
          忘记邮箱？使用用户名密码登录
        </v-btn>
      </v-tabs-window-item>
      <!-- 邮箱登陆第二部分 -->
      <v-tabs-window-item
        v-if="loginMethod === 'email' && loginByEmailStep==1"
        value="login"
      >
        <v-card-title :style="{'margin-left':'200px','font-size':'25px'}">
          输入验证码
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
          :style="{width:'200px','margin-left':'200px'}"
        ></v-btn>
        <div
          class="text-caption"
          :style="{'font-size':'20px','margin-left':'425px','margin-top':'10px'}"
        >
          没有收到验证码?
          <a href="#" @click.prevent="registerForm.exmineCode = ''">重新发送</a>
        </div>
      </v-tabs-window-item>

      <!-- 注册部分 -->

      <!-- 注册第一部分 -->
      <v-tabs-window-item v-if="registerStep===0" value="register">
        <v-card-text :style="{'margin-bottom':'0px','padding-bottom':'0px'}">
          <!-- 注册表单内容 -->
          <v-text-field
            label="起一个名字"
            v-model="registerForm.username"
          ></v-text-field>
          <v-text-field
            label="密码"
            type="password"
            v-model="registerForm.password"
          ></v-text-field>
          <v-text-field
            label="确认密码"
            type="password"
            v-model="registerForm.confirmPassword"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <!-- 下一步按钮 -->
          <v-btn
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
            v-model="registerForm.username"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <!-- 发送邮箱验证码按钮 -->
          <v-btn
            variant="outlined"
            @click="register2"
            :style="{'font-size':'18px',width:'200px',height:'30px','margin-left':'200px','color':'#9c0c13'}"
            >发送验证码
          </v-btn>
        </v-card-actions>
      </v-tabs-window-item>

      <!-- 注册第三部分 -->
      <v-tabs-window-item v-if="registerStep===2" value="register">
        <v-card-title :style="{'margin-left':'200px','font-size':'25px'}">
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
          :style="{width:'200px','margin-left':'200px'}"
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
  export default {
    data() {
      return {
        logtab: null, //登录或注册的选项卡
        loggedIn: false, //登录状态
        loginByEmailStep: 0, //通过邮箱
        loginMethod: 'username', //是否通过用户名登陆
        registerStep: 0, //注册的步骤，第一步输入用户名密码，第二步输入邮箱，第三步输入验证码，最后返回登录界面
        loginByUsernameForm: {
          //通过用户名登录时提交的表单
          username: '',
          password: '',
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
        },
      }
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
        window.alert(this.loginByUsernameForm.username)
        window.alert(this.loginByUsernameForm.password)
      },
      loginByEmail() {
        this.loginByEmailStep = 1
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
      },
    },
  }
</script>
