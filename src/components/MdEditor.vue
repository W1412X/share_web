<template>
    <div style="border: 1px solid #ccc">
        <v-md-editor class="editor" :disabled-menus="[]" @upload-image="handleUploadImage"
            v-model="data.content"></v-md-editor>
    </div>
</template>
<script>
export default {
    name: 'MdEditor',
    props: {
        initData:{
            type:Object,
            default: () => {
                return {
                    content:`# 一级标题
## 二级标题
### 三级标题
#### 四级标题
- 列表
+ 列表
1. 列表
![](https://www.baidu.com/img/bd_logo1.png)
$$
sum_{i=1}^{n}i^2=n(n+1)(2n+1)/6
$$
                    `,
                }
            }
        }
    },
    setup() {
    },
    data() {
        return {
            data:null,
        }
    },
    methods: {
        handleUploadImage(event, insertImage, files) {
            // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
            console.log(files)
            // 此处只做示例
            insertImage({
                url:
                'https://tse4-mm.cn.bing.net/th/id/OIP-C.V_eRvXb8ynCpQ4lsAr65mgHaD6?w=312&h=180&c=7&r=0&o=5&dpr=1.2&pid=1.7',
                desc: '在这里编辑图片描述',
                width: 'auto',
                height: 'auto',
            });
            this.alert({ state: true, color: 'success', title: '上传成功', content: '图片上传成功，现在您可以调整图片大小以及添加图片描述' })
        },
    },
    created() {
        this.data=this.initData;
    },
    mounted() {
    }
};
</script>
<style scoped>
@media screen and (min-width: 600px) {
    .editor{
        width:980px;
        min-height: 800px;
    }
}

@media screen and (max-width: 600px) {
    .editor{
        width:100%;
        min-height: 60%;
    }
}
</style>