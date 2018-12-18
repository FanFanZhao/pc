<template>
  <ul class="flex bg-part mt20 grandtotal" style="height:auto;padding: 20px 30px">
    <li class="flex1">
      <div>
        <span class="clr-base">今日释放量</span>
        <span class="clr-light">{{msg.today}}</span>
      </div>
      <div>
        <span class="clr-base">累计释放量</span>
        <span class="clr-light">{{msg.sum}}</span>
      </div>
    </li>
    <li class="flex1">
      <div>
        <span class="clr-base">今日全网盈利总额</span>
        <span class="clr-light">{{msg.global_profit_usdt}}</span>
      </div>
      <div>
        <span class="clr-base">每百usdt预估收益</span>
        <span class="clr-light">{{msg.estimate_profit}}</span>
      </div>
    </li>
    
    <li class=" flex">
      <div>
        <span class="clr-base">今日手续费收入</span>
        <span class="clr-light">{{msg.today_fee}}</span>
      </div>
      <div>
        <span class="clr-base">累计手续费收入</span>
        <span class="clr-light">{{msg.sum_fee}}</span>
      </div>
      <div>
        <span class="clr-base">待分红金额</span>
        <span class="clr-light">{{msg.wait_bonus}}</span>
      </div>
      <div>
        <span class="clr-base">待回购资金余额</span>
        <span class="clr-light">{{msg.wait_buy_back}}</span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      msg: {
        estimate_profit: "----",
        global_profit_usdt: "----",
        sum: "----",
        sum_fee: "----",
        today: "----",
        today_fee: "----",
        wait_bonus: "----",
        wait_buy_back: "----"
      },
      history: {
        number: "----",
        sum: "----"
      },
      today: {
        profit: "----",
        profit_usdt: "----",
        surplus: "----"
      },
      yesterday: {
        number: "----",
        sum: "----"
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http({
        url: "/api/return_money/global"
      }).then(res => {
        console.log(res);
        if (res.data.type == "ok") {
          // this.history = res.data.message.history;
          // this.today = res.data.message.today;
          // this.yesterday = res.data.message.yesterday;
          this.msg = res.data.message;
        }
      });
    }
  }
};
</script>

<style lang='scss'>
.grandtotal {
  width: 100%;
  max-width: 1500px;
  margin: 20px auto 20px;
  justify-content: space-between;
  .clr-base {
    color: #7080a3;
    width: 120px;
  }
  .flex{
    flex-wrap: wrap;
  }
  .clr-light {
    color: #b7c2ce;
  }
  padding: 10px 0 10px;
  height: 210px;
  line-height: 40px;
  li {
    padding: 0 16px;
    font-size: 14px;
    > div {
      display: flex;
    }
    .clr-base {
      margin-right: 5px;
    }
  }
  li.flex{
    flex: 2;
    >div{
      width: 50%;
    }
  }

  li:nth-child(n + 2) {
    border-left: 1px solid #25334f;
  }
}
</style>
