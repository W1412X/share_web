<template>
    <v-dialog v-model="ifShowDialog" style="
        width: 100%;
        height: 100%;
        display:flex;
        background-color: rgba(255, 255, 255, 0.5);
        justify-content: center;
      ">
        <div v-if="ifShowBlackList" style="display: flex;justify-content: center;">
            <v-card style="padding: 5px;max-width: 750px;width:750px;">
                <div style="width: 100%;display: flex;flex-direction: row-reverse;">
                    <div>
                        <v-btn size="20" variant="outlined" style="
                    border-radius: 50px;
                    height: 20px;
                    margin: 5px;
                    color: #8a8a8a;
                    font-weight: 600;
                " @click="this.setBlackListState(false)">✕</v-btn>
                    </div>
                </div>
                <div style="overflow: auto;max-height:800px;">
                    <BlackUserBar v-for="(user, index) in this.blackList" :key="index" :user="user"></BlackUserBar>
                </div>
            </v-card>
        </div>
        <div v-if="ifShowPrivacyPolicy" style="display: flex;justify-content: center;">
            <v-card v-if="ifShowPrivacyPolicy" style="padding:5px;width:750px;max-width:750px;">
                <div style="width: 100%;display: flex;flex-direction: row-reverse;">
                    <div>
                        <v-btn size="20" variant="outlined" style="
                    border-radius: 50px;
                    height: 20px;
                    margin: 5px;
                    color: #8a8a8a;
                    font-weight: 600;
                " @click="this.setPrivacyPolicyState(false)">✕</v-btn>
                    </div>
                </div>
                <div style="overflow: auto;max-height:800px;">{{ this.privacyPolicy }}</div>
            </v-card>
        </div>
        <div v-if="ifShowAboutUs" style="display: flex;justify-content: center;">
            <v-card style="padding:5px;width: 750px;max-width: 750px;">
                <div style="width: 100%;display: flex;flex-direction: row-reverse;overflow: auto;">
                    <div>
                        <v-btn size="20" variant="outlined" style="
                    border-radius: 50px;
                    height: 20px;
                    margin: 5px;
                    color: #8a8a8a;
                    font-weight: 600;
                " @click="this.setAboutUsState(false)">✕</v-btn>
                    </div>
                </div>
                <div style="overflow: auto;max-height:800px;">{{ this.aboutUs }}</div>
            </v-card>
        </div>
        <div v-if="ifShowDeleteAccount" style="display: flex;justify-content: center;">
            <EmailExmineCard @close="close" :email="this.email" :user-name="this.userName" :type="'delete'">
            </EmailExmineCard>
        </div>
        <div v-if="ifSHowReportBug" style="display: flex;justify-content: center;">
            <report-bug-card @close="close"></report-bug-card>
        </div>
        <div v-if="ifShowSuggestion" style="display: flex;justify-content: center;">
            <SuggestionCard @close="close"></SuggestionCard>
        </div>
    </v-dialog>
    <v-card style="width: 750px; padding: 10px; border: #dddddd solid 1px">
        <div style="display: flex; flex-direction: column">
            <v-btn @click="clickBlackList" variant="outlined" style="margin: 1px; color: #8a8a8a"
                prepend-icon="mdiAlert">黑名单</v-btn>
            <v-btn @click="clickDeleteAccount" variant="outlined" style="margin: 1px; color: #8a8a8a"
                prepend-icon="mdiAlert">注销账号</v-btn>
            <v-btn @click="clickPrivacyPolicy" variant="outlined" style="margin: 1px; color: #8a8a8a"
                prepend-icon="mdiAlert">隐私政策</v-btn>
            <v-btn @click="clickAboutUs" variant="outlined" style="margin: 1px; color: #8a8a8a"
                prepend-icon="mdiAlert">关于我们</v-btn>
            <v-btn @click="clickeReportBug" variant="outlined" style="margin: 1px; color: #8a8a8a"
                prepend-icon="mdiAlert">报告Bug</v-btn>
            <v-btn @click="clickSuggestion" variant="outlined" style="margin: 1px; color: #8a8a8a"
                prepend-icon="mdiAlert">网站建议</v-btn>
        </div>
    </v-card>
</template>
<script>
import BlackUserBar from './BlackUserBar.vue';
import SuggestionCard from './SuggestionCard.vue';
import EmailExmineCard from './EmailExmineCard.vue';
import { computed, ref } from 'vue';
import { getUser } from '@/utils/storage';
import ReportBugCard from './ReportBugCard.vue';
export default {
    components: {
        BlackUserBar,
        SuggestionCard,
        EmailExmineCard,
        ReportBugCard,
    },
    setup() {
        const ifShowBlackList = ref(false)
        const ifShowDeleteAccount = ref(false)
        const ifShowPrivacyPolicy = ref(false)
        const ifShowAboutUs = ref(false)
        const ifShowSuggestion = ref(false)
        const ifSHowReportBug=ref(false);
        const ifShowDialog = computed(() => {
            return (
                ifShowAboutUs.value ||
                ifShowBlackList.value ||
                ifShowDeleteAccount.value ||
                ifShowPrivacyPolicy.value ||
                ifShowSuggestion.value ||
                ifSHowReportBug.value
            )
        })

        const setBlackListState = state => {
            ifShowBlackList.value = state
        }
        const setDeleteAccountState = state => {
            ifShowDeleteAccount.value = state
        }
        const setPrivacyPolicyState = state => {
            ifShowPrivacyPolicy.value = state
        }
        const setAboutUsState = state => {
            ifShowAboutUs.value = state
        }
        const setSuggestionState = state => {
            ifShowSuggestion.value = state
        }
        const setReportBugState=state=>{
            ifSHowReportBug.value=state;
        }
        return {
            ifShowBlackList,
            ifShowDeleteAccount,
            ifShowPrivacyPolicy,
            ifShowAboutUs,
            ifShowSuggestion,
            ifShowDialog,
            ifSHowReportBug,
            setReportBugState,
            setBlackListState,
            setDeleteAccountState,
            setPrivacyPolicyState,
            setAboutUsState,
            setSuggestionState,
        }
    },
    data() {
        const email = getUser('email');
        const userName = getUser('userName');
        const blackList = [
            {
                userId: '00000000',
                userName: 'test',
                followState: false,
                introduce: '这是介绍部分',
                profileUrl:
                    'https://tse1-mm.cn.bing.net/th/id/OIP-C.PO7d9IfnPUy2RO173QYt6wHaHV?w=216&h=213&c=7&r=0&o=5&pid=1.7',
            }, {
                userId: '00000000',
                userName: 'test',
                followState: false,
                introduce: '这是介绍部分',
                profileUrl:
                    'https://tse1-mm.cn.bing.net/th/id/OIP-C.PO7d9IfnPUy2RO173QYt6wHaHV?w=216&h=213&c=7&r=0&o=5&pid=1.7',
            }, {
                userId: '00000000',
                userName: 'test',
                followState: false,
                introduce: '这是介绍部分',
                profileUrl:
                    'https://tse1-mm.cn.bing.net/th/id/OIP-C.PO7d9IfnPUy2RO173QYt6wHaHV?w=216&h=213&c=7&r=0&o=5&pid=1.7',
            }, {
                userId: '00000000',
                userName: 'test',
                followState: false,
                introduce: '这是介绍部分',
                profileUrl:
                    'https://tse1-mm.cn.bing.net/th/id/OIP-C.PO7d9IfnPUy2RO173QYt6wHaHV?w=216&h=213&c=7&r=0&o=5&pid=1.7',
            }, {
                userId: '00000000',
                userName: 'test',
                followState: false,
                introduce: '这是介绍部分',
                profileUrl:
                    'https://tse1-mm.cn.bing.net/th/id/OIP-C.PO7d9IfnPUy2RO173QYt6wHaHV?w=216&h=213&c=7&r=0&o=5&pid=1.7',
            }, {
                userId: '00000000',
                userName: 'test',
                followState: false,
                introduce: '这是介绍部分',
                profileUrl:
                    'https://tse1-mm.cn.bing.net/th/id/OIP-C.PO7d9IfnPUy2RO173QYt6wHaHV?w=216&h=213&c=7&r=0&o=5&pid=1.7',
            }, {
                userId: '00000000',
                userName: 'test',
                followState: false,
                introduce: '这是介绍部分',
                profileUrl:
                    'https://tse1-mm.cn.bing.net/th/id/OIP-C.PO7d9IfnPUy2RO173QYt6wHaHV?w=216&h=213&c=7&r=0&o=5&pid=1.7',
            },
            {
                userId: '00000000',
                userName: 'test',
                followState: false,
                introduce: '这是介绍部分',
                profileUrl:
                    'https://tse1-mm.cn.bing.net/th/id/OIP-C.PO7d9IfnPUy2RO173QYt6wHaHV?w=216&h=213&c=7&r=0&o=5&pid=1.7',
            },
            {
                userId: '00000000',
                userName: 'test',
                followState: false,
                introduce: '这是介绍部分',
                profileUrl:
                    'https://tse1-mm.cn.bing.net/th/id/OIP-C.PO7d9IfnPUy2RO173QYt6wHaHV?w=216&h=213&c=7&r=0&o=5&pid=1.7',
            },
            {
                userId: '00000000',
                userName: 'test',
                followState: false,
                introduce: '这是介绍部分',
                profileUrl:
                    'https://tse1-mm.cn.bing.net/th/id/OIP-C.PO7d9IfnPUy2RO173QYt6wHaHV?w=216&h=213&c=7&r=0&o=5&pid=1.7',
            },
            {
                userId: '00000000',
                userName: 'test',
                followState: false,
                introduce: '这是介绍部分',
                profileUrl:
                    'https://tse1-mm.cn.bing.net/th/id/OIP-C.PO7d9IfnPUy2RO173QYt6wHaHV?w=216&h=213&c=7&r=0&o=5&pid=1.7',
            },
            {
                userId: '00000000',
                userName: 'test',
                followState: false,
                introduce: '这是介绍部分',
                profileUrl:
                    'https://tse1-mm.cn.bing.net/th/id/OIP-C.PO7d9IfnPUy2RO173QYt6wHaHV?w=216&h=213&c=7&r=0&o=5&pid=1.7',
            },
            {
                userId: '00000000',
                userName: 'test',
                followState: false,
                introduce: '这是介绍部分',
                profileUrl:
                    'https://tse1-mm.cn.bing.net/th/id/OIP-C.PO7d9IfnPUy2RO173QYt6wHaHV?w=216&h=213&c=7&r=0&o=5&pid=1.7',
            },
            {
                userId: '00000000',
                userName: 'test',
                followState: false,
                introduce: '这是介绍部分',
                profileUrl:
                    'https://tse1-mm.cn.bing.net/th/id/OIP-C.PO7d9IfnPUy2RO173QYt6wHaHV?w=216&h=213&c=7&r=0&o=5&pid=1.7',
            },
            {
                userId: '00000000',
                userName: 'test',
                followState: false,
                introduce: '这是介绍部分',
                profileUrl:
                    'https://tse1-mm.cn.bing.net/th/id/OIP-C.PO7d9IfnPUy2RO173QYt6wHaHV?w=216&h=213&c=7&r=0&o=5&pid=1.7',
            },
            {
                userId: '00000000',
                userName: 'test',
                followState: false,
                introduce: '这是介绍部分',
                profileUrl:
                    'https://tse1-mm.cn.bing.net/th/id/OIP-C.PO7d9IfnPUy2RO173QYt6wHaHV?w=216&h=213&c=7&r=0&o=5&pid=1.7',
            }
        ];
        const privacyPolicy = '这是隐私政策';
        const aboutUs = '这是关于我们';
        return {
            blackList,
            privacyPolicy,
            aboutUs,
            email,
            userName,
        }
    },
    methods: {
        clickBlackList() {
            this.setBlackListState(true);
        },
        clickDeleteAccount() {
            this.setDeleteAccountState(true);
        },
        clickPrivacyPolicy() {
            this.setPrivacyPolicyState(true);
        },
        clickAboutUs() {
            this.setAboutUsState(true);
        },
        clickSuggestion() {
            this.setSuggestionState(true);
        },
        clickeReportBug(){
            this.setReportBugState(true);
        },
        close() {
            this.setBlackListState(false);
            this.setDeleteAccountState(false);
            this.setPrivacyPolicyState(false);
            this.setAboutUsState(false);
            this.setSuggestionState(false);
            this.setReportBugState(false);
        }
    },
}
</script>