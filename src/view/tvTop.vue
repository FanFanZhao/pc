<template>
  <div id="tv-top">
    <span>{{leftName}}/{{rightName}}</span>
    <span class="lastprice">{{lastPrice}}</span>
    <span>≈{{lastPrice*6.5}}CNY</span>
    <span>涨幅 {{downUp}}%</span>
    <span>高 {{coin.high}}</span>
    <span>低 {{coin.low}}</span>
    <span>24H量 {{coin.total}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leftName: "",
      rightName: "",
      legalId: "",
      curencyId: "",
      coin: {},
      lastPrice: "",
      downUp: ""
    };
  },
  created() {
    this.leftName = window.localStorage.getItem("legal_name") || "";
    this.rightName = window.localStorage.getItem("currency_name") || "";
    this.currencyId = window.localStorage.getItem("legal_id");
    this.legalId = window.localStorage.getItem("currency_id");
    this.init(this.legalId, this.currencyId);
    this.downUp = window.localStorage.getItem("downUp");
  },
  mounted() {
    var that = this;
    eventBus.$on("toNew", function(msg) {
      // console.log('laaaaaaaaa',msg);
        var thattoken = that.rightName+'/'+that.leftName;
        if(msg.istoken == thattoken){
          that.lastPrice = (msg.newprice-0).toFixed(4);
          that.downUp = (msg.newup-0).toFixed(2);
          that.coin.total = msg.hour24;
        }
      
    });
    eventBus.$on('toTvTop',function(data){
      if(data.hour24){

        that.coin.total = data.hour24;
      }
    })
  },
  methods: {
    init(legalId, currencyId) {
      this.$http({
        url: "/api/transaction/deal",
        method: "post",
        data: {
          legal_id: legalId,
          currency_id: currencyId
        }
      }).then(res => {
        if (res.data.type == "ok") {
          this.coin = res.data.message["24h"];
          this.lastPrice = res.data.message.last_price;
        }
      });
    }
  }
};
</script>

<style lang='scss'>
#tv-top {
  background: #181b2a;
  color: #c7cce6;
  > span:first-child {
    font-size: 20px;
    font-weight: 600;
  }
  > .lastprice {
    color: #7a98f7;
    font-size: 18px;
    font-weight: 600;
  }
  > span {
    line-height: 40px;
    margin: 0 16px;
  }
}
</style>
