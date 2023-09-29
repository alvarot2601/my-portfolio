import {React, Suspense, lazy, useEffect, useRef, useState} from 'react';

import Header from './components/Header';
import Nav from './components/Nav';
//import Projects from './components/Projects';
import WhoAmI from './components/WhoAmI';
import Services from './components/Services';
//import Footer from './components/Footer';

//cant use lazy in services and whoami because page doesnt scroll


import './App.css';
import './styles/css/styles.css';
import { debounce, initialLimit, finalLimit, pxPerScroll, delay } from './components/Functions';

const Contact = lazy(()=>import('./components/Contact'));
const Projects = lazy(()=>import('./components/Projects'));
//const Services = lazy(()=>import('./components/Services'));
//const WhoAmI = lazy(()=>import('./components/WhoAmI'));
const Footer = lazy(()=>import('./components/Footer'));
function App() {
  const [reachedLimitBottom, setReachedLimitBottom] = useState(false);
  const [finalLimit, setFinalLimit] = useState(0);
  const scroll = useRef(null);
  let y = 0;
  //funcion para setear algunas variables que se necesitan setear cuando el dom cargue y para que despues se pueda aplicar la funcion cleanup de los useeffect
  const setInitialStates = ()=>{
    setFinalLimit(document.body.scrollHeight);
  }
  useEffect(()=>{
    window.addEventListener('load', setInitialStates)
    return () => window.removeEventListener('load', setInitialStates);
  }, []);
  useEffect(()=>{
    const smooth = debounce((e) => {
    console.log('e.wheelDelta', e.wheelDelta)
    console.log('y', y)
    console.log('initialLimit', initialLimit)
    console.log('(Math.abs(y) + window.innerHeight)', (Math.abs(y) + window.innerHeight))
    console.log('finalLimit', finalLimit)
      if (e.wheelDelta < 0 && y <= initialLimit && (Math.abs(y) + window.innerHeight) < finalLimit) {
        y -= pxPerScroll;
        if ((Math.abs(y) + window.innerHeight) > finalLimit) {
          //y += pxPerScroll;
          //aqui dentro no asigno valor a la i ya que dejaría de ser múltiplo de 10 o 100, por eso al translate le sumo y + la diferencia
          const yAux = (finalLimit - window.innerHeight);
          scroll.current.style.transform = "translateY(" + (-yAux) + "px)";
          setReachedLimitBottom(true);
          return null;
        }
      } else if (e.wheelDelta > 0 && Math.abs(y) < finalLimit && y < 0) {
        console.log('entraaaaaaa');
        y += pxPerScroll;
        if (y > initialLimit) {
          y = 0;
        }
        setReachedLimitBottom(false);
      }
      if(!reachedLimitBottom)
        scroll.current.style.transform = "translateY(" + y + "px)";
       
    }, delay);
    //para eliminar el smooth scroll en pantallas que no pertenezcan a pc
    if(window.innerWidth >= 768) {
      document.body.addEventListener("wheel", smooth);
    }
  }, [finalLimit]);
  //añado div que contenga a todos los elementos para meterle el smooth scroll
  return (
    <div className='smooth-scroll-wrapper' ref={scroll}>
      <div className='content'>
        <Nav/>
        <Header/>
        <Suspense fallback={<div>Loading...</div>}>
          <Services/>
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Projects/>
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <WhoAmI/>
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Contact/>
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Footer/>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
