<template>
    <v-btn @click="click" elevation="0" icon :style="{
        'max-width': '25px',
        'max-height': '25px',
        'border-radius': '100%',

    }">
        <svg-icon type="mdi" :color="color" :path="star"></svg-icon>
    </v-btn>
</template>
<script>
import SvgIcon from '@jamescoyle/vue-icon';
import {  mdiStar,mdiStarOutline } from '@mdi/js';
import { computed } from 'vue';
export default{
    props:{
        type:{
            type:String,
            default:'article',
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
            return this.ifClicked?'#9c0c13': '#8a8a8a';
        })
        const star=computed(()=>{
           return this.ifClicked? mdiStar:mdiStarOutline;
        });
        return {
            color,
            ifClicked,
            star
        }
    },
    components:{
        SvgIcon,
    },
    methods:{
        click(){
            this.ifClicked=!this.ifClicked;
            console.log('type',this.type);
            console.log('id',this.id);
        }
    }
}
</script>