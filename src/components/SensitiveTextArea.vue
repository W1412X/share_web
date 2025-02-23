<!-- a text area with sensitive words filter -->
<template>
    <v-textarea v-bind="textareaProps" v-model="internalValue" @compositionend="handleCompositionEnd"
        @compositionstart="handleCompositionStart" @input="handleInput" />
</template>

<script>
import { replaceAll } from '@/utils/sensitive';
import { ref, computed, watch, defineComponent } from 'vue';

export default defineComponent({
    name: 'SensitiveTextarea',
    props: {
        modelValue: {
            type: [String, Number],
            default: ''
        },
    },
    setup(props) {
        const internalValue = ref(props.modelValue);

        const textareaProps = computed(() => {
            const { modelValue, style, ...restProps } = props;
            modelValue
            style
            return restProps;
        });

        watch(() => props.modelValue, (newValue) => {
            internalValue.value = newValue;
        });

        return {
            internalValue,
            textareaProps,
        };
    },
    data() {
        return {
            ifTyping: false,
        }
    },
    methods: {
        handleCompositionStart() {
            this.ifTyping = true
        },
        handleCompositionEnd() {
            this.ifTyping = false
        },
        handleInput() {
            if (this.ifTyping) {//if tying,ignore
            } else {//not tying,examine
                setTimeout(() => {
                    const result = replaceAll(this.internalValue);
                    for (const word of result) {
                        let replaceStr = '*'.repeat(word.length);
                        this.internalValue = this.internalValue.replace(word, replaceStr);
                    }
                    this.$emit('update:modelValue', this.internalValue);
                }, 100)
            }
        }
    }
});
</script>
