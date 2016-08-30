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
    // the below five methods are React component lifecycle methods and are called at their respective events in the components lifecycle
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
    // // `componentWillUpdate` is invoked just before an update and as such `this.setState()` cannot be called here
    // componentWillUpdate: function componentWillUpdateCountdown(nextProps, nextState) {

    // },
    // // `componentWillMount` is invoked only once, on both client and server, at the initial rendering of the component
    // // as this method is called prior to rendering changes to things like the `refs` or DOM aren't available
    // // we do have access to update internal state though
    // componentWillMount: function componentWillMountCountdown() {
    //     console.log('Countdown componentWillMount');
    // },
    // // `componentDidMount` is called immediately after initial rendering so allows access to `refs` and the DOM
    // // however unlike `componentWillMount` is only called on the client
    // componentDidMount: function componentDidMountCountdown() {
    //     console.log('Countdown componentDidMount');
    // },
    // `componentWillUnmount` is called when the component is removed from the DOM
    // this is where it is recommended to clean up anything left by the component
    // in our case we want to make sure we have cleared the interval timer say if someone navigates away without pausing/stopping
    componentWillUnmount: function componentWillUnmountCountdown() {
        // console.log('Countdown componentWillUnmount');
        clearInterval(this.timer);
        this.timer = undefined;
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

            // clear the timer once we've reached zero by updating the status
            if (newCount === 0) this.setState({ countdownStatus: 'stopped' });
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