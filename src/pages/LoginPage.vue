<template>
  <LoadingView v-model="progressMsg"></LoadingView>
  <main>
    <!-- 使用 main 根元素以确保填充整个视口 -->
    <v-main>
      <!-- v-main 用于适应内容到视口的大小 -->
      <v-container fluid fill-height>
        <!-- fluid 属性使容器占据整个视口宽度，fill-height 使容器占据整个视口高度 -->
        <v-layout align-center justify-center>
          <!-- align-center 和 justify-center 分别垂直和水平居中子元素 -->
          <v-card width="100%" height="100%">
            <!-- 设置卡片的宽高为100%，但这样会导致溢出，因此使用内部的flex布局 -->
            <v-card-text class="text-center">
              <LoginItem @alert="showNotification" />
            </v-card-text>
          </v-card>
        </v-layout>
      </v-container>
    </v-main>
  </main>
  <v-snackbar :timeout="3000" :color="alertSet.color" v-model="alertSet.state">
    <div class="text-subtitle-1 pb-2">{{ alertSet.title }}</div>
    <p>{{ alertSet.content }}</p>
  </v-snackbar>
</template>

<style scoped>
.text-center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>

<script>
import { computed } from 'vue';
import LoginItem from '../components/LoginItem.vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const user = computed(() => store.getters.getUser);
    const navigateToIndex = () => {
      router.push({ name: 'IndexPage' }); // 使用路由名称跳转
    };
    return {
      router,
      user,
      navigateToIndex,
    }
  },
  components: {
    LoginItem,
  },
  data() {
    return {
      alertSet: {
        color: 'success',
        title: '登陆成功',
        content: '登陆成功',
        state: false,
      },
      progressMsg: {
        state: false,
        text: '正在加载',
        progress: -1,
      }
    }
  },
  methods: {
    showNotification(message) {
      this.alertSet = message;
    },
  },
  created() {
  },
};
</script>