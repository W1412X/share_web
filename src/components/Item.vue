<template>
  <v-card
    elevation="3"
    :style="cardStyle"
  >
    <v-row>
      <v-col
        :style="imageColStyle"
      >
        <v-img
          @click="showAlert"
          :lazy-src="lazySrc"
          :src="src"
          aspect-ratio="1"
          :style="imageStyle"
          cover
        />
        <span
          :style="timeTextStyle"
        >时间 {{ formattedTime }}</span>
      </v-col>
      <v-col
        :style="contentColStyle"
      >
        <!-- 内容部分代码保持不变 -->
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue';

// 定义props来接收外部传入的数据
const props = defineProps({
  src: String,
  lazy_src: String,
  title: String,
  subtitle: String,
  content: String,
  time: String,
  author_avatar_url: String,
  author_name: String
});

// 定义一些样式变量和计算属性
const cardStyle = computed(() => ({ width: '750px', marginLeft: '10%', marginTop: '20px', height: '170px', position: 'relative' }));
const imageColStyle = computed(() => ({ /* ... */ }));
const imageStyle = computed(() => ({ /* ... */ }));
const timeTextStyle = computed(() => ({ /* ... */ }));
const contentColStyle = computed(() => ({ /* ... */ }));

// 格式化时间
const formattedTime = computed(() => {
  // 这里可以添加你的时间格式化逻辑
  return props.time;
});

// 定义方法，如 showAlert
const showAlert = () => {
  // 弹窗逻辑
};

// 如果有跳转到作者页面的方法，也在这里定义
const toAuthorPage = () => {
  // 跳转逻辑
};
</script>