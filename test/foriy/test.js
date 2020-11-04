var express = require('express')
var bodyParser = require('body-parser')
var mysql      = require('mysql');

var app = express()

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:9528');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
}; 

app.use(allowCrossDomain);
var sendSelect = (sql, response) => {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '1111',
        database : 'gms'
    });  
    connection.connect();
    connection.query(sql, function(err, result) {
        if(err) {
            console.log('[SELECT ERROR]', err)
            return;
        }
        response.send(result)
        console.log('result', result)
    })
    connection.end();
}

app.use(express.static('files'))

// 将前端数据解析成json
app.use(bodyParser.json())

var sendHtml = (path, response) => {
    var fs = require('fs')
    var options = {
        encoding: 'utf-8',
    }
    fs.readFile(path, options, (error, data) => {
        console.log(`读取的 html 文件 ${path} 内容是`, typeof data)
        response.send(data)
    })
}

// app.get('/', (request, response) => {
//     var path = 'index.html'
//     sendHtml(path, response) 
// })
app.get('/', (request, response) => {
    var path = 'test.html'
    sendHtml(path, response) 
})

app.get('/select', (request, response) => {
    var sql = 'SELECT * FROM user'
    sendSelect(sql, response) 
})

app.get('/all', (request, response) => {
    var sql = 'SELECT * FROM todos'
    sendSelect(sql, response)
})

var server = app.listen(8001, () => {
    var host = server.address().address
    var port = server.address().port
})