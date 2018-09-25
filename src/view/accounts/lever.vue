<template>
    <div class="lever">
        <div class="lever-head fColor1">
            <span>净资产折合:</span> 
            <span>0.00000000 BTC</span>
            <span class="ft12 mincny">≈0.00 CNY</span>
            <input type="checkbox" class="ml20">
            <span class="ft14">隐藏小额资产</span>
            <input type="text" class="filter-input ml20">
            <span class="fr baseColor">财务记录</span>
        </div>
        <div class="leverbody contentBK ft12">
            <ul class="titlebox fColor3 clearfix">
                <li class="w11">杠杆账户</li>
                <li class="w16 tr">可用</li>
                <li class="w16 tr">冻结</li>
                <li class="w16 tr">已借</li>
                <li class="w11 tr">风险率</li>
                <li class="w5 tr">爆仓价</li>
                <li class="w25 tr">操作</li>
            </ul>
            <ul class="contentbox fColor1">
                <li class="clearfix flex">
                    <p class="w11 l40">BTC/USDT</p>
                    <p class="w16 tr flex column between">
                        <span>0.00000000 BTC</span>
                        <span>0.00000000 USDT</span>
                    </p>
                    <p class="w16 tr flex column between">
                        <span>0.00000000 BTC</span>
                        <span>0.00000000 USDT</span>
                    </p>
                    <p class="w16 tr flex column between">
                        <span>0.00000000 BTC</span>
                        <span>0.00000000 USDT</span>
                    </p>
                    <p class="w11 tr l40">无风险</p>
                    <p class="w5 tr l40">---</p>
                    <p class="w25 tr baseColor l40 btn">
                        <span>转入</span>
                        <span>转出</span>
                        <span>杠杆</span>
                    </p>
                </li>
                <li class="clearfix flex">
                    <p class="w11 l40">BTC/USDT</p>
                    <p class="w16 tr flex column between">
                        <span>0.00000000 BTC</span>
                        <span>0.00000000 USDT</span>
                    </p>
                    <p class="w16 tr flex column between">
                        <span>0.00000000 BTC</span>
                        <span>0.00000000 USDT</span>
                    </p>
                    <p class="w16 tr flex column between">
                        <span>0.00000000 BTC</span>
                        <span>0.00000000 USDT</span>
                    </p>
                    <p class="w11 tr l40">无风险</p>
                    <p class="w5 tr l40">---</p>
                    <p class="w25 tr baseColor l40 btn">
                        <span>转入</span>
                        <span>转出</span>
                        <span>杠杆</span>
                    </p>
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
    name:'lever',
    data(){
        return{
           
        }
    },
    components:{
        indexHeader,
        left
    },
    methods:{
       
    },
    created(){
        this.address=localStorage.getItem('address') || '';
        console.log(this.address)
        // if(this.address){
        //     this.$http({
        //         url:this.$utils.laravel_api+'money/rechange?user_id='+this.address,
        //         type:'GET'
        //     }).then(res=>{
        //         console.log(res)
        //         this.addr=res.data.message.company_eth_address;
        //         this.url='http://qr.liantu.com/api.php?&w=300&text='+res.data.message.company_eth_address;
        //         var content = this.addr;
        //         var clipboard = new Clipboard('#copy')
        //     }).catch(error=>{
        //         return error
        //     })
        // }
    },
    mounted(){
        // this.init();
    }
};
</script>
<style scoped lang="scss">
.lever{
    .lever-head{
        background-color: #1b1e2e;
        padding: 0 30px;
        height: 48px;
        line-height: 48px;
        font-size: 16px;
        color: #c7cce6;
        .mincny{
            color: #61688a;
        }
        .filter-input{
                display: inline-block;
                width: 125px;
                height: 28px;
                padding: 0 30px 0 10px;
                background: none;
                border-radius: 3px;
                border: 1px solid #4e5b85;
        }
    }
    .leverbody{
        padding: 0 20px;
        .titlebox{
            height: 40px;
            line-height: 40px;
            li{
                float: left;
            }
        }
        .contentbox{
            li{
                height: 60px;
                padding:10px;
                border-bottom: 1px solid #1f2943;
                >p{
                    float: left;
                    height: 40px;
                }
                .l40{
                    line-height: 40px
                }
                .btn{
                    span{
                        margin-left: 20px
                    }
                }
            }
        }
    }
}
</style>


