var workermgr = require('./workermgr.js');

workermgr.methods = {}

workermgr.methods.sayHi = function(data) {
    console.log(data);
}

workermgr.add({key: 'moe', file: __dirname+'/moe.js'});
workermgr.add({key:'larry', file: __dirname+'/larry.js'});
workermgr.add({key:'curly', file: __dirname+'/curly.js'});

workermgr.each('sayHi');