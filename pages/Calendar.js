import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Button, Modal, Form, Row, Col, Card } from 'react-bootstrap';
import { FaClipboardList } from 'react-icons/fa';
import '../assets/styles/Calendar.css';

const CalendarPage = () => {
 

  const handleDateChange = (newDate) => {
    setDate(newDate);
    const formattedDate = newDate.toISOString().split('T')[0];
    const activity = activities.find((activity) => activity.date === formattedDate);
    if (activity) {
      setSelectedActivity(activity);
      setShowModal(true);
    } else {
      setSelectedActivity(null);
      setShowAddModal(true);
    }
  };

  const recentActivities = activities.filter((activity) => {
    return new Date(activity.date) >= new Date();
  });

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Admin Activity Calendar</h2>
      <Calendar onChange={handleDateChange} value={date} className="react-calendar" />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedActivity ? selectedActivity.title : 'No Activity'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedActivity ? selectedActivity.description : 'No activity set for this date.'}
        </Modal.Body>
        <Modal.Footer>
          {selectedActivity && (
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          )}
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="activityTitle">
              <Form.Label>Activity Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter activity title"
                value={newActivity.title}
                onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="activityDescription">
              <Form.Label>Activity Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter activity description"
                value={newActivity.description}
                onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddActivity}>
            Save Activity
          </Button>
        </Modal.Footer>
      </Modal>

      <Row className="activities-section">
        <Col md={12}>
          <Card className="activities-card">
            <h4>Recent Activities</h4>
            <ul className="activities-list">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity, index) => (
                  <li key={index}>
                    <FaClipboardList /> {activity.title}: {activity.description} (on {activity.date})
                  </li>
                ))
              ) : (
                <p>No recent activities.</p>
              )}
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CalendarPage;
