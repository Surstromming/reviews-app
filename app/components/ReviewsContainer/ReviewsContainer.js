import React from 'react';
import axios from 'axios';

import './ReviewsContainer.scss';

import ReviewsInfo from './../ReviewsInfo/ReviewsInfo';
import ReviewsList from './../ReviewsList/ReviewsList';
import Pagination from './../Pagination/Pagination';

export default class ReviewsContainer extends React.Component {
    constructor() {
        super();

        this.state = {
            selectedFilter: 'filter-by-all',
            selectedSort: 'sort-by-travel',
            currentCount: null,
            reviews: []
        }
    }

    componentDidMount() {
        this.getRequestWithQuery('/api/updateReviews', this.state.selectedFilter, this.state.selectedSort)
            .then(res => {
                this.setState({ reviews: res.data, currentCount: res.data.length });
            })
            .catch(err => {
                console.error(err);
            });
    }

    handleFilterChange = (event) => {
        const value = event.target.value;

        this.getRequestWithQuery('/api/updateReviews', value, this.state.selectedSort)
            .then(res => {
                this.setState({ reviews: res.data, currentCount: res.data.length });
            })
            .catch(err => {
                console.error(err);
            });

            this.setState({ selectedFilter: value });
    }

    handleSortChange = (event) => {
        const value = event.target.value;

        this.getRequestWithQuery('/api/updateReviews', this.state.selectedFilter, value)
            .then(res => {
                this.setState({ reviews: res.data, currentCount: res.data.length });
            })
            .catch(err => {
                console.error(err);
            });

        this.setState({ selectedSort: value });
    }

    getRequestWithQuery = (url, filter, sort) => {
        return axios.get(`${url}?filter=${filter}&sort=${sort}`)
    }

    handlePaginationClick = (event, page) => {
        event.preventDefault();

        axios
            .get(`/api/page/${page}?filter=${this.state.selectedFilter}&sort=${this.state.selectedSort}`)
            .then(res => {
                this.setState({ reviews: res.data, currentCount: res.data.length });
                window.scrollTo(0, document.body.scrollHeight);
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        return(
            <div className="container">
                <section className="reviews-container">
                    <ReviewsInfo
                        handleFilterChange={this.handleFilterChange}
                        handleSortChange={this.handleSortChange}
                        selectedFilter={this.state.selectedFilter}
                        selectedSort={this.state.selectedSort}
                    />
                    <ReviewsList
                        reviews={this.state.reviews}
                    />
                    <Pagination
                        getRequestWithQuery={this.getRequestWithQuery}
                        selectedFilter={this.state.selectedFilter}
                        selectedSort={this.state.selectedSort}
                        handlePaginationClick={this.handlePaginationClick}
                        count={this.state.currentCount}
                    />
                </section>
            </div>
        )
    }
}
