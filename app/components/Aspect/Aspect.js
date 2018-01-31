import React from 'react';

import './Aspect.scss';

export default class Aspect extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className="aspect">
                <div className="aspect__bar">
                    <div className="aspect__indicator" style={{width: `82%`}}></div>
                </div>
                <span className="aspect__rating">8.2</span>
                <span className="aspect__title">Service</span>
            </div>
        )
    }
}