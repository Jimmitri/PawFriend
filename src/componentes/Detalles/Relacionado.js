import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';


export const ProductoItem = ({
  id,
  title,
  image,
  descrip
}) => {


  const handleScroll = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    handleScroll();
  }, []);


  return (
    <div div className='mascotas'>
    <Link to={`/Mascota/${id}`} onClick={handleScroll}>
      <div className='mascotas_img'>
        <img src={image} alt={title} />
      </div>
    </Link>
    <div className='masc_footer'>
      <h1>{title}</h1>
      <p>{descrip}</p>
    </div>
    <div className='buttom'>
      <div className='buttomVista'>
        <Link to={`/Mascota/${id}`} onClick={handleScroll} className='btn'>Conoce mas sobre {title}</Link>
      </div>
    </div>
  </div>
  )
}