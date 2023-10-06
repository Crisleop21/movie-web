import { useEffect, useState } from 'react'
import MovieBox from './components/card/MovieBox';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from './slider/Slider';
import NavbarComponent from './components/navbar/NavbarComponent';

const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=1bc6caebfda92192d0921d0a35a8dbc5&language=en,en";
const API_SEARCH = "https://api.themoviedb.org/3/search/movie?api_key=1bc6caebfda92192d0921d0a35a8dbc5&query";


function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery]=useState('');
  const [showCarousel, setShowCarousel] = useState(true);
  const [showArrow, setShowArrow] = useState(true); 
  
  useEffect(() => {
    fetch(API_URL)
    .then((res) => res.json())
    .then(data => {
      console.log(data)
      setMovies(data.results);
    })
  },[])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setShowArrow(true); // Muestra la flecha al volver al principio
      } else {
        setShowArrow(false); // Oculta la flecha al hacer scroll
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    // Limpia el evento de scroll al desmontar el componente
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const searchMovie = async(e) => {
    e.preventDefault();
    try{
      const url =`${API_SEARCH}=${query}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
      setShowCarousel(false);
    }
    catch(e){
      console.log(e);
    }
  }

  const changeHandler = (e) => {
    setQuery(e.target.value);
    setShowCarousel(true);
  }

  return (
    <>
      <NavbarComponent query={query} handleSearch={searchMovie} changeHandler={changeHandler} />
      {showCarousel && <Slider />} {/* Muestra el carrusel solo si showCarousel es true */}
      <div className='container'>
        <div className='grid'>
          {movies.map(movieReq =>( 
          <MovieBox key={movieReq.id} {...movieReq} />))}
        </div>
      </div>
      {showCarousel && showArrow && (
        <div className='scroll-down-arrow'>
          <span className='bi bi-arrow-down-circle custom-icon-color'></span>
        </div>
      )}
    </>
  )
}

export default App
