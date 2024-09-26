<template>
    <main fluid class="d-flex align-center justify-center" style="height: 100vh;">
      <v-card class="text-center pa-5" outlined elevation="12" :style="{ backgroundColor: backgroundColor }">
        <div class="mb-4">
          <h1 class="display-1 font-weight-bold">这是一个大学学习助手</h1>
          <h3 class="font-weight-light">旨在分享大学生活中的学习资源，以及提供一些常见问题的解答，课程选择的建议</h3>
        </div>
        <div style="margin: 20px;">
          <v-btn prepend-icon="mdi-file-document" @click="toIntro" color="primary" class="mx-2">网站介绍</v-btn>
        </div>
        <div style="margin: 20px;">
          <v-btn prepend-icon="mdi-github" @click="toAuthorPage(project)" color="primary" class="mx-2">项目仓库</v-btn>
        </div>
        <div>
          <v-btn prepend-icon="mdi-github" @click="toAuthorPage(wx)" color="secondary" class="mx-2">W1412X</v-btn>
          <v-btn prepend-icon="mdi-github" @click="toAuthorPage(wh)" color="secondary" class="mx-2">zzysssigm</v-btn>
        </div>
      </v-card>

      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">敬请期待</v-card-title>
          <v-card-text>这个功能正在开发中，敬请期待！</v-card-text>
          <v-card-actions>
            <v-btn text @click="dialog = false">好的</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </main>
  <div style="width: 100%;display: flex;justify-content: center;margin-top: 10px;">
      <div style="display: flex;flex-direction: row;font-size: 13px;font-weight: 600;"><a href="https://beian.miit.gov.cn/" style="color: #8a8a8a;" target="_blank">鲁ICP备2024118409</a></div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      wx: 'https://github.com/W1412X',
      wh: 'https://github.com/zzysssigm',
      project:'https://github.com/ShareSdu',
      backgroundColor: '#f9f9f9',
      dialog: false, // 控制对话框显示的变量
    };
  },
  methods: {
    toAuthorPage(url) {
      window.open(url, '_blank');
    },
    toIntro(){
      this.$router.push({name:'IntroducePage'})
    },
    enter() {
      this.dialog = true; // 打开对话框
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
h1, h3 {
  font-family: 'Arial', sans-serif;
}
.v-card {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
</style>
