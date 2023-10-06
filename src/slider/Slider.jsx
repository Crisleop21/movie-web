import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import './Slider.css'

const API_POPULAR =
  "https://api.themoviedb.org/3/movie/popular?api_key=1bc6caebfda92192d0921d0a35a8dbc5";

const Slider = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(API_POPULAR)
      .then((response) => response.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Carousel slide={false}>
      {movies.map((movie) => (
        <Carousel.Item key={movie.id}>
          <img
            className="posterImage"
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
          />
          <Carousel.Caption>
            <h3>{movie.title}</h3>
            <h4>ImDB:{movie.vote_average}</h4>
            <p>{movie.overview}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Slider;
