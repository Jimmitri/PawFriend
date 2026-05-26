import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../context/Dataprovider';
import { Link } from 'react-router-dom';

export const Adopta = () => {
  const value = useContext(DataContext);
  const [productos] = value.productos;
  const params = useParams();
  const [, setDetalle] = useState({});
  const [tipoMascotaSeleccionado, setTipoMascotaSeleccionado] = useState(''); // Inicializa como cadena vacía
  const [mascotasFiltradas, setMascotasFiltradas] = useState([]);

  useEffect(() => {
    productos.forEach((producto) => {
      if (producto.id === parseInt(params.id)) {
        setDetalle(producto);
      }
    });
  }, [params.id, productos]);

  useEffect(() => {
    if (tipoMascotaSeleccionado) {
      const mascotasFiltradas = productos.filter(producto => producto.raza === tipoMascotaSeleccionado);
      setMascotasFiltradas(mascotasFiltradas);
    } else {
      setMascotasFiltradas(productos);
    }
  }, [tipoMascotaSeleccionado, productos]);
  
  return (
    <div className='formulario'>  
  <h2 className='form_h1'>Pet Adoption Form</h2>

  <form action="https://formspree.io/f/mwkgpvnz" method="POST">

    <label htmlFor="nombre" className='form_st'>
      Full Name:
    </label>

    <input type="text" id="nombre" name="nombre" required />

    <label htmlFor="email" className='form_st'>
      Email Address:
    </label>

    <input type="email" id="email" name="email" required />

    <label htmlFor="ingreso" className='form_st'>
      What is the monthly income of your household?
    </label>

    <select id="ingreso" name="ingreso" required>
      <option value="">Select your monthly income</option>
      <option>Less than S/.1024</option>
      <option>S/.1025 - S/.1999</option>
      <option>S/.2000 - S/.2999</option>
      <option>S/.3000 - S/.3999</option>
      <option>S/.4000 or more</option>
    </select>

    <label htmlFor="tipo_mascota" className='form_st'>
      Pet Type:
    </label>

    <select
      id="tipo_mascota"
      name="tipo_mascota"
      required
      value={tipoMascotaSeleccionado}
      onChange={(e) => setTipoMascotaSeleccionado(e.target.value)}
    >
      <option value="">Select a pet type</option>

      {[...new Set(productos.map(producto => producto.raza))].map((tipo, index) => (
        <option key={index} value={tipo}>
          {tipo}
        </option>
      ))}
    </select>

    <label htmlFor="adoptar" className='form_st'>
      Who would you like to adopt?
    </label>

    <select id="adoptar" name="adoptar" required>
      <option value="">Select your furry friend</option>

      {mascotasFiltradas.map((mascota) => (
        <option key={mascota.cid} value={`${mascota.cid}: ${mascota.title}`}>
          {mascota.title}
        </option>
      ))}
    </select>

    <label htmlFor="razon" className='form_st'>
      Reason for Adoption:
    </label>

    <br></br>

    <textarea id="razon" name="razon" rows="4" required></textarea>

    <br></br>

    <p className='form_p'>
      Remember that by submitting the adoption request you accept our "
      <Link to={'/TerminosyCondiciones'} target="_blank">
        Terms and Conditions
      </Link>
      ."
    </p>

    <button type="submit" className='form_enviar'>
      Send Adoption Request
    </button>

  </form>
</div>
  )
}
