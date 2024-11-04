<!-- 这个页面专为手机APP端设计，仅显示文章部分
对于其他的网页获取到的信息，这里打算用不可见元素，避免重复网页和手机重复请求
还有就是交互，网页不提供任何交互，仅作为一个渲染器   
-->
<template>
    <main
      :style="{ 'justify-content': 'center', 'width': '100vw', 'display': 'flex' }"
    >
    <article-display :initial-html="article.content" :type="'mobile'"></article-display> 
   </main>
</template>
  <script>
  import {useRoute} from 'vue-router';
  import { getArticleDetail } from '@/axios/detail';//获取文章详细内容的请求
  import { getStatusMessage,/*unknowError*/ } from '@/statusCodeMessages';
  import ArticleDisplay from '@/components/ArticleDisplay.vue';
    export default {
      setup(){
        return {
        }
      },
      components:{
        ArticleDisplay,
      },
      data() {
        return {
          article: {
            id:'00000000',
            title: '标题',
            authorName: '作者名称',
            authorProfileUrl:'https://pic2.zhimg.com/v2-0dda71bc9ced142bf7bb2d6adbebe4f0_r.jpg?source=1940ef5c',
            publishTime: '2024-09-01 00:00',
            tags: ['计算机','测试'],
            starCount: '0',
            scanCount: '0',
            replyCount:'0',
            content: `<p><span style="color: rgb(0, 0, 0); font-size: 24px; font-family: 楷体;"><strong>图片与视频：</strong></span></p><p><span style="color: rgb(0, 0, 0); font-size: 16px;"><strong>支持直接加载网络图片以及上传图片</strong></span></p><p><span style="color: rgb(0, 0, 0); font-size: 16px;"><strong>支持加载网络视频，不支持上传视频</strong></span></p><p><span style="color: rgb(0, 0, 0); font-size: 24px; font-family: 微软雅黑;"><strong>其他样式：</strong></span></p><p><span style="color: rgb(216, 68, 147); font-size: 48px;"><strong>标题</strong></span><span style="font-size: 48px;"><strong> </strong></span><span style="color: rgb(106, 57, 201); font-size: 40px;"><strong>标题</strong></span><span style="font-size: 48px;"><strong> </strong></span><span style="color: rgb(66, 144, 247); font-size: 32px;"><strong>标题</strong></span><span style="font-size: 32px;"><strong> </strong></span><span style="color: rgb(114, 192, 64); font-size: 24px;"><strong>标题</strong></span><span style="font-size: 32px;"><strong> </strong></span><span style="color: rgb(245, 219, 77); font-size: 16px;"><strong>标题</strong></span><span style="font-size: 32px;"><strong> </strong></span><span style="color: rgb(225, 60, 57); font-size: 12px;"><strong>标题</strong></span><span style="font-size: 14px;"><strong> </strong></span><span style="font-size: 22px;"><strong> </strong></span><span style="font-size: 24px;"><strong> </strong></span><span style="font-size: 32px;"><strong> </strong></span></p><p><span style="font-size: 48px;"><strong>😀</strong></span><span style="font-size: 32px;"><strong> </strong></span><span style="font-size: 40px;"><strong>😀</strong></span><span style="font-size: 32px;"><strong> 😀 </strong></span><span style="font-size: 24px;"><strong>😀</strong></span><span style="font-size: 32px;"><strong> </strong></span><span style="font-size: 16px;"><strong>😀</strong></span><span style="font-size: 32px;"><strong> </strong></span><span style="font-size: 12px;"><strong>😀</strong></span><span style="font-size: 32px;"><strong>   </strong></span></p><p><span data-w-e-type="formula" data-w-e-is-void data-w-e-is-inline data-value="\\frac{a}{b} a^2, a_i \\sqrt{a}, \\sqrt[n]{a} \\sum_{i=1}^{n} i, \\int_{a}^{b} x^2 , dx  x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}"></span></p><p> <a href="sss" target="_blank">链接</a> </p><table style="width: auto;"><tbody><tr><th colSpan="1" rowSpan="1" width="auto">111</th><th colSpan="1" rowSpan="1" width="auto">111</th><th colSpan="1" rowSpan="1" width="auto">111</th><th colSpan="1" rowSpan="1" width="auto">111</th></tr><tr><td colSpan="1" rowSpan="1" width="auto">111</td><td colSpan="1" rowSpan="1" width="auto">111</td><td colSpan="1" rowSpan="1" width="auto">111</td><td colSpan="1" rowSpan="1" width="auto">111</td></tr><tr><td colSpan="1" rowSpan="1" width="auto">111</td><td colSpan="1" rowSpan="1" width="auto">111</td><td colSpan="1" rowSpan="1" width="auto">111</td><td colSpan="1" rowSpan="1" width="auto">111</td></tr></tbody></table><pre><code class="language-python">import numpy
  import pandas
  import os
  ... ... </code></pre><blockquote>引用部分</blockquote><p><br></p>`,
            type:'转载',
            originLink:'https://sss',//如果文章类型为转载，反之为'',
            sourceUrl:'https://sss.zip',//如果文章含有资源，反之为'',
            sourceName:'这是资源',
          },
        }
      },
      methods:{
        toSource(){//去文章的源站  
          window.location.replace(this.article.originLink);
        },
      },
      created() {//article.id的获取通过路径参数
        const route=useRoute();
        this.article.id=route.params.id;
        console.log('load article page',this.article.id);
        //来自消息跳转
        getArticleDetail(this.article.id)
        .then(response=>{
          const status=response.status;
          if(status==200){//请求成功
            this.article.title=response.title;
            this.article.authorName=response.author_name;
            this.article.authorProfileUrl=response.author_profile_url;
            this.article.tags=response.tags;
            this.article.starCount=response.star_count;
            this.article.scanCount=response.scan_count;
            this.article.replyCount=response.reply_count;
            this.article.content=response.content;
            this.article.type=response.type;
            this.article.originLink=response.origin_link;
            this.article.sourceUrl=response.source_url;
            this.article.publishTime=response.publish_time;
          }else{
            this.$router.push({name:'ErrorPage',params:{reason:getStatusMessage('common',status).content}});
          }
        })
        .catch(error=>{
          console.error('Failed to fetch article detail',error);
          //测试不跳转
          return;
          /*
          
          this.alert(unknowError);
          //跳转到errorPage
          this.$router.push({name:'ErrorPage',params:{reason:'网络错误'}});*/
        })
        //在组件加载完成后，将Markdown文本解析为HTML并赋值给renderedMarkdown
        //this.renderedContent = marked(this.article.content);
      },
    }
  </script>
  
  <style>
    /* 可选样式 */
  </style>