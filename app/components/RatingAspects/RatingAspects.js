import React from 'react';
import PropTypes from 'prop-types';

import './RatingAspects.scss';

import Aspect from './../Aspect/Aspect';
import { parseCamelCase } from './../../general/js/utils';

export default class RatingAspects extends React.Component {
    constructor(props) {
        super(props);
    }

    renderAspect = (key) => {
        const aspect = this.props.aspects[key];
        if (!aspect && this.props.isCard) return;

        return(
            <div className="aspect" key={key}>
                <div className="aspect__bar">
                    <div className="aspect__indicator" style={{width: `${aspect*10}%`}}></div>
                </div>
                <span className="aspect__rating">{aspect}</span>
                <span className="aspect__title">{parseCamelCase(key)}</span>
            </div>
        )
    }

    render() {
        return(
            <div className="rating-aspects">
                <h3 className="rating-aspects__title">Review aspects</h3>
                <div className="rating-aspects__list">
                    {Object.keys(this.props.aspects).map(this.renderAspect)}
                </div>
            </div>
        )
    }
}

RatingAspects.defaultProps = {
    aspects: {},
};

RatingAspects.propTypes = {
    aspects: PropTypes.object,
}
