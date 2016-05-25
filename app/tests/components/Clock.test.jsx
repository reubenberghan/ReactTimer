'use strict';

// all the modules required to run the tests on the components
var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
// this is a special module required for react testing as we need to be able to 'render' the component to test its functions
// and this module provides the utilities to do so
var TestUtils = require('react-addons-test-utils');

// our component to be tested
var Clock = require('Clock');

describe('Clock', () => {
    it('should exist', () => {
        expect(Clock).toExist();
    });
    
    describe('render', () => {
        it('should render clock to output', () => {
            var seconds = 62;
            var expected = '01:02';
            var clock = TestUtils.renderIntoDocument(<Clock totalSeconds={ seconds } />);
            // we use jQuery to select our rendered element
            var $el = $(ReactDOM.findDOMNode(clock));
            // then find the text from our span were we expect the time to be rendered
            var actualText = $el.find('.clock-text').text();
            
            expect(actualText).toBe(expected);
        });
    });
    
    describe('formatSeconds', () => {
        it('should format seconds', () => {
            // establish our variables required: the component, the test input and expected output, finally the actual output
            var clock = TestUtils.renderIntoDocument(<Clock />);
            var seconds = 615;
            var expected = '10:15';
            var actual = clock.formatSeconds(seconds);
            
            // assert our test variables to see if the test passes
            expect(actual).toBe(expected);
        });
        
        it('should format seconds when min/sec are less than 10', () => {
            // establish our variables required: the component, the test input and expected output, finally the actual output
            var clock = TestUtils.renderIntoDocument(<Clock />);
            var seconds = 61;
            var expected = '01:01';
            var actual = clock.formatSeconds(seconds);
            
            // assert our test variables to see if the test passes
            expect(actual).toBe(expected);
        });
    });
    
});