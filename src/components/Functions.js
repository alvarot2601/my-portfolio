import React, { useEffect } from "react";


export const pxPerScroll = 100;
export const halfviewportWidth = window.innerWidth / 2;
//variable para igualar el valor de Y para que llegue exactamente al final de la pagina
export const documentHeight = document.body.scrollHeight - window.innerHeight;

//export let y = 0;
export const delay = 1;
export const circleTextServices = document.querySelector("#circle__text-container--1");
//creamos objeto en vez de variable ya que es de las pocas formas de enviar referencia en vez del valor por parametros 
export let circleRotate = {
    value: 0
};
export let circleRotate2 = {
    value: 0
};
export const circleValue = 40;
export let reachedLimitBottom = false;
export const initialLimit = 0;
//export const finalLimit = document.body.scrollHeight;

////////////FUNCTIONS

export function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export const smooth = debounce((e)=>{

});
export const circleAnimation = (wheelDelta, y, element, coordYTop, coordYBottom, transform, obj, value, element2 = null, element3 = null, limitTop = Math.abs(y), limitBottom = (Math.abs(y) + window.innerHeight)) => {
    if (wheelDelta < 0 && coordYTop < (limitBottom + pxPerScroll) && coordYBottom > limitTop) {
        obj.value += value;
        console.log('entra1')
    } else if (wheelDelta > 0 && coordYTop < limitBottom && coordYBottom > limitTop) {
        obj.value -= value;
        console.log('entra2')
    } else if (coordYBottom < (limitBottom - pxPerScroll) && coordYBottom > (limitTop - pxPerScroll)) {
        console.log('entra3')
        if (wheelDelta > 0)
            obj.value -= value;
    }
    const unit = (transform === 'translateX') ? 'px' : 'deg';
    if (element2 === null) {
        element.style.transform = transform + "(" + parseInt(obj.value) + unit + ")";
    } else if (element2.classList.contains('services__item')) {
        if (obj.value > (halfviewportWidth / 2)) obj.value = (halfviewportWidth / 2);
        if (obj.value < 0) obj.value = 0;
        element3.style.transform = transform + "(" + parseInt(obj.value) + unit + ")";
        element2.style.transform = transform + "(" + (parseInt(obj.value) * -1) + unit + ")";
    }
    else {
        //entra aquí con es el swiper

        /*if(obj.value > 0) obj.value = 0;
        else if(obj.value < -300) obj.value = -300;*/
        element2.style.transform = transform + "(" + parseInt(obj.value) + unit + ")";
        element3.style.transform = transform + "(" + (parseInt(obj.value) * -1) + unit + ")";
    }
}