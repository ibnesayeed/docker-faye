var http = require('http'),
    faye = require('faye'),
    port = Number(process.env.PORT) || 8000,
    timeout = Number(process.env.TIMEOUT) || 45,
    mount = process.env.MOUNT || '/faye';

var server = http.createServer(),
    bayeux = new faye.NodeAdapter({mount: mount, timeout: timeout});

bayeux.attach(server);
server.listen(port);

bayeux.on('subscribe', function(clientId, channel) {
  console.log('[  SUBSCRIBE] ' + clientId + ' -> ' + channel);
});

bayeux.on('unsubscribe', function(clientId, channel) {
  console.log('[UNSUBSCRIBE] ' + clientId + ' -> ' + channel);
});

bayeux.on('disconnect', function(clientId) {
  console.log('[ DISCONNECT] ' + clientId);
});

console.log('Listening on ' + port + '. To publish/subscribe from a browser, include following script:\n');

console.log('<script src="http://HOSTANME:PORT/faye/client.js"></script>\n');
