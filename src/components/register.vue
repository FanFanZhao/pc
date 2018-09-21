<template>
	<div class="register">
		<indexHeader></indexHeader>
		<div class="contentBK">
			<div class="content-wrap">
				<div class="account">
					<div class="main-register">
						<p class="main_title">账户注册</p>
						<div class="choose-register mt20 fColor1 hide">
							<span >手机注册</span>
							<span >邮箱注册</span>
						</div>
						<div class="register-input">
							<span class="register-item">手机号码</span>
							<input type="text" class="input-main input-content" placeholder="请输入正确手机号" maxlength="11" v-model="phone" style="padding-left: 120px;">
							<span class="phoneleft">+86</span>
						</div>
						<div class="register-input hide" >
							<span class="register-item">邮箱地址</span>
							<input type="text" class="input-main input-content" placeholder="请输入您的邮箱地址">
						</div>
						<div class="register-input hide">
							<span class="register-item">验证码</span>
							<input type="text" class="input-main input-content" maxlength="6" style="width:316px">
							<img src="http://116.62.127.60:8110/api/web/registLogin/getImageCode?uuid=6d60-89f6-6da1-e7be-32d0d77b4171&language=zh" alt="" class="pic-code curPer">
						</div>
						<div class="register-input hide">
							<span class="register-item">短信验证码</span>
							<input type="password" class="input-main input-content" maxlength="6">
							<div class="msg-code tc baseColor curPer">
								<span>获取验证码</span>
							</div>
						</div>
						<div class="register-input hide">
							<span class="register-item">邮箱验证码</span>
							<input type="password" class="input-main input-content" maxlength="6">
							<div class="msg-code tc baseColor curPer">
								<span>获取验证码</span>
							</div>
						</div>
						<div class="register-input">
							<span class="register-item">登录密码</span>
							<input type="password" placeholder="最少6位"  class="input-main input-content" v-model="pwd">
						</div>
						<div class="register-input">
							<span class="register-item">确认密码</span>
							<input type="password" placeholder="请再次输入登录密码"  class="input-main input-content" v-model="re_pwd">
						</div>
						<div class="register-input">
							<span class="register-item">邀请码</span>
							<input type="password" placeholder="请输入邀请码"  class="input-main input-content" v-model="parent">
						</div>
						<div class="register-agree">
							<span class="register-item" style="margin-right: 20px;"></span>
							<input type="checkbox" class="agree" v-model="agree_protocol">
							<span class="fColor1">我已阅读并同意</span>
							<span class="baseColor curPer" id="protocol">《用户协议》</span>
						</div>
						<div style="margin-top: 10px;">
							<span class="register-item"></span>
							<button class="register-button" @click="register">注册</button>
							<div class="have-account">
								<span>已有账号，</span>
								<router-link :to="{name:'login'}">
									<span class="baseColor">立即登录</span>
								</router-link>
							</div>
						</div>
						<div class="right-tip hide">
							<p>海外用户建议使用邮箱注册，避免接收不到短信验证码的情况</p>
							<p style="margin-top: 20px;">验证邮件可能被误判为垃圾邮件，请注意查收</p>
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
		name: "register",
		components:{indexHeader},
		data (){
			return{
				phone: '',
				pwd: '',
				re_pwd: '',
				parent: '',
				agree_protocol: true
			}
		},
		methods:{
			register() {
				let that = this;
				let phone = this.$utils.trim(this.phone);
				let parent = this.$utils.trim(this.parent);
				if(phone.length < 11){
					layer.alert('请输入正确的手机号');
					return;
				}
				if(this.pwd !== this.re_pwd){
					layer.alert('两次输入密码不一致');
					return;
				}
				if(this.pwd.length < 6){
					layer.alert('密码最少为6位');
					return;
				}
				// if(parent === ""){
				// 	layer.alert('请输入邀请码');
				// 	return;
				// }
				if(!this.agree_protocol){
					layer.alert('您还未同意注册协议');
					return;
				}
				this.$http({
					url: this.$utils.laravel_api + 'user/register',
					method:'post',
					data:{
						password: this.pwd,
						account_number: phone,
						parent_id : parent
					}
				}).then(res=>{
					res = res.data;
					if(res.type  === 'ok'){
						layer.confirm('您已成功注册！',{
							btn:['去登录']
						},function(){
							layer.closeAll();
							that.$router.push({
								name: 'login',
								query:{account_number: phone}
							})
						})
					}else{
						layer.alert(res.message);
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
	.main-register{padding: 60px 0 124px 150px;line-height: 48px;position: relative;}
	.main_title{font-size: 36px;color: #cdd6e4;}
	.choose-register span{line-height: 50px;height: 50px;display: inline-block;cursor: pointer;}
	.choose-register span:nth-child(1){margin-right: 60px;}
	.active{color: #5697f4;border-bottom: 2px solid #5697f4;}
	.register-item{display: inline-block;width: 80px;text-align: right;color: #637085;}
	.register-input{position: relative;margin-top: 40px;}
	.input-main{width: 420px;height: 48px;border: 1px solid #52688c;padding: 0 20px;color: #cdd6e4;font-size: 16px;border-radius: 3px;background-color: #262a42;padding-left: 68px; }
	.input-content{margin-left: 20px;width: 428px;padding-left:20px;}
	.pic-code{position: absolute;left: 430px;top: 0;width: 100px;height: 48px;display: inline-block;}
	.phoneleft{position: absolute;width: 100px;height: 48px;text-align: center;left: 100px;font-size: 16px;color: #cdd6e4;border-right: 1px solid #52688c;}
	.msg-code{position: absolute;left: 422px;top: 1px;width: 110px;height: 46px;font-size: 16px;}
	.msg-code span{display: block;border-left: 1px solid #52688c;height: 20px;line-height: 20px;margin-top: 14px;}
	.register-agree{margin-top: 50px;font-size: 14px;}
	.agree{position: relative;top: 2px;}
	.register-button{margin-left: 20px;width:200px;display: inline-block;line-height: 48px;background-color: #5697f4;border-radius: 4px;color: #fff;border: none}
	.have-account{font-size: 14px;display:inline-block;width: 240px;text-align: right;color: #fff;}
	.right-tip{position: absolute;left: 800px;top: 200px;line-height: 24px;padding-right: 50px;margin-top: 10px;font-size: 14px;color: #637085;}
</style>
