import {React, useEffect, useRef} from "react";
import {MdSupportAgent, MdVisibility} from 'react-icons/md';
import {AiOutlineArrowDown } from 'react-icons/ai';
import {SiAntdesign, SiRedux} from 'react-icons/si';
import {FaLaptopCode, FaReact, FaPhp} from 'react-icons/fa';
import {TbBrandJavascript} from 'react-icons/tb';
//import gsap from "gsap";
//import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
const Services = () => {

    const circleText1 = useRef(null);
    const servicesArray = [
            [
                [<FaLaptopCode/>, 'Elige la tecnología', 'Enfocado en el desarrollo, de principio a fin, de soluciones web a medida, utilizando lenguajes como JS o PHP, frameworks como React y Redux, o a través de algún CMS (Wordpress, Adobe, Craft CMS, etc).'],
                ['Experto en', [<a href="https://es.reactjs.org/" target="_blank" aria-label="Link to React Web Page"><FaReact/></a>,<a href="https://www.php.net/" target="_blank" aria-label="Link to PHP Web Page"><FaPhp/></a>, <a href="https://es.redux.js.org/" target="_blank" aria-label="Link to Redux Web Page"><SiRedux/></a>, <a href="https://developer.mozilla.org/es/docs/Web/JavaScript" target="_blank" aria-label="Link to Javascript Web Page"><TbBrandJavascript/></a>]]
            ],
            [
                [<SiAntdesign/>, 'Diseños personalizados','Amplios conocimientos tanto en la adaptación de diseños ya existentes como en la creación de diseños originales desde sus primeros trazos.'],
                ['Transformando tus proyectos en', 'IDEAS EXCEPCIONALES']
            ],
            [
                [<MdVisibility/>, 'SEO', 'Mayor visibilidad en los buscadores asegurada, obtén una alta puntuación en SEO a través de mi experiencia y mis conocimientos '],
                ['Gracias a mis conocimientos en SEO', 'SERÁS VISTO']
            ],
            [
                [<MdSupportAgent/>,' Asistencia rápida y eficiente', 'Contar con una respuesta ágil y eficiente puede minimizar el impacto negativo de cualquier situación. Por ello, en nuestro compromiso por ofrecer un servicio excepcional, nos aseguramos de que nuestra asistencia sea lo más rápida y oportuna posible.'],
                ['Siempre estaré', 'ENCANTADO DE AYUDARTE']
            ]
    ];
    

    useEffect(()=>{
        circleText1.current.innerHTML = circleText1.current.innerHTML.split("").map((char, i) => {
            return `<span style="transform:rotate(${i * 10}deg)">${char}</span>`;
        })
        .join('');

        //gsap
        /*gsap.registerPlugin(ScrollTrigger);
        

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


    return (
        <section className="services">
            <div className="container services__content">
                <div>
                    <span className="little-title">¿QUÉ HAGO?</span>
                    <p className="services__info">
                        Facilito a mis clientes <br></br> soluciones webs <br></br>desarrolladas a medida<br></br> con habilidad y pasión.
                    </p>
                </div>
                <div className="circle">
                    <AiOutlineArrowDown className="arrow"/>
                    <div className="circle__text-container" id="circle__text-container--1">
                        <p className="circle__text" ref={circleText1}>
                            SERVICIOS | SERVICIOS | SERVICIOS |
                        </p>
                    </div>
                </div>
                {
                    /*
                     * <p className="services__info">
                    We provide clients <br></br> with stunning Crafty web <br></br>solutions, developed <br></br> with skill & passion.
                </p>
                     */
                }
            </div>
            <div className="services__container">
            {
                servicesArray.map((item, index) =>{
                    return (
                        <div className={`services__row services__row_${index}`}>
                             <div className={`services__item services__item--${index} container`}>
                                <div>
                                {
                                    item[0][0]
                                }
                                </div>
                                <div className="services__item-container">
                                    <span className="services__subtitle">
                                        {
                                            item[0][1]
                                        }
                                    </span>
                                    <p className="services__row-info">
                                        {
                                            item[0][2]
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className={`services__item services__item--purple services__item--purple-${index}  container`}>
                                <span>
                                    {
                                        item[1][0]
                                    }
                                </span>
                                    {
                                        typeof item[1][1] ===  'string' ? <span>{item[1][1]}</span>
                                        : <div className="services__icons-container">{item[1][1]}</div>
                                    }
                            </div>
                            <div className="services__extension"></div>
                        </div>
                    );
                })
            }
            </div>
        </section>
    );
}
export default Services;