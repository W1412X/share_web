<!-- use the old one -->
<template>
    <LoadingView :initData="loadingData"></LoadingView>
    <v-card class="card">
            <div class="close-btn-container">
                <v-btn size="25" variant="text" 
                    icon="mdi-close"
                    @click="cancelExamine()"
                ></v-btn>
            </div>
        <div class="title-text">
            验证您的账户
        </div>
        <div class="normal-text title">
            我们已经向您的邮箱
            <span class="email-text">{{ data.email }}</span>
            发送验证码,请检查您的邮箱以获取验证码并输入
            (如果没有收到，注意检查垃圾邮箱)
        </div>
        <v-sheet color="surface">
            <v-otp-input v-model="data.emailCode" variant="outlined"></v-otp-input>
        </v-sheet>
        <div class="examine-btn-container">
            <v-btn :color="themeColor" height="40" text="验证" 
                variant="flat" @click="examine()"
                class="examine-btn"
            ></v-btn>
        </div>
        <div class="row-reverse-div">
            <div class="bottom-bar text-small">
                没有收到验证码?
                <a href="#" @click.prevent="code = ''" @click="resend()" style="margin-right: 10px">重新发送</a>
            </div>
            <v-spacer></v-spacer>
        </div>
    </v-card>
</template>
<script>
import { getRegisterEmailCode,getDeleteAccountEmailCode,getLoginEmailCode,getResetPasswordEmailCode, register } from '@/axios/account';
import { loginWithEmail,deleteAccount,resetPassword } from '@/axios/account';
import { getErrorMsg } from '@/axios/statusCodeMessages';
import { globalProperties } from '@/main';
import { getCancelLoadMsg, getLoadMsg } from '@/utils/other';
import { setCookie, clearAllCookies } from '@/utils/cookie';
import { csDeleteAccount, csLoginByEmail, csRegisterByEmail, csResetPassword } from '@/axios/api_convert/account';
export default {
    props: {
        initData: {
            type: Object,
            default: () => {
                return {
                    type:null,
                    email: '',
                    passwd: '',
                    userName: '',
                    emailCode: '',
                }
            }
        },
    },
    setup(){
        const themeColor=globalProperties.$themeColor;
        return {
            themeColor,
        }
    },
    data(){
        const data=this.initData;
        return{
            data,
        }
    },
    methods: {
        async examine() {//examine the email here 
            this.setLoading({state:true,progress:-1,text:'正在验证...'});
            var formToSubmit=this.data;
            var response=null;
            switch(this.data.type){
                case 'register':
                    console.log('register');
                    response=await register(csRegisterByEmail(formToSubmit));
                    break;
                case 'login':
                    console.log('login');
                    response=await loginWithEmail(csLoginByEmail(formToSubmit));
                    break;
                case 'delete_account':
                    response=await deleteAccount(csDeleteAccount(formToSubmit));
                    break;
                case 'reset_password':
                    response=await resetPassword(csResetPassword(formToSubmit));
                    break;
                default:
                    break;
            }
            if(response.status==200){
                switch(this.data.type){
                    case 'register':  
                        window.location.reload();
                        break;
                    case 'login':
                        /**
                         * save the user message
                         */
                        setCookie('user_name',response.user_name);
                        setCookie('user_id',response.user_id);
                        setCookie('email',response.email);
                        this.$router.push({ name: 'IndexPage' });
                        break;
                    case 'delete_account':
                        /**
                         * delete the user message
                         */
                        clearAllCookies();
                        this.$router.push({name:"WelcomePage"});
                        break;
                    case 'reset_password':
                        break;
                    default:
                        break;
                }
            }else if(response.status==-1){
                this.alert(getErrorMsg());
            }else{
                this.alert({
                    color:'error',
                    state:true,
                    content:response.message,
                })
            }
            this.setLoading(getCancelLoadMsg())
        },
        async resend() {//resend the code  
            var response=null;
            this.setLoading(getLoadMsg('正在发送验证码...',-1));
            switch(this.data.type){
                case 'register':
                    response=await getRegisterEmailCode(this.data.email);
                    break;
                case 'login':
                    response=await getLoginEmailCode(this.data.email);
                    break;
                case 'delete_account':
                    response=await getDeleteAccountEmailCode(this.data.email);
                    break;
                case 'reset_password':
                    response=await getResetPasswordEmailCode(this.data.email);
                    break;
                default:
                    break;
            }
            if(response.status==200){
                this.alert({
                    state:true,
                    color:'success',
                    title:'发送成功',
                    content:'验证码已发送至您的邮箱，请及时查看'
                })
            }else if(response.status==-1){
                this.alert({
                    state:true,
                    color:'warning',
                    title:'发送失败',
                    content:'请检查您的网络连接'
                })
            }else{
                this.alert({
                    state:true,
                    color:'error',
                    title:null,
                    content:response.message,
                })
            }
            this.setLoading(getCancelLoadMsg())
            console.log(response)
            //show the status code   
            //this.alert(getStatusMessage('captcha',response.status));  
        },
        cancelExamine() {
            //close the examine code
            this.$emit('close');
        },
        setLoading(msg){
            this.$emit('set_loading',msg);
        },
        alert(msg){
            this.$emit('alert',msg);
        }
    },
    components: {},
    mounted(){
        /**
         * test
         */
    },
    created(){
        //create the examine code 
        this.resend();
    }
}
</script>
<style scoped>
.close-btn-container{
    display: flex;
    justify-content: right;
}
.title-text{
    margin-top: 5px;
    font-size: 24px;
    display: flex;
    justify-content: center;
    font-weight: bold;
}
.normal-text{
    margin-top: 10px;
    margin-bottom: 10px;
}
.email-text{
    color: #0066ff;
    text-decoration: underline;
}
.examine-btn-container{
    display: flex; 
    justify-content: center;
}
.examine-btn{
    width: 300px;
    font-size:18px;
    font-weight:bold; 
    color:white;
}
.bottom-bar{
    display:flex;
    justify-content:right;
    margin-top:25px;
}
.row-reverse-div{
    display: flex; 
    flex-direction: row-reverse;
}
@media screen and (min-width: 600px) {
    .card{
        display: flex;
        width: 600px;
        flex-direction: column;
        padding:10px;
    }
}

@media screen and (max-width: 600px) {
    .card{
        display: flex;
        width: 80vw;
        flex-direction: column;
        padding:10px;
    }

}

</style>