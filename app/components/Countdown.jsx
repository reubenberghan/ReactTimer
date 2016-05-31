'use strict';

var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');

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
    render: function renderCountdown() {
        var { count } = this.state;
        return (
            <div>
                <Clock totalSeconds={ count } />
                <CountdownForm onSetCountdown={ this.handleSetCountdown } />
            </div>
        );
    }
});

module.exports = Countdown;