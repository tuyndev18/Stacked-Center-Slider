const slider = new CarouselCenter();

slider.setAutoPlay(2000)

document.querySelector("#previousSlide").addEventListener("click", function () {
  slider.previousSlider();
});

document.querySelector("#nextSlide").addEventListener("click", function () {
  slider.nextSlider();
});
