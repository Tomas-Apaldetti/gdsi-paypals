export function triggerOnChange(htmlType, htmlRef, value){
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    'value').set;
  nativeInputValueSetter.call(htmlRef.current, value)
  const event = new Event(htmlType, {bubbles:true});
  htmlRef.current.dispatchEvent(event);
}
