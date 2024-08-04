<template>
    <v-btn
        @click="toTagPage()"
        :style="{ 'height': '20px', 'font-size': '12px','margin-left':'5px' }"
        color="#9c0c13"
        variant="outlined"
        rounded>
            {{ tag }}
    </v-btn>
</template>
<script>
export default{
    props:{
        tag:{
            type:String,
            required: true 
        }
    },
    methods:{
        toTagPage(){
            window.alert("搜索标签"+this.tag);
        }
    }
}
</script>