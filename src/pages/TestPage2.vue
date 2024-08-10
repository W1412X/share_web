<template>
  <div style="border: 1px solid #ccc">
    <v-btn @click="test()"></v-btn>
    <Editor style="width:900px;height: 100vh; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig"
      :mode="mode" @onCreated="handleCreated" />
  </div>
</template>
<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, inject } from 'vue'
import { Editor } from '@wangeditor/editor-for-vue'
import { Boot } from '@wangeditor/editor'
import formulaModule from '@wangeditor/plugin-formula'
import { DomEditor } from '@wangeditor/editor'
export default {
  props: {
    initialHtml: {
      type: String,
      default: `<p><span style="color: rgb(0, 0, 0); font-size: 24px; font-family: 楷体;"><strong>图片与视频：</strong></span></p><p><span style="color: rgb(0, 0, 0); font-size: 16px;"><strong>支持直接加载网络图片以及上传图片</strong></span></p><p><span style="color: rgb(0, 0, 0); font-size: 16px;"><strong>支持加载网络视频，不支持上传视频</strong></span></p><p><span style="color: rgb(0, 0, 0); font-size: 24px; font-family: 微软雅黑;"><strong>其他样式：</strong></span></p><p><span style="color: rgb(216, 68, 147); font-size: 48px;"><strong>标题</strong></span><span style="font-size: 48px;"><strong> </strong></span><span style="color: rgb(106, 57, 201); font-size: 40px;"><strong>标题</strong></span><span style="font-size: 48px;"><strong> </strong></span><span style="color: rgb(66, 144, 247); font-size: 32px;"><strong>标题</strong></span><span style="font-size: 32px;"><strong> </strong></span><span style="color: rgb(114, 192, 64); font-size: 24px;"><strong>标题</strong></span><span style="font-size: 32px;"><strong> </strong></span><span style="color: rgb(245, 219, 77); font-size: 16px;"><strong>标题</strong></span><span style="font-size: 32px;"><strong> </strong></span><span style="color: rgb(225, 60, 57); font-size: 12px;"><strong>标题</strong></span><span style="font-size: 14px;"><strong> </strong></span><span style="font-size: 22px;"><strong> </strong></span><span style="font-size: 24px;"><strong> </strong></span><span style="font-size: 32px;"><strong> </strong></span></p><p><span style="font-size: 48px;"><strong>😀</strong></span><span style="font-size: 32px;"><strong> </strong></span><span style="font-size: 40px;"><strong>😀</strong></span><span style="font-size: 32px;"><strong> 😀 </strong></span><span style="font-size: 24px;"><strong>😀</strong></span><span style="font-size: 32px;"><strong> </strong></span><span style="font-size: 16px;"><strong>😀</strong></span><span style="font-size: 32px;"><strong> </strong></span><span style="font-size: 12px;"><strong>😀</strong></span><span style="font-size: 32px;"><strong>   </strong></span></p><p><span data-w-e-type="formula" data-w-e-is-void data-w-e-is-inline data-value="\\frac{a}{b} a^2, a_i \\sqrt{a}, \\sqrt[n]{a} \\sum_{i=1}^{n} i, \\int_{a}^{b} x^2 , dx  x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}"></span></p><p> <a href="sss" target="_blank">链接</a> </p><table style="width: auto;"><tbody><tr><th colSpan="1" rowSpan="1" width="auto">111</th><th colSpan="1" rowSpan="1" width="auto">111</th><th colSpan="1" rowSpan="1" width="auto">111</th><th colSpan="1" rowSpan="1" width="auto">111</th></tr><tr><td colSpan="1" rowSpan="1" width="auto">111</td><td colSpan="1" rowSpan="1" width="auto">111</td><td colSpan="1" rowSpan="1" width="auto">111</td><td colSpan="1" rowSpan="1" width="auto">111</td></tr><tr><td colSpan="1" rowSpan="1" width="auto">111</td><td colSpan="1" rowSpan="1" width="auto">111</td><td colSpan="1" rowSpan="1" width="auto">111</td><td colSpan="1" rowSpan="1" width="auto">111</td></tr></tbody></table><pre><code class="language-python">import numpy
import pandas
import os
... ... </code></pre><blockquote>引用部分</blockquote><p><br></p>`
    }
  },
  components: { Editor },
  setup() {
    const store = inject('store');
    if (!store.state.ifRegisterEditor) {
      Boot.registerModule(formulaModule);
      store.commit('registerEditor');
    }
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    // 内容 HTML
    const valueHtml = ref('<p>Hello World!</p>');
    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })
    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
      editor.disable();
      console.log(editor);
      console.log(editorRef.value);
      console.log("创建编辑器完成");
    }
    return {
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      handleCreated,
    };
  },
  methods: {
    test() {
      console.log(this.editorRef);
      console.log(DomEditor.getToolbar(this.editorRef).getConfig().toolbarKeys);
      console.log(this.valueHtml);
    }
  },
  created(){//在组件创建时赋值initHtml
    console.log("创建组件");
    this.valueHtml=this.initialHtml;
  },
  mounted(){
  }
}
</script>
