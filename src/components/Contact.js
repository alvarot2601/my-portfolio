import React, { useState, useRef, useEffect } from "react";
import { send } from 'emailjs-com';
import emailjs from '@emailjs/browser';

import { AiOutlineSend, AiFillLinkedin, AiFillGithub, AiOutlineArrowDown } from 'react-icons/ai';
//import gsap from "gsap";
//import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { debounce, circleValue, halfviewportWidth} from "./Functions";
const Form = ({coordY, reachedLimitBottom, wheelDelta, pxPerScroll}) => {
    const input1 = useRef(null);
    const input2 = useRef(null);
    const textarea = useRef(null);
    const [placeholderElement, setPlaceholderElement] = useState(null);
    
    const [placeholder, setPlaceholder] = useState({
        input1: 'Tu nombre',
        input2 : 'Tu email',
        textarea : 'Mensaje' 
    });
    const _placeholders = {
        input1: 'Tu nombre',
        input2 : 'Tu email',
        textarea : 'Mensaje' 
    };
    const circleText = useRef(null);
    const circleTextServices = useRef(null);
    const [circleRotate, setCircleRotate] = useState({value:0});
    const form = useRef(null);
    const name_input = useRef(null);
    const mail_input = useRef(null);
    const submit_input = useRef(null);
    const [toSend, setToSend] = useState({
        from_name: '',
        user_mail: '',
        to_name: 'Álvaro',
        message: ''
    });
    const [inputValue, setInputValue] = useState('Enviar');
    //utilizo useRef ya que si lo hago con useState no funciona bien ya que no se actualiza dentro de la funcion smooth
    const reachedLimitBottomRef = useRef(reachedLimitBottom);
    reachedLimitBottomRef.current = reachedLimitBottom;
    const circleTextYTop = useRef(null);
    const circleTextYBottom = useRef(null);
    const circleAnimation = (wheelDelta, y, element, coordYTop, coordYBottom, transform, obj, value, element2 = null, element3 = null, limitTop = Math.abs(coordY), limitBottom = (Math.abs(coordY) + window.innerHeight)) => {
    
        if (wheelDelta < 0 && coordYTop < limitBottom && (coordYBottom + pxPerScroll) > limitTop) {
            obj.value += value;
        } else if (wheelDelta > 0 && coordYTop < (limitBottom + pxPerScroll) && coordYBottom > limitTop) {
            obj.value -= value;
        } else if (coordYBottom < (limitBottom - pxPerScroll) && coordYBottom > (limitTop - pxPerScroll)) {
            if (wheelDelta > 0)
                obj.value -= value;
        }
        const unit = (transform === 'translateX') ? 'px' : 'deg';
        if (element2 === null) {
            element.style.transform = transform + "(" + parseInt(obj.value) + unit + ")";
        } /*else if (element2.classList.contains('services__item')) {
            if (obj.value > (halfviewportWidth / 2)) obj.value = (halfviewportWidth / 2);
            if (obj.value < 0) obj.value = 0;
            element3.style.transform = transform + "(" + parseInt(obj.value) + unit + ")";
            element2.style.transform = transform + "(" + (parseInt(obj.value) * -1) + unit + ")";
        }
        else {
            //entra aquí con es el swiper
            if(obj.value > 0) obj.value = 0;
            else if(obj.value < -300) obj.value = -300;
            console.log('element', element)
            console.log('element2', element2)
            console.log('element2.style.transform', transform + "(" + parseInt(obj.value) + unit + ")")
            element2.style.transform = transform + "(" + parseInt(obj.value) + unit + ")";
            element3.style.transform = transform + "(" + (parseInt(obj.value) * -1) + unit + ")";
        }*/
    }
    const handleChange = (e) => {
        setToSend({ ...toSend, [e.target.name]: e.target.value });
    };

    const sendEmail = async (e) => {
        e.preventDefault();

    emailjs.sendForm('service_os2jvcn', 'template_q6ps3ho', form.current, '2R2QCBGBzuH1hvWpo')
      .then((result) => {
          alert("El email se ha enviado correctamente");
      }, (error) => {
        alert("Ha habido un error y el correo NO se ha enviado. Escríbeme por whatsapp o linkedin!");
        //console.log(error.text);
      });






        e.preventDefault();
        let response = '';
        try {
            response = await send(
                'service_os2jvcn',
                'template_q6ps3ho',
                toSend,
                '2R2QCBGBzuH1hvWpo'
            )
        } catch (error) {
            alert('Error! Por favor envíame un correo a mi dirección alvarot2601@gmail.com');
        }
        finally {
            if (response.status === 200) {
                setToSend({
                    from_name: '',
                    user_mail: '',
                    to_name: 'Álvaro',
                    message: ''
                });
                setInputValue('Enviado');
            }
        }
    };

    const handleFocus = (key) => {
        setPlaceholder({
            ...placeholder,
            [key]: ''
        });
    }
    const handleBlur = (key) => {
        setPlaceholder({
            ...placeholder,
            [key] : _placeholders[key]
        });
    }
    useEffect(()=>{
        if(placeholderElement !== null)
        placeholderElement.placeholder = placeholder;
    }, [placeholderElement]);
    
    useEffect(()=>{
        circleTextYTop.current = circleTextServices.current.getBoundingClientRect().top;
        circleTextYBottom.current = circleTextServices.current.getBoundingClientRect().bottom;
    }, []);
    
    useEffect(() => {
        if(!reachedLimitBottomRef.current || wheelDelta > 0)
        {
            circleAnimation(wheelDelta, coordY, circleTextServices.current, circleTextYTop.current, circleTextYBottom.current, 'rotate', circleRotate, circleValue);
        }
    }, [coordY]);

   

    useEffect(()=>{
        reachedLimitBottomRef.current = reachedLimitBottom;
    }, [reachedLimitBottom]);


    useEffect(() => {
        circleText.current.innerHTML = circleText.current.innerHTML.split("").map((char, i) => {
            return `<span style="transform:rotate(${i * 9.3}deg)">${char}</span>`;
        })
            .join('');

        //gsap
        /* gsap.registerPlugin(ScrollTrigger);
         
 
           gsap.to("#circle__text-container2", {
             scrollTrigger: {
                 trigger: "#circle__text-container2",
                 start: "top bottom",
                 end: "bottom top",
                 scrub: true,
                 markers: false
             },
             rotate: 360
           });*/
    }, []);

    useEffect(() => {
        if (inputValue === 'Enviado') {
            submit_input.current.style.background = "#3f826d";
            submit_input.current.disabled = true;
        }
    }, [inputValue]);


    

    return (
        <section className="contact">
            <div className="contact__container pt-[28px] pr-[28px] pb-[30px] pl-[38px] lg:pt-[54px] lg:pr-[72px] lg:pb-[54px] lg:pl-[72px] rounded-[48px] lg:roundex-[86px]">
                <span className="little-title">¡CONTÁCTAME!</span>
                <p>
                    ¿Tienes alguna pregunta o idea?<br></br>
                    ¿Necesitas ayuda en algún proyecto?<br></br>
                    ¡Contáctame!
                </p>
                <div className="contact__subcontainer w-full">
                    <div className="contact__action w-full">
                        <div>
                            <a href="mailto:alvarot2601@gmail.com" className="contact__email">
                                alvarot2601@gmail.com
                            </a>
                            <a href="tel:+34684025751" className="contact__number">
                                +34 684 025 751
                            </a>
                        </div>
                        <div className="w-full flex gap-5 items-center justify-center md:justify-start">
                            <a href="https://www.linkedin.com/in/alvaro-taibo-developer/" target="_blank" aria-label="Link to my linkedin profile">
                                <AiFillLinkedin />
                            </a>
                            <a href="https://github.com/alvarot2601/" target="_blank" aria-label="Link to my github">
                                <AiFillGithub />
                            </a>
                        </div>
                        
                    </div>
                    <div className="circle hidden md:flex items-center justify-center">
                        <AiOutlineArrowDown className="arrow" />
                        <div className="circle__text-container" id="circle__text-container--2" ref={circleTextServices}>
                            <p className="circle__text" ref={circleText}>
                                CONTÁCTAME | CONTÁCTAME | CONTÁCTAME |
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <form ref={form} method="post" className="mt-[4px] gap-[4px]" onSubmit={sendEmail}>
                <input ref={input1} type="text" id="name" className="px-[44px] py-[36px] rounded-[86px] lg:px-[78px] lg:py-[56px]" name="from_name" placeholder={placeholder.input1} onChange={handleChange} onFocus={()=>handleFocus("input1")} onBlur={()=>handleBlur("input1")} value={toSend.from_name} required />
                <input ref={input2} type="email" id="mail" className="px-[44px] py-[36px] rounded-[86px] lg:px-[78px] lg:py-[56px]" name="user_mail" placeholder={placeholder.input2} onChange={handleChange} onFocus={()=>handleFocus("input2")} onBlur={()=>handleBlur("input2")} value={toSend.user_mail} required />
                <textarea ref={textarea} id="message" className="px-[44px] py-[36px] rounded-[48px] lg:px-[78px] lg:py-[56px]" name="message" placeholder={placeholder.textarea} onChange={handleChange} onFocus={()=>handleFocus("textarea")} onBlur={()=>handleBlur("textarea")} value={toSend.message}>
                </textarea>
                <button type="submit" id="submit" value={inputValue} className="submit-input px-[44px] py-[36px] rounded-[48px] lg:px-[78px] lg:py-[56px] " ref={submit_input}>
                    <AiOutlineSend />
                    Enviar
                </button>
            </form>
        </section>
    );
}
export default Form;