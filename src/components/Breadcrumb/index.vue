<template>
    <el-breadcrumb separator="/" class="app-breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in levelList"
        :key="item.path"
        :to="{path: item.path}">
        <span v-if="index == levelList.length -1 || item.redirect ==='noRedirect'">{{item.meta.title}}</span>
        <a v-else @click="handleLink(item)">{{item.meta.title}}</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data () {
    return {
      levelList: []
    }
  },
  watch: {
    $route: {
      // immediate: true,
      handler (route) {
        // if (route.path.startsWith('/redirect/')) {
        //   return
        // }
        this.getBreadcrumb()
      }
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    // 获取面包屑
    getBreadcrumb () {
      // $route.matched与给定路由地址匹配的标准化的路由记录数组（记录多级路由的每一级路由并生成数组）
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]
      // 如果不是首页
      if (!this.isDashboard(first)) {
        matched = [{ path: '/index', meta: { title: '首页' } }].concat(matched)
      }
      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    isDashboard (route) {
      // 获取路由的名字
      const name = route && route.name
      // 判断有没有名字，没有就结束
      if (!name) return false
      // 若有名字，去掉空格，看是否等于Index(首页)
      return name.trim() === 'Index'
    },
    handleLink (item) {
      console.log(item)
      const { path, redirect } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  font-size: 14px;
}
</style>
