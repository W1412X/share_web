<template>
    <v-dialog v-model="ifShowDialog" style="
        width: 100%;
        height: 100%;
        display:flex;
        background-color: rgba(255, 255, 255, 0.5);
        justify-content: center;
      ">
        <div v-if="ifShowBlackList" style="display: flex;justify-content: center;">
            <v-card style="padding: 5px;max-width: 750px;width:750px;max-height: 800px;overflow:scroll;">
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
                <div style="padding:5px;margin-top: 20px;margin-left: 10px;margin-right: 10px;max-height: 800px;overflow:scroll;">
                    <h2 id="-">入站须知(拟)</h2>
<h3 id="1-">1、本站功能</h3>
<ul>
<li>学习资源以及课程资源分享，包括但不限于课程作业参考，考试资料，考试回忆  </li>
<li>问答平台，包括对学习生活以及日常生活的各种类型的问答  </li>
<li>课程评价，提供发布课程，课程评价以帮助学生选到满意的课程，提供了评分与常见问题回答  </li>
<li>其他(有待开发)  <h3 id="2-">2、信息收集</h3>
</li>
<li>注册邮箱地址，用户名，密码以及您在该平台发布的相关资源  <h3 id="3-">3、反馈</h3>
</li>
<li>用户可举报文章，问答，评论或者回答，我们将就实际情况处理  </li>
<li>用户可以反馈课程信息有误并提供修改建议  </li>
<li>用户可通过 设置-建议 部分为本站提供建议  </li>
<li>用户可以通过邮箱联系管理员反馈具体问题  </li>
<li>用户可以进入本站QQ群提出问题与建议  <h3 id="4-">4、禁止</h3>
</li>
<li>发布不当内容文章，问题，评论，回答以及图片，资源，包括但不限于政治敏感，色情暴力，挑起对立，谣言谣传以及其他本平台认为不当的内容  </li>
<li>恶意占用服务器资源，上传无关资源，恶意攻击等，频繁请求将会被禁止访问  </li>
<li>发布侵犯他人隐私的内容包括但不限于图片，名称  </li>
<li>恶意引流，蓄意发布广告  </li>
<li>盗取他人账号</li>
<li>其他违反相关法律法规或者本站规定的行为<blockquote>
<p>违反以上任何一点者视违规情形将会予以禁言或者封禁的处罚    </p>
<h3 id="5-">5、开发者</h3>
</blockquote>
</li>
<li>本站代码完全开源，并提供接口文档  </li>
<li>不排斥少量的爬虫测试  </li>
<li>支持二次开发如Android，IOS，Homany等移动端的软件开发(开发测试请联系网站管理员)    <h3 id="6-">6、其他</h3>
</li>
<li>人员需求  <ul>
<li>需要网站管理员   <ul>
<li>内容审核 </li>
<li>网站后续维护  </li>
<li>网站后续功能更新  </li>
<li>其他  </li>
</ul>
</li>
</ul>
</li>
<li>本站为非盈利性质，不会投放广告以及有任何收费  </li>
<li>联系方式  <ul>
<li>... ...</li>
</ul>
</li>
</ul>

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
                prepend-icon="mdiAlert">入站须知</v-btn>
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