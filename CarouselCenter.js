class CarouselCenter {
  sliderList = undefined;
  sliderCurrentIndex = 0;
  lengthSlider = undefined;
  sliderContainer = undefined;
  #SLIDE_CLASS = "slider-center__item";
  #ACTIVE_CLASS = "slider-center__item slider--item__active";
  #PREVIOUS_FIRST_CLASS = "slider-center__item slider--item__previous__first";
  #PREVIOUS_SECOND_CLASS = "slider-center__item slider--item__previous__second";
  #NEXT_FIRST_CLASS = "slider-center__item slider--item__next__first";
  #NEXT_SECOND_CLASS = "slider-center__item slider--item__next__second";

  constructor() {
    this.sliderList = document.querySelectorAll(".slider-center__item");
    this.sliderContainer = document.querySelector(".slider-center");
    if (
      this.sliderList &&
      this.sliderContainer &&
      this.sliderList.length >= 5
    ) {
      this.lengthSlider = this.sliderList.length;
      this.setStyleSlider(this.sliderCurrentIndex);
      document.querySelector(".slider-center").style.height =
        this.sliderList[this.sliderCurrentIndex].offsetHeight + "px";
      this.sliderList.forEach((slide, index) => {
        slide.addEventListener("click", () => {
          this.setStyleSlider(index);
          this.setDotActive(index);
        });
      });
      this.createDotsList();
      this.setDotActive(this.sliderCurrentIndex);
    }
  }

  createDotsList() {
    const trackDots = document.createElement("ul");
    trackDots.className = "slider-center__dots";
    this.sliderList.forEach((slide, index) => {
      const dotItem = document.createElement("li");
      dotItem.className = "dot__item";
      dotItem.addEventListener("click", () => {
        this.setStyleSlider(index);
        this.setDotActive(index);
      });
      trackDots.appendChild(dotItem);
    });
    this.sliderContainer.appendChild(trackDots);
  }

  setDotActive(currentIndex) {
    const dotList = document.querySelectorAll(".dot__item");
    dotList.forEach((dot, index) => {
      dot.classList =
        currentIndex === index ? "dot__item dot__item--active" : "dot__item";
    });
  }

  setStyleSlider(activeIndex) {
    const nextFirstIndex = this.getNextSliderIndex(1, activeIndex);
    const nextSecondIndex = this.getNextSliderIndex(2, activeIndex);
    const previousFirstIndex = this.getPreviousSliderIndex(1, activeIndex);
    const previousSecondIndex = this.getPreviousSliderIndex(2, activeIndex);
    this.sliderList.forEach((slide, index) => {
      switch (index) {
        case activeIndex:
          this.sliderList[index].classList = this.#ACTIVE_CLASS;
          break;
        case nextFirstIndex:
          this.sliderList[index].classList = this.#NEXT_FIRST_CLASS;
          break;
        case nextSecondIndex:
          this.sliderList[index].classList = this.#NEXT_SECOND_CLASS;
          break;
        case previousFirstIndex:
          this.sliderList[index].classList = this.#PREVIOUS_FIRST_CLASS;
          break;
        case previousSecondIndex:
          this.sliderList[index].classList = this.#PREVIOUS_SECOND_CLASS;
          break;
        default:
          this.sliderList[index].classList = this.#SLIDE_CLASS;
          break;
      }
    });
  }

  getPreviousSliderIndex(order, activeIndex) {
    return activeIndex - order >= 0
      ? activeIndex - order
      : this.lengthSlider - Math.abs(activeIndex - order);
  }

  getNextSliderIndex(order, activeIndex) {
    return activeIndex + order <= this.lengthSlider - 1
      ? activeIndex + order
      : Math.abs(activeIndex + order) - this.lengthSlider;
  }

  previousSlider() {
    this.sliderCurrentIndex =
      this.sliderCurrentIndex === 0
        ? this.sliderList.length - 1
        : --this.sliderCurrentIndex;
    this.setDotActive(this.sliderCurrentIndex);
    this.setStyleSlider(this.sliderCurrentIndex);
  }

  nextSlider() {
    this.sliderCurrentIndex = ++this.sliderCurrentIndex % this.lengthSlider;
    this.setDotActive(this.sliderCurrentIndex);
    this.setStyleSlider(this.sliderCurrentIndex);
  }

  setAutoPlay() {
    setInterval(() => {
      this.nextSlider();
    }, 1500);
  }
}
