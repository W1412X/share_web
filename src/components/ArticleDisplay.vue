<template>
    <div style="border: 1px solid #ccc">
      <Editor :style="{ 'width': this.width,'height': '100vh','overflow-y': 'hidden'}" v-model="html" :defaultConfig="editorConfig"
        :mode="mode" @onCreated="handleCreated" />
    </div>
  </template>
  <script>
  import '@wangeditor/editor/dist/css/style.css' // 引入 css
  import { onBeforeUnmount, ref, shallowRef, inject , computed } from 'vue'
  import { Editor } from '@wangeditor/editor-for-vue'
  import { Boot } from '@wangeditor/editor'
  import formulaModule from '@wangeditor/plugin-formula'
  //import { DomEditor } from '@wangeditor/editor'
  export default {
    props: {
      initialHtml: {
        type: String,
        default: ''
      },
      type:{
        type:String,//取值为mobile/pc 分别对应移动端和pc端
        default: 'pc'
      },
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
    data(){
      const html=this.initialHtml;
      const width=computed(()=>{
        return this.type==='pc'?'1000px':'100vw';
      })
      return{
        html,
        width
      }
    },
    methods: {
    },
    created(){//在组件创建时赋值initHtml
    },
    mounted(){
    }
  }
  </script>
  