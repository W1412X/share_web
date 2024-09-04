<template>
    <v-card style="width: 600px; padding: 5px; border: #8a8a8a solid 1px">
      <div style="font-size: 18px; font-weight: 600; margin-left: 10px">
        报告Bug
      </div>
      <v-combobox
        variant="outlined"
        density="compact"
        style="max-width: 600px; margin: 10px"
        v-model="page"
        :items="pages"
        label="Bug出现页面"
      ></v-combobox>
      <v-textarea
        variant="outlined"
        label="尽可能详细描述您当时遇到Bug时的情况"
        style="margin: 10px"
        v-model="content"
      >
      </v-textarea>
      <div style="display: flex; flex-direction: row-reverse; margin-bottom: 5px">
        <v-btn
          variant="outlined"
          style="
            height: 30px;
            margin-left: 20px;
            color: #9c0c13;
            margin-right: 5px;
          "
          @click="submit()"
          >提交</v-btn
        >
        <v-btn
          @click="cancel()"
          variant="outlined"
          style="height: 30px; margin-left: 20px; color: #9c0c13"
          >取消</v-btn
        >
      </div>
    </v-card>
  </template>
  <script>
    export default {
      props: {},
      data() {
        const content = ''
        const page = ''
        const pages = [
          '文章页面',
          '课程页面',
          '个人页面',
          '作者页面',
          '问题页面',
          '文章编辑页面',
          '其他',
        ]
        return {
          content,
          page,
          pages,
        }
      },
      methods: {
        cancel() {
          this.$emit('close')
        },
        submit() {
          console.log(this.content)
        },
      },
    }
  </script>
  