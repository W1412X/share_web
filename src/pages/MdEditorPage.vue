<template>
  <div>
    <main :style="{ 'justify-content': 'center', 'width': '100%', 'display': 'flex', 'padding-bottom': '50px' }">
      <v-card :style="{ 'max-width': '1000px', 'width': '1000px', 'background-color': '#eef0f4' }">
        <v-row style="margin: 0px; width: 1000px;padding:10px;">
          <div style="margin:10px">
            <v-textarea style="width: 960px;margin-top:20px" v-model="title" label="编辑标题" row-height="10" rows="1"
              variant="outlined" auto-grow></v-textarea>
          </div>
          <div style="width:100%;display: flex;justify-content: center;">
            <markdown-upload-card @alert="alert"></markdown-upload-card>
          </div>
          <div style="width:100%;display: flex;justify-content: center;">
            <article-editor-bar @alert="alert"></article-editor-bar>
          </div>
          <v-btn @click="submit()" color="#9c0c13" variant="outlined" style="width: 960px; margin: 20px">发布</v-btn>
        </v-row>
      </v-card>
    </main>
  </div>
  <v-snackbar :timeout="3000" :color="alertSet.color" v-model="alertSet.state">
    <div class="text-subtitle-1 pb-2">{{ alertSet.title }}</div>
    <p>{{ alertSet.content }}</p>
  </v-snackbar>
</template>
<script>
import ArticleEditorBar from '@/components/ArticleEditorBar.vue';
import MarkdownUploadCard from '@/components/MarkdownUploadCard.vue';
export default {
  components: {
    MarkdownUploadCard,
    ArticleEditorBar,
  },
  data() {
    return {
      alertSet:{
        state:false,
        color:'success',
        title:'',
        content:''
      }
    }
  },
  methods:{
    alert(msg){
      this.alertSet=msg;
    }
  }
}
</script>