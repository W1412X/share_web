<template>
    <v-avatar @click="click" :size="size" :image="url"> </v-avatar>
</template>
<script>
import { useRouter } from 'vue-router';
export default{
    setup(){
        const router=useRouter();
        return{
            router,
        }
    },
    props:{
        url:{
            type:String,
            default:'https://tse1-mm.cn.bing.net/th/id/OIP-C.PO7d9IfnPUy2RO173QYt6wHaHV?w=216&h=213&c=7&r=0&o=5&pid=1.7',
        },
        name:{
            type:String,
            default:'visitor',
        },
        size:{
            type:Number,
            default:25,
        }
    },
    methods:{
        click(){
            this.router.push({name:'AuthorPage',params:{name:this.name}});
        }
    }
}
</script>