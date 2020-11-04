var express = require('express')
var bodyParser = require('body-parser')
var mysql      = require('mysql');

var app = express()

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, x-token');
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

var sendToken = (token, response) => {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '1111',
        database : 'gms'
    }); 
    connection.connect();
    // connection.query(sql, function(err, result) {
    //     if(err) {
    //         console.log('[SELECT ERROR]', err)
    //         return;
    //     }
    //     response.send(result)
    //     console.log('result', result)
    // })
    console.log(token)
    const msg = {
        code: 20000,
        data: token
      }
    response.send(msg)
    connection.end();
}

app.use(express.static('files'))

// 将前端数据解析成json
app.use(bodyParser.json())

const tokens = {
    admin: {
      token: 'admin-token'
    },
    editor: {
      token: 'editor-token'
    }
  }
  
  const users = {
    'admin-token': {
      roles: ['admin'],
      introduction: 'I am a super administrator',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'Super Admin'
    },
    'editor-token': {
      roles: ['editor'],
      introduction: 'I am an  editor',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'Normal Editor'
    }
  }


app.post('/vue-admin-template/user/login', (request, response) => {
    // var sql = 'SELECT * FROM user'
    // sendSelect(sql, response) 

      const { username } = request.body
      console.log('username', username)
      const token = tokens[username]
      sendToken(token, response)
      // mock error
    //   if (!token) {
    //     return {
    //       code: 60204,
    //       message: 'Account and password are incorrect.'
    //     }
    //   }

    //   return {
    //     code: 20000,
    //     data: token
    //   }
})

app.get('/vue-admin-template/user/info', (request, response) => {
    const { token } = request.query
    const info = users[token]
    sendToken(info, response)

})

app.post('/vue-admin-template/user/logout', (request, response) => {

    sendToken('success', response)
})


var server = app.listen(8000, () => {
    var host = server.address().address
    var port = server.address().port
})