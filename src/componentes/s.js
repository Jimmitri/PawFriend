<section className="testimony">
            <div className="testimony__container container">
                <img
                    src={leftarrow}
                    className="testimony__arrow"
                    id="before"
                    alt="leftarrow"
                    onClick={() => slideTestimonies(-1)}
                />
                {[1, 2, 3, 4].map((id) => (
                    <section
                        key={id}
                        className={`testimony__body ${currentTestimony === id ? 'testimony__body--show' : ''}`}
                        data-id={id}
                    >
                        {
                            
                        }
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