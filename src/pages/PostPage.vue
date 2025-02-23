<template>
    <LoadingView :initial-data="loadingMsg"></LoadingView>
    <v-dialog v-model="ifShowDialog" style="width: 100%;height:100%;justify-content: center;">
      <div v-if="ifShowComment" style="width: 100%;height:100%;justify-content: center;display: flex">
        <v-card class="dialog-card">
            <div class="title-bold">
                评论帖子
            </div>
            <SensitiveTextArea style="margin-top: 10px;" v-model="inputingComment" variant="outlined" density="compact" label="输入评论内容"/>
            <div class="dialog-bottom-btn-bar">
                <v-btn @click="comment" variant="text">发表</v-btn>
                <v-btn @click="setCommentState(false)" variant="text">取消</v-btn>
            </div>
        </v-card>
      </div>
    </v-dialog>
    <div class="full-center">
        <div>
            <div class="top-bar">
                <div class="top-bar-msg-div">
                    <div class="full-column-center text-medium name-font">
                        <avatar-name :init-data="{avatar:post.avatar,name:post.author}"></avatar-name>
                    </div>
                </div>
                <div class="title-container title-bold">
                    {{ post.title }}
                </div>
                <div class="detail-text text-medium">
                    {{ post.detail }}
                </div>
                <div class="full-column-center text-small grey-font">
                    <div class="comment-star-display-div">
                        <div class="row-right-20px-column-center">
                            <v-icon class="icon-right-5px" color="#8a8a8a" icon="mdi-star"
                                size="18"></v-icon>
                            <div class="column-center">
                                {{ post.star }}
                            </div>
                        </div>
                        <div class="row-right-20px-column-center">
                            <v-icon class="icon-right-5px" color="#8a8a8a" icon="mdi-comment"
                                size="16"></v-icon>
                            <div class="column-center">
                                {{ post.comment }}
                            </div>
                        </div>
                        <v-spacer></v-spacer>
                        <div class="time-div grey-font text-small">
                            <v-icon class="icon-right-5px" color="#8a8a8a" icon="mdi-clock"
                                size="17"></v-icon>
                            <div class="column-center">
                                {{ post.time }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom-bar">
                <div class="column-center user-name text-medium">
                    {{ userName }}
                </div>
                <v-spacer class="spacer"></v-spacer>
                <div class="row-reverse">
                    <div class="column-center padding-right-10px">
                        <star-button></star-button>
                    </div>
                    <div class="column-center padding-right-5px">
                        <alert-button></alert-button>
                    </div>
                    <div class="column-center padding-right-10px">
                        <v-btn elevation="0" @click="setCommentState(true)" icon class="bottom-btn">
                            <v-icon size="22" icon="mdi-comment-outline"></v-icon>
                        </v-btn>
                    </div>
                </div>
            </div>
            <div class="comments-container">
            <div class="column-div">
                <post-comment v-for="(comment, index) in postComments" :init-data="comment" :key="index">
                </post-comment>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import { globalProperties } from '@/main.js';
import { postShort, postComment } from '@/utils/data'
import { getCookie } from '@/utils/cookie';
import StarButton from '@/components/StarButton.vue';
import AlertButton from '@/components/AlertButton.vue';
import { computed, ref } from 'vue';
import PostComment from '@/components/PostComment.vue';
import SensitiveTextArea from '@/components/SensitiveTextArea.vue';
import AvatarName from '@/components/AvatarName.vue';
export default {
    name: 'PostPage',
    components: {
        StarButton,
        AlertButton,
        PostComment,
        SensitiveTextArea,
        AvatarName,
    },
    setup() {
        const themeColor = globalProperties.$themeColor;
        const loadingMsg = {
            state: false,
            text: '加载中...',
            progress: -1
        }
        /**
         * get user msg
         */
        var userName = getCookie('userName');
        if (userName == null) {
            userName = "游客";
        }
        /**
         * posts list visibility control here
         */
        const ifShowComment = ref(false);
        const ifShowDialog=computed(()=>{
            return ifShowComment.value;
        })
        const setCommentState = (state) => {
            ifShowComment.value = state;
        }
        return {
            themeColor,
            loadingMsg,
            userName,
            ifShowComment,
            setCommentState,
            ifShowDialog
        }
    },
    data() {
        return {
            inputingComment:'',
            post: {
                id: null,
                title: null,
                detail: null,
                star: null,
                comment: null,
                author: null,
                time: null,
            },
            postComments: [],
        }
    },
    methods: {
        comment(){
            /**
             * need post comment
             */
            this.setCommentState(false);
        }
    },
    mounted() {
        /**
         * get the route params and fetch data
         */
        this.post = postShort;
        /**
         * test, comments
         */
        for(let i=0;i<15;i++){
            this.postComments.push(postComment);
        }
    },
}
</script>
<style scoped>
.column-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
}
.dialog-bottom-btn-bar{
    padding:10px;
    display: flex;
    flex-direction: row-reverse;
}
.margin-bottom-40px {
    margin-bottom: 40px;
}

.time-div {
    display: flex;
    flex-direction: row;
    margin-top: 5px;
    align-items: center;
}

.dialog-card{
    padding: 10px;
    display: flex;
    flex-direction: column;
}

.bottom-bar {
    display: flex;
    width: 900px;
    flex-direction: row;
    position: fixed;
    bottom: 0;
    height: 40px;
    border: #8a8a8a 1px solid;
    background-color: #ffffff;
    z-index: 1000;
}

.bottom-btn {
    width: 23px;
    height: 23px;
    color: #8a8a8a;
    background-color: rgba(0, 0, 0, 0);
}

.detail-text{
    width: 100%;
    margin-top: 0px;
    margin-bottom: 5px;
    white-space: normal;
    word-break: break-all;
    overflow: hidden;
}

.row-right-20px-column-center {
    display: flex;
    margin-top: 5px;
    align-items: center;
    flex-direction: row;
    margin-right: 20px;
}

.icon-right-5px {
    margin-right: 5px;
}

.top-bar-msg-div {
    margin-top: 5px;
    display: flex;
    flex-direction: row;
    padding-bottom: 5px;
    overflow-x: scroll;
}

.padding-right-5px {
    padding-right: 5px;
}

.padding-right-10px {
    padding-right: 10px;
}

.full-column-center {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
}

.comment-star-display-div {
    overflow-x: scroll;
    max-width: 100%;
    display: flex;
    flex-direction: row-reverse;
}

.grey-font {
    min-width: 200px;
    white-space: nowrap;
    word-break: break-all;
    overflow: hidden;
    color: grey;
}

.theme-color-font {
    color: var(--theme-color)
}

.column-div {
    display: flex;
    flex-direction: column;
}

@media screen and (min-width: 600px) {
    .full-center {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        height: 100%;
    }

    .top-bar {
        border: grey 1px solid;
        width: 900px;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 5px;
        padding-bottom: 5px;
    }

    .title-container {
        width: 750px;
        white-space: normal;
        word-break: break-all;
        overflow:hidden;
    }

    .user-name {
        margin-left: 10px;
        max-width: 300px;
        color: var(--theme-color);
    }

    .row-reverse {
        display: flex;
        flex-direction: row-reverse;
    }

    .posts-dialog {
        padding: 0px;
        display: flex;
        flex-direction: row-reverse;
    }

    .comments-container {
        background-color: #ffffff;
        border-top: #8a8a8a 1px solid;
        width: 100%;
        padding: 1px;
        margin-bottom: 40px;
        height: fit-content;
        overflow-y: scroll;
    }

    .name-font {
        font-weight: bold;
        width: 400px;
    }
}

@media screen and (max-width: 600px) {
    .full-center {
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        height: 100vh;
    }

    .top-bar {
        border: grey 1px solid;
        width: 100vw;
        padding-left: 2vw;
        padding-right: 2vw;
        padding-top: 1vw;
        padding-bottom: 1vw;
    }

    .title-container {
        width: 98vw;
        white-space: normal;
        word-break: break-all;
        overflow:hidden;
    }

    .user-name {
        margin-left: 2vw;
        width: 30vw;
        color: var(--theme-color);
    }

    .spacer {
        max-width: 30vw;
        font-size: 0px;
    }

    .row-reverse {
        display: flex;
        flex-direction: row-reverse;
        width: 40vw;
    }

    .posts-dialog {
        padding: 0px;
        display: flex;
        flex-direction: column-reverse;
    }

    .comments-container {
        background-color: #ffffff;
        border-top: #8a8a8a 1px solid;
        width: 100vw;
        height: fit-content;
        overflow-y: scroll;
        border-radius: 5px;
        margin-bottom: 40px;
    }

    .name-font {
        font-weight: bold;
        width: 40vw;
    }
}
</style>