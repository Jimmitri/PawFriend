import React, { useContext } from 'react';
import { DataContext } from '../../context/Dataprovider'
import { ProductoItem } from './InfoPerros'


export const Perritos = () => {

  const value = useContext(DataContext)
  const [productos] = value.productos

  const productosFiltrados = productos.filter(producto => producto.id >= 1 && producto.id <= 15);

  console.log(productos)


  return (
    <>
      <h2 className='prod_h2'>Find Your Loyal Companion!</h2>
      <div className='Mascotas'>
        {
          productosFiltrados.map(producto =>(
            <ProductoItem 
            key={producto.id}
            id={producto.id}
            title={producto.title}
            image={producto.image}
            descrip={producto.descrip}
            />
          ))
        }
        
      </div>
    </>
  );
}
