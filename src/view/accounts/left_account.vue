<template>
	<div class="leftNav ft14">
		<ul class="fColor1">
			<li v-for="(item,index) in array" :class="index == curActive ? 'active' :''" @click="goto(index,item.page)">
				<img :src="index == curActive ? item.src2 : item.src1"/>
				<span>{{item.text}}</span>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		name: "left_account",
		data() {
			return {
				curActive:0,
				array:[
					{
						src1: require("@/assets/images/icon_mine.png"),
						src2: require("@/assets/images/icon_mine_s.png"),
						text: '交易账户',
						page:'finance',
						children:['finance']
					},

					{
						src1: require("@/assets/images/icon_delegate.png"),
						src2: require("@/assets/images/icon_delegate_s.png"),
						text: '杠杆账户',
						page:'lever',
						children:['lever']
					},
					{
						src1: require("@/assets/images/icon_delegate.png"),
						src2: require("@/assets/images/icon_delegate_s.png"),
						text: '法币账户',
						page:'legal',
						children:['legal']
					}
					
				],
			}
		},
		created(){
			let name = this.$route.name;
			this.curActive = this.array.findIndex( val => val.page === name || (val.children && val.children.includes(name))) ;
			console.log(name,this.curActive)

		},
		mounted(){
			this.bus.$on("nav_name", name =>{
				this.curActive = this.array.findIndex( val => val.page === name || (val.children && val.children.includes(name))) ;
				console.log(this.curActive)
			})
		},
		methods: {
			goto(index,name) {
				this.curActive=index;
				this.$router.push({name: name, params: {lang: this.lang}})
			},

		}
	};
</script>
<style lang="scss" scoped>
	.leftNav{
		
		ul{
			height:820px;
			li{
				height:54px;
				line-height:54px;
				padding-left:38px;
				margin-bottom:4px;
				cursor:pointer;
				img{
					margin-right:12px;
					margin-top:-4px;
					width:20px;
					vertical-align: middle;
				}
			}
			.active{
				color:rgb(86, 151, 244);
				background-color: rgb(39, 49, 66);
				border-bottom: none;
				display: block;
			}
		}
	}
</style>


