import "./Quiz.scss";
import React from 'react';
import { getJSDocReturnTag, NewLineKind } from "typescript";
import QuizOptions from '../QuizOptions/QuizOptions';
import socketInterface from "../Interfaces/Interfaces";
import ComponentType from "../Helpers/Helpers";
import Timer from "../Timer/Timer";

interface quizInterface extends socketInterface {
    questionAndAnswers: any,
}

class Quiz extends React.Component<quizInterface> {

    questionIndex = 0;
    durationPerQuestion = 10; //seconds
    answersSelected: number[] = new Array(this.props.questionAndAnswers.length).fill(0);

	constructor(props: any) {
        super(props);
        this.endQuiz = this.endQuiz.bind(this);
        this.answerChoice = this.answerChoice.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.answerSubmited = this.answerSubmited.bind(this);
        this.wrongAnswerClicked = this.wrongAnswerClicked.bind(this);
        this.correctAnswerClicked = this.correctAnswerClicked.bind(this);
    }

    nextQuestion() {
        if (this.answerSubmited()) {
            return ;
        }
        this.questionIndex += 1;
        this.forceUpdate();
    }

    wrongAnswerClicked() {
        this.answersSelected[this.questionIndex] = 0
        this.nextQuestion();
    }

    correctAnswerClicked() {
        this.answersSelected[this.questionIndex] = 1
        this.nextQuestion();
    }

    answerSubmited() {
        return (this.questionIndex == this.props.questionAndAnswers.length);
    }

    endQuiz(newTimerValue: number) {
        this.props.setActiveComponent(ComponentType.Result);
        let patLoad = {
            RoomID: this.props.roomId,
            ID: this.props.user,
            Answers: this.answersSelected,
            TimeTaken: newTimerValue
        }
        this.props.socket.send('"quizAnswers"-'+JSON.stringify(patLoad));
        this.forceUpdate();
        console.log(this.answersSelected);
    }

    answerChoice() {
        let ret = Array.from(this.props.questionAndAnswers[this.questionIndex]["Incorrect_Answers"]).map((ch: any)=>{
            return <div className="answer-select-button" id="wrong-answer" onClick={this.wrongAnswerClicked}>{ch}</div>;
        })
        let correctAnsIndex = 3 * Math.random() | 0;
        ret.splice(correctAnsIndex, 0, <div className="answer-select-button" id="correct-answer" onClick={this.correctAnswerClicked}>{this.props.questionAndAnswers[this.questionIndex]["Correct_Answer"]}</div>)
        return ret;
    }  
    
    render() {
        if (this.answerSubmited()) return(<div></div>);
        return(
            <div className="quiz-main">
                <Timer quizDuration={this.durationPerQuestion*this.props.questionAndAnswers.length} 
                        answerSubmited={this.answerSubmited} endQuiz={this.endQuiz}/>
                <div className="quiz-componenet">
                    <div className="quiz-question">
                        <div className="quiz-progress">Question {this.questionIndex+1}/{this.props.questionAndAnswers.length}</div>
                        <div className="question-string">{this.props.questionAndAnswers[this.questionIndex]["Question"]}</div>
                    </div>
                    <div className="vertical-separator"></div>
                    <div className="quiz-select-answers">
                        {this.answerChoice()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Quiz;