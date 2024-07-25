<template>
  <div>
    <div v-html="renderedMarkdown"></div>
  </div>
</template>

<script>
  import {marked} from 'marked'

  export default {
    data() {
      return {
        markdownText:
          '# Markdown Example\n\nThis is **bold** text and *italic* text.\n```python\nimport re\nimport numpy as np\n```',
        renderedMarkdown: '',
      }
    },
    mounted() {
      // 在组件加载完成后，将Markdown文本解析为HTML并赋值给renderedMarkdown
      this.renderedMarkdown = marked(this.markdownText)
    },
  }
</script>

<style>
  /* 可选样式 */
</style>
