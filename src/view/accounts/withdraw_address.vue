<template>
    <div class="box">
        <indexHeader></indexHeader>
        <div class="account">
            <div class="topcontent ft20 ">
                <span class="white"><span class="baseColor">资产></span> 提币地址管理</span>
            </div>
            <div class="content">
               <div class="con_box">
                  
                   <div class="contentBK fColor1  pdlr20 pdtb20 ft12">
                       <div class="flex alcenter">
                           <span class="w10 mr20">币种</span>
                           <span class="flex1 mr20">提币地址</span>
                           <span class="flex1">备注</span>
                       </div>
                       <div class="mt10">
                            <div class="flex alcenter">
                                <select name="" id="" class="w10 mr20 ">
                                    <option value="1">btc</option>
                                    <option value="1">usdt</option>
                                    <option value="1">eth</option>
                                </select>
                                <input type="text" class="flex1 mr20" placeholder="请输入提币地址">
                                <input type="text" class="flex1 " placeholder="请输入备注">
                            </div>
                            <div class="add">
                                <div class="baseBtn">添加</div>
                            </div> 
                       </div>
                   </div>
               </div>
               <div class="con_box mt15">
                   <div class="account_title ttBk white flex">
                       <div class="ml20">地址列表</div>
                   </div>
                   <div class="contentBK fColor1  pdlr20 pdtb20 ft12">
                       <div class="flex alcenter">
                           <span class="flex1">币种</span>
                           <span class="flex1">提币地址</span>
                           <span class="flex1">备注</span>
                           <span class="flex1">操作</span>
                       </div>
                       <div class="mt10">
                            <div class="flex alcenter">
                                <span class="flex1">
                                    <select name="" id="" class="ft14">
                                        <option value="-1">全部</option>
                                        <option value="1">usdt</option>
                                        <option value="1">eth</option>
                                    </select>
                                </span>
                                <span class="flex1">usdt</span>
                                <span class="flex1">我是备注</span>
                                <span class="flex1">撤销</span>
                            </div>
                            <div class="none color1 tc">
                                暂无记录
                            </div>
                       </div>
                       
                   </div>
               </div>
            </div>
        </div>
    </div>
</template>
<script>
import indexHeader from '@/view/indexHeader'
export default {
    name:'finanrec',
    data(){
        return {
            lang:'',
        }
    },
    components:{
        indexHeader,
    }
}
</script>

<style lang="scss" scoped>
    .box .account{
        width: 1200px;
        margin: 0 auto 82px;
        margin-top: 30px;
    }
    .topcontent{
        padding: 22px 30px;
        margin-bottom: 20px;
        background-color: #1a2330;
        border-radius: 5px;
    }
    .account_title{
        padding: 15px 20px;
    }
    select{
        background-color:transparent;
        padding: 10px;
        color: #c7cce6;
        font-size: 18px;
        border-radius: 3px;
        border:1px solid #4e5b85;
    }
    select.ft14{
        font-size: 14px;
    }
    select>option{
        padding: 10px 0;
        background-color: transparent;
    }
    input{
        padding: 10px;
        border:1px solid #4e5b85;
        font-size: 18px;
        color: #c7cce6;
        border-radius: 3px;
        background-color: transparent;
        outline: none;
    }
  .add{
      text-align: right;
      margin-top: 20px;
  }
  .add .baseBtn{
      width: 200px;
  }
</style>


