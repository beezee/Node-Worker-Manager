var worker = {};

worker.setFile = function(file) {
    worker.app = require(file);
}

onmessage = function(data) {
  if (data.beezeenodeworkermanagersetfile == 'beezeenodeworkermanagersetfile') {
    worker.setFile(data.file);
  }
  worker.app[data.data.method].apply(worker.app, [JSON.parse(data.data.params)]);
}

function returnToParent(data) {
    postMessage(JSON.stringify(data));
}