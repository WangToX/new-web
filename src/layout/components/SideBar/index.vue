<!--侧边菜单-->
<template>
  <div>
    <!-- logo -->
    <logo></logo>
    <!-- el-scrollbar包裹滚动区域 -->
    <el-scrollbar>
      <!-- element-Ui组件NavMenu导航菜单 -->
      <!-- default-active：当前激活菜单的index；unique-opened：是否只保持一个子菜单的展开；active-text-color：当前激活菜单的文字颜色 -->
      <el-menu
        default-active='2'
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
    ...mapGetters(['sidebarRouters']),
    variables () {
      return variables
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
