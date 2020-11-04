// gua.js 库函数
var log = console.log.bind(console)

var e = selector => document.querySelector(selector)

var appendHtml = (element, html) => element.insertAdjacentHTML('beforeend', html)

var ajax = function (method, path, data, callback) {
    var r = new XMLHttpRequest()
    r.open(method, path, true)
    r.setRequestHeader('Content-Type', 'application/json')
    r.onreadystatechange = () => {
        if (r.readyState == 4) {
            log('r', r)
            callback(r.response)
        }
    }
    r.send(data) 
}

// 1. 往页面中添加输入框和提交按钮来增加 todo
//     添加页面元素
//     点击提交后, 发数据给 api, api 如果成功, 则在页面中显示被创建的 todo
var insertInput = () => {
    var t = `
        <div>
            <input id="id-input-task">
            <button id="id-button-add" class="todo-add">add button</button>
        </div>
    `
    var element = e('#id-div-todo-container')
    appendHtml(element, t)
}

var insertCss = () => {
    var t = `
    <style>
        .todo-cell {
            font-family: 'Yahei', Arial, sans-serif;
            outline: 1px solid #eee;
        }
        .todo-cell button {
            border: none;
        }
    </style>
    `
    // 注意, document.head 相当于 e('head')
    // document.head 和 document.body 是可以直接访问的元素
    var element = document.head
    appendHtml(element, t)
}

//todo模板
var templateTodo = (todo) => {
    var task = todo.task 
    var id = todo.id
    var t = `
        <div class="todo-cell" data-id="${id}">
            <button class="todo-edit">编辑</button>
            <button class="todo-delete">删除</button>
            <span class="todo-task">${task}</span>
        </div>
    `
    return t
}
//插入todo
var insertTodo = (todo) => {
    var container = e('#id-div-todo-container')
    var html = templateTodo(todo)
    appendHtml(container, html)
}
//插入多条todo
var insertTodos = (todos) => {
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i]
        insertTodo(todo)
    }
}

// 获取todo
var apiGet = (path, callback) => {
    var url = 'https://vip.kybmig.cc/sandbox/todo/2979606245' + path
    ajax('GET', url, '', (r) => {
        var data = JSON.parse(r)
        callback(data)
    })
}

var apiPost = (path, data, callback) => {
    var url = 'https://vip.kybmig.cc/sandbox/todo/2979606245' + path
    data = JSON.stringify(data)
    ajax('POST', url, data, (r) => {
        var data = JSON.parse(r)
        callback(data)
    })
}

var apiTodoDelete = (todoId, callback) => {
    var path = '/delete/' + todoId
    apiGet(path, callback)
}

var apiTodoAll = (callback) => {
    var path = '/all'
    apiGet(path, callback)
}

var apiTodoAdd = (data, callback) => {
    var path = '/add'
    apiPost(path, data, callback)
}

var apiTodoUpdate = (todoId, data, callback) => {
    var path = '/update/' + todoId
    apiPost(path, data, callback)
}

// 绑定事件的部分
var bindEventAdd = () => {
    // 绑定 add 按钮的事件委托
    var container = e('#id-div-todo-container')
    container.addEventListener('click', (event) => {
        var self = event.target
        if (self.classList.contains('todo-add')) {
            log('add button clicked')
            // // 获取 input 的输入
            // var input = e('#id-input-task')
            // var value = input.value
            // // 组装成对象
            // var data = {
            //     'task': value,
            // }
            // apiTodoAdd(data, (todo) => {
            //     log('创建成功', todo)
            //     // 往页面中插入被创建的 todo
            //     insertTodo(todo)
            // })
        }
    })
}

// 5. 删除按钮可以删除这个 todo
//     提前绑定好删除按钮的事件委托
//     写出删除函数, 需要 todo_id
//     在事件中调用删除函数, 获取 todo_id 并且传给删除函数
//     删除后, 删除页面元素
var bindEventDelete = () => {
    // 绑定 delete 按钮的事件委托
    var container = e('#id-div-todo-container')
    container.addEventListener('click', (event) => {
        var self = event.target
        if (self.classList.contains('todo-delete')) {
            // log('delete button clicked')
            // // 拿到 todo id
            // var todoCell = self.closest('.todo-cell')
            // var todoId = todoCell.dataset.id
            // // 使用 ajax 函数发送数据到服务器
            // apiTodoDelete(todoId, (todo) => {
            //     log('todo', todo)
            //     // 删除成功后, 删除页面中的元素
            //     todoCell.remove()
            // })
        }
    })
}

var bindEventEdit = () => {
    // 绑定 edit 按钮的事件委托
    var container = e('#id-div-todo-container')
    container.addEventListener('click', (event) => {
        var self = event.target
        if (self.classList.contains('todo-edit')) {
            log('edit button clicked')
            var todoCell = self.closest('.todo-cell')
            // 找到 todo-task, 设置 contentEditable 属性, 并且让它获得焦点
            var task = todoCell.querySelector('.todo-task')
            task.contentEditable = true
            task.focus()
        }
    })
}

var bindEventUpdate = () => {
    // 绑定 keydown 事件
    var container = e('#id-div-todo-container')
    container.addEventListener('keydown', (event) => {
        var self = event.target
        if (self.classList.contains('todo-task')) {
            if (event.key === 'Enter') {
                log('按了回车键', event)
                // 取消事件的默认行为, 回车键在编辑标签内容的时候会默认换行
                event.preventDefault()
                self.contentEditable = false
                var todoCell = self.closest('.todo-cell')
                var todoId = todoCell.dataset.id
                var data = {
                    'task': self.innerHTML,
                }
                apiTodoUpdate(todoId, data, (todo) => {
                    log('更新成功', todo)
                })
            }
        }
    })
}

// var actionEdit = (self) => {
//     log('delete button clicked')
//     // 拿到 todo id
//     var todoCell = self.closest('.todo-cell')
//     var todoId = todoCell.dataset.id
//     // 使用 ajax 函数发送数据到服务器
//     apiTodoDelete(todoId, (todo) => {
//         log('todo', todo)
//         // 删除成功后, 删除页面中的元素
//         todoCell.remove()
//     })
// }
var actionAdd = () => {
    // 获取 input 的输入
    var input = e('#id-input-task')
    var value = input.value
    // 组装成对象
    var data = {
        'task': value,
    }
    apiTodoAdd(data, (todo) => {
        log('创建成功', todo)
        // 往页面中插入被创建的 todo
        insertTodo(todo)
    })
}
var actionDelete = (self) => {
    log('delete button clicked')
    // 拿到 todo id
    var todoCell = self.closest('.todo-cell')
    var todoId = todoCell.dataset.id
    // 使用 ajax 函数发送数据到服务器
    apiTodoDelete(todoId, (todo) => {
        log('todo', todo)
        // 删除成功后, 删除页面中的元素
        todoCell.remove()
    })
}
var actionEdit = (self) => {
    log('edit button clicked')
    var todoCell = self.closest('.todo-cell')
    var task = todoCell.querySelector('.todo-task')
    task.contentEditable = true
    task.focus()
}
var bindEventDelegates = () => {
    var container = e('#id-div-todo-container')
    container.addEventListener('click', (event) => {
        var self = event.target
        if (self.classList.contains('todo-add')) {
            actionAdd()
        } else if (self.classList.contains('todo-delete')) {
            actionDelete(self)
        } else if (self.classList.contains('todo-edit')) {
            actionEdit(self)
        }
    })
}

var bindEvents = () => {
    // 绑定事件委托
    bindEventDelegates()
    // bindEventAdd()
    // bindEventDelete()
    // bindEventEdit()
    bindEventUpdate()
}

// 2. 载入所有的 todos
//     载入
//     插入到页面中
var loadTodos = () => {
    apiTodoAll((todos) => {
        log('all todos', todos)
        insertTodos(todos)
    })
}

var __main = () => {
    // 初始化程序, 插入 input 标签和 css
    insertInput()
    insertCss()
    // 绑定事件委托
    bindEvents()
    // 载入所有 todos 并且在页面中显示
    loadTodos()
}

__main()