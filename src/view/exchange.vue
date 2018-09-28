<template>
    <div class="exchange">
		<!-- <div class="title fColor1">交易所</div> -->
        <div class="content fColor1">
            <div class="new_price">
                <span class="ft14">最新价 {{newData}} {{legal_name}}/{{currency_name}}</span>
            </div>
            <div class="exchange_title ft12 clear tc">
                <span>方向</span>
                <span>价格(USDT)</span>
                <span>数量(JNB)</span>
            </div>
            <ul class="list-item ft12 tc">
                <li v-for="(out,index) in outlist">
                    <span class="red">卖出</span>
                    <span>{{out.price}}</span>
                    <span>{{out.number}}</span>
                </li>
                <div class="line"></div>
                 <li v-for="(buy,index) in inlist">
                    <span class="green">买入</span>
                    <span>{{buy.price}}</span>
                    <span>{{buy.number}}</span>
                </li>
            </ul>
            
        </div>
	</div>
</template>

<script>
export default {
  name: "exchange",
  data() {
    return {
      outlist: [],
      inlist: [],
      newData: 0,
      currency_name:'',
      legal_name:'',
      currency_id:'',
      legal_id:''
    };
  },
  created: function() {
    // this.init();
     
  },
  mounted: function() {
      var that = this;
    eventBus.$on("toExchange0", function(data0) {
      console.log(data0);
      that.currency_id = data0.currency_id,
      that.legal_id = data0.legal_id;
      that.currency_name = data0.currency_name;
      that.legal_name = data0.leg_name;
      console.log(that.currency_name);
      console.log(that.legal_name);
      //  that.buy_sell(that.legal_id,that.currency_id)
    });
    eventBus.$on("toExchange", function(data) {
      console.log(data);
      that.currency_id = data.currency_id,
      that.legal_id = data.legal_id;
      that.currency_name = data.currency_name;
      that.legal_name = data.leg_name;
      console.log(that.currency_name);
      console.log(that.legal_name);
      that.buy_sell(that.legal_id,that.currency_id)
    });
  },
  sockets: {
    connect() {
      // console.log('socket',this.address)
      this.$socket.emit("login", this.address);
      this.$socket.on("new_msg", msg => {
        console.log(msg);
      });
    },
    new_msg(msg) {
      // console.log(msg)
      if (msg.type == "transaction") {
        console.log(inData);
        this.newData = msg.content;
        var inData = JSON.parse(msg.in);
        var outData = JSON.parse(msg.out);
        if (inData && inData.legth > 0) {
          this.inlist = inData;
        }
        if (outData && outData.legth > 0) {
          this.outlist = outData;
        }
      }
    }
  },
  methods: {
    init() {
      var index = layer.load();
      this.address = localStorage.getItem("address") || "";
      var inData = JSON.parse(
        '[{"price":"0.50000","number":"1.00000","account_number":null},{"price":"0.50000","number":"1.00000","account_number":null},{"price":"0.50000","number":"1.00000","account_number":null},{"price":"0.49500","number":"160.00000","account_number":null},{"price":"0.49000","number":"300.00000","account_number":null}]'
      );
      // console.log(inData)
      this.$http({
        url: "http://jnbadmin.mobile369.com/api/transaction/deal",
        method: "POST",
        data: {
          address: this.address
        }
      }).then(res => {
        layer.close(index);
        if (res.data.type == "ok") {
          var message = res.data.message;
          this.inlist = message.in;
          this.newData = message.last_price;
          // console.log(res.data.message)
          this.outlist = message.out;
        } else {
          // layer.msg(res.data.message);
        }
      });
    },
    //买入、卖出记录
    buy_sell(legals_id,currencys_id){
        this.$http({
                    url: this.$utils.laravel_api+'transaction/deal',
                    method:'post',
                    data:{
                        legal_id:legals_id,
                        currency_id:currencys_id
                    },  
                      beforeSend: function beforeSend(request) {
				request.setRequestHeader("Authorization", token);
			},
                }).then(res=>{
                    console.log(res ,222)
                    layer.close(i);
                    this.inlist = res.message.in;
                    this.outlist = res.message.out
                    
                    if(res.data.type=="ok"){
                        this.buyInfo.buyPrice=0;
                        this.buyInfo.buyNum=0;
                    }else{
                        layer.msg(res.data.message)
                    }
                }).catch(error=>{
                    // console.log(error)
                })
    }
        
  }
};
</script>

<style scoped>
.title {
  height: 48px;
  line-height: 48px;
  padding: 0 10px 0 30px;
  background-color: #181b2a;
}
.content {
  padding: 0 10px;
}
.new_price {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #303b4b;
  padding: 0 0 0 20px;
}
.exchange_title {
  line-height: 25px;
  position: relative;
  color: #637085;
}
.list-item li {
  line-height: 25px;
  overflow: hidden;
}
.list-item li span,
.exchange_title span {
  width: 33.3%;
  display: inline-block;
  float: left;
}
.green {
  color: #55a067;
}
.red {
  color: #cc4951;
}
.line {
  height: 5px;
  border-bottom: 1px solid #303b4b;
}
</style>
