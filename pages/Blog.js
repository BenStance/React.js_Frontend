import React, { useEffect} from 'react';
import '../assets/styles/BlogStyles.css'; // Import CSS file for blog page styling
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import blogImage1 from '../assets/images/pict4.jpg';
import blogImage2 from '../assets/images/pic7.jpg';
import blogImage3 from '../assets/images/pict6.jpg';
import Subscription from "../pages/Subscription";

const Blog = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const blogPosts = [
    {
      title: 'The Future of Cybersecurity in the Digital Age',
      date: 'October 10, 2024',
      description: 'Explore the latest trends and advancements in cybersecurity. Learn how businesses can stay ahead of evolving threats and protect their digital assets.',
      image: blogImage1,
    },
    {
      title: 'AI and Machine Learning: Transforming Businesses',
      date: 'September 20, 2024',
      description: 'Discover how AI and Machine Learning are revolutionizing industries, enhancing customer experiences, and driving innovation in businesses across the globe.',
      image: blogImage2,
    },
    {
      title: 'Web Development in 2024: What You Need to Know',
      date: 'August 15, 2024',
      description: 'Stay ahead of the curve with the latest web development trends and technologies. Learn how to build modern, responsive websites that engage users.',
      image: blogImage3,
    },
  ];

  return (
    <div className="blog-container">
      <section className="blog-hero">
        <Container>
          <h1 className="blog-title" data-aos="fade-down">TEYORA Tech Blog</h1>
          <p className="blog-subtitle" data-aos="fade-up">Stay updated with the latest tech insights and industry trends from TEYORA.</p>
        </Container>
      </section>

      <section className="blog-posts">
        <Container>
          <Row>
            {blogPosts.map((post, index) => (
              <Col md={4} key={index} className="mb-4">
                <Card className="blog-card" data-aos="fade-up">
                  <Card.Img variant="top" src={post.image} className="blog-image" />
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.description}</Card.Text>
                    <p className="blog-date">{post.date}</p>
                    <Button variant="primary" href="#read-more" className="blog-btn">Read More</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <Subscription />
    </div>
  );
};

export default Blog;
