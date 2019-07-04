
function FreeSlider(selector, speed) {

  this.oContainer = document.querySelector(selector);
  this.oWrapper = this.oContainer.querySelector('ul');
  this.oSlide = this.oWrapper.querySelectorAll('li');

  this.speed = speed || 100;

  this.containerW = this.oContainer.offsetWidth;
  this.wrapperW = this.oSlide[0].offsetWidth * this.oSlide.length;
  this.x = 0;
  this.timer = null;

  this.init();

}

FreeSlider.prototype = {

  init: function () {
    this.oWrapper.style.width = this.wrapperW * 2 + 'px';
    this.oWrapper.innerHTML += this.oWrapper.innerHTML;

    if (this.wrapperW < this.containerW) {
      this.oContainer.style.width = this.wrapperW + 'px';
    }

    this.slideMove();
  },

  slideMove: function () {
    var that = this;
    this.timer = setInterval(function () {
      that.x++;
      if (that.x > that.wrapperW) {
        that.x = 0;
      }
      that.oWrapper.style.transform = 'translate(' + (-that.x) + 'px)';
    }, this.containerW / this.speed);
  },

  stopSlideMove: function () {
    clearInterval(this.timer);
  }
};

window.onload = function () {

  var oContainer = document.querySelector('.container');

  var mySlider = new FreeSlider('.container');

  oContainer.addEventListener('mouseover', function () {
    mySlider.stopSlideMove();
  });
  oContainer.addEventListener('mouseout', function () {
    mySlider.stopSlideMove();
    mySlider.slideMove();
  });

}
