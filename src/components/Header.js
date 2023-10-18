import React, { useEffect, useRef, useState } from "react";
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { IoIosContact } from 'react-icons/io';
import { HiIdentification } from 'react-icons/hi';
import { TfiArrowDown } from 'react-icons/tfi';
import { FaMobile } from 'react-icons/fa';
import shape1 from '../assets/img/shape-1.svg';
import shape2 from '../assets/img/shape-2.svg';
import shape3 from '../assets/img/shape-3.svg';
import { IoMdMailUnread } from 'react-icons/io';
import { BrowserRouter, Link } from "react-router-dom";

const Header = () => {
    const [actualLink, setActualLink] = useState(0);
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
        ['services-link', 'Ver mis servicios', <TfiArrowDown className="order-0 md:order-1 text-3xl lg:text-4xl" />, 'Especializado en React.', 'mywho'],
        ['projects-link', 'Proyectos', <AiOutlineFundProjectionScreen className="order-0 md:order-1 text-3xl lg:text-4xl" />, 'Algunos de mis proyectos. ', 'my-work'],
        ['contact-link', 'Contáctame', <IoMdMailUnread className="order-0 md:order-1 text-3xl lg:text-4xl" />, ' ¿Quieres hablar de negocios? !Contacta conmigo! '],
        ['about-link', 'Sobre mí', <HiIdentification className="order-0 md:order-1 text-3xl lg:text-4xl" />, 'Aprende más sobre mí. ']
    ];

    const hideText = (e) => {
        //ejecutamos solo si la pantalla es mayor a x px
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
    }

    const showText = (e) => {
        if (window.innerWidth >= 1024) {
            servicesLink.current.classList.remove('carrousel--hidden');
            if (e.currentTarget == servicesLink.current) {
                //servicesLink.current.classList.toggle('carrousel--hidden');
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
    }


    return (
        <BrowserRouter>
            <header className="header">
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
                            generalClass = 'rounded-full lg:rounded-3xl h-[calc(50vw-6px)] sm:h-[220px] lg:h-full';//h-[calc(50vw-5px)] md:h-[170px]
                            fontsizeClass = 'text-[2rem]';
                            flexClass = 'flex flex-col lg:flex-row justify-center lg:justify-between gap-3 items-center lg:items-end';
                            displayClass = 'hidden md:flex';
                            fraseFontSizeClass = "text-7xl";
                            carrouselInvisible = "carrousel carrousel--hidden";
                            frasePaddingClass = 'px-15';
                        }
                        if (link[0] === 'contact-link') {
                            generalClass = 'rounded-[48px] h-[calc(50vw-6px)] sm:h-[220px] lg:h-full';//h-[calc(50vw-5px)] md:h-[170px]
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
                            <div
                                ref={
                                    (link[0] == 'projects-link')
                                        ? projectsLink
                                        : (link[0] == 'contact-link')
                                            ? contactLink
                                            : (link[0] == 'about-link')
                                                ? aboutMeLink
                                                : servicesLink
                                }
                                key={`div-${index}`} className={`${carrouselInvisible} container--header ${link[0]} ${generalClass}`} onMouseOver={(e) => hideText(e)} onMouseOut={(e) => showText(e)}>
                                <Link to={`#${link[4]}`} className="flex flex-col items-end h-full ">

                                    {
                                        (link[0] === 'services-link')
                                            ? (
                                                <div className={`w-full flex flex-row justify-between items-center pt-[30px] pb-[30px] pl-[40px] pr-[40px]`}>

                                                    <span className="">ÁLVARO T A</span>
                                                    <FaMobile className="text-4xl" />
                                                </div>
                                            )
                                            : ''
                                    }
                                    <div className={`header__card w-full ${flexClass} pt-[30px] pb-[30px] pl-[40px] pr-[40px]`}>
                                        <span ref={spanRef} className="order-1 md:order-0">{link[1]}</span>
                                        <div ref={iconRef}>
                                            {
                                                link[2]
                                            }
                                        </div>
                                        {
                                            (link[0] === 'services-link')
                                                ? (
                                                    <div className="header__shape">
                                                        <div>
                                                            <div className="quarter-circle quarter-circle--1 bg-[#313879]"></div>
                                                            <div className="quarter-circle quarter-circle--2 bg-[#313879]"></div>
                                                            <div className="quarter-circle quarter-circle--3 bg-[#313879]"></div>
                                                            <div className="quarter-circle quarter-circle--4 bg-[#313879]"></div>
                                                        </div>
                                                    </div>
                                                )
                                                : ''
                                        }
                                    </div>
                                </Link>
                                <p className={`frase ${frasePaddingClass} ${fraseFontSizeClass} ${fraseColorClass} font-black`} >{link[3]}</p>
                                <p className={`frase ${frasePaddingClass} ${fraseFontSizeClass} ${fraseColorClass} font-black`}>{link[3]}</p>
                            </div>
                        );
                    })
                }
            </header>
        </BrowserRouter>
    );
}
export default Header;