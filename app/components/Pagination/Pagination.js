import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Pagination.scss';

export default class Pagination extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            count: null,
            currentPage: 1
        }
    }

    componentDidMount() {
        this.props.getRequestWithQuery('/api/getCount', this.props.selectedFilter, this.props.selectedSort)
        .then(res => {
            this.setState({ count: res.data });
        })
        .catch(err => {
            console.error(err);
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedFilter !== this.props.selectedFilter || nextProps.selectedSort !== this.props.selectedSort) {
            nextProps.getRequestWithQuery('/api/getCount', nextProps.selectedFilter, nextProps.selectedSort)
            .then(res => {
                this.setState({ count: res.data });
            })
            .catch(err => {
                console.error(err);
            });
        }
    }

    changePage = (e, i) => {
        this.setState({ currentPage: i });

        this.props.handlePaginationClick(e, i);
    }

    render() {
        const buttons = [];

        for (let i = 1; i <= this.state.count; i++) {
            buttons.push(<a className={`pagination__link ${this.state.currentPage === i ? 'pagination__link--active' : ''}`} href={`/page/${i}`} key={`link-to-page-${i}`} onClick={(e) => this.changePage(e, i)}>{i}</a>);
        }

        return(
            <div className="pagination">
                <div className="pagination__list">
                    {buttons}
                </div>
            </div>
        )
    }
}

Pagination.propTypes = {
    selectedFilter: PropTypes.string,
    selectedSort: PropTypes.string,
    count: PropTypes.number,
    handlePaginationClick: PropTypes.func,
    getRequestWithQuery: PropTypes.func
}
