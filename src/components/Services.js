/* eslint-disable react/prop-types */
import { React, useEffect, useRef, useState } from 'react';
import { MdSupportAgent, MdVisibility } from 'react-icons/md';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { SiAntdesign, SiRedux } from 'react-icons/si';
import { FaLaptopCode, FaReact, FaPhp, FaArrowRight, FaCartArrowDown, FaArrowCircleDown, FaArrowDown } from 'react-icons/fa';
import { TbBrandJavascript } from 'react-icons/tb';
import { motion } from 'framer-motion';
import { scrollCircleAnimatiom } from './Functions';

import { halfviewportWidth } from './Functions';
import { circleValue } from './Functions';
const Services = ({ coordY, wheelDelta, pxPerScroll, isSmallScreen, reference, scrollbar }) => {
  const [arrowDown, setArrowDown] = useState(false);

  const [showDragme, setShowDragme] = useState(true);
  const [circleTextTop, setCircleTextTop] = useState(null);
  const [circleTextBottom, setCircleTextBottom] = useState(null);
  const servicesRef = useRef(null);
  const subservicesRef = useRef(null);
  const containerHeight = useRef(null);
  const circleRef = useRef(null);
  const widthBar = '100%';//(document.body.clientWidth<= 500) ? "55%" : (document.body.clientWidth<= 800) ? "70%" : (document.body.clientWidth<= 1200) ? "83%" : '83%';

  /* tamaño de las filas de los slides de servicios.
  Para q la animacion funcione bien la altura debe
  ser múltiplo de 150, que es el valor actual
  de lo q baja en cada scroleo */
  const [rowServiceHeight, setRowServiceHeight] = useState(null);
  useEffect(() => {
    setRowServiceHeight(rowServices1.current.offsetHeight);
  }, []);
  const circleText = useRef(null);
  const circleTextServices = useRef(null);
  // eslint-disable-next-line no-unused-vars
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

  const [rowServices1Top, setRowServices1Top] = useState(null);
  const [rowServices2Top, setRowServices2Top] = useState(null);
  const [rowServices3Top, setRowServices3Top] = useState(null);
  const [rowServices4Top, setRowServices4Top] = useState(null);
  const [rowServices1Bottom, setRowServices1Bottom] = useState(null);
  const [rowServices2Bottom, setRowServices2Bottom] = useState(null);
  const [rowServices3Bottom, setRowServices3Bottom] = useState(null);
  const [rowServices4Bottom, setRowServices4Bottom] = useState(null);

  const rowServices1YTop = useRef(null);
  const rowServices2YTop = useRef(null);
  const rowServices3YTop = useRef(null);
  const rowServices4YTop = useRef(null);
  const rowServices1YBottom = useRef(null);
  const rowServices2YBottom = useRef(null);
  const rowServices3YBottom = useRef(null);
  const rowServices4YBottom = useRef(null);


  const [necessaryScrollMoves, setNecessaryScrollMoves] = useState(null);
  // almacena los scrolls necesarios para que los slides
  // terminen de desplegarse cuando el centro de la fila 
  // de los slides esté en el medio de la pantalla. 
  // let necessaryScrollMoves = (rowServices1YTop.current + 
  // rowServiceHeight.current / 2 - (rowServices1YTop.current -
  //  window.innerHeight / 2)) / pxPerScroll;
  // si es decimal le sumamos 1
  useEffect(() => {
    setNecessaryScrollMoves((rowServices1Top + rowServiceHeight / 2 -
      (rowServices1Top - window.innerHeight / 2)) / pxPerScroll);
  }, [rowServices1Top, rowServiceHeight, pxPerScroll]);
  /*useEffect(() => {
    if (necessaryScrollMoves - Math.floor(necessaryScrollMoves) !== 0)
      setNecessaryScrollMoves(necessaryScrollMoves=> Math.round(necessaryScrollMoves) + 1);
        
  }, [necessaryScrollMoves]);*/
  /* if (necessaryScrollMoves - Math.floor(necessaryScrollMoves) !== 0)
        necessaryScrollMoves = Math.round(necessaryScrollMoves) + 1;*/

  const [translateRowValue, setTranslateRowValue] = useState(null);
  useEffect(() => {
    setTranslateRowValue(!isSmallScreen ?
      document.body.clientWidth / 2 / 2 / necessaryScrollMoves :
      - (document.body.clientWidth / 2) / necessaryScrollMoves);
  }, [necessaryScrollMoves]);


  /* const translateRowValue =
        window.innerWidth > 1000
            ? window.innerWidth / 2 / 2 / necessaryScrollMoves
            : - (window.innerWidth / 2) / necessaryScrollMoves;*/

  
  const [translateRow1, setTranslateRow1] = useState(isSmallScreen ? document.body.clientWidth / 2 : 0);// window.innerWidth / 2 lo cambio x 0 de mommento
  // const [translateSmallRow1, setTranslateSmallRow1] = useState(window.innerWidth / 2);
  const [translateRow2, setTranslateRow2] = useState(isSmallScreen ? document.body.clientWidth / 2 : 0);
  // const [translateSmallRow2, setTranslateSmallRow2] = useState(window.innerWidth / 2);
  const [translateRow3, setTranslateRow3] = useState(isSmallScreen ? document.body.clientWidth / 2 : 0);
  // const [translateSmallRow3, setTranslateSmallRow3] = useState(window.innerWidth / 2);
  const [translateRow4, setTranslateRow4] = useState(isSmallScreen ? document.body.clientWidth / 2 : 0);
  // const [translateSmallRow4, setTranslateSmallRow4] = useState(window.innerWidth / 2);

  const CoordYRef = useRef(coordY);
  CoordYRef.current = coordY;
  const [diferencia, setDiferencia] = useState(null);
  useState(() => {
    setDiferencia(rowServices1Top - (rowServices1Top - (window.innerHeight / 2)));
  }, [rowServices1Top]);
  
  useEffect(() => {
    setTranslateRow1(isSmallScreen ? window.innerWidth / 2 : 0);
    setTranslateRow2(isSmallScreen ? window.innerWidth / 2 : 0);
    setTranslateRow3(isSmallScreen ? window.innerWidth / 2 : 0);
    setTranslateRow4(isSmallScreen ? window.innerWidth / 2 : 0);
  }, [isSmallScreen]);


  useEffect(() => {
    setCircleTextTop(circleTextServices.current.getBoundingClientRect().top + Math.abs(coordY));// si se hiciese scroll deberia ser window.scrollY
    setCircleTextBottom(circleTextServices.current.getBoundingClientRect().bottom + Math.abs(coordY));
    // ¡No verás el valor actualizado aquí!
  }, [showDragme]);

  useEffect(() => {
    setRowServices1Top(rowServices1.current.getBoundingClientRect().top);
    setRowServices2Top(rowServices2.current.getBoundingClientRect().top);
    setRowServices3Top(rowServices3.current.getBoundingClientRect().top);
    setRowServices4Top(rowServices4.current.getBoundingClientRect().top);
    setRowServices1Bottom(rowServices1.current.getBoundingClientRect().top + rowServiceHeight / 2);
    setRowServices2Bottom(rowServices2.current.getBoundingClientRect().top + rowServiceHeight / 2);
    setRowServices3Bottom(rowServices3.current.getBoundingClientRect().top + rowServiceHeight / 2);
    setRowServices4Bottom(rowServices4.current.getBoundingClientRect().top + rowServiceHeight / 2);
  }, [rowServiceHeight]);

  // si la pantalla es mayor a 1000px de ancho se debe poder ejecutar la animacion
  useEffect(() => {
    if (!isSmallScreen) {
      servicesAnimation2(wheelDelta, coordY, rowServices1.current, rowServices1Top, rowServices1Bottom, 'translateX', translateRow1, setTranslateRow1, translateRowValue, serviceItem0.current, serviceItem1.current);
      servicesAnimation2(wheelDelta, coordY, rowServices2.current, rowServices2Top, rowServices2Bottom, 'translateX', translateRow2, setTranslateRow2, translateRowValue, serviceItem2.current, serviceItem3.current);
      servicesAnimation2(wheelDelta, coordY, rowServices3.current, rowServices3Top, rowServices3Bottom, 'translateX', translateRow3, setTranslateRow3, translateRowValue, serviceItem4.current, serviceItem5.current);
      servicesAnimation2(wheelDelta, coordY, rowServices4.current, rowServices4Top, rowServices4Bottom, 'translateX', translateRow4, setTranslateRow4, translateRowValue, serviceItem6.current, serviceItem7.current);
      circleAnimation(wheelDelta, coordY, circleTextServices.current, circleTextTop, circleTextBottom, 'rotate', circleRotate, circleValue);
    } else {
      servicesAnimation3(wheelDelta, coordY, rowServices1.current, rowServices1YTop.current, rowServices1YBottom.current, 'translateX', translateRow1, setTranslateRow1, translateRowValue, null, null);
      servicesAnimation3(wheelDelta, coordY, rowServices2.current, rowServices2YTop.current, rowServices2YBottom.current, 'translateX', translateRow2, setTranslateRow2, translateRowValue, null, null);
      servicesAnimation3(wheelDelta, coordY, rowServices3.current, rowServices3YTop.current, rowServices3YBottom.current, 'translateX', translateRow3, setTranslateRow3, translateRowValue, null, null);
      servicesAnimation3(wheelDelta, coordY, rowServices4.current, rowServices4YTop.current, rowServices4YBottom.current, 'translateX', translateRow4, setTranslateRow4, translateRowValue, null, null);
      // servicesAnimation(e.wheelDelta, y, serviceItem2, rowServices2YTop, rowServices2YBottom, 'translateX', translateRow2, translateRowValue, null, null);
      // servicesAnimation(e.wheelDelta, y, serviceItem4, rowServices3YTop, rowServices3YBottom, 'translateX', translateRow3, translateRowValue, null, null);
      // servicesAnimation(e.wheelDelta, y, serviceItem6, rowServices4YTop, rowServices4YBottom, 'translateX', translateRow4, translateRowValue, null, null);
    }
  }, [coordY]);


  const servicesAnimation2 = (wheelDelta, y, element, coordYTop, coordYBottom, transform, translateRow, translateRowSetter, value, animatedElement1 = null, animatedElement2 = null, limitTop = Math.abs(y), limitBottom = (Math.abs(y) + window.innerHeight)) => {
    if (wheelDelta < 0 && coordYTop < limitBottom && coordYBottom > limitTop) {
      if (coordYBottom > ((Math.abs(y) - pxPerScroll) + (window.innerHeight / 2))) {
        let porcentaje = coordYTop - (Math.abs(coordY) + (window.innerHeight / 2));
        porcentaje = 100 - ((porcentaje * 100) / diferencia);

        // porcentaje =  100 - (porcentaje * 100 / (rowServices1YTop.current + window.innerHeight));
        // obj.value += value;
        const val = ((window.innerHeight / 2) * porcentaje) / 100;
        translateRowSetter(val);
      }
    } else if (wheelDelta > 0 && coordYTop < (limitBottom + pxPerScroll) && coordYBottom > limitTop) {
      if ((coordYTop + (rowServiceHeight / 2)) > ((Math.abs(y)) + (window.innerHeight / 2))) {
        let porcentaje = coordYTop - (Math.abs(coordY) + (window.innerHeight / 2));
        porcentaje = 100 - ((porcentaje * 100) / diferencia);
        const val = ((window.innerHeight / 2) * porcentaje) / 100;
        translateRowSetter(val);
      }
    }
  };
  const servicesAnimation3 = (wheelDelta, y, element, coordYTop, coordYBottom, transform, translateRow, translateRowSetter, value, animatedElement1 = null, animatedElement2 = null, limitTop = Math.abs(y), limitBottom = (Math.abs(y) + window.innerHeight)) => {
    if (wheelDelta < 0 && coordYTop < limitBottom && coordYBottom > limitTop) {
      if (coordYBottom > ((Math.abs(y) - pxPerScroll) + (window.innerHeight / 2))) {
        let porcentaje = coordYTop - (Math.abs(coordY) + (window.innerHeight / 2));
        porcentaje = 100 - (porcentaje * 100) / (document.body.clientWidth / 2);

        // porcentaje =  100 - (porcentaje * 100 / (rowServices1YTop.current + window.innerHeight));
        // obj.value += value;
        const val = (document.body.clientWidth / 2) - ((document.body.clientWidth / 2) * porcentaje) / 100;
        translateRowSetter(val);
      }
    } else if (wheelDelta > 0 && coordYTop < (limitBottom + pxPerScroll) && coordYBottom > limitTop) {
      if ((coordYTop + (rowServiceHeight / 2)) > ((Math.abs(y)) + (window.innerHeight / 2))) {
        let porcentaje = coordYTop - (Math.abs(coordY) + (window.innerHeight / 2));
        porcentaje = 100 - (porcentaje * 100) / (document.body.clientWidth / 2);
        const val = (document.body.clientWidth / 2) - ((document.body.clientWidth / 2) * porcentaje) / 100;
        translateRowSetter(val);
      }
    }
  };

  // cambio el argumento obj por el metodo para setear los estados
  const servicesAnimation = (wheelDelta, y, element, coordYTop, coordYBottom, transform, translateRow, translateRowSetter, value, animatedElement1 = null, animatedElement2 = null, limitTop = Math.abs(y), limitBottom = (Math.abs(y) + window.innerHeight)) => {
    // habia esto (limitBottom + pxPerScroll)
    if (wheelDelta < 0 && coordYTop < limitBottom && coordYBottom > limitTop) {
      // (Math.abs(y) - pxPerScroll) le añado nuevo el -pxperscroll

      if (coordYBottom > ((Math.abs(y) - pxPerScroll) + (window.innerHeight / 2))) {
        // obj.value += value;
        translateRowSetter(translateRow + value);
        // objSetter({val: translateRow1.val + value })
      }
    } else if (wheelDelta > 0 && coordYTop < (limitBottom + pxPerScroll) && coordYBottom > limitTop) {
      // el 150 está hardcodeado
      if ((coordYTop + (rowServiceHeight / 2)) > ((Math.abs(y)) + (window.innerHeight / 2))) {
        // el problema q existe es que no se contrae en la misma posicion en la que se expande, tarda 1 scroll más en contraerse
        // obj.value -= value;
        translateRowSetter(translateRow - value);
        // objSetter({val: translateRow1.val - value })
      }
    }
  };
  const circleAnimation = (wheelDelta, y, element, coordYTop, coordYBottom, transform, obj, value, element2 = null, element3 = null, limitTop = Math.abs(coordY), limitBottom = (Math.abs(coordY) + window.innerHeight)) => {
    if (wheelDelta < 0 && coordYTop < limitBottom && (coordYBottom + pxPerScroll) > limitTop) {
      obj.value += value;
    } else if (wheelDelta > 0 && coordYTop < (limitBottom + pxPerScroll) && coordYBottom > limitTop) {
      obj.value -= value;
    } else if (coordYBottom < (limitBottom - pxPerScroll) && coordYBottom > (limitTop - pxPerScroll)) {
      if (wheelDelta > 0) {
        obj.value -= value;
      }
    }
    const unit = (transform === 'translateX') ? 'px' : 'deg';
    if (element2 === null) {
      element.style.transform = transform + '(' + parseInt(obj.value) + unit + ')';
    } else if (element2.classList.contains('services__item')) {
      if (obj.value > (halfviewportWidth / 2)) obj.value = (halfviewportWidth / 2);
      if (obj.value < 0) obj.value = 0;
      element3.style.transform = transform + '(' + parseInt(obj.value) + unit + ')';
      element2.style.transform = transform + '(' + (parseInt(obj.value) * -1) + unit + ')';
    } else {
      // entra aquí con es el swiper
      /* if(obj.value > 0) obj.value = 0;
            else if(obj.value < -300) obj.value = -300;*/
      element2.style.transform = transform + '(' + parseInt(obj.value) + unit + ')';
      element3.style.transform = transform + '(' + (parseInt(obj.value) * -1) + unit + ')';
    }
  };

  // PARA DESPLAZAR LOS ITEMS LILAS Y NEGROS hacia los lados
  useEffect(() => {
    if (isSmallScreen) {
      if (translateRow1 < 0) setTranslateRow1(0);
      else if (translateRow1 > halfviewportWidth) setTranslateRow1(halfviewportWidth);
      serviceItem0.current.style.transform = 'translateX' + '(' + parseInt(translateRow1) + 'px' + ')';
    } else {
      if (translateRow1 < 0) setTranslateRow1(0);
      else if (translateRow1 > halfviewportWidth / 2) setTranslateRow1(halfviewportWidth / 2);
      serviceItem1.current.style.transform = 'translateX' + '(' + parseInt(translateRow1) + 'px' + ')';
      serviceItem0.current.style.transform = 'translateX' + '(' + parseInt(translateRow1) * -1 + 'px' + ')';
    }
  }, [translateRow1]);

  useEffect(() => {
    if (isSmallScreen) {
      if (translateRow2 < 0) setTranslateRow2(0);
      else if (translateRow2 > halfviewportWidth) setTranslateRow2(halfviewportWidth);
      serviceItem2.current.style.transform = 'translateX' + '(' + parseInt(translateRow2) + 'px' + ')';
    } else {
      if (translateRow2 < 0) setTranslateRow2(0);
      else if (translateRow2 > halfviewportWidth / 2) setTranslateRow2(halfviewportWidth / 2);
      serviceItem3.current.style.transform = 'translateX' + '(' + parseInt(translateRow2) + 'px' + ')';
      serviceItem2.current.style.transform = 'translateX' + '(' + parseInt(translateRow2) * -1 + 'px' + ')';
    }
  }, [translateRow2]);

  useEffect(() => {
    if (isSmallScreen) {
      if (translateRow3 < 0) setTranslateRow3(0);
      else if (translateRow3 > halfviewportWidth) setTranslateRow3(halfviewportWidth);
      serviceItem4.current.style.transform = 'translateX' + '(' + parseInt(translateRow3) + 'px' + ')';
    } else {
      if (translateRow3 < 0) setTranslateRow3(0);
      else if (translateRow3 > halfviewportWidth / 2) setTranslateRow3(halfviewportWidth / 2);
      serviceItem5.current.style.transform = 'translateX' + '(' + parseInt(translateRow3) + 'px' + ')';
      serviceItem4.current.style.transform = 'translateX' + '(' + parseInt(translateRow3) * -1 + 'px' + ')';
    }
  }, [translateRow3]);

  useEffect(() => {
    if (isSmallScreen) {
      if (translateRow4 < 0) setTranslateRow4(0);
      else if (translateRow4 > halfviewportWidth) setTranslateRow4(halfviewportWidth);
      serviceItem6.current.style.transform = 'translateX' + '(' + parseInt(translateRow4) + 'px' + ')';
    } else {
      if (translateRow4 < 0) setTranslateRow4(0);
      else if (translateRow4 > halfviewportWidth / 2) setTranslateRow4(halfviewportWidth / 2);
      serviceItem7.current.style.transform = 'translateX' + '(' + parseInt(translateRow4) + 'px' + ')';
      serviceItem6.current.style.transform = 'translateX' + '(' + parseInt(translateRow4) * -1 + 'px' + ')';
    }
  }, [translateRow4]);

  // igualamos referencia creada en este componente a la q se le paso x props para poder asignar la ref
  useEffect(() => {
    reference.current = servicesRef.current;
  }, []);

  

  const scrollAnimation = () =>{
    scrollCircleAnimatiom(circleTextServices.current, circleText.current);
  }
  const servicesArray = [
    [
      [
        <FaLaptopCode className="text-3xl lg:text-5xl" />,
        'Elige la tecnología',
        'Enfocado en el desarrollo, de principio a fin, de soluciones web a medida, utilizando lenguajes como JS o PHP, frameworks como React y Redux, o a través de algún CMS (Wordpress, Adobe, Craft CMS, etc).',
      ],
      [
        'Experto en',
        [
          <a
            href="https://es.reactjs.org/"
            target="_blank"
            aria-label="Link to React Web Page" rel="noreferrer"
          >
            <FaReact className="text-7xl" />
          </a>,
          <a
            href="https://www.php.net/"
            target="_blank"
            aria-label="Link to PHP Web Page" rel="noreferrer"
          >
            <FaPhp className="text-7xl" />
          </a>,
          <a
            href="https://es.redux.js.org/"
            target="_blank"
            aria-label="Link to Redux Web Page" rel="noreferrer"
          >
            <SiRedux className="text-7xl" />
          </a>,
          <a
            href="https://developer.mozilla.org/es/docs/Web/JavaScript"
            target="_blank"
            aria-label="Link to Javascript Web Page" rel="noreferrer"
          >
            <TbBrandJavascript className="text-7xl" />
          </a>,
        ],
      ],
    ],
    [
      [
        <SiAntdesign className="text-3xl lg:text-5xl" />,
        'Diseños personalizados',
        'Amplios conocimientos tanto en la adaptación de diseños ya existentes como en la creación de diseños originales desde sus primeros trazos.',
      ],
      ['Transformando tus proyectos en', 'IDEAS EXCEPCIONALES'],
    ],
    [
      [
        <MdVisibility className="text-3xl lg:text-5xl" />,
        'SEO',
        'Mayor visibilidad en los buscadores asegurada, obtén una alta puntuación en SEO a través de mi experiencia y mis conocimientos ',
      ],
      ['Gracias a mis conocimientos en SEO', 'SERÁS VISTO'],
    ],
    [
      [
        <MdSupportAgent className="text-3xl lg:text-5xl" />,
        ' Asistencia rápida y eficiente',
        'En mi compromiso por ofrecer un servicio excepcional, me aseguro de que mi asistencia sea lo más rápida y oportuna posible.',
      ],
      ['Siempre estaré', 'ENCANTADO DE AYUDARTE'],
    ],
  ];


  useEffect(() => {
    circleText.current.innerHTML = circleText.current.innerHTML
      .split('')
      .map((char, i) => {
        return `<span style="transform:rotate(${i * 10}deg)">${char}</span>`;
      })
      .join('');

    // gsap
    /* gsap.registerPlugin(ScrollTrigger);


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

  const deployServices = (element, element2, row, topCoord) => {
    if (row.getBoundingClientRect().top < window.innerHeight && row.getBoundingClientRect().bottom >= 0) {
        const percentage = 100 + ((((window.innerHeight / 2) - row.getBoundingClientRect().top) * 100) / (window.innerHeight / 2));
        let val = (percentage * (document.body.clientWidth / 4)) / 100;
        if (val < 0) val = 0;
        else if (val > document.body.clientWidth / 4) val = document.body.clientWidth / 4;
        element.style.transform = 'translateX' + '(' + parseInt(-val) + 'px' + ')';
        element2.style.transform = 'translateX' + '(' + parseInt(val) + 'px' + ')';
    }
  };
  const deployServicesHandler = () => {
    deployServices(serviceItem0.current, serviceItem1.current, rowServices1.current, rowServices1YTop.current);
    deployServices(serviceItem2.current, serviceItem3.current, rowServices2.current, rowServices2YTop.current);
    deployServices(serviceItem4.current, serviceItem5.current, rowServices3.current, rowServices3YTop.current);
    deployServices(serviceItem6.current, serviceItem7.current, rowServices4.current, rowServices4YTop.current);
  };
  const deploySingleService = (element, row, topCoord) => {
    if (row.getBoundingClientRect().top < window.innerHeight && row.getBoundingClientRect().bottom >= 0) {
        const percentage = 100 + ((((window.innerHeight / 2) - row.getBoundingClientRect().top) * 100) / (window.innerHeight / 2));
        let val = (document.body.clientWidth / 2) - (percentage * (document.body.clientWidth / 2)) / 100;
        if (val < 0) val = 0;
        else if (val > document.body.clientWidth / 2) val = document.body.clientWidth / 2;
        element.style.transform = 'translateX' + '(' + parseInt(val) + 'px' + ')';
    }
  };
  const deploySingleServiceHandler = () => {
    deploySingleService(serviceItem0.current, rowServices1.current, rowServices1YTop.current);
    
    deploySingleService(serviceItem2.current, rowServices2.current, rowServices2YTop.current);
    deploySingleService(serviceItem4.current, rowServices3.current, rowServices3YTop.current);
    deploySingleService(serviceItem6.current, rowServices4.current, rowServices4YTop.current);
  };

  useEffect(()=>{
    if(scrollbar!==null){
     scrollbar.addListener(scrollAnimation);
     return ()=> scrollbar.removeListener(scrollAnimation);
    }
   }, [scrollbar]);

   useEffect(() => {
    if(!isSmallScreen){
     if(scrollbar!==null){
       scrollbar.addListener(deployServicesHandler);
       return ()=> scrollbar.removeListener(deployServicesHandler);
      }
    }
   }, [scrollbar, isSmallScreen]);
   
  useEffect(() => {
   if(isSmallScreen){
    if(scrollbar!==null){
      scrollbar.addListener(deploySingleServiceHandler);
      return ()=> scrollbar.removeListener(deploySingleServiceHandler);
     }
   }
  }, [scrollbar, isSmallScreen]);


  /*useEffect(() => {
    if (isSmallScreen) {
      window.addEventListener('scroll', touchAnimation);
      return () => window.removeEventListener('scroll', touchAnimation);
    }
  }, []);*/

 

  useEffect(() => {
    const circleHeight = circleRef.current.offsetHeight;
    const subservicesElement = subservicesRef.current;
    const paddingTop = parseInt(getComputedStyle(subservicesElement).paddingTop, 10);
    const paddingBottom = parseInt(getComputedStyle(subservicesElement).paddingBottom, 10);
    containerHeight.current = subservicesRef.current.offsetHeight - paddingBottom - paddingTop - circleHeight;
  }, []);

  return (
    <section ref={servicesRef} className="services overflow-x-hidden" id="services">
      <div ref={subservicesRef} className="relative pt-[28px] pr-[28px] pb-[30px] 
      pl-[38px] lg:pt-[54px] lg:pr-[72px] lg:pb-[54px] lg:pl-[72px]
      rounded-[48px] lg:roundex-[86px] services__content">
        <div className="w-full py-[28px]">
          <div className='w-full flex items-center justify-start gap-[3px] h-1'>
            <motion.p
            /*initial={{ scale: 0.1, opacity: 0.3 }}
            viewport={{ once: true }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 1,
            }}*/
            className="text-[0.75rem] sm:text-sm md:text-md whitespace-nowrap w-fit">LO QUE HAGO</motion.p>
            <motion.div
            whileInView={{
              width: widthBar,
              transition:{
                duration:4
              }
            }}
            viewport={{once:true}}
            onAnimationComplete={()=>setArrowDown(true)}
            className='w-[10px] h-[1px] bg-[#A5A1FF]'>&#8203;</motion.div>
            
            {
              arrowDown ? <FaArrowDown /> : <FaArrowRight/>
            }
          </div>
          
          <motion.p
            drag
            dragConstraints={{top:-5,left:-5,bottom:5, right:5}}
            initial={{ opacity: 0, scale: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            whileInView={{ opacity: 1, scale: 1, transition: { duration: 1.5, delay: 1 } }}
            whileHover={{ rotate: 3, transition: { duration: 0.3 } }}
            className="max-w-[82vw]  services__info mt-[26px] text-[clamp(28px,7vw,118px)] cursor-move w-fit">
            Facilito a mis clientes soluciones webs
            desarrolladas a medida con habilidad y pasión.
          </motion.p>
        </div>

        <motion.div
          ref={circleRef}
          drag="y"
          dragConstraints={{ top: -containerHeight.current, bottom: 0 }}
          initial={{ translateX: 200, opacity: 0 }}
          whileInView={{ translateX: 0, translateY: containerHeight.current, opacity: 1 }}
          whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
          transition={{
            duration: 0.2,
            opacity: {
              duration: 1,
            },
            translateX: {
              duration: 1
              
            },
            translateY: {
              duration: 2,
              delay: 4.1,
            },
          }}
          viewport={{ once: true }}
          onDragTransitionEnd={() => {
            setCircleTextTop(circleTextServices.current.getBoundingClientRect().top + Math.abs(coordY));
            setCircleTextBottom(circleTextServices.current.getBoundingClientRect().bottom + Math.abs(coordY));
          }}

          onAnimationComplete={() => {
            // Tu código a ejecutar al finalizar la animación
            setShowDragme((showDragme) => false);
          }}
          className="circle  w-[150px] h-[150px] hidden lg:flex flex-col justify-center items-center cursor-move"
        >
          <p className={`text-sm ${showDragme ? 'flex' : 'hidden'} `}>Arrástrame!</p>
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

          
        </motion.div>
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
                index == 0 ?
                  rowServices1 :
                  index == 1 ?
                    rowServices2 :
                    index == 2 ?
                      rowServices3 :
                      index == 3 ?
                        rowServices4 :
                        ''
              }
              key={`services-${index}`}
              className={`services__row services__row_${index} h-full min-h-[280px] sm:min-h-[200px] lg:min-h-[300px]`}
            >
              <div
                ref={
                  index == 0 ?
                    serviceItem0 :
                    index == 1 ?
                      serviceItem2 :
                      index == 2 ?
                        serviceItem4 :
                        index == 3 ?
                          serviceItem6 :
                          null
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
                  index === 0 ?
                    serviceItem1 :
                    index === 1 ?
                      serviceItem3 :
                      index === 2 ?
                        serviceItem5 :
                        index === 3 ?
                          serviceItem7 :
                          null
                }
                className={`services__item services__item--purple services__item--purple-${index}  rounded-[48px] p-4 lg:p-[48px]`}
              >
                <span className="text-center text-xl xl:text-2xl 2xl:text-3xl font-thin">{item[1][0]}</span>
                {typeof item[1][1] === 'string' ? (
                  <span className="text-center text-4xl xl:text-5xl 2xl:text-6xl">{item[1][1]}</span>
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
