import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './ReviewsInfo.scss';

import RatingAspects from './../RatingAspects/RatingAspects';
import RadioList from './../RadioList/RadioList';

export default class ReviewsInfo extends React.Component {
    constructor() {
        super();

        this.state = {
            general: null,
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
        }
    }

    componentDidMount() {
        axios
            .get('/api/getInfo')
            .then(res => {
                this.setState(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        return(
            <section className="reviews-info">
                <h1 className="reviews-info__title">Reviews <span className="reviews-info__quantity">({this.state.quantity})</span></h1>
                <div className="reviews-info__inner">
                    <div className="reviews-info__general">
                        <div className="rating-box rating-box--general">{this.state.general}</div>
                        <RadioList
                            quantity={this.state.quantity}
                            handleFilterChange={this.props.handleFilterChange}
                            handleSortChange={this.props.handleSortChange}
                            selectedFilter={this.props.selectedFilter}
                            selectedSort={this.props.selectedSort}
                        />
                    </div>
                    <div className="reviews-info__aspects">
                        <RatingAspects aspects={this.state.aspects} />
                    </div>
                </div>
            </section>
        )
    }
}

ReviewsInfo.propTypes = {
    selectedFilter: PropTypes.string,
    selectedSort: PropTypes.string,
    handleSortChange: PropTypes.func,
    handleFilterChange: PropTypes.func,
    quantity: PropTypes.number
}
