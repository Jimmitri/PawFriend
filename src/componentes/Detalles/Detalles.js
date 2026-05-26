import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../context/Dataprovider';
import { useParams } from 'react-router-dom';
import { ProductoItem } from './Relacionado';
import { Link } from 'react-router-dom';

export const Detalles = () => {
  const value = useContext(DataContext);
  const [productos] = value.productos;
  const params = useParams();
  const [detalle, setDetalle] = useState({});
  let item = 0;

  useEffect(() => {
    productos.forEach((producto) => {
      if (producto.id === parseInt(params.id)) {
        setDetalle(producto);
      }
    });
  }, [params.id, productos]);

  return (
    <>
      <div className='Detalles'>
        <div className="detalles">
          <img src={detalle.image} alt={detalle.title} />
          <div className="text">
            <h2>{detalle.title}</h2>
            <Link to={'/Adopta'}> 
              <button>Adopt Them Now!</button>
            </Link>
            <div className="description">
              <p>
                <b>Description:</b> {detalle.sobre}
              </p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="relacionados">Other Friends Are Waiting for You</h2>
      <div className="Mascotas">
        {productos.map((producto) => {
          if (item < 7 && detalle.raza === producto.raza && detalle.id !== producto.id){
            item++;
            return (
              <ProductoItem
                key={producto.id}
                id={producto.id}
                title={producto.title}
                image={producto.image}
                descrip={producto.descrip}
              />
            );
          }
          return null;
        })}
      </div>
    </>
  );
};

