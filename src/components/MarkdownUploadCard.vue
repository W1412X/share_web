<template>
  <v-card style="padding: 10px;width:960px">
    <div style="display: flex; flex-direction: column">
      <div style="font-size: 20px; font-weight: 600">使用Markdown创作</div>
      <div style="font-size: 16px; font-weight: 600; color: #8a8a8a">
        说明:
        <span style="margin-left: 5px">本站不提供Markdown编辑器功能，您可以直接上传打包的Markdown压缩包，其中要求压缩包目录结构如下</span>
        <br />
        <span style="margin-left: 40px">打包的文件夹名称为 article</span>
        <br />
        <span style="margin-left: 40px">图片资源放置在 article/images 目录下</span>
        <br />
        <span style="margin-left: 40px">Markdown 源文件为 article/README.md
        </span>
        <br />
      </div>
      <div style="
            display: flex;
            flex-direction: row;
            margin-top: 10px;
            align-items: center;
          ">
        <v-btn variant="outlined" style="font-size: 16px; color: #8a8a8a; margin-left: 20px">示例文件</v-btn>
        <v-file-input variant="outlined" density="compact" v-model="this.file" @change="handleFileChange"
          style="max-width: 400px; margin-left: 20px; margin-top: 20px" label="File input"></v-file-input>
      </div>
      <div></div>
    </div>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      file: null,
    }
  },
  methods: {
    handleFileChange(event) {
      //在此组件中仅提供选择文件的代码，在编辑器页面中发布文章时同时上传资源
      const selectedFile = event.target.files[0]
      const allowTypes = ['application/zip']
      if (!allowTypes.includes(selectedFile.type)) {
        this.$emit('alert', {
          state: true,
          color: 'warning',
          title: '不支持此文件类型',
          content: '你只可以上传你打包好的压缩包文件',
        })
        this.file = null
        return
      }
      const maxSize = 20 * 1024 * 1024 //设置上传文件的最大大小为100m
      if (selectedFile.size > maxSize) {
        this.$emit('alert', {
          state: true,
          color: 'warning',
          title: '文件大小超过限制',
          content: '要求你的压缩包大小小于20M',
        })
        this.file = null
        return
      }
      this.file = selectedFile
      //这时开始上传资源
      const fileForm = new FormData()
      fileForm.append('file', this.file)
      this.file = selectedFile
    },
  },
}
</script>