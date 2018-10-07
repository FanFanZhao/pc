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
          <!-- <chart></chart> -->
          <kline></kline>
        </div>
				<div class="parts  flex between" >
					<div class="trade-wrap part-l">
						<trade></trade>
					</div>
					<div class="deadl-wrap part-r">
						<exchange></exchange>
					</div>
				</div>
        <div class="entrust_box" style="background: #181b2a;">
          <entrust></entrust>
        </div>
        <div class="entrust_box" style="background: #181b2a;">
          <hisentrust></hisentrust>
        </div>
        <!-- <div class="deatil_box" style="background: #181b2a;">
            <detail></detail>
        </div> -->
        <div class="deatil_box" style="background: #181b2a;">
          <complete></complete>
        </div>
				<div class="currency_box">
          <currency></currency>
        </div>
				<!-- <div class="depth-map flex btween" >
					<deal></deal>
				</div> -->

			</div>
		</div>
		
	</div>
</template>

<script>
import indexHeader from "@/view/indexHeader";
import notice from "@/components/noticeList";
import deal from "@/view/deal";
import exchange from "@/view/exchange";
import market from "@/view/market";
import trade from "@/view/trade";
import chart from "@/view/chart";
import entrust from "@/view/entrust";
import hisentrust from "@/view/hisentrust";
import detail from "@/view/detail";
import currency from "@/view/currency";
import complete from "@/view/complete";
import kline from "@/view/kline";
export default {
  name: "dealCenter",
  
  components: {
    indexHeader,
    load:1,
    notice,
    deal,
    exchange,
    market,
    trade,
    chart,
    entrust,
    hisentrust,
    detail,
    currency,
    complete,
    kline
  },
  data() {
    return {};
  },
  created() {
    this.address = localStorage.getItem("address") || "";
   
    // console.log(this.address)
  },
  mounted(){
    // console.log('wejdewhbewjdbewjdhbcwj')
    // if(this.load==1){
    //   console.log(1111)
    //   window.location.reload();
    //   this.load=2;
    // }
   
  }
};
</script>

<style scoped lang="scss">
.home {
  .main {
      overflow: hidden;
    .main-l {
      width: 360px;
      height: 100%;
      margin-top: 10px;
      > div {
        background: #181b2a;
        margin: 0 10px 10px;
      }
    }
    .main-r {
      padding: 0 10px 10px 360px;
      .parts {
        margin-top: 10px;
        max-height: 530px;

        > .part-l {
          background: #181b2a;
          min-width: 67%;
          padding-bottom: 20px;
        }
        > .part-r {
          width: 33%;
          > div {
            margin-left: 10px;
            background: #181b2a;
            height: 100%;
            padding-bottom: 20px;
          }
        }
      }
      >div{
        //  background: #181b2a;
         margin-top: 10px;
      }
      .depth-map {
        max-height: 500px;
        margin-top: 10px;
      }
    }
  }
}
</style>
