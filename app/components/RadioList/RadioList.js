import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { capitalize } from './../../general/js/utils';

import './RadioList.scss';

import RadioItem from './../RadioItem/RadioItem';

export default class RadioList extends React.Component {
    constructor() {
        super();

        this.state = {
            traveledWith: []
        }
    }

    componentDidMount() {
        axios
            .get('/api/getFilterOptions')
            .then(res => {
                this.setState({ traveledWith: res.data });
            })
            .catch(err => {
                console.error(err);
            });
    }

    renderFilterList = (item, index) => {
        const title = capitalize(item._id);
        const lowerTitle = title.toLowerCase();

        return(
            <RadioItem
                key={`filter-${title}`}
                heading={title}
                count={item.count}
                title={lowerTitle}
                group='traveled-with'
                selected={this.props.selectedFilter}
                onChange={this.props.handleFilterChange}
            />
        )
    }

    render() {
        return(
            <div className="radio-list">
                <div className="radio-list__inner">
                    <h3 className="radio-list__title">Traveled with</h3>
                    <RadioItem
                        title='filter-by-all'
                        group='traveled-with'
                        quantity={this.props.quantity}
                        selected={this.props.selectedFilter}
                        onChange={this.props.handleFilterChange}
                    />
                    {this.state.traveledWith.map(this.renderFilterList)}
                </div>
                <div className="radio-list__inner">
                    <h3 className="radio-list__title">Sort by</h3>
                    <RadioItem
                        heading='Travel date'
                        title='sort-by-travel'
                        group='sort-by'
                        selected={this.props.selectedSort}
                        onChange={this.props.handleSortChange}
                    />
                    <RadioItem
                        heading="Entry date"
                        title='sort-by-entry'
                        group='sort-by'
                        selected={this.props.selectedSort}
                        onChange={this.props.handleSortChange}
                    />
                </div>
            </div>
        )
    }
}

RadioList.propTypes = {
    selectedFilter: PropTypes.string,
    selectedSort: PropTypes.string,
    handleSortChange: PropTypes.func,
    handleFilterChange: PropTypes.func,
    quantity: PropTypes.number
}
