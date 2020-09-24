import './App.css';
import React from 'react';
import hash from "object-hash";
import Room from "./components/Room/Room";
import Quiz from "./components/Quiz/Quiz";
import Loader from "./components/Loader/Loader";
import Result from "./components/Result/Result";
import Rejected from "./components/Rejected/Rejected";
import Username from "./components/Username/Username";
import ComponentType from "./components/Helpers/Helpers";
import QuizOptions from "./components/QuizOptions/QuizOptions";
import JoinRequest from "./components/JoinRequest/JoinRequest";
import Participant from "./components/Participant/Participant";

class App extends React.Component {

	socket = new WebSocket("ws://localhost:8080/webSocket");
	isLoading = false;
	activeComponent = ComponentType.Username;
	questionAndAnswers = [];
	notificationRequests: any[]= [];
	roomID = hash(Date.now());
	userName = Date.now().toString()
	owner = false;
	results: any = []
	participants: any = []

	constructor(props: any) {
		super(props);
		this.stopLoader = this.stopLoader.bind(this);
		this.setUsername = this.setUsername.bind(this);
		this.startLoader = this.startLoader.bind(this);
		this.setOwnerStatus = this.setOwnerStatus.bind(this);
		this.setActiveComponent = this.setActiveComponent.bind(this);
	}

	startLoader() {
		this.isLoading = true;
		this.forceUpdate();
	}

	stopLoader() {
		this.isLoading = false;
		this.forceUpdate();
	}

	setActiveComponent(ac: ComponentType) {
        this.startLoader();
		this.activeComponent = ac;
	}

	setOwnerStatus(ownerStatus: boolean) {
		this.owner = ownerStatus;
	}

	setUsername(newUsername: string) {
		this.userName = newUsername;
	}

	componentDidMount() {
		this.socket.onopen = () => {
			console.log("Connected to websocket");
			this.socket.send(JSON.stringify("Hi"));
		}

		this.socket.onmessage = (msg) => {
			console.log(msg["data"]);
			let respJson = JSON.parse(msg["data"])
			if (respJson["qAndAReponse"] !== undefined) {
				this.questionAndAnswers = respJson["qAndAReponse"];
				this.setActiveComponent(ComponentType.Quiz);
			} else if (respJson["entryRequest"] !== undefined) {
				this.notificationRequests.push(<JoinRequest socket={this.socket} roomID={this.roomID}
													userName={respJson["entryRequest"]}/>);
			} else if (respJson["entryAccepted"] !== undefined) {
				this.setActiveComponent(ComponentType.Room);
				this.roomID = respJson["entryAccepted"];
			} else if (respJson["results"] !== undefined) {
				this.results = JSON.parse(JSON.stringify(respJson["results"]));
				this.setActiveComponent(ComponentType.Result);
			} else if (respJson["participants"] !== undefined) {
				let participant = respJson["participants"];
				this.participants.push(<Participant name={participant}/>);
			} else if (respJson == "entryRejected") {
				this.setActiveComponent(ComponentType.Rejected);
			}
			this.stopLoader();
		}

		this.socket.onclose = () => {
			console.log("Socket closed");
		}
	}

	componentToRender() {
		if (this.isLoading) return <Loader />
		switch(this.activeComponent) {
			case ComponentType.Username:
				return <Username setActiveComponent={this.setActiveComponent} stopLoader={this.stopLoader}
							setUsername={this.setUsername}/>
			case ComponentType.QuizOptions:
				return <QuizOptions socket={this.socket} roomId={this.roomID} user={this.userName}
							setActiveComponent={this.setActiveComponent} setOwner={this.setOwnerStatus}/>
			case ComponentType.Room:
				return <Room socket={this.socket} roomId={this.roomID} user={this.userName}
								setActiveComponent={this.setActiveComponent} participants={this.participants}
								requests={this.notificationRequests} isOwner={this.owner} roomID={this.roomID}/>
			case ComponentType.Quiz:
				return <Quiz socket={this.socket} roomId={this.roomID}  user={this.userName}
							setActiveComponent={this.setActiveComponent} questionAndAnswers={this.questionAndAnswers}/>
			case ComponentType.Result:
				return <Result results={this.results} userName={this.userName}/>
			case ComponentType.Rejected:
				return <Rejected />
		}
		return null;
	}


	render() {
		return (
			<div className="App">
				{this.componentToRender()}
			</div>
		);
	}
}

export default App;
