import React from 'react';
import PropTypes from 'prop-types';

import './RadioItem.scss';

export default class RadioItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="radio-item">
                <input 
                    className="radio-item__input" 
                    type="radio" 
                    id={this.props.title} 
                    value={this.props.title} 
                    name={this.props.group}
                    onChange={this.props.onChange}
                    checked={this.props.selected === this.props.title} 
                />
                <label className="radio-item__label" htmlFor={this.props.title}>
                    <span>{this.props.heading || 'All'} {this.props.count || this.props.quantity ? '(' + (this.props.count || this.props.quantity) + ')' : ''}</span>
                </label>
            </div>
        )
    }
}

RadioItem.propTypes ={
    title: PropTypes.string.isRequired,
    group: PropTypes.string.isRequired,
    group: PropTypes.string.isRequired,
    selected: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    quantity: PropTypes.number,
    heading: PropTypes.string,
    count: PropTypes.number
}