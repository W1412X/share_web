<template>
    <v-card style="padding:5px;width:750px;max-width:750px;">
        <div style="width: 100%;display: flex;flex-direction: row-reverse;">
            <div>
                <v-btn size="20" variant="outlined" style="
                    border-radius: 50px;
                    height: 20px;
                    margin: 5px;
                    color: #8a8a8a;
                    font-weight: 600;
                " @click="close">✕</v-btn>
            </div>
            <div
                style="padding:5px;margin-top: 20px;margin-left: 10px;margin-right: 10px;max-height: 800px;overflow:scroll;">
                <div>公告</div>
            </div>
        </div>
        <div style="overflow: auto;max-height:800px;">{{ this.privacyPolicy }}</div>
    </v-card>
</template>
<script>
export default{
    setup(){

    },
    methods:{
        close(){
            this.$emit('close');
        }
    }
}
</script>