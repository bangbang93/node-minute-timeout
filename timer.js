/**
 * Created by bangbang93 on 16-2-22.
 */
'use strict';
var _ = require('lodash');
var UUID = require('uuid');

var timer = [];

var interval;

var onTick;
var db;

exports.setup = function (host, name, tickFunction) {
  onTick = tickFunction;
  timer.length = 0;
  clearInterval(interval);
  interval = setInterval(onInterval, 60 * 1000);
  db = require('./db')(host, name);
  restore();
};

exports.add = function (startTime, endTime, data, uuid) {
  uuid = uuid || UUID.v4();
  db.create(uuid, startTime, endTime, data);
  timer.push({uuid, startTime, endTime, data});
  return uuid;
};

exports.stop = function (uuid) {
  db.delete(uuid);
  timer.splice(_.findIndex(timer, {uuid}), 1);
};

exports.count = function () {
  return timer.length;
};

function onInterval(){
  let now = new Date();
  timer = _.without(timer.map((e)=>{
    if (e.endTime <= now){
      db.delete(e.uuid);
      onTick(e.data);
      return null;
    }
    return e;
  }));
}

function restore(){
  db.getAll()
    .then((timers)=>{
      timers.forEach((e)=>{
        timer.push(e.toJSON());
      })
    })
}