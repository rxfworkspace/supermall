<template>
  <div class="profile-list">
    <div class="profile-list-item">
      <span class="profile-list-icon">
        <img src="@/assets/img/profile/message.svg" alt="">
      </span>
      <span>我的消息</span>
    </div>
    <div class="profile-list-item">
      <span class="profile-list-icon">
        <img src="@/assets/img/profile/pointer.svg" alt="">
      </span>
      <span>积分商城</span>
    </div>
    <div class="profile-list-item">
      <span class="profile-list-icon">
        <img src="@/assets/img/profile/vip.svg" alt="">
      </span>
      <span style="border-bottom: 0;">会员卡</span>
    </div>
    <div class="line"></div>
    <div class="profile-list-item">
      <span class="profile-list-icon">
        <img src="@/assets/img/profile/cart.svg" alt="">
      </span>
      <span>我的购物车</span>
    </div>
    <div class="profile-list-item">
      <span class="profile-list-icon">
        <img src="@/assets/img/profile/shopping.svg" alt="">
      </span>
      <span>点赞购物APP</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "profileList"
};
</script>

<style scoped>
.profile-list {
  width: 100%;
}

.profile-list-item {
  line-height: 45px;
  display: flex;
  align-items: center;
  height: 45px;
  padding-left: 20px;
}

.profile-list-item .profile-list-icon {
  font-size: 24px;
  display: inline-block;
  margin-right: 7px;
  width: 25px;
  height:28px;
  border-bottom: 0px solid #dddddd;
  line-height: 45px;
}
.profile-list-icon img{
  display: block;
  width: 100%;
}
.profile-list-item span {
  font-size: 16px;
  display: inline-block;
  width: 100%;
  color: #333333;
  border-bottom: 1px solid #dddddd;
  line-height: 40px;
}

.line {
  width: 100%;
  height: 10px;
  background-color: #eeeeee;
}
</style>
