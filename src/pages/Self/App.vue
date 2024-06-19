<template>
  <v-app>
    <v-layout>
      <v-navigation-drawer expand-on-hover rail>
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            subtitle="sandra_a88@gmailcom"
            title="Sandra Adams"
          ></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list density="compact" active-color="#9c0c13" nav>
          <v-list-item color="#9c0c13" prepend-icon="mdi-folder"  title="资源" value="sources"></v-list-item>
          <v-list-item color="#9c0c13" prepend-icon="mdi-email" title="消息" value="messages"></v-list-item>
          <v-list-item color="#9c0c13" prepend-icon="mdi-star" title="收藏" value="starred"></v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      drawer: null
    };
  }
}
</script>