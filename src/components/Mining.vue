<template>
  <div id="page-mining">
    <ul class="flex bg-part mt30">
      <li class="flex1">
        <div>
          <span class="clr-base">累计挖矿总量</span>
          <span class="clr-light">120000</span>
        </div>
        <div>
          <span class="clr-base">累计挖矿总量</span>
          <span class="clr-light">120000</span>
        </div>
        <div>
          <span class="clr-base">累计挖矿总量</span>
          <span class="clr-light">120000</span>
        </div>
        <div>
          <span class="clr-base">累计挖矿总量</span>
          <span class="clr-light">120000</span>
        </div>
        
      </li>
      <li class="flex1">
        <div>
          <span class="clr-base">今日累计回购基金折合：</span>
        </div>
        <div>
          <span class="clr-base">累计挖矿总量</span>
          <span class="clr-light">120000</span>
        </div>
        <div>
          <span class="clr-base">累计挖矿总量</span>
          <span class="clr-light">120000</span>
        </div>
        <div>
          <span class="clr-base">累计挖矿总量</span>
          <span class="clr-light">120000</span>
        </div>
        
      </li>
      <li class="flex1">
        <div>
          <span class="clr-base">昨日累计回购基金折合：</span>
        </div>
        <div>
          <span class="clr-base">累计挖矿总量</span>
          <span class="clr-light">120000</span>
        </div>
        <div>
          <span class="clr-base">累计挖矿总量</span>
          <span class="clr-light">120000</span>
        </div>
        <div>
          <span class="clr-base">累计挖矿总量</span>
          <span class="clr-light">120000</span>
        </div>
        
      </li>
      
    </ul>
    <div class="md mt30">
      <div class="title flex bg-part" style="padding: 15px 20px">
        <span class="ft16">我的收益</span>
      </div>
      <ul class="flex bg-part">
        <li class="flex1">
          <div>
            <span>昨日挖矿产出</span>
          </div>
          <div>---</div>
        </li>
        <li class="flex1">
          <div>
            <span>昨日挖矿产出</span>
          </div>
          <div>---</div>
        </li>
        <li class="flex1">
          <div>
            <span>昨日挖矿产出</span>
          </div>
          <div>---</div>
        </li>
      </ul>
    </div>
    <div class="tab flex bg-part">
      <span :class="['flex1',{now:show == 'total'}]" @click="show = 'total'">累计挖矿数据</span>
      <span :class="['flex1',{now:show == 'my'}]" @click="show= 'my'">个人挖矿数据</span>
    </div>
    <div class="lists bg-part">
      <div class="title flex ft16">
        <span v-if="show == 'total'">历史交易挖矿</span>
        <span v-if="show== 'my'" :class="{show:show=='my'&&my=='my'}" @click="my='my'">个人收益</span>
        <span v-if="show=='my'" :class="{show:show=='my'&&my=='myhis'}" @click="my='myhis'">历史收益</span>
      </div>
      <div  v-if="show=='total'">
        <div class="list-head flex clr-base">
          <div class="flex1">日期</div>
          <div class="flex1 tc">平台手续费</div>
          <div class="flex1 tr">挖矿产出</div>
        </div>
        <ul class="list">
          <li class="flex clr-light">
            <span class="flex1">啦啦啦</span>
            <span class="flex1 tc">啦啦啦</span>
            <span class="flex1 tr">啦啦啦</span>
            
          </li>
        </ul>
      </div>
      <div  v-if="show=='my'&&my=='my'">
        <div class="list-head flex clr-base">
          <div class="flex1">日期</div>
          <div class="flex1 tc">平台手续费</div>
          <div class="flex1 tr">挖矿产出</div>
        </div>
        <ul class="list">
          <li class="flex clr-light">
            <span class="flex1">啦啦啦</span>
            <span class="flex1 tc">啦啦啦</span>
            <span class="flex1 tr">啦啦啦</span>
            
          </li>
        </ul>
      </div>
      <div  v-if="show=='my'&&my=='myhis'">
        <div class="list-head flex clr-base">
          <div class="flex1">日期</div>
          <div class="flex1 tc">平台手续费</div>
          <div class="flex1 tr">挖矿产出</div>
        </div>
        <ul class="list" >
          <li class="flex clr-light">
            <span class="flex1">啦啦啦</span>
            <span class="flex1 tc">啦啦啦</span>
            <span class="flex1 tr">啦啦啦</span>
            
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      show:'total',
      my:'my',
      histotal:[]
    }
  }
}
</script>

<style lang='scss' scoped>
#page-mining{
  margin: 0 auto;
  width: 1200px;
  font-size: 12px;
  color: #7080a3;
  line-height: 30px;
  .clr-base{
    color: #7080a3;
  }
  .clr-light{
    color: #b7c2ce;
  }
  ul.flex{
    // margin-top: 30px;
    padding: 10px 0 10px ;
    height: 210px;
    line-height: 30px;
    li{
      padding: 0 20px;
      .clr-base{
        margin-right: 5px;
      }
    }
    li:nth-child(n+2){
      border-left:1px solid #25334f;
    }
  }
  .tab{
    margin-top: 30px;
    font-size: 18px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    span{

      background: #101b35;
    }
    .now{
      background: none;
    }
  }
  .lists{
    .title{
      line-height: 45px;
      height: 45px;
      cursor: pointer;
      span{
        margin: 0 20px;
      }
      .show{
        color: #2b89e1;
        border-bottom: 1px solid #2b89e1;
        margin-left: 20px;
      }
    }
    .list-head{
      justify-content: space-between;
      padding: 0 20px;
      cursor: pointer;
    }
    ul.list{
      padding: 5px 20px;
      li{
        justify-content: space-between;
        border-bottom: 1px solid #172d47;
        span:nth-child(2){
          text-align: center;
        }
        span:nth-child(3){
          text-align: right;
        }
      }
    }
    ul.list li{
    }
  }
}
</style>
