const slider = new CarouselCenter();

document.querySelector("#previousSlide").addEventListener("click", function () {
  slider.previousSlider();
});

document.querySelector("#nextSlide").addEventListener("click", function () {
  slider.nextSlider();
});

slider.setAutoPlay()