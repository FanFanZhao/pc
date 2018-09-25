<template>
    <div class="">
        <div class="">
            充币
        </div>
        <div class="recharge-wrap ft14 fColor2">
            
        </div>
    </div>
</template>
<script>
import indexHeader from '@/view/indexHeader'
import left from '@/view/left'
import "@/lib/clipboard.min.js"
export default {
    name:'finance',
    data(){
        return{
            addr:'',
            url:''
        }
    },
    components:{
        indexHeader,
        left
    },
    methods:{
        goRecord(){
            this.$router.push({name:'coinRecord'})
        },
        init(){
             var clipboard = new Clipboard('#copy')
            clipboard.on('success', function (e) {
                alert('复制成功')
            });
            clipboard.on('error', function (e) {
                alert('复制失败')
            });
        }
    },
    created(){
        this.address=localStorage.getItem('address') || '';
        console.log(this.address)
        if(this.address){
            this.$http({
                url:this.$utils.laravel_api+'money/rechange?user_id='+this.address,
                type:'GET'
            }).then(res=>{
                console.log(res)
                this.addr=res.data.message.company_eth_address;
                this.url='http://qr.liantu.com/api.php?&w=300&text='+res.data.message.company_eth_address;
                var content = this.addr;
                var clipboard = new Clipboard('#copy')
            }).catch(error=>{
                return error
            })
        }
    },
    mounted(){
        this.init();
    }
};
</script>
<style scoped lang="scss">

</style>


