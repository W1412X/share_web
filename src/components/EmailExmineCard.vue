<template>
    <v-card style="width: 600px">
        <div style="display: flex;justify-content: right;">
            <div>
                <v-btn size="20" variant="outlined" style="
            border-radius: 50px;
            height: 20px;
            margin: 5px;
            color: #8a8a8a;
            font-weight: 600;
          " @click="cancelExamine()">✕</v-btn>
            </div>
        </div>
        <v-card-title
            :style="{ 'margin-left': '0px', 'font-size': '25px', 'display': 'flex', 'justify-content': 'center', 'font-weight': '600', 'color': '' }">
            验证您的账户
        </v-card-title>
        <v-card-text :style="{ width: '100%', 'font-size': '20px', 'margin-bottom': '0px', 'padding-bottom': '0px' }">
            我们已经向您的邮箱
            <span style="color: #0066ff">{{ form.email }}</span>
            发送验证码,请检查您的邮箱以获取验证码并输入
            (如果没有收到，注意检查垃圾邮箱)
        </v-card-text>
        <v-sheet color="surface" :style="{ 'margin-bottom': '0px', 'padding-bottom': '0px' }">
            <v-otp-input v-model="email_code" variant="solo"></v-otp-input>
        </v-sheet>
        <div style="display: flex; justify-content: center">
            <v-btn class="my-4" color="#9c0c13" height="40" text="验证" variant="flat" width="70%" @click="examine()"
                :style="{ width: '200px', 'margin-left': 'px', 'font-size': '18px', 'font-weight': '600', 'color': '#dddddd' }"></v-btn>
        </div>
        <div style="display: flex; flex-direction: row-reverse"></div>
        <div style="display: flex; flex-direction: row-reverse">
            <div class="text-caption"
                :style="{ 'font-size': '20px', 'display': 'flex', 'justify-content': 'right', 'margin-top': '10px' }">
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
import { getStatusMessage } from '@/axios/statusCodeMessages';
/*
 * 本组件接收来自父组件的表单数据以及需要执行的操作 
 * register/login/delete_count/reset_password  
 * ------同样本组件在验证成功时会向父组件提供描述信息，父组件需要接收和处理这个状态信息
 * 想了一下这个组件的应用场景，决定还是直接在这个组件中处理验证成功的逻辑，来回传感觉有点混乱
 */
export default {
    props: {//用于接收父组件传递的数据
        type:{
            type: String,
            default:null
        },
        form: {
            type: Object,
            default:null
        },
    },
    data(){
        return{
            email_code: '',
        }
    },
    methods: {
        async examine() {//这里执行对当前邮箱验证的操作 
            this.setLoading({state:true,progress:-1,text:'正在验证...'});
            var formToSubmit=this.form;
            formToSubmit.email_code=this.email_code;
            var response=null;
            switch(this.type){
                case 'register':
                    response=await register(formToSubmit);
                    break;
                case 'login':
                    response=await loginWithEmail(formToSubmit);
                    break;
                case 'delete_count':
                    response=await deleteAccount(formToSubmit);
                    break;
                case 'reset_password':
                    response=await resetPassword(formToSubmit);
                    break;
                default:
                    break;
            }
            this.setLoading({state:false,progress:-1,text:'正在验证...'});
            this.alert(getStatusMessage(this.type,response.status));  
            if(response.status==200){
                switch(this.type){
                    case 'register':  
                        window.location.reload();
                        break;
                    case 'login':
                        //待补充，添加登陆信息
                        this.$router.push({ name: 'IndexPage' });
                        break;
                    case 'delete_count':
                        //待补充，删除登陆状态
                        this.$router.push({name:"WelcomePage"});
                        break;
                    case 'reset_password':
                        break;
                    default:
                        break;
                }
            }

        },
        async resend() {//重新发送验证  
            var response=null;
            this.setLoading({state:true,progress:-1,text:'正在发送验证码...'});
            switch(this.type){
                case 'register':
                    response=await getRegisterEmailCode(this.form.email);
                    break;
                case 'login':
                    response=await getLoginEmailCode(this.form.email);
                    break;
                case 'delete_count':
                    response=await getDeleteAccountEmailCode(this.form.email);
                    break;
                case 'reset_password':
                    response=await getResetPasswordEmailCode(this.form.email);
                    break;
                default:
                    break;
            }
            this.setLoading({state:false,progress:-1,text:'正在发送验证码...'});
            // 显示发送验证码对应的信息  
            this.alert(getStatusMessage('captcha',response.status));  
        },
        cancelExamine() {
            //关闭这个窗口
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
}
</script>