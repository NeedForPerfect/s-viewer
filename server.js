//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/s-viewer'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/s-viewer/index.html'));
});

console.log('app works on port: ', process.env.PORT || 8080);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);