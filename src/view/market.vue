<template>
    <div class="market">
		<div class="m_title mt20 clear fColor1">
            <span class="fff fl">市场</span>
            <div class="m_search fr">
               <input type="text" class="fColor1">
               <img src="../assets/images/search.png" alt="">
            </div>
        </div>
        <div class="m_filter mt20">
            <div class="tabtitle fColor1 ft14 curPer">
                <!-- <span class="active">JNB</span> -->

                <!-- <span class="active">USDT</span>
                <span>JNB</span>
                <span>JNB</span> -->
                <span v-for="(tab,index) in tabList " :class="{'active': index == isShow}" @click="changeType(index)">{{tab}}</span>
            </div>
        </div>
        <div class="coin-title clear">
            <div>
                <span>币种</span>
                <img src="../assets/images/select0.png" alt="">
            </div>
            <div>
                <span>最新价</span>
                <img src="../assets/images/select0.png" alt="">
            </div>
            <div>
                 <span>涨幅</span>
                <img src="../assets/images/select0.png" alt="">
            </div>
        </div>
        <div class="line"></div>
        <ul class="coin-wrap scroll">
            <li>
                <span v-for="item in newData">{{item}}</span>
            </li>
            <li v-for="(market,index) in marketList " v-if="market.type==1">
                <span>{{market.symbol}}</span>
                <span>${{market.quotes.USD.price}}</span>
                <span :class="{'green': market.quotes.USD.percent_change_24h>=0}">{{market.quotes.USD.percent_change_24h}}%</span>
            </li>
            
        </ul>
	</div>
</template>

<script>
    export default {
        name: "market",
        data (){
            return{
                isShow:0,
                tabList:["CNY","BTC","ETH"],
                marketList:[],
                newData:['JNB', "$0.076128",'-1.11%']
            }
        },
        created:function(){
            this.init()
        },
        methods:{
            changeType(index){
               this.isShow=index;
            },
            getSymbols(callback){
                if(this.address.length<=0){
                    return false;
                }
                this.$http({
                    url:this.$utils.laravel_api+'wallet/list?user_id='+this.address||'',
                    type:'GET'
                }).then(res=>{
                    // console.log(res)
                    if(res.data.type=='ok'){
                        this.accountInfo=res.data.message;
                        this.dataList=res.data.message.list;
                        // console.log(this.dataList)
                        callback && callback();
                    }else{
                        // console.log(123)
                        alert(res.message)
                    }  
                }).catch(error=>{
                    return error
                })
            },
            init(){
                var index=layer.load();
                this.address = localStorage.getItem('address') || '';
                this.$http({
                    url: this.$utils.laravel_api+'quotation',
                    method:'post',
                    data:{
                        address:this.address
                    }
                }).then(res=>{
                    layer.close(index);
                    // console.log(res)
                     if(res.data.type=="ok"){
                         this.getSymbols(()=>{
                            this.marketList=res.data.message.coin_list;
                            // console.log(res.data.message.coin_list)
                            for(var i in this.dataList){
                                for(var j in this.marketList){
                                    // console.log(this.dataList[i].name,this.marketList[j].symbol,this.dataList[i].name==this.marketList[j].symbol)

                                    if(this.dataList[i].name == this.marketList[j].symbol){
                                        // console.log(1)
                                        this.marketList[j].type=this.marketList[j].type||1
                                    }else{
                                        this.marketList[j].type=this.marketList[j].type||0
                                    }
                                }
                            }
                            // console.log(this.marketList)

                         })
                         
                    }else{
                        layer.msg(res.data.message)
                    }
                    
                }).catch(error=>{
                    console.log(error)
                })
                
            },

        },
        
    }
</script>

<style scoped>
.m_title{position: relative;}
.m_title span{margin-left: 30px;font-weight: 700;}
.m_search{position: absolute;width: 146px;right: 20px;top: -4px;height: 26px;border-radius: 3px;padding: 4px 8px 4px 0;}
.m_search input{position: absolute;left: 0;top: 0;z-index: 2;width: 100%;padding: 5px 40px 5px 8px;height: 26px;border-radius: 3px;background: transparent;border: 1px solid #52688c;}
.m_search img{width: 16px;height: 15px;position: absolute;right: 5px;top: 7px;z-index: 123;}
.m_filter{padding: 0 30px;}
.tabtitle span:not(:last-child) {margin-right: 40px;}
.coin-title div{width: 33.3%;height: 36px;line-height: 36px;background-color: #1a2330;text-align: center;float: left;color: #637085;font-size:12px;}
.coin-title img{vertical-align: middle;margin-top: -3px;}
.line{width: 90%;margin: 0px auto;border-bottom: 1px solid rgb(48, 59, 75);}
.coin-wrap{height: 395px;overflow: auto;background-color: #1a2330;}
.coin-wrap li{height: 30px;line-height: 30px;cursor: pointer;font-size: 12px;color: #cdd6e4;}
.coin-wrap li span{display: inline-block;width: 33%;float: left;text-align: center;}
.coin-wrap li span:last-child{color: #cc4951;}
.coin-wrap li:nth-child(odd){background-color: #1f2938;}
.coin-wrap li span.green{color: #55a067;}
.coin-wrap li:hover{background-color: #2b3648}
</style>
