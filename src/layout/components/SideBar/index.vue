<!--侧边菜单-->
<template>
  <div>
    <!-- logo -->
    <logo :collapse="isCollapse"></logo>
    <!-- el-scrollbar包裹滚动区域 -->
    <el-scrollbar>
      <!-- element-Ui组件NavMenu导航菜单 -->
      <!-- default-active：当前激活菜单的index；unique-opened：是否只保持一个子菜单的展开；active-text-color：当前激活菜单的文字颜色 -->
      <!-- collapse：是否水平折叠收起菜单（仅在 mode 为 vertical 时可用，即菜单为垂直模式） -->
      <el-menu
        :collapse="isCollapse"
        :default-active='activeMenu'
        class='el-menu-vertical-demo'
        :background-color='variables.menuBackground'
        text-color='#fff'
        :unique-opened='false'
        active-text-color='#ffd04b'>
        <!-- 菜单项 -->
        <sidebar-item
          v-for="(route, index) in sidebarRouters"
          :item="route"
          :key="route.path + index"
          :base-path="route.path">
        </sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import Logo from './Logo.vue'
import variables from '@/assets/styles/variables.module.scss'
import SidebarItem from '@/layout/components/SideBar/SidebarItem'
import { mapGetters } from 'vuex'
export default {
  name: 'SideBar',
  components: { Logo, SidebarItem },
  computed: {
    ...mapGetters(['sidebarRouters', 'sidebar']),
    variables () {
      return variables
    },
    // 是否折叠侧边菜单栏
    isCollapse () {
      return !this.sidebar.opened
    },
    // 默认菜单高亮显示
    activeMenu () {
      return this.$route.path
    }
  },
  methods: {
    // handleOpen (key, keyPath) {
    //   console.log(key, keyPath)
    // },
    // handleClose (key, keyPath) {
    //   console.log(key, keyPath)
    // }
  }
}
</script>

<style lang='scss' scoped>
.el-scrollbar {
  height: calc(100% - 50px);
}
</style>
