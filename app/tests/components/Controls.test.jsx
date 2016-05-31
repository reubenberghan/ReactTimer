'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Controls = require('Controls');

describe('Controls', () => {
    
    it('should exist', () => {
        expect(Controls).toExist();
    });
    
    describe('render', () => {
        
        it('should render pause when started', () => {
            var controls = TestUtils.renderIntoDocument(<Controls countdownStatus="started" />);
            var $el = $(ReactDOM.findDOMNode(controls));
            
            // we can use the psuedo selector `:contains()` to find an element which has the content we pass
            var $pauseButton = $el.find('button:contains(Pause)');
            
            // the jQuery objects length in this case should be 1 if it found the 'Pause' button
            expect($pauseButton.length).toBe(1);
        });
        
        it('should render start when paused', () => {
            var controls = TestUtils.renderIntoDocument(<Controls countdownStatus="paused" />);
            var $el = $(ReactDOM.findDOMNode(controls));
            
            // we can use the psuedo selector `:contains()` to find an element which has the content we pass
            var $startButton = $el.find('button:contains(Start)');
            
            // the jQuery objects length in this case should be 1 if it found the 'Start' button
            expect($startButton.length).toBe(1);
        });
        
    });
    
});