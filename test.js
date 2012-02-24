var workermgr = require('./workermgr.js');
var _ = require('underscore');

var intro = 'Hi my name is ';

workermgr.methods = {}

workermgr.methods.sayHi = function(data) {
    console.log(data);
}

workermgr.methods.introduceEveryone = function(data) {
    _.each(data, function(worker) {
        console.log(intro + worker[0]);
    })
}

workermgr.add({key: 'moe', file: __dirname+'/moe.js'});
workermgr.add({key:'larry', file: __dirname+'/larry.js'});
workermgr.add({key:'curly', file: __dirname+'/curly.js'});

workermgr.each('sayHi', {callback: 'introduceEveryone'});