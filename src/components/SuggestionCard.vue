<template>
    <v-card style="width:600px;padding: 5px; border: #8a8a8a solid 1px">
      <div style="font-size: 18px; font-weight: 600; margin-left: 10px">建议</div>
      <v-textarea
        variant="outlined"
        label="输入您对此网站的构建建议"
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
        return {
          content,
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
  