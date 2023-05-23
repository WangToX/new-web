<!-- 菜单项的递归实现 -->
<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowChild(item.children, item)">
      <!-- AppLink组件：点击跳转页面 -->
      <app-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <!-- icon和title -->
          <Item :icon="onlyOneChild.meta.icon" :title="onlyOneChild.meta.title"></Item>
        </el-menu-item>
      </app-link>
    </template>
    <el-submenu :index="basePath" v-else>
      <template slot="title">
        <Item :icon="item.meta.icon" :title="item.meta.title"></Item>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)">
      </sidebar-item>
    </el-submenu>
  </div>
</template>

<script>
import Item from './Item'
import AppLink from './Link'
import path from 'path'
import { isExternal } from '@/utils/validate'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    // 拼接路由路径
    resolvePath (routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      // 调用path库的resolve方法，拼接路径
      return path.resolve(this.basePath, routePath)
    },
    hasOneShowChild (children, parent) {
      if (!children) {
        children = []
      }
      // 过滤子菜单，得到
      const showingChildren = children.filter(item => {
        // 要隐藏的返回false
        if (item.hidden) {
          return false
        } else {
          this.onlyOneChild = item
          // 不需要隐藏的返回true
          return true
        }
      })
      if (showingChildren.length === 1) {
        return true
      }
      if (showingChildren.length === 0) {
        this.onlyOneChild = {
          ...parent,
          path: ''
        }
        return true
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
