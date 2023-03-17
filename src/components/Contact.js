import React, { useState, useRef, useEffect } from "react";
import { send } from 'emailjs-com';
import { AiOutlineSend, AiFillLinkedin, AiFillGithub, AiOutlineArrowDown } from 'react-icons/ai';
//import gsap from "gsap";
//import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const Form = () => {
    const [sw, setSw] = useState(false);
    const circleText = useRef(null);
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


    const handleChange = (e) => {
        setToSend({ ...toSend, [e.target.name]: e.target.value });
    };

    const sendEmail = async (e) => {
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

    return (
        <section className="contact">
            <div className="contact__container container">
                <span className="little-title">¡CONTÁCTAME!</span>
                <p>
                    ¿Tienes alguna pregunta o idea? ¿Necesitas ayuda en algún proyecto?
                    ¡Contáctame!
                </p>
                <div className="contact__subcontainer">
                    <div className="contact__action">
                        <div>
                            <a href="mailto:alvarot2601@gmail.com" className="contact__email">
                                alvarot2601@gmail.com
                            </a>
                            <a href="tel:+34684025751" className="contact__number">
                                +34 684 025 751
                            </a>
                        </div>
                        <div className="contact__action--social">
                            <a href="https://www.linkedin.com/in/alvaro-taibo-developer/" target="_blank" aria-label="Link to my linkedin profile">
                                <AiFillLinkedin />
                            </a>
                            <a href="https://github.com/alvarot2601/" target="_blank" aria-label="Link to my github">
                                <AiFillGithub />
                            </a>
                        </div>
                        
                    </div>
                    <div className="circle">
                        <AiOutlineArrowDown className="arrow" />
                        <div className="circle__text-container" id="circle__text-container--2">
                            <p className="circle__text" ref={circleText}>
                                CONTÁCTAME | CONTÁCTAME | CONTÁCTAME |
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <form action="" method="post">
                <input type="text" id="name" name="from_name" placeholder="Tu nombre" onChange={handleChange} value={toSend.from_name} required />
                <input type="email" id="mail" name="user_mail" placeholder="Tu email" onChange={handleChange} value={toSend.user_mail} required />
                <textarea id="message" name="message" placeholder="Texto de ejemplo" onChange={handleChange} value={toSend.message}>
                </textarea>
                <button type="submit" id="submit" value={inputValue} className="submit-input" ref={submit_input}>
                    <AiOutlineSend />
                    Enviar
                </button>
            </form>
        </section>
    );
}
export default Form;