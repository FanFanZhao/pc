<template>
        <div class="klines">
          <div class="top-txt fColor1 ft14">{{leg_name}}/{{currency_name}}</div>
          <div class="kline">
            <div id="kline_container"></div>
          </div>
          
        </div>
      </template>
      
      <script>
      export default {
        name: 'kline',
        data () {
          return {
            legal_id:'',
            currency_id:'',
            leg_name:'',
            currency_name:"",

          }
        },
        created(){
            this.token = localStorage.getItem('token') || '';
        },
        methods:{
          
          king(){
            var _that =this;
            var kline = new Kline({
              element: "#kline_container",
              width: $(".kline").width(),
              height: 490,
              theme: 'dark', // light/dark
              language: 'zh-cn', // zh-cn/en-us/zh-tw
              ranges: ["1w", "1d", "1h", "30m", "15m", "5m", "1m", "line"],
              symbol: "BTC/coin4",
              symbolName: "COIN5_COIN4",
              type: "poll", // poll/socket
            //   url: "../../static/lib/mock.json",
            //   datas:{id:123},
              url: 'http://ice.adminchao.com/api/deal/info',
              datas:{
                legal_id:_that.legal_id,
                currency_id :_that.currency_id,
                type: 1
              },
              limit: 1000,
              intervalTime: 50000,
              debug: true,
              showTrade: false,
              onResize: function(width, height) {
                  console.log("chart resized: " + width + " " + height);
              }
            })
            kline.draw();  
          },
      },
        mounted(){
          var that = this;
          eventBus.$on("toExchange0", function(data0) {
            console.log(data0);
            that.legal_id = data0.currency_id,
            that.currency_id = data0.legal_id;
            that.currency_name = data0.currency_name;
            that.leg_name = data0.leg_name;
            that.king();
          });
          eventBus.$on('toTrade', function (data) {
            console.log(data);
              if(data){
                that.currency_id =  data.legal_id,
                that.legal_id =data.currency_id;
                that.currency_name =  data.currency_name,
                that.leg_name = data.leg_name;
                that.king();
              }         
          });
        }
      }
      </script>
      
      <!-- Add "scoped" attribute to limit CSS to this component only -->
      <style scoped>
      .top-txt{
        height: 40px;
        line-height: 40px;
        background: #181b2a;
        -webkit-box-shadow: 0 2px 6px rgba(0,0,0,.1);
        box-shadow: 0 2px 6px rgba(0,0,0,.1);
        padding: 0 15px;
      }
      .kline {
          width: 100%;
          margin-left: auto;
          margin-right: auto;
          height: 490;
          position: relative;
      }
      </style>
      