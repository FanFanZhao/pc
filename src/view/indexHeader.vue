<template>
	<div class="nav_bar">
		<div class="content clear">
			<div class="fl"><img src="@/assets/images/logo.png" class="navbar-logo"></div>
			<ul  class="navbar-item fl mouseDefault ml20">
				<li  class="base" :class="{active:index==current}"  v-for="(tabs,index) in tabList"  @click="goto(index,tabs.page)">{{tabs.title}}</li>
			</ul>
			<div class="fr">
				<div class="account-box fl positionR curPer">
					<div class="account_login fColor1" v-if="address.length>0">
						<img src="@/assets/images/account.png" alt="">
						<span>{{account_number}}</span>
						<img src="@/assets/images/arrow0.png" alt="">
					</div>
					<div class="account-choose ft14 fColor1">
						<p class="curPer" v-for="(item,index) in accountList" @click="goto(null,item.page)">
							<img :src="item.src1" alt="">
							<img :src="item.src2" alt="">
							<span>{{item.title}}</span>
						</p>
						<p class="curPer" @click="loginOut">
							<img src="@/assets/images/t0.png" alt="">
							<img src="@/assets/images/t1.png" alt="">
							<span>退出登录</span>
						</p>
					</div>
				</div>
				<div  class="fl login mr50" v-if="address.length<=0">
					<router-link :to="{ name: 'login'}">
						<span>登录</span>
					</router-link>
					<router-link :to="{ name: 'register'}">
						<span  class="ml20">注册</span>
					</router-link>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	export default {
		name: "indexHeader",
		data() {
			return {
				address:'',
				account_number:'',
				current:0,
				tabList:[
					{title:'首页',page:'homeContent'},{title:'交易',page:'dealCenter'},
					{title:'我的资产',page:'homeContent'},{title:'APP下载',page:'homeContent'}
				],
				accountList:[
					{
						src1: require("@/assets/images/m0.png"),
						src2: require("@/assets/images/m1.png"),
						title: '我的资产',
						page:'accountCenter'
					},
					{
						src1: require("@/assets/images/e0.png"),
						src2: require("@/assets/images/e1.png"),
						title: '我的委托',
						page:'accountEntrust'
					},
					{
						src1: require("@/assets/images/c0.png"),
						src2: require("@/assets/images/c1.png"),
						title: '充值',
						page:'recharge'
					},
					{
						src1: require("@/assets/images/z0.png"),
						src2: require("@/assets/images/z1.png"),
						title: '账户设置',
						page:'accountSet'
					},
					{
						src1: require("@/assets/images/s0.png"),
						src2: require("@/assets/images/s1.png"),
						title: '承兑商',
						page:'aceite'
					}
				]
			}
		},
		created(){
			this.address = localStorage.getItem('address') || '';
			var address=this.address;
			if (address != ""){
				this.$http({
					url: this.$utils.laravel_api + 'user/getuserbyaddress',
					method:'post',
					data:{
						address:address
					}
				}).then(res=>{
					res = res.data;
					if(res.type  === 'ok'){
						// console.log(res.message)
						this.account_number=res.message.account_number
					}else{
						layer.msg(res.message);
					}
				}).catch(error=>{
					console.log(error)
				})
			}
		},
		mounted(){
			this.bus.$on("nav_name", name =>{
				console.log(name)
				this.current = this.tabList.findIndex( val => val.page === name || (val.children && val.children.includes(name))) ;
				console.log(this.current)
			})
		},
		methods : {
			goto(index,name) {
				this.current=index;
				console.log(index,name)
				// this.bus.$emit('nav_name',name);
				this.$router.push({name: name})
			},
			loginOut(){
				console.log("out")
				localStorage.removeItem("address");
				this.$router.push({name: 'login'})
			}
		}
	}
</script>

<style scoped lang='scss'>
	.nav_bar{
		@include line-height(60px);
		width: 100%;
		min-width: 1200px;
		padding: 0 30px;
		background: #1a2330;
		.content{
			width: 1200px;
			margin: 0 auto;
		}

		.navbar-logo{
			vertical-align: middle;
		}
		.account-box:hover .account-choose{
			display: block;
		}
		.account_login{
			width: 188px;
		}
		.account-choose{
			display: none;
			cursor: default;
			position: absolute;
			top: 60px;
			right: 0;
			width: 188px;
			line-height: 40px;
			background-color: #273142;
			z-index: 5000;
			border-radius: 3px;
			box-shadow: 0 0 2px 4px rgba(0,0,0,.2);
			p{
				padding-left: 20px;
				img{
					width: 14px;
					vertical-align: middle;
					margin-right: 8px;
					display: inline-block;
				}
				img:nth-child(2){
					display: none;
				}
			}
			p:hover{
				color: #5697f4;
				background-color: #1a2330;
			}
			p:hover img:nth-child(2){
				display:inline-block;
			}
			p:hover img:nth-child(1){
				display: none;
			}

		}
		.navbar-item{
			color: #cdd6e4;
			li{
				float: left;
				height: 60px;
				line-height: 60px;
				padding: 0 30px;
				display: inline-block;
				text-align: center;
				vertical-align: middle;
				font-size: 14px;
				cursor:pointer;
				&.active{
					border-bottom: 1px solid #5697f4;
				}
			}

		}
		.login{
			color: #cdd6e4;
			margin-right: 50px;
			span{
				cursor:pointer;
			}
			.ml20{
				margin-left:20px;
			}
		}
	}
</style>
