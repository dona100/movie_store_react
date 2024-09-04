import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import './Movie.css';

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [actors, setActors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    release_date: '',
    genre: [],
    actor: [],
    director: '',
    price: '',
    stock: ''
  });
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showMovieDetailsModal, setShowMovieDetailsModal] = useState(false);

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

  const createMovie = async () => {
    try {
        const payload = {
            title: newMovie.title,
            description: newMovie.description,
            release_date: newMovie.release_date,
            genres: [newMovie.genre], // Make sure genres is an array of IDs
            actors: [newMovie.actor], // Make sure actors is an array of IDs
            director: newMovie.director, // Assuming this is an ID
            price: newMovie.price,
            stock: newMovie.stock
          };
      await axios.post('http://127.0.0.1:8000/api/movies/', payload);
      setNewMovie({
        title: '',
        description: '',
        release_date: '',
        genre: '',
        actor: '',
        director: '',
        price: '',
        stock: ''
      });
      setShowAddModal(false);
      fetchMovies();
    } catch (error) {
      console.error('Error creating movie:', error);
    }
  };

  const deleteMovie = async (movieId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/movies/${movieId}/`);
      fetchMovies();
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const updateMovie = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/movies/${selectedMovie.id}/`, selectedMovie);
      setShowUpdateModal(false);
      fetchMovies();
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  const viewMovieDetails = async (movieId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/movies/${movieId}/`);
      setSelectedMovie(response.data);
      setShowMovieDetailsModal(true);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const editMovie = () => {
    setShowMovieDetailsModal(false);
    setShowUpdateModal(true);
  };

  return (
    <div className='movie-container'>
      {/* Add New Movie Button */}
      <Button className='add-movie-button' variant="primary" onClick={() => setShowAddModal(true)}>
        Add Movie
      </Button>

      {/* Add New Movie Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formMovieTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newMovie.title}
                onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                placeholder="Enter movie title"
              />
            </Form.Group>
            <Form.Group controlId="formMovieDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newMovie.description}
                onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
                placeholder="Enter movie description"
              />
            </Form.Group>
            <Form.Group controlId="formMovieReleaseDate">
              <Form.Label>Release Date</Form.Label>
              <Form.Control
                type="date"
                value={newMovie.release_date}
                onChange={(e) => setNewMovie({ ...newMovie, release_date: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formMovieGenre">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                as="select"
                value={newMovie.genre}
                onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
              >
                <option value="">Select genre</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formMovieActor">
              <Form.Label>Actor</Form.Label>
              <Form.Control
                as="select"
                value={newMovie.actor}
                onChange={(e) => setNewMovie({ ...newMovie, actor: e.target.value })}
              >
                <option value="">Select actor</option>
                {actors.map((actor) => (
                  <option key={actor.id} value={actor.id}>
                    {actor.first_name} {actor.last_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formMovieDirector">
              <Form.Label>Director</Form.Label>
              <Form.Control
                as="select"
                value={newMovie.director}
                onChange={(e) => setNewMovie({ ...newMovie, director: e.target.value })}
              >
                <option value="">Select director</option>
                {directors.map((director) => (
                  <option key={director.id} value={director.id}>
                    {director.first_name} {director.last_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formMoviePrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                value={newMovie.price}
                onChange={(e) => setNewMovie({ ...newMovie, price: e.target.value })}
                placeholder="Enter movie price"
              />
            </Form.Group>
            <Form.Group controlId="formMovieStock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={newMovie.stock}
                onChange={(e) => setNewMovie({ ...newMovie, stock: e.target.value })}
                placeholder="Enter stock quantity"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={createMovie}>
            Add Movie
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Movie List */}
      <div>
        <table className='movie-table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Release Date</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr className='movie-row' key={movie.id}>
                <td>{movie.title}</td>
                <td>{movie.release_date}</td>
                <td>${movie.price}</td>
                <td>{movie.stock}</td>
                <td>
                  <Button variant="outline-info" onClick={() => viewMovieDetails(movie.id)}>
                    View Details
                  </Button>
                  <Button variant="outline-danger" onClick={() => deleteMovie(movie.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

{/* Movie Details Modal */}
<Modal show={showMovieDetailsModal} onHide={() => setShowMovieDetailsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Movie Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Title: {selectedMovie?.title}</p>
            <p>Description: {selectedMovie?.description}</p>
            <p>Release Date: {selectedMovie?.release_date}</p>
            <p>Genre: {selectedMovie?.genres.map(genreId => 
                genres.find(genre => genre.id === genreId)?.name
            ).join(', ')}</p>
            <p>Actor: {selectedMovie?.actors.map(actorId => 
                actors.find(actor => actor.id === actorId)?.first_name + ' ' +
                actors.find(actor => actor.id === actorId)?.last_name
            ).join(', ')}</p>
            <p>Director: {directors.find(director => director.id === selectedMovie?.director)?.first_name} {directors.find(director => director.id === selectedMovie?.director)?.last_name}</p>
            <p>Price: ${selectedMovie?.price}</p>
            <p>Stock: {selectedMovie?.stock}</p>
            </Modal.Body>

       
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMovieDetailsModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={editMovie}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>


      {/* Update Movie Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
    <Form>
      <Form.Group controlId="formMovieTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={selectedMovie?.title || ''}
          onChange={(e) => setSelectedMovie({ ...selectedMovie, title: e.target.value })}
          placeholder="Enter movie title"
        />
      </Form.Group>
      <Form.Group controlId="formMovieDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={selectedMovie?.description || ''}
          onChange={(e) => setSelectedMovie({ ...selectedMovie, description: e.target.value })}
          placeholder="Enter movie description"
        />
      </Form.Group>
      <Form.Group controlId="formMovieReleaseDate">
        <Form.Label>Release Date</Form.Label>
        <Form.Control
          type="date"
          value={selectedMovie?.release_date || ''}
          onChange={(e) => setSelectedMovie({ ...selectedMovie, release_date: e.target.value })}
        />
      </Form.Group>
      <Form.Group controlId="formMovieGenre">
        <Form.Label>Genre</Form.Label>
        <Form.Control
          as="select"
          value={selectedMovie?.genres[0] || ''}  // Assuming single genre selection
          onChange={(e) => setSelectedMovie({ ...selectedMovie, genres: [e.target.value] })}  // Update this based on your use case
        >
          <option value="">Select genre</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formMovieActor">
        <Form.Label>Actor</Form.Label>
        <Form.Control
          as="select"
          value={selectedMovie?.actors[0] || ''}  // Assuming single actor selection
          onChange={(e) => setSelectedMovie({ ...selectedMovie, actors: [e.target.value] })}  // Update this based on your use case
        >
          <option value="">Select actor</option>
          {actors.map((actor) => (
            <option key={actor.id} value={actor.id}>
              {actor.first_name} {actor.last_name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formMovieDirector">
        <Form.Label>Director</Form.Label>
        <Form.Control
          as="select"
          value={selectedMovie?.director || ''}
          onChange={(e) => setSelectedMovie({ ...selectedMovie, director: e.target.value })}
        >
          <option value="">Select director</option>
          {directors.map((director) => (
            <option key={director.id} value={director.id}>
              {director.first_name} {director.last_name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formMoviePrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          value={selectedMovie?.price || ''}
          onChange={(e) => setSelectedMovie({ ...selectedMovie, price: e.target.value })}
          placeholder="Enter movie price"
        />
      </Form.Group>
      <Form.Group controlId="formMovieStock">
        <Form.Label>Stock</Form.Label>
        <Form.Control
          type="number"
          value={selectedMovie?.stock || ''}
          onChange={(e) => setSelectedMovie({ ...selectedMovie, stock: e.target.value })}
          placeholder="Enter stock quantity"
        />
      </Form.Group>
    </Form>
  </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={updateMovie}>
            Update Movie
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );


};

export default Movie;



