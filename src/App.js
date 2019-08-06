import React from 'react';
import './App.css';
import { Button } from 'reactstrap';
import Question from './components/Question'

class App extends React.Component {

  constructor() {
    console.log("constructor")
    super();
    this.state = {
      currentQuestion: 0,
      isFinished: false,
      quiz: [
        {
          question: "What is React?",
          choices: ["A JavaScript framework", "CSS preprocessor", "Language that compiles to CoffeeScript"],
          correctAnswer: "A JavaScript framework"
        },
        {
          question: "Who made React?",
          choices: ["Google", "Twitter", "Facebook"],
          correctAnswer: "Facebook"
        },
        {
          question: "What is React used for?",
          choices: ["Adding variables to CSS", "Building web apps", "Making websites cloud-ready"],
          correctAnswer: "Building web apps"
        },
        {
          question: "What is special about React?",
          choices: ["It brings HTML6 features to today's browser", "Virtual DOM", "Database integration"],
          correctAnswer: "Virtual DOM"
        },
        {
          question: "Which language is this?",
          image: "https://tutorialzine.com/media/2014/07/3.png",
          choices: ["JavaScript", "CoffeeScript", "JSX"],
          correctAnswer: "JSX"
        },
        {
          question: "What does this component do?",
          image: "https://tutorialzine.com/media/2014/07/1.png",
          choices: ["Prints 'Hello World!'", "Prints 'Hello', followed by the name attribute that was passed when initializing the component", "Prints the numbers from 1 to 10."],
          correctAnswer: "Prints 'Hello', followed by the name attribute that was passed when initializing the component"
        },
        {
          question: "What does this code do?",
          image: "https://tutorialzine.com/media/2014/07/2.png",
          choices: ["Provides an initial value for the component's state", "Tells how many times the component should be focused", "Seeds a random number generator"],
          correctAnswer: "Provides an initial value for the component's state"
        },
        {
          question: "What does this code do?",
          image: "https://tutorialzine.com/media/2014/07/4.png",
          choices: ["Initializes a new UL component, and generates LI components for each entry in the items array property.", "Initializes a Google Map for every location in the items array", "It won't work"],
          correctAnswer: "Initializes a new UL component, and generates LI components for each entry in the items array property."
        }
      ]
    };

    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(event) {

    this.setState(state => ({
      currentQuestion: state.currentQuestion + 1
    }));

    if (this.state.currentQuestion === this.state.quiz.length - 1) {
      this.setState({
        isFinished: true
      })
    }

  }

  renderQuestion() {
    return (<Question currentQuestion={this.state.quiz[this.state.currentQuestion]} isFinished={this.state.isFinished} length={this.state.quiz.length} key="question" />);
  }

  render() {
    //when state changes the width changes
    console.log("App.render ==> state : ", this.state)
    console.log("App.render ==> props : ", this.props);
    return (
      <div>
        <div className="quiz" style={{ display: "block" }}>
          {this.renderQuestion()}
          <div className="bottom" style={{ display: this.state.isFinished ? 'none' : 'block' }}>
            <Button color="primary" onClick={this.handleClick} name="next">Next</Button>
            <p className="quiz-progress"><b>{this.state.currentQuestion + 1}</b> of <b>{this.state.quiz.length}</b></p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
