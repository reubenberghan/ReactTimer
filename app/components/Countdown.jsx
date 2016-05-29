'use strict';

var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');

var Countdown = React.createClass({
    getInitialState: function getInitialStateCountdown() {
        return {
            count: 0
        };
    },
    handleSetCountdown: function handleSetCountdown(seconds) {
        this.setState({
            count: seconds
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