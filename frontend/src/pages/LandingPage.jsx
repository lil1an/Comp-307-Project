import React, {useState, useEffect, useRef} from 'react';
import NavBar from '../components/NavBar';
import '../css/landing-page.css';
import marty from '../assets/marty_happy 09.23.00 1.png';
import carouselimage1 from '../assets/carousel-img1.jpg';
import carouselimage2 from '../assets/carousel-img2.png';
import carouselimage3 from '../assets/carousel-img3.png';
import carouselimage4 from '../assets/carousel-img4.jpg';

function LandingPage() {

  // Functions for carousel behaviour, logic from https://www.w3schools.com/howto/howto_js_slideshow.asp

  // Keeping track of which image is being shown
   const [slideIndex, setSlideIndex] = useState(1);

  // Function to update slideIndex and show the corresponding slide
  function plusSlides(n) {
    setSlideIndex((prevIndex) => {
      const newIndex = prevIndex + n;
      return newIndex;
    });
  }

  function currentSlide(n) {
    setSlideIndex(n);
  }

  // Function to show the slides based on slideIndex
  useEffect(() => {
    const slides = document.getElementsByClassName('carousel-img');
    const dots = document.getElementsByClassName('dot');

    if (slides.length === 0 || dots.length === 0) return;

    // Loop through all slides and hide them
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }

    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }

    const validIndex = (slideIndex - 1 + slides.length) % slides.length;
    slides[validIndex].style.display = 'block';
    dots[validIndex].className += ' active';
  }, [slideIndex]);

  // End of functions from https://www.w3schools.com/howto/howto_js_slideshow.asp

  return (
    <>
      <NavBar />
      
      <div className='landing-page'>
        <div className='landing-page-content'>
          <div className='landing-page-text-box'>
            <div className='text-box-left'>
              <h1 className='text-box-title'>Welcome to Commit<span className="red-text">2</span>Gather!</h1>
              <p className='text-box-content'>This booking tool allows McGill University students and teachers alike to better manage their meetings/appointments.
                  Commit2Gather uses a visually intuitive calendar view to keep track of your booking schedule.
                  Users can create or edit their own meetings, and then notify invitees. All future & past meetings can be seen on the Meetings page!</p>
            </div>
            <div className='text-box-right'>
              <img className='marty-image' src={marty}/>
            </div>        
          </div>
          <div className="carousel-container">
            <div className="carousel-img">
              <img className='img' src={carouselimage1}/>
            </div>
            <div className="carousel-img">
              <img className='img' src={carouselimage2}/>
            </div>
            <div className="carousel-img">
              <img className='img' src={carouselimage3}/>
            </div>
            <div className="carousel-img">
              <img className='img' src={carouselimage4}/>
            </div>

            {/* Carousel utilities from from https://www.w3schools.com/howto/howto_js_slideshow.asp*/}
            <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
            <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
          </div>
          <br></br>

          <div style={{textAlign: "center"}}>
            <span className="dot" onClick={() => currentSlide(1)}></span>
            <span className="dot" onClick={() => currentSlide(2)}></span>
            <span className="dot" onClick={() => currentSlide(3)}></span>
            <span className="dot" onClick={() => currentSlide(4)}></span>
          </div>
          {/* End of carousel utilities from https://www.w3schools.com/howto/howto_js_slideshow.asp*/ }
        </div>
      </div>
    </>
  )
}

export default LandingPage
