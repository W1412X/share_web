<template>
    <v-card
      :style="{width:'100%',height:'350px',display:'relative','margin-top':'50px'}"
    >
      <v-tabs v-model="type" bg-color="indigo-darken-2" fixed-tabs>
        <v-tab
          :style="{background:'#9c0c13','font-size':'18px'}"
          value="article"
          text="文章"
        ></v-tab>
        <v-tab
          :style="{background:'#9c0c13','font-size':'18px'}"
          value="question"
          text="问答"
        ></v-tab>
        <v-tab
          :style="{background:'#9c0c13','font-size':'18px'}"
          value="source"
          text="资源"
        ></v-tab>
      </v-tabs>
    </v-card>
  </template>
  <script>
    export default {
      setup() {},
      data() {
        const type = 'article'
        return {
          type,
        }
      },
    }
  </script>
  