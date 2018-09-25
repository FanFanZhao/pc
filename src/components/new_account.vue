<template>
    <div class="box">
        <indexHeader></indexHeader>
        <div class="account">
            <div class="leftcontent">
               <left></left> 
            </div>
            <div class="rightcontent">
               <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
	import indexHeader from '@/view/indexHeader'
	import left from '@/view/accounts/left_account'
    export default {
        name:'account',
        data(){
            return {
                lang:''
            }
        },
        components:{
            indexHeader,
            left,
        },
        // mounted(){
        //     this.bus.$on('nav_name',cur=>{
        //         this.array.findIndex()
        //     })
        // }
    }
</script>
<style scoped >
    .box .account{
        width: 1200px;
        margin: 0 auto 82px;
    }
    .leftcontent{
        width: 220px;
		margin-right: 20px;
		height: 350px;
		border-radius: 3px;
		padding: 4px;
        float: left;
        background-color: #181b2a;
    }
    .rightcontent{
        width: 960px;
        margin-left: 240px;
        background-color: #181b2a;
        min-height: 1000px
    }
</style>


