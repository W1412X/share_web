<template>
    <v-btn @click="click" elevation="0" icon :style="{
        'width': '25px',
        'height': '25px',
        'border-radius': '100%',
    }">
        <svg-icon type="mdi" :color="color" :path="heart"></svg-icon>
    </v-btn>
</template>
<script>
import SvgIcon from '@jamescoyle/vue-icon';
import {  mdiHeartOutline,mdiHeart } from '@mdi/js';
import { computed } from 'vue';
export default{
    props:{
        type:{
            type:String,
            default:'answer',
        },
        id:{
            type:String,
            default:'00000000',
        },
        state:{
            type:Boolean,
            default:false,
        }
    },
    data(){
        const ifClicked=this.state;
        const color=computed(()=>{
            return this.ifClicked?'#db261f': '#8a8a8a';
        })
        const heart=computed(()=>{
           return this.ifClicked? mdiHeart:mdiHeartOutline;
        });
        return {
            color,
            ifClicked,
            heart,
            ifClickable:true,
        }
    },
    components:{
        SvgIcon,
    },
    methods:{
        click(){
            if(!this.ifClickable)return;
            this.ifClicked=!this.ifClicked;
            this.ifClickable=false;
            console.log('type',this.type);
            console.log('id',this.id);
            setTimeout(()=>{
                this.ifClickable=true;
            },2000)
        }
    }
}
</script>