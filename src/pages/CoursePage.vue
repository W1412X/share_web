<template>
    <LoadingView v-model="progressMsg"></LoadingView>
    <main style="width: 100%;height: 100vh;display: flex;justify-content: center;">
        <div style="display: flex;flex-direction: column;">
            <div>
                <rating-course-card :course="course" :if-rated="true"></rating-course-card>
            </div>
            <div style="display: flex;flex-direction: column;">
                <course-answer v-for="(answer, index) in answerList" :answer="answer" :key="index"></course-answer>
                <v-pagination v-model="answerPage" :length="answerPageNum" :total-visible="5" :size="30"></v-pagination>
            </div>
        </div>
    </main>
</template>
<script>
import RatingCourseCard from '@/components/RatingCourseCard.vue';
import CourseAnswer from '@/components/CourseAnswer.vue';
import { useRoute } from 'vue-router'
export default {
    components: {
        RatingCourseCard,
        CourseAnswer,
    },
    setup() {
    },
    data() {
        const course = {
            name: '程序思维设计与实践',
            teacher: '蔡晓军',
            type: '通识选修,人文社科',
            college: '计算机科学与技术学院',
            campus: '青岛校区',
            examineMethod: '项目展示',
            teacheMethod: '线上',
            updateTime: 'xxxx-xx-xx xx:xx',
            rate: {
                averageRate: 3.5,
                rateNum: 100,
                ratePropotion: [10, 20, 20, 30, 20],//从1->5
            },
        };
        const answerList = [
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
            answerPage: 1,
            answerPageNum: 10,
            progressMsg: {
                state: false,
                text: '正在加载',
                progress: -1,
            }
        }
    },
    methods: {

    },
    created() {
        this.progressMsg={
            state:true,
            text:'正在加载课程信息',
            progress:-1,
        };
        const route = useRoute();
        this.course.id = route.params.id;
        //请求课程部分
        
        console.log('load course page', this.courseId);
    }
}
</script>