<template>
    <div class="detail">
        <div class="title fColor1 topshadow">
            <div class="inblock">
                <span>我的交易</span>
            </div>
            <div class="inblock fr">
                <span class="all" @click="all">全部</span>
            </div>
        </div>
        <div class="content">
            <ul class="list-title fColor2 ft12 clear">
                <li class="fl w12">时间</li>
                <li class="fl w12">价格</li>
                <li class="fl w8">交易量</li>
            </ul>
            <div class="containers scroll" v-if="deList.length>0">
                <ul v-for="itm in deList" class="list-item fColor1 ft12">
                    <li class="clear">
                        <span class="fl w12">{{itm.time}}</span>
                        <span class="fl w12">{{itm.price}}</span>
                        <span class="fl w8">{{itm.number}}</span>
                    </li>
                </ul>
            </div>
            <div class="no_data tc" v-if="deList.length<=0">
                <img src="../../assets/images/nodata.png" alt="">
                <p class="fColor2 ft18">暂无数据</p>   
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"detail",
    data (){
        return{
            address:'',
            isChoosed:2,
            new:false,
            wayList:["买入","卖出","全部"],
            deList:[],
            legal_id:'',
            currency_id:''
        }
    },
    created(){
        this.address = localStorage.getItem('address') || '';
        this.legal_id=localStorage.getItem('lever_legal_id');
        this.currency_id=localStorage.getItem('lever_currency_id');
        var that = this;
        that.complete(this.legal_id,this.currency_id);
        eventBus.$on('to_leverExchange',function(data){
            console.log(data)
            if(data){
                that.complete(localStorage.getItem('lever_legal_id'),localStorage.getItem('lever_currency_id'));
            }
        })
    },
    methods:{
        wayChoosed(index){
            this.isChoosed=index;
        },
         //我的交易记录
        complete(legals_id,currencys_id){
            this.$http({
                        url: '/api/'+'lever/deal',
                        method:'post',
                        data:{
                            legal_id:currencys_id,
                            currency_id:legals_id
                        },  
                        headers: {'Authorization':  localStorage.getItem('token')},    
                    }).then(res=>{
                        // console.log(res ,222)
                        // layer.close(i);
                        if(res.data.type == "ok"){
                           this.deList = res.data.message.lever_transaction;
                        //    this.connect();
                        }else{
                            // layer.msg(res.data.message)
                        }
                    }).catch(error=>{
                        // console.log(error)
                    })
        },
        // connect(){
        //     var that = this;
        //      that.$socket.emit("login", localStorage.getItem('user_id'));
        //     that.$socket.on('deal_list',function(msg){
        //         if(msg.type == 'deal_list'){
        //             var complete = JSON.parse(msg.complete);
        //             console.log(complete);
        //             that.deList = complete;
        //         }
        //         console.log(msg);
        //     })
        // },
        all(){
            this.$router.push({name:'allTransaction'})
        }
      },
    mounted(){
        var that = this;
        
        
        // this.currency_id=localStorage.getItem('currency_id');
        //   eventBus.$on('toTrade0', function (data0) {
        //         that.currency_id=data0.currency_id
        //         that.legal_id=data0.legal_id
        //         that.complete(data0.legal_id,data0.currency_id)
        //   });
        //    eventBus.$on('toTrade', function (data0) {
        //         that.currency_id=data0.currency_id
        //         that.legal_id=data0.legal_id
        //         that.complete(data0.legal_id,data0.currency_id)
        //   })
        eventBus.$on('buyTrade', function (data) {
            // that.connect();
        });
       
    }

    
}
</script>
<style scoped>
.red{
    color: #cc4951;
    cursor: pointer;
}
.title{height: 48px;line-height: 46px;padding: 0 40px 0 30px;background-color: #181b2a;}
.tab_title{display: inline-block;line-height: 46px;height: 46px;}
.tab_title span{cursor: pointer;}
.tab_title span:not(:last-child) {margin-right: 40px;}
.content{padding: 0 40px 0 30px;height: 330px;}
.list-title{line-height: 40px; border-bottom: 1px solid #303b4b;height: 40px;}
.list-title li{
    width: 33.3%;
    text-align: center;
}
.no_data{padding: 50px 0;}
.containers{height: 260px;overflow: auto;}
.list-item li{line-height: 45px; display: flex;}
.list-item li span{display: inline-block; float: left; width: 33.3%;text-align: center;}

.list-item li:hover{background-color: #2b3648}
.list-item li span.green{color: #55a067}
.all{
    cursor: pointer;
    color: #7a98f7;
}
</style>


