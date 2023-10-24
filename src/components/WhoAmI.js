import React, { useEffect, useRef, useState } from "react";
import Slider from "./Slider";

const WhoAmI = ({ coordY, wheelDelta, pxPerScroll }) => {
    
    //const slideValue = 10;
    const my_who_content = useRef(null);
    const text = useRef(null);
    const textCoordYTop = useRef(null);
    const textCoordYBottom = useRef(null);
    const necessaryScrollMoves_my_who_text =  useRef(null);
    const transXValue = useRef(null);
    const [sliderValue, setSliderValue] = useState({
        value: (window.innerWidth >= 1000) ? -250
        : (window.innerWidth < 1000 && window.innerWidth > 700) ? -150
        : (window.innerWidth <= 700 && window.innerWidth > 500) ? -100
        : -80 
      });
    //animacion para el texto
    const [transX, setTransX] = useState(
        {
            value: (window.innerWidth >= 1600) ? -300
                : (window.innerWidth >= 1400) ? -200
                    : (window.innerWidth >= 1200) ? -150
                        : (window.innerWidth >= 1000) ? -100
                            : 0
        }
    );

    const setVariables = () =>{
        textCoordYTop.current = text.current.getBoundingClientRect().top;
        textCoordYBottom.current = text.current.getBoundingClientRect().bottom;
        //añado 2.3 por INTUICION!!
        necessaryScrollMoves_my_who_text.current =  ((window.innerHeight/2.3) + (textCoordYBottom.current - textCoordYTop.current)) / pxPerScroll;
        transXValue.current = Math.abs(transX.value) / necessaryScrollMoves_my_who_text.current;
    }

    const circleAnimation = (wheelDelta, y, element, coordYTop, coordYBottom, transform, obj, objSetter, value, element2 = null, element3 = null, limitTop = Math.abs(coordY), limitBottom = (Math.abs(coordY) + window.innerHeight)) => {
        if (wheelDelta < 0 && coordYTop < limitBottom && (coordYBottom + pxPerScroll) > limitTop) {
            //obj.value += value;
            objSetter({
                value : obj.value + value
            });
        } else if (wheelDelta > 0 && coordYTop < (limitBottom + pxPerScroll) && coordYBottom > limitTop) {
            //obj.value -= value;
            objSetter({
                value : obj.value - value
            });
        } else if (coordYBottom < limitBottom && coordYBottom > limitTop) {
            if (wheelDelta > 0){
                //obj.value -= value;
                objSetter({
                    value : obj.value - value
                });
            }  
        }
        const unit = (transform === 'translateX') ? 'px' : 'deg';
        if (element2 === null) {
            element.style.transform = transform + "(" + parseInt(obj.value) + unit + ")";
        } /*else if (element2.classList.contains('services__item')) {
            if (obj.value > (halfviewportWidth / 2)) obj.value = (halfviewportWidth / 2);
            if (obj.value < 0) obj.value = 0;
            element3.style.transform = transform + "(" + parseInt(obj.value) + unit + ")";
            element2.style.transform = transform + "(" + (parseInt(obj.value) * -1) + unit + ")";
        }
        else {
            //entra aquí con es el swiper
            if(obj.value > 0) obj.value = 0;
            else if(obj.value < -300) obj.value = -300;
            console.log('element', element)
            console.log('element2', element2)
            console.log('element2.style.transform', transform + "(" + parseInt(obj.value) + unit + ")")
            element2.style.transform = transform + "(" + parseInt(obj.value) + unit + ")";
            element3.style.transform = transform + "(" + (parseInt(obj.value) * -1) + unit + ")";
        }*/
    }


    
    useEffect(() => {
       setVariables();
    }, [pxPerScroll]);
    
    useEffect(() => {
        if (window.innerWidth >= 1024)
            circleAnimation(wheelDelta, coordY, text.current, textCoordYTop.current, textCoordYBottom.current, 'translateX', transX, setTransX, transXValue.current);
    }, [coordY]);

    useEffect(() => {
        text.current.style.transform = "translateX" + "(" + parseInt(transX.value) + "px" + ")";
    }, [transX]);



    ///variables necesarias para poder calcular en cuantos scrolleos ya no se verá la seccion my-who__content

/*<div className="" id="contenedor">
                    <p className="frase my-who__name text-[clamp(25px,7.1vw,200px)]">¿Quién es Álvaro Taibo Aguza?</p>
                    <p className="frase frase-2 my-who__name text-[clamp(25px,7.1vw,200px)]">¿Quién es Álvaro Taibo Aguza?</p>
                </div>


                 <div className="my-who__animation">
                    <p className="my-who__name text-[7vw] sm:text-[6.5vw] md:text-[7.5vw]">Quién es Álvaro Taibo Aguza?</p>
                </div>
                <div className="my-who__animation my-who__animation--2 ">
                    <p className="my-who__name text-[7vw] sm:text-[6.5vw] md:text-[7.5vw]">Quién es Álvaro Taibo Aguza?</p>
                </div>
                text-[clamp(25px,7.5vw,200px)]*/

    return (
        <section ref={my_who_content} className="my-who" id="mywho">
            <div className="pt-[28px] pr-[28px] pb-[30px] pl-[38px] lg:pt-[54px] lg:pr-[72px] lg:pb-[54px] lg:pl-[72px] rounded-[48px] lg:roundex-[86px] my-who__content">
                <div className="carrousel h-[150px] md:h-[200px] lg:h-[250px] xl:h-[300px]">
                    <p className="frase px-5 my-who__name text-[clamp(25px,10vw,150px)]">¿Quién es Álvaro Taibo Aguza?</p>
                    <p className="frase px-5 my-who__name text-[clamp(25px,10vw,150px)]">¿Quién es Álvaro Taibo Aguza?</p>
                </div>
               
                <div className="my-who__info w-full sm:w-[90vh] md:w-[70vw] lg:w-[60vw]">
                    <p ref={text} className="my-who__text px-[38px] transform-none md:transform-gpu translate-x-[-300px] text-[clamp(18px,2.5vw,50px)]">
                        Soy un desarrollador web con varios años de experiencia en el sector. Algunas tecnologías con las que he trabajado en diversos proyectos para empresas internacionales (Europa) y nacionales son: React, PHP, SQL, Vanilla JS, JQuery, tailwind, bootstrap y Wordpress. 
                    </p>
                </div>
                <Slider my_who_content={my_who_content} coordY={coordY} wheelDelta={wheelDelta} pxPerScroll = {pxPerScroll} />
            </div>
        </section>
    );
}
export default WhoAmI;