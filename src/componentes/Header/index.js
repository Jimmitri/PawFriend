import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import menu from '../../images/Iconos/menu.svg';
import close from '../../images/Iconos/close.svg';

export const Header = () => {
  const handleScroll = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    handleScroll();
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className='hero'>
      <nav className="nav container">
        <div className="nav__logo">
          <Link to={'/'} className="nav__links" onClick={closeMenu}>
          <h2 className="nav__title">PawFriend</h2>
          </Link>
        </div>

        <ul className={`nav__link nav__link--menu ${isMenuOpen ? 'nav__link--show' : ''}`}>
          <li className="nav__items">
            <Link to={'/'} className="nav__links" onClick={closeMenu}>Home page</Link>
          </li>
          <li className="nav__items">
            <Link to={'/Perritos'} className="nav__links" onClick={closeMenu}>Puppies</Link>
          </li>
          <li className="nav__items">
            <Link to={'/Gatitos'} className="nav__links" onClick={closeMenu}>Kittens</Link>
          </li>
          <li className="nav__items">
            <Link to={'/Adopta'} className="nav__links" onClick={closeMenu}>Adopt Now!</Link>
          </li>
          <li className="nav__items">
            <Link to={'/AcercaDe'} className="nav__links" onClick={closeMenu}>About Us</Link>
          </li>
          <li className="nav__items">
            <Link to={'/TerminosyCondiciones'} className="nav__links" onClick={closeMenu}>Terms and Conditions</Link>
          </li>
          <li className="nav__items">
          <Link to={'/Administrar'} className="nav__links" onClick={closeMenu}>Admin Panel</Link>
          </li>
            <img src={close} className="nav__close" alt='close' onClick={closeMenu}></img>
          </ul>

        <div className="nav__menu" onClick={toggleMenu}>
          <img src={menu} className="nav__img" alt='menu'></img>
        </div>
      </nav>

      <section className="hero__container container">
        <h1 className="hero__title">PawFriend</h1>
        <h2 className="hero__paragraph">Find Your Furry Companion on Our Pet Adoption Platform</h2>
      </section>
    </header>
  );
};
