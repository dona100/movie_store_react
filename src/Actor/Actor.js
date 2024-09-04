import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import './Actor.css';

const Actor = () => {
  const [actors, setActors] = useState([]);
  const [newActor, setNewActor] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
  });
  const [selectedActor, setSelectedActor] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showActorDetailsModal, setShowActorDetailsModal] = useState(false);

  useEffect(() => {
    fetchActors();
  }, []);

  const fetchActors = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/actors/');
      setActors(response.data);
    } catch (error) {
      console.error('Error fetching actors:', error);
    }
  };

  const createActor = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/actors/', newActor);
      setNewActor({
        first_name: '',
        last_name: '',
        date_of_birth: '',
      });
      setShowAddModal(false);
      fetchActors();
    } catch (error) {
      console.error('Error creating actor:', error);
    }
  };

  const deleteActor = async (actorId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/actors/${actorId}/`);
      fetchActors();
    } catch (error) {
      console.error('Error deleting actor:', error);
    }
  };

  const updateActor = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/actors/${selectedActor.id}/`, selectedActor);
      setShowUpdateModal(false);
      fetchActors();
    } catch (error) {
      console.error('Error updating actor:', error);
    }
  };

  const viewActorDetails = async (actorId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/actors/${actorId}/`);
      setSelectedActor(response.data);
      setShowActorDetailsModal(true);
    } catch (error) {
      console.error('Error fetching actor details:', error);
    }
  };

  const editActor = () => {
    setShowActorDetailsModal(false);
    setShowUpdateModal(true);
  };

  return (
    <div className='actor-container'>
      {/* Add New Actor Button */}
      <Button className='add-actor-button' variant="primary" onClick={() => setShowAddModal(true)}>
        Add Actor
      </Button>

      {/* Add New Actor Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Actor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={newActor.first_name}
                onChange={(e) => setNewActor({ ...newActor, first_name: e.target.value })}
                placeholder="Enter first name"
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={newActor.last_name}
                onChange={(e) => setNewActor({ ...newActor, last_name: e.target.value })}
                placeholder="Enter last name"
              />
            </Form.Group>
            <Form.Group controlId="formDateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                value={newActor.date_of_birth}
                onChange={(e) => setNewActor({ ...newActor, date_of_birth: e.target.value })}
                placeholder="Enter date of birth"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={createActor}>
            Add Actor
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Actor List */}
      <div>
        <table className='actor-table'>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Birth</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {actors.map((actor) => (
              <tr className='actor-row' key={actor.id}>
                <td>{actor.first_name}</td>
                <td>{actor.last_name}</td>
                <td>{actor.date_of_birth}</td>
                <td>
                  <Button variant="outline-info" onClick={() => viewActorDetails(actor.id)}>
                    View Details
                  </Button>
                  <Button variant="outline-danger" onClick={() => deleteActor(actor.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Actor Details Modal */}
      <Modal show={showActorDetailsModal} onHide={() => setShowActorDetailsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Actor Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>First Name: {selectedActor?.first_name}</p>
          <p>Last Name: {selectedActor?.last_name}</p>
          <p>Date of Birth: {selectedActor?.date_of_birth}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowActorDetailsModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={editActor}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Update Actor Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Actor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={selectedActor?.first_name || ''}
                onChange={(e) => setSelectedActor({ ...selectedActor, first_name: e.target.value })}
                placeholder="Enter first name"
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={selectedActor?.last_name || ''}
                onChange={(e) => setSelectedActor({ ...selectedActor, last_name: e.target.value })}
                placeholder="Enter last name"
              />
            </Form.Group>
            <Form.Group controlId="formDateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                value={selectedActor?.date_of_birth || ''}
                onChange={(e) => setSelectedActor({ ...selectedActor, date_of_birth: e.target.value })}
                placeholder="Enter date of birth"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={updateActor}>
            Update Actor
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Actor;
