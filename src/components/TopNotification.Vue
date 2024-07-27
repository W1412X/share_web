<!-- Notification.vue -->
<template>
    <div v-if="isVisible" class="notification">{{ message }}</div>
  </template>
  <script>
    import { ref } from 'vue'
  
    export default {
      props: {
        message: {
          type: String,
          required: true,
        },
      },
      setup(props) {
        const isVisible = ref(true)
  
        setTimeout(() => {
          isVisible.value = false
        }, 5000)
  
        return {
          isVisible,
        }
      },
    }
  </script>
  
  <style scoped>
    .notification {
      position: fixed;
      top: 20px;
      left: 50%;
      width: 150px;
      height: 40px;
      transform: translateX(-50%);
      background-color: rgba(255, 0, 0, 0.2); /* 半透明的背景色 */
      padding: 10px 20px;
      border: 1px solid rgba(255, 0, 0, 0.3);
      border-radius: 4px;
      z-index: 1000;
    }
  </style>
  