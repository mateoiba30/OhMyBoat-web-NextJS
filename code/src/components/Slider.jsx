import React from 'react';
import '@/components/SlideStyles.css'
import RatingComponent from './profile/RatingComponent';
const InfiniteSlider = ({reviews}) => {
  const slides = [
    { id: 1, ReviewerFirstName: "Mateo1", ReviewerLastName: "Garcia", stars: 5},
    { id: 2, ReviewerFirstName: "Juan2", ReviewerLastName: "Perez", stars: 4},
    { id: 3, ReviewerFirstName: "Luis3", ReviewerLastName: "Gomez", stars: 3},
    { id: 4, ReviewerFirstName: "Pedro4", ReviewerLastName: "Lopez", stars: 2},
    { id: 5, ReviewerFirstName: "Carlos5", ReviewerLastName: "Gutierrez", stars: 1},
    { id: 6, ReviewerFirstName: "Jose6", ReviewerLastName: "Martinez", stars: 5},
    { id: 7, ReviewerFirstName: "Miguel7", ReviewerLastName: "Rodriguez", stars: 4},
    { id: 8, ReviewerFirstName: "Jorge8", ReviewerLastName: "Hernandez", stars: 3},
    { id: 9, ReviewerFirstName: "Javier9", ReviewerLastName: "Fernandez", stars: 2},
    { id: 10, ReviewerFirstName: "Raul10", ReviewerLastName: "Garcia", stars: 1},
  ];
  console.log(reviews)
  return (
    <div className="slider-container">
      <div className="slider">
        {reviews.map((slide) => (
          <div key={slide.id} className="slide">
        <div>
            <span className='text-sm'>
                {slide.ReviewerFirstName} {slide.ReviewerLastName}
            </span>
            <RatingComponent number={slide.stars} format='table'/>
        </div>
          </div>
        ))}
        {reviews.slice().reverse().map((slide) => (
          <div key={slide.id} className="slide">
        <div>
            <span className='text-sm'>
                {slide.ReviewerFirstName} {slide.ReviewerLastName}
            </span>
            <RatingComponent number={slide.stars} format='table'/>
        </div>
          </div>
        ))}
 
      </div>
    </div>
  );
};

export default InfiniteSlider;
