<template>
	<div class="home">
		<div class="main">
			<div class="main-l fl" >
				<div class="sidebar">
          <market></market>
        </div>
				<div class="notice_box" style="margin-top:10px">
        <notice></notice>
      </div>
			</div>
			<div class="main-r">
				<div class="chart_wrap">
          <chart></chart>
        </div>
				<div class="parts clear">
					<div class="trade-wrap fl" style="width:66%">
						<trade></trade>
					</div>
					<div class="deadl-wrap fl" style="width:33%">
						<deal></deal>
					</div>
				</div>
			</div>
		</div>
		<div class="home-b">
			<div class="entrust_box">
          <entrust></entrust>
      </div>
			<div class="deatil_box" style="margin:40px 0">
          <detail></detail>
        </div>
				<div class="currency_box">
        <currency></currency>
      </div>
		</div>
	</div>
</template>

<script>
	import indexHeader from '@/view/indexHeader'
	import notice from '@/components/noticeLIst'
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
		
		.main-l{
			
			width: 360px;
			height: 100%;
			>div{
				background: #181b2a;
				margin: 10px;
			}
		}
		.main-r{
			padding: 10px 10px 10px 360px;
			.parts{
				margin-top: 10px;
				background: #181b2a;
			}
		}
	}
}
</style>
