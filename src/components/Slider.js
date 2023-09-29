import React, { useEffect } from "react";
import SwiperCore, { FreeMode, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";


//import { gsap} from "gsap";
//import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { SiRedux, SiTailwindcss } from 'react-icons/si';
import { FaReact, FaPhp, FaFigma } from 'react-icons/fa';

import { BsBootstrap, BsBootstrapFill, BsWordpress } from 'react-icons/bs';
import { IoLogoJavascript } from 'react-icons/io';
import { SiSass, SiJquery } from 'react-icons/si';

import { DiMysql } from 'react-icons/di';

import { AiFillGithub } from 'react-icons/ai';

SwiperCore.use([Autoplay])


const Slider = () => {

    const mySkills = [
        [<FaReact className="text-5xl md:text-7xl"/>, 'REACT'],
        [<SiRedux className="text-5xl md:text-7xl"/>, 'REDUX'],
        [<IoLogoJavascript className="text-5xl md:text-7xl"/>, 'Javascript'],
        [<SiSass className="text-5xl md:text-7xl"/>, 'SASS'],
        [<SiJquery className="text-5xl md:text-7xl"/>, 'JQuery'],
        [<FaFigma className="text-5xl md:text-7xl"/>, 'Figma'],
        [<BsBootstrapFill className="text-5xl md:text-7xl"/>, 'Bootstrap'],
        [<DiMysql className="text-5xl md:text-7xl"/>, 'Mysql'],
        [<FaReact className="text-5xl md:text-7xl"/>, 'REACT'],
        [<SiRedux className="text-5xl md:text-7xl"/>, 'REDUX'],
        [<IoLogoJavascript className="text-5xl md:text-7xl"/>, 'Javascript'],
        [<SiSass className="text-5xl md:text-7xl"/>, 'SASS'],
        [<SiJquery className="text-5xl md:text-7xl"/>, 'JQuery'],
        [<FaFigma className="text-5xl md:text-7xl"/>, 'Figma'],
        [<DiMysql className="text-5xl md:text-7xl"/>, 'Mysql'],
        [<BsBootstrapFill className="text-5xl md:text-7xl"/>, 'Bootstrap'],
    ];
    const mySkills2 = [
        [<DiMysql className="text-5xl md:text-7xl"/>, 'Mysql'],
        [<FaPhp className="text-5xl md:text-7xl"/>, 'PHP'],
        [<AiFillGithub className="text-5xl md:text-7xl"/>, 'Github'],
        [<BsWordpress className="text-5xl md:text-7xl"/>, 'Wordpress'],
        [<SiTailwindcss className="text-5xl md:text-7xl"/>, 'Tailwind'],
        [<DiMysql className="text-5xl md:text-7xl"/>, 'Mysql'],
        [<FaPhp className="text-5xl md:text-7xl"/>, 'PHP'],
        [<AiFillGithub className="text-5xl md:text-7xl"/>, 'Github'],
        [<BsWordpress className="text-5xl md:text-7xl"/>, 'Wordpress'],
        [<DiMysql className="text-5xl md:text-7xl"/>, 'Mysql'],
        [<FaPhp className="text-5xl md:text-7xl"/>, 'PHP'],
        [<AiFillGithub className="text-5xl md:text-7xl"/>, 'Github'],
        [<BsWordpress className="text-5xl md:text-7xl"/>, 'Wordpress'],
        [<SiTailwindcss className="text-5xl md:text-7xl"/>, 'Tailwind'],
    ];

    /*useEffect(()=>{
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
    ///////////EN CASO DE QUE LA PANTALLA SEA MAYOR A 1000PX LAS OPCIONES EN EL PARAMETRO SERÁN DIFERENTES, NO SE LE INCLUIRÁ EL AUTOPLAY A SWIPER
    const params = (window.innerWidth >= 769) ? {
        slidesPerView: 'auto',
        spaceBetween: 20,
        loop: true,
        freeMode: {
            enabled: true,
            momentumBounce: false,
            momentumVelocityRatio: 0.4
        }
    }
        : {
            slidesPerView: 'auto',
            loop: true,
            spaceBetween: 20,
            speed: 2500,
            autoplay: {
                delay: 10,
                disableOnInteraction: false
            },
            freeMode: {
                enabled: true,
                momentumBounce: false,
                momentumVelocityRatio: 0.4,
                minimumVelocity: 0.02
            }
        };

    return (
        <div className="slider mt-8">
            <Swiper
                {...params}
                className={"swiper-1 h-[150px]"}
            >
                {
                    mySkills.map((skill, index) => {
                        return (
                            <SwiperSlide key={`slider-1-${index}`} className="slider__item w-[150px!important] md:w-[200px]">
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
                {...params}
                className="swiper-2 h-[150px]"
            >
                {
                    mySkills2.map((skill, index) => <SwiperSlide key={`slider-2-${index}`} className="slider__item w-[150px!important] md:w-[200px]">
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
}

export default Slider;
/*
slidesPerView={'auto'}
loop={true}
spaceBetween={20}
freeMode={{ enabled: true,
    momentumBounce: false,
    momentumVelocityRatio: 0.4}}
modules={[FreeMode]} */