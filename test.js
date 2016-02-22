/**
 * Created by bangbang93 on 16-2-22.
 */
'use strict';
var should = require('should');
var timer = require('./');

var onTick = function (data){
  tickDone();
};

var tickDone;

describe('timer', function () {
  before(function () {
    timer.setup('10.1.2.1', 'timer', onTick);
  });
  var uuid;
  it('add timer', function () {
    let time = new Date();
    uuid = timer.add(time, time.valueOf() + 1000, {startTime: time});
  });
  it('stop timer', function () {
    timer.stop(uuid);
  });
  it('start a timer and wait for tick', function (done) {
    this.timeout(1.5 * 60 * 1000);
    let time = new Date();
    uuid = timer.add(time, time.valueOf() + 1000, {startTime: time});
    tickDone = done;
  })
});