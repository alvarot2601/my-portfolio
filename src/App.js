import { React, useEffect, useRef, useState } from 'react';

import Header from './components/Header';
import Nav from './components/Nav';
import WhoAmI from './components/WhoAmI';
import Services from './components/Services';



import './App.css';
import './styles/css/styles.css';
import {initialLimit, delay, debounce2 } from './components/Functions';
import Contact from './components/Contact';
import Projects from './components/Projects';
import Footer from './components/Footer';


function App() {
  //variables para el evento de teclado
  const coordYref = useRef(null);
  const relativeScrolledValueRef = useRef(null);


  //variables para almacenar y comparar los e.clientY para saber si sube o baja
  const clientY = useRef(null);
  const clientY2 = useRef(null);
  const mousemoveExecutions = useRef(null);
  //variable que se le pasa a los hijos para saber si coordY está variando debido al evento wheel o debido al movimiento de mi barra de scroll
  const [movedByScroll, setMovedByScroll] = useState(false);
  //variable para almacenar cada una de las coordenadas correspondientes a cada scrolleo, si no se ha hecho scroll debe ser 0, si se ha hecho un scroll debe ser pxperscroll * 1 y asi sucesivamente hasta llegar a TIMES_TO_REACH
  const allCoordY = useRef(null);
  //variable para obtener el porcentaje equivalente para los valores de las animaciones
  const relativeAnimPercentage = useRef(null);
  let timer;
  //variables relacionadas con la barra de scroll
  const scrollbar = useRef(null);
  //variable que almacena la altura de la barra de scroll
  const scrollBarHeight = 100;
  const scrollbarWidth = 100;
  //altura real del contenedor de la barra de scroll
  const realScrollWrapperHeight = window.innerHeight - scrollBarHeight;
  //asignamos al cargar la pagina el height del wrapper de la scrollbar
  const scrollbarWrapper = useRef(null);
  //almacena el numero de scrolleos necesarios para llegar al final de la pagina
  const times_to_reach = useRef(null) //44;
  const relativePercentage = useRef(null);//(window.innerHeight - scrollBarHeight) / TIMES_TO_REACH.current
  //variable para controlar si está pulsado la scrollbar
  const [continueScrolling, setContinueScrolling] = useState(false);
  const continueScrollingRef = useRef(null);

  //variable para que al pulsar sobre la scrollbar no se pongan en paralelo en las misma coordenada Y que el raton
  const scrollbarDifference = useRef(null);
  //const [scrollbarDifference, setScrollbarDifference] = useState(0);
  const pxPerScroll = useRef(null);

  const [relativeScrolledValueState, setRelativeScrolledValueState] = useState(0);
  let relativeScrolledValue = 0;
  //variables para almacenar las coordenadas del inicio y fin del scroll al pulsar sobre la scrollbar. Almacena la coordenada y desde que se pulsa el raton hasta que se suelta
  const [startCoordinates, setStartCoordinates] = useState(0);
  const [endCoordinates, setEndCoordinates] = useState(0);
  //variable encargada de definir la minima coordenada a la que puede acceder la barra de scroll
  const scrollbarStartLimit = 0;
  //variable encargada de definir la mayor coordenada a la que puede acceder la barra de scroll
  const scrollbarEndLimit = realScrollWrapperHeight;

  const [equivalentPercentage, setEquivalentPercentage] = useState(null);
  //variable para utilizar dentro de getActualCoordinates para guardar el ultimo valor de la coordenada y saber si se va hacia arriba o hacia abajo para setear wheelDelta y poder enviarselo a otros componentes para las animaciones que lo usan
  const lastCoordY = useRef(null);
  const [reachedLimitBottom, setReachedLimitBottom] = useState(false);
  //const [finalLimit, setFinalLimit] = useState(0);
  const finalLimit = useRef(null);
  const scroll = useRef(null);
  const [coordY, setCoordY] = useState(0);

  //estado para almacenar e.wheeldelta y poder pasarselo a otros componentes
  const [wheelDelta, setWheelDelta] = useState(null);
  const [lastWheelDelta, setLastWheelDelta] = useState(0);
  //estado para saber si la pantalla es inferior a 768px o no
  const [isSmallScreen, setIsSmallScreen] = useState(true);
  //funcion para setear algunas variables que se necesitan setear cuando el dom cargue y para que despues se pueda aplicar la funcion cleanup de los useeffect
  const setInitialStates = () => {
    if(window.innerWidth >= 768){
      setIsSmallScreen(false);
      const today = new Date();
      alert("Hacer scroll está deshabilitado. Para poder navegar debes pulsar sobre las fechas del teclado o con la rueda del ratón. A día de hoy (" + today.getDate() + "/" + parseInt(today.getMonth() + 1) + "/" + today.getFullYear() + ") sigo actualizando y mejorando mi portfolio, por lo que si encuentras algún fallo|mejora no dudes en contactar conmigo." );
    }
    finalLimit.current = document.body.scrollHeight;
    /*setTimeout(()=>{
      if(finalLimit.current !== document.body.scrollHeight){
        finalLimit.current = document.body.scrollHeight;
        //alert(4)
      } 
    }, 500);*/
    //setFinalLimit(document.body.scrollHeight);
    //scrollbarWrapper.current.style.height = window.innerHeight + "px";
    pxPerScroll.current = 150//(document.body.scrollHeight - window.innerHeight) / TIMES_TO_REACH;
    continueScrollingRef.current = false;
    scrollbarDifference.current = true;
    lastCoordY.current = 0;
    allCoordY.current = [0, pxPerScroll.current, pxPerScroll.current * 2, pxPerScroll.current * 3, pxPerScroll.current * 4, pxPerScroll.current * 5, pxPerScroll.current * 6, pxPerScroll.current * 7, pxPerScroll.current * 8, pxPerScroll.current * 9, pxPerScroll.current * 10, pxPerScroll.current * 11, pxPerScroll.current * 12, pxPerScroll.current * 13, pxPerScroll.current * 14, pxPerScroll.current * 15, pxPerScroll.current * 16, pxPerScroll.current * 16, pxPerScroll.current * 17, pxPerScroll.current * 18, pxPerScroll.current * 19, pxPerScroll.current * 20];
    relativeAnimPercentage.current = 100;//%  
    mousemoveExecutions.current = 0;
    relativeScrolledValueRef.current = 0;//falta añadir en el keyhandler
    times_to_reach.current = (finalLimit.current - window.innerHeight) / pxPerScroll.current;
    relativePercentage.current = (window.innerHeight - (scrollBarHeight)) / times_to_reach.current;
  }

  useEffect(()=>{
    if(isSmallScreen){
      scrollbarWrapper.current.style.height = "30px";
    }else{
      scrollbarWrapper.current.style.height = window.innerHeight + "px";
    }
  }, [isSmallScreen]);

  const getStartCoordinates = (e) => {
    //continueScrolling = true;
    setContinueScrolling(true);
    continueScrollingRef.current = true;
    //startCoordinates = e.clientY;
    setStartCoordinates(e.clientY);
    scrollbarDifference.current = (parseInt(e.clientY) - parseInt(scrollbar.current.getBoundingClientRect().top));
    lastCoordY.current = e.clientY;
    coordYref.current = 0;
    //setScrollbarDifference(parseInt(e.clientY) - parseInt(scrollbar.current.getBoundingClientRect().top));
    //scrollbarDifference = parseInt(e.clientY) - parseInt(scrollbar.getBoundingClientRect().top);
  }
  const getEndCoordinates = (e) => {

    setEndCoordinates(e.clientY);
    //endCoordinates = e.clientY;
    //continueScrolling = false;
    continueScrollingRef.current = false;
    setContinueScrolling(false);
    lastCoordY.current = e.clientY;
  }

  const getActualCoordinates = (e) => {

    const currentY = e.clientY;


    if (continueScrollingRef.current === true) {
      //alert(2)
      mousemoveExecutions.current += 1;
      setMovedByScroll(true);
      clientY.current = e.clientY;
      //alert('entra1')
      if (mousemoveExecutions.current % 2 != 0 || mousemoveExecutions.current === 1) return;
      //alert('entra2')
      clientY2.current = e.clientY;
      let positionScrollbar = 0;
      //scrollbar.current.style.transitionProperty = "none";
      //scroll.current.style.transitionProperty = "none";
      positionScrollbar = (parseInt(e.clientY) - scrollbarDifference.current);
      //realizo las comprobaciones pertinentes
      if (positionScrollbar > scrollbarEndLimit) {
        positionScrollbar = scrollbarEndLimit;
        setRelativeScrolledValueState(positionScrollbar);
        setCoordY(-(finalLimit.current - window.innerHeight));
        coordYref.current = -(finalLimit.current - window.innerHeight);
        relativeAnimPercentage.current = 100;
        //scroll.current.style.transform = "translateY(" + ((finalLimit - window.innerHeight) * -1) + "px)";
      } else if (positionScrollbar < scrollbarStartLimit) {

        positionScrollbar = scrollbarStartLimit;
        setRelativeScrolledValueState(positionScrollbar);
        setCoordY(0);
        coordYref.current = 0;
        relativeAnimPercentage.current = 100;
        //scroll.current.style.transform = "translateY(0px)";
      } else {
        //alert(3)
        //percentage = variable para calcular el porcentaje relativo entre la distancia recorrida por la barra de scroll y el contenido de la web
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
        var value;
        for (let i = 0; i < allCoordY.current.length - 1; i++) {
          if (allCoordY.current[i] === Math.abs(equivalentPercentage)) {
            let valor = allCoordY.current[i];
            relativeAnimPercentage.current = 100;
            break;
          } else if (allCoordY.current[i] < Math.abs(equivalentPercentage) && allCoordY.current[i + 1] > Math.abs(equivalentPercentage)) {
            let valor = allCoordY.current[i + 1];
            relativeAnimPercentage.current = (equivalentPercentage * 100) / valor;
            break;
          }
        }
      }

      //scrollbar.current.style.transform = "translateY(" + (positionScrollbar) + "px)";

      //para guardar las coordenadas y utilizarlas a la hora de hacer scroll utilizando la rueda del mouse
      //relativeScrolledValue = scrollbar.current.getBoundingClientRect().top;


      //setEquivalentPercentage(equivalentPercentageVar);
      //setCoordY(y);
    }

  }



  const smooth = debounce2((e) => {
    let y = coordY;
    setMovedByScroll(false);
    let relativeScrolledValue = relativeScrolledValueState;
    if (e.wheelDelta < 0 && y <= initialLimit) {
      //&& (Math.abs(y) + window.innerHeight) < finalLimit
      y -= pxPerScroll.current;
      relativeScrolledValue += relativePercentage.current;
      //setCoordY(coordY - pxPerScroll);
      if ((Math.abs(y) + window.innerHeight) > finalLimit.current) {

        //aqui dentro no asigno valor a la i ya que dejaría de ser múltiplo de 10 o 100, por eso al translate le sumo y + la diferencia
        //setCoordY(finalLimit - window.innerHeight);
        //const yAux = (finalLimit - window.innerHeight);
        //scroll.current.style.transform = "translateY(" + (-yAux) + "px)";
        y = (window.innerHeight - finalLimit.current);
        relativeScrolledValue = window.innerHeight - scrollBarHeight;
        //setReachedLimitBottom(true);
      }
    } else if (e.wheelDelta > 0 && Math.abs(y) < finalLimit.current && y < 0) {

      y += pxPerScroll.current;
      relativeScrolledValue -= relativePercentage.current;
      //setCoordY(coordY + pxPerScroll);
      if (y > initialLimit) {
        y = 0;
        relativeScrolledValue = 0;
        //setCoordY(0);
      }
      //setReachedLimitBottom(false);
    }
    setWheelDelta(e.wheelDelta);
    setCoordY(y);
    coordYref.current = y;
    setRelativeScrolledValueState(relativeScrolledValue);
    relativeScrolledValueRef.current = relativeScrolledValue;
  }, delay);


  const cancelScroll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }




  useEffect(() => {
    if (clientY.current > clientY2.current) {
      //alert('mayor')
      mousemoveExecutions.current = 1;
    } else if (clientY.current < clientY2.current) {
      mousemoveExecutions.current = 1;
      //alert('menor')
    } else if (clientY.current == clientY2.current) {
      //alert('igual')
    }
  }, [clientY.current]);

  useEffect(() => {
    window.addEventListener('load', setInitialStates)
    return () => window.removeEventListener('load', setInitialStates);
  }, []);

  /* useEffect(() => {
     //añado mousemove al object window para que el usuario pueda seguir haciendo scroll sin tener el raton sobre la scrollbar
     window.addEventListener("mousemove", getActualCoordinates);
 
     return () => window.removeEventListener('mousemove', getActualCoordinates);
   }, []);
   useEffect( () => {
     scrollbar.current.addEventListener("mousedown", getStartCoordinates);
     return () => scrollbar.current.removeEventListener('mousedown', getStartCoordinates);
   }, []);
 
 
   useEffect(() => {
     window.addEventListener("mouseup", getEndCoordinates);
     return () => window.removeEventListener('mouseup', getEndCoordinates);
   }, []);*/





  useEffect(() => {
    //para eliminar el smooth scroll en pantallas que no pertenezcan a pc
    if (window.innerWidth >= 768) {
      //alert(window.innerWidth)
      document.body.addEventListener("wheel", smooth);
      return () => document.body.removeEventListener("wheel", smooth);
    }
  });



  useEffect(() => {
    scroll.current.style.transform = "translateY(" + coordY + "px)";
    scrollbar.current.style.transform = "translateY(" + relativeScrolledValueState + "px)";
    if (lastCoordY.current < relativeScrolledValueState) {
      setWheelDelta(-150);
      lastCoordY.current = relativeScrolledValueState;
    } else if (lastCoordY.current > relativeScrolledValueState) {
      setWheelDelta(150);
      lastCoordY.current = relativeScrolledValueState;
    }
    console.log('coordY, ' + coordY)
  }, [coordY, relativeScrolledValueState]);

  const resize = () => {
    finalLimit.current = document.body.scrollHeight;
    pxPerScroll.current = (document.body.scrollHeight - window.innerHeight) / times_to_reach.current;
    scrollbarWrapper.current.style.height = document.body.scrollHeight + 'px';
    //relativePercentage = (windowHeight - scrollBarHeight) / TIMES_TO_REACH;
    relativePercentage.current = (document.body.innerHeight - scrollBarHeight) / times_to_reach.current;
    //setRelativePercentage((document.body.innerHeight - scrollBarHeight) / times_to_reach.current);
  }
  useEffect(() => {
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);


  const keydownHandle = (e) => {
    let relativeScrolledValue = relativeScrolledValueRef.current;
    if (e.keyCode === 40) {//abajo
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
    //alert(relativeScrolledValue)
    //alert(relativeScrolledValueState)
  }
  useEffect(() => {
    if (!isSmallScreen) {
      window.addEventListener("keydown", keydownHandle);
      return () => window.addEventListener("keydown", keydownHandle);
    }
  }, [isSmallScreen]);
  const moveScrollbar = () => {
    const percentage = ((window.scrollY) * 100) / (document.body.scrollHeight - window.innerHeight);
    const relativeValue = (percentage * (window.innerWidth - scrollbarWidth)) / 100;
    scrollbar.current.style.transform = "translateX(" + relativeValue + "px)";
  }
  /*const scrollPage = () => {
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
  });*/
  useEffect(()=>{
    if(isSmallScreen){
      window.addEventListener("scroll", moveScrollbar);
      return ()=> window.removeEventListener("scroll", moveScrollbar);
    }
  }, [isSmallScreen, finalLimit]);
  return (
    <div className=''>
      <div className='smooth-scroll-wrapper relative w-full md:w-[calc(100%-30px)]' ref={scroll}>
        <div className='content px-[8px] flex flex-col gap-[8px]'>
          <Nav coordY={coordY} wheelDelta={wheelDelta} pxPerScroll={pxPerScroll.current} relativeAnimPercentage={relativeAnimPercentage.current} movedByScroll={movedByScroll} mousemoveExecutions={mousemoveExecutions.current} />
          <Header isSmallScreen={isSmallScreen}/>
            <Services isSmallScreen={isSmallScreen} coordY={coordY} wheelDelta={wheelDelta} pxPerScroll={pxPerScroll.current} />
            <Projects />
            <WhoAmI coordY={coordY} wheelDelta={wheelDelta} pxPerScroll={pxPerScroll.current} />
            <Contact coordY={coordY} reachedLimitBottom={reachedLimitBottom} wheelDelta={wheelDelta} pxPerScroll={pxPerScroll.current} />
            <Footer />
        </div>
      </div>
      <div ref={scrollbarWrapper} id="scrollbar-wrapper"  className='fixed-element  h-[30px] md:h-full  sm:block md:block w-full md:w-[30px] bg-transparent md:bg-slate-50 z-10'>
        <div id="scrollbar-wrapper2" className='h-full w-full z-20 relative flex items-center md:items-start'>
          <div className='hidden md:flex flex-row md:flex-col w-full justify-evenly md:justify-center md:items-center absolute text-sm font-mono' >
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
          <div ref={scrollbar} id="scrollbar" className='cursor-pointer h-[15px] md:h-[100px] md:mx-auto w-[100px] md:w-[15px] bg-[#A5A1FF] md:bg-[#1B1B1F] z-30 transform ease-out duration-700 md:hover:bg-zinc-600 rounded-xl'></div>
        </div>
      </div>
    </div>
  );
}

export default App;
