'use strict';

var React = require('react');
var Clock = require('Clock');
var Controls = require('Controls');

var Timer = React.createClass({
    getInitialState: function getInitialStateTimer() {
        return {
            count: 0,
            timerStatus: 'stopped'
        };
    },
    componentDidUpdate: function componentDidUpdateTimer(prevProps, prevState) {
        
        if (this.state.timerStatus !== prevState.timerStatus) {
            switch (this.state.timerStatus) {
                case 'started':
                    this.startTimer();
                    break;
                case 'stopped':
                    this.setState({ count: 0 });
                case 'paused':
                    clearInterval(this.timer);
                    this.timer = undefined;
                    break;
            }
        }

    },
    componentWillUnmount: function componentWillUnmountTimer() {
        clearInterval(this.timer);
        this.timer = undefined;
    },
    startTimer: function startTimerTimer() {

        this.timer = setInterval(() => {
            var newCount = this.state.count + 1;
            this.setState({ count: newCount });
        }, 1000);

    },
    handleStatusChange: function handleStatusChangeTimer(newStatus) {
        this.setState({ timerStatus: newStatus });
    },
    render: function renderTimer() {
        var { count, timerStatus } = this.state;

        return (
            <div>
                <h1 className="page-title">Timer</h1>
                <Clock totalSeconds={ count } />
                <Controls countdownStatus={ timerStatus } onStatusChange={ this.handleStatusChange } />
            </div>
        );
    }
});

module.exports = Timer;