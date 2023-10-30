import {React, useEffect, useRef, useState} from 'react';
import Scrollbar from 'smooth-scrollbar';

import swal from 'sweetalert';
import Header from './components/Header';
import Nav from './components/Nav';
import WhoAmI from './components/WhoAmI';
import Services from './components/Services';


import './App.css';
import './styles/css/styles.css';
import {initialLimit, delay, debounce2} from './components/Functions';
import Contact from './components/Contact.js';
import Projects from './components/Projects';
import Footer from './components/Footer';


function App() {
  const [scrollbarState, setScrollbarState] = useState(null);
  const navRef = useRef(null);
  const headerRef = useRef(null);
  const projectsRef = useRef(null);
  const servicesRef = useRef(null);
  const whoamiRef = useRef(null);
  const contactRef = useRef(null);
  
  // variables para el evento de teclado
  const coordYref = useRef(null);
  const relativeScrolledValueRef = useRef(null);


  // variables para almacenar y comparar los e.clientY para saber si sube o baja
  const clientY = useRef(null);
  const clientY2 = useRef(null);
  const mousemoveExecutions = useRef(null);
  // variable que se le pasa a los hijos para saber si coordY está variando debido al evento wheel o debido al movimiento de mi barra de scroll
  const [movedByScroll, setMovedByScroll] = useState(false);
  // variable para almacenar cada una de las coordenadas correspondientes a cada scrolleo, si no se ha hecho scroll debe ser 0, si se ha hecho un scroll debe ser pxperscroll * 1 y asi sucesivamente hasta llegar a TIMES_TO_REACH
  const allCoordY = useRef(null);
  // variable para obtener el porcentaje equivalente para los valores de las animaciones
  const relativeAnimPercentage = useRef(null);
  let timer;
  // variables relacionadas con la barra de scroll
  const scrollbar = useRef(null);
  // variable que almacena la altura de la barra de scroll
  const scrollBarHeight = 100;
  const scrollbarWidth = 100;
  // altura real del contenedor de la barra de scroll
  const realScrollWrapperHeight = window.innerHeight - scrollBarHeight;
  // asignamos al cargar la pagina el height del wrapper de la scrollbar
  const scrollbarWrapper = useRef(null);
  // almacena el numero de scrolleos necesarios para llegar al final de la pagina
  const times_to_reach = useRef(null); // 44;
  const relativePercentage = useRef(null);// (window.innerHeight - scrollBarHeight) / TIMES_TO_REACH.current
  // variable para controlar si está pulsado la scrollbar
  const [continueScrolling, setContinueScrolling] = useState(false);
  const continueScrollingRef = useRef(null);

  // variable para que al pulsar sobre la scrollbar no se pongan en paralelo en las misma coordenada Y que el raton
  const scrollbarDifference = useRef(null);
  // const [scrollbarDifference, setScrollbarDifference] = useState(0);
  const pxPerScroll = useRef(null);

  const [relativeScrolledValueState, setRelativeScrolledValueState] = useState(0);
  const relativeScrolledValue = 0;
  // variables para almacenar las coordenadas del inicio y fin del scroll al pulsar sobre la scrollbar. Almacena la coordenada y desde que se pulsa el raton hasta que se suelta
  const [startCoordinates, setStartCoordinates] = useState(0);
  const [endCoordinates, setEndCoordinates] = useState(0);
  // variable encargada de definir la minima coordenada a la que puede acceder la barra de scroll
  const scrollbarStartLimit = 0;
  // variable encargada de definir la mayor coordenada a la que puede acceder la barra de scroll
  const scrollbarEndLimit = realScrollWrapperHeight;

  const [equivalentPercentage, setEquivalentPercentage] = useState(null);
  // variable para utilizar dentro de getActualCoordinates para guardar el ultimo valor de la coordenada y saber si se va hacia arriba o hacia abajo para setear wheelDelta y poder enviarselo a otros componentes para las animaciones que lo usan
  const lastCoordY = useRef(null);
  const [reachedLimitBottom, setReachedLimitBottom] = useState(false);
  // const [finalLimit, setFinalLimit] = useState(0);
  const finalLimit = useRef(null);
  const scroll = useRef(null);
  const [coordY, setCoordY] = useState(0);

  // estado para almacenar e.wheeldelta y poder pasarselo a otros componentes
  const [wheelDelta, setWheelDelta] = useState(null);
  const [lastWheelDelta, setLastWheelDelta] = useState(0);
  // estado para saber si la pantalla es inferior a 1024px o no
  const [isSmallScreen, setIsSmallScreen] = useState(true);
  // funcion para setear algunas variables que se necesitan setear cuando el dom cargue y para que despues se pueda aplicar la funcion cleanup de los useeffect
  const setInitialStates = () => {
    if (document.body.clientWidth >= 1025) {
      setIsSmallScreen(false);
      const today = new Date();
      // swal("Hacer scroll en pc está deshabilitado. Para poder navegar debes pulsar sobre las fechas del teclado o con la rueda del ratón. A día de hoy (" + today.getDate() + "/" + parseInt(today.getMonth() + 1) + "/" + today.getFullYear() + ") sigo actualizando y mejorando mi portfolio, por lo que si encuentras algún fallo|mejora no dudes en contactar conmigo.", "", "info");
      // alert("Hacer scroll en pc está deshabilitado. Para poder navegar debes pulsar sobre las fechas del teclado o con la rueda del ratón. A día de hoy (" + today.getDate() + "/" + parseInt(today.getMonth() + 1) + "/" + today.getFullYear() + ") sigo actualizando y mejorando mi portfolio, por lo que si encuentras algún fallo|mejora no dudes en contactar conmigo.");
    }
    finalLimit.current = document.body.scrollHeight;
   
    pxPerScroll.current = 150;// (document.body.scrollHeight - window.innerHeight) / TIMES_TO_REACH;
    continueScrollingRef.current = false;
    scrollbarDifference.current = true;
    lastCoordY.current = 0;
    allCoordY.current = [0, pxPerScroll.current, pxPerScroll.current * 2, pxPerScroll.current * 3, pxPerScroll.current * 4, pxPerScroll.current * 5, pxPerScroll.current * 6, pxPerScroll.current * 7, pxPerScroll.current * 8, pxPerScroll.current * 9, pxPerScroll.current * 10, pxPerScroll.current * 11, pxPerScroll.current * 12, pxPerScroll.current * 13, pxPerScroll.current * 14, pxPerScroll.current * 15, pxPerScroll.current * 16, pxPerScroll.current * 16, pxPerScroll.current * 17, pxPerScroll.current * 18, pxPerScroll.current * 19, pxPerScroll.current * 20];
    relativeAnimPercentage.current = 100;// %
    mousemoveExecutions.current = 0;
    relativeScrolledValueRef.current = 0;// falta añadir en el keyhandler
    times_to_reach.current = (finalLimit.current - window.innerHeight) / pxPerScroll.current;
    relativePercentage.current = (window.innerHeight - (scrollBarHeight)) / times_to_reach.current;
  };

 

  
  const debounce = (func, delay) => {
    let timeoutId;

    return function(...args) {
      const context = this;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  };
  

  const smooth = debounce((e) => {
    let y = coordY;
    setMovedByScroll(false);
    let relativeScrolledValue = relativeScrolledValueState;
    if (e.wheelDelta < 0 && y <= initialLimit) {
      // && (Math.abs(y) + window.innerHeight) < finalLimit
      y -= pxPerScroll.current;
      relativeScrolledValue += relativePercentage.current;
      // setCoordY(coordY - pxPerScroll);
      if ((Math.abs(y) + window.innerHeight) > finalLimit.current) {
        // aqui dentro no asigno valor a la i ya que dejaría de ser múltiplo de 10 o 100, por eso al translate le sumo y + la diferencia
        // setCoordY(finalLimit - window.innerHeight);
        // const yAux = (finalLimit - window.innerHeight);
        // scroll.current.style.transform = "translateY(" + (-yAux) + "px)";
        y = (window.innerHeight - finalLimit.current);
        relativeScrolledValue = window.innerHeight - scrollBarHeight;
        // setReachedLimitBottom(true);
      }
    } else if (e.wheelDelta > 0 && Math.abs(y) < finalLimit.current && y < 0) {
      y += pxPerScroll.current;
      relativeScrolledValue -= relativePercentage.current;
      // setCoordY(coordY + pxPerScroll);
      if (y > initialLimit) {
        y = 0;
        relativeScrolledValue = 0;
        // setCoordY(0);
      }
      // setReachedLimitBottom(false);
    }
    setWheelDelta(e.wheelDelta);
    setCoordY(y);
    coordYref.current = y;
    setRelativeScrolledValueState(relativeScrolledValue);
    relativeScrolledValueRef.current = relativeScrolledValue;
  }, delay);

  useEffect(() => {
    window.addEventListener('load', setInitialStates);
    return () => window.removeEventListener('load', setInitialStates);
  }, []);

  //scrollbar smooth
  useEffect(() => {
    if (scroll.current) {
      setScrollbarState(Scrollbar.init(scroll.current, { damping: 0.07 }));
    }
  }, []);

  
  return (
      <div className='smooth-scroll-wrapper relative w-full' ref={scroll}  style={{ height: '100vh', overflow: 'auto' }}>
        <div className='content px-[8px] flex flex-col gap-[8px]'>
          <Nav isSmallScreen={isSmallScreen} reference={navRef} coordY={coordY} wheelDelta={wheelDelta} pxPerScroll={pxPerScroll.current} relativeAnimPercentage={relativeAnimPercentage.current} movedByScroll={movedByScroll} mousemoveExecutions={mousemoveExecutions.current} />
          <Header reference={headerRef} isSmallScreen={isSmallScreen} />
          <Services scrollbar={scrollbarState} reference={servicesRef} isSmallScreen={isSmallScreen} coordY={coordY} wheelDelta={wheelDelta} pxPerScroll={pxPerScroll.current} />
          <Projects isSmallScreen={isSmallScreen} reference={projectsRef} />
          <WhoAmI scrollbar={scrollbarState} isSmallScreen={isSmallScreen} reference={whoamiRef} coordY={coordY} wheelDelta={wheelDelta} pxPerScroll={pxPerScroll.current} />
          <Contact scrollbar={scrollbarState} isSmallScreen={isSmallScreen} reference={contactRef} coordY={coordY} reachedLimitBottom={reachedLimitBottom} wheelDelta={wheelDelta} pxPerScroll={pxPerScroll.current} />
          <Footer />
        </div>
      </div>
  );
}

/*
useEffect(() => {
    if (isSmallScreen) {
      window.addEventListener('scroll', moveScrollbarAnimation);
      return () => window.removeEventListener('scroll', moveScrollbarAnimation);
    }
  }, []);

  const moveScrollbarAnimation = () =>{
    var requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
    window.requestAnimationFrame(moveScrollbar);
  }




 //he cambiado position del body y comento useEffect con wheel
  useEffect(() => {
    // para eliminar el smooth scroll en pantallas que no pertenezcan a pc
    if (!isSmallScreen) {
      document.body.addEventListener('wheel', smooth);
      return () => document.body.removeEventListener('wheel', smooth);
    }
  });


  useEffect(() => {
    if(!isSmallScreen){
      scroll.current.style.transform = 'translateY(' + coordY + 'px)';
      scrollbar.current.style.transform = 'translateY(' + relativeScrolledValueState + 'px)';
      if (lastCoordY.current < relativeScrolledValueState) {
        setWheelDelta(-150);
        lastCoordY.current = relativeScrolledValueState;
      } else if (lastCoordY.current > relativeScrolledValueState) {
        setWheelDelta(150);
        lastCoordY.current = relativeScrolledValueState;
      }
    }
  }, [coordY, relativeScrolledValueState, isSmallScreen]);





const keydownHandle = (e) => {
    let relativeScrolledValue = relativeScrolledValueRef.current;
    if (e.keyCode === 40) {// abajo
      if (Math.abs(coordYref.current - pxPerScroll.current) > finalLimit.current - window.innerHeight) {
        coordYref.current = - (finalLimit.current - window.innerHeight);
        relativeScrolledValue = window.innerHeight - scrollBarHeight;
      } else {
        coordYref.current -= pxPerScroll.current;
        relativeScrolledValue += relativePercentage.current;
      }
      relativeScrolledValueRef.current = relativeScrolledValue;
      setRelativeScrolledValueState(relativeScrolledValue);
      setCoordY(coordYref.current);
      setWheelDelta(-150);
    } else if (e.keyCode === 38) {
      if (coordYref.current + pxPerScroll.current > 0) {
        relativeScrolledValue = 0;
        coordYref.current = 0;
      } else {
        coordYref.current += pxPerScroll.current;
        relativeScrolledValue -= relativePercentage.current;
      }
      relativeScrolledValueRef.current = relativeScrolledValue;
      setCoordY(coordYref.current);
      setWheelDelta(150);
      setRelativeScrolledValueState(relativeScrolledValue);
    }
    // alert(relativeScrolledValue)
    // alert(relativeScrolledValueState)
  };
  useEffect(() => {
    if (!isSmallScreen) {
      window.addEventListener('keydown', keydownHandle);
      return () => window.addEventListener('keydown', keydownHandle);
    }
  }, [isSmallScreen]);
  const moveScrollbar = () => {
    const percentage = ((window.scrollY) * 100) / (document.body.scrollHeight - window.innerHeight);
    const relativeValue = (percentage * (window.innerWidth - scrollbarWidth)) / 100;
    scrollbar.current.style.transform = 'translateX(' + relativeValue + 'px)';
  };
  const scrollPage = () => {
    alert(3)
    const percentage = ((window.innerWidth - scrollbarWidth) * 100) / (scrollbar.current.getBoundingClientRect().left);
    const relativeValue = (percentage * (window.innerWidth - scrollbarWidth)) / 100;
    scrollbar.current.style.transform = "translateX(" + relativeValue + "px)";
  }
  useEffect(()=>{
    if(isSmallScreen){
      scrollbar.current.addEventListener("touchstart", scrollPage);
      scrollbar.current.removeEventListener("touchstart", scrollPage);
    }
  });



const getStartCoordinates = (e) => {
    // continueScrolling = true;
    setContinueScrolling(true);
    continueScrollingRef.current = true;
    // startCoordinates = e.clientY;
    setStartCoordinates(e.clientY);
    scrollbarDifference.current = (parseInt(e.clientY) - parseInt(scrollbar.current.getBoundingClientRect().top));
    lastCoordY.current = e.clientY;
    coordYref.current = 0;
    // setScrollbarDifference(parseInt(e.clientY) - parseInt(scrollbar.current.getBoundingClientRect().top));
    // scrollbarDifference = parseInt(e.clientY) - parseInt(scrollbar.getBoundingClientRect().top);
  };
  const getEndCoordinates = (e) => {
    setEndCoordinates(e.clientY);
    // endCoordinates = e.clientY;
    // continueScrolling = false;
    continueScrollingRef.current = false;
    setContinueScrolling(false);
    lastCoordY.current = e.clientY;
  };

  const getActualCoordinates = (e) => {
    const currentY = e.clientY;
    if (continueScrollingRef.current === true) {
      // alert(2)
      mousemoveExecutions.current += 1;
      setMovedByScroll(true);
      clientY.current = e.clientY;
      // alert('entra1')
      if (mousemoveExecutions.current % 2 != 0 || mousemoveExecutions.current === 1) return;
      // alert('entra2')
      clientY2.current = e.clientY;
      let positionScrollbar = 0;
      // scrollbar.current.style.transitionProperty = "none";
      // scroll.current.style.transitionProperty = "none";
      positionScrollbar = (parseInt(e.clientY) - scrollbarDifference.current);
      // realizo las comprobaciones pertinentes
      if (positionScrollbar > scrollbarEndLimit) {
        positionScrollbar = scrollbarEndLimit;
        setRelativeScrolledValueState(positionScrollbar);
        setCoordY(-(finalLimit.current - window.innerHeight));
        coordYref.current = -(finalLimit.current - window.innerHeight);
        relativeAnimPercentage.current = 100;
        // scroll.current.style.transform = "translateY(" + ((finalLimit - window.innerHeight) * -1) + "px)";
      } else if (positionScrollbar < scrollbarStartLimit) {
        positionScrollbar = scrollbarStartLimit;
        setRelativeScrolledValueState(positionScrollbar);
        setCoordY(0);
        coordYref.current = 0;
        relativeAnimPercentage.current = 100;
        // scroll.current.style.transform = "translateY(0px)";
      } else {
        // alert(3)
        // percentage = variable para calcular el porcentaje relativo entre la distancia recorrida por la barra de scroll y el contenido de la web
        let percentage;
        if (scrollbar.current.getBoundingClientRect().top === 0) {
          percentage = -(1 * 100) / realScrollWrapperHeight;
        } else {
          percentage = (scrollbar.current.getBoundingClientRect().top * 100) / realScrollWrapperHeight;
        }

        const equivalentPercentage = -((percentage * (finalLimit.current - window.innerHeight)) / 100);
        setCoordY(equivalentPercentage);
        coordYref.current = equivalentPercentage;
        setRelativeScrolledValueState(positionScrollbar);
        let value;
        for (let i = 0; i < allCoordY.current.length - 1; i++) {
          if (allCoordY.current[i] === Math.abs(equivalentPercentage)) {
            const valor = allCoordY.current[i];
            relativeAnimPercentage.current = 100;
            break;
          } else if (allCoordY.current[i] < Math.abs(equivalentPercentage) && allCoordY.current[i + 1] > Math.abs(equivalentPercentage)) {
            const valor = allCoordY.current[i + 1];
            relativeAnimPercentage.current = (equivalentPercentage * 100) / valor;
            break;
          }
        }
      }

     
    }
  };
useEffect(() => {
    if (isSmallScreen) {
      window.addEventListener('scroll', changeScrollbarColor);
      return () => window.removeEventListener('scroll', changeScrollbarColor);
    }
  }, []);

  const changeScrollbarColor = () => {
    console.log(projectsRef.current.getBoundingClientRect().top);
    if (navRef.current.getBoundingClientRect().top<=0 && navRef.current.getBoundingClientRect().bottom > 0) {
      scrollbar.current.style.backgroundColor = '#A5A1FF';
    } else if (headerRef.current.getBoundingClientRect().top<=0 && headerRef.current.getBoundingClientRect().bottom > 0) {
      scrollbar.current.style.backgroundColor = '#FFAED8';
    } else if (projectsRef.current.getBoundingClientRect().top<=0 && projectsRef.current.getBoundingClientRect().bottom > 0) {
      scrollbar.current.style.backgroundColor = '';
    } else if (servicesRef.current.getBoundingClientRect().top<=0 && servicesRef.current.getBoundingClientRect().bottom > 0) {
      scrollbar.current.style.backgroundColor = '#78F3E2';
    } else if (whoamiRef.current.getBoundingClientRect().top<=0 && whoamiRef.current.getBoundingClientRect().bottom > 0) {
      scrollbar.current.style.backgroundColor = '#A5A1FF';
    }
  };




<div ref={scrollbarWrapper} id="scrollbar-wrapper" className='fixed right-0 top-0 h-[30px] lg:h-full w-full  lg:w-[30px] bg-transparent lg:bg-slate-50 z-10'>
        <div id="scrollbar-wrapper2" className='h-full w-full z-20 relative flex items-center lg:items-start'>
          <div className='hidden lg:flex flex-row lg:flex-col w-full justify-end lg:justify-center lg:items-center absolute text-sm font-mono' >
            <span>C</span>
            <span>r</span>
            <span>e</span>
            <span>a</span>
            <span>t</span>
            <span>e</span>
            <span>d</span>
            <br></br>
            <span>b</span>
            <span>y</span>
            <br></br>
            <span>Á</span>
            <span>l</span>
            <span>v</span>
            <span>a</span>
            <span>r</span>
            <span>o</span>
          </div >
          <div ref={scrollbar} id="scrollbar" className='cursor-pointer h-[15px] lg:h-[100px] lg:mx-auto w-[100px] lg:w-[15px] bg-[#A5A1FF] lg:bg-[#1B1B1F] z-30 duration-700 transform ease-out lg:duration-700 lg:hover:bg-zinc-600 rounded-xl'></div>
        </div>
      </div>*/

export default App;
