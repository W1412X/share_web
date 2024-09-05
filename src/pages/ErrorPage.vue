<template>
  <div style="
      display: flex;
      position: fixed;
      justify-content: center;
      width: 100%;
      padding: 50px;
      height: 100%;
      background-color: #ffffff;
    ">
    <div style="display: flex;flex-direction: column;">
          <div style="
        width: 100%;
        display: flex;
        justify-content: center;
        font-size: 28px;
        font-weight: 600;
      ">
      (￣_￣)・・・  {{reason}}
    </div>
    <div style="
        width: 100%;
        display: flex;
        justify-content: center;
        font-size: 20px;
        font-weight: 600;
        margin-top: 20px;
      ">
      <div style="display: flex;flex-direction: row;">
        <v-btn @click="back()" variant="tonal" color="#9c0c13">返回上一页</v-btn>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import { useRoute } from 'vue-router';

export default{
  data(){
    return {
      reason:'您访问的资源不存在'
    }
  },
  methods:{
    back() {
      // 返回到上一个页面
      window.history.back();
    }
  },
  mounted(){
    const route=useRoute();
    if('reason' in  route.params){
      console.log(route.params.reason);
      this.reason=route.params.reason;
    }
  }
}
</script>