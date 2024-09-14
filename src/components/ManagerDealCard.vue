<template>
    <v-card style="width: 750px; padding: 10px" variant="outlined">
      <div style="display: flex; flex-direction: column">
        <div style="display: flex; flex-direction: row">
          <div style="margin-right: 20px; font-weight: 600; margin-top: 5px">
            受理类型:{{}}
          </div>
          <div @click="toUser" style="font-weight: 600; margin-top: 5px">
            请求用户:
            <span
              style="color: rgba(0, 116, 232, 0.8); text-decoration: underline"
              >ssss</span
            >
          </div>
          <v-spacer></v-spacer>
          <v-btn
            style="
              margin-right: 20px;
              height: 30px;
              margin-left: 30px;
              border-radius: 50px;
              color: #0074e8;
              font-weight: 600;
            "
            variant="tonal"
            >关联项目</v-btn
          >
        </div>
        <div
          @click="toUser"
          style="
            font-weight: 600;
            margin-top: 5px;
            display: flex;
            flex-direction: row;
          "
        >
          详情:
          <div style="margin-left: 10px">{{item.content}}</div>
        </div>
        <div style="display: flex; flex-direction: row-reverse; margin-top: 10px">
          <v-btn
            @click="deal"
            variant="outlined"
            style="height: 30px; margin-right: 20px"
            >{{ dealButtonText }}</v-btn
          >
        </div>
        <div
          v-if="ifDealing"
          style="
            display: flex;
            flex-direction: row;
            margin-top: 10px;
            padding: 10px;
            border: #8a8a8a solid 1px;
            border-radius: 10px;
          "
        >
          <v-select
            variant="outlined"
            style="max-width: 100px; margin-right: 10px"
            :items="items"
            density="compact"
            v-model="reply.type"
            label="处理类型"
          ></v-select>
          <v-textarea
            rows="1"
            v-model="reply.content"
            variant="outlined"
            density="compact"
            style="max-width: 450px"
          ></v-textarea>
          <v-btn
            variant="outlined"
            style="margin-left: 20px; max-height: 30px; margin-top: 2px"
            >提交</v-btn
          >
        </div>
      </div>
    </v-card>
  </template>
  
  <script>
    export default {
      props: {
        item: {
          type: Object,
          default: function () {
            return {
              id: '00000000',
              type: '举报受理', //受理类型分为 举报受理，建议受理，BUG受理，申请解封
              content: 'sssssssssss',
              userName:'visitor',
              relativeUrl: '',
            }
          },
        },
      },
      setup() {},
      data() {
        var items=[]
        if(this.item.type=='举报受理'){
            items=['封禁此项', '警告作者', '驳回用户']
        }else if(this.item.type=='申诉'){
            items= ['驳回申诉', '同意解封'];
        }else if(this.item.type=='建议'){
            items=['接收建议']
        }else{
            items=['收到']
        }
        const reply={
            type:'',
            content:'',
        }
        return {
          items,
          ifDealing: false,
          dealButtonText: '处理',
          reply,
        }
      },
      methods: {
        toUser() {
          this.$router.push({name:'AuthorPage',params:{name:this.item.userName}})
        },
        deal() {
          if (this.ifDealing) {
            this.ifDealing = false
            this.dealButtonText = '取消'
          } else {
            this.ifDealing = true
            this.dealButtonText = '取消'
          }
        },
        submit(){
            if(!this.items.includes(this.reply.type)){
                this.$emit('alert',{state:true,color:'warning',title:'请选择处理类型'});
            }else{
                console.log(this.reply);
            }
        }
      },
    }
  </script>
  