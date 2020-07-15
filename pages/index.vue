<template>
  <div class="container">
    <!-- storeからトップ画面に表示するウィジェット名を受け取り描画 -->
    <div v-for="(widget, index) in $store.state.widgetList" :key="index" class="widget">
        <compnent :is=widget>
        </compnent>
    </div>
    <div class="widget"></div>
    <div class="widget"></div>
    <div class="widget"></div>
    <div class="widget"></div>
  </div>
</template>

<script>
import TrainInfo from '~/components/widgets/trainInfo.vue'
import LunchLibrary from '~/components/widgets/lunchLibrary.vue'
import CafeList from '~/components/widgets/cafeList.vue'


export default {
  components: {
    TrainInfo,
    LunchLibrary,
    CafeList
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/style/app.scss";

.container {
  clear: both;
  min-height: 100vh;
  width: 100%;
  display: flex;
  /* justify-content: space-between; */
	align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-around;
  margin: 0 auto;

  .widget {
    width: 600px;
    height: 280px;
    margin-bottom: 30px;
    box-shadow: 0 0 5px #D2D2D2;
    @include mobile {
      width: 100%;
    }
  }
}


</style>
