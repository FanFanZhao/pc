<template>
    <div class="currency">
        <div class="title fColor1">币种资料</div>
        <div class="content f14 fColor1">
            <p class="ft24">BTC</p>
            <p class="fColor2 abstract ft14">简介</p>
            <p class="mt15 ft14">
                比特币（Bitcoin，简称JNB）是目前使用最为广泛的一种数字货币，它诞生于2009年1月3日，是一种点对点（P2P）传输的数字加密货币，总量2100万枚。比特币网络每10分钟释放出一定数量币，预计在2140年达到极限。比特币被投资者称为“数字黄金”。比特币依据特定算法，通过大量的计算产生，不依靠特定货币机构发行，其使用整个P2P网络中众多节点构成的分布式数据库来确认并记录所有的交易行为，并使用密码学设计确保货币流通各个环节安全性，可确保无法通过大量制造比特币来人为操控币值。基于密码学的设计可以使比特币只能被真实拥有者转移、支付及兑现。同样确保了货币所有权与流通交易的匿名性。
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name:"currency"
}
</script>
<style scoped>
.currency{background-color: #181b2a;}
.title{height: 48px;line-height: 46px;padding: 0 40px 0 30px;background-color: #181b2a;}
.content{padding: 15px 30px 60px;}
.ft24{font-size: 24px}
.abstract{padding:15px 0;border-bottom: 1px solid rgb(48, 59, 75);}
</style>

