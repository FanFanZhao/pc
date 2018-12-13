<template>
  <div class="home flex">
    <div class="home-l">
      <div class="tv-box">
        <!-- <tv-top></tv-top> -->
        <tv></tv>
        <!-- <market></market> -->
      </div>
      <div class="entrusts">
        <div class="tab-entrust">
          <!-- <span :class="{active:whichEntrust == 'entrust'}" @click="whichEntrust = 'entrust'">当前委托</span>
          <span
            :class="{active:whichEntrust == 'hisentrust'}"
            @click="whichEntrust = 'hisentrust'"
          >历史委托</span> -->
          <!-- <div class="kb">2kb奖金余量：{{kb}}</div> -->
        </div>
        <div class="scroll">
          <div class="entrust-box" v-if="whichEntrust == 'entrust'">
            <entrust></entrust>
          </div>
          <!-- <div class="histentrust-box" v-if="whichEntrust == 'hisentrust'">
            <hisentrust></hisentrust>
          </div> -->
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
      kb:0
    };
  },
  created() {
    this.token = localStorage.getItem("token") || "";

    // this.getKb();
    // console.log(this.address)
  },
  methods: {
    getKb() {
      this.$http({
        url: "/api/transaction/get_surplus_2kb"
        // headers:{Authorization:this.token}
      }).then(res => {
          console.log(res.data.message);
        if (res.data.type == "ok") {
          var kb = res.data.message;
          if(kb != this.kb){

            this.kb = res.data.message;
          }
        }
      });
    }
  },
  mounted() {
    
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
