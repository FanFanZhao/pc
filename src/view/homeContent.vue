<template>
    <div class="indexBlackes">
        <div class="swiper-container banner_wrap swiper-container-horizontal">
            <div class="swiper-wrapper">
               <div class="swiper-slide sliders">
                   <a href="">
                   <img src="../../static/imgs/bg01.png" />
                   </a>
               </div>
                <div class="swiper-slide sliders">
                   <a href="">
                   <img src="../../static/imgs/bg02.png" />
                   </a>
               </div>
               <div class="swiper-slide sliders">
                   <a href="">
                   <img src="../../static/imgs/bg03.png" />
                   </a>
               </div>
            </div>
             <div class="swiper-pagination swiper-pagination02"></div>
        </div>
       
       
        <div class="coins-list">
          <div class="coin-tab">
            <ul class="coins">
              <li v-for="(coin,index) in quotation" :key="index" @click="nowCoin = coin.name" :class="{activeCoin:nowCoin == coin.name}">{{coin.name}}</li>
            </ul>
          </div>
          <div class="list-title">
            <span>交易对</span>
            <span>昨日</span>
            <span>今日</span>
            <span>涨幅</span>
          </div>
          
          <ul class="list-con scroll" v-for="(item,index) in quotation" :key="index" v-if="nowCoin == item.name">
            <li v-for="(li,inde) in item.quotation" :key="inde" :data-name='item.name+"/"+li.name'>
              <div class="two-coin">
                <span>{{li.name}}</span>
                <span style="color:#61688a">/{{item.name}}</span>
              </div>
              <div class="yester">
                {{li.last_price}}
              </div>
              <div class="today" :data-name='item.name+"/"+li.name'>
                {{li.now_price}}
              </div>
              <div class="yes-toa">
                {{li.change}}%
              </div>
            </li>
          </ul>
        </div>
        <div class="coinTable" style='display:none'>
            <div class="tabhang">
                <div class="tabul">
                    <ul class="clearfix">
                        <li :class="{active:index==curCoinTab}" v-for="(tab,index) in quotation" :key="index" @click="getCurrent(index)" >{{tab.name}}</li> 
                    </ul>
                </div>
                <div class="tabtable">
                    <ul class="table-nav">
                        <div class="nav_left">
                        <li style="width:220px;text-align:left;">交易市场</li>
                        <!-- <li>最新成交价</li>
                        <li>涨跌</li> -->
                        <li style="width:220px;text-align:center;">最高价 ( 24h )</li>
                        <li style="width:220px;text-align:center;">最低价 ( 24h )</li>
                        <li style="width:220px;text-align:center;">最新价</li>
                        <!-- <li>成交量</li> -->
                        </div>
                        <li class="last tc fr">操作</li>
                    </ul>
                    <div class="scroll list-list">
                      <ul class="content" v-for="(coin,index) in coin_list">
                          <div class="con_left">
                          <li class="hovertd" style="width:220px;text-align:left;">
                              <i class="iconfont icon-BTCUSDT-copy" style="float:initial;"></i>
                              <!-- <span class="hover">{{coin.symbol}}</span><br> -->
                              <span>{{coin.name}}</span>
                          </li>
                          <!-- <li> -->
                              <!-- <span >¥ {{coin.quotes.USD.price}}</span> -->
                              <!-- <span>{{coin.name}}</span> -->
                              <!-- / ¥ {{coin.quotes.USD.price}} -->
                              <!-- <i class="iconfont icon-arrow-down"></i> -->
                          <!-- </li> -->
                          <li style="width:220px;text-align:center;">{{coin.min_price}}</li>
                          <li style="width:220px;text-align:center;">{{coin.max_price}}</li>
                          <li style="width:220px;text-align:center;">{{coin.new_price}}≈0.00CNY</li>
                          <!-- <li class="red" :class="{green:coin.quotes.USD.percent_change_24h.toString().substr(0, 1)=='-'}">
                              <i v-if="coin.quotes.USD.percent_change_24h.toString().substr(0, 1)=='-'" class="iconfont icon-arrow-down"></i>
                              <i v-else class="iconfont icon-arrow-up"></i>
                              {{coin.quotes.USD.percent_change_24h}}%
                              </li> -->
                          <!-- <li>{{coin.highest}}</li>
                          <li>{{coin.lowest}}</li> -->
                          <!-- <li>{{coin.total_supply}}</li> -->
                          </div>
                          <li class="last fr">
                              <a class="baseColor">充币</a>
                              <a class="baseColor withdraw">提币</a>
                              <a class="baseColor">兑换</a>
                              <!-- <button>交易</button> -->
                          </li>
                      </ul>
                    </div>  
                </div>
            </div>
        </div>
        <div class="feature_wrap">
            <h2>全球领先的数字资产金融服务商</h2>
            <p>为全球超过130个国家的数百万用户提供安全、可信赖的数字资产交易及资产管理服务</p>
            <ul class="feature_list slide_ani a-fadeinB clearfix">
              <li class="feature_safe">
                <h3>安全可信赖</h3>
                <p>5 年数字资产金融服务经验</p>
                <p>专业分布式架构和防 DDOS 攻击系统</p>
              </li>
              <li class="feature_eco">
                <h3>全球生态布局</h3>
                <p>多个国家设立本土化交易服务中心<br>打造多业务形态为一体的区块链生态圈</p>
              </li>
              <li class="feature_user">
                <h3>用户至上</h3>
                <p>建立先行赔付机制</p>
                <p>设立投资者保护基金</p>
              </li>
            </ul>
        </div>
    </div>
    
</template>


<script>
import "@/assets/style/iconfont2.css";
import "@/assets/style/iconfont.css";
import "@/assets/style/index.css";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import indexHeader from "@/view/indexHeader";
// var echarts = require("echarts");
export default {
  name: "homeContent",
  components: { indexHeader },
  data() {
    return {
      quotation: [],
      nowCoin: "",
      //   banner_imgs:[
      //       {href:'',img:'../assets/images/bg2.png'},
      //       {href:'',img:'../assets/images/bg2.png'},
      //       {href:'',img:'../assets/images/bg2.png'}
      //   ],
      curSwiper: 0,
      curCoinTab: 0,
      coinTabList: [{ title: "USDT行情" }, { title: "BTC行情" }],
      coinKlineList: [],
      coinKline: {},
      swiperList: [],
      coinList: [],
      coin_list: [
        {
          name: "BTC",
          min_price: "0.0000000",
          max_price: "0.000000",
          new_price: "0.000000"
        },
        {
          name: "BTC",
          min_price: "0.0000000",
          max_price: "0.000000",
          new_price: "0.000000"
        },
        {
          name: "BTC",
          min_price: "0.0000000",
          max_price: "0.000000",
          new_price: "0.000000"
        },
        {
          name: "BTC",
          min_price: "0.0000000",
          max_price: "0.000000",
          new_price: "0.000000"
        },
        {
          name: "BTC",
          min_price: "0.0000000",
          max_price: "0.000000",
          new_price: "0.000000"
        },
        {
          name: "BTC",
          min_price: "0.0000000",
          max_price: "0.000000",
          new_price: "0.000000"
        },
        {
          name: "BTC",
          min_price: "0.0000000",
          max_price: "0.000000",
          new_price: "0.000000"
        },
        {
          name: "BTC",
          min_price: "0.0000000",
          max_price: "0.000000",
          new_price: "0.000000"
        },
        {
          name: "BTC",
          min_price: "0.0000000",
          max_price: "0.000000",
          new_price: "0.000000"
        },
        {
          name: "BTC",
          min_price: "0.0000000",
          max_price: "0.000000",
          new_price: "0.000000"
        }
      ],
      noticeList: [
        { text: "2KEX交易所测试上线。。。", url: "" },
        { text: "2KEX交易所测试上线。。。", url: "" },
        { text: "2KEX交易所测试上线。。。", url: "" },
        { text: "2KEX交易所测试上线。。。", url: "" }
      ]
    };
  },
  created() {
    // this.init(this.initKline);
    this.getQuotation();
  },
  mounted() {
    var mySwiper = new Swiper(".swiper-container01", {
      // 如果需要分页器
      pagination: ".swiper-pagination01",
      paginationClickable: true,
      // 如果需要前进后退按钮
      slidesPerView: 5,
      nextButton: ".swiper-button-next",
      prevButton: ".swiper-button-prev",
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true //修改swiper的父元素时，自动初始化swiper
    });
    var mySwiper02 = new Swiper(".banner_wrap", {
      // direction: 'vertical',
      loop: true,
      autoplay: 2000,
      // 如果需要分页器
      pagination: ".swiper-pagination02",
      paginationClickable: true,
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true //修改swiper的父元素时，自动初始化swiper
    });
    // this.setChart();
    this.$http({
      url: this.$utils.laravel_api + "news/help",
      method: "post",
      data: {}
    }).then(res => {
      if (res.status === 200) {
        this.noticeList = res.data.message;
      } else {
        layer.msg(res.message);
      }
    });

    this.connect();
  },
  methods: {
    connect() {
      var that = this;
      console.log("socket");
      that.$socket.emit("login", localStorage.getItem("user_id"));
      that.$socket.on("transaction", msg => {
        console.log(msg);
        var cname = msg.token;
        var yesprice = msg.yesterday;
        var toprice = msg.today;
        console.log(msg);
        var zf = 0;
        if (toprice == yesprice) {
          zf = "0";
        } else if (toprice == 0) {
          zf = "-100";
        } else if (yesprice == 0) {
          zf = "100";
        } else {
          zf = ((toprice - yesprice) / yesprice / 100);
          
        }
        if (zf >= 0) {
          zf = "+" + Number(zf).toFixed(2) + "%";
          $("div[data-name='" + cname + "']")
            .next()
            .css("color", "#55a067");
        } else {
          zf = zf + "%";
          $("div[data-name='" + cname + "']")
            .next()
            .css("color", "#cc4951");
        }
        $("li div[data-name='" + cname + "']")
          .prev()
          .text(yesprice);
        $("li div[data-name='" + cname + "']")
          .html(toprice)
          .next()
          .html(zf);
      });
    },
    setPercent(a, b) {
      if (a - b == 0) {
        return "0%";
      } else if (a == 0) {
        return "-100%";
      } else if (b == 0) {
        return "+100%";
      } else {
        var p = ((a - b) / b / 100).toFixed(2);
        if (p > 0) {
          p = "+" + p + "%";
        } else {
          p = p + "%";
        }
        return p;
      }
    },
    getQuotation() {
      this.$http({
        url: "/api/currency/quotation",
        method: "get"
      }).then(res => {
        if (res.data.type == "ok" && res.data.message.length != 0) {
          this.quotation = res.data.message;
          this.nowCoin = this.quotation[0].name;
        }
      });
    },
    getCurrent(index) {
      this.curCoinTab = index;
    },
    mouseEnter(index) {
      this.curSwiper = index;
    },
    init(callback) {
      this.$http.post(this.$utils.laravel_api + "quotation").then(res => {
        if (res.data.type == "ok") {
          this.coinList = res.data.message.coin_list;
          this.swiperList = res.data.message.coin_list;
          callback && callback();
        } else {
          // layer.msg(res.message);
        }
      });
    },

    timestampToTime(timestamp) {
      var date = new Date(timestamp);
      let Y = date.getFullYear() + "/";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "/";
      let D = date.getDate() + " ";
      return Y + M + D;
    }
  }
};
</script>
<style lang='scss' scoped>
/* 币种列表 */
.coins-list {
  margin: 10px 50px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #4e5b85;
  .coin-tab {
    height: 42px;
    color: #c7cce6;
    display: flex;
    > ul {
      border-left: 1px solid #4e5b85;
      display: flex;
      li {
        padding: 0 40px;
        box-shadow: 0 0 1px hsla(231, 9%, 54%, 0.2);
        border-bottom: 1px solid #4e5b85;
        border-right: 1px solid #4e5b85;
      }
      .activeCoin {
        border-bottom: none;
      }
    }
  }
  .list-title {
    display: flex;
    > span {
      flex: 1;

      text-align: center;
      color: #c7cce6;
      font-size: 14px;
    }
  }
  .list-con {
    background: rgb(32, 36, 55);
    max-height: 680px;
    overflow: scroll;
    li {
      display: flex;
      border-bottom: 1px solid #282e44;
      color: #c7cce6;
      > div {
        flex: 1;
      }
    }
  }
}
.carousel .swiper-slide:hover {
  background-color: #327add;
}
.nav_left,
.con_left {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.withdraw {
  margin: 0 4px;
}
.carousel .last a:hover {
  cursor: pointer;
}
.sliders {
  width: 100%;
}
.sliders img {
  width: 100%;
  height: 500px;
}
.notice_ul {
  padding: 25px 0;
  background: #161923;
  margin-bottom: 5px;
}
.notice_li {
  flex: 1;
  text-align: center;
}
.notice_li::after {
  content: "/";
  float: right;
}
.notice_li:last-child:after {
  content: "";
  color: #6b80ae;
}
.notice_a:hover {
  color: #6b80ae;
  cursor: pointer;
}
.feature_wrap {
  background-color: #fff;
  padding: 100px 0;
  text-align: center;
  color: #54748f;
  line-height: 2em;
}
.feature_wrap h2 {
  font-size: 28px;
  margin-bottom: 10px;
  color: #192544;
}
.feature_wrap .feature_list {
  padding-top: 80px;
  width: 70%;
  margin: 0 auto;
}
.feature_wrap .feature_list li {
  float: left;
  width: 33%;
  background: transparent none no-repeat top;
  padding-top: 218px;
}
.feature_wrap .feature_list li.feature_safe {
  background-image: url(../../static/imgs/feature_safe.8e76904.svg);
}
.feature_wrap .feature_list li.feature_eco {
  background-image: url(../../static/imgs/feature_eco.4f174e6.svg);
}
.feature_wrap .feature_list li.feature_user {
  background-image: url(../../static/imgs/feature_user.7002f27.svg);
}
.feature_wrap h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #192544;
}
</style>


