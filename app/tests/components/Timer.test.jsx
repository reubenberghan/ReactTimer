'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Timer = require('Timer');

describe('Timer', () => {

    it('should exist', () => {
        expect(Timer).toExist();
    });

    describe('handleStatusChange', () => {

        it('should set state to started and count up', (done) => {

            var timer = TestUtils.renderIntoDocument(<Timer />);
            timer.handleStatusChange('started');

            expect(timer.state.timerStatus).toBe('started');
            expect(timer.state.count).toBe(0);

            setTimeout(() => {
                expect(timer.state.count).toBe(1);
                done();
            }, 1001);

        });

        it('should pause timer on paused status', (done) => {

            var timer = TestUtils.renderIntoDocument(<Timer />);
            timer.handleStatusChange('started');

            setTimeout(() => {
                expect(timer.state.count).toBe(1);
                timer.handleStatusChange('paused');
                expect(timer.state.timerStatus).toBe('paused');
            }, 1001);

            setTimeout(() => {
                expect(timer.state.count).toBe(1);
                done();
            }, 1000);

        });

        it('should reset count on stopped status', (done) => {

            var timer = TestUtils.renderIntoDocument(<Timer />);
            timer.handleStatusChange('started');

            setTimeout(() => {
                timer.handleStatusChange('stopped');
                expect(timer.state.count).toBe(0);
                expect(timer.state.timerStatus).toBe('stopped');
                done();
            }, 1001);
            
        });

    });

});