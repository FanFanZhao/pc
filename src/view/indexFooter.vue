<template>
    <footer>
          <div class="content ">
            <div class="flex">
              <div class="left-part flex">
                <!-- <dl>
                  <dt>网站功能</dt>
                  <router-link to="/c2c" tag="dd">c2c交易</router-link>
                  <router-link to="/dealCenter" tag="dd">币币交易</router-link>
                </dl> -->
                <dl>
                  <dt>用户帮助</dt>
                  <router-link to="/components/login" tag="dd">登录</router-link>
                  <router-link to="/components/register" tag="dd">注册</router-link>
                  <router-link to="/forgetPwd" tag="dd">找回密码</router-link>
                </dl>
                <dl>
                  <dt>我们</dt>
                  <router-link :to="{path:'/components/noticeDetail',query:{id:107}}" tag="dd">关于我们</router-link>
                  <router-link :to="{path:'/components/noticeDetail',query:{id:108}}" tag="dd">联系我们</router-link>
                  <router-link :to="{path:'/components/noticeDetail',query:{id:109}}" tag="dd">关于2kex</router-link>
                  <router-link :to="{path:'/components/noticeDetail',query:{id:106}}" tag="dd">关于挖矿</router-link>
                </dl>
                <dl>
                  <dt>条款说明</dt>
                  <router-link :to="{path:'/components/noticeDetail',query:{id:112}}" tag="dd">服务条款</router-link>
                  <router-link :to="{path:'/components/noticeDetail',query:{id:111}}" tag="dd">免责声明</router-link>
                  <router-link :to="{path:'/components/noticeDetail',query:{id:113}}" tag="dd">费率说明</router-link>
                </dl>
                
              </div>
              <div class="right-part">
                <div>
                  <img src="../assets/images/logo.png" alt="">
                </div>
                <p class="flex">
                  <a href="https://twitter.com/2kexofficial">
                    <img src="../assets/images/twiter.png" alt="">
                  </a>
                  <a href="https://www.facebook.com/2kexofficial/">
                    <img src="../assets/images/face.png" alt="" style="width:35px !important;height:35px !important">
                  </a>
                  <a href="https://0.plus/great2kex">
                    <img src="../assets/images/coinicon.png" alt="">
                  </a>
                  <a href="javascript:;">
                    <img src="../assets/images/wechat.png" alt="" @mouseover="showwechat = true" @mouseleave="showwechat = false">
                    <img src="../assets/images/2kwechat.jpg" alt="" class="wechat" v-if="showwechat" style="width:80px;height:80px;display:block">
                  </a>
                </p>
              </div>
            </div>
            <div>
              <img src="../assets/images/foot1.png" alt="">
              <img src="../assets/images/foot2.png" alt="">
              <img src="../assets/images/foot3.png" alt="">
              <img src="../assets/images/foot4.png" alt="">
              <img src="../assets/images/foot5.png" alt="">
              <img src="../assets/images/foot6.png" alt="">
            </div>
            <div class="tc ft12" style="color:#516081">Copyright © 2018 2KEX. All rights reserved</div>
          </div>
        </footer>
</template>
<script>
export default {
  data(){
    return {
      showwechat:false
    }
  }
}
</script>

<style scoped lang='scss'>
footer{
  // background: rgb(20,20,63);
  background: #050d1e;
  padding: 30px 0;
  .content{
    width: 1500px;
    margin: 0 auto;
    justify-content: space-between;
    .left-part{
      flex:4;
      margin-right: 30px;
      padding-right: 30px;
      justify-content: space-between;
      border-right: 1px solid #1a253d;
    }
    .right-part{
      flex:3;
      
      div img{
        width: 100px;
      }
      .flex{
        margin-top: 30px;
        align-items: center;
        a{
          height: 35px;
        }
        img{
          margin-right: 20px;
          width: 30px;
          height: 30px;
        }
      }
    }
    dl{
      
      dt{
        font-size: 14px;
        color: #2b89e1;
        margin-bottom: 20px;
      }
      dd{
        font-size: 12px;
        color: #516081;
        line-height: 24px;
        cursor: pointer;
        &:hover{
          color: #fff;
        }
      }
    }
    >div:nth-child(2){
      border-top: 1px solid #1a253d;
      margin-top: 30px;
      padding: 30px 0;
      text-align: center;
      img{
        width: 128px;
        margin: 0 30px;
      }
    }
  }
}
</style>


