<template>
    <div class="promotion ">
        <div class="sharetitle mt40 bg-part">我的分享方式</div>
        <div class="bg-part topbox mt20 flex tc">
            <div class="fx1">
                <span>专属二维码</span>
                <div class="mt20">
                    <canvas id="canvas"></canvas>
                </div>
            </div>
            <div class="fx2 flex column">
                <span>专属邀请码</span>
                <div class="copycode flex flex1 column  alcenter center">
                    <div class="flex alcenter">
                        <input type="text" v-model="extension_code">
                        <span class="ml10 curPer" id="copycode" @click="copy('#copycode')" >复制邀请码</span>
                    </div>
                    
                </div>
            </div>
            <div class="fx2 flex column">
                <span>专属邀请码</span>
                <div class="copylink flex flex1 column  alcenter center">
                    <div class="flex alcenter">
                        <input type="text" v-model="link_code">
                        <span class="ml20 curPer" id="copylink" @click="copy('#copylink')">复制链接</span>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="bg-part mt20 centerbox tc">
            <p class="ft18 pt20">邀请人数</p>
            <ul class="mauto flex mauto mt40">
                <li>
                    <p>邀请总人数</p>
                    <span>0</span>
                </li>
                <li>
                    <p>一代邀请人数</p>
                    <span>0</span>
                </li>
                <li>
                    <p>二代邀请人数</p>
                    <span>0</span>
                </li>
            </ul>
        </div>
        <div class="bg-part mt20 recodebox">
            <p class="recodetitle">邀请记录</p>
            <div class="flex tc detailtitle ft12">
              <span>被邀人账号</span>
              <span>时间</span>
              <span>状态</span>
            </div>
            <ul class="list">
                <li class="flex tc ft12" v-for="(item,index) in inviteList">
                    <span>{{item.account}}</span>
                    <span>{{item.created_time}}</span>
                    <span>{{item.status}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:'promotion',
    data(){
        return{
            extension_code:'',
            link_code:'',
            inviteList:[
                {account:'15290813776',created_time:'2018-12-19 16:18:03',status:'aa'},
                {account:'15290813776',created_time:'2018-12-19 16:18:03',status:'aa'},
                {account:'15290813776',created_time:'2018-12-19 16:18:03',status:'aa'},
            ]
        }
    },
    methods:{
        createCode() {
            var QRCode = require("qrcode");
            var canvas = document.getElementById("canvas");
            QRCode.toCanvas(canvas,this.link_code, function(error) {
                if (error) console.error(error);
                console.log("success!");
            });
        },
        copy(type) {
            var that = this;
            var clipboard = new Clipboard(type, {
                text: function() {
                    if(type=='#copycode'){
                        return (
                            that.extension_code
                        );
                    }else{
                        return (
                            that.link_code
                        );
                    }
                }
            });
            clipboard.on("success", function(e) {
                that.flags = true;
                layer.msg("复制成功");
            });
            clipboard.on("error", function(e) {
                that.flags = false;
                layer.msg("请重新复制");
            });
        },
    },
    mounted(){
        if(localStorage.getItem('extension_code')){
            this.extension_code=localStorage.getItem('extension_code');
            this.link_code=this.$utils.host +
                        "/dist/#/components/register?extension_code=" +
                        localStorage.getItem('extension_code');
            this.createCode();
        }
        

    }

}
</script>
<style lang="scss" scoped>
.promotion{
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 20px;
    .sharetitle{
        height: 48px;
        line-height: 48px;
        padding-left: 30px;
    }
    .topbox{
        min-height: 300px;
        padding: 40px 0 20px 0;
        .fx1{
            flex: 1;
            #canvas{
                width: 200px;
                height: 200px;
            }
        }
        .fx2{
            flex:2;
            input{background: none;height: 35px;border: 1px solid #435375;color: #fff;padding-left: 10px;}
            .copycode{
                input{width: 165px;}
                span{color: #2b89e1;}
            }
            .copylink{
                input{width: 240px;}
                span{color: #2b89e1;}
            }
        
        }
    }
    .centerbox{
        height:215px;
        ul{
            width: 420px;
            li{
                flex: 1;
                span{display: block; margin-top: 20px}
            }
        }
    }
    .recodebox{
        min-height: 350px;
        .recodetitle{
            height: 40px;
            line-height: 40px;
            padding-left: 30px;
            border-bottom: 1px solid #435375;
            color: #2b89e1;
        }
        .detailtitle{
            padding: 10px 0;
            span{flex:1}
        }
        .list{
            li{
                padding: 5px 0;
                span{flex: 1;}
            }
            
        }
    }
}
</style>


