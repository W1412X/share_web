<template>
  <LoadingView v-model="progressMsg"></LoadingView>
  <main :style="{ 'justify-content': 'center', 'width': '100%', 'display': 'flex', 'padding-bottom': '50px' }">
    <v-card :style="{ 'max-width': '1000px', 'width': '1000px', 'background-color': '#eef0f4' }">
      <v-row style="margin: 0px; width: 1000px;padding:10px;">
        <v-btn variant="tonal" color="#9c0c13" style="width: 100%;height: 30px;" @click="changeCreateMethod">{{
          createMethod == 'edit' ? '直接上传压缩包？' :'使用在线编辑器' }}</v-btn>
        <div style="margin:10px;margin-bottom: 5px;">
          <sensitive-text-area style="width: 960px;margin-top:20px" v-model="title" label="编辑标题" row-height="10"
            rows="1" variant="outlined" auto-grow></sensitive-text-area>
        </div>
        <div style="width:100%;display: flex;justify-content: center;">
          <v-md-editor v-if="createMethod == 'edit'" :disabled-menus="[]" @upload-image="handleUploadImage"
            v-model="article.content" height="600px"></v-md-editor>
          <markdown-upload-card v-if="createMethod == 'upload'"></markdown-upload-card>
        </div>
        <div style="width:100%;display: flex;justify-content: center;">
          <article-editor-bar @alert="alert"></article-editor-bar>
        </div>
        <v-btn @click="submit()" color="#9c0c13" variant="outlined" style="width: 960px; margin: 20px">发布</v-btn>
      </v-row>
    </v-card>
  </main>
  <v-snackbar :timeout="3000" :color="alertSet.color" v-model="alertSet.state">
    <div class="text-subtitle-1 pb-2">{{ alertSet.title }}</div>
    <p>{{ alertSet.content }}</p>
  </v-snackbar>
</template>
<script>
import ArticleEditorBar from '@/components/ArticleEditorBar.vue';
import MarkdownUploadCard from '@/components/MarkdownUploadCard.vue';
import SensitiveTextArea from '@/components/SensitiveTextArea.vue';
export default {
  components: {
    ArticleEditorBar,
    SensitiveTextArea,
    MarkdownUploadCard,
  },
  data() {
    return {
      alertSet: {
        state: false,
        color: 'success',
        title: '',
        content: ''
      },
      article: {
        id: '00000000',
        title: '标题',
        authorName: '作者名称',
        authorProfileUrl: 'https://pic2.zhimg.com/v2-0dda71bc9ced142bf7bb2d6adbebe4f0_r.jpg?source=1940ef5c',
        publishTime: '2024-09-01 00:00',
        tags: ['计算机', '测试'],
        starCount: '0',
        scanCount: '0',
        replyCount: '0',
        content: '',
        type: '转载',
        originLink: 'https://sss',//如果文章类型为转载，反之为'',
        sourceUrl: 'https://sss.zip',//如果文章含有资源，反之为'',
        sourceName: '这是资源',
      },
      createMethod: 'edit',
      progressMsg: {
        state: false,
        text: '正在加载',
        progress: -1,
      }
    }
  },
  methods: {
    alert(msg) {
      this.alertSet = msg;
    },
    changeCreateMethod() {
      if (this.createMethod == 'edit') {
        this.createMethod = 'upload';
      } else {
        this.createMethod = 'edit';
      }
    },
    handleUploadImage(event, insertImage, files) {
      // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
      console.log(files)
      // 此处只做示例
      insertImage({
        url:
          'https://tse4-mm.cn.bing.net/th/id/OIP-C.V_eRvXb8ynCpQ4lsAr65mgHaD6?w=312&h=180&c=7&r=0&o=5&dpr=1.2&pid=1.7',
        desc: '在这里编辑图片描述',
        width: 'auto',
        height: 'auto',
      });
      this.alert({ state: true, color: 'success', title: '上传成功', content: '图片上传成功，现在您可以调整图片大小以及添加图片描述' })
    },
  }
}
</script>