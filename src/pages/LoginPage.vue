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
              <LoginItem  @processed="showNotification" />
            </v-card-text>
          </v-card>
        </v-layout>
      </v-container>
      <v-alert
        v-if="ifShowRedAlert"
        variant="outlined"
        :style="{ 'position': 'fixed',
                  'top': '20px',
                  'left': '50%',
                  'width': '150px',
                  'height': '40px',
                  'transform': 'translateX(-50%)',
                  'text-align':'center',
                  'color':'#ff0000',
                  'background-color': 'rgba(255, 0, 0, 0.2)','padding': '10px 20px',
                  'border': '1px solid rgba(255, 0, 0, 0.3)',
                  'border-radius': '4px','z-index': '1000'}"
      >{{ redAlertMessage }}</v-alert>
      <v-alert
        v-if="ifShowGreenAlert"
        variant="outlined"
        :style="{ 'position': 'fixed',
                  'top': '20px',
                  'left': '50%',
                  'width': '150px',
                  'height': '40px',
                  'transform': 'translateX(-50%)',
                  'text-align':'center',
                  'color':'#00ee00',
                  'background-color': 'rgba(0, 255, 0, 0.1)','padding': '10px 20px',
                  'border': '1px solid rgba(0, 255, 0, 0.2)',
                  'border-radius': '4px','z-index': '1000'}"
        >{{ greenAlertMessage }}</v-alert>
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
    return{
      ifShowRedAlert:false,
      ifShowGreenAlert:false,
      redAlertMessage:'',
      greenAlertMessage:'',
    }
  },
  methods:{
    showNotification(message){
      if(message.color=='red'){
        this.redAlertMessage=message.content;
        this.showRedAlert();
      }else{
        this.greenAlertMessage=message.content;
        this.showGreenAlert();
      }
    },
    showGreenAlert(){
      this.ifShowGreenAlert = true;
      setTimeout(() => {
        this.ifShowGreenAlert = false;
      }, 5000);
    },
    showRedAlert(){
      this.ifShowRedAlert = true;
      setTimeout(() => {
        this.ifShowRedAlert = false;
      }, 5000);
    },
  },
  mounted(){
  },
};
</script>