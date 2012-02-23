var Worker = require('webworker').Worker
, _ = require('underscore');

exports.workers = {};

var eachCache = {};

var count = 0;

function managedWorker(handle, file) {
    this.handle = handle;
    this.file = file;
    this.worker = new Worker('./worker.js');
    var data = {beezeenodeworkermanagersetfile: 'beezeenodeworkermanagersetfile', file: file};
    this.worker.postMessage(JSON.stringify(data));
    this.worker.onmessage = function(data) {
        dataWorker.onmessage = function(data) {
            if (!data.nwmEachFlag) {workerMethods[data.data.method].apply(workerMethods, [JSON.parse(data.data.params)]); return;}
            eachCache[data.nwmEachFlag][this.handle] = JSON.parse(data.data.params);
            if (eachCache[data.nwmEachFlag].length == exports.workers.length)
            workerMethods[data.data.method].apply(workerMethods, [JSON.parse(data.data.params)]);
          }
    }
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
    var key = new Date().getTime();
    var data = {method: method, params: params, nwmEachFlag: key};
    _.each(exports.workers, function(worker) {
        worker.postMessage(JSON.stringify(data));
    })
}