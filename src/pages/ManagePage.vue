<template>
    <LoadingView v-model="progressMsg"></LoadingView>
    <main>
        <div style="width: 100%;display: flex;justify-content: center;">
            <div style="display: flex;flex-direction: column;">
                <v-tabs v-model="pageType" style="width: 750px; background-color: #8a8a8a" bg-color="indigo-darken-2"
                    fixed-tabs>
                    <v-tab :style="{ background: '#bbbbbb', 'font-size': '18px', 'min-width': '375px' }" value="passive"
                        text="被动受理"></v-tab>
                    <v-tab :style="{ background: '#bbbbbb', 'font-size': '18px', 'min-width': '375px' }" value="active"
                        text="主动操作"></v-tab>
                </v-tabs>
                <div v-if="pageType == 'passive'"
                    style="display:flex;flex-direction: column;margin:2px;overflow-y: scroll;">
                    <ManagerDealCard v-for="(item, index) in dealList" :item="item" :key="index"></ManagerDealCard>
                </div>
                <div v-if="pageType == 'active'"
                    style="display:flex;flex-direction: column;margin:2px;overflow-y: scroll;">
                    <div style="display: flex;flex-direction: row;justify-items: center;">
                        <v-select variant="outlined"
                            style="margin-left: 0px;padding:0px;max-width: 100px;font-size: 16px;position: relative;margin-top: 10px;margin-bottom: 10%;height: 50px;"
                            v-model="searchType" :items="['用户', '文章', '问答', '问题回答', '课程评论']" label="搜索类型"></v-select>
                        <v-autocomplete v-model="inputValue" type="text" ref="searchInput"
                            style="position: relative;margin-top: 10px;margin-left:10px;height: 50px;" label="search"
                            variant="outlined"></v-autocomplete>
                        <v-btn variant="outlined" style="height: 50px;margin-top: 10px;margin-left: 5px;">搜索</v-btn>
                    </div>
                    <v-card variant="outlined" style="width: 750px;">
                        <div style="display: flex;flex-direction: column;">
                            <div style="display: flex;flex-direction: row;">
                                查询结果
                            </div>
                            <div style="display: flex;flex-direction: row-reverse;">
                                <v-btn variant="outlined" style="height: 30px;margin:2px;">封禁</v-btn>
                                <v-btn variant="outlined" style="height: 30px;margin:2px;">警告</v-btn>
                                <v-btn variant="outlined" style="height: 30px;margin:2px;">解封</v-btn>
                            </div>
                        </div>
                    </v-card>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
import ManagerDealCard from '@/components/ManagerDealCard.vue';

export default {
    components: {
        ManagerDealCard,
    },
    data() {
        var dealList = [
            {
                id: '00000000',
                type: '举报受理', //受理类型分为 举报受理，建议受理，BUG受理，申请解封
                content: 'sssssssssss',
                userName: 'visitor',
                relativeUrl: '',
            }
        ]
        return {
            pageType: 'passive',
            dealList,
            progressMsg: {
                state: false,
                text: '正在加载',
                progress: -1,
            }
        }
    },
    methods: {

    },
    created() {
        for (var i = 0; i < 20; i++) {
            this.dealList.push(this.dealList[0]);
        }
    }
}
</script>