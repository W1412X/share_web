<template>
  <LoadingView v-model="progressMsg"></LoadingView>
  <main :style="{ 'justify-content': 'center', 'width': '100%', 'display': 'flex', 'padding-bottom': '50px' }">
    <v-card :style="{ 'max-width': '1000px', 'width': '1000px', 'background-color': '#eef0f4' }">
      <v-row style="margin: 0px; width: 1000px;padding:0px;">
        <v-btn variant="tonal" @click="toMdEditor"
          :style="{ 'max-width': '1000px', 'width': '1000px', 'background-color': 'rgba(0,0,0,0)' }">
          使用Markdown创作？
        </v-btn>
        <div style="margin:10px">
          <SensitiveTextArea style="width: 980px;margin-top:20px" v-model="title" label="编辑标题" row-height="10" rows="1"
            variant="outlined" auto-grow></SensitiveTextArea>
        </div>
        <div style="justify-content: center;width:1000px;margin-left:0px;margin-right:0px;margin-top:0px">
          <v-card style="padding:0px;margin:0px">
            <ArticleEditor ref="editorRef" @alert="alert"></ArticleEditor>
          </v-card>
        </div>
        <div style="justify-content: center;width:1000px;margin-left:0px;margin-right:0px;margin-top:50px">
          <v-card style="padding:0px;margin:0px">
            <ArticleEditorBar ref="editorBarRef" @alert="alert"></ArticleEditorBar>
            <v-btn @click="submit()" color="#9c0c13" variant="outlined" style="width: 960px; margin: 20px">发布</v-btn>
          </v-card>
        </div>
      </v-row>
    </v-card>
  </main>
  <v-snackbar :timeout="3000" :color="alertSet.color" v-model="alertSet.state">
    <div class="text-subtitle-1 pb-2">{{ alertSet.title }}</div>
    <p>{{ alertSet.content }}</p>
  </v-snackbar>
</template>
<script>
import ArticleEditor from '@/components/ArticleEditor.vue';
import ArticleEditorBar from '@/components/ArticleEditorBar.vue';
import SensitiveTextArea from '@/components/SensitiveTextArea.vue';
import { getStatusMessage } from '@/axios/statusCodeMessages';
import { createArticle } from '@/axios/article';
import { useRoute } from 'vue-router';
export default {
  props: {
  },
  data() {
    const alertSet = {
      state: false,
      title: '',
      color: '',
      content: ''
    };
    const title = '';
    const content = '';
    return {
      title,
      alertSet,
      content,
      progressMsg: {
        state: false,
        text: '正在加载',
        progress: -1,
      }
    }
  },
  setup() {

  },
  methods: {
    alert(alertSet) {//接收组件的alert事件
      console.log(this.alertSet);
      this.alertSet = alertSet;
    },
    async submit() {
      console.log(this.$refs.editorBarRef.$data);
      const form = new FormData();
      const editorData = this.$refs.editorRef.$data;
      const barData = this.$refs.editorBarRef.$data;
      form.append('article_title', this.title);
      form.append('content', editorData.html);
      //form.append('imgUrl', barData.imgUrl);
      form.append('origin_link', barData.quoteUrl);
      form.append('type', barData.type);
      form.append('tags', barData.tags);
      form.append('description', barData.description);
      //form.append('fileUrl', barData.fileUrl);
      //检查提交数据是否合法
      if(form.get('article_title').length<=5){
        this.alert({state:true,title:'标题长度过短',content:'标题长度不能小于5个字符',color:'warning'});
        return;
      }else if(form.get('content').length==0){
        this.alert({state:true,title:'文章内容不可为空',content:'请输入文章内容',color:'warning'});
        return;
      }else if(form.get('tags')==''){
        this.alert({state:true,title:'标签不可为空',content:'请输入文章标签',color:'warning'});
        return;
      }else if(form.get('description').length==0){
        form.description='作者很懒，没有添加文章描述';
      }
      this.setLoading({ state: true, text: '上传中...',progress:-1});
      const response = await createArticle(form);
      this.alert(getStatusMessage('common', response.status));
      this.setLoading({ state: false, text: '上传中...',progress:-1});  
      if(response.status==200){
        this.$router.push({ name: 'ArticlePage', params: { id: response.data.id } });
      }
      console.log(form);
    },
    toMdEditor() {
      this.$router.push({ name: 'MdEditorPage' })
    },
    setLoading(msg) {//设置loading状态
      this.progressMsg = msg;
    }
  },
  components: {
    ArticleEditor,
    ArticleEditorBar,
    SensitiveTextArea,
  },
  created() {
    const route = useRoute()
    if (route.params.id) {
      console.log(route.params.id);
      //在这里加载文章的信息
      this.alert({ state: true, color: 'success', title: '加载文章信息成功' });
    } else {
      console.log(route.params.id);
      this.alert({ state: true, color: 'info', title: '新建编辑', content: '新建一个编辑器' });
    }
  },
}
</script>