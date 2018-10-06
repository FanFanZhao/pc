<template>
    <div class="indexBlackes">
        <indexHeader></indexHeader>
        <router-view></router-view>
        <indexFooter></indexFooter>      
    </div>  
</template>
<script>
import indexHeader from '@/view/indexHeader'
import homeContent from '@/view/homeContent'
import indexFooter from '@/view/indexFooter'
export default {
    name:'home', 
    data(){
       return{
           
       } 
    }, 
    methods:{
       },
    components:{indexHeader,homeContent,indexFooter},
    created(){
        console.log('homeContent');
        console.log(this.$http);
        
        // this.$router.push({name:'homeContent'})
        // this.$http({
        //     method:'get',
        //     url:'https://api.2KEX.pro/market/tickers?AccessKeyId=c96392eb-b7c57373-f646c2ef-25a14&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp='+new Date().toUTCString()
        //     ,headers:{
        //         'Content-Type':'application/x-www-form-urlencoded'
        //     }
        // }).then(res=>{
        //     console.log(res)
        // })
    }
}
</script>




