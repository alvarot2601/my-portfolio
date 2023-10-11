import React, { useEffect } from "react";


//export const pxPerScroll = 100;
export const halfviewportWidth = window.innerWidth / 2;
//variable para igualar el valor de Y para que llegue exactamente al final de la pagina
export const documentHeight = document.body.scrollHeight - window.innerHeight;
export const rowServiceHeight = 300;
export let y = 0;
export const delay = 20;
export const circleTextServices = document.querySelector("#circle__text-container--1");
//creamos objeto en vez de variable ya que es de las pocas formas de enviar referencia en vez del valor por parametros 
//export let circleRotate = {
//    value: 0
//};
//export let circleRotate2 = {
//    value: 0
//};
export const circleValue = 40;
export const initialLimit = 0;
//export const finalLimit = document.body.scrollHeight;

export const scaleValue = 0.15;
export const opacityValue = 0.15;


//para almacenar el valor de sliderValue y mantenerlo constantemente
export const sliderValueRef = (window.innerWidth >= 1000) ? -500
: (window.innerWidth < 1000 && window.innerWidth > 700) ? -150
    : (window.innerWidth <= 700 && window.innerWidth > 500) ? -100
        : -80;


        

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
export const debounce2 = (func, delay) => {
  let timeoutId;

  return function (...args) {
    const context = this;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
};
