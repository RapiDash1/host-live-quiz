import React from 'react';
import "./QuizOptions.css";
import ComponentType from "../Helpers/Helpers";
import socketInterface from "../Interfaces/Interfaces";

interface quizOptionsInterface extends socketInterface {
    setOwner: (ownerStatus: boolean) => void
}

class QuizOptions extends React.Component<quizOptionsInterface> {

    constructor(props: any) {
        super(props);
        this.createRoom = this.createRoom.bind(this);
        this.joinRoom = this.joinRoom.bind(this);
    }
  

    createRoom() {
        let createRoomPayload = {
            RoomID: this.props.roomId,
            OwnerID: this.props.user
        }
        this.props.socket.send('"createRoom"-'+JSON.stringify(createRoomPayload));
        this.props.setActiveComponent(ComponentType.Room);
        this.props.setOwner(true);
    }
  
    joinRoom() {
        let roomIDInput = document.querySelector(".code-text-input") as HTMLInputElement;
        let roomID = roomIDInput.value;
        let joinRequest = {
            RoomID: roomID,
            UserID: this.props.user
        }
        this.props.socket.send('"requestToJoin"-'+JSON.stringify(joinRequest));
        this.props.setActiveComponent(ComponentType.Loader);
    }

    render() {
        return(
            <div className="quiz-options">
                <div className="quiz-select-option-left">
                    <p className="enter-code-p">Enter Code</p>
                    <input type="text" name="code-text" className="code-text-input" spellCheck="false"/>
                    <div onClick={this.joinRoom} className="join-room-button">Join Room</div>
                </div>
                    <div className="vertical-separator"></div>
                    <div className="quiz-select-option-right" id="right-option">
                    <div onClick={this.createRoom} className="create-room-button">Create Room</div>
                </div>
            </div>
        );
    }
}

export default QuizOptions;