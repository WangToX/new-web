<template>
  <!-- aria-hidden="true" 朗读时跳过此部分 -->
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName">
    </use>
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    className: {
      type: String,
      default: ''
    },
    iconClass: {
      type: String,
      required: true
    }
  },
  computed: {
    // iconName图标名：将'#icon-'与从Item传过来的iconClass(={icon})进行拼接
    iconName () {
      return `#icon-${this.iconClass}`
    },
    // svg标签的class名
    svgClass () {
      if (this.className) {
        return 'svg-icon' + this.iconClass
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style>
.svg-icon {
  width: 1em;
  height: 1em;
  /* fill 是SVG元素的一种属性;对于形状元素和文本，它定义了绘制元素的颜色。对于动画，它定义了动画的最终状态。在这里它定义了图标的颜色 */
  /* currentColor是一个变量，这个变量的值是当前元素的color值；如果当前元素没有在CSS里显示地指定一个color值，那它的颜色值就遵从CSS规则，从父元素继承而来。 */
  fill: currentColor;
}
</style>
