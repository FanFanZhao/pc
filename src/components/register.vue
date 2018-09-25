<template>
	<div class="register">
		<indexHeader></indexHeader>
		<div class="contentBK">
			<div class="content-wrap">
				<div class="account">
					<div class="main-register">
						<p class="main_title">欢迎注册</p>
						<div class="choose-register mt20 fColor1 ">
							<span class="active">手机注册</span>
							<span >邮箱注册</span>
						</div>
						<div class="register-input">
							<span class="register-item">国籍</span>
							<div class="select-box arrow positionR curPer" style="width:520px" @click="select">
                               <input type="text" class="input-main input-content" readonly v-model="nation" >
							</div>
							<div class="selectitem  scroll" v-show="iSnation">
								<p class="titles">常用</p>
								<ul class="nationul">
									<li v-for="(item,index) in nationList">
										<span class="fl">{{item.ename}}</span>
										<span class="fr">{{item.cname}}</span>
									</li>
								</ul>
							</div>
						</div>
						<div class="register-input">
							<span class="register-item">手机号码</span>
							<div class="select-box positionR">
								<span class="phoneleft arrow">+86</span>
                               <input type="text" class="input-main input-content"  maxlength="11" v-model="phone" style="padding-left: 122px;">
							</div>
						</div>
						<div class="register-input hide" >
							<span class="register-item">邮箱地址</span>
							<input type="text" class="input-main input-content">
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
							<input type="password"  class="input-main input-content" v-model="pwd">
						</div>
						<div class="register-input">
							<span class="register-item">确认密码</span>
							<input type="password" class="input-main input-content" v-model="re_pwd">
						</div>
						<div class="register-input">
							<span class="register-item">邀请码</span>
							<input type="password"  class="input-main input-content" v-model="parent">
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
						<div class="right-tip ">
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
				nation:"China",
				phone: '',
				pwd: '',
				re_pwd: '',
				parent: '',
				agree_protocol: true,
				iSnation:false,
				nationList:[{ename:"China",cname:"中国"},{ename:"Japan",cname:"日本"},{ename:"Korea",cname:"韩国"},]
			}
		},
		methods:{
			select(){
                this.iSnation=!this.iSnation
			},
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
	.content-wrap{background: url(../assets/images/bg_login.png) center bottom 316px repeat-x,-webkit-linear-gradient(top,#21263f,#262a42);}
	.account{width: 1200px;margin: 0 auto;padding-top: 93px;overflow: hidden;min-height: 880px;}
	.main-register{position: relative;padding: 0 0 60px 30px;}
	.main_title{font-size: 36px;color: #c7cce6;}
	.choose-register span{line-height: 50px;height: 50px;display: inline-block;cursor: pointer;}
	.choose-register span:nth-child(1){margin-right: 80px;}
	.active{color: #7a98f7;border-bottom: 2px solid #7a98f7;}
	.register-item{display: block;height:22px;color: #61688a;font-size: 12px}
	.register-input{position: relative;margin-top: 20px}
	.input-main{width: 520px;min-height: 46px;border: 1px solid #4e5b85;padding: 0 20px;color: #c7cce6;font-size: 14px;border-radius: 3px;background-color: #1e2235;padding-left: 68px; }
	.input-content{width: 520px;padding-left:20px;}
	.arrow:after{content: "";position: absolute;right: 5px;top: 50%;margin-top: -3px;border-bottom: 0;border-top: 6px solid #ccc;border-right: 6px dashed transparent;border-left: 6px dashed transparent;}
	.pic-code{position: absolute;left: 430px;top: 0;width: 100px;height: 46px;display: inline-block;}
	.phoneleft{position: absolute;width: 100px;height: 46px;line-height:46px;left: 0px;padding-left:15px;font-size: 14px;color: #c7cce6;border-right: 2px solid #4e5b85;}
	.msg-code{position: absolute;left: 422px;top: 1px;width: 110px;height: 46px;font-size: 14px;}
	.msg-code span{display: block;border-left: 1px solid #52688c;height: 20px;line-height: 20px;margin-top: 14px;}
	.selectitem{width: 520px;box-shadow: 0 2px 6px 0 #000;border-color: #4e5b85;background-color: #1e2235;color: #61688a;position: absolute;z-index: 5;left: 0;max-height: 290px;overflow-y: auto;}
	.titles{height: 32px;line-height: 32px;background-color: #1b1e2e;color: #61688a;padding: 0 20px;cursor: auto;}
	.nationul li{height: 48px;line-height: 48px;border-top: 1px solid #4e5b85;padding: 0 20px;cursor: pointer;}
	.nationul li:hover{background:#262a42;}
	.register-agree{margin-top: 20px;font-size: 14px;}
	.agree{position: relative;top: 2px;}
	.register-button{margin-left: 20px;width:200px;display: inline-block;line-height: 46px;background-color: #7a98f7;border-radius: 4px;color: #fff;border: none}
	.have-account{font-size: 14px;display:inline-block;width: 240px;text-align: right;color: #fff;}
	.right-tip{position: absolute;left: 620px;top: 140px;line-height: 24px;padding-right: 50px;margin-top: 10px;font-size: 14px;color: #61688a;}
</style>
