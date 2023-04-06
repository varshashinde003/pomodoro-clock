import React, { Component } from "react";
import "../css/pomodoro.css";
import ActionButtons from "./components/action-buttons";
import ClockCounter from "./components/clock-counter";
import SetIterationComponent from "./components/set-iteration";

class Pomodoro extends Component {
    initialState = {
        iterationCount: 1,
        breakCount: 5,
        workCount: 25,
        clockCounter: 25 * 60,
        currentTimerName: "Work Timer",
        isCounterStarted: false,
        isSetIterationCount: false,
    };
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.loop = undefined;
    }

    componentWillUnmount() {
        clearInterval(this.loop);
    }

    convertToTime = (count) => {
        let minutes = Math.floor(count / 60);
        let seconds = count % 60;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${minutes}:${seconds}`;
    };

    // this function is to handle the play and pause activity
    handlePlayPause = () => {
        const { isCounterStarted } = this.state;
        if (isCounterStarted) {
            clearInterval(this.loop);
            this.setState({
                isCounterStarted: false,
            });
        } else {
            this.setState({
                isCounterStarted: true,
                isSetIterationCount: true,
            });
            this.loop = setInterval(() => {
                const {
                    clockCounter,
                    currentTimerName,
                    workCount,
                    breakCount,
                    iterationCount,
                } = this.state;
                if (clockCounter === 0) {
                    if (iterationCount >= 1) {
                        this.setState({
                            currentTimerName:
                                currentTimerName === "Work Timer"
                                    ? "Break Timer"
                                    : "Work Timer",
                            clockCounter:
                                currentTimerName === "Work Timer"
                                    ? breakCount * 60
                                    : workCount * 60,
                            iterationCount: iterationCount - 1,
                        });
                    } else {
                        clearInterval(this.loop);
                        this.setState({
                            isCounterStarted: false,
                        });
                    }
                } else {
                    this.setState({
                        clockCounter: clockCounter - 1,
                    });
                }
            }, 1000);
        }
    };

    handleReset = () => {
        this.setState({
            ...this.initialState,
        });
        clearInterval(this.loop);
    };

    handleIterationCountChange = (type) => {
        return () => {
            const { iterationCount } = this.state;
            let newCount;
            if (type === "increment") {
                newCount = iterationCount + 1;
            } else {
                newCount = iterationCount - 1;
            }

            if (newCount > 0) {
                this.setState({
                    iterationCount: newCount,
                });
            }
        };
    };

    render() {
        const {
            clockCounter,
            currentTimerName,
            isCounterStarted,
            iterationCount,
            isSetIterationCount,
            workCount, breakCount
        } = this.state;
        return (
            <div className="container">
                <div className="row main">
                    <div className="col-md-6 mx-auto">
                        <h1 className="heading">Pomodoro Clock</h1>
                        <SetIterationComponent
                            isSetIterationCount={isSetIterationCount}
                            iterationCount={iterationCount}
                            handleIterationCountChange={this.handleIterationCountChange}
                        />
                        <TimerStats workCount={workCount} breakCount={breakCount} />
                    <div className="clock-container">
                            <ClockCounter
                                currentTimerName={currentTimerName}
                                clockCounter={clockCounter}
                                convertToTime={this.convertToTime}
                            />
                            <ActionButtons
                                isCounterStarted={isCounterStarted}
                                handlePlayPause={this.handlePlayPause}
                                handleReset={this.handleReset}
                            />
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

const TimerStats = ({ workCount, breakCount }) => {
    return (
        <div className="statistics">
        <h6>Work Duration: {workCount} minutes</h6>
        <h6>Break Duration: {breakCount} minutes</h6>
        </div>
    )
}

export default Pomodoro;
