/**
 * Created by  on 2019/7/16.
 */

export const setStyle = (element, params = {}) => {
  if (!element) return;
  if (Object.getOwnPropertyDescriptor(document.body.style, 'font-size').writable) { // 检查style对象的属性是否可编辑
    Object.keys(params).forEach((key) => {
      element.style[key] = params[key];
    });
  }
  let cssText = element.style.cssText;
  const tmpArr = cssText.split(';');
  let existAttributes = {};
  tmpArr.forEach((item) => {
    let res = item.split(':');
    if (res && res.length > 1) {
      let key = res[0].trim();
      let value = res[1].trim();
      existAttributes[key] = value;
    }
  });
  element.style.cssText = Object.keys(existAttributes).map(key => `${key}: ${existAttributes[key]}`).join(';');
};

