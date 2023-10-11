import { React, useEffect, useRef, useState } from "react";
import { MdSupportAgent, MdVisibility } from "react-icons/md";
import { AiOutlineArrowDown } from "react-icons/ai";
import { SiAntdesign, SiRedux } from "react-icons/si";
import { FaLaptopCode, FaReact, FaPhp } from "react-icons/fa";
import { TbBrandJavascript } from "react-icons/tb";
//import gsap from "gsap";
//import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { halfviewportWidth, rowServiceHeight } from "./Functions";
import {circleValue } from "./Functions";
import { px } from "framer-motion";
const Services = ({ coordY, wheelDelta, pxPerScroll }) => {
    const circleText = useRef(null);
    const circleTextServices = useRef(null);
    const circleTextYTop = useRef(null);
    const circleTextYBottom = useRef(null);
    const [circleRotate, setCircleRotate] = useState({ value: 0 });
    const rowServices1 = useRef(null);
    const rowServices2 = useRef(null);
    const rowServices3 = useRef(null);
    const rowServices4 = useRef(null);
    const serviceItem0 = useRef(null);
    const serviceItem1 = useRef(null);
    const serviceItem2 = useRef(null);
    const serviceItem3 = useRef(null);
    const serviceItem4 = useRef(null);
    const serviceItem5 = useRef(null);
    const serviceItem6 = useRef(null);
    const serviceItem7 = useRef(null);


    const rowServices1YTop = useRef(null);
    const rowServices2YTop = useRef(null);
    const rowServices3YTop = useRef(null);
    const rowServices4YTop = useRef(null);
    const rowServices1YBottom = useRef(null);
    const rowServices2YBottom = useRef(null);
    const rowServices3YBottom = useRef(null);
    const rowServices4YBottom = useRef(null);


    const rowServicesLimitBottom = coordY + halfviewportWidth;

    let necessaryScrollMoves =
        (rowServices1YTop.current +
            rowServiceHeight / 2 -
            (rowServices1YTop.current - window.innerHeight / 2)) /
        pxPerScroll;
    necessaryScrollMoves = necessaryScrollMoves.toFixed(2);
    if (necessaryScrollMoves - Math.floor(necessaryScrollMoves) !== 0)
        necessaryScrollMoves = Math.round(necessaryScrollMoves) + 1;
    const translateRowValue =
        window.innerWidth > 1000
            ? window.innerWidth / 2 / 2 / necessaryScrollMoves
            : -(window.innerWidth / 2) / necessaryScrollMoves;

    /*const [translateRow1, setTranslateRow1] = useState({
        val: window.innerWidth > 1000 ? 0 : window.innerWidth / 2,
    });*/
    const [translateRow1, setTranslateRow1] = useState(window.innerWidth > 1000 ? 0 : 0);//window.innerWidth / 2 lo cambio x 0 de mommento
    /*const translateRow1 = {
        value: window.innerWidth > 1000 ? 0 : window.innerWidth / 2,
    };*/
    const [translateRow2, setTranslateRow2] = useState(window.innerWidth > 1000 ? 0 :0);
    const [translateRow3, setTranslateRow3] = useState(window.innerWidth > 1000 ? 0 : window.innerWidth / 2);
    const [translateRow4, setTranslateRow4] = useState(window.innerWidth > 1000 ? 0 : window.innerWidth / 2);

    const CoordYRef = useRef(coordY);
    CoordYRef.current = coordY;

    useEffect(() => {
        rowServices1YTop.current = rowServices1.current.getBoundingClientRect().top;
        rowServices1YBottom.current = rowServices1.current.getBoundingClientRect().top + rowServiceHeight / 2;

        rowServices2YTop.current = rowServices2.current.getBoundingClientRect().top;
        rowServices2YBottom.current = rowServices2.current.getBoundingClientRect().top + rowServiceHeight / 2;
        rowServices3YTop.current = rowServices3.current.getBoundingClientRect().top;
        rowServices3YBottom.current = rowServices3.current.getBoundingClientRect().top + rowServiceHeight / 2;
        rowServices4YTop.current = rowServices4.current.getBoundingClientRect().top;
        rowServices4YBottom.current = rowServices4.current.getBoundingClientRect().top + rowServiceHeight / 2;

        circleTextYTop.current = circleTextServices.current.getBoundingClientRect().top;
        circleTextYBottom.current = circleTextServices.current.getBoundingClientRect().bottom;

    }, []);
    useEffect(() => {
        if (window.innerWidth > 1000) {
            servicesAnimation(wheelDelta, coordY, rowServices1.current, rowServices1YTop.current, rowServices1YBottom.current, "translateX", translateRow1, setTranslateRow1, translateRowValue, serviceItem0.current, serviceItem1.current);
            servicesAnimation(wheelDelta, coordY, rowServices2.current, rowServices2YTop.current, rowServices2YBottom.current, "translateX", translateRow2, setTranslateRow2, translateRowValue, serviceItem2.current, serviceItem3.current);
            servicesAnimation(wheelDelta, coordY, rowServices3.current, rowServices3YTop.current, rowServices3YBottom.current, "translateX", translateRow3, setTranslateRow3, translateRowValue, serviceItem4.current, serviceItem5.current);
            servicesAnimation(wheelDelta, coordY, rowServices4.current, rowServices4YTop.current, rowServices4YBottom.current, "translateX", translateRow4, setTranslateRow4, translateRowValue, serviceItem6.current, serviceItem7.current);
            circleAnimation(wheelDelta, coordY, circleTextServices.current, circleTextYTop.current, circleTextYBottom.current, 'rotate', circleRotate, circleValue);
        }
        
    }, [coordY]);
    

    //cambio el argumento obj por el metodo para setear los estados 
    const servicesAnimation = (wheelDelta, y, element, coordYTop, coordYBottom, transform, translateRow, translateRowSetter, value, animatedElement1 = null, animatedElement2 = null, limitTop = Math.abs(y), limitBottom = (Math.abs(y) + window.innerHeight)) => {
        //habia esto (limitBottom + pxPerScroll)
        if (wheelDelta < 0 && coordYTop < limitBottom && coordYBottom > limitTop) {
            //(Math.abs(y) - pxPerScroll) le añado nuevo el -pxperscroll

            if (coordYBottom > ((Math.abs(y) - pxPerScroll) + (window.innerHeight / 2))) {
                //obj.value += value;
                translateRowSetter(translateRow + value);
                //objSetter({val: translateRow1.val + value })

            } else return null;//nuevo
        } else if (wheelDelta > 0 && coordYTop < (limitBottom + pxPerScroll) && coordYBottom > limitTop) {
            //el 150 está hardcodeado
            if ((coordYTop + (rowServiceHeight / 2)) > ((Math.abs(y)) + (window.innerHeight / 2))) {
                //el problema q existe es que no se contrae en la misma posicion en la que se expande, tarda 1 scroll más en contraerse
                //obj.value -= value;
                translateRowSetter(translateRow - value);
                //objSetter({val: translateRow1.val - value })
            }//nuevo 04-10-23 14:41
            else return null;
        }
    };
    const circleAnimation = (wheelDelta, y, element, coordYTop, coordYBottom, transform, obj, value, element2 = null, element3 = null, limitTop = Math.abs(coordY), limitBottom = (Math.abs(coordY) + window.innerHeight)) => {
    
        if (wheelDelta < 0 && coordYTop < limitBottom && (coordYBottom + pxPerScroll) > limitTop) {
            console.log('obj.value1 ', parseInt(obj.value))
            obj.value += value;
        } else if (wheelDelta > 0 && coordYTop < (limitBottom + pxPerScroll) && coordYBottom > limitTop) {
            console.log('obj.value3 ', parseInt(obj.value))
            obj.value -= value;
        } else if (coordYBottom < (limitBottom - pxPerScroll) && coordYBottom > (limitTop - pxPerScroll)) {
            console.log('obj.value5 ', parseInt(obj.value))
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
            console.log('element', element)
            console.log('element2', element2)
            console.log('element2.style.transform', transform + "(" + parseInt(obj.value) + unit + ")")
            element2.style.transform = transform + "(" + parseInt(obj.value) + unit + ")";
            element3.style.transform = transform + "(" + (parseInt(obj.value) * -1) + unit + ")";
        }
    }

    //PARA DESPLAZAR LOS ITEMS LILAS Y NEGROS hacia los lados
    useEffect(() => {
        if (translateRow1 < 0) setTranslateRow1(0);
        else if (translateRow1 > halfviewportWidth / 2) setTranslateRow1(halfviewportWidth / 2);
        serviceItem1.current.style.transform = "translateX" + "(" + parseInt(translateRow1) + "px" + ")";
        serviceItem0.current.style.transform = "translateX" + "(" + parseInt(translateRow1) * -1 + "px" + ")";
    }, [translateRow1]);
    useEffect(() => {
        if (translateRow2 < 0) setTranslateRow2(0);
        else if (translateRow2 > halfviewportWidth / 2) setTranslateRow2(halfviewportWidth / 2);
        serviceItem3.current.style.transform = "translateX" + "(" + parseInt(translateRow2) + "px" + ")";
        serviceItem2.current.style.transform = "translateX" + "(" + parseInt(translateRow2) * -1 + "px" + ")";
    }, [translateRow2]);
    useEffect(() => {
        if (translateRow3 < 0) setTranslateRow3(0);
        else if (translateRow3 > halfviewportWidth / 2) setTranslateRow3(halfviewportWidth / 2);
        serviceItem5.current.style.transform = "translateX" + "(" + parseInt(translateRow3) + "px" + ")";
        serviceItem4.current.style.transform = "translateX" + "(" + parseInt(translateRow3) * -1 + "px" + ")";
    }, [translateRow3]);
    useEffect(() => {
        if (translateRow4 < 0) setTranslateRow4(0);
        else if (translateRow4 > halfviewportWidth / 2) setTranslateRow4(halfviewportWidth / 2);
        serviceItem7.current.style.transform = "translateX" + "(" + parseInt(translateRow4) + "px" + ")";
        serviceItem6.current.style.transform = "translateX" + "(" + parseInt(translateRow4) * -1 + "px" + ")";
    }, [translateRow4]);

    //efecto del texto para que de vueltas
    useEffect(() => {
        /*//para eliminar el smooth scroll en pantallas que no pertenezcan a pc
        if (window.innerWidth >= 768) {
            document.body.addEventListener("wheel", smooth);
            return () => document.body.remove("wheel", smooth);
        }*/
    }, []);

    const servicesArray = [
        [
            [
                <FaLaptopCode className="text-3xl lg:text-5xl" />,
                "Elige la tecnología",
                "Enfocado en el desarrollo, de principio a fin, de soluciones web a medida, utilizando lenguajes como JS o PHP, frameworks como React y Redux, o a través de algún CMS (Wordpress, Adobe, Craft CMS, etc).",
            ],
            [
                "Experto en",
                [
                    <a
                        href="https://es.reactjs.org/"
                        target="_blank"
                        aria-label="Link to React Web Page"
                    >
                        <FaReact className="text-7xl" />
                    </a>,
                    <a
                        href="https://www.php.net/"
                        target="_blank"
                        aria-label="Link to PHP Web Page"
                    >
                        <FaPhp className="text-7xl" />
                    </a>,
                    <a
                        href="https://es.redux.js.org/"
                        target="_blank"
                        aria-label="Link to Redux Web Page"
                    >
                        <SiRedux className="text-7xl" />
                    </a>,
                    <a
                        href="https://developer.mozilla.org/es/docs/Web/JavaScript"
                        target="_blank"
                        aria-label="Link to Javascript Web Page"
                    >
                        <TbBrandJavascript className="text-7xl" />
                    </a>,
                ],
            ],
        ],
        [
            [
                <SiAntdesign className="text-3xl lg:text-5xl" />,
                "Diseños personalizados",
                "Amplios conocimientos tanto en la adaptación de diseños ya existentes como en la creación de diseños originales desde sus primeros trazos.",
            ],
            ["Transformando tus proyectos en", "IDEAS EXCEPCIONALES"],
        ],
        [
            [
                <MdVisibility className="text-3xl lg:text-5xl" />,
                "SEO",
                "Mayor visibilidad en los buscadores asegurada, obtén una alta puntuación en SEO a través de mi experiencia y mis conocimientos ",
            ],
            ["Gracias a mis conocimientos en SEO", "SERÁS VISTO"],
        ],
        [
            [
                <MdSupportAgent className="text-3xl lg:text-5xl" />,
                " Asistencia rápida y eficiente",
                "Contar con una respuesta ágil y eficiente puede minimizar el impacto negativo de cualquier situación. Por ello, en nuestro compromiso por ofrecer un servicio excepcional, nos aseguramos de que nuestra asistencia sea lo más rápida y oportuna posible.",
            ],
            ["Siempre estaré", "ENCANTADO DE AYUDARTE"],
        ],
    ];

    useEffect(() => {
        circleText.current.innerHTML = circleText.current.innerHTML
            .split("")
            .map((char, i) => {
                return `<span style="transform:rotate(${i * 10}deg)">${char}</span>`;
            })
            .join("");

        //gsap
        /*gsap.registerPlugin(ScrollTrigger);
                
        
                  gsap.to("#circle__text-container1", {
                    scrollTrigger: {
                        trigger: "#circle__text-container1",
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                        markers: false
                    },
                    rotate: 360
                  });*/
    }, []);

    return (
        <section className="services">
            <div className="pt-[28px] pr-[28px] pb-[30px] pl-[38px] lg:pt-[54px] lg:pr-[72px] lg:pb-[54px] lg:pl-[72px] rounded-[48px] lg:roundex-[86px] services__content">
                <div className="w-full py-[28px]">
                    <span className="little-title">¿QUÉ HAGO?</span>
                    <p className="services__info mt-[26px] text-[clamp(28px,7.5vw,118px)]">
                        Facilito a mis clientes <br></br> soluciones webs <br></br>
                        desarrolladas a medida<br></br> con habilidad y pasión.
                    </p>
                </div>
                <div className="circle flex justify-center items-center">
                    <AiOutlineArrowDown className="arrow" />
                    <div
                        className="circle__text-container"
                        id="circle__text-container--1"
                        ref={circleTextServices}
                    >
                        <p className="circle__text" ref={circleText}>
                            SERVICIOS | SERVICIOS | SERVICIOS |
                        </p>
                    </div>
                </div>
                {/*
                     * <p className="services__info">
                    We provide clients <br></br> with stunning Crafty web <br></br>solutions, developed <br></br> with skill & passion.
                </p>
                     */}
            </div>
            <div className="services__container">
                {servicesArray.map((item, index) => {
                    return (
                        <div
                            ref={
                                index == 0
                                    ? rowServices1
                                    : index == 1
                                        ? rowServices2
                                        : index == 2
                                            ? rowServices3
                                            : index == 3
                                                ? rowServices4
                                                : ""
                            }
                            key={`services-${index}`}
                            className={`services__row services__row_${index}`}
                        >
                            <div
                                ref={
                                    index == 0
                                        ? serviceItem0
                                        : index == 1
                                            ? serviceItem2
                                            : index == 2
                                                ? serviceItem4
                                                : index == 3
                                                    ? serviceItem6
                                                    : null
                                }
                                className={`services__item services__item--${index} rounded-[48px] p-4 lg:p-[48px]`}
                            >
                                <div>{item[0][0]}</div>
                                <div className="services__item-container flex flex-col gap-3 lg:gap-6">
                                    <span className="services__subtitle text-xl lg:text-3xl font-black">
                                        {item[0][1]}
                                    </span>
                                    <p className="services__row-info text-md lg:text-xl font-thin">
                                        {item[0][2]}
                                    </p>
                                </div>
                            </div>
                            <div
                                ref={
                                    index === 0
                                        ? serviceItem1
                                        : index === 1
                                            ? serviceItem3
                                            : index === 2
                                                ? serviceItem5
                                                : index === 3
                                                    ? serviceItem7
                                                    : null
                                }
                                className={`services__item services__item--purple services__item--purple-${index}  container`}
                            >
                                <span>{item[1][0]}</span>
                                {typeof item[1][1] === "string" ? (
                                    <span>{item[1][1]}</span>
                                ) : (
                                    <div className="services__icons-container">{item[1][1]}</div>
                                )}
                            </div>
                            <div className="services__extension"></div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
export default Services;
