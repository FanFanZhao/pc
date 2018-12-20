<template>
    <div class="indexBlackes home-box" style="background:rgb(24,37,64)">
        <div class="swiper-container banner_wrap swiper-container-horizontal">
            <div class="swiper-wrapper">

               <div class="swiper-slide sliders" v-for="(item,index) in swiperImgs" :key="index">
                   <router-link :to="{path:'/components/noticeDetail',query:{id:item.id}}">
                    <img :src="item.thumbnail" />
                   </router-link>
               </div>
              
            </div>
             <div class="swiper-pagination swiper-pagination02"></div>
        </div>
       
       
       <grand-total></grand-total>
        <div class="coins-list">
          <div class="coin-tab" style="background:#050d1e">
            <ul class="coins">
              <li v-for="(coin,index) in quotation" :key="index" @click="nowCoin = coin.name" :class="{activeCoin:nowCoin == coin.name}">{{coin.name}}</li>
            </ul>
          </div>
          <div class="list-title" style="background:#111B31">
            <span>交易对</span>
            <span>昨日</span>
            <span>今日</span>
            <span>涨幅</span>
          </div>
          
          <ul class="list-con" v-for="(item,index) in quotation" :key="index" v-if="nowCoin == item.name">
            <li v-for="(li,inde) in item.quotation" :key="inde" :data-name='item.name+"/"+li.name'>
              <div class="two-coin">
                <span>{{li.name}}</span>
                <span style="color:#61688a">/{{item.name}}</span>
              </div>
              <div class="yester">
                {{li.yesterday_last_price}}
              </div>
              <div class="today" :data-name='item.name+"/"+li.name'>
                {{li.now_price}}
              </div>
              <div class="yes-toa" :class="li.change<0?'down-clr':'up-clr'">
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
       
        <div class="md">
          <div>
            <div class="">
              <span>安全有保障</span>
              <span>资金托管</span>
            </div>
            <router-link to="/components/register" tag="div" class="btn">立即加入</router-link>
            <div>
              <!-- <img src="https://ztstatic.oss-cn-hangzhou.aliyuncs.com/zg72/img/home-zg-pic-$.d1d0840.jpg" alt=""> -->
              <img src="../assets/images/bg1.png" alt="">
            </div>
          </div>
          <div>
            <div>全球数字资产交易平台</div>
            <div>支持币币交易、货币交易的区块链数字资产交易平台，由全球多国多领域顶级人才构成的精英团队，在系统安全、微秒级高负载、金融领域拥有资深经验</div>
          </div>
        </div>
        <div class="notice flex">
          <div>
            <div class="notpic1"></div>
            <div>2kex力量，中国力量！</div>
            <div>透明公开的2kex区块链慈善基金，您的每一笔交易都能帮助改善偏远山区儿童的生活与学习</div>
          </div>
          <div>
            <div class="notpic2"></div>
            <div>2kex持续分红+奖励</div>
            <div>2kex每个月将平台50%利润用于用户分红奖励，大力回馈用户是2kex生态建设的重要计划</div>
          </div>
          <div>
            <div class="notpic3"></div>
            <div>极速交易安全稳定</div>
            <div>超高性能撮合交易技术架构，多级数据灾备，1:1准备金仓储，2kex不仅仅是交易所也是您的高级资产安全管理钱包！</div>
          </div>
          <div>
            <div class="notpic4"></div>
            <div>贵宾级客户服务</div>
            <div>7X24X365天及时响应1V1客服服务！为您的数字资产安全交易保驾护航！</div>
          </div>
          
          
        </div>
        <div class="mb">
          <img src="../assets/images/homemb0.png" alt="">
           <div>
            <div> 随时随地 不错过任何机会</div>
            <p> 实时交易：买入、卖出、杠杆</p>
            <p> 随身充提：充值、提现</p>
            <p>实时提醒：行情提醒、事件提醒</p>
            <ul class="applinks">
              <li>
                <div>
                  <img src="../assets/images/anzhuo.png" alt="">
                <span>Android</span>
                </div>
                <img src="../assets/images/2k.png" alt="">
              </li>
              <li>
                <div>

                <img src="../assets/images/iphone.png" alt="">
                <span>iPhone</span>
                </div>
                <img src="../assets/images/2k.png" alt="">
              </li>
            </ul>
           </div>
        </div>
        <div class="news">
          <p class="">公告</p>
          <div class="line"></div>
          <div class="items">
            <router-link tag="div" :to="{path:'/components/noticeDetail',query:{id:item.id}}" class="item itemm" v-for='(item,index) in noticeList' :key="index">
              <div class="date">{{item.update_time.slice(0,10)}}</div>
              <div class="content ">
                <!-- <img src="../assets/images/notbg.jpg" alt=""> -->
                <div class="title">{{item.title}}</div>
                <p >{{item.abstract}}</p>
              </div>
            </router-link>
            
            
          </div>
        </div>
        <footer>
          <div class="content ">
            <div class="flex">
              <div class="left-part flex">
                <dl>
                  <dt>网站功能</dt>
                  <router-link to="/c2c" tag="dd">c2c交易</router-link>
                  <router-link to="/dealCenter" tag="dd">币币交易</router-link>
                </dl>
                <dl>
                  <dt>用户帮助</dt>
                  <router-link to="/components/login" tag="dd">登录</router-link>
                  <router-link to="/components/register" tag="dd">注册</router-link>
                  <router-link to="/forgetPwd" tag="dd">找回密码</router-link>
                </dl>
                <dl>
                  <dt>我们</dt>
                  <router-link :to="{path:'/components/noticeDetail',query:{id:107}}" tag="dd">关于我们</router-link>
                  <router-link :to="{path:'/components/noticeDetail',query:{id:108}}" tag="dd">联系我们</router-link>
                  <router-link :to="{path:'/components/noticeDetail',query:{id:109}}" tag="dd">关于2kex</router-link>
                  <router-link :to="{path:'/components/noticeDetail',query:{id:106}}" tag="dd">关于挖矿</router-link>
                </dl>
                <dl>
                  <dt>条款说明</dt>
                  <router-link :to="{path:'/components/noticeDetail',query:{id:112}}" tag="dd">服务条款</router-link>
                  <router-link :to="{path:'/components/noticeDetail',query:{id:111}}" tag="dd">免责声明</router-link>
                  <router-link :to="{path:'/components/noticeDetail',query:{id:113}}" tag="dd">费率说明</router-link>
                </dl>
                
              </div>
              <div class="right-part">
                <div>
                  <img src="../assets/images/logo.png" alt="">
                </div>
                <p class="flex">
                  <a href="https://twitter.com/2kexofficial">
                    <img src="../assets/images/twiter.png" alt="">
                  </a>
                  <a href="https://www.facebook.com/2kexofficial/">
                    <img src="../assets/images/face.png" alt="" style="width:35px !important;height:35px !important">
                  </a>
                  <a href="https://0.plus/great2kex">
                    <img src="../assets/images/coinicon.png" alt="">
                  </a>
                </p>
              </div>
            </div>
            <div>
              <img src="../assets/images/foot1.png" alt="">
              <img src="../assets/images/foot2.png" alt="">
              <img src="../assets/images/foot3.png" alt="">
              <img src="../assets/images/foot4.png" alt="">
              <img src="../assets/images/foot5.png" alt="">
              <img src="../assets/images/foot6.png" alt="">
            </div>
            <div class="tc ft12" style="color:#516081">Copyright © 2018 2KEX. All rights reserved</div>
          </div>
        </footer>
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
import GrandTotal from './GrandTotal.vue'
export default {
  name: "homeContent",
  components: { indexHeader,GrandTotal },
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
      coin_list: [],

      noticeList: [],
      swiperImgs: []
    };
  },
  created() {
    // this.init(this.initKline);
    this.getQuotation();
  },
  mounted() {
    this.getSwiper();
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

    this.connect();
    this.getNews();
  },
  methods: {
    getSwiper() {
      this.$http({
        url: "/api/news/list?c_id=24"
      })
        .then(res => {
          console.log(res);
          if (res.data.type == "ok") {
            this.swiperImgs = res.data.message.list;
          }
        })
        .then(() => {
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
        });
    },
    connect() {
      var that = this;
      var nums = Math.floor(Math.random() * 40) + 60;
      var socket_user_id = new Date().getTime() + nums;
      that.$socket.emit("login", socket_user_id);
      that.$socket.on("transaction", msg => {
        console.log(msg)
        var cname = msg.token;
        var yesprice = msg.yesterday;
        var toprice = msg.today;
        var zf = 0;
        if (toprice == yesprice) {
          zf = 0;
        } else if (yesprice == 0) {
          zf = 100;
        } else {
          zf = (((toprice - yesprice) / yesprice) * 100).toFixed(4);
        }

        console.log(cname, yesprice, toprice, zf);

        if (zf >= 0) {
          zf = "+" + zf + "%";
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
      this.$http.post("/api/" + "quotation").then(res => {
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
    },
    // 公告
    getNews() {
      var that = this;
      this.$http({
        url: "/api/news/list?c_id=21"
      }).then(res => {
        console.log(res);
        if (res.data.type == "ok") {
          var list = res.data.message.list;
          if (list.length > 2) {
            that.noticeList = list.slice(0, 3);
          } else {
            that.noticeList = list;
          }
        }
      });
    },
    // 公告详情
    goDetail(id) {
      var id = id;
      this.$router.push({
        name: "noticeDetail",
        query: { id: id }
      });
    }
  }
};
</script>
<style lang='scss' scoped>

.applinks{
  position: relative;
  display: flex;
  >li{
    position: relative;
    margin-top: 30px;
    margin-right: 50px;
    padding: 16px;
    color: #8b89c8;
    >div{
      line-height: 40px;
      cursor: pointer;
      img{
        margin-right: 5px;
        position: static;
        width: 36px;
        height: 32px;
        vertical-align: middle;
        cursor: pointer;
      }
    }
    >img{
      position: absolute;
      left: 0;
      top: 80px;
      // position: static;
      display: none;
      width: 120px;
      height: 120px;
    }
    &:hover{
      >img{
        display: block;
      }
    }
  }
}
footer{
  // background: rgb(20,20,63);
  background: #050d1e;
  padding: 30px 0;
  .content{
    width: 1500px;
    margin: 0 auto;
    justify-content: space-between;
    .left-part{
      flex:4;
      margin-right: 30px;
      padding-right: 30px;
      justify-content: space-between;
      border-right: 1px solid #1a253d;
    }
    .right-part{
      flex:3;
      
      div img{
        width: 100px;
      }
      .flex{
        margin-top: 30px;
        align-items: center;
        a{
          height: 35px;
        }
        img{
          margin-right: 20px;
          width: 30px;
          height: 30px;
        }
      }
    }
    dl{
      
      dt{
        font-size: 14px;
        color: #2b89e1;
        margin-bottom: 20px;
      }
      dd{
        font-size: 12px;
        color: #516081;
        line-height: 24px;
        cursor: pointer;
        &:hover{
          color: #fff;
        }
      }
    }
    >div:nth-child(2){
      border-top: 1px solid #1a253d;
      margin-top: 30px;
      padding: 30px 0;
      text-align: center;
      img{
        width: 128px;
        margin: 0 30px;
      }
    }
  }
}
.md {
  width: 1500px;
  margin: 0 auto;
  > div:first-child {
    margin-top: 90px;
    text-align: center;
    font-size: 40px;
    // color: #fff;
    color: #bec1da;
    > span:last-child {
      margin-left: 6px;
      color: #2b89e1;
    }
    .btn {
      // background: linear-gradient(90deg, #2b89e1, #44c3d5);
      background: linear-gradient(90deg, #1762a9, #2f6ca5);
      width: 268px;
      margin: 30px auto 0;
      text-align: center;
      line-height: 56px;
      border-radius: 30px;
      font-size: 18px;
      color: #fff;
    }
    img {
      display: block;
      margin: 0 auto;
      width: 1180px;
      height: 635px;
    }
  }
  > div:nth-child(2) {
    padding-top: 60px;
    background: url("../assets/images/bg0.png")
      right top/ 832px 432px no-repeat;
      background-size: auto;
    // background: url("https://ztstatic.oss-cn-hangzhou.aliyuncs.com/zg72/img/home-zg-bg-1.5159fa3.jpg")
    //   right top/ 832px 432px no-repeat;
    height: 500px;
    > div:first-child {
      font-size: 40px;
      // font-weight: bold;
      color: #bec1da;
    }
    > div:nth-child(2) {
      margin-top: 20px;
      // color: rgba(139, 137, 200, 0.5);
      color: #b7c2ce;
      line-height: 30px;
      width: 45%;
    }
  }
}
.news {
  margin-top: 100px;
  position: relative;
  > p {
    font-weight: 600;
    font-size: 20px;
    margin: 200px auto 100px;
    color: #fff;
    width: 1500px;
  }
  .line {
    position: absolute;
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 0.05);
    top: 185px;
  }
  > .items {
    width: 1500px;

    margin: 0 auto;
    display: flex;
    // justify-content: space-between;

    > .item {
      transition: all 0.3s;
      // height: 330px;
      padding-bottom: 20px;
      cursor: pointer;
      // color: hsla(0, 0%, 100%, 0.9);
      color: #7080a3;
      border-radius: 4px;
      width: 33%;
      > .date {
        font-size: 24px;
        padding-bottom: 60px;
        color: #bec1da;
      }
      > p {
        // color: #8b89c8;
        color: #7080a3;
      }
      .content {
        position: relative;
        transition: all 0.3s;
        max-width: 485px;
        height: 260px;
        overflow: hidden;
        padding: 30px;
        border-radius: 6px;
        // background-color: rgba(24, 24, 76, 1);
        background-size: 100% !important;
        &::before {
          content: "";
          position: absolute;
          left: 50px;
          top: -10px;
          width: 0;
          border-right: 10px solid transparent;
          border-left: 10px solid transparent;
          border-bottom: 10px solid #2b2b6d;
          opacity: 0;
          -webkit-transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        img {
          position: absolute;
          border-radius: 6px;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: all 0.5s;
          // z-index: -1;
        }
        .title {
          font-size: 16px;
          color: #bec1da;
          padding-bottom: 30px;
        }
        p {
          font-size: 14px;
          color: #7080a3;
        }
      }
      > .title {
        font-size: 16px;
        color: #bec1da;
        // font-weight:
      }
     
    }
    
  }
  
}
.notice {
  width: 1500px;
  margin: 0 auto;
  justify-content: space-between;
  > div {
    border-radius: 3px;
    font-size: 12px;
    padding: 30px;
    width: 360px;
    height: 360px;
    // color: rgba(139, 137, 200, 0.5);
    color: #7080a3;
    // background: linear-gradient(to bottom right, #2b2b6d, #18184c);
    // background: #0a152d;
    background: rgba(0,0,0,.15);
    cursor: pointer;
    box-shadow: none;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

    > div:nth-child(2) {
      transition: all 0.3s;
    }
    div:nth-child(3) {
      padding-top: 10px;
    }
    &:hover {
      // background: url("../assets/images/homehov.jpg") center center/ 100% 100%
        // no-repeat;
      box-shadow: 0 0.05rem 0.45rem rgba(0, 0, 0, 0.2);
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      color: #fff;
      > div:nth-child(2) {
        transform: translateY(-10px);
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      }
      > div:nth-child(3) {
        border-top: 1px solid rgba(139, 137, 200, 0.5);
      }
      .notpic1 {
        background-image: url("../assets/images/hhov2.png") !important;
      }
      .notpic2 {
        background-image: url("../assets/images/hhov4.png") !important;
      }
      .notpic3 {
        background-image: url("../assets/images/hhov5.png") !important;
      }
      .notpic4 {
        background-image: url("../assets/images/hhov8.png") !important;
      }
    }
    > div:first-child {
      width: 80px;
      height: 88.8px;
      margin: 30px auto 0;
      margin-bottom: 20px;
      text-align: center;
    }
    > div:nth-child(2) {
      font-size: 18px;
      margin: 30px 0 20px;
      color: #bec1da;
    }
    > div:last-child {
      line-height: 24px;
    }
  }
  > div:first-child {
    > div:first-child {
      background: url("../assets/images/hhov1.png") center center/ 100% 100%
        no-repeat;
    }
  }
  > div:nth-child(2) {
    > div:first-child {
      background: url("../assets/images/hhov3.png") center center/ 100% 100%
        no-repeat;
    }
  }
  > div:nth-child(3) {
    > div:first-child {
      background: url("../assets/images/hhov6.png") center center/ 100% 100%
        no-repeat;
    }
  }
  > div:nth-child(4) {
    > div:first-child {
      background: url("../assets/images/hhov7.png") center center/ 100% 100%
        no-repeat;
    }
  }
}
.mb {
  position: relative;
  margin-top: 100px;
  height: 800px;
  padding-left: 800px;
  img {
    position: absolute;
    left: -497px;
    top: 0;
    width: 1770px;
  }
  > div {
    display: flex;
    position: relative;
    z-index: 99;
    height: 800px;
    justify-content: center;
    flex-direction: column;
    > div {
      padding: 100px 0 30px;
      font-size: 36px;
      // color: #2b89e1;
      color: #bec1da;
    }
    p {
      line-height: 30px;
      // color: rgba(139, 137, 200, 0.5);
      color: #b7c2ce;
    }
  }
}
.home-box {
  background: rgb(24, 24, 76);
}
div.swiper-container .swiper-pagination {
  left: initial;
  right: 10px !important;
  top: 0;
  height: 100%;
  width: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
div.swiper-container .swiper-pagination > span {
  display: block;
  background: #fff;
  opacity: 0.5;
  margin: 10px 0;
}
div.swiper-container .swiper-pagination-bullet-active {
  background: transparent;
  border: 2px solid #55a067;
}
.up-clr {
  color: #55a067;
}
.down-clr {
  color: #cc4951;
}
/* 币种列表 */
.coins-list {
  margin: 10px auto;
  width: 1500px;
  line-height: 40px;
  text-align: center;
  // border: 1px solid #4e5b85;
  
  .coin-tab {
    // padding: 0 2px;
    height: 42px;
    color: #c7cce6;
    display: flex;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    > ul {
      display: flex;
      li {
        padding: 0 40px;
        font-size: 14px;
        // box-shadow: 0 0 1px hsla(231, 9%, 54%, 0.2);
        // border-bottom: 1px solid #4e5b85;
        // border-right: 1px solid #4e5b85;
      }
      .activeCoin {
        border-bottom: none;
        // background:#0a152d;
        background: #111B31;
        border-top: 2px solid #2b89e1;
      }
    }
  }
  .list-title {
    display: flex;
    > span {
      flex: 1;

      text-align: center;
      color: #8b89c8;
      font-size: 14px;
    }
  }
  .list-con {
    // background: rgb(32, 36, 55);
    max-height: 680px;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    li:nth-child(2n) {
      // background: rgb(24, 24, 76);
      background: rgba(0,5,15,.3);
    }
    li:nth-child(2n + 1) {
      background: rgb(10, 21, 45);
    }
    li {
      display: flex;
      // border-bottom: 1px solid #282e44;
      color: #c7cce6;
      &:hover {
        background: rgb(23, 45, 71);
      }
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
  margin: 0 40px;
  padding: 5px 0;
  // background: #262a42;
  overflow: hidden;
  word-break: keep-all;
}
.notice_ul > li {
  // flex: 1;
  font-size: 12px;
  padding: 0 15px;
  text-align: center;
  color: #9eb5ca;
  word-break: keep-all;
  position: relative;
}
.notice_ul > li::after {
  content: "/";
  position: absolute;
  left: -0.5em;
  color: #9eb5ca;
}
.notice_ul > li:last-child:after {
  content: "";
  color: #6b80ae;
}
.notice_ul > li:hover {
  color: #6b80ae;
  cursor: pointer;
}
.feature_wrap {
  // background-color: #fff;
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
.itemm:hover .content{
  background: rgba(0,0,0,.15);
  p{color: #fff !important}
}
</style>


