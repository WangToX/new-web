<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <router-link v-if="collapse" to="/" class="sidebar-logo-link">
      <img v-if="logo" :src="logo" class="sidebar-logo-img">
      <h1 v-else class="sidebar-logo-title">{{title}}</h1>
    </router-link>
    <router-link v-else to="/" class="sidebar-logo-link">
      <img :src="logo" class="sidebar-logo-img">
      <h1 class="sidebar-logo-title">{{title}}</h1>
    </router-link>
  </div>
</template>

<script>
import logoImg from '@/assets/logo/logo.png'
export default {
  name: 'Logo',
  props: {
    collapse: {
      type: Boolean,
      require: true
    }
  },
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
  line-height: 50px;
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
  &.collapse{
    /* 折叠侧边栏时调整logo的位置 */
    .sidebar-logo-img{
      margin-right: 0;
    }
  }
}
</style>
