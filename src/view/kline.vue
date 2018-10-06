<template>
        <div class="klines">
          <div class="kline">
            <div id="kline_container"></div>
          </div>
          
        </div>
      </template>
      
      <script>
      // import "../static/lib/jquery.mousewheel.js"
      // import"../../static/js/kline.js"
      export default {
        name: 'kline',
        data () {
          return {
            
          }
        },
        created(){
            this.token = localStorage.getItem('token') || '';
        },
        methods:{
            king(){
              var kline = new Kline({
              element: "#kline_container",
              width: 850,
              height: 530,
              theme: 'dark', // light/dark
              language: 'zh-cn', // zh-cn/en-us/zh-tw
              ranges: ["1w", "1d", "1h", "30m", "15m", "5m", "1m", "line"],
              symbol: "coin5/coin4",
              symbolName: "COIN5_COIN4",
              type: "poll", // poll/socket
            //   url: "../../static/lib/mock.json",
            //   datas:{id:123},
              url: 'http://ice.adminchao.com/api/deal/info',
              datas:{
                legal_id: 3,
                currency_id: 2,
                type: 5
            },
              limit: 1000,
              intervalTime: 5000,
              debug: true,
              showTrade: false,
              onResize: function(width, height) {
                  console.log("chart resized: " + width + " " + height);
              }
            })
            kline.draw();
          },

          getData(){
            var that = this
            this.$http({
                url: '/api/'+'deal/info',
                method:'post',
                data:{
                    legal_id: 3,
                    currency_id: 2,
                    type: 5
                },
                headers: {'Authorization':  that.token}
            }).then(res=>{
                console.log(res)
                if(res.data.type == 'ok'){
                    
                }else{
                        
                }
            }).catch(error=>{
                console.log(error)
        }) 
          }

        },
        mounted(){
          this.king();
          this.getData()
        }
      
      }
      </script>
      
      <!-- Add "scoped" attribute to limit CSS to this component only -->
      <style scoped>
      *{padding: 0;margin: 0;}
      .kline {
          width: 100%;
          margin-left: auto;
          margin-right: auto;
          height: 530;
          position: relative;
      }
      </style>
      