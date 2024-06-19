<template>
  <v-layout>
    <v-row>
      <v-app-bar color="#9c0c13">
        <v-app-bar-title>资源分享</v-app-bar-title>
        <v-autocomplete
          v-model="inputValue"
          type="text"
          ref="search_input"
          class="search_input"
          label="search"
          :items="['计算机图形学', '数据结构', '机器学习', '自主机器人', '计算机网络', '操作系统']"
          variant="outlined"
        ></v-autocomplete>
        <v-btn icon @click="showAlert">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-upload</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-history</v-icon>
        </v-btn>
        <v-btn icon @click="toSelfPage">
          <v-icon>mdi-account-outline</v-icon>
        </v-btn>
      </v-app-bar>
      <v-main>
        <v-container fluid>
          <v-row ref='item_container' dense>
            <v-card
              elevation="3"
              :style="{'width':'750px','margin-left':'10%','margin-top':'20px','height':'170px',position:'relative'}"
            >
              <v-row>
                <v-col
                  :style="{'margin-left':'3px','margin-bottom':'3px','margin-top': '3px','margin-right':'3px',width:'150px',position:'relative'}"
                >
                  <v-img
                    @click="showAlert"
                    :lazy-src="`https://picsum.photos/10/6?image=10`"
                    :src="`http://39.101.160.55/source/IMG_202406194002_100x100.png`"
                    aspect-ratio="1"
                    :style="{width:'140px',height:'140px','margin-top':'4px','margin-left':'4px',position:'relative'}"
                    cover
                  />
                  <span
                    :style="{width:'100px','color':'#8a8a8a', 'font-size': '12px','position':'relative','margin-top':'5px','margin-left':'5px'}"
                    >时间 2024-2-12 20:00</span
                  >
                </v-col>
                <v-col
                  :style="{'margin-left':'4px','margin-bottom':'1px','margin-top':'4px',width:'590px'}"
                >
                  <v-row :style="{'margin-top':'0px',height:'35px'}">
                    <v-card-title
                      :style="{
                      'display': '-webkit-box',
                      '-webkit-line-clamp': '1',
                      'font-size': '20px',
                      'line-height': '1',
                      'font-family': 'Arial, sans-serif'
                      }"
                      >这是标题部分</v-card-title
                    >
                  </v-row>
                  <v-row :style="{height:'20px'}">
                    <v-card-subtitle width="520px"
                      >这是副标题部分</v-card-subtitle
                    >
                  </v-row>
                  <v-row>
                    <v-card-text
                      width="520px"
                      height="20px"
                      :style="{
                      'display': '-webkit-box',
                      '-webkit-line-clamp': '2',
                      '-webkit-box-orient': 'vertical',  
                      'overflow': 'scroll',
                      'font-size': '12px',
                      'line-height': '1.2',
                      'margin-top':'4px'
                      }"
                      >这是简介部分ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                    </v-card-text>
                  </v-row>
                  <v-row
                    width="520px"
                    :style="{display:'flex','flex-direction':'row-reverse','margin-top':'px'}"
                  >
                    <span
                      :style="{width:'100px','color':'#8a8a8a', 'font-size': '13px','position':'relative','margin-top':'17px'}"
                      >@W1412X</span
                    >
                    <v-avatar
                      :style="{width: '25px',height: '25px','margin-right':'5px','margin-top':'15px'}"
                      @click="toAuthorPage"
                    >
                      <img
                        src="https://pic4.zhimg.com/v2-02665279a4cff59469f1bb959260ffb7_r.jpg?source=1940ef5c"
                        :style="{'max-width':'100%'}"
                      />
                    </v-avatar>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
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
  export default {
    data() {
      return {
        inputValue: 'Initial Value',
      }
    },
    methods: {
      showAlert() {
        // 获取v-autocomplete组件的值
        const iv = this.$refs.search_input.inputValue
        // 弹出警告框显示文本框内容
        alert(iv)
      },
      toSelfPage() {
        //点击个人头像跳转到个人信息界面
      },
      toAuthorPage() {

      },
      add_item_card(title,subtitle,content,img_url,time,author_avatar_url,author_name){//向对应的列表中添加item  
      
      }
    },
  }
</script>
