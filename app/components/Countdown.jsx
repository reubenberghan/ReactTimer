'use strict';

var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');
var Controls = require('Controls');

var Countdown = React.createClass({
    getInitialState: function getInitialStateCountdown() {
        return {
            count: 0,
            countdownStatus: 'stopped'
        };
    },
    // `componentDidUpdate` is called every time the state of the component is changed
    componentDidUpdate: function componentDidUpdateCountdown(prevProps, prevState) {
        
        // first we need to check our `countdownStatus` and if this has changed
        // we use a `switch` statement to check the status and decide how to procede
        if (this.state.countdownStatus !== prevState.countdownStatus) {
            switch (this.state.countdownStatus) {
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
    // our `startTimer` method will invoke `setInterval`, a built JavaScript method
    // which will take one off the `count` and set the state at 1s intervals
    startTimer: function startTimerCountdown() {
        this.timer = setInterval(() => {
            var newCount = this.state.count - 1;
            this.setState({
                // using the ternary so we don't count into the negatives
                // the brackets aren't required but help readability of the expression
                count: (newCount >= 0 ? newCount : 0)
            });
        }, 1000);
    },
    handleSetCountdown: function handleSetCountdown(seconds) {
        this.setState({
            count: seconds,
            countdownStatus: 'started'
        });
    },
    handleStatusChange: function handleStatusChangeCountdown(newStatus) {
        this.setState({ countdownStatus: newStatus });
    },
    render: function renderCountdown() {
        var { count, countdownStatus } = this.state;
        var renderControlArea = () => {
            if (countdownStatus !== 'stopped') {
                return <Controls countdownStatus={ countdownStatus } onStatusChange={ this.handleStatusChange } />
            } else {
                return <CountdownForm onSetCountdown={ this.handleSetCountdown } />
            }
        };
        return (
            <div>
                <Clock totalSeconds={ count } />
                { renderControlArea() }
            </div>
        );
    }
});

module.exports = Countdown;