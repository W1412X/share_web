<template>
  <v-app>
    <!-- 使用 v-app 根元素以确保填充整个视口 -->
    <v-main>
      <!-- v-main 用于适应内容到视口的大小 -->
      <v-container fluid fill-height>
        <!-- fluid 属性使容器占据整个视口宽度，fill-height 使容器占据整个视口高度 -->
        <v-layout align-center justify-center>
          <!-- align-center 和 justify-center 分别垂直和水平居中子元素 -->
          <v-card width="100%" height="100%">
            <!-- 设置卡片的宽高为100%，但这样会导致溢出，因此使用内部的flex布局 -->
            <v-card-text class="text-center">
              <LoginItem  />
            </v-card-text>
          </v-card>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
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
  setup(){
    const router=useRouter();
    const store=useStore();
    const user=computed(()=> store.getters.getUser);
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
  data(){

  },
  methods:{
  },
  mounted(){
  },
};
</script>