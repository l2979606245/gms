var express = require('express')
var bodyParser = require('body-parser')
var mysql      = require('mysql');

var app = express()

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:9528');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, x-token');
    res.header('Access-Control-Allow-Credentials','true');
    next();
}; 

app.use(allowCrossDomain);
var sendSelect = (sql, callback) => {
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
        callback(result)
        // console.log('result', result)
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

// tab route
app.get('/vue-admin-template/article/list', (request, response) => {
    // console.log('request is begin', request.query)
    const { kind, type, name, page = 1, limit = 10, sort } = request.query 
    // console.log('kind', kind) 
    const sql = 'select * from repertory'
    // const res = JSON.parse(JSON.stringify(response));
    sendSelect(sql, (result) => {
        // console.log('res', result)
        let mockList = result.filter(item => {
            // console.log('in', kind, item.kind)
            if (kind && item.kind !== kind) return false
            if (type && item.type !== type) return false
            if (name && item.name.indexOf(name) < 0) return false
            return true
          })
          // console.log('mockList',mockList)
          if (sort === '-id') {
            mockList = mockList.reverse()
          }
    
          const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
          // console.log('pl', pageList)
          const msg = {
            code: 20000,
            data: {
                total: mockList.length,
                items: pageList
            }
        }
        response.send(msg)
    })
})
app.post('/vue-admin-template/article/update', (request, response) => {
    sendToken('success', response)
})
app.get('/vue-admin-template/article/create', (request, response) => {
  sendToken('success', response)
})
// {
//     url: '/vue-admin-template/article/list',
//     type: 'get',   
//     response: config => { 
//       const { importance, type, title, page = 1, limit = 10, sort } = config.query

//       let mockList = List.filter(item => {
//         if (importance && item.importance !== +importance) return false
//         if (type && item.type !== type) return false
//         if (title && item.title.indexOf(title) < 0) return false
//         return true
//       })

//       if (sort === '-id') {
//         mockList = mockList.reverse()
//       }

//       const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

//       return {
//         code: 20000,
//         data: {
//           total: mockList.length,
//           items: pageList
//         }
//       }
//     }
//   },
// 入库
// app.post('/vue-element-admin/article/create', (request, response) => {

//     sendToken('success', response)
// })


// let sql = `INSERT INTO repertory(name, type, inputTime, player, count, kind, status) VALUES('hsnq', '赢', '20120620', 'lmx', 30, '装备耗材', '0');`
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '1111',
//   database : 'gms'
// }); 
// connection.connect();
// connection.query(sql, function(err, result) {
//   if(err) {
//       console.log('[SELECT ERROR]', err)
//       return;
//   }
//   console.log('result', result)
// })
// connection.end();
var server = app.listen(8000, () => {
    var host = server.address().address
    var port = server.address().port
})