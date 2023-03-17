import {React, Suspense, lazy} from 'react';

import Header from './components/Header';
import Nav from './components/Nav';
//import Projects from './components/Projects';
import WhoAmI from './components/WhoAmI';
import Services from './components/Services';
//import Footer from './components/Footer';

//cant use lazy in services and whoami because page doesnt scroll


import './App.css';
import './styles/css/styles.css';
const Contact = lazy(()=>import('./components/Contact'));
const Projects = lazy(()=>import('./components/Projects'));
//const Services = lazy(()=>import('./components/Services'));
//const WhoAmI = lazy(()=>import('./components/WhoAmI'));
const Footer = lazy(()=>import('./components/Footer'));

function App() {

  //añado div que contenga a todos los elementos para meterle el smooth scroll
  return (
    <div className='smooth-scroll-wrapper'>
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
