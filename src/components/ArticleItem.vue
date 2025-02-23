<template>
    <v-card class="card" @click="click()">
        <div class="column-div">
            <v-img v-if="deviceType === 'desktop'" :width="imgSize" class="img" :lazy-src="lazyImgUrl" :src="data.link"
                cover aspect-ratio="4/3"></v-img>
            <div class="row-div">
                <div class="title title-container">{{ data.title }}</div>
                <div class="text-small detail-container">{{ data.detail }}</div>
                <div class="text-small bottom-bar">
                    <div class="bottom-item">
                        @{{ data.author }}
                    </div>
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
            </div>
        </div>
    </v-card>
</template>
<script>
import { globalProperties } from '@/main';
export default {
    name: 'ArticleItem',
    components: {
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
                    author: null,
                }
            }
        }
    },
    setup() {
        const lazyImgUrl = globalProperties.$lazyImgUrl;
        const deviceType = globalProperties.$deviceType;
        return {
            deviceType,
            lazyImgUrl,
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
             * open a new tab and go
             */
            if(this.data.id==null){//no id param
                this.data.id=0;
            }
            this.$router.push({ name: 'ArticlePage', params: { id: this.data.id } });
        }
    }
}
</script>
<style scoped>
@media screen and (min-width: 600px) {
    .card {
        padding: 5px;
        width: 750px;
        margin-top: 5px;
    }

    .column-div {
        display: flex;
        flex-direction: row;
        height: 130px;
    }

    .row-div {
        display: flex;
        flex-direction: column;
    }

    .img {
        margin: 5px;
        max-width: 150px;
        max-height: 120px;
    }

    .title-container {
        max-width: 550px;
        height: 27px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .detail-container {
        max-width: 590px;
        height: 65px;
        white-space: normal;
        word-break: break-all;
        overflow: hidden;
        line-height: 1.2;
        color: #8a8a8a;
    }

    .bottom-bar {
        width: 580px;
        display: flex;
        flex-direction: row;
        color: #8a8a8a;
        margin-left: 5px;
        margin-top: 12px;
    }

    .bottom-item {
        display: flex;
        flex-direction: row;
        margin-right: 20px;
    }
}

@media screen and (max-width: 600px) {
    .card {
        width: 100vw;
        margin-top: 5px;
    }

    .column-div {
        display: flex;
        flex-direction: row;
        padding: 5px;
        height: 105px;
    }

    .row-div {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .title-container {
        max-width: 90vw;
        height: 35px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .detail-container {
        color: #8a8a8a;
        height: 55px;
        padding-top: 5px;
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
        margin-top: 12px;
    }

    .bottom-item {
        display: flex;
        flex-direction: row;
        margin-right: 10px;
    }
}
</style>