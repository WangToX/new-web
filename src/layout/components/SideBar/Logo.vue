<template>
  <div class="sidebar-logo-container">
    <router-link to="/" class="sidebar-logo-link">
      <img :src="logo" class="sidebar-logo-img">
      <h1 class="sidebar-logo-title">{{title}}</h1>
    </router-link>
  </div>
</template>

<script>
import logoImg from '@/assets/logo/logo.png'
export default {
  name: 'Logo',
  data () {
    return {
      logo: logoImg,
      title: '后台管理系统'
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-logo-container {
  width: 100%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  & .sidebar-logo-link{
    width: 100%;
    height: 100%;
    display: inline-block;
    & .sidebar-logo-img{
      width: 32px;
      height: 32px;
      margin-right: 12px;
      vertical-align: middle;
    }
    & .sidebar-logo-title{
      line-height: 50px;
      margin: 0;
      display: inline-block;
      color: #fff;
      font-size: 14px;
      font-weight: 600;
      vertical-align: middle;
    }
  }
}
</style>
