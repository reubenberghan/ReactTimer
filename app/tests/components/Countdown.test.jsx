'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Countdown = require('Countdown');

describe('Countdown', () => {
    
    it('should exist', () => {
        expect(Countdown).toExist();
    });
    
    describe('handleSetCountdown', () => {
        
        // by passing the `done` method to our tests we can make them asynchronous
        it('should set state to started and count down', (done) => {
            
            var countdown = TestUtils.renderIntoDocument(<Countdown />);
            countdown.handleSetCountdown(10);
            
            expect(countdown.state.count).toBe(10);
            expect(countdown.state.countdownStatus).toBe('started');
            
            // we call the `done` method after our asynchronous assertion(s) to tell karma we are done
            setTimeout(() => {
                expect(countdown.state.count).toBe(9);
                done();
            }, 1001);
            
        });
        
        
        it('should not count down below zero', (done) => {
            
            var countdown = TestUtils.renderIntoDocument(<Countdown />);
            countdown.handleSetCountdown(1);
            
            setTimeout(() => {
                expect(countdown.state.count).toBe(0);
                done();
            }, 3001);
            
        });

        it('should pause countdown on paused status', (done) => {

            var countdown = TestUtils.renderIntoDocument(<Countdown />);
            countdown.handleSetCountdown(3);
            countdown.handleStatusChange('paused');

            setTimeout(() => {
                expect(countdown.state.count).toBe(3);
                expect(countdown.state.countdownStatus).toBe('paused');
                done();
            }, 1001);

        });

        it('should reset count stopped status', (done) => {

            var countdown = TestUtils.renderIntoDocument(<Countdown />);
            countdown.handleSetCountdown(3);
            countdown.handleStatusChange('stopped');

            setTimeout(() => {
                expect(countdown.state.count).toBe(0);
                expect(countdown.state.countdownStatus).toBe('stopped');
                done();
            }, 1001);

        });
        
    });
    
});