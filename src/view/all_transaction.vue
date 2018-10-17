<template>
    <div class="wrap">
        <ul>
            <li></li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){

    },
    created(){
        this.$http({
                        url: '/api/'+'lever/dealall',
                        method:'post',
                        data:{
                            legal_id:currencys_id,
                            currency_id:legals_id
                        },  
                        headers: {'Authorization':  localStorage.getItem('token')},    
                    }).then(res=>{
                        // console.log(res ,222)
                        // layer.close(i);
                        if(res.data.type == "ok"){
                           this.deList = res.data.message.lever_transaction;
                           this.connect();
                        }else{
                            // layer.msg(res.data.message)
                        }
                    }).catch(error=>{
                        // console.log(error)
                    })
    }
}
</script>
<style scoped>
    .wrap{
        background: #181b2a;
        width: 80%;
        margin: 30px auto;
        padding: 30px;
    }
</style>
