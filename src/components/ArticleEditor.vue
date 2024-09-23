<template>
  <div style="border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc;width: 1000px;" :editor="editorRef" :defaultConfig="toolbarConfig"
      :mode="mode" />
    <Editor style="width:1000px;min-height: 1000px;" v-model="html" :defaultConfig="editorConfig"
      :mode="mode" @onCreated="handleCreated" />
  </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, shallowRef, inject, defineComponent } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { Boot } from '@wangeditor/editor'
import formulaModule from '@wangeditor/plugin-formula'
import { DomEditor } from '@wangeditor/editor'
export default defineComponent({
  name: 'ArticleEditor',
  props: {
    initialHtml: {
      type: String,
      default: `<p><span style="color: rgb(0, 0, 0); font-size: 24px; font-family: 楷体;"><strong>图片与视频：</strong></span></p>...`
    }
  },
  components: { Editor, Toolbar },
  setup(props, { emit }) {
    const store = inject('store');
    if (!store.state.ifRegisterEditor) {
      Boot.registerModule(formulaModule);
      store.commit('registerEditor');
    }

    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef();

    // 内容 HTML
    const toolbarConfig = {
      excludeKeys: ['fullScreen', 'uploadVideo']
    };

    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });

    const handleCreated = (editor) => {
      editorRef.value = editor; // 记录 editor 实例，重要！
      console.log(editor);
      console.log(editorRef.value);
      console.log("创建编辑器完成");
    };

    const customUpload = (file, insertFn) => {
      // file 即选中的文件
      // 自己实现上传，并得到图片 url alt href
      // 最后插入图片
      console.log(file);
      const imgUrl = 'https://tse4-mm.cn.bing.net/th/id/OIP-C.V_eRvXb8ynCpQ4lsAr65mgHaD6?w=312&h=180&c=7&r=0&o=5&dpr=1.2&pid=1.7';
      insertFn(imgUrl);
      // 使用 emit 发射事件
      emit('alert', {state:true,color:'info',title:'测试提示',content:''});
    };

    const editorConfig = {
      hoverbarKeys: {
        formula: {
          menuKeys: ['editFormula'],
        },
      },
      scroll: false,
      excludeKeys: ['uploadVideo'],
      MENU_CONF: {
        uploadImage: {
          customUpload,
          onProgress(progress) {
            console.log('progress', progress);
          },
          onSuccess(file, res) {
            console.log(`${file.name} 上传成功`, res);
          },
          onFailed(file, res) {
            console.log(`${file.name} 上传失败`, res);
          },
          onError(file, err, res) {
            console.log(`${file.name} 上传出错`, err, res);
          },
        },
      }
    };

    return {
      editorRef,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      handleCreated,
      editorConfig
    };
  },
  methods: {
    test() {
      const toolbar = DomEditor.getToolbar(this.editorRef);
      const curToolBarConfig = toolbar.getConfig();
      console.log(curToolBarConfig);
    },
  },
  created() {
    // 在组件创建时赋值initHtml
  },
  mounted() {
  }
});
</script>
