import React from 'react';
import ReactDOM from 'react-dom';
import Result from './Result'

class Question extends React.Component {

    constructor() {
        super();       
        this.onChanged = this.onChanged.bind(this);
        this.state = {
            chosenAnswer: null,
            disabled: false,
            score: 0
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            disabled: false
        });
    }

    onChanged(event) {
        //console.log("Question.onChanged ==> event : ", event)
        console.log("Question.onChanged ==> event name : ", event.target.name);
        //console.log(ReactDOM.findDOMNode(event.target).parentNode.parentElement.hasAttribute("data-valid"));
        let chosenAnswer = ReactDOM.findDOMNode(event.target).parentNode.parentElement; //<li>
        console.log("Question.onChanged ==> chosenAnswer : ", chosenAnswer);
        //let parent = ReactDOM.findDOMNode(event.target).parentNode.parentElement.parentElement;
        //console.log("Question.onChanged ==> parent : ", parent);
        //console.log("Question.onChanged ==> childElementCount : ", parent.childElementCount);
        //console.log("Question.onChanged ==> childNodes : ", parent.childNodes);

        //check whether user selected valid answer
        let isValid = chosenAnswer.hasAttribute("data-valid");
        console.log("Question.onChanged ==> isValid : ", isValid);
        if (isValid)
            chosenAnswer.setAttribute("class", "right")
        else
            chosenAnswer.setAttribute("class", "wrong")
        this.setState({
            isAnswerMode: false,
            chosenAnswer: event.target,
            disabled: true,
            score: isValid ? this.state.score + 1 : this.state.score
        });
    }

    renderImage() {
        if (this.props.currentQuestion.image) {
            return (
                <div className="question">
                    <img src={this.props.currentQuestion.image} alt={this.props.currentQuestion.question}></img>
                </div>
            );
        } else {
            return (null);
        }
    }

    renderResult() {
        if (this.props.isFinished) {
            return (<Result isFinished={this.props.isFinished} length={this.props.length} score={this.state.score} key="result" />);
        } else {
            return (null);
        }
    }

    renderQuestion() {
        if (!this.props.isFinished) {
            let choices = [];
            if (this.props.currentQuestion) {
                this.props.currentQuestion.choices.forEach((choice, i) => {
                    console.log("Question.render ==> index", i)
                    if (choice === this.props.currentQuestion.correctAnswer)
                        choices.push(
                            <li data-valid="1" key={choice} ref={choice}>
                                <label>
                                    <input type="radio" name={"ans-" + i} disabled={this.state.disabled ? true : false} onChange={(event) => this.onChanged(event)} />
                                    <span>{choice}</span>
                                </label>
                            </li>
                        )
                    else
                        choices.push(
                            <li key={choice} ref={choice}>
                                <label>
                                    <input type="radio" name={"ans-" + i} disabled={this.state.disabled ? true : false} onChange={(event) => this.onChanged(event)} />
                                    <span>{choice}</span>
                                </label>
                            </li>
                        );
                });
            }
            console.log("choices ", choices)

            return (
                <div className="quiz-panel" key="quiz-panel" data-type="question" style={{ display: "block" }}>
                    <h3>{this.props.currentQuestion.question}</h3>
                    {this.renderImage()}
                    <ul>
                        {choices}
                    </ul>
                </div>
            );
        } else {
            return null;
        }
    }
    render() {
        console.log("Question.render ==> state : ", this.state)
        console.log("Question.render ==> props : ", this.props);

        return [(           
            this.renderQuestion()
        ),
        (
            this.renderResult()
        )
        ]
    }
}

export default Question;