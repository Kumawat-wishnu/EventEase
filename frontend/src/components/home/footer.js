import React from 'react';
import './footer.css';
import {Container, Row, Col, Button } from 'react-bootstrap';

function Footer() {
    return (
       <div>
       <section className="hero-section">
        <Container>
            <Row className="justify-content-center">
                <Col md={8} className="text-center">
                    <h2>Host and Discover Exciting Events</h2>
                    <p>Find and create events tailored to your interests</p>
                    <Button variant="primary">Explore Events</Button>
                </Col>
            </Row>
        </Container>  
        </section>

    <section className="cta-section">
       <Container>
         <Row className="justify-content-center">
           <Col md={8} className="text-center">
           <h2>Ready to Get Started?</h2>
             <p>Join EventEase today and start planning or attending events!</p>
            <Button variant="primary">Sign Up Now</Button>
           </Col>
         </Row>
       </Container>
    </section> 
    <section className="Footer">
    <footer className="footer">
      <div className="container">
        <div className="row my-4">
          <div className="col-md-4">
            <h4>About Us</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero.</p>
          </div>
          <div className="col-md-4">
            <h4>Contact Us</h4>
            <p>Email: info@events.com</p>
            <p>Phone: 123-456-7890</p>
          </div>
          <div className="col-md-4">
            <h4>Follow Us</h4>
            <p>Stay connected on social media:</p>
            <ul className="social-icons">
              <li><a href="#"><i className="fab fa-facebook"></i></a></li>
              <li><a href="#"><i className="fab fa-twitter"></i></a></li>
              <li><a href="#"><i className="fab fa-instagram"></i></a></li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="text-center">&copy; 2024 EventEase. All rights reserved.</p>
      </div>
    </footer>
    </section>
       </div>
    );
}

export default Footer;