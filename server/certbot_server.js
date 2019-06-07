const express = require('express');
const app = express();

app.use(express.static(__dirname + '/certbot', { dotfiles: 'allow' } ));

app.listen(80);

console.log('Certbot Server listening on port 80');
