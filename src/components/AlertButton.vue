<template>
  <v-dialog v-model="ifShowDialog"
    style="width: 100%;height:100%;background-color: rgba(255,255,255,0.5);justify-content: center;">
    <div v-if="ifShowReportCard" style="width: 100%;height:100%;justify-content: center;display: flex">
      <report-card :report="{type:type,id:id}" @close="close()"></report-card>
    </div>
  </v-dialog>
    <v-btn elevation="0" @click="click" icon :style="{
        'width': size,
        'height': size,
        'color': color,
    }">
        <svg-icon type="mdi" :path="alertIcon"></svg-icon>
    </v-btn>
</template>
<script>
import { computed,ref } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAlertCircleOutline } from '@mdi/js';
import ReportCard from './ReportCard.vue';
export default{
    props:{
        id:{
            type:String,
            default:'00000000',
        },
        type:{
            type:String,
            default:'文章',
        },
        size:{
            type:String,
            default:'25px',
        },
        color:{
            type:String,
            default:'#8a8a8a',
        }
    },
    components:{
        SvgIcon,
        ReportCard
    },
    setup(){
        const ifShowReportCard=ref(false);
        const ifShowDialog=computed(()=>{
            return ifShowReportCard.value;
        })
        const setRepordCardState=(state)=>{
            ifShowReportCard.value=state;
        }
        const alertIcon=mdiAlertCircleOutline;
        return {
            ifShowDialog,
            ifShowReportCard,
            setRepordCardState,
            alertIcon,
        }
    },
    methods:{
        click(){
            this.setRepordCardState(true);
        },
        close(){
            this.setRepordCardState(false);
        }
    }
}
</script>