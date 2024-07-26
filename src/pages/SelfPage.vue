<template>
    <v-app>
      <v-layout>
        <v-navigation-drawer expand-on-hover rail>
          <v-list>
            <v-list-item
              prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
              subtitle="sandra_a88@gmailcom"
              title="Sandra Adams"
            ></v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list density="compact" active-color="#9c0c13" nav>
            <v-list-item color="#9c0c13" prepend-icon="mdi-folder"  title="资源" value="sources"></v-list-item>
            <v-list-item color="#9c0c13" prepend-icon="mdi-email" title="消息" value="messages"></v-list-item>
            <v-list-item color="#9c0c13" prepend-icon="mdi-star" title="收藏" value="starred"></v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-layout>
    </v-app>
  </template>
  <script>
  import {computed} from 'vue'
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  export default {
    setup(){
      const router=useRouter();
      const store=useStore();
      const user= computed(() => store.getters.getUser);
      const navigateToLogin =() =>{
        router.push({name:'LoginPage'})
      };
      return {
        user,
        router,
        navigateToLogin,
      }
    },
    data() {
      return {
      };
    },
    methods:{
      checkLoginState(){//检查登陆状态，游客状态就跳转到登陆界面
        if(this.user.id=='00000000'){
          window.alert('请登陆');
          this.navigateToLogin();
        }
      },
    },
    mounted(){
      this.checkLoginState();  
    }
  }
  </script>