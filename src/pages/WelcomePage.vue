<template>
  <v-dialog v-model="ifShowDialog" style="width: 100%;height:100%;justify-content: center;">
    <div style="display: flex;justify-content: center;">
      <v-card v-if="ifShowLogin" style="padding: 10px;width:200px">
        <v-card-title class="headline">敬请期待</v-card-title>
        <v-card-text>暂未对外开放</v-card-text>
        <v-card-actions>
          <v-btn text @click="this.setLoginState(false)">好的</v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-if="ifShowContact" style="padding: 10px;width:450px">
        <div style="font-size: 20px; font-weight: 600">联系我们</div>
        <div style="display: flex; flex-direction: row">
          <div style="display: flex; flex-direction: column; margin: 5px">
            <div style="display: flex; flex-direction: row;margin-top: 20px;">
              <span style="font-size: 16px; font-weight: 600;margin-bottom: 10px;">邮箱:
                <a href="mailto:admin@sharesdu.com" style="color: #0074e8; font-weight: bold">admin@sharesdu.com</a>
              </span>
            </div>
            <div style="display: flex; flex-direction: column;margin-bottom: 10px;">
              <span style="font-size: 16px; font-weight: 600">QQ群:
                <span>246680702</span>
              </span>
            </div>
            <div style="display: flex; flex-direction: column"></div>
          </div>
          <div style="width: 150px;margin-left: 50px;">
            <v-img src="/qq_img/group_qr.png"></v-img>
          </div>
        </div>
        <v-card-actions>
          <v-btn text @click="this.setContactState(false)">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-dialog>
  <LoadingView v-model="progressMsg"></LoadingView>
  <main fluid class="d-flex align-center justify-center;" style="height: 100vh;flex-direction: column;">
    <div style="
      width: 100%;
      height: 50px;
      border-bottom: 2px #9c0c13 solid;
      display: flex;
      flex-direction: row;
    ">
      <v-card-title style="color: rgba(156,12,19,0.9)">ShareSdu</v-card-title>
      <v-spacer></v-spacer>
      <v-btn @click="downloadApk" height="100%" variant="plain" style="font-size: 16px; font-weight: 600">安装APP</v-btn>
      <v-btn href="/#/document" height="100%" variant="plain" style="font-size: 16px; font-weight: 600">开发文档</v-btn>
      <v-btn @click="toContact" height="100%" variant="plain" style="font-size: 16px; font-weight: 600">联系我们</v-btn>
    </div>
    <div style="display: flex;justify-content: center;align-items: center;">
      <v-card class="text-center pa-5" outlined elevation="12" style="margin-top: 80px;max-width: 1000px;">
        <div class="mb-4">
          <h1 class="display-1 font-weight-bold">一个大学资源分享平台</h1>
          <h3 class="font-weight-light">旨在为大学生提供一个分享、搜索、获取大学生活中需要的学习资料，经验贴，课程评价、问答以及其他信息的
            <span style="font-weight: bold;">永久免费的</span>平台</h3>
        </div>
        <div style="margin: 20px;">
          <v-btn prepend-icon="mdi-file-document" @click="toIntro" color="primary" class="mx-2">点击查看网站介绍</v-btn>
        </div>
        <div style="margin: 20px;">
          <v-btn prepend-icon="mdi-login-variant" @click="toLogin" color="secondary" class="mx-2">注册成为一名用户</v-btn>
        </div>
        <div style="font-size: 14px;color: #8a8a8a;">当前仅对山东大学(济南，青岛，威海)全体在校本科生开放 （¯﹃¯） </div>
      </v-card>
    </div>
    <div style="display: flex;justify-content: center;align-items: center;margin-top: 50px;">
        <div style="display: flex;flex-direction: row;">
          <div style="flex-direction: column;margin: 10px;">
            <div style="font-size: 18px;flex-direction: row;justify-content: center;display: flex;font-weight: bold;"><span>官方QQ交流群</span></div>
            <img style="width: 200px;height: 200px;" src="/qq_img/group_qr.png"/>
          </div>
          <div style="flex-direction: column;margin: 10px;">
            <div style="font-size: 18px;flex-direction: row;justify-content: center;display: flex;font-weight: bold;"><span>微信公众号</span></div>
            <img style="width: 200px;height: 200px;" src="/wechat/wechat_qr.jpg"/>
          </div>
        </div>
    </div>
  </main>
  <div style="width:100%;display:flex;flex-direction:row;justify-content:center">
      <div style="display: flex;flex-direction: row;font-size: 14px;font-weight: 600;margin-right: 10px;">
        <img style="max-width: 20px;max-height:20px;margin-right:5px;" src="/police.png" />
        <a style="margin-top: 1px;" href="https://beian.mps.gov.cn/#/query/webSearch?code=37028202001173"
          rel="noreferrer" target="_blank">鲁公网安备37028202001173</a>
      </div>
      <div style="display: flex;flex-direction: row;font-size: 14px;font-weight: 600;margin-top: 1px;"><a
          href="https://beian.miit.gov.cn/" style="color: #ffffff;" target="_blank">鲁ICP备2024118409</a></div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
export default {
  setup() {
    const ifShowLogin = ref(false);
    const ifShowContact = ref(false);
    const ifShowDialog = computed(() => {
      return ifShowLogin.value || ifShowContact.value;
    })
    const setLoginState = (state) => {
      ifShowLogin.value = state;
    }
    const setContactState = (state) => {
      ifShowContact.value = state;
    }
    return {
      ifShowContact,
      ifShowDialog,
      ifShowLogin,
      setContactState,
      setLoginState,
    }
  },
  data() {
    return {
      wx: 'https://github.com/W1412X',
      wh: 'https://github.com/zzysssigm',
      project: 'https://github.com/ShareSdu',
      downloadApkUrl:"http://sharesdu.com:5001/apk?param=download",
      backgroundColor: '#f9f9f9',
      dialog: false, // 控制对话框显示的变量
      progressMsg: {
        state: false,
        text: '正在加载',
        progress: -1,
      }
    };
  },
  methods: {
    toContact() {
      this.setContactState(true);
    },
    toIntro() {
      this.$router.push({ name: 'IntroducePage' })
    },
    toLogin() {
      this.setLoginState(true)
    },
    close() {
      this.setContactState(false);
    },
    downloadApk(){
      window.open(this.downloadApkUrl);
    }
  },
}
</script>

<style scoped>
.v-btn {
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.v-btn:hover {
  transform: scale(1.05);
}

h1,
h3 {
  font-family: 'Arial', sans-serif;
}

.v-card {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
</style>
