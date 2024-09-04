import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [actors, setActors] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchMovies();
    fetchDirectors();
    fetchActors();
    fetchGenres();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/movies/');
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchDirectors = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/directors/');
      setDirectors(response.data);
    } catch (error) {
      console.error('Error fetching directors:', error);
    }
  };

  const fetchActors = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/actors/');
      setActors(response.data);
    } catch (error) {
      console.error('Error fetching actors:', error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/genre/');
      setGenres(response.data);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const getDirectorName = (id) => {
    const director = directors.find((d) => d.id === id);
    return director ? `${director.first_name} ${director.last_name}` : 'Unknown';
  };

  const getActorNames = (ids) => {
    const actorNames = ids.map((id) => {
      const actor = actors.find((a) => a.id === id);
      return actor ? `${actor.first_name} ${actor.last_name}` : 'Unknown';
    });
    return actorNames.join(', ');
  };

  const getGenreNames = (ids) => {
    const genreNames = ids.map((id) => {
      const genre = genres.find((g) => g.id === id);
      return genre ? genre.name : 'Unknown';
    });
    return genreNames.join(', ');
  };

  return (
    <div className='home-container'>
      <h1>Movie Store</h1>
      <div className='movies-list'>
        {movies.map((movie) => (
          <div className='movie-card' key={movie.id}>
            <h3>{movie.title}</h3>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Price:</strong> ${movie.price}</p>
            <p><strong>Stock:</strong> {movie.stock}</p>
            <p><strong>Director:</strong> {getDirectorName(movie.director)}</p>
            <p><strong>Genres:</strong> {getGenreNames(movie.genres)}</p>
            <p><strong>Actors:</strong> {getActorNames(movie.actors)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;



