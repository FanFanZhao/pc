<template>
    <div class="">
        <div class="header fColor1">
            <p class="fl">总资产折合：<span class="asset_num">0.0000000</span><span class="asset_name"> BTC</span><span class="ft12 baseColor"> ≈ <span>0.00</span>CNY</span>
            <label class="min_lab ft14"><input type="checkbox" />隐藏小额资产</label><i></i><label class="inp_lab"><input  type="text"/><i></i></label>
            </p>
            <p class="fr right_text">
                <span class="record" @click="record">财务记录</span>
                <span class="address" @click="withdraw_address">提币地址管理</span>
            </p>
        </div>
        <div class="content fColor1 ft12">
           <div class="content_top flex alcenter fColor2">
               <p class="flex1 tc">币种<i></i></p>
               <p class="flex1 tc">可用</p>
               <p class="flex1 tc">冻结</p>
               <p class="flex1 tc">BTC估值<i></i></p>
               <p class="flex1 tc">锁仓</p>
               <p class="flex1 tc">操作</p>
           </div>
           <ul class="content_ul">
               <li v-for="(item,index) in asset_list" :key="index">
                    <div class="content_li flex alcenter between">
                   <p class="flex1 tc">{{item.name}}</p>
                   <p class="flex1 tc">{{item.available_money}}</p>
                   <p class="flex1 tc">{{item.frozen_money}}</p>
                   <p class="flex1 tc">{{item.valuation}}</p>
                   <p class="flex1 tc">{{item.lock_position}}</p>
                   <p class="flex1 tc operation">
                       <span @click="excharge(index)" >充币</span>
                       <span @click="withdraw(index)">提币</span>
                       <span @click="exchange">兑换</span>
                   </p>
                   </div>
                   <div class="hide_div" v-if="index == active">
                       <p class="fColor2 ft12">充币地址</p>
                       <p class="mt50 mb50"><span class="ft18 fColor1 excharge_address" :class="{'bg':flags}">{{excharge_address}}</span><span id="copy" @click="copy" class="copy ft14">复制</span><span class="ewm_wrap"><span class="ewm ft14" @click="show_ewm">二维码</span><img class="ewm_img" :class="{'hide':isHide}" src="../../assets/images/ewm.jpg" /></span></p>
                       <p class="ft12 fColor2 mb50">查看<span class="excharge_record">充币记录</span>跟踪状态</p>
                       <p class="ft12 fColor2 mb15">温馨提示</p>
                       <ul class="tips_ul ft12 fColor2" style="list-style:disc inside">
                           <li class="tips_li" style="list-style:disc inside" v-for="item in tip_list">{{item}}</li>
                       </ul>
                   </div>
                   <div class="hide_div" v-if="index == active01">
                       <p class="fColor2 ft12 mb15">提币地址</p>
                       <input class="address_inp fColor1 mb30" type="text" />
                       <p class="fColor2 ft12 mb15 flex between alcenter"><span>数量</span><span>可用：<span class="use_num">0.0000</span><span>限额：<span>1500.000000000</span><span class="advance">提升额度</span></span></span></p>
                       <label class="num_lab flex between mb30"><input class="fColor1" type="text" /><span>USDT</span></label>
                       <div class="flex mb50">
                           <div class="left_inp_wrap flex1">
                               <p class="fColor2 ft12 mb15">
                                   <span>手续费</span>
                                   <span>范围：<span>5.0000000</span>-<span>5.0000000</span></span>
                               </p>
                               <label class="range_lab flex alcenter between"><input class="fColor1"  type="text" /><span>USDT</span></label>
                           </div>
                           <div class="right_inp_wrap flex1">
                               <p class=" mb15">
                                   <span class="fColor2 ft12">到账数量</span>
                               </p>
                               <label class="get_lab flex alcenter between"><input class="fColor1" disabled  type="number" /><span>USDT</span></label>
                           </div>
                       </div>
                       <div class="flex">
                        <div class="flex2">
                       <p class="ft12 fColor2 mb15">温馨提示</p>
                       <ul class="tips_ul ft12 fColor2" style="list-style:disc inside">
                           <li class="tips_li" style="list-style:disc inside" v-for="item in tip_list01">{{item}}</li>
                       </ul>
                       </div>
                       <div class="flex1 tc"><button class="withdraw_btn">提币</button></div>
                       
                       </div>
                   </div>
               </li>
           </ul>
        </div>
    </div>
</template>
<script>
import indexHeader from '@/view/indexHeader'
import left from '@/view/left'
import "@/lib/clipboard.min.js"
export default {
    name:'finance',
    data(){
        return{
            flags:false,
            flag:false,
            isHide:true,
            active:'a',
            active01:'a',
            addr:'',
            url:'',
            excharge_address:'44fdgfkdjghfdnvfjdgrgFDGDgfgfgf',
            asset_list:[
                {name:'USDT',available_money:'0.00000000',frozen_money:'0.00000000',valuation:'0.00000000',lock_position:'0.00000000'},
                {name:'USDT',available_money:'0.00000000',frozen_money:'0.00000000',valuation:'0.00000000',lock_position:'0.00000000'},
                {name:'USDT',available_money:'0.00000000',frozen_money:'0.00000000',valuation:'0.00000000',lock_position:'0.00000000'},
            ],
            tip_list:[
                '请勿向上述地址充值任何非USDT资产，否则资产将不可找回。','USDT充币仅支持simple send的方法，使用其他方法（send all）的充币暂时无法上账，请您谅解。','请勿向上述地址充值任何非USDT资产，否则资产将不可找回。','USDT充币仅支持simple send的方法，使用其他方法（send all）的充币暂时无法上账，请您谅解。'
            ],
            tip_list01:[
                '请勿向上述地址充值任何非USDT资产，否则资产将不可找回。','USDT充币仅支持simple send的方法，使用其他方法（send all）的充币暂时无法上账，请您谅解。','请勿向上述地址充值任何非USDT资产，否则资产将不可找回。','USDT充币仅支持simple send的方法，使用其他方法（send all）的充币暂时无法上账，请您谅解。'
            ]
        }
    },
    components:{
        indexHeader,
        left
    },
    methods:{
        goRecord(){
            this.$router.push({name:'coinRecord'})
        },
        init(){
             var clipboard = new Clipboard('.copy')
            clipboard.on('success', function (e) {
               layer.alert('复制成功')
            });
            clipboard.on('error', function (e) {
                alert('复制失败')
            });
        },
        //充币
        excharge(index){
            console.log(index);
            if(this.flag){
                this.flag = false;
                this.active = 'a';
                 this.active01 = 'a';
            }else{
                this.flag = true;
                 this.active = index;
                 this.active01 = 'a';
            }
           
        },
        //提币
        withdraw(index){
            
             if(this.flag){
                this.flag = false;
                this.active = 'a';
                this.active01 = 'a'
            }else{
                this.flag = true;
                 this.active01 = index;
                 this.active = 'a';
            }
        },
        exchange(){

        },
        //复制
        copy(){
            var that=this;
          var clipboard = new Clipboard('.copy',{
                    text:function(){
                        return that.excharge_address
                    }
                });
          clipboard.on("success", function (e) {
                        that.flags = true;
                        layer.msg('复制成功');
                        
                    });
                    clipboard.on("error", function (e) {
                        that.flags = false;
                         layer.msg('请重新复制')
                    });
        },
        record(){
            this.$router.push({ name: 'finanrec' });
        },
        withdraw_address(){
            this.$router.push({ name: 'withdraw_address' });
        },
        show_ewm(){
            if(this.isHide){
                this.isHide = false
            }else{
                this.isHide = true
            }
        }
    },
    created(){
        this.address=localStorage.getItem('address') || '';
        console.log(this.address)
        if(this.address){
            this.$http({
                url:this.$utils.laravel_api+'money/rechange?user_id='+this.address,
                type:'GET'
            }).then(res=>{
                console.log(res)
                this.addr=res.data.message.company_eth_address;
                this.url='http://qr.liantu.com/api.php?&w=300&text='+res.data.message.company_eth_address;
                var content = this.addr;
                // var clipboard = new Clipboard('#copy')
            }).catch(error=>{
                return error
            })
        }
    },
    mounted(){
        this.init();
    }
};
</script>
<style scoped lang="scss"> 
    
    .header{
        padding: 15px 30px;
        overflow: hidden;
    }
    .min_lab{
        margin: 0 10px;
    }
    .min_lab input{
        margin-right: 3px;
    }
    .inp_lab{
        border: 1px solid #6b80ae;
        border-radius: 2px;
        padding: 3px 5px;
    }
    .inp_lab input{
        background: none;
        border: none;
        width: 120px;
        color: #fff;
    }
    .right_text{
        color: #5697f4;
    }
    .right_text span{
        cursor: pointer;
    }
    .record{
        margin-right: 10px;
    }
    .content_ul{
        padding: 0 20px;
    }
    .content_top{
        padding: 10px 20px;
        background: #161617c7;
    }
    .content_li{
        padding: 15px 0;
        border-bottom: 1px solid #1e2c42;
    }
    .operation,.copy,.ewm{
        color: #5697f4;
    }
    .copy{
        margin: 0 30px;
    }
    .copy:hover{
        cursor: pointer;
    }
    .ewm:hover{
        cursor: pointer;
    }
    .operation span{
        cursor: pointer;
    }
    .hide_div{
        border:1px solid #1e2c42;
        padding: 20px;
    }
    .excharge_record{
        color: #5697f4;
    }
    input{
        background: none;
        border: none;
    }
    .address_inp{
        width: 100%;
        border: 1px solid #6b80ae;
        border-radius: 3px;
        padding: 15px 15px;
    }
    .num_lab{
        display: flex;
        width: 100%;
        border: 1px solid #6b80ae;
        border-radius: 3px;
        padding: 15px;
    }
    .num_lab input{
        width: 100%;
    }
    .range_lab,.get_lab{
         border: 1px solid #6b80ae;
        border-radius: 3px;
        padding: 15px;
    }
    .get_lab{
        background: #1e2c42;
    }
    .right_inp_wrap{
        margin-left: 20px;
    }
    .use_num,.advance{
        color: #5697f4;
    }
    .use_num{
        margin-right: 5px;
    }
    .advance{
        margin-left: 5px;
    }
    .withdraw_btn{
        background-color: #7a98f7;
        color: #fff;
        padding: 15px 70px;
        border: none;
        border-radius: 5px;
    }
    .withdraw_btn:hover{
        cursor: pointer;
    }
    .bg{
        background: #2b3c71;
    }
    .ewm_wrap{
        position: relative;
    }
    .ewm_img{
        width: 100px;
        position: absolute;
        top: 25px;
        left: -30px;
    }
    .hide{
        display: none;
    }
</style>


