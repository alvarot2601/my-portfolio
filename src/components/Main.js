import React from "react";
import Container from "./Container";
import oxygenShop from "../assets/img/oxygenshop.png";
import unsplashProject from "../assets/img/unsplash-project1.png";
import hotelMirandaProject from "../assets/img/hotel-miranda-proyecto.png";
import umediProject from "../assets/img/umedi.png";
import andelProject from "../assets/img/andel.png";
const Main = () => {
    
    const projects = [
        [
          'oxygen',
          oxygenShop,
          "https://alvarot2601.github.io/Oxygen-Shop",
          "https://github.com/alvarot2601/Oxygen-Shop",
        ],
        [
          'unsplash',
          unsplashProject,
          "https://alvarot2601.github.io/dashboard-photos",
          "https://github.com/alvarot2601/dashboard-photos",
        ],
        [
            'miranda',
          hotelMirandaProject,
          "https://alvarot2601.github.io/Hotel-Miranda",
          "https://github.com/alvarot2601/Hotel-Miranda",
        ],
        [
            'umedi',
          umediProject,
          "https://umedi.roymo.info/colegio-infantil-concertado-en-bilbao",
          "",
        ],
        [
            'andel',
          andelProject,
          "https://andelfuenllanaykids.es/colegio-concertado-bilingue-en-alcorcon-andel",
          "",
        ],
      ];
    return (
        <main>
            {
                projects.map((project, index)=>{
                    return <Container className={`project ${project[0]}`}/>
                })
            }       
        </main>
    );
}
export default Main;