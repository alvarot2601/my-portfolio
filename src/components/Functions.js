import React, {useEffect} from 'react';


// export const pxPerScroll = 100;
export const halfviewportWidth = window.innerWidth / 2;

// variable que almacena la altura de las filas de los slides

export const y = 0;
export const delay = 10;
export const circleTextServices = document.querySelector('#circle__text-container--1');
// creamos objeto en vez de variable ya que es de las pocas formas de enviar referencia en vez del valor por parametros
// export let circleRotate = {
//    value: 0
// };
// export let circleRotate2 = {
//    value: 0
// };
export const circleValue = 40;
export const initialLimit = 0;
// export const finalLimit = document.body.scrollHeight;

export const scaleValue = 0.15;
export const opacityValue = 0.15;


// para almacenar el valor de sliderValue y mantenerlo constantemente
/*export const sliderValueRef = (window.innerWidth >= 1000) ? -500 :
(window.innerWidth < 1000 && window.innerWidth > 700) ? -150 :
    (window.innerWidth <= 700 && window.innerWidth > 500) ? -100 :
        -80;
*/

// //////////FUNCTIONS

export const scrollCircleAnimatiom = (element, topCoord) =>{
    if (element.getBoundingClientRect().top < window.innerHeight) {
        const percentage = 100 + ((((window.innerHeight) - topCoord.getBoundingClientRect().top) * 100) / (window.innerHeight));
        let val = (360) - (percentage * (360)) / 100;
        /*if (val < 0) val = 0;
        else if (val > document.body.clientWidth / 2) val = document.body.clientWidth / 2;*/
        element.style.transform = 'rotate' + '(' + parseInt(-val) + 'deg' + ')';
      }
  }

