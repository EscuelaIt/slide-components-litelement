export const SlideDownMixin = function(superClass) {
  return class extends superClass {

    calculaAlto(elem, targetHeight = '0px') {      
      let alto = 300;
      elem.style.opacity = 0;
      elem.style.height = 'auto';
      if(elem.offsetHeight) {
        alto = elem.offsetHeight;
      }
      elem.style.height = targetHeight;
      elem.style.opacity = 1;
      return alto;
    }

    slideShow(elem, targetHeight = '0px') {
      //console.log('slideShow', elem)
      let alto = this.calculaAlto(elem, targetHeight);
      //console.log('alto', alto);
      setTimeout(() => {
        elem.style.height = alto + 'px';
      }, 50);
      setTimeout(() => {
        elem.style.height = 'auto';
      }, 600);
    }
    slideHide(elem, targetHeight='0px') {
      let alto = elem.offsetHeight;
      if(alto) {
        elem.style.height = alto + 'px';
      }
      setTimeout(() => {
        elem.style.height = targetHeight;
      }, 50);
    }
  }
}