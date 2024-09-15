<template>
    <div style="width: 100%;height: 100vh;display: flex;justify-content: center;">
        <div style="display: flex;flex-direction: column;">
            <div>
                <rating-course-card :course="course" :if-rated="true"></rating-course-card>
            </div>
            <div style="display: flex;flex-direction: column;">
                <course-answer v-for="(answer, index) in answerList" :answer="answer" :key="index"></course-answer>
            </div>
        </div>
    </div>
</template>
<script>
import RatingCourseCard from '@/components/RatingCourseCard.vue';
import CourseAnswer from '@/components/CourseAnswer.vue';
import {useRoute} from 'vue-router'
import { getCourseDetail } from '@/axios/detail';
import { getStatusMessage } from '@/statusCodeMessages';
export default{
    components:{
        RatingCourseCard,
        CourseAnswer,
    },
    setup(){
    },
    data(){
        const course={
            name: '程序思维设计与实践',
            teacher: '蔡晓军',
            type: '通识选修,人文社科',
            college: '计算机科学与技术学院',
            campus: '青岛校区',
            examineMethod: '项目展示',
            teacheMethod: '线上',
            updateTime:'xxxx-xx-xx xx:xx',
            rate: {
                averageRate: 3.5,
                rateNum: 100,
                ratePropotion: [10, 20, 20, 30, 20],//从1->5
            },
        };
        const answerList=[
            {
                authorName: 'test',
                rate: 4,
                content: '这是评论内容',
                time: '2024-09-01 09:00'
            },
            {
                authorName: 'test',
                rate: 4,
                content: '这是评论内容',
                time: '2024-09-01 09:00'
            },
            {
                authorName: 'test',
                rate: 4,
                content: '这是评论内容',
                time: '2024-09-01 09:00'
            },
        ]
        return {
            answerList,
            course,
        }
    },
    methods:{

    },
    created(){
        const route=useRoute();
        this.course.id=route.params.id;
        //请求课程部分
        getCourseDetail(this.courseId)
        .then(response=>{
            console.log(response);
            const status=response.status;
            if(status==200){//
                this.course.name=response.name;
                this.course.teacher=response.teacher_name;
                this.course.type=response.type;
                this.course.college=response.college;
                this.course.campus=response.campus;
                this.course.examineMethod=response.assessment_method;
                this.course.rate.averageRate=response.average_rate;
                this.course.rate.rateNum=response.rate_num;
                this.course.rate.ratePropotion=response.rate_proportion;
                this.course.updateTime=response.update_time;
            }else{
                this.$router.push({name:'ErrorPage',params:{reason:getStatusMessage(status)}});
            }
        })
        .catch(error=>{
            console.log(error);
            //测试
            return;
            //this.$router.push({name:'ErrorPage',params:{reason:'网络错误'}});
        })
        console.log('load course page',this.courseId);
    }
}
</script>