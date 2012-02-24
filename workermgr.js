var Worker = require('webworker').Worker
, _ = require('underscore');

exports.workers = {};

var eachCache = {};

var methods = {};

var count = 0;

function getSize(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return parseInt(size);
};

function managedWorker(handle, file) {
    this.handle = handle;
    this.file = file;
    this.worker = new Worker(__dirname + '/worker.js');
    var data = {beezeenodeworkermanagersetfile: 'beezeenodeworkermanagersetfile', file: file};
    this.worker.postMessage(JSON.stringify(data));
    this.worker.onmessage = function(dataStr) {
        var data = JSON.parse(dataStr.data);
        if (!data.nwmEachFlag) {exports.methods[data.data.method].apply(exports.methods, [data]); return;}
        eachCache[data.nwmEachFlag][this.handle] = data.params;
        console.log(eachCache[data.nwmEachFlag]);
        if (getSize(eachCache[data.nwmEachFlag]) === getSize(exports.workers))
        console.log(getSize(eachCache[data.nwmEachFlag]));
        console.log('duh');
        console.log(getSize(exports.workers));
            exports.methods[data.method].apply(exports.methods, [data]);
      };
    this.worker.onerror = function(e) {
        console.log(e.stack);
    };
    this.call = function(method, params) {
        var data = {method: method, params: params}
        this.worker.postMessage(JSON.stringify(data));
    }
}

exports.add = function(data) {
    if (!data.key) {
        while(workers[count]) {
            count++;
        }
        exports.workers[count] = new managedWorker(count);
        return count;
    } else {exports.workers[data.key] = new managedWorker(data.key, data.file);}
}

exports.each = function(method, params) {
    var key = new Date().getTime()+'';
    eachCache[key] = {};
    var data = {method: method, params: params, nwmEachFlag: key};
    _.each(exports.workers, function(worker) {
        worker.worker.postMessage(JSON.stringify(data));
    })
}