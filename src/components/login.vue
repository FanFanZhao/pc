<template>
<div class="login">
    <indexHeader></indexHeader>
    <div class="contentBK">
        <div class="content-wrap">
            <div class="account">
                <div class="main">
                    <p class="main_title tc">账户登录</p>
                    <div class="input-box">
                        <input type="text" placeholder="已绑定手机/邮箱" maxlength="20" class="input-main" v-model="account_number" id="account">
                        <div class="icon tc">
                            <img src="../assets/images/user.png" alt="">
                        </div>
                    </div>
                    <div class="input-box">
                        <input type="password" placeholder="密码" maxlength="16" class="input-main" v-model="password" id="pwd">
                        <div class="icon tc">
                            <img src="../assets/images/lock.png" alt="">
                        </div>
                    </div>
                    <p class="forgot curPer tr mt10">
                        <router-link :to="{ name: 'register'}">
                          <span class="baseColor">忘记密码</span>
                        </router-link>
                    <div class="login-btn tc" @click="login">登录</div>
                    <div class="noaccount tc mt20">
                        <span>暂无账号，</span>
                        <router-link :to="{ name: 'register'}">
                          <span class="baseColor">立即注册</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import indexHeader from '@/view/indexHeader'
    export default {
        name: "login",
        components:{indexHeader},
        data (){
            return{
                account_number:'',
                password:'',
            }
        },
		created (){
			this.account_number = this.$route.query.account_number
		},
        methods:{
            login(){
                let account_number = this.$utils.trim(this.account_number);
                let password = this.$utils.trim(this.password);
                if(this.account_number.length<1){
                    layer.tips('请输入正确账号!', '#account');
                    return;
                }
                if(this.password.length<6){
                    layer.tips('密码不能小于六位!', '#pwd');
                    return;
                }
                this.$http({
					url: this.$utils.laravel_api + 'user/login',
					method:'post',
					data:{
						account_number: account_number,
						password : password
					}
				}).then(res=>{
					res = res.data;
					if(res.type  === 'ok'){
						localStorage.setItem('address',res.message);
                        this.$router.push({name: 'home'});
					}else{
						layer.msg(res.message);
					}
				}).catch(error=>{
					console.log(error)
				})
            }
        }

    }
</script>

<style scoped>
	.content-wrap {background: url(../assets/images/login_bg.png) no-repeat;background-size: cover;}
	.account{width: 1500px;margin: 0 auto;padding-top: 30px;overflow: hidden;min-height: 880px;}
	.main{width: 420px;margin: 0 auto;padding-top: 110px;}
	.main_title{font-size: 36px;color: #cdd6e4;}
	.input-box{position: relative;margin-top: 40px;}
	.input-main{width: 420px;height: 48px;border: 1px solid #52688c;padding: 0 20px;color: #cdd6e4;font-size: 16px;border-radius: 3px;background-color: #262a42;padding-left: 68px; }
	.icon{width: 48px;height: 48px;line-height: 48px;border-right: 1px solid #52688c;position: absolute;top: 0;}
	.login-btn{width: 420px;margin-top: 40px;background: #5697f4;font-size: 16px;border-radius: 4px;color: #fff;line-height: 48px;cursor: pointer;}
	.noaccount{color: #fff;}
</style>
