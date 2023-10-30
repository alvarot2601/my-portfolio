import React, { useEffect, useRef, useState } from 'react';
import Slider from './Slider';
import { motion } from 'framer-motion';

const WhoAmI = ({ coordY, wheelDelta, pxPerScroll, isSmallScreen, reference, scrollbar }) => {
  const whoamiRef = useRef(null);
  // igualamos referencia creada en este componente a la q se le paso x props para poder asignar la ref
  useEffect(() => {
    reference.current = whoamiRef.current;
  }, []);
  // const slideValue = 10;
  const my_who_content = useRef(null);
  const text = useRef(null);
  const textCoordYTop = useRef(null);
  const textCoordYBottom = useRef(null);
  const necessaryScrollMoves_my_who_text = useRef(null);
  const transXValue = useRef(null);
  const [sliderValue, setSliderValue] = useState({
    value: (document.body.clientWidth >= 1000) ? -250 :
      (document.body.clientWidth < 1000 && document.body.clientWidth > 700) ? -150 :
        (document.body.clientWidth <= 700 && document.body.clientWidth > 500) ? -100 :
          -80,
  });
  

  const setVariables = () => {
    textCoordYTop.current = text.current.getBoundingClientRect().top;
    textCoordYBottom.current = text.current.getBoundingClientRect().bottom;
    // añado 2.3 por INTUICION!!
    necessaryScrollMoves_my_who_text.current = ((window.innerHeight / 2.3) + (textCoordYBottom.current - textCoordYTop.current)) / pxPerScroll;
    //transXValue.current = Math.abs(transX.value) / necessaryScrollMoves_my_who_text.current;
  };

  


  useEffect(() => {
    setVariables();
  }, [pxPerScroll]);

  useEffect(() => {
    if (!isSmallScreen) {
      circleAnimation(wheelDelta, coordY, text.current, textCoordYTop.current, textCoordYBottom.current, 'translateX', transX, setTransX, transXValue.current);
    }
  }, [coordY]);

 

  
  
  return (
    <section ref={whoamiRef} className="my-who" id="mywho">
      <div className="pt-[28px] pr-[28px] pb-[30px] pl-[38px] lg:pt-[54px] lg:pr-[72px] lg:pb-[54px] lg:pl-[72px] rounded-[48px] lg:roundex-[86px] my-who__content">
        <div className="carrousel h-[150px] md:h-[200px] lg:h-[250px] xl:h-[300px]">
          <p className="frase px-5 my-who__name text-[clamp(25px,10vw,150px)]">¿Quién es Álvaro Taibo Aguza?</p>
          <p className="frase px-5 my-who__name text-[clamp(25px,10vw,150px)]">¿Quién es Álvaro Taibo Aguza?</p>
        </div>
        <div className="my-who__info w-full sm:w-[90vh] md:w-[70vw] lg:w-[60vw]">
          <motion.p
          initial={{translateX:-300}}
          transition={{duration:0.7}}
          whileInView={{translateX:0}}
          ref={text} className="my-who__text px-[38px] transform-none md:transform-gpu text-[clamp(18px,2.5vw,50px)]">
            Soy un desarrollador web con varios años de experiencia en el sector. Algunas tecnologías con las que he trabajado en diversos proyectos para empresas internacionales (Europa) y nacionales son: React, PHP, SQL, Vanilla JS, JQuery, tailwind, bootstrap y Wordpress.
          </motion.p>
        </div>
        <Slider isSmallScreen={isSmallScreen} my_who_content={whoamiRef} coordY={coordY} wheelDelta={wheelDelta} pxPerScroll={pxPerScroll} />
      </div>
    </section>
  );
};
export default WhoAmI;

/*const moveTextHandler = (element, topCoord) => {
    if (element.getBoundingClientRect().top < window.innerHeight) {
      //if (topCoord <= (window.scrollY + (window.innerHeight))) {
        const percentage = 100 - ((((window.innerHeight) - element.getBoundingClientRect().top) * 100) / (window.innerHeight));
        let val = transX.value - ((percentage * (transX.value)) / 100);
        console.log('percentage' , percentage)
        console.log(val)
        element.style.transform = 'translateX' + '(' + parseInt(-val) + 'px' + ')';
        //element2.style.transform = 'translateX' + '(' + parseInt(val) + 'px' + ')';
      }
    //}
  };
  const moveTextAnimation = () => {
    moveTextHandler(text.current);
  }
  useEffect(()=>{
    if(scrollbar!==null){
     scrollbar.addListener(moveTextAnimation);
     return ()=> scrollbar.removeListener(moveTextAnimation);
    }
   }, [scrollbar]);
   


    useEffect(() => {
    text.current.style.transform = 'translateX' + '(' + parseInt(transX.value) + 'px' + ')';
  }, [transX]);
   
   // animacion para el texto
  const [transX, setTransX] = useState(
    {
      value: (document.body.clientWidth >= 1600) ? -300 :
        (document.body.clientWidth >= 1400) ? -200 :
          (document.body.clientWidth >= 1200) ? -150 :
            (document.body.clientWidth >= 1025) ? -100 :
              0,
    },
  );
   
   const circleAnimation = (wheelDelta, y, element, coordYTop, coordYBottom, transform, obj, objSetter, value, element2 = null, element3 = null, limitTop = Math.abs(coordY), limitBottom = (Math.abs(coordY) + window.innerHeight)) => {
    if (wheelDelta < 0 && coordYTop < limitBottom && (coordYBottom + pxPerScroll) > limitTop) {
      // obj.value += value;
      objSetter({
        value: obj.value + value,
      });
    } else if (wheelDelta > 0 && coordYTop < (limitBottom + pxPerScroll) && coordYBottom > limitTop) {
      // obj.value -= value;
      objSetter({
        value: obj.value - value,
      });
    } else if (coordYBottom < limitBottom && coordYBottom > limitTop) {
      if (wheelDelta > 0) {
        // obj.value -= value;
        objSetter({
          value: obj.value - value,
        });
      }
    }
    const unit = (transform === 'translateX') ? 'px' : 'deg';
    if (element2 === null) {
      element.style.transform = transform + '(' + parseInt(obj.value) + unit + ')';
    } 
  };*/