<template>
  <div id="page-mining">
    <grand-total></grand-total>
    <div class="md mt20" v-if="token">
      <div class="title flex bg-part" style="padding: 15px 50px 0">
        <span class="ft16">我的收益</span>
      </div>
      <ul class="flex bg-part" style="height:auto">
        <li class="flex1">
          <div>
            <span class="clr-base">昨日挖矿产出</span>
          </div>
          <div>{{mine.yesterday_2kb}}<span class="clr-unit">2kb</span></div>
        </li>
        <li class="flex1">
          <div>
            <span class="clr-base">累计挖矿产出</span>
          </div>
          <div>{{mine.sum_2kb}}<span class="clr-unit">2kb</span></div>
        </li>
        <li class="flex1">
          <div>
            <span class="clr-base">今日个人总收益</span>
          </div>
          <div>{{mine.today_profit}}<span class="clr-unit">usdt</span></div>
        </li>
      </ul>
    </div>
    <div class="md" v-if="token">
      <!-- <div class="title flex bg-part" style="padding: 15px 50px 0">
        <span class="ft16">我的收益</span>
      </div>-->
      <ul class="flex bg-part" style="height:auto">
        <!-- <li class="flex1">
          <div>
            <span>今日个人总收益</span>
          </div>
          <div>{{mine.yesterday}}</div>
        </li> -->
        <li class="flex1">
          <div>
            <span class="clr-base">今日平台总收益</span>
          </div>
          <div>{{mine.global_profit}}<span class="clr-unit">usdt</span></div>
        </li>
        <li class="flex1">
          <div>
            <span class="clr-base">个人占比</span>
          </div>
          <div>{{mine.proportion}}</div>
        </li>
        <li class="flex1">
          <div>
            <span class="clr-base">今日预估个人产出</span>
          </div>
          <div>{{mine.estimate_profit}}<span class="clr-unit">2kb</span></div>
        </li>
      </ul>
    </div>
    <div v-if="token" class="tab flex bg-part">
      <!-- <span :class="['flex1',{now:show == 'total'}]" @click="show = 'total'">累计挖矿数据</span> -->
      <span class="now">盈利详情</span>
    </div>
    <div v-if="token" class="lists bg-part">
      <div class="title flex ft16">
        <span v-if="show == 'total'">历史交易挖矿</span>
        <span
          v-if="show== 'my'"
          :class="{show:show=='my'&&my=='my'}"
          @click="my='my';getLog('today_log',true)"
        >今日收益</span>
        <span
          v-if="show=='my'"
          :class="{show:show=='my'&&my=='myhis'}"
          @click="my='myhis';getLog('history_log',true)"
        >历史收益</span>
      </div>
      <div v-if="show=='total'">
        <div class="list-head flex clr-base">
          <div class="flex1">日期</div>
          <div class="flex1 tc">平台手续费</div>
          <div class="flex1 tr">挖矿产出</div>
        </div>
        <ul class="list">
          <li class="flex clr-light">
            <span class="flex1">啦啦啦</span>
            <span class="flex1 tc">啦啦啦</span>
            <span class="flex1 tr">啦啦啦</span>
          </li>
        </ul>
      </div>
      <div v-if="show=='my'&&my=='my'">
        <div class="list-head flex clr-base">
          <div class="flex1">盈利(2kb)</div>
          <div class="flex1 tc">日期</div>
          <div class="flex1 tr">发放状态</div>
        </div>
        <ul class="list">
          <li class="flex clr-light" v-for="(item,index) in myToday" :key="index">
            <div class="flex1">{{item.money_usdt}}</div>
            <span class="flex1 tc">{{item.create_date}}</span>
            <span class="flex1 tr">{{item.status_name}}</span>
          </li>
        </ul>
        <div class="tc" @click="getLog('today_log')" style="cursor:pointer">加载更多</div>
      </div>
      <div v-if="show=='my'&&my=='myhis'">
        <div class="list-head flex clr-base">
          <div class="flex1">盈利(usdt)</div>
          <div class="flex1 tc">日期</div>
          <div class="flex1 tr">发放状态</div>
        </div>
        <ul class="list">
          <li class="flex clr-light" v-for="(item,index) in myHis" :key="index">
            <div class="flex1">{{item.money_usdt}}</div>
            <span class="flex1 tc">{{item.create_date}}</span>
            <span class="flex1 tr">{{item.status_name}}</span>
          </li>
        </ul>
        <div class="tc" @click="getLog('history_log')" style="cursor:pointer">加载更多</div>
      </div>
    </div>
  </div>
</template>

<script>
import GrandTotal from "../view/GrandTotal";
export default {
  components: { GrandTotal },
  data() {
    return {
      show: "my",
      my: "my",
      histotal: [],
      token: "",
      mine: {
        estimate_profit: '----',
        global_profit: '----',
        proportion: '----',
        sum_2kb: '----',
        today_profit: '----',
        yesterday_2kb: '----'
      },
      myToday: [],
      myHis: [],
      hisPage: 1,
      todayPage: 1
    };
  },
  created() {
    this.token = window.localStorage.getItem("token") || "";
    this.getLog("today_log");
    this.getMine();
  },
  methods: {
    getMine() {
      if (this.token) {
        this.$http({
          url: "/api/return_money/mine",
          headers: { Authorization: this.token }
        }).then(res => {
          if (res.data.type == "ok") {
            this.mine = res.data.message;
          }
        });
      }
    },
    getLog(url, refresh) {
      if (this.token) {
        var i = layer.load();
        if (refresh) {
          if (url == "today_log") {
            this.todayPage = 1;
          } else {
            this.hisPage = 1;
          }
        }
        this.$http({
          url: "/api/return_money/" + url,
          params: {
            page: url == "today_log" ? this.todayPage : this.hisPage
          },
          headers: { Authorization: this.token }
        }).then(res => {
          layer.close(i);
          var list = res.data.message.data;
          if (list.length == 0) {
            layer.msg("暂无更多");
          }
          if (url == "today_log") {
            if (refresh) {
            } else {
              this.myToday = this.myToday.concat(list);
            }
            if (list.length) {
              this.todayPage += 1;
            }
          } else {
            if (refresh) {
              this.myHis = list;
            } else {
              this.myHis = this.myHis.concat(list);
            }
            if (list.length) {
              this.hisPage += 1;
            }
          }
        });
      }
    }
  }
};
</script>

<style lang='scss' scoped>
#page-mining {
  margin: 0 auto;
  width: 1200px;
  font-size: 12px;
  color: #7080a3;
  line-height: 40px;
  .clr-base {
    color: #7080a3;
  }
  .clr-unit{
    color: #7080a3;
    font-size: 12px;
    margin-left: 10px;
  }
  .clr-light {
    color: #b7c2ce;
  }
  ul.flex {
    // margin-top: 30px;
    padding: 10px 0 20px;
    height: 210px;
    line-height: 40px;
    li {
      padding: 0 50px;
      .clr-base {
        margin-right: 5px;
      }
    }
    li:nth-child(n + 2) {
      border-left: 1px solid #25334f;
    }
  }
  .tab {
    margin-top: 20px;
    padding: 10px 50px;
    font-size: 18px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    span {
      background: #101b35;
    }
    .now {
      background: none;
      // color: #2b89e1;
    }
  }
  .lists {
    .title {
      line-height: 45px;
      height: 45px;
      cursor: pointer;
      padding: 0 50px;
      span {
        margin-right: 50px;
      }
      .show {
        color: #2b89e1;
        border-bottom: 1px solid #2b89e1;
      }
    }
    .list-head {
      justify-content: space-between;
      padding: 0 50px;
      cursor: pointer;
    }
    ul.list {
      padding: 10px 50px;
      li {
        justify-content: space-between;
        border-bottom: 1px solid #172d47;
        line-height: 44px;
        height: 44px;
        span:nth-child(2) {
          text-align: center;
        }
        span:nth-child(3) {
          text-align: right;
        }
      }
    }
  }
}
</style>
