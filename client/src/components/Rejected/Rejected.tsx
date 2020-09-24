import './Rejected.css';
import React from 'react';

class Rejected extends React.Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        return(
            <div className="rejected-div">
                <div className="rejected-info">
                    <div className="rejected-heading">
                        <p>Rejected</p>
                    </div>
                    <div className="rejected-info-text">
                        <p>Your request was rejected, please try another room</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Rejected;