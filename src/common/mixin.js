import {POP, NEW, SELL} from "./const";

export const backTopMixin = {
  data: function () {
    return {
      isShowBackTop:false
    }
  },
  methods: {
    backClick: function () {
      this.$refs.scroll.scrollTo(0, 0);
    }
  }
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}
import {debounce} from 'common/utils.js'
export const itemListenerMixin = {
  data(){
    return{
      itemImgListener:null,
      newRefresh:null
    }
  },
  mounted(){
    this.newRefresh = debounce(this.$refs.scroll.refresh)
    this.itemImgListener = ()=>{ this.newRefresh() }
    this.$bus.$on('itemImageLoad',this.itemImgListener)
  }
}