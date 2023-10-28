import React, {useEffect, useRef, useState} from 'react';
import SwiperCore, {Autoplay} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';


import {SiRedux, SiTailwindcss} from 'react-icons/si';
import {FaReact, FaPhp, FaFigma} from 'react-icons/fa';

import {BsBootstrapFill, BsWordpress} from 'react-icons/bs';
import {IoLogoJavascript} from 'react-icons/io';
import {SiSass, SiJquery} from 'react-icons/si';

import {DiMysql} from 'react-icons/di';

import {AiFillGithub} from 'react-icons/ai';

SwiperCore.use([Autoplay]);


const Slider = ({coordY, wheelDelta, my_who_content, pxPerScroll}) => {
  const slider = useRef(null);
  const my_who_contentTop = useRef(null);
  const my_who_contentBottom = useRef(null);
  const necessaryScrollMoves_my_who = useRef(null);

  const [sliderValue, setSliderValue] = useState({
    value: (window.innerWidth >= 1000) ? -500 :
            (window.innerWidth < 1000 && window.innerWidth > 700) ? -150 :
                (window.innerWidth <= 700 && window.innerWidth > 500) ? -100 :
                    -80,
  });
  const sliderValueRef = (window.innerWidth >= 1000) ? -500 :
    (window.innerWidth < 1000 && window.innerWidth > 700) ? -150 :
        (window.innerWidth <= 700 && window.innerWidth > 500) ? -100 :
            -80;


  const swiper_1 = useRef(null);
  const swiper_2 = useRef(null);
  const slideValue = useRef(null);

  const setVariables = () =>{
    my_who_contentTop.current = my_who_content.current.getBoundingClientRect().top;
    my_who_contentBottom.current = my_who_content.current.getBoundingClientRect().bottom;
    // variable cuyo valor es el total de scrolls totales para que el valor inicial de la posicion del elemento (los swiper) se iguale a 0 cuando se llegue al ultimo scrolleo
    necessaryScrollMoves_my_who.current = (window.innerHeight + (my_who_contentBottom.current - my_who_contentTop.current)) / pxPerScroll;
    // contiene el valor que se le debe restar a la posicion del elemento con cada scroll.
    slideValue.current = Math.abs(sliderValue.value) / necessaryScrollMoves_my_who.current;
  };

  const circleAnimation = (wheelDelta, y, element, coordYTop, coordYBottom, transform, obj, objSetter, value, element2 = null, element3 = null, limitTop = Math.abs(coordY), limitBottom = (Math.abs(coordY) + window.innerHeight)) => {
    if (wheelDelta < 0 && coordYTop < limitBottom && (coordYBottom + pxPerScroll) > limitTop) {
      // obj.value += value;
      objSetter({value: obj.value + value});
    } else if (wheelDelta > 0 && coordYTop < (limitBottom + pxPerScroll) && coordYBottom > limitTop) {
      // console.log('obj.value3 ', parseInt(obj.value))
      // obj.value -= value;
      objSetter({value: obj.value - value});
    } else if (coordYBottom < (limitBottom ) && coordYBottom > (limitTop )) {
      console.log('obj.value5 ', parseInt(obj.value));
      if (wheelDelta > 0) {
        // obj.value -= value;
        objSetter({value: obj.value - value});
      }
    }
    /* const unit = (transform === 'translateX') ? 'px' : 'deg';
        if (element2 === null) {
            element.style.transform = transform + "(" + parseInt(obj.value) + unit + ")";
        }
        else {
            //entra aquí con es el swiper
            if(obj.value > 0){
                //obj.value = 0;
                objSetter({value:0});
            }
            else if(obj.value < -300) {
                //obj.value = -300;
                objSetter({value:-300});
            }

           element2.style.transform = transform + "(" + parseInt(obj.value) + unit + ")";
            element3.style.transform = transform + "(" + (parseInt(obj.value) * -1) + unit + ")";
        }*/
  };

  useEffect(()=>{
    circleAnimation(wheelDelta, coordY, my_who_content.current, my_who_contentTop.current, my_who_contentBottom.current, 'translateX', sliderValue, setSliderValue, slideValue.current, swiper_1.current, swiper_2.current);
  }, [coordY]);
  useEffect(()=>{
    setVariables();
  }, [pxPerScroll]);
  useEffect(()=>{
    if (sliderValue.value > 0) {
      // obj.value = 0;
      setSliderValue({value: 0});
    } else if (sliderValue.value < sliderValueRef) {
      // obj.value = -300;
      setSliderValue({value: sliderValueRef});
    }
    swiper_1.current.style.transform = 'translateX' + '(' + parseInt(sliderValue.value) + 'px' + ')';
    swiper_2.current.style.transform = 'translateX' + '(' + (parseInt(sliderValue.value) * -1) + 'px' + ')';
  }, [sliderValue]);


  const mySkills = [
    [<FaReact className="text-5xl md:text-7xl" />, 'REACT'],
    [<SiRedux className="text-5xl md:text-7xl" />, 'REDUX'],
    [<IoLogoJavascript className="text-5xl md:text-7xl" />, 'Javascript'],
    [<SiSass className="text-5xl md:text-7xl" />, 'SASS'],
    [<SiJquery className="text-5xl md:text-7xl" />, 'JQuery'],
    [<FaFigma className="text-5xl md:text-7xl" />, 'Figma'],
    [<BsBootstrapFill className="text-5xl md:text-7xl" />, 'Bootstrap'],
    [<DiMysql className="text-5xl md:text-7xl" />, 'Mysql'],
    [<FaReact className="text-5xl md:text-7xl" />, 'REACT'],
    [<SiRedux className="text-5xl md:text-7xl" />, 'REDUX'],
    [<IoLogoJavascript className="text-5xl md:text-7xl" />, 'Javascript'],
    [<SiSass className="text-5xl md:text-7xl" />, 'SASS'],
    [<SiJquery className="text-5xl md:text-7xl" />, 'JQuery'],
    [<FaFigma className="text-5xl md:text-7xl" />, 'Figma'],
    [<DiMysql className="text-5xl md:text-7xl" />, 'Mysql'],
    [<BsBootstrapFill className="text-5xl md:text-7xl" />, 'Bootstrap'],
  ];
  const mySkills2 = [
    [<DiMysql className="text-5xl md:text-7xl" />, 'Mysql'],
    [<FaPhp className="text-5xl md:text-7xl" />, 'PHP'],
    [<AiFillGithub className="text-5xl md:text-7xl" />, 'Github'],
    [<BsWordpress className="text-5xl md:text-7xl" />, 'Wordpress'],
    [<SiTailwindcss className="text-5xl md:text-7xl" />, 'Tailwind'],
    [<DiMysql className="text-5xl md:text-7xl" />, 'Mysql'],
    [<FaPhp className="text-5xl md:text-7xl" />, 'PHP'],
    [<AiFillGithub className="text-5xl md:text-7xl" />, 'Github'],
    [<BsWordpress className="text-5xl md:text-7xl" />, 'Wordpress'],
    [<DiMysql className="text-5xl md:text-7xl" />, 'Mysql'],
    [<FaPhp className="text-5xl md:text-7xl" />, 'PHP'],
    [<AiFillGithub className="text-5xl md:text-7xl" />, 'Github'],
    [<BsWordpress className="text-5xl md:text-7xl" />, 'Wordpress'],
    [<SiTailwindcss className="text-5xl md:text-7xl" />, 'Tailwind'],
  ];


  /* useEffect(()=>{
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(".my-who__info", {
            scrollTrigger: {
                trigger:".my-who__info",
                scrub: true
            },
            x: 0
          });


         let tl = gsap.timeline({

            scrollTrigger: {
              trigger: ".swiper-1",
              pin:true,
              start: "center center",

              scrub: 1,
              markers: true,
            },
            defaults:{duration:1, ease:'none'}
          });
          tl.to('.swiper-1',{ x:"+=100"})
          tl.to({},{duration:2})// an empty tween = a little pause ...

          gsap.to(".swiper-1", {
            scrollTrigger: {
                trigger: ".my-who",
                start: "top center",
                end: "bottom bottom",
                scrub: true,
                markers: false,
            },
            x:0
          });
          gsap.to(".swiper-2", {
            scrollTrigger: {
                trigger: ".my-who",
                start: "top center",
                end: "bottom bottom",
                scrub: true,
                markers: false,
            },
            x:0
          });

    }, []);
*/
  // /////////EN CASO DE QUE LA PANTALLA SEA MAYOR A 1000PX LAS OPCIONES EN EL PARAMETRO SERÁN DIFERENTES, NO SE LE INCLUIRÁ EL AUTOPLAY A SWIPER
  const params = (window.innerWidth >= 769) ? {
    slidesPerView: 'auto',
    spaceBetween: 20,
    loop: true,
    freeMode: {
      enabled: true,
      momentumBounce: false,
      momentumVelocityRatio: 0.4,
    },
  } :
        {
          slidesPerView: 'auto',
          loop: true,
          spaceBetween: 20,
          speed: 2500,
          autoplay: {
            delay: 10,
            disableOnInteraction: false,
          },
          freeMode: {
            enabled: true,
            momentumBounce: false,
            momentumVelocityRatio: 0.4,
            minimumVelocity: 0.02,
          },
        };
  return (
    <div className="slider mt-[60px] md:mt-[30px] min-w-[180%] md:min-w-[150%] translate-x-[-100px] rotate-[-24deg]" ref={my_who_content}>
      <Swiper
        ref={swiper_1}
        {...params}
        className={'swiper-1 h-[150px] lg:h-[200px]'}
      >
        {
          mySkills.map((skill, index) => {
            return (
              <SwiperSlide key={`slider-1-${index}`} className="slider__item w-[150px!important] lg:w-[200px!important]">
                <div className="slider__item-container">
                  {skill[0]}
                  <span>
                    {skill[1]}
                  </span>
                </div>
              </SwiperSlide>
            );
          })
        }
      </Swiper>
      <Swiper
        ref={swiper_2}
        {...params}
        className="swiper-2 h-[150px] lg:h-[200px]"
      >
        {
          mySkills2.map((skill, index) => <SwiperSlide key={`slider-2-${index}`} className="slider__item w-[150px!important] lg:w-[200px!important]">
            <div className="slider__item-container">
              {skill[0]}
              <span>
                {skill[1]}
              </span>
            </div>
          </SwiperSlide>)
        }
      </Swiper>
    </div>
  );
};

export default Slider;
/*
slidesPerView={'auto'}
loop={true}
spaceBetween={20}
freeMode={{ enabled: true,
    momentumBounce: false,
    momentumVelocityRatio: 0.4}}
modules={[FreeMode]} */
