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

    // 计算属性
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
      this.$emit('update:modelValue', this.internalValue);
      if (this.ifTyping) {//如果正在打字，则不做处理
      } else {//没有打字，检测
        setTimeout(() => {
          const result = replaceAll(this.internalValue);
          for (const word of result) {
            let replaceStr = '*'.repeat(word.length);
            this.internalValue = this.internalValue.replace(word, replaceStr);
          }
        }, 100)
      }
    }
  }
});
</script>

<style scoped>
/* 可以在这里添加一些样式 */
</style>
