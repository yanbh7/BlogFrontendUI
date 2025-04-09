class AutoSize {
  constructor(baseWidth = 1920, baseFontSize = 100) {
    this.baseWidth = baseWidth;
    this.baseFontSize = baseFontSize;
    this.resizeHandler = this.debounce(this.setBodyFontSize.bind(this), 100);

    this.setBodyFontSize();
    window.addEventListener('resize', this.resizeHandler);
  }

  setBodyFontSize() {
    const currentWidth = document.documentElement.clientWidth || window.innerWidth;
    const fontSize = (currentWidth / this.baseWidth) * this.baseFontSize;
    document.body.style.fontSize = fontSize + 'px';
  }

  debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }

  destroy() {
    window.removeEventListener('resize', this.resizeHandler);
  }
}

// 初始化
const autoSize = new AutoSize();
// 如果需要销毁监听器，可以调用 autoSize.destroy();
