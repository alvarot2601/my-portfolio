import React from 'react';
import {RiCopyrightFill} from 'react-icons/ri';
const Footer = () => {
  return (
    <footer className="footer flex md:flex-col items-center text-xl">
      <span className="flex justify-center w-full">
        Copyright <RiCopyrightFill className="footer__copyright-icon"/> 2023
      </span>
      <span className="text-center">
                Diseñado por Álvaro Taibo Aguza
      </span>
    </footer>
  );
};
export default Footer;
