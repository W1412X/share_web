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
            <span style="color: #0066ff">{{ email }}</span>
            发送验证码,请检查您的邮箱以获取验证码并输入
            (如果没有收到，注意检查垃圾邮箱)
        </v-card-text>
        <v-sheet color="surface" :style="{ 'margin-bottom': '0px', 'padding-bottom': '0px' }">
            <v-otp-input v-model="code" variant="solo"></v-otp-input>
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
import {register,loginWithEmail,sendLoginCode,resetPasswd,sendResetPasswdCode,sendRegisterCode, sendDeleteCode, deleteAccount} from '@/axios/identify.js'
export default {
    props: {
        email: {
            type: String,
            default: function () {
                return 'test@email.com'
            },
        },
        userName:{
            type: String,
            default:function(){
                return ''
            }
        },
        passwd:{
            type:String,
            default:function(){
                return ''
            }
        },
        newPasswd:{
            type:String,
            default:''
        },
        type:{//这个类型标注其对应的获取验证码的类型，有register/login/delete/reset_passwd
            type:String,
            default:function(){
                return ''
            }
        }
    },
    data(){
        const alertSet={
                    state:true,
                    color:'',
                    title:'',
                    message:''
                };
        return {
            alertSet,
            code:'',
        }
    },
    methods: {
        examine() {//
            console.log('exmine')
            if(this.type==''){//如果没有传入对应的类型
                const message={
                    state:true,
                    color:'error',
                    title:'程序错误',
                    content:'联系开发者以报告此问题',
                }
                this.$emit('alert',message);
            }else if(this.type=='register'){//如果类型时register，则需要提交注册信息以及输入的验证码，并接收回复字段并提交给父控件使用
                const form={//注册的表单
                    user_name:this.userName,
                    passwd:this.passwd,
                    email:this.email,
                    email_code:this.code
                }
                console.log(form);
                register(form)//提交注册表单
                .then(response=>{
                    console.log(response);
                    if(response.status==200){
                        this.alertSet.state=true;
                        this.alertSet.color='success';
                        this.alertSet.title='注册成功';
                        this.alertSet.message='现在你可以通过用户名密码或者邮箱验证码登陆';
                        this.$emit('alert',this.alertSet);
                        //提交注册成功的信息
                        const msg={
                            type:'register',
                            state:'success'
                        }
                        this.$emit('submit',msg);
                    }else if(response.status==400){
                        this.alertSet.state=true;
                        this.alertSet.color='error';
                        this.alertSet.title='注册信息有误';
                        this.alertSet.content='检查邮箱是否存在';
                        this.$emit('alert',this.alertSet);
                    }else if(response.status==409){
                        this.alertSet.state=true;
                        this.alertSet.color='error';
                        this.alertSet.title='注册信息冲突';
                        this.alertSet.content='用户名或邮箱已经被注册，请更换用户名或者邮箱';     
                        this.$emit('alert',this.alertSet);
                    }else if(response.status==429){
                        this.alertSet.state=true;
                        this.alertSet.color='error';
                        this.alertSet.title='注册请求过多';
                        this.alertSet.content='可能由于您短时间内尝试了多次注册，或者由于其他原因';
                        this.$emit('alert',this.alertSet);  
                    }else{
                        this.alertSet.state=true;
                        this.alertSet.color='error';
                        this.alertSet.title='未知错误';
                        this.alertSet.content='接收到了未知的状态，请联系开发者报告此错误';
                        this.$emit('alert',this.alertSet);  
                    }
                })
                .catch(error=>{//遇到了未知的错误
                    console.log(error);
                    this.alertSet.state = true;
                    this.alertSet.color = 'error';
                    this.alertSet.title = '未知错误';
                    this.alertSet.content = '程序出现了未知错误，请联系开发者报告此错误';
                    this.$emit('alert',this.alertSet);
                })
            }else if(this.type=='login'){//如果类型是login，则提交登陆邮箱以及验证码
                const form={
                    email:this.email,
                    email_code:this.code,
                }
                console.log(form);
                loginWithEmail(form)
                .then(response=>{
                    console.log(response);
                    if(response.status==200){
                        this.alertSet.state=true;
                        this.alertSet.color='success';
                        this.alertSet.title='登陆成功';
                        this.alertSet.message='现在你可以浏览页面，我们会自动保存您的登陆状态';
                        this.$emit('alert',this.alertSet);
                        const msg={//提交登陆成功的信息到
                            type:'login',
                            state:'success'
                        }
                        this.$emit('submit',msg);
                    }else if(response.status==401){
                        this.alertSet.state=true;
                        this.alertSet.color='error';
                        this.alertSet.title='登陆信息有误';
                        this.alertSet.content='用户名或者密码错误';
                        this.$emit('alert',this.alertSet);
                    }else if(response.status==423){
                        this.alertSet.state=true;
                        this.alertSet.color='error';
                        this.alertSet.title='账号被锁定';
                        this.alertSet.content='可能有多种原因，多次登陆失败是其中的一种原因';     
                        this.$emit('alert',this.alertSet);
                    }else if(response.status==429){
                        this.alertSet.state=true;
                        this.alertSet.color='error';
                        this.alertSet.title='注册请求过多';
                        this.alertSet.content='登录请求过多，例如短时间内多次尝试登录';
                        this.$emit('alert',this.alertSet);  
                    }else{
                        this.alertSet.state=true;
                        this.alertSet.color='error';
                        this.alertSet.title='未知错误';
                        this.alertSet.content='接收到了未知的状态，请联系开发者报告此错误';
                        this.$emit('alert',this.alertSet);  
                    }
                })
                .catch(error=>{
                    console.log(error);
                    this.alertSet.state = true;
                    this.alertSet.color = 'error';
                    this.alertSet.title = '未知错误';
                    this.alertSet.content = '程序出现了未知错误，请联系开发者报告此错误';
                    this.$emit('alert',this.alertSet);
                })
            }else if(this.type=='delete'){//如果类型是注销，则提交邮箱以及验证码
                const form={
                    user_name:this.userName,
                    email:this.email
                }
                deleteAccount(form)
                .then(response=>{
                    console.log(response)
                })
                .catch(error=>{
                    console.error('delete account',error);
                })
                return
            }else if(this.type=='reset_passwd'){//如果类型是重置密码
                const form={
                    user_name:this.userName,
                    email:this.email,
                    new_passwd:this.newPasswd,
                    email_code:this.code
                }
                resetPasswd(form)
                .then(response=>{
                    console.log(response);
                    //代完善
                })
                .catch(error=>{
                    console.error('reset passwd',error);
                    //带完善
                })
                return
            }else{
                return
            }
        },
        resend() {//重新发送验证码
            console.log('resend');
            if(this.type=='register'){
                sendRegisterCode(this.email)
                .then(response=>{this.handleSendCodeResponse(response)})
                .catch(error=>{this.handleError(error)});
            }else if(this.type=='login'){
                sendLoginCode(this.email)
                .then(response=>{this.handleSendCodeResponse(response)})
                .catch(error=>{this.handleError(error)});
            }else if(this.type=='delete'){
                sendDeleteCode(this.email)
                .then(response=>{this.handleSendCodeResponse(response)})
                .catch(error=>{this.handleError(error)});
            }else if(this.type=='reset_passwd'){
                sendResetPasswdCode(this.email)
                .then(response=>{this.handleSendCodeResponse(response)})
                .catch(error=>{this.handleError(error)});
            }
        },
        cancelExamine() {
            //关闭这个窗口
            this.$emit('close');
        },
        handleSendCodeResponse(response){
            console.log(response)
            if (response == 200) {
                this.alertSet.state = true;
                this.alertSet.color = 'success';
                this.alertSet.title = '发送成功';
                this.alertSet.content = '已成功发送验证码至邮箱' + this.emial + '，注意查收邮件';
                this.$emit('alert', this.alertSet);
            } else if (response == 429) {
                this.alertSet.state = true;
                this.alertSet.color = 'error';
                this.alertSet.title = '请求过多';
                this.alertSet.content = '验证码请求过多，例如短时间内多次请求验证码';
                this.$emit('alert', this.alertSet);
            } else {
                this.alertSet.state = true;
                this.alertSet.color = 'error';
                this.alertSet.title = '未知错误';
                this.alertSet.content = '接收到了未知的状态，请联系开发者报告此错误';
                this.$emit('alert', this.alertSet);
            }
        },
        handleError(error){
            console.log(error);
            this.alertSet.state = true;
            this.alertSet.color = 'error';
            this.alertSet.title = '未知错误';
            this.alertSet.content = '程序出现了未知错误，请联系开发者报告此错误';
            this.$emit('alert', this.alertSet);
        },

    },
    components: {},
}
</script>