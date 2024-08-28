<template>
  <div :style="{ 'justify-content': 'center', 'width': '100%', 'display': 'flex', 'padding': '25px' }">
    <v-card style="
            width: 1000px;
            padding: 0px;
            margin: 0px;
            border: 1px solid #8a8a8a;
          ">
      <v-row style="margin: 20px; padding: 0px; width: 960px">
        <div style="width: 960px; margin-top: 10px; display: flex">
          <div style="margin-right: 10px">
            <span style="color: #8a8a8a">文章标签:</span>
              <v-tooltip activator="parent"  style="margin-left: 2px;margin-bottom: 8px;" location="top">添加标签方便检索以使你的文章更容易被精确搜索</v-tooltip>
              <svg-icon type="mdi" :path="icons.question" color="#8a8a8a" size="18"
                :style="{ 'padding-top': '0px', 'margin-bottom': '0px', 'margin-left': '5px' }"></svg-icon>
          </div>
          <div>
            <div v-if="ifShowTagInput" style="display: flex;flex-direction: row;margin: 10px;">
              <v-textarea v-model="inputTag" style="width: 200px" label="输入标签" row-height="1" rows="1"
                variant="outlined" auto-grow></v-textarea>
              <v-btn @click="confirmAddTag()" style="margin-top: 10px;margin-left: 10px;height: 30px;"
                variant="outlined" color="#9c0c13">确认添加</v-btn>
            </div>
            <v-btn color="#9c0c13" @click="ifShowTagInput = true" variant="outlined" style="
                    height: 25px;
                    margin-bottom: 5px;
                    margin-left: 3px;
                    margin-right: 3px;
                  ">+ 添加标签
            </v-btn>
            <v-btn v-for="(tag, index) in tags" :key="index" color="#9c0c13" :text="tag" variant="outlined" style="
                    height: 25px;
                    margin-bottom: 5px;
                    margin-left: 3px;
                    margin-right: 3px;
                  ">{{ tag }}
            </v-btn>
            <v-btn color="#9c0c13" @click="deleteLastTag()" variant="outlined" style="
                    height: 25px;
                    margin-bottom: 5px;
                    margin-left: 3px;
                    margin-right: 3px;
                  ">- 删除标签
            </v-btn>
          </div>
        </div>
        <div style="width: 960px; margin-top: 10px; display: flex">
          <div style="margin-right: 10px">
            <span style="color: #8a8a8a">文章封面:</span>
              <v-tooltip  style="margin-left: 2px;margin-bottom: 8px;" activator="parent" location="top">添加封面图使你的文章更具吸引力</v-tooltip>
              <svg-icon type="mdi" :path="icons.question" color="#8a8a8a" size="18"
                :style="{ 'padding-top': '0px', 'margin-bottom': '0px', 'margin-left': '5px' }"></svg-icon>
          </div>
          <div>
            <v-img :width="259" aspect-ratio="1/1" cover :src="imgUrl"></v-img>
          </div>
        </div>
        <div style="width: 960px; margin-top: 20px; display: flex">
          <div style="margin-right: 10px;margin-top: 20px;">
            <span style="color: #8a8a8a">文章摘要:</span>
              <v-tooltip  style="margin-left: 2px;margin-bottom: 8px;" activator="parent" location="top">添加文章摘要为你的文章添加简介</v-tooltip>
              <svg-icon type="mdi" :path="icons.question" color="#8a8a8a" size="18"
                :style="{ 'padding-top': '0px', 'margin-bottom': '0px', 'margin-left': '5px' }"></svg-icon>
          </div>
          <div>
            <v-textarea style="width: 750px" label="添加不多于200字的简介" variant="outlined" v-model="description"></v-textarea>
          </div>
        </div>
        <div style="width: 960px; margin-top: 10px; display: flex">
          <div style="margin-right: 10px">
            <span style="color: #8a8a8a">文章类型:</span>
              <v-tooltip  style="margin-left: 2px;margin-bottom: 8px;" activator="parent" location="top">创作类型声明，会展示在文章头部等明显位置<br />•
                原创：平台鼓励和保护原创内容<br />•
                转载：转载请确认原文允许转载，或者您已经获得原文作者授权。<br />•
                翻译：翻译请注明来源，或者您已经获得原文作者授权翻译。</v-tooltip>
              <svg-icon type="mdi" :path="icons.question" color="#8a8a8a" size="18"
                :style="{ 'padding-top': '0px', 'margin-bottom': '0px', 'margin-left': '5px' }"></svg-icon>
          </div>

          <div>
            <div style="display: flex">
              <div style="margin-bottom: 10px;">

                <v-btn variant="outlined" :color="type == '原创' ? '#9c0c13' : '#8a8a8a'"
                  :style="{ 'margin': '5px', 'width': '20px', 'height': '20px', 'font-size': '10px' }"
                  @click="type = '原创'">
                  原创
                </v-btn>
                <v-btn variant="outlined" :color="type == '转载' ? '#9c0c13' : '#8a8a8a'"
                  :style="{ 'margin': '5px', 'width': '20px', 'height': '20px', 'font-size': '10px' }"
                  @click="type = '转载'">
                  转载
                </v-btn>

              </div>
            </div>
            <v-textarea density="compact" v-if="type == '转载'" v-model="quoteUrl" label="转载文章url" row-height="10" rows="1"
              variant="outlined" auto-grow></v-textarea>
          </div>
        </div>
        <div style="
            width: 960px;
            margin-top: 10px;
            margin-bottom: 10px;
            display: flex;
          ">
          <div style="margin-right: 10px; margin-top: 20px">
            <span style="color: #8a8a8a">上传资源:</span>
              <v-tooltip activator="parent" style="margin-left: 2px;margin-bottom: 8px;" location="top">上传你的文章的绑定资源</v-tooltip>
              <svg-icon type="mdi" :path="icons.question" color="#8a8a8a" size="18"
                :style="{ 'padding-top': '0px', 'margin-bottom': '0px', 'margin-left': '5px' }"></svg-icon>
          </div>
          <div style="margin-left: -15px; margin-top: 10px">
            <v-file-input width="300px" density="compact" label="File input"></v-file-input>
          </div>
        </div>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import { mdiHelpCircleOutline } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon'
export default {
  name: 'ArticleEditorBar',
  props: {
    article: {
      type: Object,
      default: function () {
        return {
          id: '00000000',
          tags: ['测试标签'],
          imgUrl: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
          description: '这是描述',
          type: '转载',
          quoteUrl: 'http://quote.html',
        }
      },
    },
  },
  setup() { },
  components: {
    SvgIcon,
  },
  data() {
    const icons = {
      question: mdiHelpCircleOutline
    }
    //根据传入的信息初始化对应的属性
    const tags = this.article.tags;
    const imgUrl = this.article.imgUrl;
    const description = this.article.description;
    const type = this.article.type;
    const quoteUrl = this.article.quoteUrl;
    //传入的输入标签
    const inputTag = '';
    //是否显示输入标签的输入框  
    const ifShowTagInput = false;
    const alertSet={
      state:true,
        title:'TEST',
        text:'message',
        color:'success',
    };
    return {
      icons,
      tags,
      imgUrl,
      description,
      type,
      quoteUrl,
      inputTag,
      ifShowTagInput,
      alertSet,
    }
  },
  methods: {
    confirmAddTag() {
      if(this.inputTag==''){//标签为空，则直接返回
        const msg={
          state:true,
          title:'标签不可为空',
          content:'',
          color:'warning'
        }
        this.$emit('alert',msg);
        return;
      }
      if(this.tags.length>5){//标签的数量最多为五个
        const msg={
          state:true,
          title:'最多可添加 5 个标签',
          content:'',
          color:'warning'
        }
        this.$emit('alert',msg);
        return;
      }
      this.tags.push(this.inputTag);
      this.inputTag = '';
      this.ifShowTagInput = false;
    },
    deleteLastTag() {
      if(this.tags.length==0){
        const msg={
          state:true,
          title:'无法继续删除标签',
          content:'',
          color:'warning'
        }
        this.$emit('alert',msg);
        return;
      }
      this.tags.pop();
    },
    alert(){
      console.log(this.alertSet);
      this.$emit('alert',this.alertSet);
      console.log(this.alertSet);
    },
  },
}
</script>
