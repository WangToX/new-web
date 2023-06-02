<!-- 整体布局 -->
<template>
  <div class="app-wrapper" :class="ObjClass">
    <!-- 左侧菜单 -->
    <side-bar class="sidebar-container"></side-bar>
    <div class="main-container">
      <div>
        <!-- 导航栏 -->
        <nav-bar></nav-bar>
        <!-- 标签栏 -->
        <tags-view></tags-view>
      </div>
      <!-- 页面内容 -->
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import SideBar from '@/layout/components/SideBar'
import NavBar from '@/layout/components/NavBar'
import TagsView from '@/layout/components/TagsView'
import AppMain from '@/layout/components/AppMain'
import { mapState } from 'vuex'
export default {
  name: 'layout',
  components: { SideBar, NavBar, TagsView, AppMain },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar
    }),
    // 折叠后侧边栏的样式
    ObjClass () {
      return {
        hideSidebar: !this.sidebar.opened
      }
    }
  },
  mounted () {
    console.log('getToken:', this.$store.state.user.token)
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  width: 100%;
  height: 100%;
}

</style>
