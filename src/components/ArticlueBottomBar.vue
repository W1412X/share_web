<template>
    <v-card
      :style="{'width':'1000px','max-width':'1000px','height':'50px','box-shadow':'none','box-radius':'0','border-top':'1px solid #8a8a8a','border-bottom':'1px solid #8a8a8a','position':'fixed','justify-content':'center','bottom':'0'}"
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
          <svg-icon type="mdi" :path="icons.star" size="25" :style="{'color':'#8a8a8a','margin-left':'5px','margin-right':'8px'}"></svg-icon>
          <svg-icon type="mdi" :path="icons.commentQuestion" @click="this.showComment()" size="25" :style="{'color':'#8a8a8a','margin-left':'8px','margin-right':'8px'}"></svg-icon>
          <svg-icon type="mdi" :path="icons.alertCircle" size="25" :style="{'color':'#8a8a8a','margin-left':'8px','margin-right':'20px'}"></svg-icon>
        </v-col>
      </v-row>
    </v-card>
  </template>
  
  <script>
    import SvgIcon from '@jamescoyle/vue-icon';
    import { mdiStar,mdiAlertCircle,mdiCommentQuestion } from '@mdi/js';
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
      components:{
        SvgIcon,
      },
      data(){
        return{
          icons:{
            star:mdiStar,
            alertCircle:mdiAlertCircle,
            commentQuestion:mdiCommentQuestion,
          }
        }
      },
      methods: {
        showComment(){
          this.$emit('get_comment',null);
        },
      },
    }
  </script>
  