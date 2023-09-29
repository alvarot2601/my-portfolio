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
          'miranda',
          hotelMirandaProject,
          'HTML5 Y CSS3',
          '',
          "https://alvarot2601.github.io/Hotel-Miranda",
          "https://github.com/alvarot2601/Hotel-Miranda",
          'Logo de mi proyecto Hotel Miranda'
        ],
        [
          'oxygen',
          oxygenShop,
          'HTML5, CSS3 Y JS',
          '',
          "https://alvarot2601.github.io/Oxygen-Shop",
          "https://github.com/alvarot2601/Oxygen-Shop",
          'Logo de mi proyecto Oxygen Shop'
        ],
        [
          'unsplash',
          '',
          'REACT Y REDUX',
          '',
          "https://alvarot2601.github.io/dashboard-photos",
          "https://github.com/alvarot2601/dashboard-photos",
          'Logo de mi proyecto myPhotoApp'
        ],
        [
          'umedi',
          umediProject,
          'WORDPRESS',
          '',
          "https://l.umedi.com/colegio-infantil-concertado-en-bilbao/",
          "",
          'Logo de mi proyecto Umedi'
        ],
        [
          'andel',
          andelProject,
          'WORDPRESS',
          '',
          "https://andelfuenllanaykids.es/colegio-concertado-bilingue-en-alcorcon-andel",
          "",
          'Logo de mi proyecto Andel'
        ],
      ];
    return (
        <section className="my-work flex flex-wrap gap-[1%] " id="my-work">
            {
                projects.map((project, index) => {
                    let heightClass = 'min-h-[300px]';
                    if (index===0){
                      heightClass = 'min-h-[380px]';
                    }
                    return (
                        <a key={`a-${index}`} href={project[4]} target="_blank" className={`w-[49%] ${heightClass} lg:min-h-[350px] container my-work__item my-work__item--${index} ${project[0]}`}>
                            <div className="my-work__content">
                              <div className="my-work__row">
                                <span className="my-work__number">{`0${index+1}.`}</span> <span className="my-work__type">{project[2]}</span>
                              </div>
                              {
                                project[3] !== '' 
                                ? <span className="my-work__logo-span">{project[3]}</span>
                                : (project[0] == 'unsplash') 
                                ? <SiUnsplash className="my-work__logo-svg"/>
                                : <img className= {`my-work__logo my-work__logo--${index}`} src={project[1]} alt={project[6]} />
                              }
                              <div className="my-work__row">
                                <span className="my-work__finish">Proyecto terminado</span> <BsArrowUpRight/>
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