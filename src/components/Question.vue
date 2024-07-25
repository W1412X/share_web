<template>
  <v-card :style="{'width':'750px','height':'180px'}">
    <div
      :style="{'font-size':'18px',
        'font-weight':'bold',
        'width':'600px',
        'white-space': 'nowrap',
        'overflow': 'hidden',
        'margin-left':'10px',
        'margin-top':'5px',
        'padding-bottom':'5px',
        'text-overflow': 'ellipsis'}"
    >
      {{question}}
    </div>
    <v-row
      :style="{'margin-left':'5px','margin-right':'5px','margin-bottom':'5px','padding-top':'0px'}"
    >
      <v-col cols="2" :style="{'padding-left':'0px','padding-right':'0px'}">
        <v-img
          :src="img"
          aspect-ratio=":1"
          :cover="true"
          :style="{'height':'120px'}"
        >
        </v-img>
        <div :style="{'text-align':'center'}">
          <span
            :style="{'color':'#8a8a8a','font-size':'12px','font-weight':'400','text-align':'center'}"
            >浏览量: {{ scanCount }}</span
        >
        </div>
      </v-col>
      <v-col
        cols="10"
        :style="{'padding-left':'0px','padding-right':'0px','margin-left':'0px','margin-right':'0px'}"
      >
        <v-col
          :style="{'padding-left':'20px',
            'padding-right':'0px',
            'margin-left':'0px',
            'margin-right':'0px',
            'font-size':'16px',
            'color':'#8a8a8a',
            'line-height':'1.3',
            'max-height':'6em',
            'text-overflow': 'ellipsis',
            'overflow-y': 'hidden',
            'display': '-webkit-box',
            '-webkit-line-clamp': '4',
            '-webkit-box-orient': 'vertical',
          }"
          >这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍
        </v-col>
        <v-btn
          elevation="0"
          icon="mdi-heart-outline"
          :style="{'width':'25px',
            'padding':'0px',
            'height':'25px',
            'color':'#8a8a8a',            
            'margin-top':'15px',
            'margin-left':'550px'
            }"
        >
        </v-btn>
        <v-btn
          elevation="0"
          icon="mdi-alert-circle-outline"
          :style="{'width':'25px',
            'padding':'0px',
            'height':'25px',
            'margin-top':'15px',
            'color':'#8a8a8a',
            'margin-left':'5px'
            }"
        >
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
  export default {
    name: 'QuestionCard',
    props: {
      id: {
        type: String,
        default: '00000000',
      },
      question: {
        type: String,
        default: '这是一个测试问题?',
      },
      description: {
        type: String,
        default: '这是问题的描述',
      },
      img: {
        type: String,
        default:
          'https://tse2-mm.cn.bing.net/th/id/OIP-C.B6see3otwDOwdcSecD_W8QHaHa?w=173&h=180&c=7&r=0&o=5&pid=1.7',
      },
      replyCount: {
        type: String,
        default: '0',
      },
      likeCount: {
        type: String,
        default: '1412',
      },
      authorName: {
        type: String,
        default: 'visitor',
      },
      authorId: {
        type: String,
        default: '00000000',
      },
      scanCount: {
        type: String,
        default: '0',
      },
    },
  }
</script>
