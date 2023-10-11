import { React, Suspense, lazy, useEffect, useReducer, useRef, useState } from 'react';

import Header from './components/Header';
import Nav from './components/Nav';
//import Projects from './components/Projects';
import WhoAmI from './components/WhoAmI';
import Services from './components/Services';
//import Footer from './components/Footer';

//cant use lazy in services and whoami because page doesnt scroll


import './App.css';
import './styles/css/styles.css';
import { debounce, initialLimit, finalLimit, delay, debounce2 } from './components/Functions';
import { px } from 'framer-motion';
import userEvent from '@testing-library/user-event';

const Contact = lazy(() => import('./components/Contact'));
const Projects = lazy(() => import('./components/Projects'));
//const Services = lazy(()=>import('./components/Services'));
//const WhoAmI = lazy(()=>import('./components/WhoAmI'));
const Footer = lazy(() => import('./components/Footer'));


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
  //altura real del contenedor de la barra de scroll
  const realScrollWrapperHeight = window.innerHeight - scrollBarHeight;
  //asignamos al cargar la pagina el height del wrapper de la scrollbar
  const scrollbarWrapper = useRef(null);
  const TIMES_TO_REACH = 25;
  const [relativePercentage, setRelativePercentage] = useState((window.innerHeight - scrollBarHeight) / TIMES_TO_REACH);
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
  const [isScrolling, setIsScrolling] = useState(false);
  const [coordY, setCoordY] = useState(0);

  //estado para almacenar e.wheeldelta y poder pasarselo a otros componentes
  const [wheelDelta, setWheelDelta] = useState(null);
  const [lastWheelDelta, setLastWheelDelta] = useState(0);
  //funcion para setear algunas variables que se necesitan setear cuando el dom cargue y para que despues se pueda aplicar la funcion cleanup de los useeffect
  const setInitialStates = () => {
    finalLimit.current = document.body.scrollHeight;
    //setFinalLimit(document.body.scrollHeight);
    scrollbarWrapper.current.style.height = window.innerHeight + "px";
    pxPerScroll.current = (document.body.scrollHeight - window.innerHeight) / TIMES_TO_REACH;
    continueScrollingRef.current = false;
    scrollbarDifference.current = true;
    lastCoordY.current = 0;
    allCoordY.current = [0, pxPerScroll.current, pxPerScroll.current*2, pxPerScroll.current*3, pxPerScroll.current*4, pxPerScroll.current*5, pxPerScroll.current*6, pxPerScroll.current*7, pxPerScroll.current*8,pxPerScroll.current*9, pxPerScroll.current*10, pxPerScroll.current*11, pxPerScroll.current*12,pxPerScroll.current*13, pxPerScroll.current*14, pxPerScroll.current*15, pxPerScroll.current*16, pxPerScroll.current*16, pxPerScroll.current*17, pxPerScroll.current*18, pxPerScroll.current*19, pxPerScroll.current*20];
    relativeAnimPercentage.current = 100;  
    mousemoveExecutions.current = 0;
    relativeScrolledValueRef.current = 0;//falta añadir en el keyhandler
}

 
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
      if(mousemoveExecutions.current % 2 != 0 || mousemoveExecutions.current === 1) return;
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
        relativeAnimPercentage.current = 100;
        //scroll.current.style.transform = "translateY(" + ((finalLimit - window.innerHeight) * -1) + "px)";
      } else if (positionScrollbar < scrollbarStartLimit) {
        
        positionScrollbar = scrollbarStartLimit;
        setRelativeScrolledValueState(positionScrollbar);
        setCoordY(0);
        relativeAnimPercentage.current = 100;
        //scroll.current.style.transform = "translateY(0px)";
      } else {
        //alert(3)
        //percentage = variable para calcular el porcentaje relativo entre la distancia recorrida por la barra de scroll y el contenido de la web
        let percentage;
        if(scrollbar.current.getBoundingClientRect().top===0){
          percentage = -(1 * 100) / realScrollWrapperHeight;
        }else{
          percentage = (scrollbar.current.getBoundingClientRect().top * 100) / realScrollWrapperHeight;
        }
        
        const equivalentPercentage = -((percentage * (finalLimit.current - window.innerHeight)) / 100);
        setCoordY(equivalentPercentage);
        setRelativeScrolledValueState(positionScrollbar);
        var value ;
        for(let i=0;i<allCoordY.current.length-1;i++){
          if(allCoordY.current[i] === Math.abs(equivalentPercentage)){
            let valor = allCoordY.current[i];
            relativeAnimPercentage.current = 100;
            break;
          }else if(allCoordY.current[i] < Math.abs(equivalentPercentage) && allCoordY.current[i+1] > Math.abs(equivalentPercentage)){
            let valor = allCoordY.current[i+1];
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
      relativeScrolledValue += relativePercentage;
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
      relativeScrolledValue -= relativePercentage;
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
    setRelativeScrolledValueState(relativeScrolledValue);
  }, delay);


  const cancelScroll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }



  /*useEffect(() => {
    scroll.current.addEventListener('mousewheel', cancelScroll)
    return () => scroll.removeEventListener('mousewheel', cancelScroll);
  }, []);

  useEffect(() => {
    scroll.current.addEventListener('DOMMouseScroll', cancelScroll)
    return () => scroll.removeEventListener('DOMMouseScroll', cancelScroll);
  }, []);

  useEffect(() => {
    scroll.current.addEventListener('wheel', cancelScroll)
    return () => scroll.removeEventListener('wheel', cancelScroll);
  }, []);*/

  useEffect(() => {
   if(clientY.current > clientY2.current){
      //alert('mayor')
      mousemoveExecutions.current = 1;
    }else if(clientY.current < clientY2.current){
      mousemoveExecutions.current = 1;
      //alert('menor')
    }else if(clientY.current == clientY2.current){
      //alert('igual')
    }
  }, [clientY.current]);

  useEffect(() => {
    window.addEventListener('load', setInitialStates)
    return () => window.removeEventListener('load', setInitialStates);
  }, []);

  useEffect(() => {
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
  }, []);





  useEffect(() => {

    //para eliminar el smooth scroll en pantallas que no pertenezcan a pc
    if (window.innerWidth >= 768) {
      document.body.addEventListener("wheel", smooth);
      return () => document.body.removeEventListener("wheel", smooth);
    }
  });

  useEffect(() => {
    scroll.current.style.transform = "translateY(" + coordY + "px)";
    scrollbar.current.style.transform = "translateY(" + relativeScrolledValueState + "px)";
    if(lastCoordY.current < relativeScrolledValueState){
      setWheelDelta(-150);
      lastCoordY.current = relativeScrolledValueState;
    }else if(lastCoordY.current > relativeScrolledValueState){
      setWheelDelta(150);
      lastCoordY.current = relativeScrolledValueState;
    }
    console.log('coordY, ' + coordY)
  }, [coordY, relativeScrolledValueState]);

  const resize = ()=>{
    finalLimit.current = document.body.scrollHeight;
    pxPerScroll.current = (document.body.scrollHeight - window.innerHeight) / TIMES_TO_REACH;
    scrollbarWrapper.current.style.height = document.body.scrollHeight + 'px';
    //relativePercentage = (windowHeight - scrollBarHeight) / TIMES_TO_REACH;
    setRelativePercentage((document.body.innerHeight - scrollBarHeight) / TIMES_TO_REACH);
  }
  useEffect(()=>{
    window.addEventListener("resize",resize);
    return ()=> window.removeEventListener("resize", resize);
  }, []);
 

  const keydownHandle = (e)=>{
    
    if(e.keyCode=== 40){//abajo
      if(Math.abs(coordYref.current - pxPerScroll.current) > finalLimit.current - window.innerHeight){
        coordYref.current = - (finalLimit.current - window.innerHeight);
      }else{
        coordYref.current -= pxPerScroll.current;
      }
      
      setCoordY(coordYref.current);
      setWheelDelta(-150);
    }else if(e.keyCode === 38){
      
      if(coordYref.current + pxPerScroll.current > 0){
        
        coordYref.current = 0;
      }else{
        coordYref.current += pxPerScroll.current;
      }
      setCoordY(coordYref.current);
      setWheelDelta(150);
    }
  }
  useEffect(()=>{
      window.addEventListener("keydown", keydownHandle);
      return ()=> window.addEventListener("keydown", keydownHandle);
  }, []);
  //añado div que contenga a todos los elementos para meterle el smooth scroll
  return (
    <div>
      <div className='smooth-scroll-wrapper relative w-full md:w-[calc(100%-30px)]' ref={scroll}>
        <div className='content '>
          <Nav coordY={coordY} wheelDelta={wheelDelta} pxPerScroll={pxPerScroll.current} relativeAnimPercentage={relativeAnimPercentage.current} movedByScroll={movedByScroll} mousemoveExecutions={mousemoveExecutions.current}/>
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
            <Services coordY={coordY} wheelDelta={wheelDelta} pxPerScroll={pxPerScroll.current} />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <Projects />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <WhoAmI coordY={coordY} wheelDelta={wheelDelta} pxPerScroll={pxPerScroll.current} />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <Contact coordY={coordY} reachedLimitBottom={reachedLimitBottom} wheelDelta={wheelDelta} pxPerScroll={pxPerScroll.current} />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <Footer />
          </Suspense>
        </div>
      </div>
      <div ref={scrollbarWrapper} id="scrollbar-wrapper" className=' fixed right-0 top-0 h-full hidden md:block w-[30px] bg-slate-50 z-10'>

        <div id="scrollbar-wrapper2" className='h-full w-full z-20 relative'>
          <div className='flex flex-col w-full justify-center items-center absolute text-sm font-mono' >
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
          <div ref={scrollbar} id="scrollbar" className='cursor-pointer h-[100px] mx-auto w-[15px] bg-[#1B1B1F] z-30 transform ease-out duration-700 hover:bg-zinc-600 rounded-xl'></div>
        </div>
      </div>
    </div>
  );
}

export default App;
