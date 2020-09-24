import React from 'react';
import "./Room.scss";
import ComponentType from "../Helpers/Helpers";
import socketInterface from "../Interfaces/Interfaces";

interface roomInterface extends socketInterface {
    requests: any[],
    isOwner: boolean,
    roomID: string,
    participants: any[]
}

class Room extends React.Component<roomInterface> {

    socket = this.props.socket;

	constructor(props: any) {
        super(props);
        this.startQuiz = this.startQuiz.bind(this);
    }
    
    startQuiz() {
        this.socket.send('"startQuiz"-'+JSON.stringify(this.props.roomID));
        console.log("Start game request sent");
    }

    // copyToClipboard
    copyToClipboard() {
        let copyText = document.querySelector(".room-id-text") as HTMLInputElement;
        copyText.setAttribute("style", "background-color: rgba(146, 226, 173, 0.45);");
        copyText.select();
        document.execCommand("copy");
    }

    render() {
        if (!this.props.isOwner) return(
            
            <div className="room">
            <div className="room-components">
                <div className="room-name">
                    <p>Your Quiz Room</p>
                </div>
                <div className="not-owner-div">
                    <div className="room-info-element">
                        <div className="participants-name">
                            <p>Participants</p>
                        </div>
                        <div className="participants">
                            {this.props.participants}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
        return(
            <div className="room">
                <div className="room-components">
                    <div className="room-name">
                        <p>Your Quiz Room</p>
                    </div>
                    <div className="room-info">
                        <div className="room-info-element">
                            <div className="participants-name">
                                <p>Participants</p>
                            </div>
                            <div className="participants">
                                {this.props.participants}
                            </div>
                        </div>
                        <div className="vertical-separator"></div>
                        <div className="room-info-element" id="game-settings">
                            <div className="sharable-room-id">
                                <div className="share-code-content">
                                    <div>
                                        <p>Share code</p>
                                    </div>  
                                    <input className="room-id-text" value={this.props.roomId} type="Text" spellCheck="false"/>
                                </div>
                                <div className="copy-code-button-div">
                                    <div className="copy-code-button" onClick={this.copyToClipboard}>
                                        Copy
                                    </div>
                                </div>
                            </div>
                            <div className="quiz-buttons-div"> 
                                <div className="start-game-button" onClick={this.startQuiz}>
                                    <p>Start Quiz</p>
                                </div>
                                <div className="quit-game-button">
                                    <p>Quit</p>
                                </div>
                            </div>
                            <div className="requests-div">
                                <div className="requests-name">
                                    Join Reqeusts
                                </div>
                                <div className="join-user-requests">
                                    {this.props.requests}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Room;