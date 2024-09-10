<template>
    <v-btn @click="handleClick" elevation="0" icon :style="{
        'max-width': '25px',
        'max-height': '25px',
        'border-radius': '100%',
        'background-color':'rgba(0,0,0,0)'
    }">
        <svg-icon type="mdi" :color="color" :path="star"></svg-icon>
    </v-btn>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiStar, mdiStarOutline } from '@mdi/js';
import { computed } from 'vue';

export default {
    props: {
        type: {
            type: String,
            default: 'article',
        },
        id: {
            type: String,
            default: '00000000',
        },
        state: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            ifClicked: this.state,
            color: computed(() => this.ifClicked ? '#ffac33' : '#8a8a8a'),
            star: computed(() => this.ifClicked ? mdiStar : mdiStarOutline),
            isClickable: true, // 新增的状态用于控制是否可以点击
        };
    },
    components: {
        SvgIcon,
    },
    methods: {
        handleClick() {
            if (!this.isClickable) return; // 如果不可点击则直接返回
            this.isClickable = false; // 设置为不可点击状态
            this.ifClicked = !this.ifClicked;
            // 输出类型和ID
            console.log('type', this.type);
            console.log('id', this.id);
            // 在2秒后重新设置为可点击状态
            setTimeout(() => {
                this.isClickable = true;
            }, 2000);
        }
    }
}
</script>