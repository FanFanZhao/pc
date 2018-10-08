<template>
	<div class="nav_bar">
		<div class="content clear" style="height:60px">
			<div class="fl"><img src="@/assets/images/logo.png" class="navbar-logo" style="width:100px;"></div>
			<ul  class="navbar-item fl mouseDefault ml20">
				<li  class="base" :class="{active:index==current}"  v-for="(tabs,index) in tabList"  @click="goto(index,tabs.page)">{{tabs.title}}</li>
        <li class="base downapp" @click="showapp">APP下载
          <div class="appcode tc" v-show="appshow">
            <span></span>
            <p><img src="@/assets/images/code.jpg" alt=""></p>
          </div>
        </li>
			</ul>
			<div class="fr">
				<div class="account-box fl positionR curPer flex">
					<div class="msg_wrap">
					<div class="assets_item fColor1 fl" @mouseover="assets_over" @mouseout="assets_out" v-if="address.length>0">
						<img class="assets_icon_img" src="@/assets/images/assets.png" alt="">
						<span class="sp">{{assets}}</span>
						<img src="@/assets/images/arrow0.png" alt="">
					</div>
					<!-- <div class="order_item fColor1 fl" @mouseover="order_over" @mouseout="order_out" v-if="address.length>0">
						<img class="order_icon_img" src="@/assets/images/order.png" alt="">
						<span class="sp">{{orders}}</span>
						<img src="@/assets/images/arrow0.png" alt="
					</div> -->
					<div class="account_login fColor1 fl" @mouseover="mine_over" @mouseout="mine_out"  v-if="address.length>0">
						<img class="icon_img" src="@/assets/images/account.png" alt="">
						<span>{{account_number}}</span>
						<img src="@/assets/images/arrow0.png" alt="">
					</div>
					</div>
					<div class="asset-choose ft14 fColor1" v-if="show1" @mouseover="assets_over" @mouseout="assets_out">
						<p class="curPer" v-for="(item,index) in assetstList" @click="gotoAccount(index,item.page)">
							<img :src="item.src1" alt="">
							<img :src="item.src2" alt="">
							<span>{{item.title}}</span>
						</p>
						
					</div>
					<div class=" order-choose ft14 fColor1" v-if="show2" @mouseover="order_over" @mouseout="order_out" >
						<p class="curPer" v-for="(item,index) in orderList" @click="goto(null,item.page)">
							<img :src="item.src1" alt="">
							<img :src="item.src2" alt="">
							<span>{{item.title}}</span>
						</p>
						
					</div>
					<div class="account-choose mine ft14 fColor1" v-show="show3" @mouseover="mine_over" @mouseout="mine_out"  >
						<p class="curPer" v-for="(item,index) in accountList" @click="goto(null,item.page)">
							<img :src="item.src1" alt="">
							<img :src="item.src2" alt="">
							<span>{{item.title}}</span>
						</p>
						<p class="curPer" @click="loginOut">
							<img src="@/assets/images/t0.png" alt="">
							<img src="@/assets/images/t1.png" alt="">
							<span>退出登录</span>
						</p>
					</div>
				</div>
				<div  class="fl login mr50" v-if="address.length<=0">
					<router-link :to="{ name: 'login'}">
						<span>登录</span>
					</router-link>
					<router-link :to="{ name: 'register'}">
						<span  class="ml20">注册</span>
					</router-link>
				</div>
			</div>
		</div>
	</div>

</template>
<script>
export default {
  name: "indexHeader",
  data() {
    return {
      appshow:false,
      address: "",
      account_number: "",
      assets: "资产",
      orders: "订单",
      show1: false,
      show2: false,
      show3: false,
      current: 0,
      tabList: [
        { title: "首页", page: "homeContent" },
        { title: "币币交易", page: "dealCenter" },
        // { title: "我的资产", page: "homeContent" },
      ],
      accountList: [
        // {
        //   src1: require("@/assets/images/m0.png"),
        //   src2: require("@/assets/images/m1.png"),
        //   title: "我的资产",
        //   page: "accountCenter"
        // },
        // {
        //   src1: require("@/assets/images/e0.png"),
        //   src2: require("@/assets/images/e1.png"),
        //   title: "我的交易",
        //   page: "accountEntrust"
        // },
        // {
        //   src1: require("@/assets/images/c0.png"),
        //   src2: require("@/assets/images/c1.png"),
        //   title: "充值",
        //   page: "recharge"
        // },
        {
          src1: require("@/assets/images/z0.png"),
          src2: require("@/assets/images/z1.png"),
          title: "账户设置",
          page: "accountSet"
        },
        // {
        //   src1: require("@/assets/images/s0.png"),
        //   src2: require("@/assets/images/s1.png"),
        //   title: "承兑商",
        //   page: "aceite"
        // },
        {
          src1: require("@/assets/images/s0.png"),
          src2: require("@/assets/images/s1.png"),
          title: "区域代理",
          page: "region"
        }
      ],
      assetstList: [
        // {
        //   src1: require("@/assets/images/s0.png"),
        //   src2: require("@/assets/images/s1.png"),
        //   title: "充币&提币",
        //   page:'finance'
		    // },
	    	{
          src1: require("@/assets/images/s0.png"),
          src2: require("@/assets/images/s1.png"),
          title: "交易",
           page:'finance'
        }
      ],
      orderList: [
		  {
          title: "当前委托"
		},
		{
          title: "委托历史"
        },
		{
          title: "成交明细"
        }
	  ]
    };
  },
  created() {

    
    
    this.address = localStorage.getItem("token") || "";
    this.account_number = localStorage.getItem('accountNum') || '';
    // var address = this.address;
    // if (address != "") {
    //   this.$http({
    //     url: this.$utils.laravel_api + "user/getuserbyaddress",
    //     method: "post",
    //     data: {
    //       address: address
    //     }
    //   })
    //     .then(res => {
    //       res = res.data;
    //       if (res.type === "ok") {
    //         // console.log(res.message)
    //         this.account_number = res.message.account_number;
    //       } else {
    //         layer.msg(res.message);
    //       }
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // }

  },
  mounted() {
    this.bus.$on("nav_name", name => {
      console.log(name);
      this.current = this.tabList.findIndex(
        val =>
          val.page === name || (val.children && val.children.includes(name))
      );
      // console.log(this.current);
    });
  },
  methods: {
    showapp(){
      this.appshow=!this.appshow
    },
    goto(index, name) {
      this.current = index;
      // console.log(index, name);
      this.bus.$emit('nav_name',name);
      this.$router.push({ name: name });
    },
    gotoAccount(index,name){
      // this.current = index;
      // console.log(index, name);
      this.bus.$emit('nav_name',name);
      this.$router.push({ name: name });
    },
    loginOut() {
      // console.log("out");
      localStorage.removeItem("token");
      localStorage.removeItem("accountNum");
      this.$router.push({ name: "login" });
    },
    assets_over() {
      this.show1 = true;
    },
    assets_out() {
      this.show1 = false;
    },
    order_over() {
      this.show2 = true;
    },
    order_out() {
      this.show2 = false;
    },
    mine_over() {
      this.show3 = true;
    },
    mine_out() {
      this.show3 = false;
    }
  }
};
</script>

<style scoped lang='scss'>
.nav_bar {
  @include line-height(60px);
  width: 100%;
  min-width: 1200px;
  padding: 0 30px;
  background: #181b2a;
  .content {
    // width: 1200px;
    margin: 0 auto;
  }
  .msg_wrap {
    display: flex;
    align-items: center;
    >div{
      margin: 0 10px;
    }
  }
  .icon_img {
    width: 15px;
  }
  .assets_icon_img,
  .order_icon_img {
    width: 20px;
    height: 20px;
  }
  .sp {
    line-height: normal;
    margin: 0 4px;
  }

  .navbar-logo {
    vertical-align: middle;
  }
  .account_login:hover .mine {
    // display: block;
  }
  .account_login,
  .assets_item,
  .order_item {
    // width: 100px;
    font-size: 14px;
  }
  .assets_item,
  .order_item {
    height: 60px;
    display: flex;
    align-items: center;
  }
  .account-choose {
    // display: none;
    cursor: default;
    position: absolute;
    top: 60px;
    right: -44px;
    z-index: 999;
    width: 188px;
    line-height: 40px;
    background-color: #262a42;
    z-index: 5000;
    border-radius: 3px;
    box-shadow: 0 0 2px 4px rgba(0, 0, 0, 0.2);
    p {
      padding-left: 20px;
      img {
        width: 14px;
        vertical-align: middle;
        margin-right: 8px;
        display: inline-block;
      }
      img:nth-child(2) {
        display: none;
      }
    }
    p:hover {
      color: #5697f4;
      background-color: #181b2a;
    }
    p:hover img:nth-child(2) {
      display: inline-block;
    }
    p:hover img:nth-child(1) {
      display: none;
    }
  }
  .asset-choose {
    // display: none;
    cursor: default;
    position: absolute;
    top: 60px;
    right: 156px;
    width: 188px;
    line-height: 40px;
    background-color: #262a42;
    z-index: 5000;
    border-radius: 3px;
    box-shadow: 0 0 2px 4px rgba(0, 0, 0, 0.2);
    p {
      padding-left: 20px;
      img {
        width: 14px;
        vertical-align: middle;
        margin-right: 8px;
        display: inline-block;
      }
      img:nth-child(2) {
        display: none;
      }
    }
    p:hover {
      color: #5697f4;
      background-color: #181b2a;
    }
    p:hover img:nth-child(2) {
      display: inline-block;
    }
    p:hover img:nth-child(1) {
      display: none;
    }
  }
  .order-choose {
    // display: none;
    cursor: default;
    position: absolute;
    top: 60px;
    right: 56px;
    width: 188px;
    line-height: 40px;
    background-color: #262a42;
    z-index: 5000;
    border-radius: 3px;
    box-shadow: 0 0 2px 4px rgba(0, 0, 0, 0.2);
    p {
      padding-left: 20px;
      img {
        width: 14px;
        vertical-align: middle;
        margin-right: 8px;
        display: inline-block;
      }
      img:nth-child(2) {
        display: none;
      }
    }
    p:hover {
      color: #5697f4;
      background-color: #181b2a;
    }
    p:hover img:nth-child(2) {
      display: inline-block;
    }
    p:hover img:nth-child(1) {
      display: none;
    }
  }
  .navbar-item {
    color: #cdd6e4;
    li {
      float: left;
      height: 60px;
      line-height: 60px;
      padding: 0 30px;
      display: inline-block;
      text-align: center;
      vertical-align: middle;
      font-size: 14px;
      cursor: pointer;
      color:#c7cce6;
      &.active {
        color:#7a98f7;
        border:none;
      }
    }
  }
  .login {
    color: #cdd6e4;
    margin-right: 50px;
    span {
      cursor: pointer;
    }
    .ml20 {
      margin-left: 20px;
    }
  }
}
.downapp{
  position: relative;
  div{
    position: absolute;
    top: 15px;
    z-index: 10;
    left: 0;
    span{
      display: inline-block;
      width: 0;
      height: 0;
      border-width: 10px;
      border-style: solid;
      border-color:  transparent transparent #fff  transparent ;
    }
    p{
      position: relative;
      top: -25px;
      img{
        width: 100px;
        height: 100px;
      }
    }
    
  }
}

</style>
