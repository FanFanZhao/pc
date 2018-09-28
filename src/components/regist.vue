<template>
    <div id="register-box">
        <indexHeader></indexHeader>
        <div class="content">
            <div class="title" v-if="!codeTrue">注册</div>
            <div class="title" v-if="codeTrue">设置密码</div>
            <div class="tab">
                <span :class="{active:isMb}">手机注册</span>
                <span :class="{active:!isMb}">邮箱注册</span>
            </div>
            <div class="div-inp" v-if="!codeTrue">
                <div class="tip" v-if="isMb">请输入手机号</div>
                <div class="tip" v-if="!isMb">请输入邮箱</div>
                <input type="text" v-model="account">
            </div>
            <div class="div-inp" v-if="!codeTrue">
                <div class="tip">请输入验证码</div>
                <div class="code-box">
                    <input type="text" v-model="code" class="code-inp">
                    <button class="sen-btn">验证码</button>
                </div>
            </div>
            <button type='button' class="check-code" v-if="!codeTrue">确认</button>
            <div class="div-inp" v-if="codeTrue">
                <div class="tip">请输入密码</div>
                <input type="password" v-model="password">
            </div>
            <div class="div-inp" v-if="codeTrue">
                <div class="tip">请再次输入密码</div>
                <input type="password" v-model="re_password">
            </div>
            <button type='button'>注册</button>
        </div>
    </div>
</template>

<script>
import indexHeader from "@/view/indexHeader";
export default {
  data() {
    return {
      isMb: true,
      codeTrue: false,
      user_string: "",
      code: "",
      password: "",
      re_password: ""
    };
  }
};
</script>

<style lang='scss'>
#register-box {
  .content {
    padding: 100px;
    .title {
      font-size: 30px;
      color: #c7cce6;
    }
    .tip {
      font-size: 12px;
      color: #61688a;
      margin-bottom: 10px;
    }
    .div-inp {
      margin-top: 10px;
    }
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
    .send-btn{

    }
  }
}
</style>
