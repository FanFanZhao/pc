<template>
    <div id="register-box">
        <indexHeader></indexHeader>
        <div class="reg-content">
            <div class="title">注册</div>
            <div class="tab">
                <span :class='{active:isMb}' @click="setIsMb(true)">手机号注册</span>
                <span :class="{active:!isMb}" @click="setIsMb(false)">邮箱注册</span>
            </div>
            <div class="step-one" v-if="!codeTrue">

                <div class="account-box">
                    <div class="tip" v-if="isMb">请输入手机号</div>
                    <div class="tip" v-if="!isMb">请输入邮箱</div>
                    <input type="text" v-model="account">
                </div>
                    <div class="tip" style="margin-bottom:10px">请输入验证码</div>
                <div class="code-box">
                    <input type="text" v-model="code" class="code">
                    <button type='button' class="code-btn" @click="sendCode">发送验证码</button>
                </div>
                <button class="confirm-btn" @click="checkCode" type="button">确认</button>
            </div>
            <div class="setpass" v-if="codeTrue">
                <div class="title">设置密码</div>
                <div class="pwd-box">
                    <div class="tip">请输入密码</div>
                    <input type="password" v-model="pwd" class="pwd-input">
                </div>
                <div class="repwd-box">
                    <div class="tip">请再次输入密码</div>
                    <input type="password" v-model="repwd" class="repwd-input">
                </div>
                <div class="invite-box">
                    <div class="tip">请输入邀请码</div>
                    <input type="password" v-model="invite" class="invite-input">
                </div>
                <button type="button" @click="register" class="reg-btn confirm-btn">确认</button>
            </div>
            </div>
    </div>
</template>

<script>
import indexHeader from "@/view/indexHeader";
export default {
  components: {
    indexHeader
  },
  data() {
    return {
    codeTrue:false,
      isMb: true,
      account: "",
      pwd: "",
      repwd: "",
      code: "",
      invite: "",
      timer:''
    };
  },
  methods: {
    setIsMb(boo){
        this.account = '';
        this.pwd = '';
        this.repwd = '';
        this.code = '';
        this.invite = '';
        this.isMb = boo;
        this.codeTrue = false;
        clearInterval(this.timer);
        var codeBtn = document.querySelector('.code-btn');
        codeBtn.disabled = false;
        codeBtn.innerHTML = '验证码';
        console.log(codeBtn);
        
    },
    sendCode(e) {
      let isMb = this.isMb;
      let url = "sms_send";
      if (this.account == "") {
        layer.msg("请输入账号");
        return;
      } else if (e.target.disabled) {
        return;
      } else if (isMb) {
        var reg = /^1[345678]\d{9}$/;
        if (!reg.test(this.account)) {
          layer.msg("您输入的手机号不符合规则");
          return;
        }
      } else if (!isMb) {
        var emreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (!emreg.test(this.account)) {
          layer.msg("您输入的邮箱不符合规则");
          return;
        } else {
          url = "sms_mail";
        }
      } else {
      }
      var time = 60;
      
      this.timer = setInterval(function() {
        e.target.innerHTML = time + "秒";
        e.target.disabled = true;
        if (time == 0) {
          clearInterval(this.timer);
          e.target.innerHTML = "验证码";
          e.target.disabled = false;
          return;
        }
        time--;
      }, 1000);
        let data = {user_string:this.account};
        
      this.$http({
        url: '/api/' + url,
        method: "post",
        data: data
      }).then(res => {
        console.log(res);
        layer.msg(res.data.message);
      });
    },
    
    checkCode(){
        let code = this.code;
        if(this.code == ''){
            layer.msg('请输入验证码');return;
        } else {
            let data = {};
            let url = 'user/check_email';
            if(this.isMb){
                data = {"mobile_code":this.code}
                url = 'user/check_mobile'
            } else {
                data = {"email_code":this.code}
            }
            // $.ajax({
            //   url: this.$utils.laravel_api + url,
            //   type:'post',
            //   data:data,
            //   dataType:'json',
            //   success:res => {
            //     console.log(res);
                
            //   }
            // })
            this.$http({
                url: '/api/' + url,
                method:'post',
                data:data
            }).then(res => {
                layer.msg(res.data.message)
                
                if(res.data.type == 'ok'){
                    this.codeTrue = true;
                    
                } else {
                    
                    
                }
                
            })
        }
    },
    register() {
      
      if(this.pwd == ''){
        layer.msg("请输入密码");
        return;
      } else if(this.repwd ==''){
        layer.msg("请再次输入密码");
        return;
      } else if(this.pwd !== this.repwd){
        layer.msg("两次输入的密码不一致");
        return;
      } else {

      }
      var data = {};
      var isMb = this.isMb;
      data.type = isMb ? "mobile" : "email";
      data.user_string = this.account;
      data.code = this.code;
      data.password = this.pwd;
      data.re_password = this.repwd;
      data.extension_code =this.invite;
      this.$http({
        url: '/api/' + "user/register",
        data: data,
        method: "post"
      }).then(res => {
        layer.msg(res.data.message)
        if(res.data.type == 'ok'){

            this.$router.push('/components/login')
        }
      });
    }
  }
};
</script>

<style lang='scss'>
#register-box {
  .tip {
    margin: 10px 0;
    color: #61688a;
    font-size: 12px;
  }
  .reg-content {
    padding: 100px 100px;
    >div> div {
      margin: 10px 0 30px;
    }

    color: #c7cce6;
    input {
      width: 520px;
      min-height: 46px;
      border: 1px solid #4e5b85;
      padding: 0 20px;
      color: #c7cce6;
      font-size: 14px;
      border-radius: 3px;
      background-color: #1e2235;
    }
    > .title {
      font-size: 30px;
    }
    > .tab {
      margin: 10px 0 20px;
      span {
        margin: 0 20px;
      }
    }
    .code-box {
      width: 520px;
      height: 46px;
      background-color: #1e2235;
      border: 1px solid #4e5b85;
      input {
        border: none;
        height: 44px;
        min-height: 44px;
        width: 420px;
      }
      button {
        border: none;
        line-height: 43px;
        width: 93px;
        color: #c7cce6;
        border-left: 1px solid #c7cce6;
        background: #1e2235;
      }
    }
  }
  .reg-btn,.confirm-btn {
    line-height: 46px;
    width: 200px;
    margin: 20px 0 0;
    border: none;
    background: #7a98f7;
    color: #fff;
  }
}
</style>
