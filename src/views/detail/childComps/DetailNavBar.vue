<template>
  <div>
    <nav-bar>
      <div slot="left" @click="backClick" class="back">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" 
        class="title-item" 
        :class="{active:index === currentIndex}"
        @click="titleClick(index)">
        {{item}}</div>
      </div>
    </nav-bar>
    
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name:"DetailNavBar",
  data(){
    return{
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  components:{
    NavBar
  },
  methods:{
    backClick(){
      this.$router.back();
    },
    titleClick(index){
      this.currentIndex = index
      this.$emit('titleClick',index)
    }
  }
}
</script>

<style scoped>
.back img{
  margin-top:10px;
}
.title{
  display: flex;
}
.title-item{
  flex:1;
  font-size: 13px;
}
.active{
  color:var(--color-high-text)
}
</style>