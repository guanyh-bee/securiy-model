<template>

  <el-carousel :interval="5000" arrow="always" :height="height">
    <el-carousel-item >
    <img src="../assets/img/ali4.jpg"/>
    </el-carousel-item>

    <el-carousel-item >

      <img class="my-img" src="../assets/img/kate.jpg"/></el-carousel-item>

    <el-carousel-item >

      <img class="my-img" src="../assets/img/kateln.jpg"/></el-carousel-item>

    <el-carousel-item >

      <img class="my-img" src="../assets/img/kda5.jpg"/></el-carousel-item>
  </el-carousel>


</template>

<script>
export default {
  name: "Main",
  data(){
    return{
      height:''

    }
  },
  methods:{

  },
  mounted() {
    this.height =  window.innerHeight*0.9+'px'
    window.onresize = () =>{
      // this.height =  window.innerHeight;
      this.height =  window.innerHeight*0.9+'px'
    };


  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;

  margin: 0;
}
.my-img{
  width: 100%;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
