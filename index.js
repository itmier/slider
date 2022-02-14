/*
 * @Author: 王云飞
 * @Date: 2022-01-27 15:27:53
 * @LastEditTime: 2022-02-14 15:10:30
 * @LastEditors: 王云飞
 * @Description: 
 * 
 */
class Slider {
  constructor(id, cycle = 3000){
    // 获取dom盒子
    this.container = document.getElementById(id);
    // 获取盒子内的子元素
    this.items = this.container
    .querySelectorAll('.slider-list__item, .slider-list__item--selected');
    // 初始化自动下一个时间
    this.cycle = cycle
    // 获取控制器盒子
    const controller = this.container.querySelector('.slide-list__control')
    if(controller) {
      // 获取所有控制器
      const buttons = controller.querySelectorAll('.slide-list__control-buttons, .slide-list__control-buttons--selected');
      // 添加 mouseover 事件, 当鼠标悬停在某个子控制器时, 跳转到和子控制器相同index的轮播图, 并停止自动轮播
      controller.addEventListener('mouseover', evt=>{
        const idx = Array.from(buttons).indexOf(evt.target);
        if(idx >= 0){
          this.slideTo(idx);
          this.stop();
        }
      });
      // 当鼠标离开子控制器时, 开始自动轮播
      controller.addEventListener('mouseout', evt=>{
        this.start();
      });
      // 添加自定义事件 slide 
      this.container.addEventListener('slide', evt => {
        const idx = evt.detail.index
        const selected = controller.querySelector('.slide-list__control-buttons--selected');
        if(selected) selected.className = 'slide-list__control-buttons';
        buttons[idx].className = 'slide-list__control-buttons--selected';
      })
    }
    const previous = this.container.querySelector('.slide-list__previous');
    if(previous){
      previous.addEventListener('click', evt => {
        this.stop();
        this.slidePrevious();
        this.start();
        evt.preventDefault();
      });
    }
    
    const next = this.container.querySelector('.slide-list__next');
    if(next){
      next.addEventListener('click', evt => {
        this.stop();
        this.slideNext();
        this.start();
        evt.preventDefault();
      });
    }
  }
  // 获取当前展示的元素DOM
  getSelectedItem(){
    let selected = this.container
      .querySelector('.slider-list__item--selected');
    return selected
  }
  // 获取展示元素的index
  getSelectedItemIndex(){
    return Array.from(this.items).indexOf(this.getSelectedItem());
  }
  // 跳转到指定轮播图
  slideTo(idx){
    let selected = this.getSelectedItem();
    if(selected){ 
      selected.className = 'slider-list__item';
    }
    let item = this.items[idx];
    if(item){
      item.className = 'slider-list__item--selected';
    }
    const detail = {index: idx}
    const event = new CustomEvent('slide', {bubbles: true, detail})
    this.container.dispatchEvent(event)
  }
  // 跳转到下一个
  slideNext(){
    let currentIdx = this.getSelectedItemIndex();
    let nextIdx = (currentIdx + 1) % this.items.length;
    this.slideTo(nextIdx);
  }
  // 跳转到上一个
  slidePrevious(){
    let currentIdx = this.getSelectedItemIndex();
    let previousIdx = (this.items.length + currentIdx - 1)
      % this.items.length;
    this.slideTo(previousIdx);  
  }
  start() {
    this.stop()
    this._timer = setInterval(() => this.slideNext(), this.cycle)
  }
  stop() {
    clearInterval(this._timer)
  }
}

const slider = new Slider('my-slider');
slider.start();