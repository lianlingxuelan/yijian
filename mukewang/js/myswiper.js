var mySwiper = new Swiper ('.swiper-banner', {
  direction: 'horizontal', // 垂直切换选项
  loop: true, // 循环模式选项
  autoplay: {
    delay: 1500,
  },
  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination',
  },
  
  // 如果需要前进后退按钮
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

}) 
 var swiper = new Swiper('.love-list', {
  slidesPerView: 5,
  spaceBetween: 30,
  pagination: {
  el: '.swiper-pagination',
  clickable: true,
  },
});