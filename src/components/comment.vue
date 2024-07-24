<template>
    <v-card
      :style="{'width':'600px','box-shadow':'none','box-radius':'0','border-bottom':'1px solid #8a8a8a'}"
      outline tile
    >
      <v-container :style="{'margin-bottom':'4px'}">
        <v-row>
          <v-col cols="1">
            <v-avatar :style="{width: '35px',height: '35px'}">
              <img :src="profile_url" :style="{'max-width':'100%'}" />
            </v-avatar>
          </v-col>
          <v-col cols="11">
            <v-text :style="{'color':'#8a8a8a','margin-left':'0px'}"
              >{{ name }}
            </v-text>
            <br />
            <v-text :style="{'margin-left':'5px'}">{{ content }}</v-text>
            <br />
            <v-row :style="{width: '100%',height: '30px'}">
              <v-col cols="4" :style="{'font-size':'14px','color':'#8a8a8a'}">
                {{time}}
              </v-col>
              <v-col cols="8">
                <v-row justify="end">
                  <v-col :style="{'max-width':'25px'}">
                    <v-btn
                      elevation="0"
                      icon="mdi-heart-outline"
                      :style="{'width':'25px',
                        'padding':'0px',
                        'height':'25px',
                        'color':'#8a8a8a',            
                        'margin-top':'0px',
                        'margin-right':'0px',
                        'margin-left':'0px',
                        'margin-bottom':'20px'
                        }"
                    />
                  </v-col>
                  <v-col :style="{'max-width':'25px'}">
                    <v-btn
                      elevation="0"
                      icon="mdi-alert-circle-outline"
                      :style="{'width':'25px',
                        'padding':'0px',
                        'height':'25px',
                        'color':'#8a8a8a',            
                        'margin-top':'0px',
                        'margin-right':'0px',
                        'margin-left':'5px',
                        'margin-bottom':'20px'
                        }"
                    />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </template>
  <script>
    export default {
      name: 'ResourceItem',
      props: {
        id: {
          type: String,
          default: '00000000', // 设置id的默认值为 ''
        },
        name: {
          type: String,
          default: 'visitor', // 设置name的默认值为 ''
        },
        content: {
          type: String,
          default: '', // 设置content的默认值为 ''
        },
        likes: {
          type: String,
          default: '1412', // 设置likes的默认值为 ''
        },
        time: {
          type: String,
          default: '2024-09-01 14:12', // 设置time的默认值为 ''
        },
        profile_url: {
          type: String,
          default:
            'https://pic2.zhimg.com/v2-0dda71bc9ced142bf7bb2d6adbebe4f0_r.jpg?source=1940ef5c', // 设置profile_url的默认值为 ''
        },
      },
    }
  </script>
  <style scoped></style>  