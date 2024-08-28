<template>
  <div>
    <main :style="{ 'justify-content': 'center', 'width': '100%', 'display': 'flex', 'padding-bottom': '50px' }">
      <v-card :style="{ 'max-width': '1000px', 'width': '1000px', 'background-color': '#eef0f4' }">
        <v-row style="margin: 0px; width: 1000px;padding:0px;">
          <div style="margin:10px">
            <v-textarea style="width: 980px;margin-top:20px" v-model="quoteUrl" label="编辑标题" row-height="10" rows="1"
              variant="outlined" auto-grow></v-textarea>
          </div>
          <div style="justify-content: center;width:1000px;margin-left:0px;margin-right:0px;margin-top:0px">
            <v-card style="padding:0px;margin:0px">
              <ArticleEditor ref="editorRef"></ArticleEditor>
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
  </div>
  <v-snackbar
    :timeout="3000"
    :color="alertSet.color"
    variant="outlined"
    v-model="alertSet.state"
  >
    <div class="text-subtitle-1 pb-2">{{ alertSet.title }}</div>
    <p>{{ alertSet.content }}</p>
  </v-snackbar>
</template>
<script>
import ArticleEditor from '@/components/ArticleEditor.vue';
import ArticleEditorBar from '@/components/ArticleEditorBar.vue';
export default{
    props:{
      id:{
        type:String,
        default:'00000000'
      }
    },
    data(){
      const alertSet={
        state:false,
        title:'',
        color:'',
        content:''
      };
      return {
        alertSet,
      }
    },
    setup(){

    },
    methods:{
      alert(alertSet){//接收组件的alert事件
        console.log(this.alertSet);
        this.alertSet=alertSet;
      },
      submit(){
        console.log(this.$refs.editorBarRef.$data);
        const form=new FormData();
        const editorData=this.$refs.editorRef.$data;
        const barData=this.$refs.editorBarRef.$data;
        form.append('content',editorData.html);
        form.append('imgUrl',barData.imgUrl);
        form.append('quoteUrl',barData.quoteUrl);
        form.append('type',barData.type);
        form.append('description',barData.description);
        form.append('fileUrl',barData.fileUrl);
        console.log(form);
      }
    },
    components:{
        ArticleEditor,
        ArticleEditorBar
    }
}
</script>