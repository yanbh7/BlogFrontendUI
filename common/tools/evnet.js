// 事件发布订阅模型
class EventEmitter {
  constructor() {
    this.events = {};
  }

  // 订阅事件
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = new Set();
    }
    this.events[event].add(listener);
  }

  // 取消订阅
  off(event, listener) {
    if (!this.events[event]) return;
    this.events[event].delete(listener);
  }

  // 触发事件
  emit(event, ...args) {
    if (!this.events[event]) return;
    this.events[event].forEach((listener) => listener(...args));
  }

  // 只订阅一次
  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }
}

export default EventEmitter;
