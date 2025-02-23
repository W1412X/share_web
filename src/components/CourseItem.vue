<template>
    <v-card class="card" @click="click()">
        <div class="row-div">
            <div class="name-container">
                <div class="name title">
                    {{ data.course_name }}
                </div>
                <div class="row-div">
                    <div class="text-medium msg">
                        校区:{{ data.campus }}
                </div>
                <div class="text-medium msg">
                        学院:{{ data.college }}
                </div>
                </div>
            </div>
            <div class="score-container">
                <div class="title score">
                    {{ data.score }}
                </div>
                <div class="text-small score-num">
                    {{ data.all_people }}个评价
                </div>
            </div>
        </div>
    </v-card>
</template>
<script>
//import SvgIcon from '@jamescoyle/vue-icon';
import { mdiComment, mdiStar } from '@mdi/js';
import { globalProperties } from '@/main';
export default {
    name: 'CourseItem',
    components: {
        //SvgIcon
    },
    props: {
        initData: {
            type: Object,
            default: () => {
                return {
                    /**
                     * some keys not displayed
                     */
                    course_id: null,
                    course_name: null,
                    score: null,
                    all_people:null,
                    campus:null,
                    college:null,
                }
            }
        }
    },
    setup(){
        const lazyImgUrl=globalProperties.$lazyImgUrl;
        const deviceType=globalProperties.$deviceType;
        return{
            deviceType,
            lazyImgUrl,
        }
    },
    data(){
        const data=this.initData;
        return {
            data,
            star:mdiStar,
            comment:mdiComment,
        }
    },
    methods:{
        click(){
            /**
             * open a new tab and go
             */
            if(this.data.course_id==null){//no id param
                this.$router.push({
                    name:'ErrorPage'
                })
            }
            this.$router.push({ name: 'CoursePage', params: { id: this.data.course_id } });
        }
    }
}
</script>
<style scoped>
@media screen and (min-width: 600px) {
    .card{
        width: 750px;
        padding:10px;
        margin-top: 5px;
    }    
    .row-div{
        display: flex;
        height: 100%;
        flex-direction: row;
    }
    .name-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 450px;
        height: 100%;
    }
    .name{
        width: 450px;
        min-height: 27px;
        white-space:nowrap; 
        overflow:hidden;
        text-overflow:ellipsis;
        justify-self: center;
    }
    .score-container{
        margin-left: 50px;
        width: 250px;
        display: grid;
    }
    .score{
        font-weight: bold;
        color: var(--theme-color);
        justify-self: center;
    }
    .score-num{
        color:grey;
        justify-self: center;
    }
    .msg{
        color:grey;
        width: 200px;
        white-space:nowrap; 
        overflow:hidden;
        text-overflow:ellipsis;
    }
}

@media screen and (max-width: 600px) {
    .card{
        width: 100vw;
        padding:1vw;
        margin-top: 2px;
    }
    .row-div{
        display: flex;
        height: 100%;
        flex-direction: row;
    }
    .name-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 60vw;
        height: 100%;
    }
    .name{
        width: 60vw;
        min-height: 27px;
        white-space:nowrap; 
        overflow:hidden;
        text-overflow:ellipsis;
    }
    .score-container{
        margin-left: 3vw;
        width: 35vw;
        display: grid;
    }
    .score{
        font-weight: bold;
        color: var(--theme-color);
        justify-self: center;
    }
    .score-num{
        color:grey;
        justify-self: center;
    }
    .msg{
        color:grey;
        margin-right:2vw;
        width: 25vw;
        white-space: nowrap;; 
        overflow:hidden;
        text-overflow:ellipsis;
    }
}
</style>