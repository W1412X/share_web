<!--star button-->
<template>
    <v-btn @click="handleClick" elevation="0" icon :style="{
        'max-width': '25px',
        'max-height': '25px',
        'border-radius': '100%',
        'background-color':'rgba(0,0,0,0)'
    }">
        <v-icon type="mdi" size="25" :color="color" :icon="star"></v-icon>
    </v-btn>
</template>

<script>
import { computed } from 'vue';

export default {
    props: {
        data:{
            type:Object,
            default: () => {
                return {
                    state: false,
                    type: null,//article,course,post
                    id: null,
                }
        
            }
        }
    },
    data() {
        return {
            ifClicked: this.state,
            color: computed(() => this.ifClicked ? '#ffac33' : '#8a8a8a'),
            star: computed(() => this.ifClicked ? 'mdi-star' : 'mdi-star-outline'),
            isClickable: true, //to judge  if clickable
        };
    },
    components: {
    },
    methods: {
        handleClick() {
            if (!this.isClickable) return; //if not clickable return
            this.isClickable = false; //set clickable to false
            this.ifClicked = !this.ifClicked;
            //out type and id
            console.log('type', this.type);
            console.log('id', this.id);
            //set clickable to true after 2s
            setTimeout(() => {
                this.isClickable = true;
            }, 2000);
        }
    }
}
</script>