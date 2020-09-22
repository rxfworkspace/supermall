<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control 
    class="tab-control" 
    :titles="['流行','新款','精选']" 
    @tabClick="tabClick" 
    ref="tabControl1"
    v-show="isTabFaxied"/>

    <scroll class="content" 
    ref="scroll" 
    :probe-type="3" 
    @scroll="contentScroll" 
    :pull-up-load="true"
    @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"/>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import {getHomeMultidata,getHomeGoods} from 'network/home.js'
import {debounce} from 'common/utils.js'
import {itemListenerMixin,backTopMixin} from 'common/mixin'

import {BACKTOP_DISTANCE} from 'common/const'

import Scroll from 'components/common/scroll/Scroll'

export default {
  name:'Home',
  mixins:[itemListenerMixin,backTopMixin],
  components:{
    NavBar,
    TabControl,
    GoodsList,
    BackTop,
    HomeSwiper,
    RecommendView,
    FeatureView,
    Scroll
  },
  data(){
    return{
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      tabOffsetTop:0,
      isTabFaxied:false,
      saveY:0
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  activated(){
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0,this.saveY,0)
  },
  deactivated(){
    //保存y值
    this.saveY = this.$refs.scroll.getScrollY()
    //
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  },
  created(){
    //请求多个数据
    this.getHomeMultidata()
    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted(){
    //图片加载完成的事件监听
    
  },
  methods:{
    /**
     * 事件监听相关
     */
    
    tabClick(index){
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    contentScroll(position){
      //判断backTop是否显示
      this.isShowBackTop = -position.y > BACKTOP_DISTANCE
      this.isTabFaxied = (-position.y) > this.tabOffsetTop
      //决定tabControl是否吸顶(position:fixed)

    },
    loadMore(){
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.finishPullUp()
    },
    //获取tabControl的offsetTop
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    /**
     * 网络请求相关
     */
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res=>{
        // console.log(res);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
      })
    }
  }
}
</script>

<style scoped>
#home{
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  top:0;
  left:0;
  right:0;
  z-index: 9; */
}
.content{
  position: absolute;
  top:44px;
  bottom:49px;
  overflow: hidden;
}
.tab-control{
  position: relative;
  z-index: 10;
}
/* .content{
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>