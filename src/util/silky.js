const lerp = (start, end, amt) => (1 - amt) * start + amt * end; // 对两个值进行线性插值 (0 <= amt <= 1)
const damp = (x, y, lambda, dt) => lerp(x, y, 1 - Math.exp(-lambda * dt)) // 阻尼效果
const clamp = (min, input, max) => Math.max(min, Math.min(input, max)) // 获取一个中间值

class Silky {
  timeRecord = 0 // 回调时间记录
  targetScroll = 0 // 当前滚动位置
  animatedScroll = 0 // 动画滚动位置
  from = 0 // 记录起始位置
  to = 0 // 记录目标位置
  lerp // 插值强度 0~1
  currentTime = 0 // 记录当前时间
  duration = 0 // 滚动动画的持续时间

  constructor({ content, lerp, duration, easing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) } = {}) {
    this.lerp = isNaN(lerp) ? 0.1 : lerp
    this.content = content || document.documentElement
    this.duration = duration || 1;
    this.easing = easing;
    const onWeel = (e) => {
      e.preventDefault(); // 阻止默认事件，停止滚动
      this.onVirtualScroll(this.targetScroll + e.deltaY);
    }
    this.content.addEventListener('wheel', onWeel, { passive: false });
  }
  raf(time) {
    if (!this.isRunning) return;
    const deltaTime = time - (this.timeRecord || time);
    this.timeRecord = time;
    this.advance(deltaTime * 0.001)
  }
  onVirtualScroll(target) {
    this.isRunning = true
    this.to = target;
    this.currentTime = 0;
    this.from = this.animatedScroll;
    this.onUpdate = (value) => {
      this.animatedScroll = value; // 记录动画距离
      this.content.scrollTop = this.animatedScroll; // 设置滚动
      this.targetScroll = value; // 记录滚动后的距离
    }
  }
  advance(deltaTime) {
    let completed = false
    let value = 0
    if (this.lerp) {
      value = damp(this.targetScroll, this.to, this.lerp * 60, deltaTime)
      if (Math.round(this.value) === Math.round(this.to)) {
        completed = true
      }
    } else {
      this.currentTime += deltaTime
      const linearProgress = clamp(0, this.currentTime / this.duration, 1)
      completed = linearProgress >= 1
      const easedProgress = completed ? 1 : this.easing(linearProgress)
      value = this.from + (this.to - this.from) * easedProgress
    }
    this.onUpdate?.(value);
    if (completed) this.isRunning = false
  }
}

export default {
    Silky
}