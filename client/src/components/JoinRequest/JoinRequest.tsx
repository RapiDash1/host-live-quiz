import React from 'react';
import "./JoinRequest.scss";

interface joinReqInterface {
    socket: WebSocket,
    userName: string,
    roomID: string
}

class JoinRequest extends React.Component<joinReqInterface> {

    showRequest = true

    reqInfo = {
        UserID: this.props.userName,
        RoomID: this.props.roomID
    }
    
    constructor(props: any) {
        super(props);
        this.acceptRequest = this.acceptRequest.bind(this);
        this.rejectReqeuest = this.rejectReqeuest.bind(this);
    }

    acceptRequest() {
        this.props.socket.send('"requestAccepted"-'+JSON.stringify(this.reqInfo));
        this.showRequest = false;
        this.forceUpdate();
    }

    rejectReqeuest() {
        this.props.socket.send('"requestRejected"-'+JSON.stringify(this.reqInfo));
        this.showRequest = false;
        this.forceUpdate();
    }

    render() {
        if (!this.showRequest) return null;
        return(
            <div className="notification-div" id={"notification-id-" + this.props.userName}>
                <div className="request-user-name">
                    {this.props.userName}
                </div>
                <div className="accept-request-button" onClick={this.acceptRequest}>
                    <p>Accept</p>
                </div>
                <div className="reject-request-button" onClick={this.rejectReqeuest}>
                    <p>Reject</p>
                </div>
            </div>
        );
    }
}


export default JoinRequest;