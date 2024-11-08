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
            v-model="content" ref="editorRef" height="600px"></v-md-editor>
          <markdown-upload-card v-if="createMethod == 'upload'"></markdown-upload-card>
        </div>
        <div style="width:100%;display: flex;justify-content: center;">
          <article-editor-bar ref="editorBarRef" @alert="alert"></article-editor-bar>
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
/**
 * @description:
 * 本控件用户编辑MD格式的文章
 * 目前直接上传压缩包的功能暂未开放
 * 对于编辑已有文章  
 * 通过路由参数id获取文章信息
 * 用户修改文章信息，并保存修改
 */
import { useRoute } from 'vue-router';
import ArticleEditorBar from '@/components/ArticleEditorBar.vue';
import MarkdownUploadCard from '@/components/MarkdownUploadCard.vue';
import SensitiveTextArea from '@/components/SensitiveTextArea.vue';
import { getArticleDetail } from '@/axios/article';
import { getStatusMessage } from '@/axios/statusCodeMessages';
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
      createMethod: 'edit',
      content:'',
      progressMsg: {
        state: false,
        text: '正在加载',
        progress: -1,
      }
    }
  },
  methods: {
    setLoading(msg) {
      this.progressMsg = msg;
    },
    alert(msg) {
      this.alertSet = msg;
    },
    changeCreateMethod() {
      this.alert({state:true,title:'此功能暂未开放',content:'服务器资源限制，暂不支持直接上传压缩包，敬请期待!',color:'info'});
      return;
      /* eslint-disable */
      //先禁用这个功能，后续有需要再拿回来继续开发
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
  },
  async created() {//在这里获取文章的内容并分配到控件  
    const id = useRoute().params.id;
    console.log(id);
    if(id){//这里获取文章的详细信息  
      this.setLoading({state:true,text:'正在加载文章详情...',progress:-1});
      response=await getArticleDetail(id);
      this.setLoading({state:false,text:'正在加载文章详情...',progress:-1});
      this.alert(getStatusMessage('common',response.status));
      if(response.status==200){
        //to do
      }
    }else{//没有传入参数  
      this.alert({state:true,color:'info',title:'新建文章',content:'新建一个文章'});
    }
  },
}
</script>