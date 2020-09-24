import React from 'react';
import "./Participant.css";

interface participantInterface {
    name: string
}

class JoinRequest extends React.Component<participantInterface> {
    
    constructor(props: any) {
        super(props);
    }

    render() {
        return(
            <div className="participant-div" id={"participant-id-" + this.props.name}>
                <div className="participant-user-name">
                    {this.props.name}
                </div>
            </div>
        );
    }
}


export default JoinRequest;