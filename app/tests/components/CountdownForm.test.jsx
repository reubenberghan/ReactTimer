'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var TestUtils = require('react-addons-test-utils');
var $ = require('jQuery');

var CountdownForm = require('CountdownForm');

describe('CountdownForm', () => {
    
    it('should exist', () => {
        expect(CountdownForm).toExist();
    });
    
    it('should call onSetCountdown if valid seconds entered', () => {
        
        var spy = expect.createSpy();
        var formInputSeconds = '109';
        var calledWithSeconds = 109;
        
        // render our component and pass in the `spy`
        var countdownForm = TestUtils.renderIntoDocument(<CountdownForm onSetCountdown={ spy } />);
        
        // create a jQuery object of our component
        var $el = $(ReactDOM.findDOMNode(countdownForm));
        
        // set the value of out components form input
        countdownForm.refs.seconds.value = formInputSeconds;
        
        // simulate the submit call of our component form
        TestUtils.Simulate.submit($el.find('form')[0]);
        
        // perform test to see if our form submit handler was called correctly
        expect(spy).toHaveBeenCalledWith(calledWithSeconds);
        
    });
    
    it('should not call onSetCountdown if invalid seconds entered', () => {
        
        var spy = expect.createSpy();
        // use incorrect input this time
        var formInputSeconds = 'abc';
        
        // need to initialise our component in the same way as the previous test
        var countdownForm = TestUtils.renderIntoDocument(<CountdownForm onSetCountdown={ spy } />);
        var $el = $(ReactDOM.findDOMNode(countdownForm));
        countdownForm.refs.seconds.value = formInputSeconds;
        TestUtils.Simulate.submit($el.find('form')[0]);
        
        expect(spy).toNotHaveBeenCalled();
        
    });
    
});