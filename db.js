/**
 * Created by bangbang93 on 16-2-22.
 */
'use strict';
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

var TimerSchema = new mongoose.Schema({
  uuid: String,
  startTime: Date,
  endTime: Date,
  data: Object
});

var Timer = mongoose.model('timer', TimerSchema);

var DB = function (host, db) {
  mongoose.connect(`mongodb://${host}/${db}`);
  return DB;
};

DB.create = function (uuid, startTime, endTime, data) {
  return Timer.create({
    uuid,
    startTime,
    endTime,
    data
  })
};

DB.delete = function (uuid) {
  return Timer.remove({uuid}).exec();
};

module.exports = DB;