var cluster = require('cluster');

function startWorker(){
	var worker = cluster.fork();
	console.log('CLUSTER: worker %d started', worker.id);
}

if(cluster.isMaster){
	require('os').cpus().forEach(function(){
		startWorker();
	});

	// log any workers that disconnect; if a worker disconnects, it
	// should then exit, so we'll wait for the exit evento spawn
	// a new worker to replace it
	cluster.on('disconnect', function(worker){
		console.log('CLUSTER: worker %d disconnected from the cluster.', worker.id);
	});

	// when a worker dies(exits), create a worker to replace it
	cluster.on('exit', function(worker, code, signal){
		console.log('CLUSTER: worker %d died with exit code %d (%s)', worker.id, code, signal);
		startWorker();
	});
}else{
	// start our app on worker; see meadowlark.js
	require('./meadowlark.js')();
}
