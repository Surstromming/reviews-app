import React from 'react';

import './ReviewsNav.scss';

export default class ReviewsNav extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <header className="reviews-header">
                <div className="container">
                    <ul className="reviews-nav">
                        <li className="reviews-nav__item reviews-nav__item--active">Reviews</li>
                        <li className="reviews-nav__item">Photos & videos</li>
                        <li className="reviews-nav__item">Tips</li>
                        <li className="reviews-nav__item">Q&A</li>
                        <li className="reviews-nav__item">Weather forecast</li>
                        <li className="reviews-nav__item">Apartment info</li>
                        <li className="reviews-nav__item">Map</li>
                    </ul>
                </div>
            </header>
        )
    }
}
