<template>
    <div style="width: 100%;height: 100vh;display: flex;justify-content: center;">
        <div style="display: flex;flex-direction: column;">
            <div>
                <rating-course-card></rating-course-card>
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
export default{
    components:{
        RatingCourseCard,
        CourseAnswer,
    },
    setup(){

    },
    data(){
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
        }
    },
    methods:{

    }
}
</script>