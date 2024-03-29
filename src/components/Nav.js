import React, {useEffect, useRef, useState} from 'react';
import {motion} from 'framer-motion';

import {scaleValue} from './Functions';
const Nav = ({coordY, wheelDelta, pxPerScroll, relativeAnimPercentage, movedByScroll, reference}) => {
  const navRef = useRef(null);
  // igualamos referencia creada en este componente a la q se le paso x props para poder asignar la ref
  useEffect(() => {
    reference.current = navRef.current;
  }, []);
  const myName = useRef(null);
  const myNameYTop = useRef(null);
  const myNameYBottom = useRef(null);
  const [properties, setProperties] = useState({
    scale: 1,
    opacity: 1,
  });


  const disappearTextAnimation = (wheelDelta, y, element, coordYTop, coordYBottom, transform, obj, objSetter, value, limitTop = Math.abs(coordY), limitBottom = (Math.abs(coordY) + window.innerHeight)) => {
    if (wheelDelta <= 0 && coordYTop < limitBottom && (coordYBottom + pxPerScroll) > limitTop) {
      // obj.scale -= value;
      // obj.opacity -= opacityValue;
      if (movedByScroll === true) {
        objSetter({
          scale: value,
          opacity: value,
        });
      } else {
        objSetter({
          scale: obj.scale - value,
          opacity: obj.opacity - value,
        });
      }
      objSetter({
        scale: obj.scale - value,
        opacity: obj.opacity - value,
      });
      if (obj.scale < 0) {
        // obj.scale = 0;
        objSetter({
          ...obj,
          scale: 0,
        });
      }
      if (obj.opacity < 0) {
        // obj.opacity = 0;
        objSetter({
          ...obj,
          opacity: 0,
        });
      }
    } else if (wheelDelta > 0 && coordYTop < (limitBottom + pxPerScroll) && coordYBottom > limitTop) {
      // alert(2)
      // obj.scale += value;
      // obj.opacity += opacityValue;
      objSetter({
        scale: obj.scale + value,
        opacity: obj.opacity + value,
      });
      if (obj.scale > 1) {
        // obj.scale = 1;
        objSetter({
          ...obj,
          scale: 1,
        });
      }
      if (obj.opacity > 1) {
        // obj.opacity = 1;
        objSetter({
          ...obj,
          opacityValue: 1,
        });
      }
    }
    /* element.style.scale = `${obj.scale}`;
        element.style.opacity = `${obj.opacity}`;*/
    // element.style.transform = `translateY()`;
  };
  useEffect(() => {
    myNameYTop.current = myName.current.getBoundingClientRect().top;
    myNameYBottom.current = myName.current.getBoundingClientRect().bottom;
  }, []);

  useEffect(() => {
    // alert('y nav ' + coordY)
    // if(mousemoveExecutions % 2 != 0 || mousemoveExecutions === 1) return;//no se si aqui debería poner esto
    disappearTextAnimation(wheelDelta, coordY, myName.current, myNameYTop.current, myNameYBottom.current, 'scale', properties, setProperties, (scaleValue * Math.abs(relativeAnimPercentage)) / 100);
  }, [coordY]);
  useEffect(() => {
    myName.current.style.scale = `${properties.scale}`;
    myName.current.style.opacity = `${properties.opacity}`;
  }, [properties]);
  return (
    <nav ref={navRef} className="nav h-[20vh] md:[25vh] lg:h-[40vh] min-h-[150px] lg:min-h-[280px]">
      <motion.p
        initial={{opacity: 0.5, scale: 0.5}} whileTap={{scale: 0.9}}
        animate={{opacity: 1, scale: 1}}
        transition={{duration: 1}}
        whileHover={{
          scale: 1.2,
          transition: {duration: 1},
        }}
        ref={myName} className="nav__text text-center text-[clamp(30px,3vw,100px)]">Portfolio de <br></br> <span className="text-[clamp(40px,7vw,100px)]">Álvaro Taibo</span>
      </motion.p>
    </nav>
  );
};
export default Nav;
