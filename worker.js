var worker = {};

worker.setFile = function(file) {
    worker.app = require(file);
}

onmessage = function(dataString) {
  var data = JSON.parse(dataString.data);
  if (data.beezeenodeworkermanagersetfile == 'beezeenodeworkermanagersetfile') {
    worker.setFile(data.file);
    return;
  }
  var args = (data.params) ? data.params : [];
  var result = worker.app[data.method].apply(worker.app, [args]);
  if (result) {
    if (data.nwmEachFlag) result.nwmEachFlag = data.nwmEachFlag;
    if (args.callback) result.method = args.callback;
    postMessage(JSON.stringify(result));
    }
};

onerror = function(e) {
    console.log(e.stack);
}