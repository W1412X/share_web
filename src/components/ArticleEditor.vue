<template>
  <btn @click="test">test</btn>
  <div style="border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc;width: 1000px;" :editor="editorRef" :defaultConfig="toolbarConfig"
      :mode="mode" />
    <Editor style="width:1000px;min-height: 1000px;" v-model="html" :defaultConfig="editorConfig"
      :mode="mode" @onCreated="handleCreated" />
  </div>
</template>
<script>
import { editorUploadImage } from '@/utils/api'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, shallowRef, inject } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { Boot } from '@wangeditor/editor'
import formulaModule from '@wangeditor/plugin-formula'
import { DomEditor } from '@wangeditor/editor'
export default {
  name:'ArticleEditor',
  props: {
    initialHtml: {
      type: String,
      default: `<p><span style="color: rgb(0, 0, 0); font-size: 24px; font-family: 楷体;"><strong>图片与视频：</strong></span></p><p><span style="color: rgb(0, 0, 0); font-size: 16px;"><strong>支持直接加载网络图片以及上传图片</strong></span></p><p><span style="color: rgb(0, 0, 0); font-size: 16px;"><strong>支持加载网络视频，不支持上传视频</strong></span></p><p><span style="color: rgb(0, 0, 0); font-size: 24px; font-family: 微软雅黑;"><strong>其他样式：</strong></span></p><p><span style="color: rgb(216, 68, 147); font-size: 48px;"><strong>标题</strong></span><span style="font-size: 48px;"><strong> </strong></span><span style="color: rgb(106, 57, 201); font-size: 40px;"><strong>标题</strong></span><span style="font-size: 48px;"><strong> </strong></span><span style="color: rgb(66, 144, 247); font-size: 32px;"><strong>标题</strong></span><span style="font-size: 32px;"><strong> </strong></span><span style="color: rgb(114, 192, 64); font-size: 24px;"><strong>标题</strong></span><span style="font-size: 32px;"><strong> </strong></span><span style="color: rgb(245, 219, 77); font-size: 16px;"><strong>标题</strong></span><span style="font-size: 32px;"><strong> </strong></span><span style="color: rgb(225, 60, 57); font-size: 12px;"><strong>标题</strong></span><span style="font-size: 14px;"><strong> </strong></span><span style="font-size: 22px;"><strong> </strong></span><span style="font-size: 24px;"><strong> </strong></span><span style="font-size: 32px;"><strong> </strong></span></p><p><span style="font-size: 48px;"><strong>😀</strong></span><span style="font-size: 32px;"><strong> </strong></span><span style="font-size: 40px;"><strong>😀</strong></span><span style="font-size: 32px;"><strong> 😀 </strong></span><span style="font-size: 24px;"><strong>😀</strong></span><span style="font-size: 32px;"><strong> </strong></span><span style="font-size: 16px;"><strong>😀</strong></span><span style="font-size: 32px;"><strong> </strong></span><span style="font-size: 12px;"><strong>😀</strong></span><span style="font-size: 32px;"><strong>   </strong></span></p><p><span data-w-e-type="formula" data-w-e-is-void data-w-e-is-inline data-value="\\frac{a}{b} a^2, a_i \\sqrt{a}, \\sqrt[n]{a} \\sum_{i=1}^{n} i, \\int_{a}^{b} x^2 , dx  x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}"></span></p><p> <a href="sss" target="_blank">链接</a> </p><table style="width: auto;"><tbody><tr><th colSpan="1" rowSpan="1" width="auto">111</th><th colSpan="1" rowSpan="1" width="auto">111</th><th colSpan="1" rowSpan="1" width="auto">111</th><th colSpan="1" rowSpan="1" width="auto">111</th></tr><tr><td colSpan="1" rowSpan="1" width="auto">111</td><td colSpan="1" rowSpan="1" width="auto">111</td><td colSpan="1" rowSpan="1" width="auto">111</td><td colSpan="1" rowSpan="1" width="auto">111</td></tr><tr><td colSpan="1" rowSpan="1" width="auto">111</td><td colSpan="1" rowSpan="1" width="auto">111</td><td colSpan="1" rowSpan="1" width="auto">111</td><td colSpan="1" rowSpan="1" width="auto">111</td></tr></tbody></table><pre><code class="language-python">import numpy
import pandas
import os
... ... </code></pre><blockquote>引用部分</blockquote><p><br></p>`
    }
  },
  components: { Editor, Toolbar },
  setup() {
    const store = inject('store');
    if (!store.state.ifRegisterEditor) {
      Boot.registerModule(formulaModule);
      store.commit('registerEditor');
    }
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    // 内容 HTML
    const editorConfig = {
      hoverbarKeys: {
        formula: {
          menuKeys: ['editFormula'],
        },
      },
      // 其他配置项
      MENU_CONF: {}
    };
    editorConfig.scroll=false;
    editorConfig.MENU_CONF['uploadImage'] = {
      customUpload(file, insertFn) {
        // file 即选中的文件
        // 自己实现上传，并得到图片 url alt href
        // 最后插入图片
        console.log(file);
        const data = new FormData();
        data.append('file', file);
        const response = editorUploadImage(data)
          .then(data => {
            console.log(response);
            console.log("上传成功");
            console.log(data)
            //上传成功
            if (data.errno == 0) {
              console.log(data.data.url)
              insertFn(data.data.url, '', '');
            } else {//失败
              console.log(data.message);
            }
          })
          .catch(error => {//异常
            console.log(error);
          });
      },
      // 上传进度的回调函数
      onProgress(progress) {
        // progress 是 0-100 的数字
        console.log('progress', progress)
      },
      // 单个文件上传成功之后
      onSuccess(file, res) {
        console.log(`${file.name} 上传成功`, res)
      },
      // 单个文件上传失败
      onFailed(file, res) {
        console.log(`${file.name} 上传失败`, res)
      },
      // 上传错误，或者触发 timeout 超时
      onError(file, err, res) {
        console.log(`${file.name} 上传出错`, err, res)
      },
    };
    const toolbarConfig = {
      excludeKeys:[
        'fullScreen',
        'uploadVideo'
      ]
      // 其他配置项
    };
    /*toolbarConfig.excludeKeys=[//取出上传视频的工具
      'group-video'
    ]*/
    editorConfig.MENU_CONF['uploadVideo'] = {
      customUpload(file, insertFn) {  // TS 语法
        console.log(file);
        console.log(insertFn);
        window.alert('暂不支持上传视频')
      }
    }
    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })
    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
      console.log(editor);
      console.log(editorRef.value);
      console.log("创建编辑器完成");
    }
    return {
      editorRef,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      store
    };
  },
  data(){
    const html=this.initialHtml;
    return{
      html,
    }
  },
  methods: {
    test() {
      const toolbar=DomEditor.getToolbar(this.editorRef)
      const curToolBarConfig=toolbar.getConfig();
      console.log(curToolBarConfig);
    }
  },
  created(){//在组件创建时赋值initHtml
  },
  mounted(){
  }
}
</script>
