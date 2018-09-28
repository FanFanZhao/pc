<template>
    <div  class="account-main accountEntrust">
        <div class="title ft16">
            <span class="curPer" :class="{active : isActive==index}" v-for="(tab,index) in tabTitle" @click="changeEntrust(index,tab.url)">{{tab.title}}</span>
        </div>
        <div class="content">
            <div class="container" v-if="isActive==0">
                <ul class="list-title fColor2 ft12 clear">
                    <li class="fl w20">委托时间</li>
                    <li class="fl w12">委托方式</li>
                    <!-- <li class="fl w12">方向</li> -->
                    <li class="fl w12">委托价</li>
                    <li class="fl w14">委托量</li>
                    <li class="fl w20">委托总额</li>
                    <li class="fl w8 tr">操作</li>
                </ul>
                <ul class="list-item fColor1 ft12">
                    <li v-for="item in enList" class="clear">
                        <span class="fl w20">{{item.create_time}}</span>
                        <span class="fl w12">自助委托</span>
                        <!-- <span class="fl w12">买入</span> -->
                        <span class="fl w12">{{item.price}}</span>
                        <span class="fl w14">{{item.number}}</span>
                        <span class="fl w20">{{(item.price * item.number) | numFilter}}</span>
                        <span class="fl w8 tr curPer ceilColor" @click="revoke(item.id)">撤销</span>
                    </li>
                </ul>
                <div class="getmore tc fColor1 ft14 mt10 curPer" @click="getMore" v-if="!loading && enList.length>12">{{more}}</div>
                <div class="tc" v-if="loading">
                    <img src="@/assets/images/loading.gif" alt="" class="lodw20">
                    <p class="ft12 baseColor">加载中...</p>
                </div>
                <div class="no_data tc" v-if="enList.length<=0">
                    <img src="../assets/images/nodata.png" alt="">
                    <p class="fColor2 ft18">暂无数据</p>
                </div>
            </div>
            <div class="container" v-if="isActive==1">
                 <ul class="list-title fColor2 ft12 clear">
                    <li class="fl w15">委托时间</li>
                    <li class="fl w10">委托方式</li>
                    <!-- <li class="fl w10">方向</li> -->
                    <li class="fl w10">委托价</li>
                    <li class="fl w10">委托量</li>
                    <li class="fl w14">委托总额</li>
                    <li class="fl w12">已成交</li>
                    <li class="fl w10">交易所</li>
                    <li class="fl w8 tr">账户</li>
                </ul>
                <ul class="list-item fColor1 ft12">
                    <li v-for="item in hisList" class="clear">
                        <span class="fl w15">{{item.create_time}}</span>
                        <span class="fl w10">自助委托</span>
                        <!-- <span class="fl w10">卖出</span> -->
                        <span class="fl w10">{{item.price}}</span>
                        <span class="fl w10">{{item.number}}</span>
                        <span class="fl w14">{{(item.price * item.number) | numFilter}}</span>
                        <span class="fl w12">是</span>
                        <span class="fl w10">imtoken</span>
                        <span class="fl w8 tr curPer ceilColor">{{item.account_number}}</span>
                    </li>
                </ul>
                <div class="getmore tc fColor1 ft14 mt10 curPer" @click="getMore" v-if="!loading && enList.length>12">{{more}}</div>
                <div class="tc" v-if="loading">
                    <img src="@/assets/images/loading.gif" alt="" class="lodw20">
                    <p class="ft12 baseColor">加载中...</p>
                </div>
                <div class="no_data tc" v-if="hisList.length<=0">
                    <img src="../assets/images/nodata.png" alt="">
                    <p class="fColor2 ft18">暂无数据</p>
                </div>
            </div>
            <div class="container" v-if="isActive==2">
                 <ul class="list-title fColor2 ft12 clear">
                    <li class="fl w14">成交时间</li>
                    <!-- <li class="fl w8">资产代码</li> -->
                    <li class="fl w12">委托方式</li>
                    <!-- <li class="fl w6">方向</li> -->
                    <li class="fl w12">已成交</li>
                    <li class="fl w12">成交价</li>
                    <li class="fl w12">交易所</li>
                    <!-- <li class="fl w12">委托编号</li> -->
                    <li class="fl w12">成交数量</li>
                    <li class="fl w14">成交额</li>
                    <li class="fl w10 tr">手续费</li>
                </ul>
                <ul class="list-item fColor1 ft12">
                    <li v-for="item in deList" class="clear">
                        <span class="fl w14">{{item.create_time}}</span>
                        <!-- <span class="fl w8">12312313</span> -->
                        <span class="fl w12">自助委托</span>
                        <!-- <span class="fl w6" :class="{'green': item.methods == '买入'}">买入</span> -->
                        <span class="fl w12">是</span>
                        <span class="fl w12">{{item.price}}</span>
                        <span class="fl w12">imtoken</span>
                        <!-- <span class="fl w12">20180804</span> -->
                        <span class="fl w12">{{item.number}}</span>
                        <span class="fl w14">{{(item.price * item.number) | numFilter}}</span>
                        <span class="fl w10 tr">0.00</span>
                    </li>
                </ul>
                <div class="getmore tc fColor1 ft14 mt10 curPer" @click="getMore" v-if="!loading && enList.length>12">{{more}}</div>
                <div class="no_data tc" v-if="deList.length<=0">
                    <img src="../assets/images/nodata.png" alt="">
                    <p class="fColor2 ft18">暂无数据</p>
                </div>
                <div class="tc" v-if="loading">
                    <img src="@/assets/images/loading.gif" alt=""  class="lodw20">
                    <p class="ft12 baseColor">加载中...</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "accountEntrust",
  data (){
        return{
        address:'',
        isActive:0,
        url:"entrust",
        page:1,
        more:'加载更多',
        loading:false,
        tabTitle:[{title:"当前委托",url:'entrust'},{title:"历史委托",url:"entrustlog"},{title:"委托明细",url:"deal"}],
        enList:[],
        hisList:[],
        deList:[]
      }
  },
  created(){
      this.address = localStorage.getItem('address') || '';
  },
  methods:{
      changeEntrust(index,url){
        this.isActive=index;
        this.url = url;
        this.page=1;
        this.getData();
      },
      getMore(){
        this.page = ++this.page;
        this.loading=true;
        this.getData();
      },
      revoke(id){
        var id = id;
        this.$http({
            url: this.$utils.laravel_api + 'transaction/revoke',
            method:'post',
            data:{
                address:this.address,
                type:this.type,
                id:id
            }
        }).then(res=>{
            res = res.data;
            if(res.type  === 'ok'){
                layer.msg(res.message)
                this.getdata();
            }else{
                layer.msg(res.message);
            }
        }).catch(error=>{
            console.log(error)
        })
    },
      getData(){
        var that = this;
        var url = this.url;
        var page = this.page;
        this.$http({
            url: this.$utils.laravel_api + 'transaction/' +url,
            method:'post',
            data:{
                address:this.address,
                type:'in',
                page:page
            }
        }).then(res=>{
            res = res.data;
            this.loading=false;
            console.log(url)
            if(res.type  === 'ok'){
                if(url=="entrust"){
                    console.log(res.message.data)
                    if(this.page==1){
                        this.enList=res.message.data;
                    }else{
                        console.log(res.message.data.length)
                       if(res.message.data.length<=0){
                            this.more='没有更多数据了...';
                            return;
                        }else{
                            this.enList=this.enList.concat(res.message.data)
                        }
                    }
                    // console.log(this.enList)
                    this.getOut();
                    console.log(this.enList)
                }
                else if(url=="entrustlog"){
                    if(this.page==1){
                        this.hisList=res.message.data.data;
                    }else{
                       if(res.message.data.data.length<=0){
                            this.more='没有更多数据了...';
                        }else{
                            this.hisList=this.hisList.concat(res.message.data.data)
                        }
                    }
                    console.log(this.hisList)
                }
                else{
                    this.deList=res.message.complete;
                    console.log(this.deList)
                }

            }else{
                layer.msg(res.message);
            }
        }).catch(error=>{
            console.log(error)
        })
      },
    //   getNewData(curList,data){
    //       if(this.page==1){
    //           curList=data;
    //       }
    //       else{
    //           if(data.length<=0){
    //               this.more='没有更多数据了...';
    //           }else{
    //               curList=curList.concat(data)
    //           }
    //       }
    //   },
      getOut(){
          var page = this.page;
        //   console.log(page)
          this.$http({
            url: this.$utils.laravel_api + 'transaction/entrust',
            method:'post',
            data:{
                address:this.address,
                type:'out',
                page:page
            }
        }).then(res=>{
            res = res.data;
            console.log(res.message.data)
            if(res.type  === 'ok'){
                this.enList=this.enList.concat(res.message.data)
            }else{
                layer.msg(res.message);
            }
        }).catch(error=>{
            console.log(error)
        })
      }
  },
  mounted(){
    //   this.getData();
  }
};
</script>
<style lang="scss" scoped>
.accountEntrust{
    .title{
        height: 48px;
        line-height: 48px;
        padding: 0 30px;
        background-color: #181b2a;
        color: #cdd6e4;
        span:not(:first-child) {margin-left: 40px;}
    }
    .content{
        padding: 0 10px;
        .list-title{
           line-height: 40px;
           border-bottom: 1px solid #303b4b;
        }
        .container{
            height: 100%;
            overflow: auto;
            .list-item{
                li{
                    line-height: 30px;
                    span{
                        display: inline-block;
                        float: left;
                    }
                    span:nth-child(3){
                        color:#cc4951;
                    }
                    span.green{
                        color: #55a067;
                    }
                }
                li:hover{
                    background-color: #2b3648
                }

            }
        }
        .no_data{
            padding-top: 150px;
        }
    }

}

</style>





