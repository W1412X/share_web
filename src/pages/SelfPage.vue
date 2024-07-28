<template>
    <v-app>
      <v-layout>
        <v-row>
          <v-navigation-drawer expand-on-hover rail>
            <v-list>
              <v-list-item
                prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                subtitle="test@gmailcom"
                title="test"
              ></v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list density="compact" active-color="#9c0c13" nav>
              <v-list-item color="#9c0c13" :prepend-icon="icons.createIcon"  title="创作" value="create" @click="setView('create')"></v-list-item>
              <v-list-item color="#9c0c13" :prepend-icon="icons.starIcon" title="收藏" value="star" @click="setView('star')"></v-list-item>
              <v-list-item color="#9c0c13" :prepend-icon="icons.settingIcon" title="设置" value="setting" @click="setView('setting')"></v-list-item>
            </v-list>
          </v-navigation-drawer>
          <v-col :style="{'margin-left':'55px'}">
            <div v-if="this.currentView==='create'">
              作品界面
            </div>
            <div v-if="this.currentView==='star'">
              收藏界面
            </div>
            <div v-if="this.currentView==='setting'">
              设置界面
              <v-btn @click="logout()">登出</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-layout>
    </v-app>
  </template>
  <script>
  import { useRouter } from 'vue-router';
  import { mapActions } from 'vuex';
  import { mdiPencil,mdiCog,mdiStar } from '@mdi/js';
  export default {
    setup(){
      const router=useRouter();
      const navigateToLogin =() =>{
        router.push({name:'LoginPage'})
      };
      return {
        navigateToLogin,
      }
    },
    data() {
      return {
        icons:{
          createIcon:mdiPencil,
          settingIcon:mdiCog,
          starIcon:mdiStar,
        },
        currentView:'setting'
      };
    },
    methods:{
      ...mapActions(['storeLogout']),
      logout(){
        this.storeLogout();
        this.navigateToLogin();
      },
      setView(view){
        this.currentView=view;
      }
    },
    mounted(){ 
    }
  }
  </script>