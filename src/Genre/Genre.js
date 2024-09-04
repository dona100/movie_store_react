import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import './Genre.css';

const Genre = () => {
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState({ name: '' });
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showGenreDetailsModal, setShowGenreDetailsModal] = useState(false);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/genre/');
      setGenres(response.data);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const createGenre = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/genre/', newGenre);
      setNewGenre({ name: '' });
      setShowAddModal(false);
      fetchGenres();
    } catch (error) {
      console.error('Error creating genre:', error);
    }
  };

  const deleteGenre = async (genreId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/genre/${genreId}/`);
      fetchGenres();
    } catch (error) {
      console.error('Error deleting genre:', error);
    }
  };

  const updateGenre = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/genre/${selectedGenre.id}/`, selectedGenre);
      setShowUpdateModal(false);
      fetchGenres();
    } catch (error) {
      console.error('Error updating genre:', error);
    }
  };

  const viewGenreDetails = async (genreId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/genre/${genreId}/`);
      setSelectedGenre(response.data);
      setShowGenreDetailsModal(true);
    } catch (error) {
      console.error('Error fetching genre details:', error);
    }
  };

  const editGenre = () => {
    setShowGenreDetailsModal(false);
    setShowUpdateModal(true);
  };

  return (
    <div className='genre-container'>
      {/* Add New Genre Button */}
      <Button className='add-genre-button' variant="primary" onClick={() => setShowAddModal(true)}>
        Add Genre
      </Button>

      {/* Add New Genre Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Genre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formGenreName">
              <Form.Label>Genre Name</Form.Label>
              <Form.Control
                type="text"
                value={newGenre.name}
                onChange={(e) => setNewGenre({ name: e.target.value })}
                placeholder="Enter genre name"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={createGenre}>
            Add Genre
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Genre List */}
      <div>
        <table className='genre-table'>
          <thead>
            <tr>
              <th>Genre Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {genres.map((genre) => (
              <tr className='genre-row' key={genre.id}>
                <td>{genre.name}</td>
                <td>
                  <Button variant="outline-info" onClick={() => viewGenreDetails(genre.id)}>
                    View Details
                  </Button>
                  <Button variant="outline-danger" onClick={() => deleteGenre(genre.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Genre Details Modal */}
      <Modal show={showGenreDetailsModal} onHide={() => setShowGenreDetailsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Genre Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Name: {selectedGenre?.name}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowGenreDetailsModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={editGenre}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Update Genre Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Genre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formGenreName">
              <Form.Label>Genre Name</Form.Label>
              <Form.Control
                type="text"
                value={selectedGenre?.name || ''}
                onChange={(e) => setSelectedGenre({ ...selectedGenre, name: e.target.value })}
                placeholder="Enter genre name"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={updateGenre}>
            Update Genre
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Genre;
