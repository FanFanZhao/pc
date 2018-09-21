<template>
    <div class="exchange">
		<div class="title fColor1">交易所</div>
        <div class="content fColor1">
            <div class="new_price">
                <span class="ft14">最新价 {{newData}} JNB/CNY</span>
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
        data (){
            return{
                outlist:[],
                inlist:[],
                newData:0     
            }
        },
        created:function(){
            this.init();
        },
        sockets:{
            connect(){
                // console.log('socket',this.address)
                this.$socket.emit('login',this.address) 
                this.$socket.on('new_msg',msg=>{
                    console.log(msg)   
                })
            },
            new_msg(msg){
                // console.log(msg)
                if(msg.type=='transaction'){
                    console.log(inData)
                    this.newData=msg.content;
                    var inData=JSON.parse(msg.in)
                    var outData=JSON.parse(msg.out)
                    if(inData && inData.legth>0){
                        this.inlist=inData;
                    }
                    if(outData && outData.legth>0){
                        this.outlist=outData;
                    }
                }
            }
        },
        methods:{
            init(){
                var index=layer.load();
                this.address = localStorage.getItem('address') || '';
                var inData=JSON.parse('[{"price":"0.50000","number":"1.00000","account_number":null},{"price":"0.50000","number":"1.00000","account_number":null},{"price":"0.50000","number":"1.00000","account_number":null},{"price":"0.49500","number":"160.00000","account_number":null},{"price":"0.49000","number":"300.00000","account_number":null}]')
                // console.log(inData)
                this.$http({
                    url:'http://jnbadmin.mobile369.com/api/transaction/deal',
                    method:'POST',
                    data:{
                        address: this.address
                    }
                }).then(res=>{
                    layer.close(index)
                    if(res.data.type=='ok'){
                        var message=res.data.message;
                        this.inlist=message.in;
                        this.newData=message.last_price;
                        // console.log(res.data.message)
                        this.outlist=message.out;
                    }else{
                        layer.msg(res.data.message)
                    }
                    
                })
            }
        }
    }
</script>

<style scoped>
.title{height: 48px;line-height: 48px;padding: 0 10px 0 30px;background-color: #181b2a;}
.content{padding: 0 10px;}
.new_price{height: 40px;line-height: 40px;border-bottom: 1px solid #303b4b;padding: 0 0 0 20px;}
.exchange_title{line-height: 25px;position: relative;color: #637085;}
.list-item li{line-height: 25px;overflow: hidden;}
.list-item li span,.exchange_title span{width: 33.3%;display: inline-block;float: left;}
.green{color: #55a067}
.red{color: #cc4951;}
.line{height: 5px; border-bottom: 1px solid #303b4b;}
</style>
