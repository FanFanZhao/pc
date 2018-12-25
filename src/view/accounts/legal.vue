<template>
  <div>
    <div class="top bg-part">
      <p>
        法币账户 总资产折合：{{totle}}（USDT）
        <span class="ft12 all_account">
          <span class></span>≈
          <span>{{totle*usprice}}</span> CNY
        </span>
      </p>
    </div>
    <ul class="list bg-part">
      <li v-for="(item,index) in list" :key="index">
        <p class="legal_name">{{item.currency_name}}</p>
        <div class="balance_detail">
          <div class="use_balance flex1">
            <p class="ft12 mincny">可用</p>
            <p class="use_balance_num">{{item.legal_balance}}</p>
          </div>
          <div class="flex1">
            <p class="ft12 mincny">冻结</p>
            <p class="lock_balance_num">{{item.lock_legal_balance}}</p>
          </div>
          <div class="convert flex1">
            <p class="ft12 mincny">折合</p>
            <!-- <p class="lock_balance_num">{{item.legal_balance}}{{item.lock_legal_balance}}{{usprice}}{{item.ustd_price}}（CNY）</p> -->
            <p
              class="lock_balance_num"
            >{{(item.legal_balance - 0 + (item.lock_legal_balance-0))*item.ustd_price*usprice}}</p>
          </div>
          <div class="flex1">
              <el-button size="mini" type="primary"  @click="$router.push({path:'/transferLegal',query:{id:item.currency}})">划转</el-button>
          </div>
          <div class="flex1 in-out ft14" hidden>
            <span
              :style="{color:item.showIn?'#5697f4':'#61688a'}"
              @click="setInOut('showIn',index,item.currency)"
            >充币</span>
            <span
              :style="{color:item.showOut?'#5697f4':'#61688a'}"
              @click="setInOut('showOut',index,item.currency)"
            >提币</span>
          </div>
        </div>
        <div class="hidebox" v-if="item.showIn || item.showOut">
          <div class="box-in" v-if="item.showIn">
            <div>充币地址</div>
            <div class="flex">
              <span>{{inAddress}}</span>
              <span :id="'copy'+''+index" @click="copy($event)" style="color: #5697f4;">复制</span>
              <!-- <div style="color: #5697f4;" class="erweima-box">
                  <span>显示二维码</span>
              </div>-->
              <canvas :id="'canvas'+index" class="canva"></canvas>
            </div>
          </div>
          <!--提币区-->
          <div class="hide_div box-out" v-if="item.showOut">
            <p class="fColor2 ft12 mb15">提币地址</p>
            <input class="address_inp fColor1 mb30 bg-inp" type="text" v-model="outPms.address">
            <p class="fColor2 ft12 mb15 flex between alcenter">
              <span>数量</span>
              <span>
                可用：
                <span class="use_num">{{msg.change_balance}}</span>
              </span>
            </p>
            <label class="num_lab flex between mb30 bg-inp">
              <input
                class="fColor1"
                type="number"
                :placeholder="'最小提币数量'+msg.min_number"
                v-model="outPms.number"
                :min="msg.min_number"
                :max="msg.change_balance"
              >
              <span>{{msg.name}}</span>
            </label>
            <div class="flex mb50">
              <div class="left_inp_wrap flex1">
                <p class="fColor2 ft12 mb15">
                  <span>手机验证码</span>
                  <!-- <span>范围：<span>{{ratenum}}</span></span> -->
                </p>
                <label class="range_lab flex alcenter between bg-inp">
                  <input class="fColor1" type="text" v-model="outPms.code">
                  <span @click="sendCode">{{codeTip}}</span>
                </label>
              </div>
              <div class="right_inp_wrap flex1">
                <p style="margin-bottom:11px">
                  <span class="fColor2 ft12">到账数量（手续费{{msg.rate}}）</span>
                </p>
                <label class="get_lab flex alcenter between bg-inp">
                  <input
                    class="fColor1"
                    disabled
                    :value="outPms.number<msg.rate?0:outPms.number-msg.rate"
                    type="number"
                  >
                  <span>{{msg.name}}</span>
                </label>
              </div>
            </div>
            <div class="flex" style="justify-content:space-between">
              <div class="flex1 tr">
                <button class="withdraw_btn" @click="mention">提币</button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import "@/lib/clipboard.min.js";
import QRCode from "qrcode";
export default {
  data() {
    return {
        token:'',
      totle: "",
      list: [],
      inAddress: "",
      codeTip: "发送验证码",
      timer: "",
      outPms: {
        currency: "",
        number: "",
        code: "",
        adddress: ""
      },
      msg: { rate: 0, min_number: 0, name: "",change_balance:0 }
      //   usprice:''
    };
  },
  created() {
    this.token = localStorage.getItem("token") || "";
  },
  mounted() {
    this.legal();
  },
  methods: {
    setInOut(type, index, currency) {
    
      this.clearTime();
      this.inAddress = "";
      this.outPms = {
        currency: currency,
        number: "",
        code: "",
        address: ""
      };
      if (type == "showIn") {
        this.list[index].showOut = false;
        this.list[index].showIn = !this.list[index].showIn;
        if (this.list[index].showIn) {
          this.getAddress(currency,index);
        }
      } else {
        this.list[index].showIn = false;
        this.list[index].showOut = !this.list[index].showOut;
        if (this.list[index].showOut) {
          this.getInfo(currency);
        }
      }
    },
    clearTime() {
        if(this.timer){

            clearInterval(this.timer);
            this.codeTip = "发送验证码";
        }
    },
    sendCode() {
      if (this.codeTip == "发送验证码") {
        var phone = window.localStorage.getItem("userPhone");
        this.$http({
          url: "/api/sms_send",
          method: "post",
          data: { user_string: phone, type: "forget" }
        }).then(res => {
          layer.msg(res.data.message);
          if (res.data.type == "ok") {
            var time = 11;
            this.timer = setInterval(() => {
              time--;
              this.codeTip = "剩余" + time + "" + "s";
              if (time == 0) {
                this.codeTip = "发送验证码";
                clearInterval(this.timer);
              }
            }, 1000);
          }
        });
      }
    },
    mention() {
      if (this.outPms.address == "") {
        layer.alert("请输入提币地址");
        return;
      }
      if (this.outPms.number == "") {
        layer.alert("请输入提币数量");
        return;
      } else if(this.outPms.number - this.msg.change_balance<0){
          layer.alert('数量不能超出可用！');return;
      }
      if (this.outPms.number - 0 < this.msg.min_number) {
        return layer.alert("输入的提币数量小于最小值");
      }
      if (this.outPms.code == "") {
        layer.msg("请输入手机验证码");
        return;
      }

      $.ajax({
        type: "POST",
        url: "/api/" + "wallet/out",
        data: this.outPms,
        dataType: "json",
        async: true,
        beforeSend: function beforeSend(request) {
          request.setRequestHeader("Authorization", this.token);
        },
        success: res => {
          console.log(res);
          layer.alert(res.message);
          if (res.type == "ok") {
            window.location.reload();
          }
        }
      });
    },
    getInfo(currency) {
      this.outPms.currency = currency;
      var i = layer.load();
      this.$http({
        url: "/api/wallet/get_info",
        method: "post",
        data: { currency: currency },
        headers: { Authorization: this.token }
      }).then(res => {
          layer.close(i);
        if (res.data.type == "ok") {
          this.msg = res.data.message;
        }
      });
    },
    createCode(index) {
      var QRCode = require("qrcode");
      var canvas = document.getElementById("canvas" + index);
      var address = this.inAddress;
      QRCode.toCanvas(canvas, address, {
        width: 80
      });
    },
    copy(e) {
      console.log(e);

      var that = this;
      var clipboard = new Clipboard("#" + e.target.id, {
        text: function() {
          return that.inAddress;
        }
      });
      clipboard.on("success", function(e) {
        that.flags = true;
        layer.msg("复制成功");
      });
      clipboard.on("error", function(e) {
        that.flags = false;
        layer.msg("请重新复制");
      });
    },
    getAddress(currency,index) {
        
        var i = layer.load();
        this.$http({
          url: "/api/wallet/get_in_address",
          method: "post",
          data: { currency: currency },
          headers: { Authorization: this.token }
        }).then(res => {
          layer.close(i);
          if (res.data.type == "ok") {
            this.inAddress = res.data.message;
            this.createCode(index);
          }
        });
      
    },
    //法币账户
    legal() {
      var that = this;
      var i = layer.load();
      this.$http({
        url: "/api/" + "wallet/list",
        method: "post",
        data: {},
        headers: { Authorization: that.token }
      })
        .then(res => {
          layer.close(i);
          if (res.data.type == "ok") {
            var list = res.data.message.legal_wallet.balance;
            list.forEach(function(item) {
              item.showIn = false;
              item.showOut = false;
            });
            that.list = list;
            this.totle = res.data.message.legal_wallet.totle;
          } else {
            // layer.msg(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
    
  }
};
</script>
<style scoped lang='scss'>
.flex1 {
  flex: 1;
}
.top {
  background: #1b1e2e;
  color: #fff;
  padding: 15px 30px;
}
.all_account {
  color: #61688a;
}
.list {
  padding: 15px 30px;
}
.balance_detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #61688a;
}
.legal_name {
  color: #61688a;
  padding: 10px 0;
}
.use_balance_num,
.lock_balance_num,
.lock_balance_num {
  color: #fff;
  padding: 5px 0;
}
.list li {
  border-bottom: 1px solid #1b2a3e;
}
.convert {
  padding: 10px 0;
}
.in-out {
  cursor: pointer;
}
.in-out span {
  margin-right: 30px;
}
.canva {
  width: 80px;
  height: 80px;
}
.hidebox {
  border-top: 1px solid #1b2335;
  padding: 30px 0;
  .box-out {
    input {
      background: none;
      border: none;
    }
    .address_inp {
      width: 100%;
      border: 1px solid #6b80ae;
      border-radius: 3px;
      padding: 15px 15px;
    }
    .num_lab {
      display: flex;
      width: 100%;
      border: 1px solid #6b80ae;
      border-radius: 3px;
      padding: 15px;
    }
    .num_lab input {
      width: 100%;
    }
    .range_lab,
    .get_lab {
      border: 1px solid #6b80ae;
      border-radius: 3px;
      padding: 15px;
    }
    .get_lab {
      background: #1e2c42;
    }
    .right_inp_wrap {
      margin-left: 20px;
    }
    .use_num,
    .advance {
      color: #5697f4;
    }
    .use_num {
      margin-right: 5px;
    }
    .advance {
      margin-left: 5px;
    }
    .withdraw_btn {
      background-color: #7a98f7;
      color: #fff;
      padding: 15px 70px;
      border: none;
      border-radius: 5px;
    }
    .withdraw_btn:hover {
      cursor: pointer;
    }
  }
}
.box-in > .flex {
  align-items: center;
  span {
    margin-right: 30px;
    cursor: pointer;
  }
}
.erweima-box {
  display: flex;
  > canvas {
    opacity: 0;
    display: flex;
  }
  &:hover {
    canvas {
      opacity: 1;
    }
  }
}
</style>


