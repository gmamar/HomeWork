let fs = require('fs');
let url = require('url');

var readme = fs.readFileSync('./readme.txt', 'utf8');
var makeme = fs.writeFileSync('./makeme.txt', readme + ' New one');