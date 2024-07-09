<template>
  <v-card
    elevation="3"
    :style="{ width: '750px', 'margin-left': '1%', 'margin-top': '20px', height: '175px',display: 'grid', 'place-items': 'center'}"
  >
    <v-row :style="{width:'100%','height':'100%',position:'relative'}">
      <v-col
        :style="{'margin-top':'5px', height:'100%',width:'100%',position:'relative',display: 'grid', 'place-items': 'center','padding':'0px',flex:'19'}"
      >
        <v-img
          class="bg-grey-lighten-2"
          :src="img_src"
          :style="{'padding-left':'8px',position: 'relative', width:'140px',height:'140px',border:'2px','border-radius':'2px',padding:'0px'}"
          cover
          aspect-ratio="1/1"
        >
        </v-img>
        <span
          :style="{'font-size':'14px',color:'#8a8a8a','padding-bottom':'3px'}"
        >
          {{publish_time}}
        </span>
      </v-col>
      <v-col
        :style="{flex:'65',height:'100%',width:'100%',position:'relative','padding':'0px'}"
      >
        <v-card-title
          class="text-overflow-ellipsis"
          :style="{'padding-left':'0px',
          'padding-top':'12px',
          'padding-bottom':'0px',
          'font-size':'18px',
          'line-height':'1.2',
          'padding-right':'20px',
          'overflow': 'hidden',
          'text-overflow': 'ellipsis',
          'white-space': 'nowrap',
          'max-width': '400px'}"
        >
          {{title}}
        </v-card-title>
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
        <v-scrollbar> </v-scrollbar>
        <v-card-text
          :style="{'padding-top':'7px',
        'padding-bottom':'2px',
        'color':'#8a8a8a',
        'display': '-webkit-box',
        '-webkit-line-clamp': '3',
        'overflow': 'scroll',
        'text-overflow': 'ellipsis',
        '-webkit-box-orient': 'vertical',
        'height':'60px',
        'padding-left':'0px',
        'padding-right':'20px'}"
        >
        {{content}}
        </v-card-text>
        <v-row
          :style="{'padding-left':'10px','padding-top':'37px','padding-right':'20px','color':'#8a8a8a','font-size':'13px'}"
          dir="rtl"
        >
          {{ author_name }}@
        </v-row>
      </v-col>
      <v-col
        :style="{flex:'4',height:'100%',width:'100%',position:'relative','padding':'0px','margin-left':'2px'}"
      >
        <div
          :style="{display:'flex',flexDirection:'column-reverse',height:'100%',width:'100%'}"
        >
          <v-avatar
            :style="{width: '25px',height: '25px','margin-top':'11px','padding':'0px','margin-bottom':'6px'}"
          >
            <img
              :src="author_avatar_url"
              :style="{'max-width':'100%'}"
            />
          </v-avatar>
          <v-spacer></v-spacer>
          <v-btn
            elevation="0"
            icon="mdi-alert-circle-outline"
            :style="{'width':'25px',
            'padding':'0px',
            'height':'25px',
            'margin-top':'5px',
            'color':'#8a8a8a',
            'margin-left':'1px'
            }"
          >
          </v-btn>
          <v-btn
            elevation="0"
            icon="mdi-heart-outline"
            :style="{'width':'25px',
            'padding':'0px',
            'height':'25px',
            'color':'#8a8a8a',            
            'margin-top':'10px',
            'margin-left':'2px'
            }"
          >
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  name: 'ResourceItem',
  props: {
    id:String,
    title: String,
    author_avatar_url: String,  
    content: String,  
    publish_time: String,  
    img_src: String,   
    author_name: String
  }

};
</script>