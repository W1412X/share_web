<template>
    <v-card
      :style="{'width':'1000px','max-width':'1000px','height':'50px','box-shadow':'none','box-radius':'0','border-top':'1px solid #8a8a8a','border-bottom':'1px solid #8a8a8a'}"
    >
      <v-row :style="{'margin-top':'0px'}">
        <v-col>
          <v-avatar
            size="25"
            :style="{'margin-top':'0px','margin-right':'0px','margin-left':'10px','font-size':'14px'}"
          >
            <v-img :src="avatarUrl"></v-img>
          </v-avatar>
          <span
            :style="{'margin-top':'0px','margin-right':'10px','margin-left':'10px','font-size':'14px'}"
            >{{ authorName }}</span
          >
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="4" class="text-right" :style="{}">
          <v-icon
            icon="mdi-star"
            size="25"
            :style="{'color':'#8a8a8a','margin-left':'0px','margin-right':'5px'}"
          ></v-icon>
          <v-icon
            icon="mdi-comment-question"
            size="25"
            :style="{'color':'#8a8a8a','margin-left':'5px','margin-right':'5px'}"
          ></v-icon>
          <v-icon
            icon="mdi-alert-circle"
            size="25"
            :style="{'color':'#8a8a8a','margin-left':'5px','margin-right':'20px'}"
          ></v-icon>
        </v-col>
      </v-row>
    </v-card>
  </template>
  
  <script>
    export default {
      props: {
        articleId: {
          type: String,
          default: '00000000',
        },
        authorId: {
          type: String,
          default: '00000000',
        },
        avatarUrl: {
          type: String,
          default:
            'https://pic2.zhimg.com/v2-0dda71bc9ced142bf7bb2d6adbebe4f0_r.jpg?source=1940ef5c',
        },
        authorName:{
          type:String,
          default:'游客',
        }
      },
      method: {},
    }
  </script>
  