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
        this.$http({
					url: this.$utils.laravel_api + 'currency/quotation',
					method:'get',
					data:{}
				}).then(res=>{
                    // console.log(res);
                    if(res.data.type == 'ok'){
                      this.tabList = res.data.message;
                      var msg = res.data.message;
                      var arr_quota = [];
                      for(var i=0;i<msg.length;i++){
                          arr_quota[i] = msg[i].quotation
                      };
                    //    this.currency_name = msg[0].name;
                    //    this.currency_id = msg[0].id;
                    //    var id = arr_quota[0][0].id;
                    //    var legal_name = arr_quota[0][0].name;
                    if(!localStorage.getItem('legal_id')&&!localStorage.getItem('currency_id')&&!localStorage.getItem('legal_name')&&!localStorage.getItem('currency_name')){
                        window.localStorage.setItem('legal_id',arr_quota[0][0].id);
                        window.localStorage.setItem('currency_id',msg[0].id);
                        window.localStorage.setItem('legal_name',arr_quota[0][0].name);
                        window.localStorage.setItem('currency_name',msg[0].name);
                    }
                
                
					
                }
                }).catch(error=>{
					console.log(error)
                })

    }
}
</script>




