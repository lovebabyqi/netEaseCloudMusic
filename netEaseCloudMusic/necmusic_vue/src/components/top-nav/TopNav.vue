<template>
    <div class='top-nav'>
        <button @click='goBack' class='btn go-back'></button>
        <button @click='backTop' class='btn back-top' v-show='showTop'></button>
    </div>
</template>

<script>

export default {
    name:'TopNav',
    props:{
        showBack:{
            type:Boolean,
            default:true
        },
        showTop:{
            type:Boolean,
            default:true
        }
    },
    data(){
        return {
            
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        },
        backTop(){
            this.$nextTick(()=>{
                window.scrollTo(0,0)
            })
        }
    },
}

</script>

<style scoped lang='less'>
    .top-nav{
        position:fixed;
        top:0;
        background-color: #fff;
        width: 100vw;
        height:40px;
        z-index:100;
        overflow: hidden;
        border-bottom:1px solid #eee;
        .btn{
            padding:10px 10px;
            width: 40px;
            height: 40px;
            border:none;
        }
        .btn:focus{
            outline: none;
        }
        .go-back{
            width: 40px;
            height: 40px;
            background: url('../../assets/images/goBack.png');
            background-size: 25px 25px;
            background-repeat: no-repeat;
            background-position: 2px 7px;
        }
        .back-top{
            float:right;
            background: url('../../assets/images/back-top.png');
            background-size: 25px 25px;
            background-repeat: no-repeat;
            background-position: 2px 7px;
        }
    }
</style>