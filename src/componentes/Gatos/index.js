import React, { useContext } from 'react';
import { DataContext } from '../../context/Dataprovider'
import { ProductoItem } from './InfoGatos'


export const Gatitos = () => {

  const value = useContext(DataContext)
  const [productos] = value.productos

  const productosFiltrados = productos.filter(
    producto => producto.raza === "cat"
  );

  console.log(productos)


  return (
    <>
      <h2 className='prod_h2'>Meet Your New Feline Friend!</h2>
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
