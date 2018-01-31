import React from 'react';

import ReviewsNav from './components/ReviewsNav/ReviewsNav';
import ReviewsContainer from './components/ReviewsContainer/ReviewsContainer';

export default class App extends React.Component {
    render() {
        return(
            <main>
                <ReviewsNav />
                <ReviewsContainer />
            </main>
        )
    }
}