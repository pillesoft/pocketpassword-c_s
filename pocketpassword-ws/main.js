const http = require('http');
var express = require('express');
const categRoute = require('./routes/category.route');
const database = require('./db/db');
const parser = require('body-parser');
const cryptor = require('./cryptor');

//https://codeburst.io/writing-a-crud-app-with-node-js-and-mongodb-e0827cbbdafb

const hostname= '127.0.0.1';
const port = 3000;

// const server = http.createServer((req, resp)  => {
//     resp.statusCode = 200;
//     resp.setHeader('Content-Type', 'text/plain');
//     resp.end('Hello world');

// });

// let sa = cryptor.encrypt1('Hello world');
// console.log('encrypt result: ', sa);
// let sb = cryptor.decrypt1(sa);
// console.log('decrypt result: ', sb);


// sa = cryptor.encrypt1('Orm+st3r');
// console.log(sa);
// sb = cryptor.decrypt(sa);
// console.log(sb);

var server = express();
// server.route('/Category').get((req, res)=>{
//     res.send('this is category');
// });
server.set('view engine', 'pug');
server.use(parser.json());
server.use(parser.urlencoded({extended: false}));
server.use('/categories', categRoute);

server.get('/', (req, res) => {
    res.render('index');
});

server.listen(port, hostname, () => {
    console.log(`server is running at http://${hostname}:${port}/`);
});
