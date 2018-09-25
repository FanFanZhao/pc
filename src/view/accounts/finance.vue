<template>
    <div class="">
        <div class="header fColor1">
            <p class="fl">总资产折合：<span class="asset_num">0.0000000</span><span class="asset_name"> BTC</span><span class="ft12 baseColor"> ≈ <span>0.00</span>CNY</span>
            <label class="min_lab"><input type="checkbox" />隐藏小额资产</label><i></i><label class="inp_lab"><input  type="text"/><i></i></label>
            </p>
            <p class="fr right_text">
                <span class="record">财务记录</span>
                <span class="address">提币地址管理</span>
            </p>
        </div>
        <div class="content fColor1 ft12">
           <div class="content_top flex alcenter">
               <p class="flex1 tc">币种<i></i></p>
               <p class="flex1 tc">可用</p>
               <p class="flex1 tc">冻结</p>
               <p class="flex1 tc">BTC估值<i></i></p>
               <p class="flex1 tc">锁仓</p>
               <p class="flex1 tc">操作</p>
           </div>
           <ul class="content_ul">
               <li v-for="item in asset_list">
                    <div class="content_li flex alcenter between">
                   <p class="flex1 tc">{{item.name}}</p>
                   <p class="flex1 tc">{{item.available_money}}</p>
                   <p class="flex1 tc">{{item.frozen_money}}</p>
                   <p class="flex1 tc">{{item.valuation}}</p>
                   <p class="flex1 tc">{{item.lock_position}}</p>
                   <p class="flex1 tc operation">
                       <span>充币</span>
                       <span>提币</span>
                       <span>兑换</span>
                   </p>
                   </div>
                   <div class="hide_div">
                       <p class="fColor2 ft12">充币地址</p>
                       <p class="mt50 mb50"><span class="ft18 fColor1">44fdgfkdjghfdnvfjdgrgFDGDgfgfgf</span><span class="copy ft14">复制</span><span class="ewm ft14">二维码</span></p>
                       <p class="ft12 fColor2 mb50">查看<span class="excharge_record">充币记录</span>跟踪状态</p>
                       <p class="ft12 fColor2 mb15">温馨提示</p>
                       <ul class="tips_ul ft12 fColor2" style="list-style:disc inside">
                           <li class="tips_li" style="list-style:disc inside" v-for="item in tip_list">{{item}}</li>
                       </ul>
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
            addr:'',
            url:'',
            asset_list:[
                {name:'USDT',available_money:'0.00000000',frozen_money:'0.00000000',valuation:'0.00000000',lock_position:'0.00000000'},
                {name:'USDT',available_money:'0.00000000',frozen_money:'0.00000000',valuation:'0.00000000',lock_position:'0.00000000'},
                {name:'USDT',available_money:'0.00000000',frozen_money:'0.00000000',valuation:'0.00000000',lock_position:'0.00000000'},
            ],
            tip_list:[
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
             var clipboard = new Clipboard('#copy')
            clipboard.on('success', function (e) {
                alert('复制成功')
            });
            clipboard.on('error', function (e) {
                alert('复制失败')
            });
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
                var clipboard = new Clipboard('#copy')
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
</style>


