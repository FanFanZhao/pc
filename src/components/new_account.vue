<template>
    <div class="box">
        <indexHeader></indexHeader>
        <div class="account">
            <left v-bind:lang="lang" :current="0"></left>
            <router-view></router-view>
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
                lang:'',
                currentIndex:0,
            }
        },
        components:{
            indexHeader,
            left,
        },
        mounted(){
            // this.bus.$on('nav_name',cur=>{
            //     console.log(this.array.findIndex())
            //     this.currentIndex= this.array.findIndex();
            // })
        }
    }
</script>
<style scoped >
    .box{
        background-color: #273041;
    }
    .box .account{
        width: 1500px;
        padding-top: 30px;
        min-height: 880px;
        margin: 0px auto;
        overflow: hidden;
    }
   
</style>


