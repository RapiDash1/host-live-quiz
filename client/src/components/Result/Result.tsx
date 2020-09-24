import React from 'react';
import { formatDiagnosticsWithColorAndContext } from 'typescript';
import "./Result.css";

interface resultInterface {
    results: any,
    userName: string
}


class Result extends React.Component<resultInterface> {

    user: any = {}

	constructor(props: any) {
        super(props);
        this.userScore = this.userScore.bind(this);
    }

    componentDidMount() {
        this.userScore();
    }

    userScore() {
        console.log(this.props.results.length);
        for (let i=0; i<this.props.results.length;i++) {
            if (this.props.results[i]["ID"] == this.props.userName) {
                this.user = this.props.results[i];
            }
        }
        this.forceUpdate();
    }

    leaderBoardElements() {
        let pos = 0;
        return Array.from(this.props.results).map((user:any)=>{
            pos++
            if (user == this.user) {
                return <div className="leader-board-item">
                            <div className="leader-board-pos">{pos}</div>
                            <div className="username-current-user">{user["ID"]}</div>
                        </div>
            } else {
                return <div className="leader-board-item">
                            <div className="leader-board-pos">{pos}</div>
                            <div className="username">{user["ID"]}</div>
                        </div>
            }
        })
    }

    render() {
        return (
            <div className="results-div">
                <div className="result-info">
                    <div className="result-name">
                        <p>Quiz Results</p>
                    </div>
                    <div className="results-detailed-info">
                        <div className="user-results">
                            <div className="user-result-metric" id="user-score">
                                <div className="user-result-value">
                                    {this.user["Score"]}
                                </div>
                                <div className="user-result-text">
                                    Score
                                </div>
                            </div>
                            <div className="user-result-metric" id="user-time">
                                <div className="user-result-value">
                                    {this.user["TimeTaken"]}
                                </div>
                                <div className="user-result-text">
                                    Time (sec)
                                </div>
                            </div>
                            <div className="user-result-metric" id="user-accuracy">
                                <div className="user-result-value">
                                    {((this.user["Score"]/this.user["NoOfQuestions"])*100).toString()+"%"}
                                </div>
                                <div className="user-result-text">
                                    Accuracy
                                </div>
                            </div>
                        </div>
                        <div className="vertical-separator-green"></div>
                        <div className="participants-results">
                            <div className="leader-board-name">
                                <p>Leaderboard</p>
                            </div>
                            <div className="leader-board">
                                {this.leaderBoardElements()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Result;