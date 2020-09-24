import "./Timer.css";
import React from 'react';

interface timerInterface {
    quizDuration: number,
    endQuiz: (newTimerValue: number)=>void,
    answerSubmited: ()=>boolean
}

class Timer extends React.Component<timerInterface> {
    countDownTimer = this.props.quizDuration*200
    startTime = this.countDownTimer

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        let refreshId = setInterval(()=>{
            this.countDownTimer -= 1
            if (this.countDownTimer == 0 || this.props.answerSubmited()) {
                this.props.endQuiz((this.startTime-this.countDownTimer)/200);
                clearInterval(refreshId);
            } else if (this.countDownTimer == 10) {
                let timerElement = document.querySelector(".timer-countdown-div");
                timerElement?.setAttribute("style", "color: red;")
            }
            this.forceUpdate();
        }, 5)
    }

    render() {
        return (
            <div> 
                <div className="timer-countdown-div">{(this.countDownTimer/200).toString().substr(0, 2)}</div>
            </div>
        );
    }
}

export default Timer;