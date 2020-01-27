<template>
  <div>
    <mu-appbar title="倒放挑战">
      <mu-menu slot="right">
        <mu-button flat>
          <mu-icon value="menu"></mu-icon>
        </mu-button>
        <mu-list slot="content">
          <mu-list-item button  @click="$router.push('/home')">
            <mu-list-item-content>
              <mu-list-item-title>倒放挑战</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>

          <mu-list-item button @click="$router.push('/how')">
            <mu-list-item-content>
              <mu-list-item-title >游戏规则</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item button  @click="$router.push('/about')">
            <mu-list-item-content>
              <mu-list-item-title>关于游戏</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-menu>
    </mu-appbar>
    <mu-container>
      <router-view></router-view>
    </mu-container>
  </div>
</template>
<style lang="stylus" scoped>
.bottom-nav {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 1000;
}
</style>

