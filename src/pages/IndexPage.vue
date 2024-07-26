<template>
  <v-layout>
    <v-row>
      <v-app-bar color="#9c0c13">
        <v-app-bar-title>资源分享</v-app-bar-title>
        <v-autocomplete
          v-model="inputValue"
          type="text"
          ref="searchInput"
          class="search_input"
          label="search"
          :items="['计算机图形学', '数据结构', '机器学习', '自主机器人', '计算机网络', '操作系统']"
          variant="outlined"
        ></v-autocomplete>
        <v-btn icon>
          <svg-icon type="mdi" :path="icon.magnify"></svg-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon>
          <svg-icon type="mdi" :path="icon.upload"></svg-icon>
        </v-btn>
        <v-btn icon>
          <svg-icon type="mdi" :path="icon.history"></svg-icon>
        </v-btn>
        <v-btn icon @click="navigateToSelf">
          <svg-icon type="mdi" :path="icon.account"></svg-icon>
        </v-btn>
      </v-app-bar>
      <v-main>
        <v-container fluid>
          <v-row ref="item_container">

    <ResourceItem
      v-for="resource in items"
      :key="resource.id"
      :title="resource.title"
      :subtitle="resource.subtitle"
      :author_avatar_url="resource.author_avatar_url"
      :content="resource.content"
      :publish_time="resource.publish_time"
      :img_src="resource.img_src"
      :author_name="resource.author_name"
    />
          </v-row>
        </v-container>
      </v-main>
    </v-row>
  </v-layout>
</template>

<style scoped>
  .search_input {
    position: relative;
    margin-bottom: 10%;
    height: 80%;
    margin-top: 10%;
  }
</style>

<style scoped>
  .search_input {
    position: relative;
    margin-bottom: 10%;
    height: 80%;
    margin-top: 10%;
  }
</style>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiMagnify,mdiHistory,mdiUpload,mdiAccountOutline } from '@mdi/js'
import ResourceItem from '@/components/ResourceItem.vue';
import {useRouter} from 'vue-router';
import {computed} from 'vue'
import { useStore } from 'vuex';
export default {
  setup() {
    const router = useRouter();
    const navigateToIndex = () => {
      router.push({ name: 'IndexPage' }); // 使用路由名称跳转
    };
    const navigateToSelf = () => {
      router.push({name: 'SelfPage'});
    };
    const navigateToLogin =() =>{
      router.push({name:'LoginPage'})
    }
    const store=useStore();
    const user= computed(() => store.getters.getUser);
    return {
      user,
      router,
      navigateToIndex,
      navigateToSelf,
      navigateToLogin,
    };
  },
  components: {
    ResourceItem, // 确保在这里注册了组件
    SvgIcon,
  },
  data() {
    return {
      icon:{
        magnify:mdiMagnify,
        history:mdiHistory,
        account:mdiAccountOutline,
        upload:mdiUpload,
      },
      search_content: 'RECOMMAND',
      user_id:'00000000',//用户ID  
      user_name: 'visitor',//用户名称
      items: [],//存储要渲染的项目数据 
    }
  },
  methods: {
    showAlert() {
      // 获取v-autocomplete组件的值
      const iv = this.inputValue; 
      console.log(iv)
      // 弹出警告框显示文本框内容
      alert(iv)
    },
    load_items() {
      const new_item={
        title: '资源标题',
        author_avatar_url: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.6szqS1IlGtWsaiHQUtUOVwHaQC?rs=1&pid=ImgDetMain',
        content: '资源简介内诉讼诉讼诉讼诉讼诉讼诉讼诉讼诉讼诉讼诉讼诉讼诉讼诉讼诉讼诉讼诉讼诉讼诉讼诉讼诉讼诉讼诉讼诉讼诉讼诉讼诉讼诉讼诉讼诉讼诉讼诉讼诉讼容',
        publish_time: '2024-05-16 08:20',
        img_src: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.6szqS1IlGtWsaiHQUtUOVwHaQC?rs=1&pid=ImgDetMain',
        author_name: '作者名称',
      }
      this.items.push(new_item)
    },
    checkLoginState(){//检查登陆状态，游客状态就跳转到登陆界面
      if(this.user.id=='00000000'){
        window.alert('请登陆');
        this.navigateToLogin();
      }
    },
  },
  mounted(){
    this.checkLoginState();
    this.load_items();
  }
}
</script>