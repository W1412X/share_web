<template>

  <v-card elevation="3" :style="{ width: '750px', 'margin-left': '10%', 'margin-top': '20px', height: '170px', position: 'relative' }">

    <v-row>

      <v-col cols="12" sm="6" md="4" lg="3" :style="{ 'margin-left': '3px', 'margin-bottom': '3px', 'margin-top': '3px', 'margin-right': '3px', width: '150px', position: 'relative' }">

        <v-img @click="showAlert" :lazy-src="img_src" :src="img_src" aspect-ratio="1" :style="{ width: '140px', height: '140px', 'margin-top': '4px', 'margin-left': '4px', position: 'relative' }" cover />

        <span :style="{ width: '100px', color: '#8a8a8a', 'font-size': '12px', 'position': 'relative', 'margin-top': '5px', 'margin-left': '5px' }">{{ publish_time }}</span>

      </v-col>
                <v-col cols="12" sm="6" md="4" lg="3"
                  :style="{'margin-left':'4px','margin-bottom':'1px','margin-top':'4px',width:'590px'}"
                >
                  <v-row :style="{'margin-top':'0px',height:'35px'}">
                    <v-card-title
                      :style="{
                      'display': '-webkit-box',
                      '-webkit-line-clamp': '1',
                      'font-size': '20px',
                      'line-height': '1',
                      'font-family': 'Arial, sans-serif'
                      }"
                      >{{title}}</v-card-title
                    >
                  </v-row>
                  <v-row :style="{height:'20px'}">
                    <v-card-subtitle width="520px"
                      >{{subtitle}}</v-card-subtitle
                    >
                  </v-row>
                  <v-row>
                    <v-card-text
                      width="520px"
                      height="20px"
                      :style="{
                      'display': '-webkit-box',
                      '-webkit-line-clamp': '2',
                      '-webkit-box-orient': 'vertical',  
                      'overflow': 'scroll',
                      'font-size': '12px',
                      'line-height': '1.2',
                      'margin-top':'4px'
                      }"
                      >积极
                    </v-card-text>
                  </v-row>
                  <v-row
                    width="520px"
                    :style="{display:'flex','flex-direction':'row-reverse','margin-top':'px'}"
                  >
                    <span
                      :style="{width:'100px','color':'#8a8a8a', 'font-size': '13px','position':'relative','margin-top':'17px'}"
                      >@{{author_name}}</span
                    >
                    <v-avatar
                      :style="{width: '25px',height: '25px','margin-right':'10px','margin-top':'15px'}"
                      @click="toAuthorPage"
                    >
                      <img
                        :src="img_src"
                        :style="{'max-width':'100%'}"
                      />
                    </v-avatar>
                  </v-row>
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
    subtitle: String,
    author_avatar_url: String,  
    content: String,  
    publish_time: String,  
    img_src: String,   
    author_name: String
  }

};
</script>