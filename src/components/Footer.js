import React from "react";
import {RiCopyrightFill} from 'react-icons/ri';

const Footer = () => {
    return (
        <footer className="footer">
            <span className="footer__copyright">
                Copyright <RiCopyrightFill className="footer__copyright-icon"/> 2023
            </span>
            <span>
                Diseñado por Álvaro Taibo Aguza
            </span>
        </footer>
    );
}
export default Footer;