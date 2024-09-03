<template>
  <v-card style="width: 500px; padding: 5px">
    <div style="display: flex; flex-direction: row">
      <svg-icon type="mdi" :path="icons.alert"></svg-icon>
      <div style="margin-left: 10px; font-size: 20px; font-weight: 600">
        举报
      </div>
    </div>
    <div
      style="
        width:100%;
        margin-top: 5px;
        margin-left: 10px;
        font-size: 16px;
        font-weight: 600;
        color: #8a8a8a;
      "
    >
      类型: {{ report.type }}
    </div>
    <div
      style="
        margin-top: 5px;
        margin-left: 10px;
        font-size: 16px;
        font-weight: 600;
        color: #8a8a8a;
      "
    >
      举报项目ID: {{ report.id }}
    </div>
    <v-textarea
      style="margin: 10px;"
      label="填写你的举报理由(不多于100字)"
      variant="outlined"
      v-model="reason"
    ></v-textarea>
    <div style="display: flex;flex-direction: row;padding-bottom:5px;padding-right: 5px;flex-direction: row-reverse;">
      <v-btn
        @click="submit()"
        variant="outlined"
        color="#9c0c13"
        style="font-size: 16px; margin-left: 10px;height: 30px;"
        >提交</v-btn
      >
      <v-btn
        @click="cancel()"
        variant="outlined"
        color="#9c0c13"
        style="font-size: 16px;height: 30px;"
        >取消</v-btn
      >
    </div>
  </v-card>
  <v-snackbar
    :timeout="3000"
    :color="alertSet.color"
    v-model="alertSet.state"
  >
    <div class="text-subtitle-1 pb-2">{{ alertSet.title }}</div>
    <p>{{ alertSet.content }}</p>
  </v-snackbar>
</template>
  <script>
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiAlertCircleOutline } from '@mdi/js';
    export default {
      props: {
        report: {
          type: Object,
          default: function () {
            return {
              type: '文章',
              id: '00000000',
            }
          },
        },
      },
      components:{
        SvgIcon,
      },
      data() {
        const icons={
          alert:mdiAlertCircleOutline,
        }
        const reason = ''
        const alertSet = {}
        return {
          reason,
          alertSet,
          icons,
        }
      },
      methods: {
        submit() {
          if (this.reason == '') {
            //如果举报原因为空
            this.alertSet = {
              state: true,
              title: '举报原因不可为空',
              content: '',
              color: 'warning',
            }
          } else {
            this.alertSet = {
              state: true,
              title: '举报提交成功',
              content: '请耐心等待举报结果，处理后将会发送处理结果到您的邮箱',
              color: 'success',
            }
            const report = {
              type: this.report.type,
              id: this.report.id,
              reason: this.report.reason,
            }
            console.log(report);
          }
        },
        cancel(){
          this.$emit('close');
        }
      },
    }
  </script>
  