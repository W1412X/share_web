<template>
    <v-card @click="click()" class="card" elevation="1">
        <div class="row-div">
            <div class="text-small bottom-bar avatar-name-column-center">
                <avatar-name :initData="{name:data.author,avatar:data.avatar}"></avatar-name>
                <v-spacer></v-spacer>
                <div class="bottom-item">
                    <v-icon icon="mdi-star" size="20"></v-icon>
                    {{ data.star }}
                </div>
                <div class="bottom-item">
                    <v-icon icon="mdi-comment" size="18" style="margin-top: 2px;"></v-icon>
                    {{ data.comment }}
                </div>
            </div>
            <div class="title title-container">{{ data.title }}</div>
            <div class="text-small detail-container">{{ data.detail }}</div>
        </div>
    </v-card>
</template>
<script>
import { globalProperties } from '@/main';
import AvatarName from '@/components/AvatarName.vue';
export default {
    name: 'PostItem',
    components: {
        AvatarName,
    },
    props: {
        initData: {
            type: Object,
            default: () => {
                return {
                    id: null,
                    title: null,
                    detail: null,
                    star: null,
                    comment: null,
                    link: null,
                    author: null,
                }
            }
        }
    },
    setup() {
        const themeColor = globalProperties.$themeColor;
        const lazyImgUrl = globalProperties.$lazyImgUrl;
        const deviceType = globalProperties.$deviceType;
        return {
            deviceType,
            lazyImgUrl,
            themeColor,
        }
    },
    data() {
        const data = this.initData;
        return {
            data,
        }
    },
    methods:{
        click(){
            /**
             * to post page
             */
            if(this.data.id==null){//no id param
                this.data.id=0;
            }
            this.$router.push({ name: 'PostPage', params: { id: this.data.id } });
        }
    }
}
</script>
<style scoped>
.avatar-name-column-center{
    display: flex;
    align-items: center;
    margin-top:5px;
    margin-bottom:5px;
}
@media screen and (min-width: 600px) {
    .card {
        padding: 10px;
        width: 750px;
        margin-top: 5px;
    }
    .row-div {
        display: flex;
        height: 120px;
        flex-direction: column;
    }
    .title-container {
        max-width: 700px;
        height: 27px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .detail-container {
        max-width: 730px;
        height: 65px;
        white-space: normal;
        word-break: break-all;
        overflow: hidden;
        color: #8a8a8a;
        line-height: 1.2;
    }
    .bottom-bar {
        width: 740px;
        display: flex;
        flex-direction: row;
        color: #8a8a8a;
        margin-left: 5px;
    }
    .author{
        color: var(--theme-color);
    }
    .bottom-item {
        display: flex;
        flex-direction: row;
        margin-right: 20px;
    }
}

@media screen and (max-width: 600px) {
    .card {
        padding: 5px;
        width: 100vw;
        margin-top: 1px;
    }
    .row-div {
        width: 100%;
        height: 105px;
        display: flex;
        flex-direction: column;
    }
    .title-container {
        max-width: 90vw;
        height: 27px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .detail-container {
        color: #8a8a8a;
        padding-top: 2px;
        height: 50px;
        white-space: normal;
        word-break: break-all;
        overflow: hidden;
        line-height: 1.2;
    }
    .bottom-bar {
        display: flex;
        flex-direction: row;
        color: #8a8a8a;
        margin-left: 5px;
        margin-top: 8px;
    }
    .author{
        color:var(--theme-color);
    }
    .bottom-item {
        display: flex;
        flex-direction: row;
        margin-right: 10px;
    }
}
</style>