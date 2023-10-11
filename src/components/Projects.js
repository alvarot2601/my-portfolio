import React from "react";
import oxygenShop from "../assets/img/eye.svg";
//import unsplashProject from "../assets/img/unsplash-project1.png";
import hotelMirandaProject from "../assets/img/hotel-miranda-logo.svg";
import umediProject from "../assets/img/LOGO-UMEDI.png";
import andelProject from "../assets/img/logo-andel.svg";

import {SiUnsplash} from 'react-icons/si';
import {BsArrowUpRight} from 'react-icons/bs';

const Projects = () => {
    const projects = [
      [
        'unsplash',
        '',
        'React y Redux',
        '',
        'https://alvarot2601.github.io/dashboard-photos',
        'https://github.com/alvarot2601/dashboard-photos',
        'Logo de mi proyecto myPhotoApp',
        'Proyecto terminado'
      ],
        [
          'miranda',
          hotelMirandaProject,
          'html5 Y css',
          '',
          'https://alvarot2601.github.io/Hotel-Miranda',
          'https://github.com/alvarot2601/Hotel-Miranda',
          'Logo de mi proyecto Hotel Miranda',
          'Proyecto terminado'
        ],
        [
          'oxygen',
          oxygenShop,
          'html5, css y vanilla js',
          '',
          'https://alvarot2601.github.io/Oxygen-Shop',
          'https://github.com/alvarot2601/Oxygen-Shop',
          'Logo de mi proyecto Oxygen Shop',
          'Proyecto terminado'
        ],
        
        [
          'umedi',
          umediProject,
          'Wordpress',
          '',
          'https://l.umedi.com/colegio-infantil-concertado-en-bilbao/',
          '',
          'Logo de mi proyecto Umedi',
          'Proyecto terminado'
        ],
        [
          'andel',
          andelProject,
          'Wordpress',
          '',
          'https://andelfuenllanaykids.es/colegio-concertado-bilingue-en-alcorcon-andel',
          '',
          'Logo de mi proyecto Andel',
          'Proyecto terminado'
        ],
        
        [
          'marinaspa',
          andelProject,
          'React',
          '',
          '',
          '',
          'Logo de mi proyecto MarinaSpá',
          'Proyecto en progreso'
        ],
        [
          'Complementos Inés',
          andelProject,
          'Wordpress',
          '',
          '',
          '',
          'Logo de mi proyecto Complementos Inés',
          'Proyecto en progreso'
        ]
      ];
    return (
        <section className="my-work flex flex-wrap gap-[1%] " id="my-work">
            {
                projects.map((project, index) => {
                    let heightClass = 'min-h-[300px]';
                    let roundedClass = 'rounded-full sm:rounded-[48px] lg:rounded-[86px]';
                    if (index===0){
                      heightClass = 'min-h-[380px]';
                      roundedClass = 'rounded-[48px] lg:rounded-[86px]';
                    }
                    return (
                        <a key={`a-${index}`} href={project[4]!== '' ? project[4] : 'javascript:void(0)'} target={project[4]!== '' ? '_blank' : '_self'} className={`w-[49%] ${heightClass} ${roundedClass} lg:min-h-[350px] mt-2 pt-[54px] pr-[72px] pb-[54px] pl-[72px] my-work__item my-work__item--${index} ${project[0]}`}>
                            <div className="my-work__content">
                              <div className="my-work__row">
                                <span className="my-work__number">{`0${index+1}.`}</span> <span className="my-work__type hidden sm:flex text-sm sm:text-md lg:text-lg">{project[2]}</span>
                              </div>
                              {
                                project[3] !== '' 
                                ? <span className="my-work__logo-span">{project[3]}</span>
                                : (project[0] == 'unsplash') 
                                ? <SiUnsplash className="my-work__logo-svg"/>
                                : <img className= {`my-work__logo my-work__logo--${index} object-scale-down`} src={project[1]} alt={project[6]} />
                              }
                              <div className="my-work__row">
                                <span className="my-work__finish hidden sm:flex text-sm md:text-md">{project[7]}</span> <BsArrowUpRight/>
                              </div>
                            </div>
                        </a>
                    );
                })
            }
        </section>
    );
}
export default Projects;