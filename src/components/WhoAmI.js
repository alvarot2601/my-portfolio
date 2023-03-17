import React from "react";
import Slider from "./Slider";
const WhoAmI = () => {
    return (
        <section className="my-who" id="mywho">
            <div className="container my-who__content">
                <div className="my-who__animation">
                    <p className="my-who__name">¿Quién es Álvaro Taibo Aguza?</p>
                </div>
                <div className="my-who__animation my-who__animation--2">
                    <p className="my-who__name">¿Quién es Álvaro Taibo Aguza?</p>
                </div>
                <div className="my-who__info">
                    <p className="my-who__text">
                        Soy un desarrollador web con varios años de experiencia trabajando con React, PHP, SQL, JavaScript y Wordpress en diversos proyectos para empresas internacionales (Europa), nacionales (España) y particulares.
                    </p>
                </div>
                <Slider/>
            </div>
        </section>
    );
}
export default WhoAmI;