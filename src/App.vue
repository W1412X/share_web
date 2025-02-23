<!-- src/App.vue -->
<template>
  <v-app>
    <!--
    <div v-if="deviceType === 'mobile'" class="nav-bar">
      <v-btn rounded="0" variant="text" color="#ffffff" icon="mdi-menu"></v-btn>
    </div>
    -->
    <loading-view :init-data="loadMsg">
    </loading-view>
    <v-snackbar :timeout="3000" :color="alertMsg.color" v-model="alertMsg.state">
      <div v-if="alertMsg.title" class="title">{{ alertMsg.title }}</div>
      <p v-if="alertMsg.content" class="text-medium">{{ alertMsg.content }}</p>
    </v-snackbar>
    <router-view class="router-view" @alert="alert" @set_loading="set_loading"/>
  </v-app>
</template>
<script>
import { ref } from 'vue';
import LoadingView from './components/LoadingView.vue';
export default {
  setup() {
    /**
     * get the device type
     */
    const deviceType = ref('');
    if (window.innerWidth <= 600) {
      deviceType.value = 'mobile';
    } else {
      deviceType.value = 'desktop';
    }
    return {
      deviceType
    }
  },
  components:{
    LoadingView,
  },
  data() {
    return {
      alertMsg: {
        state: false,
        color: null,
        title: null,
        content: null,
      },
      loadMsg: {
        state: false,
        text: '加载中...',
        progress: -1,
      },
    }
  },
  methods: {
    alert(msg) {
      this.alertMsg = msg;
    },
    set_loading(msg){
      this.loadMsg=msg;
    }
  },
  mounted() {
    console.log(this.deviceType)
  }
};
</script>
<style scoped>
/** desktop */
@media screen and (min-width: 600px) {
  .nav-bar {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    background-color: var(--theme-color);
  }

  .router-view {
    width: 100vw;
    max-width: 100vw;
  }
}

/** mobile */
@media screen and (max-width: 600px) {
  .nav-bar {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    background-color: var(--theme-color);
  }

  .transparent-btn {
    background-color: transparent;
  }

  .router-view {
    width: 100vw;
    max-width: 100vw;
  }
}
</style>
