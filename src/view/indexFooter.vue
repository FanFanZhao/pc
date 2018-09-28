<template>
    <div class="footer_wrap">
        <div class="left fl">
            <h1 class="mb15 logo">2KEX Global</h1>
            <p class="mb15">全球领先的数字资产交易平台</p>
            <div class="icon_img">
                <i class="iconfont icon-weibo"></i>
                <i class="iconfont icon-weibo"></i>
                <i class="iconfont icon-weibo"></i>
                <i class="iconfont icon-weibo"></i>
            </div>
            <p class="mt50">© 2013-2018 2KEX Global</p>
        </div>
        <div class="fr">
            <ul>
                <li class="pb50">
                    <p class="fl tl foot_title ft12" v-for="item in titleList">{{item}}</p>
                </li>
                <li v-for="item in conList"><a class="con_a mb15 ft16" v-for="itm in item.list" v-bind:href="itm.src">{{itm.text}}</a></li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      titleList: ["服务", "工具", "关于", "条款说明"],
      conList: [
        {
          list: [{ text: "2KEX咨询", src: "" },{ text: "客户端下载", src: "" },{ text: "2KEX集团", src: "" },{ text: "用户协议", src: "" }]
        },
        {
          list: [{ text: "2KEX矿池", src: "" },{ text: "帮助中心", src: "" },{ text: "联系我们", src: "" },{ text: "隐私条款", src: "" }]
        },
        {
          list: [{ text: "2KEX生态", src: "" },{ text: "API文档", src: "" },{ text: "加入我们", src: "" },{ text: "法律声明", src: "" }]
        },
        {
          list: [{ text: "2KEX资本", src: "" },{ text: "数字资产介绍", src: "" },{ text: "上币申请", src: "" },{ text: "费率", src: "" }]
        },
        {
          list: [{ text: "机构账户", src: "" },{ text: "新手指导", src: "" },{ text: "公告", src: "" }]
        }
      ]
    };
  }
};
</script>
<style scoped>
.footer_wrap {
  background: #060e20;
  color: #6b80ae;
  overflow: hidden;
  padding: 50px 80px;
}
.foot_title,.con_a{
  display: inline-block;
  width: 180px;
  text-align: left;
}
.con_a{
    color: #c7cce6;
}
.con_a:hover{
    color: #6b80ae;
}
.logo{
    color: #6b80ae;
}
</style>


