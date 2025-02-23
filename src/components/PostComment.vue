<template>
    <div class="container">
        <div
            class="name text-small"
        >
            <avatar-name :initData="{avatar:data.avatar,name:data.author}"></avatar-name>
        </div>
        <div
            class="comment text-medium"
        >
            {{ data.comment }}
        </div>
        <div
            class="bottom-bar"
        >
            <div class="time text-small">
                {{ this.data.time }}
            </div>
            <v-spacer></v-spacer>
            <div class="bottom-btn-container">
                <like-button></like-button>
            </div>
            <div class="like-num text-small">
                {{ this.data.like }}
            </div>
            <div class="bottom-btn-container">
                <alert-button></alert-button>
            </div>
        </div>
        <div class="bottom-line"></div>
    </div>
</template>
<script>
import AlertButton from './AlertButton.vue';
import LikeButton from './LikeButton.vue';
import AvatarName from './AvatarName.vue';
export default {
    name: 'PostComment',
    props: {
        initData: {
            type: Object,
            default: () => {
                return {
                    id: null,
                    author: null,
                    time: null,
                    like: null,
                    comment: null,
                }
            }
        }
    },
    components:{
        AlertButton,
        LikeButton,
        AvatarName,
    },
    data(){
        const data=this.initData;
        return{
            data,
        }
    },
    methods: {
    }
}
</script>
<style scoped>
.bottom-bar{
    display: flex;
    flex-direction: row;
}
.bottom-line{
    margin-top: 5px;
    border-bottom: #8a8a8a 1px solid;
}
.column-center{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.like-num{
    display: flex;
    align-items: center;
    height: 27.5px;
    margin-left: 3px;
    margin-right: 15px;
    max-width: 100px;
    color: grey;
    white-space:nowrap; 
    overflow:hidden;
    text-overflow:ellipsis;
}
@media screen and (min-width: 600px) {
    .container{
        width: 900px;
        display: flex;
        flex-direction: column;
        padding-top: 15px;
        padding-left: 15px;
        padding-right: 15px;
    }
    .name{
        width: 100%;
        display: flex;
    }
    .time{
        color: grey;
        width: 40%;
    }
}

@media screen and (max-width: 600px) {
    .container{
        width: 100%;
        display: flex;
        flex-direction: column;
        padding-top: 10px;
        padding-left: 10px;
        padding-right: 10px;
    }
    .name{
        width: 100%;
        display: flex;
    }
    .time{
        margin-top: 5px;
        color: grey;
        width: 40%;
    }
}
</style>