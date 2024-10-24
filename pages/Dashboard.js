import React from 'react';
import { FaUser, FaChartLine, FaProjectDiagram, FaBell, FaBug, FaUserCheck, FaTrashAlt, FaUserPlus } from 'react-icons/fa';
import { Button, Card, Row, Col, ProgressBar, Table, Form, Alert, ListGroup } from 'react-bootstrap';
import {  Link } from 'react-router-dom';
import CalendarComponent from './Calendar';
import '../assets/styles/Dashboard.css';
import MessagesList from './MessageList';
// import UpdateProgressForm from './ProgressUpdate';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome to Your Dashboard</h1>
        <p>Monitor and manage your activities here.</p>
      </div>

      {/* Stats Overview */}
      <div>
      <Row className="dashboard-overview">
        <Col md={4}>
          <Card className="overview-card">
            <FaUser className="icon" />
            <h4>Total Users</h4>
            <p>{users.length} Active Users</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="overview-card">
            <FaProjectDiagram className="icon" />
              <h4>TEYORA Projects</h4>
              {/* Dynamically display the number of projects */}
              <p>{projectCount} Projects</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="overview-card">
            <FaChartLine className="icon" />
            <h4>Performance</h4>
            <ProgressBar now={performance} label={`${performance}%`} className="performance-bar" />
          </Card>
        </Col>
      </Row>

      <Row className="dashboard-overview">
        <Col md={4}>
                <Card className="overview-card">
                    <FaBell className="icon" />
                    <h4>Notifications</h4>
                    <p>{messageCount + activityCount} New Alerts</p> {/* Update to show counts */}
                </Card>
            </Col>
        <Col md={4}>
          <Card className="overview-card">
            <FaBug className="icon" />
            <h4>System Penetration Report</h4>
            <p>Latest Security Reports Available</p>
          </Card>
        </Col>
        {/* Subscribed Users Card */}
      <Col md={4}>
        <Card className="overview-card">
          <FaUserCheck className="icon" />
          <h4>Subscribed Users</h4>
          <p>{subscriptionCount} clients have Subscribed</p>
        </Card>
      </Col>

      {/* Handle any error messages */}
      {error && <p className="error-message">{error}</p>}
      </Row>
      {error && <p className="error-message">{error}</p>}
      </div>
      <CalendarComponent />

      {/* User Management Section */}
      <Row className="user-management-section">
        <Col>
          <h4>User Management</h4>
          {error && <p className="text-danger">{error}</p>}
          <Table striped bordered hover responsive className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td data-label="ID">{user.id}</td>
                  <td data-label="Username">{user.username}</td>
                  <td data-label="Email">{user.email}</td>
                  <td data-label="Role">{user.is_admin ? 'Admin' : 'User'}</td>
                  <td data-label="Actions" className="butt-flex">
                    <Button className="me-2" onClick={() => handleDeleteUser(user.id)}>
                      <FaTrashAlt /> Delete
                    </Button>
                    {!user.is_admin && (
                      <Button className="me-2" onClick={() => handlePromoteUser(user.id)}>
                        <FaUserPlus /> Promote to Admin
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      
      {/* Post Project Progress Section */}
      <Row className="post-progress-section">
        <Col>
          <h4>Post Project Progress</h4>
          <Form onSubmit={handleProgressSubmit}>
            <Form.Group controlId="selectClient">
              <Form.Label>Select Client</Form.Label>
              <Form.Control
                as="select"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                required
              >
                <option value="">-- Select Client --</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="projectTitle" className="mt-3">
              <Form.Label>Project Title</Form.Label>
              <Form.Control
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="Enter project title"
                required
              />
            </Form.Group>

            <Form.Group controlId="projectDescription" className="mt-3">
              <Form.Label>Project Description</Form.Label>
              <Form.Control
                as="textarea"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                rows={4}
                placeholder="Enter project description"
                required
              />
            </Form.Group>

            <Form.Group controlId="progressPercentage" className="mt-3">
              <Form.Label>Progress Percentage</Form.Label>
              <Form.Control
                type="number"
                value={progressPercentage}
                onChange={(e) => setProgressPercentage(e.target.value)}
                placeholder="Enter progress percentage"
                required
                min="0"
                max="100"
              />
            </Form.Group>

            <Button type="submit" className="mt-3" variant="success">
              Post Progress
            </Button>

            {successMessage && <Alert className="mt-3" variant="success">{successMessage}</Alert>}
          </Form>
        </Col>
      </Row>

      {/* <UpdateProgressForm /> */}

      <MessagesList />
      <div className="dashboard">
      {/* Other sections of your dashboard */}

      {/* Subscribed Emails Section */}
      <Row className="mt-4">
        <Col md={12}>
          <Card className="subscribed-emails-card">
            <Card.Header><h4>Subscribed Emails</h4></Card.Header>
            <Card.Body>
              {subscribedEmails.length > 0 ? (
                <ListGroup>
                  {subscribedEmails.map((email, index) => (
                    <ListGroup.Item key={index}>
                      {email}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p>No subscribed emails found.</p>
              )}
              {error && <p className="error-message">{error}</p>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </div>
  

      {/* Call-to-Action Buttons */}
      <div className="cta-buttons buttons"> 
        <Link className="cta-btn btn btn-primary" to="/new_project">
          New Project
        </Link>
        {/* <Button className="cta-btn" variant="outline-secondary">
          Support
        </Button>
        <Button className="cta-btn" variant="info">
          View Analytics
        </Button> */}

      </div>
    </div>
  );
};

export default Dashboard;
