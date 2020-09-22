<template>
  <div class="profile">
    <nav-bar class="nav-bar">
      <div slot="center">我的档案</div>
    </nav-bar>
    <scroll class="scroll-height">
      <login v-dir1/>
      <money />
      <div class="line"></div>
      <profile-list />
    </scroll>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import Login from "./children/Login";
import Money from "./children/Money";
import ProfileList from "./children/profileList"; 
import Scroll from "@/components/common/scroll/Scroll";

export default {
  name: "Profile",
  directives: {
        // 指令名称
        dir1: {
            inserted(el) {
                // 指令中第一个参数是当前使用指令的DOM
                console.log(el);
                console.log(arguments);
                // 对DOM进行操作
                el.style.width = '200px';
                el.style.height = '200px';
                el.style.background = '#000';
            }
        }
    },
  components: { Scroll, ProfileList, Money, Login, NavBar }
};
</script>

<style scoped>
.profile {
  width: 100%;
  height: 100%;
}

.nav-bar {
  font-weight: 600;
  color: white;
  background-color: #ff8198;
}

.line {
  width: 100%;
  height: 10px;
  background-color: #eeeeee;
}

.scroll-height {
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 50px;
  left: 0;
  overflow: hidden;
}
</style>
