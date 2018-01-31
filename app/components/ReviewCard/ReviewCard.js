import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './ReviewCard.scss';

import RatingAspects from './../RatingAspects/RatingAspects';

export default class ReviewCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="review-card">
                <div className="review-card__user">
                    <div className="rating-box">{this.props.ratings.general.general}</div>
                    <svg className="review-card__icon" aria-hidden="true" focusable="false"><use xlinkHref="#icon-avatar"></use></svg>
                    <div className="review-card__user-name">{this.props.user}</div>
                    <div className="review-card__user-date">{moment(this.props.entryDate).format('DD MMMM YYYY')}</div>
                </div>
                <div className="review-card__content">
                    {this.props.titles.nl ? <h2 className="review-card__title">{this.props.titles.nl}</h2> : ''}
                    <RatingAspects aspects={this.props.ratings.aspects} isCard="true" />
                    <p className="review-card__text">
                        {this.props.texts.nl}
                    </p>
                    <p className="review-card__travel-date">Travelled as {this.props.traveledWith.toLowerCase()} in {moment(this.props.travelDate).format('MMMM YYYY')}</p>
                </div>
            </div>
        )
    }
}

ReviewCard.defaultProps = {
    traveledWith: '',
    entryDate: null,
    travelDate: null,
    ratings: {
        general: {
            general: null
        },
        aspects: {
            location: null,
            service: null,
            priceQuality: null,
            food: null,
            room: null,
            childFriendly: null,
            interior: null,
            size: null,
            activities: null,
            restaurants: null,
            sanitaryState: null,
            accessibility: null,
            nightlife: null,
            culture: null,
            surrounding: null,
            atmosphere: null,
            noviceSkiArea: null,
            advancedSkiArea: null,
            apresSki: null,
            beach: null,
            entertainment: null,
            environmental: null,
            pool: null,
            terrace: null
        }
    },
    titles: {
        nl: ''
    },
    texts: {
        nl: ''
    },
    user: '',
    locale: ''
};
