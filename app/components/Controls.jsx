'use strict';

var React = require('react');

var Controls = React.createClass({
    propTypes: {
        countdownStatus: React.PropTypes.string.isRequired,
        onStatusChange: React.PropTypes.func.isRequired
    },
    onStatusChange: function onStatusChangeControls(newStatus) {
        return () => {
            this.props.onStatusChange(newStatus);
        };
    },
    // // this is another lifecycle method invoked when the component receives new props
    // componentWillReceiveProps: function componentWillReceivePropsControls(nextProps) {
    //     console.log('Controls componentWillReceiveProps', nextProps.countdownStatus);
    // },
    render: function renderControls() {
        var { countdownStatus } = this.props;
        
        var renderStartStopButton = () => {
            if (countdownStatus === 'started') {
                return <button className="button secondary" onClick={ this.onStatusChange('paused') }>Pause</button>;
            } else {
                return <button className="button primary" onClick={ this.onStatusChange('started') }>Start</button>;
            }
            
        };
        
        return (
            <div className="controls">
                { renderStartStopButton() }
                <button className="button alert hollow" onClick={ this.onStatusChange('stopped') }>Clear</button>
            </div>
        );
    }
});

module.exports = Controls;