<template>
  <div
    @click="click()"
    style="
      width: 750px;
      display: flex;
      flex-direction: column;
      padding: 2px;
      background-color: #ffffff;
      border: 0.5px solid #dddddd;
    "
  >
    <div style="font-size: 16px; color: #000000; font-weight: 600">
      @ {{ message.userName }}
    </div>
    <div style="display: flex; flex-direction: row">
      <div style="width: 20px"></div>
      <div
        style="
          width: 710px;
          max-width: 710px;
          height: 30px;
          font-size: 16px;
          color: #000000;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        "
      >
        : {{ message.content }}
      </div>
      <div
        v-if="ifNew"
        :style="{'width': '20px','font-size':'10px','color':color }"
      >
        ●
      </div>
    </div>
    <div style="display: flex; flex-direction: row">
      <div
        style="
          min-width: 200px;
          margin-left: 10px;
          font-weight: 600;
          font-size: 12px;
          color: #8a8a8a;
          display: flex;
          flex-direction: row;
          margin-right: 10px;
        "
      >
        类型: {{ message.type }}
      </div>
      <div
        style="
          width:100%;
          font-size: 12px;
          color: #8a8a8a;
          display: flex;
          flex-direction: row-reverse;
          margin-right: 10px;
        "
      >
        {{ message.time }}
      </div>
    </div>
  </div>
</template>
<script>
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  export default {
    props: {
      message: {
        type: Object,
        default: function () {
          return {
            content: '这是信息',
            userName: 'test',
            time: '2022-09-01 08:00',
            userId: '00000000',
            type: '问题新增回答',//类型分为文章新增问题，文章新增
            relativeItemType:'article',//article/question
            relativeItemId:'00000000',
            relativeQuestionId:'0000000',
            
          }
        },
      },
    },
    setup(){
      const router=useRouter();
      return {
        router,
      }
    },
    data() {
      const ifNew = true
      const color = computed(() => {
        return this.ifNew ? '#ff0000' : '#8a8a8a'
      })
      return {
        ifNew,
        color,
      }
    },
    methods: {
      click() {
        this.ifNew = false;
        //跳转
        if(this.message.type=='文章新增问题'){
          this.router.push({name:'ArticlePage',params:{id:this.message.relativeItemId,from:'message'}});
        }else if(this.message.type=='问题新增回答'){
          this.router.push({name:'QuestionPage',params:{id:this.message.relativeItemId,from:'message'}});
        }
      },
    },
  }
</script>
