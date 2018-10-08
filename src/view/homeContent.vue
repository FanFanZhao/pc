<template>
    <div class="indexBlackes">
        <!-- <div class="banneres">
            <div class="content ">
                <h1>区块链数字资产交易平台</h1>
                <p class="introduce">安全&nbsp;&nbsp;&nbsp;公正&nbsp;&nbsp;&nbsp;高效&nbsp;&nbsp;&nbsp;不可篡改</p>
                <div class="QRCode"><img src="@/assets/images/code.png"></div>
                <p class="kefu">手机下载二维码</p>
            </div>
        </div> -->
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
        <!-- <div class="carousel">
            <div class="swiper-container swiper-container01 swiper-container-horizontal">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" :class="{active:index==curSwiper}" v-for="(item ,index) in swiperList" style="width: 232px; margin-right: 10px;" @mouseover="mouseEnter(index)">
                        <p class="name">{{item.symbol}}</p>
                        <p class="last">{{item.quotes.USD.price}}</p>
                        <p class="range" :class="{red:item.quotes.USD.percent_change_24h>=0}">
                            <i class="iconfont icon-u-arrow3-loss" v-if="item.quotes.USD.percent_change_24h<0"></i>
                            <i class="iconfont icon-u-arrow3-right" v-else></i>
                            {{item.quotes.USD.percent_change_24h}}%
                        </p>
                    </div>
                </div>   
                <div class="swiper-pagination01"></div>
            </div>
            <div slot="button-prev" class="swiper-button-prev" tabindex="0" role="button" aria-label="Previous slide"></div>
            <div slot="button-next" class="swiper-button-next" tabindex="0" role="button" aria-label="Next slide"></div>
        </div> -->
        <!-- <div class="notice">
           <ul class="flex alcenter around notice_ul">
               <li v-for="item in noticeList" :key="item.id" class="fl notice_li flex1" style="color: #cdd6e4;"><a class="notice_a ft12" :data-id='item.id'>{{item.name}}</a></li>
           </ul>
        </div> -->
        <div class="active-data clearfix">
            <div class="data high">
                <div class="name">最高价</div>
                <div class="content">{{coinKline.hight}}</div>
            </div>
            <div class="data high">
                <div class="name">最低价</div>
                <div class="content">{{coinKline.low}}</div>
            </div>
             <div class="data high">
                <div class="name">开盘价</div>
                <div class="content">{{coinKline.open}}</div>
            </div>
            <div class="data high">
                <div class="name">收盘价</div>
                <div class="content">{{coinKline.close}}</div>
            </div>
            <div class="data range">
                <div class="name">涨跌幅</div>
                <div class="content">-{{Math.floor(((coinKline.close-coinKline.open)/coinKline.open) * 100)/100 || 0}}%</div>
            </div>
            <div class="data vol">
                <div class="name">成交量</div>
                <div class="content">{{coinKline.volume}}</div>
            </div>
            <div class="time">24H</div>
        </div>
        <div id="chart" _echarts_instance_="ec_1533699609264" style="width: 100%; height: 320px; -webkit-tap-highlight-color: transparent; user-select: none; position: relative; background: transparent;">
            <!-- <div style="position: relative; overflow: hidden; width: 1200px; height: 320px; padding: 0px; margin: 0px; border-width: 0px; cursor: default;">
                <canvas width="1200" height="320" data-zr-dom-id="zr_0" style="position: absolute; left: 0px; top: 0px; width: 1200px; height: 320px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></canvas>
            </div>
            <div style="position: absolute; display: none; border-style: solid; white-space: nowrap; z-index: 9999999; transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s; background-color: rgb(153, 153, 153); border-width: 0px; border-color: rgb(51, 51, 51); border-radius: 4px; color: rgb(255, 255, 255); font: 14px/21px &quot;Microsoft YaHei&quot;; padding: 5px; left: 533px; top: 67px;">22:00:00<br>
                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:RGBA(110, 68, 110, .7);"></span>当前价: 708.9</div> -->
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
                <span>{{li.yesterday_last_price}}</span>
              </div>
              <div class="today">
                <span>{{li.last_price}}</span>
              </div>
              <div class="yes-toa">
                <span>{{setPercent(li.last_price,li.yesterday_last_price)}}</span>
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
        <!-- <div class="bottom">
            <p>温馨提示</p>
            <p>数字资产是创新的投资产品，价格波动较大，具有较高的投资风险，请您投资前 对数字资产充分认知，理性判断自己的投资能力，审慎做出投资决策。</p>
        </div> -->
    </div>
    
</template>


<script>
import "@/assets/style/iconfont2.css";
import "@/assets/style/iconfont.css";
import "@/assets/style/index.css";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import indexHeader from "@/view/indexHeader";
var echarts = require("echarts");
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
      swiperList: [
        //   {name:'BTYUSDT',price:'0.2103',mixed:'-2.09%'},
        //   {name:'BTCUSDT',price:'6568.20',mixed:'-8.13%'},
        //   {name:'BCCUSDT',price:'376.30',mixed:'-7.38%'},
        //   {name:'ETHUSDT',price:'376.30',mixed:'-7.38%'},
        //   {name:'ETCUSDT',price:'376.30',mixed:'-7.38%'},
        //   {name:'BTYUSDT',price:'0.2103',mixed:'-2.09%'},
        //   {name:'BTCUSDT',price:'6568.20',mixed:'-8.13%'},
        //   {name:'BCCUSDT',price:'376.30',mixed:'-7.38%'},
        //   {name:'ETHUSDT',price:'376.30',mixed:'-7.38%'},
        //   {name:'ETCUSDT',price:'376.30',mixed:'-7.38%'},
      ],
      coinList: [
        //   {ico:'icon-BTYUSDT-copy',coin:'BTY/USDT',type:'比特元',cur:0.2102,price:1.42,mixed:-2.14,highest:0.2233,lowest:0.1299,volume:640227.5},
        //   {ico:'icon-BTCUSDT-copy',coin:'BTY/USDT',type:'比特元',cur:0.2102,price:1.42,mixed:-2.14,highest:0.2233,lowest:0.1299,volume:640227.5},
        //   {ico:'icon-BCCUSDT-copy',coin:'BTY/USDT',type:'比特元',cur:0.2102,price:1.42,mixed:-2.14,highest:0.2233,lowest:0.1299,volume:640227.5},
        //   {ico:'icon-ETHUSDT-copy',coin:'BTY/USDT',type:'比特元',cur:0.2102,price:1.42,mixed:-2.14,highest:0.2233,lowest:0.1299,volume:640227.5},
        //   {ico:'icon-ETCUSDT-copy',coin:'BTY/USDT',type:'比特元',cur:0.2102,price:1.42,mixed:-2.14,highest:0.2233,lowest:0.1299,volume:640227.5},
        //   {ico:'icon-ZECUSDT-copy',coin:'BTY/USDT',type:'比特元',cur:0.2102,price:1.42,mixed:-2.14,highest:0.2233,lowest:0.1299,volume:640227.5},
        //   {ico:'icon-LTCUSDT-copy',coin:'BTY/USDT',type:'比特元',cur:0.2102,price:1.42,mixed:-2.14,highest:0.2233,lowest:0.1299,volume:640227.5},
        //   {ico:'icon-DCRUSDT-copy',coin:'BTY/USDT',type:'比特元',cur:0.2102,price:1.42,mixed:-2.14,highest:0.2233,lowest:0.1299,volume:640227.5},
        //   {ico:'icon-BTSUSDT-copy',coin:'BTY/USDT',type:'比特元',cur:0.2102,price:1.42,mixed:-2.14,highest:0.2233,lowest:0.1299,volume:640227.5},
        //   {ico:'icon-SCUSDT-copy',coin:'BTY/USDT',type:'比特元',cur:0.2102,price:1.42,mixed:-2.14,highest:0.2233,lowest:0.1299,volume:640227.5},
      ],
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
    this.setChart();
    this.$http({
      url: this.$utils.laravel_api + "news/help",
      method: "post",
      data: {}
    }).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.noticeList = res.data.message;
        } else {
          layer.msg(res.message);
        }
    })
    .catch(error => {
      console.log(error);
    });
    //  eventBus.$on('toNew', function (data) {
    //   console.log(data);
    //   if(data){
    //         var newprice=data.newprice;
    //         var cname=data.istoken
    //         console.log(that.currency_name) 
    //         console.log(newprice)
    //         $("span[data-name='"+cname+"']").html('$'+newprice);
    //     }
    // }); 
    this.connect();
       
  },
  methods: {
    connect() { 
      var that=this;
      console.log('socket')
      that.$socket.emit("login", localStorage.getItem('user_id'));
      that.$socket.on("transaction", msg => {
        console.log(msg);
        var cname=msg.token;
        var yesprice = msg.yesterday;
        var toprice = msg.today;
        console.log(cname)
        var zf=0;
        if((toprice-yesprice )==0){
            zf='0%'
        }else if(toprice==0){
            zf='-100'
        }else if(yesprice){
            zf="+100%"
        }else{
          zf=((toprice-yesprice)/yesprice/100).toFixed(2);
          if(zf>0){
            zf = '+'+zf+ '%';
          } else {
            zf = zf+'%'
          }
        }
          var zf=toprice-yesprice
          $("li[data-name='"+cname+"']").find('.yester span').html(yesprice);
          $("li[data-name='"+cname+"']").find('.today span').html(toprice);
          $("li[data-name='"+cname+"']").find('.yes-toa span').html(zf);
      });
    },
    setPercent(a,b){
      if((a-b) == 0){
        return '0%';
      }
      else if(a == 0){
        return '-100%';
      } else if( b == 0){
        return '+100%';
      } else {
        var p  = ((a-b)/b/100).toFixed(2);
        if(p>0){
          p = '+'+p+ '%';
        } else {
          p = p+'%'
        }
        return p;
      }
      
    },
    getQuotation() {
      this.$http({
        url: "/api/currency/quotation",
        method: "get"
      }).then(res => {
        console.log(res.data);
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
    initKline() {
      this.$http.post(this.$utils.laravel_api + "historical_data").then(res => {
        if (res.data.type == "ok") {
          if (res.data.message.day.length > 0) {
            this.coinKline = res.data.message.day[0].data;
            this.coinKlineList = res.data.message.day;
          }
          console.log(res.data.message.day[0].data);
          console.log(res.data.message.day);
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
    },

    setChart() {
      var myChart = echarts.init(document.getElementById("chart"));
      var that = this;
      // 指定图表的配置项和数据
      var base = 2;
      var date = [];
      var data = [1, 2, 4, 5, 6, 7, 8];
      var now = new Date();
      console.log(that.coinKlineList);
      for (var i in that.coinKlineList) {
        let temp = that.timestampToTime(that.coinKlineList[i].timestamp);
        console.log(temp);
        date.push(temp);
      }
      console.log(date);
      var option = {
        textStyle: {
          color: "#818283"
        },
        backgroundColor: "#161923",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        title: {
          left: "center",
          text: "24小时数据图"
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "5%",
          containLabel: true
        },
        toolbox: {
          feature: {
            // dataZoom: {
            //     yAxisIndex: 'none'
            // },
            // restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: date,
          color: ["#ff9232"]
        },

        yAxis: {
          type: "value",
          yaxisLabel: {
            backgroundColor: "#fff"
          }
        },
        series: [
          {
            name: "当前价格",
            type: "line",
            smooth: true,
            symbol: "none",
            sampling: "average",
            itemStyle: {
              normal: {
                // 6e446e
                color: "#6e446e"
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#6e446e"
                  },
                  {
                    offset: 1,
                    color: "#1e1e2a"
                  }
                ])
              }
            },

            data: data
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    // go_detail(index,inde){
    //   this.$router.push({
    //     path:'/dealCenter',
    //     name:'dealCenter',
    //     params:{
    //       legal_index:index,
    //       currency_index:inde
    //     }
    //   })
    // }
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
</style>


