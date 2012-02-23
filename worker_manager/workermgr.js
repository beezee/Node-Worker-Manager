var Worker = require('webworker').Worker;

exports.workers = {};

var count = 0;

function managedWorker(handle, file) {
    this.handle = handle;
    this.file = file;
    this.worker = new Worker('./worker.js');
    var data = {beezeenodeworkermanagersetfile: 'beezeenodeworkermanagersetfile', file: file};
    this.worker.postMessage(JSON.stringify(data));
    this.worker.onmessage = function(data) {
        dataWorker.onmessage = function(data) {
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