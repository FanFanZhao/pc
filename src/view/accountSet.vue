<template>
    <div  class="account-main">
        <div  class="clear mb50">
            <div  class="fl">
                <img  src="@/assets/images/account_security.png"/>
                </div>
            <div  class="fl ml30">
                <p  class="ft16 fColor1">您的账号安全等级 :
                    <span  class="ml10">低</span>
                </p>
                <div  class="bar-bottom">
                    <div  class="bar-top" style="width: 25%;"></div>
                </div>
                <p  class="fColor2 ft14">
                    您的账号安全等级 低，强烈建议开启更多身份验证</p>
                <p  class="fColor2 ft14" style="display: none;">
                    您的账号安全等级 低，恭喜您!</p>
            </div>
        </div>
        <ul >
            <li ><img  src="@/assets/images/success.png" >
                <span  class="ml20">绑定手机</span>
                <p  class="fl">已绑定
                    <span class="fColor1">187****8439</span>
                </p>
                <span  class="fr base ml25 mouseDefault"></span>
                <span  class="fr base mouseDefault"></span>
            </li>
            <li >
                <img  src="@/assets/images/icon_error.png">
                <span  class="ml20">绑定邮箱</span>
                <p  class="fl">未绑定 </p>
                <span  class="fr base ml25 mouseDefault"></span>
                <span  class="fr base mouseDefault" @click="goNone()">绑定</span>
            </li>
            <li ><img  src="@/assets/images/success.png">
                <span  class="ml20">登录密码</span>
                <p  class="fl">互联网账号存在被盗风险，建议您定期更改密码以保护账户安全。</p>
                <span  class="fr base ml25 mouseDefault"></span>
                <span  class="fr base mouseDefault"  @click="goNone()">修改</span>
            </li>
            <li ><img  src="@/assets/images/icon_error.png">
                <span  class="ml20">提币密码</span>
                <p  class="fl">请设置提币专用密码，建议提现密码区别于登录密码。</p>
                <span  class="fr base ml25 mouseDefault"></span>
                <span  class="fr base mouseDefault"  @click="goTo(2)">设置</span>
            </li>
            <li ><img  src="@/assets/images/icon_error.png">
                <span  class="ml20">谷歌验证器</span>
                <p  class="fl">用于登录、提币、找回密码、修改安全设置时进行安全验证。</p>
                <span  class="fr base ml25 mouseDefault"></span>
                <span  class="fr base mouseDefault"  @click="goNone()">绑定</span>
            </li>
            <li ><img  src="@/assets/images/icon_error.png">
                <span  class="ml20">实名认证</span>
                <p  class="fl">请先进行实名认证。</p>
                <span  class="fr base ml25 mouseDefault"></span>
                <span  class="fr base mouseDefault"  @click="goNone()">认证</span>
            </li>
            <li ><img  src="@/assets/images/icon_error.png">
                <span  class="ml20">我的地址</span>
                <p  class="fl"></p>
                <span  class="fr base ml25 mouseDefault"></span>
                <span  class="fr base mouseDefault"  @click="goNone()">添加</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name:'accountSet',
    data(){
        return {
            routerList:["setCash","setCash","setCash","setCash","setCash","setCash"]
        }
    },
    methods:{
        goTo(index){
            // this.$router.push({name: this.routerList[index]})
            layer.msg("暂未开放...")
        },
        goNone(){
            layer.msg("暂未开放...")
        }
    }
}
</script>
<style lang="scss" scoped>
$navBack:#181b2a;	
$base:#5697f4;
$line:#303b4b;
$fColor2:#637085;
.account-main {
    padding-left: 34px;
    padding-right: 34px;
    padding-top: 34px;
    .bar-bottom {
      width: 320px;
      height: 8px;
      border-radius: 4px;
      background-color: $navBack;
      margin: 22px 0 12px 0;
      overflow: hidden;
      .bar-top {
        background-color: $base;
        height: 100%;
      }
    }
    ul {
      border-top: 1px solid $line;
      color: $fColor2;
      font-size: 14px;
      img {
        width: 16px;
        vertical-align: middle;
      }
      li {
        border-bottom: 1px solid $line;
        line-height: 72px;
        position: relative;
        p {
          position: absolute;
          left: 300px;
          top: 0;
        }
      }
    }
  }
</style>


