<template>
    <v-card variant="outlined" style="border-color: #8a8a8a">
      <div
        style="width: 100%; display: flex; flex-direction: column; padding: 10px"
      >
        <div style="width: 100%; display: flex; flex-direction: row">
          <div
            style="
              font-size: 20px;
              font-weight: 600;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            "
          >
            {{item.title}}
          </div>
        </div>
        <div style="width: 100%; display: flex; flex-direction: row">
          <div
            style="
              width: 100px;
              font-size: 16px;
              font-weight: 600;
              color: #8a8a8a;
              margin-top: 5px;
            "
          >
            类型:{{ this.item.type }}
          </div>
          <div
            style="
              width: 400px;
              font-size: 16px;
              font-weight: 600;
              color: #8a8a8a;
              margin-top: 5px;
            "
          >
            时间:{{ this.item.time }}
          </div>
          <div style="display: flex; flex-direction: row"></div>
        </div>
      </div>
    </v-card>
  </template>
  <script>
    export default {
      props: {
        item: {
          type: Object,
          default: function () {
            return {
              id: '',
              title:
                '这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题',
              type: '文章',
              time: '2022-09-01 08:22',
            }
          },
        },
      },
    }
  </script>
  