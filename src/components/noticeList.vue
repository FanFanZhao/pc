<template>
    <div class="notice">
        <indexHeader></indexHeader>
        <div class="account-wrap">
            <div class="account">
                <div>
                    <div class="back-nav fColor1 ft20"> 网站公告
                        <span class="fr fColor2 curPer" @click="goBefore">&lt;&lt;返回</span>
                    </div>
                    <div class="nav-after"></div>
                </div>
                <div class="account-content">
                    <div class="tc hide" style="padding-top: 150px;">
                        <img src="../assets/images/nodata.png" alt=""> 
                        <p class="fColor2 ft18">暂无数据</p>
                    </div>
                    <div>
                        <ul class="noticeList">
                            <li class="clear curPer" v-for="item in newList">
                                <div class="ml25"  @click="goDetail(item.id)">
                                    <p>{{item.title}}<span class="fr ft14">{{item.update_time}}</span></p>
                                </div>
                            </li>
                        </ul> 
                    </div>
                    <div class="tc" style="padding:15px">
                        <!-- <div class="fColor1 ft14 mt10" @click="getMore">{{more}}</div> -->
                        <!-- <div>
                            <img src="@/assets/images/loading.gif" alt=""  class="lodw20">
                            <p class="ft12 baseColor">加载中...</p>
                        </div> -->
                    </div>
                </div>
             </div>
        </div>
    </div>
</template>
<script>
import indexHeader from '@/view/indexHeader'
export default {
    name:'noticeList',
    components:{indexHeader},
    data (){
        return{
            more:"点击加载更多...",
            newList:[]
        }
    },
    created(){
        this.$http({
            url: this.$utils.laravel_api + 'news/list',
            method:'get',
            data:{}
        }).then(res=>{
            res = res.data;
            if(res.type  === 'ok'){
            // console.log(res.message.list)
            this.newList=res.message.list;
            }else{
                layer.msg(res.message);
            }
        }).catch(error=>{
            console.log(error)
        })
    },
    methods:{
        goBefore(){
            this.$router.back(-1);
        },
        getMore(){
            console.log(123)
        },
        goDetail(id){
            var id= id;
            this.$router.push({
                name: 'noticeDetail',
                query:{id:id}
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.notice{
    .account-wrap{
        background: url(../assets/images/account_center_bg.jpg) no-repeat;
        background-size: cover;
        .account {
            width: 1500px;
            margin: 0 auto;
            padding-top: 30px;
            overflow: hidden;
            min-height: 880px;
            .nav-after{
                display: block;
                height: 10px;
                background-color: #262a42;
            }
            .account-content {
                width: 100%;
                min-height: 750px;
                background-color: #1a2330;
            ul{
                padding: 0 20px;
                font-size: 14px;
                li{
                    border-bottom: 1px dashed #303b4b;
                    height: 70px;
                    line-height: 70px;
                    color: #cdd6e4;
                }
            }
            }

        }
    }
}
</style>

