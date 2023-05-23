<template>
  <!-- 通过type决定component是什么类型的标签 -->
  <!-- v-bind绑定属性，返回来的对象会绑定到标签上 -->
  <component :is="type" v-bind="LinkProps(to)">
    <slot/>
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'
export default {
  name: 'AppLink',
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    isExternal () {
      // 校验路径的格式
      return isExternal(this.to)
    },
    type () {
      // 符合http一类的网址返回<a></a>标签
      if (this.isExternal) {
        return 'a'
      }
      // 其他的返回<router-link></router-link>标签
      return 'router-link'
    }
  },
  methods: {
    // 返回标签的属性
    LinkProps (to) {
      if (this.isExternal) {
        // 如果是http一类的网址返回a标签的属性
        return {
          href: to,
          target: '_blank'
        }
      }
      return {
        to: to
      }
    }
  }
}
</script>

<style>

</style>
