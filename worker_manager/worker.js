var worker = {};

worker.setFile = function(file) {
    worker.app = require(file);
}

onmessage = function(data) {
  if (data.beezeenodeworkermanagersetfile == 'beezeenodeworkermanagersetfile') {
    worker.setFile(data.file);
  }
  var result = worker.app[data.data.method].apply(worker.app, [JSON.parse(data.data.params)]);
  if (result) { if (data.nwmEachFlag) result.nwmEachFlag = data.nwmEachFlag; postMessage(JSON.stringify(result)); }
}