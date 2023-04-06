// 这里是对banner区域和floor区域 的轮播图经行封装
<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in floor" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import swiper from "swiper";
export default {
  name: "Carousel",
  props:['floor'],
  watch: {
    floor: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          var mySwiper = new swiper(this.$refs.cur, {
            // 自动切换
            autoplay: true,
            loop: true,
            // 分页器
            pagination: {
              el: ".swiper-pagination",
              // 点击小球球实现图片的切换
              clickable: true
            },
            // 前进和后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            }
          });
        });
      }
    }
  }
};
</script>

<style>
</style>