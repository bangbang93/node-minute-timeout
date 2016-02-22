/**
 * Created by bangbang93 on 16-2-22.
 */
'use strict';
var should = require('should');
var timer = require('./');

var onTick = function (data){
  console.log(new Date());
  data.should.not.has.property('long');
  tickDone();
  timer.count().should.be.equal(count + 1);
};

var tickDone;
var count;

describe('timer', function () {
  before(function () {
    timer.setup('10.1.2.1', 'timer', onTick);
  });
  var uuid;
  count = timer.count();
  it('add timer', function () {
    let time = new Date();
    uuid = timer.add(time, time.valueOf() + 1000, {startTime: time});
    uuid.should.be.String();
    timer.count().should.be.equal(count + 1);
  });
  it('stop timer', function () {
    timer.stop(uuid);
    timer.count().should.be.equal(count);
  });
  it('start a timer and wait for tick', function (done) {
    this.timeout(1.5 * 60 * 1000);
    let time = new Date();
    timer.add(time, time.valueOf() + 120 * 1000, {startTime: time, long: true, endTime: time.valueOf() + 120 * 1000});
    uuid = timer.add(time, time.valueOf() + 1000, {startTime: time, endTime: time.valueOf() + 1000});
    tickDone = done;
  });
});