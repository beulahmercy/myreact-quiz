import React from 'react';

class Result extends React.Component {

    render() {
        return (
            <div className="quiz-panel" data-type="finish" style={{ display: this.props.isFinished ? 'block' : 'none' }}>
                <h3>Great job!</h3>
                <p className="result">You guessed <b>{this.props.score}</b> out of <b>{this.props.length}</b>!</p>
            </div>            
        );
    }
}

export default Result;