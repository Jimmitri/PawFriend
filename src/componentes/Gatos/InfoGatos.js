import { Link } from 'react-router-dom';

export const ProductoItem = ({
  id,
  title,
  image,
  descrip,
}) => {


  return (
  <div div className='mascotas'>
    <Link to={`/Mascota/${id}`}>
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
        <Link to={`/Mascota/${id}`} className='btn'>Discover More About {title}</Link>
      </div>
    </div>
  </div>
  )
}
