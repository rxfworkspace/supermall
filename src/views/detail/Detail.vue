<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <detail-recommend-info :recommen-list="recommends"></detail-recommend-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailRecommendInfo from './childComps/DetailRecommendInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import {BACKTOP_DISTANCE} from 'common/const'
import {itemListenerMixin,backTopMixin} from 'common/mixin'
import {debounce} from 'common/utils.js'
import Scroll from 'components/common/scroll/Scroll'

import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail.js'

import { mapActions } from 'vuex'
export default {
  name:"Detail",
  mixins:[itemListenerMixin,backTopMixin],
  data(){
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      getThemeTopY:null,
      currentIndex:0
    }
  },
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    GoodsList,
    DetailBottomBar,
    Scroll,
    BackTop
  },
  created(){
    //1、保存传入的iid
    this.iid = this.$route.params.iid;

    //2、根据iid请求详情数据
    getDetail(this.iid).then(res=>{
      //1、获取顶部的图片轮播数据
      const data = res.result
      this.topImages = data.itemInfo.topImages

      //2、获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      //3、获取店铺信息
      this.shop = new Shop(data.shopInfo)

      //4、获取商品详情
      this.detailInfo = data.detailInfo

      //5、获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

      //6、获取评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }

      // this.$nextTick(()=>{ 
        //值不对的原因img没有加载完
        //   this.themeTopYs = []
        //   this.themeTopYs.push(0);
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // })
      
    })

    getRecommend().then(res=>{
      this.recommends = res.data.list
    })

    //给getThemeTopY赋值 防抖
    this.getThemeTopY = debounce(()=>{
      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
    },100)
  },
  mounted(){
  },
  destroyed(){
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  },
  methods:{
    ...mapActions(['addCart']),
    imageLoad(){
      this.newRefresh()

      this.getThemeTopY()
    },
    titleClick(index){
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
    contentScroll(position){
      const positionY = -position.y
      let length = this.themeTopYs.length
      for(let i = 0; i < length -1 ; i++){
      //   if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]){
      //   }
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) ){
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      this.isShowBackTop = -position.y > BACKTOP_DISTANCE
      
    },
    addToCart(){
      //1、获取购物车需要展示的信息
      const product = {}
      product.imgURL = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.newPrice = this.goods.nowPrice
      product.iid = this.iid
      // product.count = 0
      //2、将商品添加到购物车里
      this.addCart(product).then(res => {
        this.$toast.show(res,1500)
      })
      // this.$store.dispatch('addCart',product).then(res => {
      //   console.log(res);
      // })

    }
  }
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 20;
  background-color: #fff;
  height:100vh;
}
.detail-nav{
  position: relative;
  background:#fff;
  z-index: 10;
}
.content{
  height:calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>