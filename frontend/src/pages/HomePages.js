import React from 'react';
import Header from '../components/home/Header/Header';
import CarouselSection from '../components/home/images/carouselSection';
import Heading from '../components/home/heading';
import Footer from '../components/home/footer';

function HomePage() {
    return(
        <div className="homePage">
        <Heading/>
        <CarouselSection/>
        <Footer/>
        </div>
    );
}

export default HomePage;