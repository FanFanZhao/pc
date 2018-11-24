<template>
    <div id="c2c-box" class="flex">
        <div class="c2c-l">
            
            <ul>
                <li class="flex" v-for="(item,index) in currency_list" :key="index" :class="index == active?'bg_active':''" :data-id="item.id" @click="currency_click(item.id,item.name,index)">
                    <div class="flex">
                        <div>{{item.name}}/CNY</div>
                        <div class="redColor">{{item.name}}/人民币</div>
                    </div>
                    <span>></span>
                </li>
            </ul>
        </div>
        <div class="c2c-r">
            <div class="top">
                <div class="top-title flex">
                    <div>
                        <router-link tag="span" to="/c2c" class="link-span">tether {{currency_name}}</router-link>
                        <span>对CNY</span>
                    </div>
                </div>
                <!-- <div class="top-price flex">
                    <div>
                        <span>实时价：</span>
                        <span>￥6.83</span>
                    </div>
                    <div>
                        <span>日涨跌：</span>
                        <span>1.2%</span>
                    </div>
                    <div>
                        <span>最高价：</span>
                        <span>￥6.83</span>
                    </div>
                    <div>
                        <span>最低价：</span>
                        <span>￥6.83</span>
                    </div>
                </div> -->
                <div class="inp-items flex">
                    <div class="inp-item">
                        <div class="inp-title flex">
                            <div>买入{{currency_name}}</div>
                            
                        </div>
                        <div class="how redColor ft14">如何买入?</div>
                        <div class="three-inp">
                            <!-- <div class="inp-box">
                                <span>买入估价CNY</span>
                                <div style="background:#f8f8f8;">6.85</div>
                            </div> -->
                            <div class="inp-box">
                                <span>买入量{{currency_name}}</span>
                                <input type="number" v-model="num">
                            </div>
                            <div class="inp-box">
                                <span>单价CNY</span>
                                <input type="number" v-model="price">
                            </div>
                            <div class="inp-box">
                                <span>姓名</span>
                                <input type="text" v-model="user_name">
                            </div>
                            <div class="inp-box">
                                <span>详细内容</span>
                                <input type="text" v-model="content">
                            </div>
                        </div>
                        <div class="pay-opts flex">
                            <div>支付方式</div>
                            <div>
                    
                                <label >
                                    <input type="radio" name="pay" value="支付宝" v-model="pay">
                                    支付宝
                                </label>
                            </div>
                            <div>
                    
                                <label >
                                    <input type="radio" name="pay" value="微信" v-model="pay">
                                    微信
                                </label>
                            </div>
                            <div>
                    
                                <label >
                                    <input type="radio" name="pay" value="银行卡" v-model="pay">
                                    银行转账
                                </label>
                            </div>
                            <div class="redColor">（必须本人支付)</div>
                            <!-- <router-link tag="div" to="/c2c">《交易须知》</router-link> -->
                        </div>
                        <div class="btn-in" @click="bui_in">买入（CNY→{{currency_name}}）</div>
                    </div>
                    <div class="inp-item">
                        <div class="inp-title flex">
                            <div>
                                <span>卖出{{currency_name}}</span>
                                <span class="ft14" style="color:#666">({{currency_name}}余额)</span>
                                </div>
                            <!-- <div style='font-size:14px;color:#666'>
                                <router-link to="/c2c" style="margin-right:10px">{{currency_name}}充值</router-link>
                                <router-link to="/c2c">{{currency_name}}提现</router-link>
                            </div> -->
                        </div>
                        <div class="how redColor ft14">如何卖出?</div>
                        <div class="three-inp">
                            <!-- <div class="inp-box">
                                <span>卖出估价CNY</span>
                                <div style="background:#f8f8f8;color:#008069">6.85</div>
                            </div> -->
                            <div class="inp-box">
                                <span>卖出量{{currency_name}}</span>
                                <input type="number" v-model="num01">
                            </div>
                            <div class="inp-box">
                                <span>单价CNY</span>
                                <input type="number" v-model="price01">
                            </div>
                             <div class="inp-box">
                                <span>姓名</span>
                                <input type="text" v-model="user_name01">
                            </div>
                            <div class="inp-box">
                                <span>详细内容</span>
                                <input type="text" v-model="content01" />
                            </div>
                        </div>
                        <div class="pay-opts flex">
                            <div>支付方式</div>
                            <div>
                    
                                <label >
                                    <input type="radio" name="pay01" value="支付宝" v-model="pay01">
                                    支付宝
                                </label>
                            </div>
                            <div>
                    
                                <label >
                                    <input type="radio" name="pay01" value="微信" v-model="pay01">
                                    微信
                                </label>
                            </div>
                            <div>
                    
                                <label >
                                    <input type="radio" name="pay01" value="银行卡" v-model="pay01">
                                    银行转账
                                </label>
                            </div>
                            
                            <div class="redColor">（必须本人支付)</div>
                            <!-- <router-link tag="div" to="/c2c">《交易须知》</router-link> -->
                        </div>
                        <div class="btn-out" @click="sell_out">卖出（{{currency_name}}→CNY）</div>

                    </div>
                    
                </div>
            </div>
            <div class="bot">
                <div class="buy-sell-box" v-if="showTradeBox">
                  <div>
                    <div class="close" @click="showTradeBox = false">x</div>
                  <div class="title">请输入{{tradeParams.type == 'buy'?'买入':'卖出'}}数量</div>
                    <div class="total">最多可{{tradeParams.type == 'buy'?'买入':'卖出'}}{{tradeParams.total}}{{currency_name}}</div>
                    <div class="inp flex">
                      <input type="number"  ref='usdtNum' @input="$refs.cnyNum.value = ($event.target.value*tradeParams.price).toFixed(2)||''" @keyup="fixedInp(5,$event)"> {{currency_name}} 
                    </div>
                    <div class="inp flex">
                      <input type="number"  ref= 'cnyNum' @input="$refs.usdtNum.value = ($event.target.value/tradeParams.price).toFixed(5)||'' " @keyup="fixedInp(2,$event)"> CNY 
                    </div>
                    <!-- <div>
                      <input type="number" :value="tradeParams.num*tradeParams.price" @input="tradeParams.num = $event.target.value*tradeParams.price">
                    </div> -->
                  <div class="btn" @click="buySell">{{tradeParams.type == 'buy'?'买入':'卖出'}}</div>
                  </div>
                  <!-- <div>卖出</div> -->
                </div>
                <div class="bot-title flex">
                    <div>
                        <span @click="nowList ='listIn';reloadC2c()" :class="{'active':nowList == 'listIn'}">c2c</span>
                        <span @click="nowList =  'myAdd';reloadMyAdd()" :class="{'active':nowList == 'myAdd'}">我发布的c2c</span>
                        <span @click="nowList = 'myBuySell';reloadMyBuySell()" :class="{'active':nowList == 'myBuySell'}">我交易的c2c</span>
                    
                    </div>
                    <div class="flex" @click="showList = !showList">
                        <div :class="[{'switch-on':!showList},{'switch':showList}]"><div></div></div>
                        <span class="ft14">显示市场挂单</span>
                    </div>
                </div>
                <div class="list-title flex" v-if="showList">
                    <div>类型</div>
                    <div>价格(CNY)</div>
                    <div>数量</div>
                    <div>总计(CNY)</div>
                    <!-- <div>交易限额(USDT)</div> -->
                    <div>商家</div>
                    <!-- <div>成交单数</div> -->
                    <!-- <div>平均用时</div> -->
                    <div>付款方式</div>
                    <div style="visibility: hidden;">一一24234234</div>
                </div>
                <div class="ul-box" v-if="nowList == 'listIn'">
                    <ul class="ul-out" v-if="showList&&listOut.list.length">
                        <li v-for="(item,index) in listOut.list" :key="index" class="flex" >
                          <div class="content flex">

                            <div style="color:#25796a">卖出</div>
                            <div>{{item.price}}</div>
                            <div>{{item.surplus_number}} {{item.token}}</div>
                            <div>{{(item.surplus_number*item.price-0).toFixed(2)}}</div>
                            <!-- <div></div> -->
                            <div>{{item.name}}</div>
                            <!-- <div></div> -->
                            <!-- <div></div> -->
                            <div>{{item.pay_mode}}</div>
                            <div class="last">
                                <div class="detailit" @click="getDetail(item.id,'c2c',$event)">详情</div>
                                <div class="btn-last" v-if="item.status_name == '等待中'" @click="showTradeBox = true;tradeParams = {price:item.price,index:index,id:item.id,type:'buy',total:item.surplus_number}">买入</div>
                            </div>
                          </div>
                        </li>
                        <!-- <li class="flex">
                            
                        </li> -->
                        
                    </ul>
                    <!-- <div class="more"  v-if="listOut.length&&listOut.hasMore" @click="getList(1)">加载更多</div> -->
                    <ul class="ul-in" v-if="showList&&listIn.list.length">
                        <li v-for="(item,index) in listIn.list" :key="index" class="flex">
                          <div class="content flex">

                            <div>买入</div>
                            <div>{{item.price}}</div>
                            <div>{{item.surplus_number}} {{item.token}}</div>
                            <div>{{(item.surplus_number*item.price-0).toFixed(2)}}</div>
                            <!-- <div></div> -->
                            <div>{{item.name}}</div>
                            <!-- <div></div> -->
                            <!-- <div></div> -->
                            <div>{{item.pay_mode}}</div>
                            <div class="last">
                                <div class="detailit" @click="getDetail(item.id,'c2c',$event)">详情</div>
                                <div v-if="item.status_name == '等待中'" @click="showTradeBox = true;tradeParams = {price:item.price,index:index,id:item.id,type:'sell',total:item.surplus_number}" class="btn-last">卖出</div>
                            </div>
                          </div>
                        </li>
                        
                    </ul>
                    <div class="more"  v-if="(listIn.list.length&&listIn.hasMore) || (listOut.list.length&&listOut.hasMore)" @click="getList(0);getList(1)">加载更多</div>

                </div>
                <div class="ul-box" v-if="nowList == 'myAdd'">
                    <ul class=" my-add" v-if="showList&&myAdd.list.length">
                        <li v-for="(item,index) in myAdd.list" :key="index" class="">
                          <div class="content flex">
                            <div style="color:#25796a" v-if="item.type_name=='卖出'">卖出</div>
                            <div style="color:#7a98f7" v-if="item.type_name=='买入'">买入</div>
                            <div>{{item.price}}</div>
                            <div>{{item.surplus_number}} {{item.token}}</div>
                            <div>{{(item.surplus_number*item.price-0).toFixed(2)}}</div>
                            <!-- <div></div> -->
                            <div>{{item.name}}</div>
                            <!-- <div></div> -->
                            <!-- <div></div> -->
                            <div>{{item.pay_mode}}</div>
                            <div class="last ">
                                <!-- <div class="btn-last" @click="cancelComplete('cancel_transaction',item.id)" v-if="item.status_name == '已成功'" style="margin-right:10px;background: #7a98f7;">取消交易</div> -->
                                <!-- <div class="detailit" @click="getDetail(item.id,'myC2c',$event)">详情</div> -->
                                <span class="showtrade" @click="switchTrade(index)" v-if="item.detail.length">交易列表</span>
                                <div v-if="item.status != 3" class="btn-last btn-green" @click="cancelComplete('cancel',item.id,index)">取消发布</div>
                                <!-- <div v-if="item.status_name == '交易中'" class="btn-last" @click="cancelComplete('cancel_transaction',item.id,index)">取消交易</div> -->
                                <!-- <div v-if="item.status_name == '交易中'" class="btn-last" @click="cancelComplete('complete',item.id,index)">确认收款</div> -->
                                <span class="btn-last btn-green" v-else>{{item.status_name}}</span>
                                <!-- <span class="btn-last" v-if="item.status_name == '已取消' ">{{item.status_name}}</span> -->
                            </div>
                          </div>
                          <div class="trade-list" v-if="showTradeList.show&&showTradeList.index == index">
                            <p class="flex">
                              <span>交易人</span>
                              <span>时间</span>
                              <span>数量</span>
                              <span>微信账号</span>
                              <span>支付宝账号</span>
                              <span>银行卡号</span>
                              <span>状态 | 操作</span>
                            </p>
                            <ul>
                              <li class="flex" v-for="(trader,inde) in item.detail" :key="inde">
                                <div v-if="trader.phone">{{trader.phone}}</div>
                                <div v-if="!trader.phone">{{trader.email}}</div>
                                <div>{{trader.create_date}}</div>
                                <div>{{trader.number}}</div>
                                <div>{{trader.wechat_account}}</div>
                                <div>{{trader.alipay_account}}</div>
                                <div>{{trader.bank_account}}</div>
                                <!-- <div>12.00</div> -->
                                <!-- <div>{{trader.status_name}}</div> -->
                                <div>
                                  <div v-if="trader.status != 1">{{trader.status_name}}</div>
                                  <div v-else class="btn-green" @click="cancelComplete('cancel_transaction',trader.id,index)">取消交易</div>
                                  <div class="btn-last btn-green" v-if="trader.status == 1&&item.type_name=='卖出'" @click="cancelComplete('complete',trader.id)" >确认</div>
                                  <!-- <div class="detailit" @click="getDetail(trader.c2c_id,'myC2c',$event)">详情</div> -->
                                  <!-- <div class="btn-green" @click="cancelComplete('complete',trader.c2c_id,index)">确认完成</div> -->
                                </div>
                              </li>
                              
                            </ul>
                          </div>
                        </li>
                        <!-- <li class="flex">
                            
                        </li> -->
                        
                    </ul>
                    <div class="more"  v-if="myAdd.list.length&&myAdd.hasMore&&this.showList" @click="getMy('myAdd')">加载更多</div>
                    
                </div>
                <div class="ul-box" v-if="nowList == 'myBuySell'">
                    <ul class="ul-out" v-if="showList&&myBuySell.list.length">
                        <li v-for="(item,index) in myBuySell.list" :key="index" class="flex" >
                          <div class="content flex">

                            <div style="color:#7a98f7" v-if="item.type_name=='卖出'">买入</div>
                            <div style="color:#25796a" v-if="item.type_name=='买入'">卖出</div>
                            <div>{{item.price}}</div>
                            <div>{{item.number}} {{item.token}}</div>
                            <div>{{(item.number*item.price-0).toFixed(2)}}</div>
                            <!-- <div></div> -->
                            <div>{{item.name}}</div>
                            <!-- <div></div> -->
                            <!-- <div></div> -->
                            <div>{{item.pay_mode}}</div>
                            
                            <div class="last">
                                <div class="detailit" @click="getDetail(item.c2c_id,'trade',$event)">详情</div>
                                <!-- <span class="btn-last" v-if="item.status_name == '等待中'">{{item.status_name}}</span> -->
                                <span class="btn-last" v-if="item.status_name == '已成功'">{{item.status_name}}</span>
                                <span class="btn-last" v-else-if="item.status_name == '已取消'">{{item.status_name}}</span>
                                <span class="btn-last" v-if="item.status_name == '交易中'&&item.type_name=='买入'" @click="cancelComplete('complete',item.id)">确认</span>
                               
                            </div>
                          </div>
                        </li>
                        <!-- <li class="flex">
                            
                        </li> -->
                        
                    </ul>
                    <div class="more"  v-if="myBuySell.list.length&&myBuySell.hasMore&&this.showList" @click="getMy('myBuySell')">加载更多</div>
                    

                </div>
                

            </div>
        </div>
        <!-- =========详情弹窗========== -->
        <div class="mask" v-if="showDetail">
            <div class="m-content">
                <div class="title">
                    <div>详情</div>
                    <div @click="showDetail = false">x</div>
                </div>
                <div class="list">
                    
                    
                    <!-- <div class="c2c-detail" v-if="detail.type=='c2c'">
                        <div>
                            <span>买家账号：</span><span>{{detail.user_info.phone}}</span>
                        </div>
                        <div>
                            <span>买家姓名：</span><span>{{detail.c2c.name}}</span>
                        </div>
                    </div> -->
                    <div class="myC2cDetail" v-if="detail.type=='myC2c'">
                      
                        <!-- <div>
                            <span>我的账号：</span><span>{{detail.user_info.phone}}</span>
                        </div>
                        <div>
                            <span>交易类型：</span><span>{{detail.c2c.type_name}}</span>
                        </div>
                        <div>
                            <span>币  种：</span><span>{{detail.c2c.token}}</span>
                        </div>
                        <div>
                            <span>价  格：</span><span>{{detail.c2c.price}}</span>
                        </div>
                        <div>
                            <span>详  情：</span><span>{{detail.c2c.content}}</span>
                        </div> -->
                    </div>
                    <div class="trade-detail" v-if="detail.type=='trade' || detail.type=='c2c'">
                        <div>
                            <span v-if="detail.type == 'trade'">交易人：</span>
                            <span v-if="detail.type == 'c2c'">账号：</span>
                            <span v-if="detail.user.account_number">{{detail.user.account_number}}</span>
                            <span v-else-if="detail.user.phone">{{detail.user.phone}}</span>
                            <span v-else>{{detail.user.email}}</span>
                        </div>
                        <div>
                            <span>类型：</span><span>{{detail.typeName}}</span>
                        </div>
                        <div>
                            <span>币  种：</span><span>{{detail.token}}</span>
                        </div>
                        <div>
                            <span>详  情：</span><span>{{detail.content}}</span>
                        </div>
                        
                        
                        <div v-if="detail.user.cash.wechat_account">
                            <span>微信账号：</span><span>{{detail.user.cash.wechat_account}}</span>
                        </div>
                        <div v-if="detail.user.cash.alipay_account">
                            <span>支付宝账号 ：</span><span>{{detail.user.cash.alipay_account}}</span>
                        </div>
                        <div v-if="detail.user.cash.bank_account">
                            <span>银行卡 ：</span><span>{{detail.user.cash.bank_account}}</span>
                        </div>
                    </div>
                    <div class="create-date">
                        <span>创建时间：</span><span>{{detail.create_date}}</span>
                    </div>
                    <div class="create-date">
                        <span>数量：</span><span>{{detail.surplus_number}}</span>
                    </div>
                    <div class="create-date">
                        <span>价格：</span><span>{{detail.price}}</span>
                    </div>
                    <div class="create-date">
                        <span>支付方式：</span><span>{{detail.payMode}}</span>
                    </div>
                    
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
      nowList: "listIn",
      listIn: { page: 1, list: [], hasMore: true },
      listOut: { page: 1, list: [], hasMore: true },
      myAdd: { page: 1, list: [], hasMore: true },
      myBuySell: { page: 1, list: [], hasMore: true },
      active: 0,
      currency_list: [],
      currency_name: "",
      id: "",
      price: "",
      num: "",
      pay: "支付宝",
      user_name: "",
      content: "",
      price01: "",
      num01: "",
      pay01: "支付宝",
      user_name01: "",
      content01: "",
      currency_list: [],
      currency_name: "",
      showList: true,
      showDetail: false,
      detail: {}, //li详情,
      showTradeBox: false,
      tradeParams: {
        id: "",
        total: "",
        type: ""
        
      },
      
      buySellNum: "",
      showTradeList: { show: false, index: "none" }
      
    };
  },
  created() {
    this.token = window.localStorage.getItem("token") || "";
    if (this.token == "") {
      this.$router.push("/components/login");
    }
    this.get_currency();
    this.getList(1);
    this.getList(0);
    this.getMy("myAdd");
    // this.getMy("myBuySell");
  },
  
  
  methods: {
    fixedInp(n,e){
      if(e.target.value == 0){
        e.target.value == ''
      } else {
        var v = e.target.value + '';
        var index = v.indexOf('.');
        if(index != -1){
          
          if(v.substr(index).length>(n+1)){
            e.target.value = (v-0).toFixed(n);
          }
        }
        
        
        
      }
    },
    reloadC2c() {
      this.listIn = { page: 1, list: [], hasMore: true };
      this.listOut = { page: 1, list: [], hasMore: true };
      this.getList(1);
      this.getList(0);
    },
    reloadMyAdd() {
      this.myAdd = { page: 1, list: [], hasMore: true };
      this.getMy("myAdd");
    },
    reloadMyBuySell() {
      this.myBuySell = { page: 1, list: [], hasMore: true };
      this.getMy("myBuySell");
    },
    // 获取币种列表
    get_currency() {
      this.$http({
        url: "/api/currency/list",
        method: "get",
        headers: { Authorization: this.token }
      }).then(res => {
        //////consolelog(res);
        if (res.data.type == "ok") {
          this.currency_list = res.data.message.legal;
          this.currency_name = res.data.message.legal[0].name;
          this.id = res.data.message.legal[0].id;
        }
      });
    },
    //选择币种
    currency_click(id, name, index) {
      this.currency_name = name;
      this.active = index;
      this.id = id;
    },
    // 获取c2clist
    getList(type) {
      let page = 1;
      page = type == 1 ? this.listOut.page : this.listIn.page;
      //////consolelog(type);
      let i = layer.load();
      this.$http({
        url: "/api/c2c/list?type=" + type + "&page=" + page,

        method: "get",
        headers: { Authorization: this.token }
      }).then(res => {
        layer.close(i);
        if (res.data.type == "ok") {
          let list = res.data.message;
          //////consolelog(list);

          if (list.length != 0) {
            // ////consolelog(list);

            if (type == 1) {
              this.listOut.list = this.listOut.list.concat(list);
              this.listOut.hasMore = true;
              this.listOut.page += 1;
              //   ////consolelog(this.listOut);
            } else {
              //   ////consolelog(this.listIn.list);
              this.listIn.hasMore = true;
              this.listIn.list = this.listIn.list.concat(list);
              // ////consolelog( this.listIn.list);

              // ////consolelog(this.listIn);

              this.listIn.page += 1;
              // ////consolelog([].concat(list));
            }
          } else {
            type == 1
              ? (this.listOut.hasMore = false)
              : (this.listIn.hasMore = false);
          }
        }
      });
    },
    // c2c列表买入卖出
    buySell() {
      var num = this.$refs.usdtNum.value;
      if (num == "") {
        return;
      } else if ((num - 0) > (this.tradeParams.total - 0)) {
        layer.msg("数量不能大于" + this.tradeParams.total);
        return;
      }
      //consolelog(this.tradeParams);

      let i = layer.load();
      // this.showDetail  = false;
      let data = {};
      let type = this.tradeParams.type;
      data.buynumber = num;

      data.id = this.tradeParams.id;
      data.number = this.tradeParams.total;
      var index = this.tradeParams.index;
      this.$http({
        url: "/api/c2c/" + type,
        method: "post",
        data: data,
        headers: { Authorization: this.token }
      }).then(res => {
        layer.close(i);
        layer.msg(res.data.message);
        if (res.data.type == "ok") {
          if (type == "buy") {
            // this.listOut.list[index].total_number -= this.tradeParams.num;
            this.listOut = { hasMore: true, list: [], page: 1 };
            this.getList(1);
          } else {
            this.listIn = { hasMore: true, list: [], page: 1 };
            this.getList(0);
          }
          this.myBuySell = { hasMore: true, list: [], page: 1 };
          this.getMy("myBuySell"); //更新我交易的c2c
          //   ////consolelog(res.data);
        }
        if (res.data.type == "error") {
        }
        this.showTradeBox = false;
      });
    },
    getMy(type) {
      let t = "";
      t = type == "myAdd" ? "my_add" : "my_transaction";
      this.showTradeList = { show: false, index: "none" };
      let i = layer.load();
      this.$http({
        url: "/api/c2c/" + t + "?page=" + this[type].page,

        headers: { Authorization: this.token }
      }).then(res => {
        ////consolelog(res);
        layer.close(i);
        if (res.data.type == "ok") {
          if (res.data.message.length == 0) {
            this[type]["hasMore"] = false;
          } else {
            let list = res.data.message;
            this[type]["hasMore"] = true;
            this[type]["list"] = this[type]["list"].concat(list);
            this[type]["page"] += 1;
            ////consolelog(this[type]);
          }
        }
      });
    },
    /* 显示交易列表 */
    switchTrade(index) {
      if (this.showTradeList.show == false) {
        this.showTradeList.show = true;
        this.showTradeList.index = index;
      } else {
        if (index == this.showTradeList.index) {
          this.showTradeList.show = false;
          return;
        } else {
          this.showTradeList.index = index;
        }
      }
      //consolelog(this.showTradeList);
    },
    cancelComplete(type, id, index) {
      // this.showDetail = false;
      var i = layer.load();
      this.$http({
        url: "/api/c2c/" + type,
        method: "post",
        data: { id: id },
        headers: { Authorization: this.token }
      }).then(res => {
        layer.close(i);
        layer.msg(res.data.message);
        if (res.data.type == "ok") {
          ////consolelog(res);
          if (type == "complete") {
            this.myBuySell = { hasMore: true, list: [], page: 1 };
            this.myAdd = { hasMore: true, list: [], page: 1 };
            this.getMy("myBuySell");
            this.getMy("myAdd");
          } else {
            this.myAdd = { hasMore: true, list: [], page: 1 };
            this.getMy("myAdd");
          }
        }
      });
    },
    getDetail(id, type, e) {
      if (e.target.className != "detailit") {
        return;
      }

      this.$http({
        url: "/api/c2c/detail?id=" + id,
        headers: { Authorization: this.token }
      }).then(res => {

        if (res.data.type == "ok") {
          let msg = res.data.message;
          if (type == "trade"||type == "c2c") {
            this.detail.user = msg.user;

            this.detail.typeName = msg.type_name;
            this.detail.token = msg.token;
            // return;
          }
          this.detail.create_date = msg.create_date || "";
          this.detail.content = msg.content || "";
          this.detail.price = msg.price || "";
          this.detail.payMode = msg.pay_mode || "";
          this.detail.surplus_number = msg.surplus_number || "";
          ////consolelog(res.data.message);
          // this.detail.c2c = res.data.message.c2c;
          // this.detail.account_info = res.data.message.account_info;
          // this.detail.user_info = res.data.message.user_info;
          // this.detail.type = type;
          // if (res.data.message.transaction_user) {
          //   this.detail.transaction_user = res.data.message.transaction_user;
          // }
          //consolelog(this.detail);
          this.detail.type = type;
          this.showDetail = true;
        }
      });
    },
    //添加买入
    bui_in() {
      this.$http({
        url: "/api/c2c/add",
        method: "post",
        data: {
          // price:this.price,
          // number:this.num,
          // name:this.user_name,
          // pay_mode:'微信',
          // content:this.content,
          // token:this.currency_name
          price: this.price,
          number: this.num,
          name: this.user_name,
          pay_mode: this.pay,
          content: this.content,
          token: this.currency_name,
          type: 0
        },
        headers: { Authorization: this.token }
      }).then(res => {
        ////consolelog(res);
        layer.msg(res.data.message);
        this.price = "";
        this.num = "";
        this.user_name = "";

        this.content = "";
        this.listIn = { page: 1, list: [], hasMore: true };
        this.getList(0);
        this.myAdd = { hasMore: true, list: [], page: 1 };
        this.getMy("myAdd");
      });
    },
    //添加卖出
    sell_out() {
      this.$http({
        url: "/api/c2c/add",
        method: "post",
        data: {
          price: this.price01,
          number: this.num01,
          name: this.user_name01,
          pay_mode: this.pay01,
          content: this.content01,
          token: this.currency_name,
          type: 1
        },
        headers: { Authorization: this.token }
      })
        .then(res => {
          ////consolelog(res);
          layer.msg(res.data.message);
          this.price01 = "";
          this.num01 = "";
          this.user_name01 = "";

          this.content01 = "";
          this.listOut = { page: 1, list: [], hasMore: true };
          this.getList(1);
          this.myAdd = { hasMore: true, list: [], page: 1 };
          this.getMy("myAdd");
        })
        .catch(res => {
          layer.msg(res.data.message);
        });
    }
  }
};
</script>

<style lang='scss'>
#c2c-box {
  margin: 10px 0 10px;
  .btn-green {
    background: #25796a;
    color: #fff;
  }
  .buy-sell-box {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    > div {
      position: relative;
      margin: 200px auto;
      width: 300px;
      height: 256px;
      top: 50px;

      padding: 0 30px;

      background: #262a42;
      color: #fff;
      text-align: center;
      border-radius: 2px;
      .title {
        line-height: 50px;
        font-size: 20px;
        color: #6b80ae;
      }
      .close {
        position: absolute;
        top: 0;
        right: 10px;
        font-size: 20px;
        cursor: pointer;
      }
      .total {
        line-height: 35px;
      }
      .inp{
        padding: 6px 0;
        line-height: 35px;
        input {
          line-height: 35px;
          width: 190px;
          padding: 0 10px;
          margin-right: 5px;
        }
      }
      .btn {
        margin: 20px auto 0;
        border-radius: 2px;
        padding: 0 20px;
        line-height: 35px;
        background: #7a98f7;
        cursor: pointer;
      }
    }
  }

  .redColor {
    color: #7a98f7;
  }
  // background: #181b2a;
  color: #c7cce6;
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    color: #333;
    background: rgba(0, 0, 0, 0.7);
    > .m-content {
      border-radius: 4px;
      background: #fff;
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 40px 20px 30px;
      // min-height: 400px;
      max-height: 550px;
      width: 400px;
      > .title {
        position: absolute;
        top: 0;
        left: 0;
        text-align: center;
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        text-align: center;
        font-weight: 600;
        > div:last-child {
          position: absolute;
          top: 0;
          right: 0;
          padding: 0 15px;
          cursor: pointer;
        }
      }
      > div:not(.title) {
        line-height: 32px;
        // border-top: 1px solid #eaecef;
      }
      div {
        span:first-child {
          margin-right: 5px;
          display: inline-block;
          width: 89px;
          color: #7a98f7;
        }
      }
    }
  }
  .more {
    color: #7a98f7;
    text-align: center;
    cursor: pointer;
  }

  font-size: 14px;
  > .c2c-l {
    margin: 0 10px;
    padding: 10px;
    background: #181b2a;
    width: 23%;
    ul {
    }
    li {
      // padding: 0 10px;
      padding: 0 20px;
      justify-content: space-between;
      cursor: pointer;

      line-height: 40px;

      .redColor {
        margin-left: 10px;
      }
      &:hover {
        background: rgb(38, 42, 66);
      }
    }
  }
  > .c2c-r {
    padding: 10px 30px;
    background: #181b2a;

    margin-right: 10px;
    width: 77%;
    > .top {
      // margin: 10px 30px 10px;
      > .top-title {
        font-size: 24px;
        line-height: 2;
        .link-span {
          cursor: pointer;
          &:hover {
            color: #7a98f7;
          }
        }
      }
      .top-price {
        > div {
          margin-right: 20px;
          // line-height: 1.8;
          > span:last-child {
            font-weight: 600;
            font-size: 16px;
          }
        }
      }
      .inp-items {
        > div:first-child {
          margin-right: 30px;
          border-right: 1px dashed #4e5b85;
          padding-right: 30px;
        }
        > .inp-item {
          flex: 1;
          > .inp-title {
            border-bottom: 1px solid #4e5b85;
            font-size: 16px;
            justify-content: space-between;
            line-height: 3;
          }
          > .how {
            line-height: 40px;
            cursor: pointer;
          }
          > .three-inp {
            > .inp-box {
              position: relative;
              height: 42px;
              line-height: 40px;
              padding-left: 112px;
              margin-bottom: 15px;
              > span {
                position: absolute;
                width: 112px;
                // text-align: center;
                top: 0;
                left: 0;
              }
              > div,
              > input {
                color: #c7cce6;
                display: block;
                width: 100%;
                line-height: 40px;
                padding: 0 20px;
                // background: #1e2235;
                border: 1px solid #4e5b85;
                background: none;
              }
              > div {
                color: #7a98f7;
              }
            }
          }
          .pay-opts {
            flex-wrap: wrap;
            > div:nth-child(n + 2) {
              margin-left: 15px;
            }
            > div {
              //   padding-right: 20px;
              line-height: 40px;
              > input {
                vertical-align: middle;
              }
            }
          }
          > .btn-in,
          .btn-out {
            margin-top: 20px;
            line-height: 42px;
            text-align: center;
            cursor: pointer;
            color: #fff;
            background: #4e5b85;
          }
        }
      }
    }
    > .bot {
      color: #6b80ae;
      // margin: 10px 30px;
      // background: #181b2a;
      > .bot-title {
        margin: 30px 0 0;
        // border-bottom: 1px solid #ccc;
        font-size: 16px;
        line-height: 40px;
        justify-content: space-between;
        align-items: center;
        > div:first-child {
          cursor: pointer;
          span {
            font-weight: 600;
            line-height: 40px;
            margin-right: 20px;
          }
          .active {
            color: #7a98f7;
            border: none;
          }
        }
        > .flex {
          height: 17px;
          line-height: 15px;
          cursor: pointer;
          > div {
            margin-right: 10px;
            border: 1px solid #ccc;
            transition: all 0.3s;
            width: 32px;
            border-radius: 7.5px;
            div {
              width: 15px;
              height: 15px;
              border-radius: 50%;
              background: #fff;
            }
          }
          .switch-on {
            padding-left: 0;
            background: #ccc;
          }
          .switch {
            transition: all 0.3s;
            background: #7a98f7;
            padding-left: 15px;
          }
        }
      }
      > .list-title {
        height: 40px;
        //   justify-content: space-between;
        line-height: 40px;
        font-weight: 600;
      }
      .list-title,
      ul li .content {
        width: 100%;
        color: #c7cce6;
        justify-content: space-between;
        // cursor: pointer;
        text-align: center;
        padding: 8px 5px;
        line-height: 24px;
        // border-top: 1px solid #4e5b85;
        &:hover {
          // background: #f8f8f8;
        }
        > div:first-child {
          width: 6%;
          height: 24px;
          text-align: left;
        }
        > div:nth-child(n + 2) {
          width: 12%;
        }
        > div:last-child {
          // min-width: 19%;
          width: 24%;
        }
        > .last {
          text-align: right;
          height: 24px;
          > div,
          > span {
            float: right;
            margin: 0 5px;
          }
          .btn-last {
            padding: 0 10px;
            min-width: 55px;
            max-width: 80px;
            color: #fff;

            //   margin-left: 70px;
            text-align: center !important;
            cursor: pointer;
          }
        }
      }
      ul li .trade-list {
        background: #262a42;
        width: 100%;
        padding: 5px 30px 10px;
        margin: 0 auto;
        p {
          font-weight: 600;
          // font-size: 20px;
          // font-size: 16px;
          line-height: 36px;
          span {
            flex: 1;
            text-align: center;
          }
          span:first-child {
            text-align: left;
          }
          span:last-child {
            text-align: right;
          }
        }
        ul {
          li {
            padding: 12px 0;
            border-bottom: 1px solid #303956;
            > div {
              text-align: center;
              width: 25%;
            }
            > div:first-child {
              text-align: left;
            }
            > div:last-child {
              text-align: right;
              div {
                float: right;
                padding: 0 14px;
                margin: 0 6px;
                line-height: 1.6;
                cursor: pointer;
              }
            }
          }
        }
      }
      .ul-out li .content {
        > div:first-child {
          color: #25796a;
        }

        .btn-last {
          background: #25796a;
        }
      }
      .ul-in li .content {
        > div:first-child {
          color: #7a98f7;
        }

        .btn-last {
          background: #7a98f7;
        }
      }
    }
  }
}

.detailit,
.showtrade {
  // float: right;
  margin-right: 20px;
  padding: 0 10px;
  min-width: 55px;
  max-width: 80px;
  color: #fff;
  text-align: center !important;
  cursor: pointer;
  background: #7a98f7;
}
</style>
