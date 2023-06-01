<template>
  <div>
    <div class="navbar">
      <hamburger class="hamburger-container" @toggleClick="toggleSideBar"></hamburger>
      <breadcrumb class="breadcrumb-container"></breadcrumb>
      <div class="right-menu">right</div>
    </div>
    <top-nav class="tags-view-container"></top-nav>
  </div>
</template>

<script>
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import TopNav from '@/components/TopNav'
export default {
  name: 'NavBar',
  components: {
    Hamburger,
    Breadcrumb,
    TopNav
  },
  methods: {
    toggleSideBar () {
      console.log('1')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar{
  height: 50px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container{
    line-height: 46px;
    height: 100%;
    float: left;
    padding: 0px 15px;
    cursor: pointer;
  }
  .breadcrumb-container{
    line-height: 46px;
    height: 100%;
    float: left;
    margin-left: 8px;
  }
  .right-menu{
    line-height: 46px;
    height: 100%;
    float: right;
  }
}
.tags-view-container{
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  -webkit-box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
}

</style>
