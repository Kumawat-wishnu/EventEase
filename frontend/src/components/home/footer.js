import React from 'react';
import './footer.css';
import {Container, Row, Col, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';

function Footer() {
    return (
       <div>
       <section className="hero-section">
        <Container>
            <Row className="justify-content-center">
                <Col md={8} className="text-center">
                    <h2>Host and Discover Exciting Events</h2>
                    <p>Find and create events tailored to your interests</p>
                    <Button as={Link} to="/events" variant="primary">Explore Events</Button>
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
            <Button as={Link} to="/signup" variant="primary">Sign Up Now</Button>
           </Col>
         </Row>
       </Container>
    </section> 
    <section className="Footer">
    <footer className="footer">
        <div className="container">
            <div className="row my-4">
                <div className="col-md-6">
                    <h4 className='contactUs'>Contact Us</h4>
                    <p className="EP">Email: vishnukumar122d@gmail.com</p>
                    <p className="EP">Phone: 8000139034</p>
                </div>
                <div className="col-md-6">
                    <h4 className="followUs">Follow Us</h4>
                    <p className="FL">Stay connected on social media:</p>
                    <ul className="social-icons">
                        <li><a href="https://www.linkedin.com/in/vishnu-kumawat-801508253/"><i className="fab fa-linkedin-in"></i></a></li>
                        <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                        <li><a href="https://www.instagram.com/vishnu___kumawat/?hl=en"><i className="fab fa-instagram"></i></a></li>
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