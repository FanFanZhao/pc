<template>
  <div class="home flex">
    <div class="home-l">
      <div class="tv-box">
       
        <tv></tv>
        <!-- <market></market> -->
      </div>
      <div class="entrusts">
        <div class="tab-entrust">
         
          <div class="kb" v-if="token">
            <span>建仓成本：{{cost}}</span>
            <span>建仓数量：{{position}}</span>
          </div>
        </div>
        <div class="scroll">
          <div class="entrust-box" v-if="whichEntrust == 'entrust'">
            <entrust></entrust>
          </div>
        
        </div>
      </div>
    </div>
    <div class="home-r">
      <div class="home-r-t flex">
        <div class="exchage-box">
          <exchange></exchange>
        </div>
        <div class="complete-box">
          <complete></complete>
        </div>
      </div>
      <div class="home-r-b">
        <trade></trade>
      </div>
    </div>
  </div>
</template>

<script>
import indexHeader from "@/view/indexHeader";
import notice from "@/components/noticeList";
import deal from "@/view/deal";
import exchange from "@/view/exchange";
// import market from "@/view/market";
import trade from "@/view/trade";
import chart from "@/view/chart";
import entrust from "@/view/entrust";
import hisentrust from "@/view/hisentrust";
// import detail from "@/view/detail";
import currency from "@/view/currency";
import complete from "@/view/complete";
// import kline from "@/view/kline";
import tv from "@/view/tv";
// import TvTop from '../view/tvTop'
export default {
  name: "dealCenter",
  components: {
    indexHeader,
    load: 1,
    notice,
    deal,
    exchange,
    // market,
    trade,
    chart,
    entrust,
    hisentrust,
    // detail,
    currency,
    complete,
    // TvTop,
    // kline,
    tv
  },
  data() {
    return {
      isRouterAlive: true,
      whichEntrust: "entrust",
      token: "",
      kb:0,
      cost:'---',
      position:'----'
    };
  },
  created() {
    this.token = localStorage.getItem("token") || "";
    this.getDeal();
  },
  methods: {
    getDeal() {
      var currencyId = localStorage.getItem("legal_id") || '';
    var legalId = localStorage.getItem("currency_id") || '';
    if(currencyId !== ''&&legalId !== ''&&this.toekn)
      this.$http({
        url: "/api/transaction/deal",
        method:'post',
        data:{
          legal_id:legalId,
          currency_id:currencyId
        },
        headers:{Authorization:this.token}
      }).then(res => {
        if(res.data.type == 'ok'){
          this.cost = res.data.message.cost;
          this.position = res.data.message['position_number'];
        }
      });
    }
  },
  mounted() {
    eventBus.$on("createTrade", function(data) {
      if(data == 'yes'){
        this.getDeal();
      }
    });
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
  height: calc(100% - 50px);
  .tab-entrust{
    position: relative;
  .kb {
    position: absolute;
    top: 8px;
    right: 10px;
    color: #7a98f7;
    font-size: 12px;
  }
  }
  margin-top: 6px;
  justify-content: space-between;
  > .home-l {
    width: calc(100% - 687px);
    > .entrusts {
      margin-top: 8px;
      padding: 0 15px;
      background: #0a152d;
      height: calc(100% - 600px);
      > .tab-entrust {
        color: rgba(255, 255, 255, 0.8);
        font-size: 14px;
        line-height: 1.6;
        height: 0;
        span {
          margin-right: 14px;
          line-height: 30px;
        }
        .active {
          // border-bottom: 1px solid #ccc;
        }
      }
    }
  }
  > .home-r {
    width: 680px;
    > .home-r-t {
      justify-content: space-between;
      min-height: 220px;
      max-height: calc(100% - 480px);
      > div {
        width: 337px;
        background: #0a152d;
      }
    }
    > .home-r-b {
      margin-top: 8px;
      background: #0a152d;
      height: 360px;
    }
  }
}
</style>
