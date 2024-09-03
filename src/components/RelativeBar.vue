<template>
  <v-btn
    @click="toRelativeUrl"
    variant="tonal"
    color="#8a8a8a"
    style="
      width: 100%;
      padding:0px;
      max-height: 25px;
      border-radius: 50px;
      font-size: 12px;
      font-weight: 600;
    "
    >关联链接</v-btn
  >
</template>
<script>
  export default {
    props: {
      relativeUrl: {
        type: String,
        default: 'https://555.cc',
      },
    },
    setup() {},
    data() {
      return {}
    },
    methods: {
      toRelativeUrl() {
        window.open(this.relativeUrl)
      },
    },
  }
</script>
