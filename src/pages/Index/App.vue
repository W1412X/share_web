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
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-upload</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-history</v-icon>
        </v-btn>
        <v-btn icon @click="navigateToSelf">
          <v-icon>mdi-account-outline</v-icon>
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
import ResourceItem from '@/components/ResourceItem.vue';
import {useRouter} from 'vue-router';
export default {
  setup() {

    const router = useRouter();
    const navigateToIndex = () => {
      router.push({ name: 'Index' }); // 使用路由名称跳转
    };
    const navigateToSelf = () => {
      router.push('/Self'); // 直接使用路径跳转
    };
    return {
      navigateToIndex,
      navigateToSelf,
    };
  },
  components: {
    ResourceItem, // 确保在这里注册了组件
  },
  data() {
    return {
      inputValue: '',
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
  },
  mounted() {
    this.load_items();
  }
}
</script>