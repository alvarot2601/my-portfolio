import React, { useEffect, useRef, useState } from "react";
import {AiOutlineFundProjectionScreen} from 'react-icons/ai';
import {IoIosContact} from 'react-icons/io';
import {HiIdentification} from 'react-icons/hi';
import {TfiArrowDown} from 'react-icons/tfi';
import {FaMobile} from 'react-icons/fa';
import shape1 from '../assets/img/shape-1.svg';
import shape2 from '../assets/img/shape-2.svg';
import shape3 from '../assets/img/shape-3.svg';
import {IoMdMailUnread} from 'react-icons/io';
import { BrowserRouter, Link } from "react-router-dom";

const Header = () => {
    const [actualLink, setActualLink] = useState(0);
    const info = [
        ['services-link', 'Ver mis servicios', <TfiArrowDown className="order-0 md:order-1 text-3xl lg:text-4xl"/>, 'Especializado en React.', 'mywho'],
        ['projects-link', 'Proyectos', <AiOutlineFundProjectionScreen className="order-0 md:order-1 text-3xl lg:text-4xl"/>, 'Algunos de mis proyectos. ','my-work'],
        ['contact-link', 'Contáctame', <IoMdMailUnread className="order-0 md:order-1 text-3xl lg:text-4xl"/>, ' ¿Quieres hablar de negocios? !Contacta conmigo! '],
        ['about-link', 'Sobre mí', <HiIdentification className="order-0 md:order-1 text-3xl lg:text-4xl"/>, 'Aprende más sobre mí. ']
    ];

    const hideText = (e) => {
        const parent = document.querySelector('.services-link');
        if(!e.target.classList.contains('services-link') && !parent.contains(e.target)){
            document.querySelector('.marque-animation--hidden').style.visibility = "hidden";
            document.querySelector('.marque-animation--hidden').style.animation = "show 0.5s linear";
            document.getElementsByClassName('marque-animation--hidden')[1].style.visibility = "hidden";
            document.getElementsByClassName('marque-animation--hidden')[1].style.animation = "show 0.5s linear";
        }
    }

    const showText = () => {
        document.querySelector('.marque-animation--hidden').style.animation = "hide 0.5s linear";
        document.querySelector('.marque-animation--hidden').style.visibility = "visible";
        document.getElementsByClassName('marque-animation--hidden')[1].style.animation = "hide 0.5s linear";
        document.getElementsByClassName('marque-animation--hidden')[1].style.visibility = "visible";
    }


    return (
        <BrowserRouter>
            <header className="header">
                {
                    info.map((link, index) => {
                        let animationClass = '';
                        let displayClass = 'flex';
                        
                        if(link[0] === 'services-link'){
                            animationClass = ' marque-animation--hidden';
                        }
                        let generalClass = 'rounded-[48px] min-h-[400px]';
                        let fontsizeClass = 'text-5xl';
                        let flexClass = 'flex flex-row justify-between items-end ';    
                        if(link[0]==='projects-link' || link[0]==='contact-link' || link[0]==='about-link'){
                            generalClass = 'rounded-full lg:rounded-3xl h-[calc(50vw-6px)] sm:h-[220px] lg:h-full';//h-[calc(50vw-5px)] md:h-[170px]
                            fontsizeClass = 'text-[2rem]';
                            flexClass = 'flex flex-col lg:flex-row justify-center lg:justify-between gap-3 items-center lg:items-end';
                            displayClass = 'hidden md:flex';
                        }
                        if(link[0] === 'contact-link'){
                            generalClass = 'rounded-[48px] h-[calc(50vw-6px)] sm:h-[220px] lg:h-full';//h-[calc(50vw-5px)] md:h-[170px]
                        }
                        
                        return (
                            <div key={`div-${index}`} className={`container--header ${link[0]} ${generalClass}`} onMouseOver={(e) => hideText(e)} onMouseOut = {showText}>
                                <Link to={`#${link[4]}`} className="flex flex-col items-end h-full">
                                    {
                                        (link[0] === 'services-link') 
                                        ? (
                                            <div className={`w-full flex flex-row justify-between items-center pt-[30px] pb-[30px] pl-[40px] pr-[40px]`}>
                                                
                                                <span className="">ÁLVARO T A</span>
                                                <FaMobile className="text-4xl"/>
                                            </div>
                                        )
                                        : ''    
                                    }
                                    <div className={`header__card w-full ${flexClass} pt-[30px] pb-[30px] pl-[40px] pr-[40px]`}>
                                        
                                        <span className="order-1 md:order-0">{link[1]}</span>
                                        {
                                            link[2]
                                        }
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
                                    <div className={`marquee-animation ${animationClass} ${fontsizeClass} ${displayClass}`}>
                                        <p>{link[3]}</p>
                                    </div>
                                    <div className={`marquee-animation marquee-animation--2 ${animationClass} ${fontsizeClass} ${displayClass}`}>
                                        <p>{link[3]}</p>
                                    </div>
                                </Link>
                            </div>
                        );
                    })
                }
        </header>
       </BrowserRouter>
    );
}
export default Header;