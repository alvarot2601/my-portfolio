import React from 'react';
import oxygenShop from '../assets/img/eye.jpg';
import hotelMirandaProject from '../assets/img/hotel-miranda-logo.svg';
import umediProject from '../assets/img/LOGO-UMEDI.png';
import andelProject from '../assets/img/logo-andel.svg';

import {SiUnsplash} from 'react-icons/si';
import {BsArrowUpRight} from 'react-icons/bs';
import {useEffect} from 'react';
import {useRef} from 'react';

const Projects = ({reference}) => {
  const projectsRef = useRef(null);
  // igualamos referencia creada en este componente a la q se le paso x props para poder asignar la ref
  useEffect(()=>{
    reference.current = projectsRef.current;
  }, []);

  const projects = [
    [
      'unsplash',
      '',
      'React y Redux',
      '',
      'https://alvarot2601.github.io/dashboard-photos',
      'https://github.com/alvarot2601/dashboard-photos',
      'Logo de mi proyecto myPhotoApp',
      'Proyecto personal terminado',
      'Creado en bootcamp',
    ],
    [
      'miranda',
      hotelMirandaProject,
      'html5 Y css',
      '',
      'https://alvarot2601.github.io/Hotel-Miranda',
      'https://github.com/alvarot2601/Hotel-Miranda',
      'Logo de mi proyecto Hotel Miranda',
      'Proyecto personal terminado',
      'Creado en bootcamp',
    ],
    [
      'oxygen',
      oxygenShop,
      'html5, css y vanilla js',
      '',
      'https://alvarot2601.github.io/Oxygen-Shop',
      'https://github.com/alvarot2601/Oxygen-Shop',
      'Logo de mi proyecto Oxygen Shop',
      'Proyecto personal terminado',
      'Creado en bootcamp',
    ],
    [
      'umedi',
      umediProject,
      'Wordpress',
      '',
      'https://l.umedi.com/colegio-infantil-concertado-en-bilbao/',
      '',
      'Logo de mi proyecto Umedi',
      'Proyecto terminado',
      'Cliente: Colegio',
    ],
    [
      'andel',
      andelProject,
      'Wordpress',
      '',
      'https://andelfuenllanaykids.es/colegio-concertado-bilingue-en-alcorcon-andel',
      '',
      'Logo de mi proyecto Andel',
      'Proyecto terminado',
      'Cliente: Colegio',
    ],
    [
      'marinaspa',
      'MARINASPÁ',
      'React',
      '',
      '',
      '',
      'Logo de mi proyecto MarinaSpá',
      'Proyecto en progreso',
      'Cliente: Centro de estética',
    ],
    ,
    [
      'complementos_ines',
      'C.I.',
      'Wordpress',
      '',
      '',
      '',
      'Logo de mi proyecto Complementos Inés',
      'Proyecto en progreso',
      'Cliente: Tienda de ropa ',
    ],
    [
      'smooth_scroll',
      'Smooth Scrollbar',
      'Vanilla JS',
      '',
      'https://alvarot2601.github.io/smooth-scrollbar/',
      'https://github.com/alvarot2601/smooth-scrollbar',
      '',
      'Proyecto personal terminado',
      'Para desarrolladores web',
    ]
  ];
  return (
    <section ref={projectsRef} className="my-work flex flex-wrap gap-[8px]" id="my-work">
      {
        projects.map((project, index) => {
          let width = 'w-[calc(50%-8px)]';
          let heightClass = 'min-h-[300px]';
          let roundedClass = 'rounded-full sm:rounded-[48px] lg:rounded-[86px]';
          if (index===0) {
            heightClass = 'min-h-[380px]';
            roundedClass = 'rounded-[48px] lg:rounded-[86px]';
          }
          if(index==projects.length-1 && index%2==0) width="w-full";
          return (
            <a key={`a-${index}`} href={project[4]!== '' ? project[4] : 'javascript:void(0)'} target={project[4]!== '' ? '_blank' : '_self'} className={`${width} ${heightClass} ${roundedClass} lg:min-h-[350px] pt-[54px] pr-[72px] pb-[54px] pl-[72px] my-work__item my-work__item--${index} ${project[0]}`} rel="noreferrer">
              <div className="my-work__content">
                <div className="my-work__row w-full flex flex-row items-center justify-center sm:justify-between">
                  <span className="my-work__number">{`0${index+1}.`}</span> <span className="my-work__type hidden sm:flex text-sm sm:text-md lg:text-lg">{project[2]}</span>
                </div>
                {
                                project[3] !== '' ?
                                <span className="my-work__logo-span">{project[3]}</span> :
                                (project[0] == 'unsplash') ?
                                <SiUnsplash className="my-work__logo-svg"/> :
                                (project[0] == 'marinaspa' || project[0] === 'complementos_ines' ||project[0] === 'smooth_scroll') ?
                                <span className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{project[1]}</span> :
                                <img className= {`my-work__logo my-work__logo--${index} object-scale-down`} src={project[1]} alt={project[6]} />
                }
                <div className="my-work__row w-full flex flex-row items-center justify-center sm:justify-between">
                  <div>
                    <span className="my-work__finish hidden sm:flex text-sm md:text-md">{project[7]}</span>
                    {
                                    project[8] !== '' ? <span className="hidden sm:block">{project[8]}</span> : ''
                    }
                  </div>
                  <BsArrowUpRight/>
                </div>
              </div>
            </a>
          );
        })
      }
    </section>
  );
};
export default Projects;
