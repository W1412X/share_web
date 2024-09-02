
<template>
  <v-snackbar
    :timeout="3000"
    :color="alertSet.color"
    v-model="alertSet.state"
  >
    <div class="text-subtitle-1 pb-2">{{ alertSet.title }}</div>
    <p>{{ alertSet.content }}</p>
  </v-snackbar>
  <v-app style="width: 100%;justify-content: center;">
    <v-layout style="width: 100%;justify-content: center;">
      <v-row style="width: 100%;justify-content: center;">
        <v-navigation-drawer expand-on-hover rail>
          <v-list>
            <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" subtitle="test@gmailcom"
              title="test"></v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list density="compact" color="#9c0c13" nav>
            <v-list-item color="#9c0c13" :prepend-icon="'mdi-pencil'" title="创作" value="create"
              @click="setView('create')"></v-list-item>
            <v-list-item color="#9c0c13" :prepend-icon="'mdi-star'" title="收藏" value="star"
              @click="setView('star')"></v-list-item>
            <v-list-item color="#9c0c13" :prepend-icon="'mdi-account-plus'" title="关注" value="follow"
              @click="setView('follow')"></v-list-item>
            <v-list-item color="#9c0c13" :prepend-icon="'mdi-email-alert'" title="消息" value="message"
              @click="setView('message')"></v-list-item>
            <v-list-item color="#9c0c13" :prepend-icon="'mdi-account'" title="个人" value="account"
              @click="setView('account')"></v-list-item>
            <v-list-item color="#9c0c13" :prepend-icon="'mdi-cog'" title="设置" value="setting"
              @click="setView('setting')"></v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-col :style="{'margin-left':'55px','width':'100%','justify-content': 'center'}">
          <div style="width: 100%;display: flex;justify-content: center;">
            <div v-if="this.currentView==='create'" style="display: flex;flex-direction: column;padding: 10px;">
            <self-create></self-create>
          </div>
          <div v-if="this.currentView==='star'" style="display: flex;flex-direction: column;padding: 10px;">
            <self-star></self-star>
          </div>
          <div v-if="this.currentView==='follow'" style="display: flex;flex-direction: column;padding: 10px;">
            <div style="width:100%;display: flex; flex-direction: column;justify-content: center;">
              <user-message-reader v-for="(user,index) in this.followUserList" :key="index" :user="user" v-bind:if-with-introduce="false"></user-message-reader>
            </div>
          </div>
          <div v-if="this.currentView==='setting'" style="display: flex;flex-direction: column;padding: 10px;">
            <setting-card></setting-card>
          </div>
          <div v-if="this.currentView==='message'" style="width:100%;display: flex;flex-direction: column;padding: 10px;">
            <div style="width:100%;display: flex; justify-content: center;">
              <div style="display: flex;flex-direction: column;">
                <message-bar v-for="(message,index) in messageList" :key="index" :message="message"></message-bar>
              </div>
            </div>
          </div>
          <div v-if="this.currentView==='account'"
            style="display: flex;justify-content: center;flex-direction: column;width: 100%;">
            <div style="display: flex;justify-content: center;">
              <div style="display: flex; flex-direction: column;">
                <user-message-editor @alert="alert"></user-message-editor>
              </div>
            </div>
          </div>
          </div>
        </v-col>
      </v-row>
    </v-layout>
  </v-app>
</template>
  <script>
  import SettingCard from '@/components/SettingCard.vue';
  import { useRouter } from 'vue-router';
  import { mapActions } from 'vuex';
import UserMessageEditor from '@/components/UserMessageEditor.vue';
import '@mdi/font/css/materialdesignicons.css';
import MessageBar from '@/components/MessageBar.vue';
import UserMessageReader from '@/components/UserMessageReader.vue';
import SelfCreate from '@/components/SelfCreate.vue';
import SelfStar from '@/components/SelfStar.vue';
import {useRoute} from 'vue-router'
  export default {
    setup(){
      const router=useRouter();
      const navigateToLogin =() =>{
        router.push({name:'LoginPage'})
      };
      const userName='';
      return {
        userName,
        navigateToLogin,
      }
    },
    components:{
      UserMessageEditor,
      MessageBar,
      UserMessageReader,
      SelfCreate,
      SelfStar,
      SettingCard,
    },
    data() {
      const messageList=[//消息列表
        {//一个示例
          content: '这是信息',
            userName: 'test',
            time: '2022-09-01 08:00',
            userId: '00000000',
            type: '新增问题',//类型分为新增问题(文章)，新增回答(问题),以及被@
            relativeItemType:'article',//article/question
            relativeItemId:'00000000',
        },
        {
          content: '这是信息',
            userName: 'test',
            time: '2022-09-01 08:00',
            userId: '00000000',
            type: '新增问题',//类型分为新增问题(文章)，新增回答(问题),以及被@
            relativeItemType:'article',//article/question
            relativeItemId:'00000000',
        },
        {
          content: '这是信息',
            userName: 'test',
            time: '2022-09-01 08:00',
            userId: '00000000',
            type: '新增问题',//类型分为新增问题(文章)，新增回答(问题),以及被@
            relativeItemType:'article',//article/question
            relativeItemId:'00000000',
        }
      ];
      const followUserList=[//关注者列表
        {
          userId: '00000000',
            userName: 'test',
            followState: false,
            introduce:'这是介绍部分',
            profileUrl:
              'https://tse1-mm.cn.bing.net/th/id/OIP-C.PO7d9IfnPUy2RO173QYt6wHaHV?w=216&h=213&c=7&r=0&o=5&pid=1.7',
        },
        {
          userId: '00000000',
            userName: 'test',
            followState: false,
            introduce:'这是介绍部分',
            profileUrl:
              'https://tse1-mm.cn.bing.net/th/id/OIP-C.PO7d9IfnPUy2RO173QYt6wHaHV?w=216&h=213&c=7&r=0&o=5&pid=1.7',
        },
        {
          userId: '00000000',
            userName: 'test',
            followState: false,
            introduce:'这是介绍部分',
            profileUrl:
              'https://tse1-mm.cn.bing.net/th/id/OIP-C.PO7d9IfnPUy2RO173QYt6wHaHV?w=216&h=213&c=7&r=0&o=5&pid=1.7',
        }
      ];
      return {
        messageList,
        followUserList,
        currentView:'setting',
        alertSet: {
          color: 'success',
          title: '登陆成功',
          content: '登陆成功',
          state: false,
        }
      };
    },
    methods:{
      ...mapActions(['storeLogout']),
      alert(alertSet){//接收组件的alert事件
        console.log(alertSet);
        this.alertSet=alertSet;
      },
      logout(){
        this.storeLogout();
        this.navigateToLogin();
      },
      setView(view){
        this.currentView=view;
      },
    },
    onMounted(){
      const route=useRoute();
      this.userName=route.params.name;
      console.log('Load self page',this.userName);
    }
  }
  </script>