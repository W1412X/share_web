<template>
  <div
    class="overlay" 
    v-if="msg.state"
  >
    <div
      style="height: 100%; width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;"
    >
      <v-card style="padding: 10px; width: fit-content;">
        <div style="width: 100%; display: flex; justify-content: center;">
          <v-progress-circular
            v-if="msg.progress >= 0"
            v-model="msg.progress"
            :rotate="360"
            :size="50"
            :width="5"
            color="#9c0c13"
            style="font-weight: bold;"
          >
            {{ msg.progress }}%
          </v-progress-circular>
          <v-progress-circular
            v-if="msg.progress < 0"
            :rotate="360"
            :size="50"
            :width="5"
            color="#9c0c13"
            style="font-weight: bold;"
            indeterminate
          >
          </v-progress-circular>
        </div>
        <div
          style="
            width: 100%;
            display: flex;
            justify-content: center;
            color: #8a8a8a;
            font-weight: bold;
          "
        >
          <v-card-text
            style="
              max-width: 200px;
              margin-top: 15px;
              padding-top: 0px;
              margin-bottom: 5px;
              padding-bottom: 0px;
              font-weight: 600;
            "
          >
            {{ msg.text }}
          </v-card-text>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    modelValue: {
      type: Object,
      default: function () {
        return {
          state: false,
          progress: 0,
          text: '正在加载',
        };
      },
    },
    size: {
      type: String,
      default: '75',
    },
    width: {
      type: String,
      default: '8',
    },
    color: {
      type: String,
      default: 'rgba(156, 12, 19)',
    },
  },
  setup() {},
  data() {
    const msg = computed(() => {
      return this.modelValue;
    });
    return {
      msg,
    };
  },
};
</script>

<style scoped>
.overlay {
  position: fixed; /* 使用 fixed 定位以覆盖整个视口 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明的黑色背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* 确保在最上层 */
}
</style>
