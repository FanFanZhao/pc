<template>
  <div id="index-head" class="flex">
    <div class="header-l flex">
      <div class="logo flex alcenter mr20" @click="$router.push('/')">
        <img src="@/assets/images/logo.png" alt style="width:100px;height:27px">
      </div>
      <router-link to="/" exact>首页</router-link>
      <!-- <router-link to="/wait" >C2C交易</router-link> -->
      <div @click="$router.push('/wait')">C2C交易</div>

      <router-link to="/dealCenter">币币交易</router-link>
      <div v-if="token" class="tc">
        <div class="tt">盈利挖矿</div>
        <router-link to="/mining">挖矿</router-link>
        <router-link to="/team">战队</router-link>
        <router-link to="/createTeam">创建战队</router-link>
        <a href="javascript:;" @click="$router.push({path:'/components/noticeDetail',query:{id:115}})">战队介绍</a>
      </div>
      <div v-else @click="goLogin()">盈利挖矿</div>
      <router-link to="/wait2">游戏</router-link>
      <router-link to="/wait3">合约交易</router-link>
      <div>
        <div class="download">
          <div>app下载</div>
          <img src="../assets/images/2k.png" alt>
        </div>
      </div>
    </div>
    <div class="header-r flex">
      <div v-if="!account_number.length" class="flex">
        <router-link to="/components/login">登录</router-link>
        <router-link to="/components/register">注册</router-link>
      </div>
      <div v-if="account_number.length" class="flex">
        <!-- <div class="assets">
          <div>资产</div>
          <div class="links">
            <router-link to='/finance'>交易</router-link>
           
          </div>
        </div>-->
        <div class="order">
          <span>资产</span>
          <ul class="order_list" style="background:#262a42">
            <li class="now" @click="$router.push('/finance')">交易</li>
          </ul>
        </div>
        <div class="links-box">
          <div class="account_number">{{account_number}} ({{extension_code}})</div>
          <div class="links" style="background:#262a42">
            <router-link to="/accountSet">账户设置</router-link>
            <router-link to="/promotion">我的邀请</router-link>
            <!-- <router-link to="/region">区域代理</router-link> -->
            <router-link to="/transferLog">交易日志</router-link>
            <router-link to="/authentication">身份认证</router-link>
            <div @click="signOut">退出登录</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account_number: "",
      extension_code: "",
      token: "",
      isShow: false,
      noticeList: [],
      showNot: false
    };
  },
  created() {
    this.token = window.localStorage.getItem("token") || "";
    this.account_number = window.localStorage.getItem("accountNum") || "";
    this.extension_code = window.localStorage.getItem("extension_code") || "";
    eventBus.$on("toHeader", msg => {
      if (msg.account) {
        this.account_number = msg.account;
        this.extension_code = msg.extension_code;
      }
    });
    if (this.token) {
      this.init();
    }
  },
  mounted() {
    eventBus.$on("toHeader", msg => {
      console.log(msg);
      if (msg.account) {
        this.extension_code = msg.extension_code;

        this.account_number = msg.account;
      }
    });
  },
  methods: {
    signOut() {
      this.account_number = "";
      localStorage.removeItem("token");
      localStorage.removeItem("accountNum");
      localStorage.clear();

      this.$router.push("/components/login");
    },
    goLogin() {
      this.$router.push("/components/login");
    },
    init() {
      this.$http({
        url: "/api/user/info",
        method: "GET",
        data: {},
        headers: { Authorization: this.token }
      }).then(res => {
        console.log(res);
        if (res.data.type == "ok") {
          window.localStorage.setItem("status", res.data.message.review_status);
          if (res.data.message.is_seller == "1") {
            this.isShow = true;
          }
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.titles {
  cursor: pointer;
  margin-right: 40px;
}
.order {
  margin-right: 15px;
  position: relative;
  cursor: pointer;
  padding-right: 20px;
  background: url("../assets/images/arrow0.png") no-repeat right center;
}
.order_list {
  width: 90px;
  right: 0;
  position: absolute;

  color: #fff;
  text-align: center;
  z-index: 999999;
}
.order_list {
  display: none;
  padding: 0 20px;
  box-shadow: 0 0 2px 4px rgba(0, 0, 0, 0.2);
}
.order:hover ul {
  display: block;
}
.order_list li {
  line-height: 40px;
}
.order_list li:hover {
  color: #2b89e1;
}
#index-head {
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  min-width: 1200px;
  height: 60px;
  line-height: 60px;
  font-size: 14px;
  background: #050d1e;
  color: #ccc;

  a:hover,
  .router-link-active {
    color: #2b89e1;
  }
  .currency-list,
  .lalala {
    display: none;
  }
  > .header-l {
    align-items: center;

    > a,
    > div {
      margin-right: 35px;
      height: 60px;
      cursor: pointer;

      > a {
        display: block;
      }
    }
    > .tc {
      position: relative;
      z-index: 100000;
     .tt{
       width: 88px;
       background: url("../assets/images/arrow0.png") no-repeat right center;
      //  padding: 0 10px;
     }
      &:hover{
        >a{
          display: block;
        }
      }
      > a {
        // padding: 0 10px;
        line-height: 40px;
        background: #050d1e;
        // color: #ccc;
        z-index: 999;
        display: none;
      }
    }
    > .coin-box {
      position: relative;
      a:last-child {
        display: none;
        position: absolute;
        width: 130%;
        text-align: center;
        left: -15%;
      }
      &:hover {
        a:last-child {
          display: block;
          background: #181b2a;
          // text-align: center;
        }
      }
    }
    .download {
      position: relative;
      img {
        position: absolute;
        display: none;
        width: 100px;
        height: 100px;
        z-index: 999;
        left: -20px;
      }
      &:hover {
        img {
          display: block;
        }
      }
    }
  }
  .header-r {
    a {
      margin: 0 20px;
    }
    .assets {
      position: relative;
      margin-right: 25px;
      padding-left: 25px;
      background: url("../assets/images/assets.png") no-repeat left center;
      background-size: 20px 20px;
      cursor: pointer;
      > div:first-child {
        padding-right: 14px;
        background: url("../assets/images/arrow0.png") no-repeat right center;
      }
      > .links {
        position: absolute;
        right: 0;
        width: 80px;
        z-index: 999;
        text-align: center;

        display: none;
        box-shadow: 0 0 2px 4px rgba(0, 0, 0, 0.2);
        a {
          margin: 0;
          display: block;
        }
      }
      &:hover {
        .links {
          display: block;
        }
      }
    }
    .links-box {
      position: relative;
      cursor: pointer;
      padding-right: 20px;
      background: url("../assets/images/arrow0.png") no-repeat right center;

      &:hover {
        .links {
          display: block;
        }
      }
      .account_number {
        padding-left: 20px;
        background: url("../assets/images/icon_mine.png") no-repeat left center;
        background-size: 15px;
      }
      .links {
        position: absolute;
        right: 0;
        z-index: 999;
        display: none;
        box-shadow: 0 0 2px 4px rgba(0, 0, 0, 0.2);

        a,
        div {
          display: block;
          line-height: 40px;
          height: 40px;
          padding: 0 20px;
          margin: 0;
          text-align: center;
        }
      }
    }
    .theme > img {
      cursor: pointer;
      margin-left: 15px;
      margin-top: 12.5px;
      width: 20px;
      height: 20px;
    }
  }
}
</style>
