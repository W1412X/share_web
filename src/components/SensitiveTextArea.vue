<template>
  <v-textarea
    v-bind="textareaProps"
    v-model="internalValue"
    @compositionend="handleCompositionEnd"
  />
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
  setup(props, { emit }) {
    const internalValue = ref(props.modelValue);

    // 计算属性
    const textareaProps = computed(() => {
      const { modelValue, style, ...restProps } = props;
      console.log(modelValue,style)
      return restProps;
    });

    watch(() => props.modelValue, (newValue) => {
      internalValue.value = newValue;
    });

    function handleCompositionEnd() {
      setTimeout(() => {
        const result = replaceAll(internalValue.value);
        for (const word of result) {
          let replaceStr = '*'.repeat(word.length);
          internalValue.value = internalValue.value.replace(word, replaceStr);
        }
        emit('update:modelValue', internalValue.value);
      }, 100);
    }

    return {
      internalValue,
      textareaProps,
      handleCompositionEnd
    };
  }
});
</script>

<style scoped>
/* 可以在这里添加一些样式 */
</style>
