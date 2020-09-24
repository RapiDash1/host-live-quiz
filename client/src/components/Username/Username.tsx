import "./Username.css";
import React from 'react';
import ComponentType from "../Helpers/Helpers";

interface usernameInterface {
    setActiveComponent: (ct: ComponentType)=>void,
    setUsername: (newUsername: string)=>void,
    stopLoader: ()=>void
}

class Username extends React.Component<usernameInterface> {

    constructor(props: any) {
        super(props);
        this.submitUsername = this.submitUsername.bind(this);
    }

    submitUsername() {
        let usernameInputElement = document.querySelector(".username-input") as HTMLInputElement;
        let newUsername = usernameInputElement.value;
        this.props.setUsername(newUsername);
        this.props.setActiveComponent(ComponentType.QuizOptions);
        this.props.stopLoader();
    }

    render() {
        return(
            <div className="username-div">
                <div className="username-text">
                    Username
                </div>
                <div className="username-enter-div">
                    <div className="username-input-div">
                        <input type="text" className="username-input" spellCheck="false"/>
                    </div>
                    <div className="username-button-div">
                        <div className="username-button" onClick={this.submitUsername}>
                            Enter Quiz
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Username;