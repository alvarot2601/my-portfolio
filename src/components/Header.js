import React, { useEffect, useRef, useState } from "react";
import {AiOutlineFundProjectionScreen} from 'react-icons/ai';
import {IoIosContact} from 'react-icons/io';
import {HiIdentification} from 'react-icons/hi';
import {TfiArrowDown} from 'react-icons/tfi';
import shape1 from '../assets/img/shape-1.svg';
import shape2 from '../assets/img/shape-2.svg';
import shape3 from '../assets/img/shape-3.svg';
import {IoMdMailUnread} from 'react-icons/io';
import { BrowserRouter, Link } from "react-router-dom";

const Header = () => {
    const [actualLink, setActualLink] = useState(0);
    const info = [
        ['services-link', 'Ver mis servicios', <TfiArrowDown/>, 'Especializado en React.', 'mywho'],
        ['projects-link', 'Proyectos', <AiOutlineFundProjectionScreen/>, 'Mira algunos de mis proyectos. ','my-work'],
        ['contact-link', 'Contáctame', <IoMdMailUnread/>, '¿Quieres hablar de negocios? !Contacta conmigo! '],
        ['about-link', 'Sobre mí', <HiIdentification/>, 'Aprende más sobre mí. ']
    ];

    const hideText = (e) => {
        const parent = document.querySelector('.services-link');
        if(!e.target.classList.contains('services-link') && !parent.contains(e.target)){
            document.querySelector('.marque-animation--hidden').style.visibility = "hidden";
            document.querySelector('.marque-animation--hidden').style.animation = "show 0.25s linear";
            document.getElementsByClassName('marque-animation--hidden')[1].style.visibility = "hidden";
            document.getElementsByClassName('marque-animation--hidden')[1].style.animation = "show 0.25s linear";
        }
    }

    const showText = () => {
        document.querySelector('.marque-animation--hidden').style.animation = "hide 0.25s linear";
        document.querySelector('.marque-animation--hidden').style.visibility = "visible";
        document.getElementsByClassName('marque-animation--hidden')[1].style.animation = "hide 0.25s linear";
        document.getElementsByClassName('marque-animation--hidden')[1].style.visibility = "visible";
    }


    return (
        <BrowserRouter>
            <header className="header">
                {
                    info.map(link => {
                        let animationClass = '';
                        if(link[0] === 'services-link'){
                            animationClass = ' marque-animation--hidden';
                        }
                        return (
                            <div className={`container--header ${link[0]}`} onMouseOver={(e) => hideText(e)} onMouseOut = {showText}>
                                <Link to={`/my-portfolio#${link[4]}`}>
                                    <div className="header__card">
                                        <span>{link[1]}</span>
                                        {
                                            link[2]
                                        }
                                        {
                                            (link[0] === 'services-link') 
                                            ? (
                                                <div className="header__shape">
                                                    <div>
                                                        <div className="quarter-circle quarter-circle--1"></div>
                                                        <div className="quarter-circle quarter-circle--2"></div>
                                                        <div className="quarter-circle quarter-circle--3"></div>
                                                        <div className="quarter-circle quarter-circle--4"></div>
                                                    </div>
                                                </div>
                                            )
                                            : ''
                                        }
                                    </div>
                                    <div className={`marquee-animation ${animationClass}`}>
                                        <p>{link[3]}</p>
                                    </div>
                                    <div className={`marquee-animation marquee-animation--2 ${animationClass}`}>
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