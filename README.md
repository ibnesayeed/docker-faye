# Faye Server

A Docker container for [Faye Pub/Sub messaging](http://faye.jcoglan.com/). The server can be utilized from any client implementation on server side using NodeJS or Ruby or in a browser (CORS support enabled by default).

To run the server and expose it on port 8000 of the host machine, run the following command:

```bash
$ docker run -p 8000:8000 ibnesayeed/faye
```

Once the server is running, it will provide a JavaScript that can be included in HTML pages to create client.

```html
<script src="http://localhost:8000/faye/client.js" type="text/javascript"></script>
```

Once the script is loaded, client can be created to publish or subscribe to any arbitrary channel.

```javascript
// Create client
var client = new Faye.Client('http://localhost:8000/faye');

// Subscribe to an arbitrary channel /test
client.subscribe('/test', function(message) {
  console.log('Received ' + message.text);
});

// Publish to an arbitrary channel /test on which existing subscribers will receive the message
client.publish('/test', {
  text: 'Hello world'
});

```

Override following environment variables when running the server to configure the Faye server:

- PORT=8000
- TIMEOUT=45
- MOUNT=/faye

For example, to change the mount point of the Fay server from /faye to /pubsub run the following command:

```bash
$ docker run -p 8000:8000 -e MOUNT=/pubsub ibnesayeed/faye
```

This will change the location of the client JavaScript file as well as the way to create the client accordingly.
