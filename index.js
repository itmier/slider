/*
 * @Author: 王云飞
 * @Date: 2022-01-27 15:27:53
 * @LastEditTime: 2022-02-14 14:04:57
 * @LastEditors: 王云飞
 * @Description: 
 * 
 */
class Slider {
  constructor(id){
    // 获取dom盒子
    this.container = document.getElementById(id);
    // 获取盒子内的子元素
    this.items = this.container
    .querySelectorAll('.slider-list__item, .slider-list__item--selected');
  }
  // 获取当前展示的元素DOM
  getSelectedItem(){
    const selected = this.container
      .querySelector('.slider-list__item--selected');
    return selected
  }
  // 获取展示元素的index
  getSelectedItemIndex(){
    return Array.from(this.items).indexOf(this.getSelectedItem());
  }
  // 跳转到指定轮播图
  slideTo(idx){
    const selected = this.getSelectedItem();
    if(selected){ 
      selected.className = 'slider-list__item';
    }
    const item = this.items[idx];
    if(item){
      item.className = 'slider-list__item--selected';
    }
  }
  // 跳转到下一个
  slideNext(){
    const currentIdx = this.getSelectedItemIndex();
    const nextIdx = (currentIdx + 1) % this.items.length;
    this.slideTo(nextIdx);
  }
  // 跳转到上一个
  slidePrevious(){
    const currentIdx = this.getSelectedItemIndex();
    const previousIdx = (this.items.length + currentIdx - 1)
      % this.items.length;
    this.slideTo(previousIdx);  
  }
}

const slider = new Slider('my-slider')

slider.slideTo(2)