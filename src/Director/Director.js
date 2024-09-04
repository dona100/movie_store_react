import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import './Director.css';

const Director = () => {
  const [directors, setDirectors] = useState([]);
  const [newDirector, setNewDirector] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
  });
  const [selectedDirector, setSelectedDirector] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDirectorDetailsModal, setShowDirectorDetailsModal] = useState(false);

  useEffect(() => {
    fetchDirectors();
  }, []);

  const fetchDirectors = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/directors/');
      setDirectors(response.data);
    } catch (error) {
      console.error('Error fetching directors:', error);
    }
  };

  const createDirector = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/directors/', newDirector);
      setNewDirector({
        first_name: '',
        last_name: '',
        date_of_birth: '',
      });
      setShowAddModal(false);
      fetchDirectors();
    } catch (error) {
      console.error('Error creating director:', error);
    }
  };

  const deleteDirector = async (directorId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/directors/${directorId}/`);
      fetchDirectors();
    } catch (error) {
      console.error('Error deleting director:', error);
    }
  };

  const updateDirector = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/directors/${selectedDirector.id}/`, selectedDirector);
      setShowUpdateModal(false);
      fetchDirectors();
    } catch (error) {
      console.error('Error updating director:', error);
    }
  };

  const viewDirectorDetails = async (directorId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/directors/${directorId}/`);
      setSelectedDirector(response.data);
      setShowDirectorDetailsModal(true);
    } catch (error) {
      console.error('Error fetching director details:', error);
    }
  };

  const editDirector = () => {
    setShowDirectorDetailsModal(false);
    setShowUpdateModal(true);
  };

  return (
    <div className='director-container'>
      {/* Add New Director Button */}
      <Button className='add-director-button' variant="primary" onClick={() => setShowAddModal(true)}>
        Add Director
      </Button>

      {/* Add New Director Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Director</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={newDirector.first_name}
                onChange={(e) => setNewDirector({ ...newDirector, first_name: e.target.value })}
                placeholder="Enter First Name"
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={newDirector.last_name}
                onChange={(e) => setNewDirector({ ...newDirector, last_name: e.target.value })}
                placeholder="Enter Last Name"
              />
            </Form.Group>
            <Form.Group controlId="formDateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                value={newDirector.date_of_birth}
                onChange={(e) => setNewDirector({ ...newDirector, date_of_birth: e.target.value })}
                placeholder="Enter Date of Birth"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={createDirector}>
            Add Director
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Director List */}
      <div>
        <table className='director-table'>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Birth</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {directors.map((director) => (
              <tr className='director-row' key={director.id}>
                <td>{director.first_name}</td>
                <td>{director.last_name}</td>
                <td>{director.date_of_birth}</td>
                <td>
                  <Button variant="outline-info" onClick={() => viewDirectorDetails(director.id)}>
                    View Details
                  </Button>
                  <Button variant="outline-danger" onClick={() => deleteDirector(director.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Director Details Modal */}
      <Modal show={showDirectorDetailsModal} onHide={() => setShowDirectorDetailsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Director Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>First Name: {selectedDirector?.first_name}</p>
          <p>Last Name: {selectedDirector?.last_name}</p>
          <p>Date of Birth: {selectedDirector?.date_of_birth}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDirectorDetailsModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={editDirector}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Update Director Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Director</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={selectedDirector?.first_name || ''}
                onChange={(e) => setSelectedDirector({ ...selectedDirector, first_name: e.target.value })}
                placeholder="Enter First Name"
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={selectedDirector?.last_name || ''}
                onChange={(e) => setSelectedDirector({ ...selectedDirector, last_name: e.target.value })}
                placeholder="Enter Last Name"
              />
            </Form.Group>
            <Form.Group controlId="formDateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                value={selectedDirector?.date_of_birth || ''}
                onChange={(e) => setSelectedDirector({ ...selectedDirector, date_of_birth: e.target.value })}
                placeholder="Enter Date of Birth"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={updateDirector}>
            Update Director
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Director;
