const express = require('express');
const app = express();

app.use(express.static(__dirname + '/certbot', { dotfiles: 'allow' } ));

app.listen(80);

// used for certificate setup
// run with node server/certbot_server.js
// on client system run sudo certbot certonly --manual
// make sure the filename and the file's content in certbot/.well-known/acme-challenge match with the output of the above command!
