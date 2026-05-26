import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Perritos } from './Perros/index';
import { Gatitos } from './Gatos/index';
import { Adopta } from './Adopta/index';
import { Inicio } from './Inicio/index';
import { Detalles } from './Detalles/Detalles';
import { AcercaDe } from './AcercaDe/index';
import { Terminos } from './Terminos/index';


export const Paginas = () => {
  return (
    <section>
      <Routes>
        <Route path='/' exact Component={Inicio} />
        <Route path='/Perritos' exact Component={Perritos} />
        <Route path='/Gatitos' exact Component={Gatitos} />
        <Route path='/Adopta' exact Component={Adopta} />
        <Route path='/Mascota/:id' exact Component={Detalles} />
        <Route path='/AcercaDe' exact Component={AcercaDe} />
        <Route path='/TerminosyCondiciones' exact Component={Terminos} />
      </Routes>
    </section>
  );
};