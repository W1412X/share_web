<template>
  <v-card
    color="rgba(0,0,0,0.3)"
    @click="downloadSource"
    style="padding: 5px;margin:5px"
    variant="outlined"
  >
    <div style="display: flex; flex-direction: row">
      <svg-icon type="mdi" :path="icons.file" size="20"></svg-icon>
      <span style="font-size: 18px; color: #8a8a8a;font-size: 14px;margin-left:10px;font-weight: 600;"
        >{{ sourceName }}</span
      >
    </div>
  </v-card>
</template>
<script>
  import { mdiPaperclip } from '@mdi/js'
  import SvgIcon from '@jamescoyle/vue-icon'
  export default {
    props: {
      sourceName: {
        type: String,
        default: '资源的名称',
      },
      sourceLink: {
        type: String,
        default: 'http://www.nnana.com/test.zip',
      },
    },
    components: {
      SvgIcon,
    },
    data() {
      return {
        icons: {
          file: mdiPaperclip,
        },
      }
    },
    methods: {
      downloadSource() {
        window.open(this.sourceLink)
      },
    },
  }
</script>
