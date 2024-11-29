<template>
    <textarea v-model="text"></textarea>
    <v-btn @click="test()"></v-btn>
    <div v-for="word in words" :key="word">{{ word }}</div>
</template>
<script>
import { getKeyword } from '@/utils/abandon/text';
export default{
    data(){
        return {
            text:"",
            words:[],
        }
    },
    methods:{
        test(){
            this.words=getKeyword(this.text,5);
        }
    }
}
</script>