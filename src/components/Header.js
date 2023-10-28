/* eslint-disable react/prop-types */
import {motion} from 'framer-motion';
import React, { useRef, useEffect } from 'react';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { HiIdentification } from 'react-icons/hi';
import { TfiArrowDown } from 'react-icons/tfi';
import { FaMobile } from 'react-icons/fa';
import { IoMdMailUnread } from 'react-icons/io';

const Header = ({ isSmallScreen, reference }) => {
  const headerRef = useRef(null);
  // igualamos referencia creada en este componente a la q se le paso x props para poder asignar la ref
  useEffect(() => {
    reference.current = headerRef.current;
  }, []);
  const servicesLink = useRef(null);
  const contactLink = useRef(null);
  const aboutMeLink = useRef(null);
  const projectsLink = useRef(null);
  const servicesLinkSpan = useRef(null);
  const contactLinkSpan = useRef(null);
  const aboutMeLinkSpan = useRef(null);
  const projectsLinkSpan = useRef(null);
  const servicesLinkIcon = useRef(null);
  const contactLinkIcon = useRef(null);
  const aboutMeLinkIcon = useRef(null);
  const projectsLinkIcon = useRef(null);
  const info = [
    ['services-link', 'Ver mis servicios', <TfiArrowDown className="order-0 md:order-1 text-3xl lg:text-4xl" />, 'Especializado en React.', 'services'],
    ['projects-link', 'Proyectos', <AiOutlineFundProjectionScreen className="order-0 md:order-1 text-3xl lg:text-4xl" />, 'Algunos de mis proyectos. ', 'projects'],
    ['contact-link', 'Contáctame', <IoMdMailUnread className="order-0 md:order-1 text-3xl lg:text-4xl" />, ' ¿Quieres hablar de negocios? !Contacta conmigo! ', 'contact'],
    ['about-link', 'Sobre mí', <HiIdentification className="order-0 md:order-1 text-3xl lg:text-4xl" />, 'Aprende más sobre mí. ', 'aboutme'],
  ];
  const handleLink = (e) => {
    if (!isSmallScreen) {
      e.preventDefault();
    }
  };


  const hideText = (e) => {
    // ejecutamos solo si la pantalla es mayor a x px
    if (window.innerWidth >= 1024) {
      servicesLink.current.classList.add('carrousel--hidden');
      if (e.currentTarget == servicesLink.current) {
        servicesLink.current.classList.toggle('carrousel--hidden');
      } else if (e.currentTarget == contactLink.current) {
        contactLink.current.classList.toggle('carrousel--hidden');
        contactLinkSpan.current.classList.toggle('invisible');
        contactLinkIcon.current.classList.toggle('invisible');
      } else if (e.currentTarget == aboutMeLink.current) {
        aboutMeLink.current.classList.toggle('carrousel--hidden');
        aboutMeLinkSpan.current.classList.toggle('invisible');
        aboutMeLinkIcon.current.classList.toggle('invisible');
      } else if (e.currentTarget == projectsLink.current) {
        projectsLink.current.classList.toggle('carrousel--hidden');
        projectsLinkSpan.current.classList.toggle('invisible');
        projectsLinkIcon.current.classList.toggle('invisible');
      }
    }
  };

  const showText = (e) => {
    if (window.innerWidth >= 1024) {
      servicesLink.current.classList.remove('carrousel--hidden');
      if (e.currentTarget == servicesLink.current) {
        // servicesLink.current.classList.toggle('carrousel--hidden');
      } else if (e.currentTarget == contactLink.current) {
        contactLink.current.classList.toggle('carrousel--hidden');
        contactLinkSpan.current.classList.toggle('invisible');
        contactLinkIcon.current.classList.toggle('invisible');
      } else if (e.currentTarget == aboutMeLink.current) {
        aboutMeLink.current.classList.toggle('carrousel--hidden');
        aboutMeLinkSpan.current.classList.toggle('invisible');
        aboutMeLinkIcon.current.classList.toggle('invisible');
      } else if (e.currentTarget == projectsLink.current) {
        projectsLink.current.classList.toggle('carrousel--hidden');
        projectsLinkSpan.current.classList.toggle('invisible');
        projectsLinkIcon.current.classList.toggle('invisible');
      }
    }
  };

  const initVariantProjects = {
    translateX: '56vw'
  }
  const variantProjects = {
    translateX: 0,
    transition:{
      duration:1,
      delay:0.9
    }
  }
  const initVariantServices = {
    translateX: "-50vw"
  }
  const variantServices = {
    translateX: 0,
    transition:{
      duration:1
    }
  }
  const variantContact = {
    translateY: 0,
    rotate:0,
   
  }
  const initVariantContact = {
    translateY: 300,
    rotate:10,
    
  }
  const variantAboutMe = {
    translateX: 0,
    transition:{
      duration:1,
      delay:1.8
    }
  }
  const initVariantAboutme = {
    translateX: '29vw',
    transition:{
      duration:1,
      delay:2.7
    }
  }


  return (
    <header ref={headerRef} className="header">
      {
        info.map((link, index) => {
          let displayClass = 'flex';

          let frasePaddingClass = 'px-20';
          let carrouselInvisible = 'carrousel';
          let fraseFontSizeClass = 'text-9xl';
          let fraseColorClass = 'text-slate-900';
          let generalClass = 'rounded-[48px] min-h-[400px]';
          let fontsizeClass = 'text-5xl';
          let flexClass = 'flex flex-row justify-between items-end ';

          if (link[0] === 'projects-link' || link[0] === 'contact-link' || link[0] === 'about-link') {
            generalClass = 'rounded-full lg:rounded-3xl h-[calc(50vw-6px)] sm:h-[220px] lg:h-full';// h-[calc(50vw-5px)] md:h-[170px]
            fontsizeClass = 'text-[2rem]';
            flexClass = 'flex flex-col lg:flex-row justify-center lg:justify-between gap-3 items-center lg:items-end';
            displayClass = 'hidden md:flex';
            fraseFontSizeClass = 'text-7xl';
            carrouselInvisible = 'carrousel carrousel--hidden';
            frasePaddingClass = 'px-15';
          }
          if (link[0] === 'contact-link') {
            generalClass = 'rounded-[48px] h-[calc(50vw-6px)] sm:h-[220px] lg:h-full';// h-[calc(50vw-5px)] md:h-[170px]
          }
          if (link[0] === 'about-link') {
            fraseColorClass = 'text-slate-50';
          }
          let spanRef;
          let iconRef;
          switch (link[0]) {
            case 'projects-link':
              spanRef = projectsLinkSpan;
              iconRef = projectsLinkIcon;
              break;
            case 'contact-link':
              spanRef = contactLinkSpan;
              iconRef = contactLinkIcon;
              break;
            case 'about-link':
              spanRef = aboutMeLinkSpan;
              iconRef = aboutMeLinkIcon;
              break;
            case 'services-link':
              spanRef = servicesLinkSpan;
              iconRef = servicesLinkIcon;
              break;
          }
          return (
            <motion.div
            
              ref={
                (link[0] == 'projects-link') ?
                  projectsLink :
                  (link[0] == 'contact-link') ?
                    contactLink :
                    (link[0] == 'about-link') ?
                      aboutMeLink :
                      servicesLink
              }
              transition={
                link[0] === 'contact-link' ? {
                  translateY: {
                    duration: 1,
                    delay:2.7
                  },
                  rotate: {
                    duration: 0.3,
                    delay: 3.6,
                  }
                }
                : ''
              }
              initial={
                (link[0] == 'projects-link') ?
                  initVariantProjects :
                  (link[0] == 'contact-link') ?
                    initVariantContact :
                    (link[0] == 'about-link') ?
                    initVariantAboutme :
                    initVariantServices
              }
              animate={
                (link[0] == 'projects-link') ?
                  variantProjects :
                  (link[0] == 'contact-link') ?
                    variantContact :
                    (link[0] == 'about-link') ?
                    variantAboutMe :
                    variantServices
              }
              key={`div-${index}`} className={`${carrouselInvisible} container--header ${link[0]} ${generalClass}`} onClick={handleLink} onMouseOver={(e) => hideText(e)} onMouseOut={(e) => showText(e)}>
              <a href={`#${link[4]}`} className="flex flex-col items-end h-full ">
                {
                  (link[0] === 'services-link') ?
                    (
                      <div className={`w-full flex flex-row justify-between items-center pt-[30px] pb-[30px] pl-[40px] pr-[40px]`}>
                        <span className="">ÁLVARO T A</span>
                        <FaMobile className="text-4xl" />
                      </div>
                    ) :
                    ''
                }
                <div className={`header__card w-full ${flexClass} pt-[30px] pb-[30px] pl-[40px] pr-[40px]`}>
                  <span ref={spanRef} className="order-1 md:order-0">{link[1]}</span>
                  <div ref={iconRef}>
                    {
                      link[2]
                    }
                  </div>
                  {
                    (link[0] === 'services-link') ?
                      (
                        <div className="header__shape">
                          <div>
                            <div className="quarter-circle quarter-circle--1 bg-[#313879]"></div>
                            <div className="quarter-circle quarter-circle--2 bg-[#313879]"></div>
                            <div className="quarter-circle quarter-circle--3 bg-[#313879]"></div>
                            <div className="quarter-circle quarter-circle--4 bg-[#313879]"></div>
                          </div>
                        </div>
                      ) :
                      ''
                  }
                </div>
              </a>
              <p className={`frase ${frasePaddingClass} ${fraseFontSizeClass} ${fraseColorClass} font-black`} >{link[3]}</p>
              <p className={`frase ${frasePaddingClass} ${fraseFontSizeClass} ${fraseColorClass} font-black`}>{link[3]}</p>
            </motion.div>
          );
        })
      }
    </header>
  );
};
export default Header;
