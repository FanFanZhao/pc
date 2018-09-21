<template>
    <div class="indexBlackes">
        <indexHeader></indexHeader>
        <router-view></router-view>      
    </div>  
</template>
<script>
import indexHeader from '@/view/indexHeader'
import homeContent from '@/view/homeContent'
export default {
    name:'home',
    components:{indexHeader,homeContent},
    created(){
        console.log('homeContent')
        // this.$router.push({name:'homeContent'})
        // this.$http({
        //     method:'get',
        //     url:'https://api.huobi.pro/market/tickers?AccessKeyId=c96392eb-b7c57373-f646c2ef-25a14&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp='+new Date().toUTCString()
        //     ,headers:{
        //         'Content-Type':'application/x-www-form-urlencoded'
        //     }
        // }).then(res=>{
        //     console.log(res)
        // })
    }
}
</script>




