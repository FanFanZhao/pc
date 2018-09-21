<template>
	<div class="home">
		<!-- <indexHeader></indexHeader> -->
		<!--主题部分-->
		<div class="main">
			<div class="notice_box">
				<notice></notice>
			</div>
			<div class="trade_top">
				<div class="sidebar fl">
					<market></market>
				</div>
				<div class="chart_wrap">
					<chart></chart>
				</div>
			</div>
			<div class="trade_panel">
				<div class="panel_left fl">
					<trade></trade>
				</div>
				<div class="panel_center fl">
					<div class="panel_center_content">
						<exchange></exchange>
					</div>
				</div>
				<div class="panel_right fl">
					<deal></deal>
				</div>
			</div>
			<div class="trade_entrust" v-if="address.length>0">
				<div class="entrust_box">
					<entrust></entrust>
				</div>
			</div>
			<div class="trade_detail" v-if="address.length>0">
				<div class="deatil_box">
					<detail></detail>
				</div>
			</div>
			<div class="currency_box">
				<currency></currency>
			</div>
		</div>
	</div>
</template>

<script>
	import indexHeader from '@/view/indexHeader'
	import notice from '@/view/notice'
	import deal from '@/view/deal'
	import exchange from '@/view/exchange'
	import market from '@/view/market'
	import trade from '@/view/trade'
	import chart from '@/view/chart'
	import entrust from '@/view/entrust'
	import detail from '@/view/detail'
	import currency from '@/view/currency'
	export default {
		name: "dealCenter",
		components:{
			indexHeader,
			notice,
			deal,
			exchange,
			market,
			trade,
			chart,
			entrust,
			detail,
			currency
		},
		data(){
			return{
               
			}
		},
		created(){
			this.address = localStorage.getItem('address') || '';
			// console.log(this.address)
		}
	}
</script>

<style scoped lang="scss">
	.home{

		.main{
			margin-top:10px;
			.notice_box{
				height:40px;
				padding: 0 10px;
			}
			.trade_top{
				height: 540px;
				background-color: #273142;
				padding: 0 10px;
				.sidebar{
					width: 23%;
					height: 100%;
					float: left;
					background-color: #1f2938;
				}
				.chart_wrap{
					height: 100%;
					margin-left: 23%;
					padding-left: 10px;
				}
			}
			.trade_panel{
				height: 660px;
				background-color: #273142;
				padding: 10px;
				&>*{
					height: 100%;
				}
				.panel_left{
					width: 48%;
					background-color: #1a2330;
				}
				.panel_center{
					width: 27%;
					padding: 0 10px;
					.panel_center_content{
						width: 100%;
						height: 100%;
						background-color: #1a2330;
					}
				}
				.panel_right{
					width:25%;
					background-color: #1a2330;
				}
			}
			.trade_entrust{
				padding: 0 10px;
				background-color: #273142;
				.entrust_box{
					width: 100%;
					height: 100%;
					background-color: #1a2330;
				}
			}
			.trade_detail{
				padding:10px;
				background-color: #273142;
				.deatil_box{
					width: 100%;
					height: 100%;
					background-color: #1a2330;
				}
			}
			.currency_box{
				padding: 0 10px;
				background-color: #273142;
			}
		}
	}
</style>
