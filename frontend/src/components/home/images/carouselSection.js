import React from 'react';
// import Carousel from 'react-bootstrap/Carousel';
import Image1 from '../../../images/event1.jpeg';
import Image2 from '../../../images/event2.jpeg';
import Image3 from '../../../images/event3.jpeg';
import './carouselSection.css';
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap';

function CarouselSection() {
  return (
    <Carousel>
    
      <Carousel.Item interval={100}>
      <img
          className="d-block w-100"
          src={Image1}
          alt="First slide"
          // style={{ width:'500px', height: '300px'}}
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={100}>
      <img
          className="d-block w-100"
          src={Image2}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img
          className="d-block w-100"
          src={Image3}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>


  //   <div>
  //   {/* Carousel Section */}
  //   <Carousel>
  //     <Carousel.Item interval={3000}>
  //       <img
  //         className="d-block w-100"
  //         src="/images/slide1.jpg" // Assuming your image paths are correct
  //         alt="First slide"
  //       />
  //       <Carousel.Caption>
  //         <h3>Welcome to EventEase</h3>
  //         <p>Your go-to platform for all your event needs</p>
  //       </Carousel.Caption>
  //     </Carousel.Item>
  //     {/* Add more Carousel.Items for additional slides */}
  //   </Carousel>

  //   {/* Hero Section */}
  //   <section className="hero-section">
  //     <Container>
  //       <Row className="justify-content-center">
  //         <Col md={8} className="text-center">
  //           <h2>Host and Discover Exciting Events</h2>
  //           <p>Find and create events tailored to your interests</p>
  //           <Button variant="primary">Explore Events</Button>
  //         </Col>
  //       </Row>
  //     </Container>
  //   </section>

  //   {/* About Section */}
  //   <section className="about-section">
  //     <Container>
  //       <Row>
  //         <Col md={6}>
  //           <h2>About Us</h2>
  //           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero.</p>
  //         </Col>
  //         <Col md={6}>
  //           {/* Add an image or video here */}
  //         </Col>
  //       </Row>
  //     </Container>
  //   </section>

  //   {/* Call to Action Section */}
  //   <section className="cta-section">
  //     <Container>
  //       <Row className="justify-content-center">
  //         <Col md={8} className="text-center">
  //           <h2>Ready to Get Started?</h2>
  //           <p>Join EventEase today and start planning or attending events!</p>
  //           <Button variant="primary">Sign Up Now</Button>
  //         </Col>
  //       </Row>
  //     </Container>
  //   </section>
  // </div>
  );
}

export default CarouselSection;