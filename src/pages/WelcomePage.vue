<template>
  <v-app>
    <v-container fluid class="d-flex align-center justify-center" style="height: 100vh;">
      <v-card class="text-center pa-5" outlined elevation="12" :style="{ backgroundColor: backgroundColor }">
        <div class="mb-4">
          <h1 class="display-1 font-weight-bold">这是一个大学学习助手</h1>
          <h3 class="font-weight-light">旨在分享大学生活中的学习资源，以及提供一些常见问题的解答，课程选择的建议</h3>
        </div>
        <v-btn @click="enter" color="primary" class="mb-4" large>进入网站</v-btn>
        <div>
          <v-btn @click="toAuthorPage(wx)" color="secondary" class="mx-2">@W1412X</v-btn>
          <v-btn @click="toAuthorPage(wh)" color="secondary" class="mx-2">@zzysssigm</v-btn>
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
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      wx: 'https://github.com/W1412X',
      wh: 'https://github.com/zzysssigm',
      backgroundColor: '#f9f9f9',
      dialog: false, // 控制对话框显示的变量
    };
  },
  methods: {
    toAuthorPage(url) {
      window.open(url, '_blank');
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
