import React, { useEffect, useState } from 'react';
import MC from '../../images/equipo.webp';
import arrow from '../../images/Iconos/arrow.svg';
import leftarrow from '../../images/Iconos/leftarrow.svg';
import rightarrow from '../../images/Iconos/rightarrow.svg';
import FC1 from '../../images/face01.jpg';
import FC2 from '../../images/face02.jpg';
import FC3 from '../../images/face03.jpg';
import FC4 from '../../images/face04.jpg';
import dog from '../../images/Iconos/dog.svg';
import house from '../../images/Iconos/home.svg';
import estadisticas from '../../images/Iconos/estadisticas.svg';

export const Inicio = () => {

    const totalTestimonies = 4;
    const [currentTestimony, setCurrentTestimony] = useState(1);

    const slideTestimonies = (direction) => {
        let value = currentTestimony + direction;

        if (value < 1) {
            value = totalTestimonies;
        } else if (value > totalTestimonies) {
            value = 1;
        }

        setCurrentTestimony(value);
    };

    const testimonyData = [
        {
            name: 'Sebastian',
            mascota: 'Levana',
            src: FC3,
            review: 'Levana is arrival into my home has been like a whirlwind of joy and fun. This playful puppy has filled every corner of my life with laughter and happiness. From her antics to her mischievousness, Levana has brought a youthful energy that has revitalized my home. Adopting this little furry companion has been a decision filled with love and joy, and I can not imagine my life without her infectious enthusiasm.',
        },
        {
            name: 'Jairo',
            mascota: 'Peluza',
            src: FC1,
            review: 'From the day Peluza came into my life, everything changed for the better. This charming little dog, with her loyal gaze and boundless energy, has become my constant companion. Every walk turns into an exciting adventure, and her presence always brightens my days. Adopting Peluza has been a wonderful experience, full of joyful moments and a deep connection that only a loyal dog can offer.',
        },
        {
            name: 'Kevin',
            mascota: 'Misty',
            src: FC2,
            review: 'Misty, the little explorer, has brought an extra dose of joy and curiosity into my life. Since she came home, every day has become a new adventure. Her mischievousness and playful nature have created unforgettable moments. Adopting Misty has been like adding a playful and mischievous touch to my daily routine, and I am grateful for the youthful energy and fun she brings to my home.',
        },
        {
            name: 'Karen',
            mascota: 'Luna',
            src: FC4,
            review: 'With Luna is arrival, my home has been filled with elegance and serenity. This majestic cat has found her favorite spot by the window, from where she observes the world with unparalleled calm. Luna has added a touch of mystery and grace to my daily life. Adopting this kitten has been like welcoming a little queen, and I am grateful for the serenity she has brought to my home.',
        },
    ];

    useEffect(() => {
        const titleQuestions = [...document.querySelectorAll('.questions__title')];

        titleQuestions.forEach(question => {
            question.addEventListener('click', () => {
                let height = 0;
                let answer = question.nextElementSibling;
                let addPadding = question.parentElement.parentElement;

                addPadding.classList.toggle('questions__padding--add');
                question.children[0].classList.toggle('questions__arrow--rotate');

                if (answer.clientHeight === 0) {
                    height = answer.scrollHeight;
                }

                answer.style.height = `${height}px`;
            });
        });
    }, []);

return (
    <div className='inicio'>
        <section class="container about">
            <h2 class="subtitle">What is our Mission?</h2>

            <div class="about__main">
                <article class="about__icons">
                    <img src={estadisticas} class="about__icon" alt='estadisticas'></img>
                    <h3 class="about__title">Promote the adoption of rescued petss</h3>
                </article>

                <article class="about__icons">
                    <img src={house} class="about__icon" alt='house-smile'></img>
                    <h3 class="about__title">Finding good homes for rescued pets</h3>
                </article>

                <article class="about__icons">
                    <img  src={dog} class="about__icon" alt='dog'></img>
                    <h3 class="about__title">Improving the quality of life for rescued pets</h3>
                </article>
            </div>
        </section>

        <section class="knowledge">
            <div class="knowledge__container container">
                <div class="knowledege__texts">
                    <h2 class="subtitle">"Our team, dedicated to caring for our rescue friends.</h2>
                    <p class="knowledge__paragraph">Our shelter has a team of specialists dedicated to the care of our furry friends, ensuring they receive the best possible quality of life. They are responsible for the health, nutrition, and well-being of all rescued animals. Therefore, all animals available for adoption receive all necessary preventative health measures, including vaccinations, spaying/neutering, and other medical procedures. We strive to ensure that each of our furry friends receives the care they need when they are adopted. </p>
                </div>

                <figure class="knowledge__picture">
                    <img src={MC} class="knowledge__img" alt='equipo'></img>
                </figure>
            </div>
        </section>

        <section class="test">
            <h2 class="subtitle">Happy Tails 🐾</h2>
        </section>

        <section className="testimony">
                <div className="testimony__container container">
                    <img
                        src={leftarrow}
                        className="testimony__arrow"
                        id="before"
                        alt="leftarrow"
                        onClick={() => slideTestimonies(-1)}
                    />

                    {testimonyData.map(({ name, mascota, src, review }, id) => (
                        <section
                            key={id + 1}
                            className={`testimony__body ${currentTestimony === id + 1 ? 'testimony__body--show' : ''}`}
                            data-id={id + 1}
                        >
                            <div className="testimony__texts">
                                <h2 className="subtitle">
                                    {`My name is ${name}, and adopted ${mascota}.`}
                                </h2>
                                <p className="testimony__review">{review}</p>
                            </div>

                            <figure className="testimony__picture">
                                <img src={src} className="testimony__img" alt={`PC${id + 1}`} />
                            </figure>
                        </section>
                    ))}

                    <img
                        src={rightarrow}
                        className="testimony__arrow"
                        id="next"
                        alt="rightarrow"
                        onClick={() => slideTestimonies(1)}
                    />
                </div>
            </section>

        <section class="questions container">
            <h2 class="subtitle">Why Adopting is the Best Choice? </h2>

            <section class="questions__container">
                <article class="questions__padding">
                    <div class="questions__answer">
                        <h3 class="questions__title">Experience the loyal and unconditional love that only an adopted pet can offer
                            <span class="questions__arrow">
                                <img src={arrow} class="questions__img" alt='arrow'></img>
                            </span>
                        </h3>

                        <p class="questions__show">Adopted pets, whether dogs or cats, form a deep and loyal bond with their owners. Their unconditional love and constant companionship provide comfort, joy, and a unique connection that enriches daily life.</p>
                    </div>
                </article>

                <article class="questions__padding">
                    <div class="questions__answer">
                        <h3 class="questions__title">It changes not only their life, but yours too.
                            <span class="questions__arrow">
                                <img src={arrow} class="questions__img" alt='arrow'></img>
                            </span>
                        </h3>

                        <p class="questions__show">Adopting a pet not only positively impacts the animal's life, but also transforms the life of the adopter. The responsibility, routine, and joy that pets bring contribute to emotional and physical well-being, creating meaningful experiences.</p>
                    </div>
                </article>

                <article class="questions__padding">
                    <div class="questions__answer">
                        <h3 class="questions__title">Be part of the solution, adopt and support local organizations
                            <span class="questions__arrow">
                                <img src={arrow} class="questions__img" alt='arrow'></img>
                            </span>
                        </h3>

                        <p class="questions__show">By adopting, you're helping to reduce the homeless animal population and supporting local rescue organizations. Adopting is an active way to participate in building compassionate and sustainable communities, giving a second chance to pets in need.</p>
                    </div>
                </article>
            </section>
            
        </section>
    </div>
);
}



