<template>
    <v-card>
        <div :style="{'margin':'0px','height':'100%','widht':'1000px','display':'relative','padding':'5px','overflow':'auto'}">
            <article-item v-for="(article,index) in articleList" :article="article" :key="index"></article-item>
        </div>
    </v-card>
</template>
<script>
import ArticleItem from './ArticleItem.vue';
export default{
    props:{
        articleList:{
            type:Array,
            default:function(){
                return [
                    '00000000',
                    '00000001',
                    '00000002',
                    '00000003',
                    '00000004',
                    '00000005',
                    '00000006',
                ]
            }
        },
    },
    setup(){

    },
    components:{
        ArticleItem,
    },
    data(){
        return {

        }
    },
    methods:{

    },
}
</script>