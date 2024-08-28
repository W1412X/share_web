<template>
  <v-card
    elevation="3"
    :style="{ width: '750px', 'margin': '5px', height: '175px',display: 'grid', 'place-items': 'center'}"
  >
    <v-row :style="{width:'100%','height':'100%',position:'relative'}">
      <v-col
        :style="{'margin-top':'5px', height:'100%',width:'100%',position:'relative',display: 'grid', 'place-items': 'center','padding':'0px',flex:'19'}"
      >
        <v-img
          class="bg-grey-lighten-2"
          :src="article.imgUrl"
          :style="{'padding-left':'8px',position: 'relative', width:'140px',height:'140px',border:'2px','border-radius':'2px',padding:'0px'}"
          cover
          @click="navigateToArticle"
          aspect-ratio="1/1"
        >
        </v-img>
        <span
          :style="{'font-size':'14px',color:'#8a8a8a','padding-bottom':'3px'}"
        >
          {{article.publishTime}}
        </span>
      </v-col>
      <v-col
        @click="navigateToArticle"
        :style="{flex:'65',height:'100%',width:'100%',position:'relative','padding':'0px'}"
      >
        <v-card-title
          class="text-overflow-ellipsis"
          :style="{'padding-left':'0px',
          'padding-top':'12px',
          'padding-bottom':'0px',
          'font-size':'18px',
          'font-style':'bold',
          'line-height':'1.2',
          'padding-right':'20px',
          'overflow': 'hidden',
          'text-overflow': 'ellipsis',
          'white-space': 'nowrap',
          'max-width': '400px'}"
        >
          {{article.title}}
        </v-card-title>
        <div style="display: flex;flex-direction: row;">
          <div
            :no-gutters="true"
            :style="{'max-width':'100px','margin-top':'10px','margin-left':'15px','margin-right':'0px','padding-left':'0px','padding-right':'0px'}"
          >
            <div style="display: flex;flex-direction: row;">
              <svg-icon type="mdi" :path="icon.viewCount" size="18" color="#8a8a8a" :style="{'padding-top':'0px','margin-bottom':'0px','margin-left':'5px'}"></svg-icon>
              <div :style="{'margin-left':'5px','font-size':'14px','color':'#8a8a8a',}">{{ article.scanCount }}</div>
            </div>
          </div>
          <div
            :style="{'max-width':'100px','margin-top':'10px','margin-left':'10px','margin-right':'0px','padding-left':'0px','padding-right':'0px'}"
          >
            <div style="display: flex;flex-direction: row;">
              <svg-icon type="mdi" :path="icon.heartCount" size="18" color="#8a8a8a" :style="{'padding-top':'0px','margin-bottom':'0px','margin-left':'5px'}"></svg-icon>
              <div :style="{'margin-left':'4px','font-size':'14px','color':'#8a8a8a'}">{{ article.likeCount }}</div>
            </div>
          </div>
          <div
            :style="{'max-width':'100px','margin-top':'10px','margin-left':'10px','margin-right':'50px','padding-left':'0px','padding-right':'0px'}"
          >
          <div style="display: flex;flex-direction: row;">
              <svg-icon type="mdi" :path="icon.replyCount" size="18" color="#8a8a8a" :style="{'padding-top':'0px','margin-bottom':'0px','margin-left':'5px'}"></svg-icon>
              <div :style="{'margin-left':'4px','font-size':'14px','color':'#8a8a8a'}"> {{ article.replyCount }} </div>
          </div>
        </div>
        </div>
        <v-row
          :style="{'margin-top':'0px','padding-top':'6px','padding-bottom':'12px','padding-left':'10px','font-size':'16px','font-style':'bold','color':'#8a8a8a'}"
          >标签：
          <v-btn
            :style="{'height':'20px','font-size':'12px'}"
            color="#9c0c13"
            variant="outlined"
            rounded
          >
            计算机
          </v-btn>
        </v-row>
        <v-card-text
          :style="{'padding-top':'7px',
        'padding-bottom':'2px',
        'color':'#8a8a8a',
        'display': '-webkit-box',
        '-webkit-line-clamp': '3',
        'overflow-y': 'hidden',
        'text-overflow': 'ellipsis',
        '-webkit-box-orient': 'vertical',
        'line-height':'1.4',
        'height':'4.5em',
        'padding-left':'0px',
        'padding-right':'20px'}"
        >
          {{article.description}}
        </v-card-text>
        <v-row
          v-if="status=='reader'"
          :style="{'padding-left':'10px','padding-top':'37px','padding-right':'20px','color':'#8a8a8a','font-size':'13px'}"
          dir="rtl"
        >
          {{ article.authorName }}@
        </v-row>
      </v-col>
      <v-col
        :style="{flex:'4',height:'100%',width:'100%',position:'relative','padding':'0px','margin-left':'2px'}"
      >
        <div
          :style="{display:'flex',flexDirection:'column-reverse',height:'100%',width:'100%'}"
        >
          <v-avatar
            v-if="status=='reader'"
            :style="{width: '25px',height: '25px','margin-top':'11px','padding':'0px','margin-bottom':'6px'}"
          >
            <img :src="article.profileUrl" :style="{'max-width':'100%'}" />
          </v-avatar>
          <v-spacer></v-spacer>
          <v-btn
            v-if="status=='reader'"
            elevation="0"
            icon
            :style="{'width':'25px',
            'padding':'0px',
            'height':'25px',
            'margin-top':'5px',
            'color':'#8a8a8a',
            'margin-left':'1px',
            }"
          >
            <svg-icon type="mdi" :path="icon.alert"></svg-icon>
          </v-btn>
          <v-btn
            v-if="status=='reader'"
            elevation="0"
            icon
            :style="{'max-width':'25px',
            'padding-left':'0px',
            'max-height':'25px',
            'color':'#8a8a8a',            
            'margin-top':'10px',
            'margin-left':'2px',
            'border-radius': '100%',

            }"
          >
            <svg-icon type="mdi" :path="icon.heart"></svg-icon>
          </v-btn>
          <v-btn
            v-if="status=='writer'"
            elevation="0"
            icon
            :style="{'width':'25px',
            'padding':'0px',
            'height':'25px',
            'margin-top':'5px',
            'color':'#8a8a8a',
            'margin-left':'1px',
            }"
          >
            <svg-icon type="mdi" :path="icon.delete"></svg-icon>
          </v-btn>
          <v-btn v-if="status=='writer'"
            elevation="0"
            icon
            :style="{'max-width':'25px',
            'padding-left':'0px',
            'max-height':'25px',
            'color':'#8a8a8a',            
            'margin-top':'10px',
            'margin-left':'2px',
            'border-radius': '100%',

            }"
          >
            <svg-icon type="mdi" :path="icon.edit"></svg-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
  import SvgIcon from '@jamescoyle/vue-icon'
  import { mdiAlertCircleOutline, mdiEye, mdiHeart, mdiHeartOutline, mdiMessage, mdiPencilCircleOutline, mdiStar, mdiTrashCanOutline } from '@mdi/js'
  import { useRouter } from 'vue-router'
  export default {
    props: {
      status: {
        type: String,
        default: 'writer', //reader,writer,manager
      },
      article: {
        type: Object,
        default: function () {
          return {
            id: '00000000',
            title: '这是文章标题',
            tags: ['计算机', '测试'],
            description:
              '这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介这是文章简介',
            publishTime: '2022-09-01 00:00',
            imgUrl:
              'https://tse2-mm.cn.bing.net/th/id/OIP-C.B6see3otwDOwdcSecD_W8QHaHa?w=173&h=180&c=7&r=0&o=5&pid=1.7',
            authorName: '测试用户',
            profileUrl:
              'https://tse1-mm.cn.bing.net/th/id/OIP-C.PO7d9IfnPUy2RO173QYt6wHaHV?w=216&h=213&c=7&r=0&o=5&pid=1.7',
            likeCount:'99999',
            scanCount:'99999',
            replyCount:'99999',
          }
        },
      },
    },
    setup() {
      const router = useRouter()
      const navigateToArticle = () => {
        router.push({ name: 'ArticlePage' })
      }
      return {
        navigateToArticle,
      }
    },
    data() {
      return {
        icon: {
          alert: mdiAlertCircleOutline,
          heart: mdiHeartOutline,
          delete: mdiTrashCanOutline,
          edit:mdiPencilCircleOutline,
          viewCount:mdiEye,
          starCount:mdiStar,
          replyCount:mdiMessage,
          heartCount:mdiHeart,
        },
      }
    },
    methods: {},
    components: {
      SvgIcon,
    },
    name: 'ArticleItem',
  }
</script>
