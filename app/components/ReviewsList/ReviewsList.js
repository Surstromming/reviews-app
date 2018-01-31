import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './ReviewsList.scss';

import ReviewCard from './../ReviewCard/ReviewCard';

export default class ReviewsList extends React.Component {
    constructor(props) {
        super(props);
    }

    renderReviewCard = (item, index) => {
        return(
            <ReviewCard {...item} key={item._id} />
        )
    }

    render() {
        return(
            <section className="reviews-list">
                {this.props.reviews.map(this.renderReviewCard)}
            </section>
        )
    }
}

ReviewsList.propTypes = {
    reviews: PropTypes.array.isRequired
}
