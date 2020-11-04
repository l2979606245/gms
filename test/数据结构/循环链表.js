function Node(ele) {
    this.ele = ele
    this.pre = null
    this.next = null
}
// single linkList
function LList() {
    this.head = new Node('head')
    this.insert = insert
    this.remove = remove
    this.find = find
    this.display = display
    this.findLastNode = findLastNode
    this.dispReverse = dispReverse
}

function find(item) {
    let cur = this.head
    while(cur.ele != item) {
        cur = cur.next
    }
    return cur
}

function insert(ele, item) {
    let cur = this.find(item)
    let newCode = new Node(ele)
    newCode.next = cur.next
    newCode.pre = cur
    cur.next = newCode
    return newCode
}


function remove(item) {
    let remNode = this.find(item)
    if (remNode.next != null) {
        remNode.pre.next = remNode.next
        remNode.next.pre = remNode.pre
        remNode.next = null
        remNode.pre = null
    } else {
        remNode.pre.next = null
        remNode.pre = null
    }
}
function display() {
    let cur = this.head
    while (cur.next != null) {
        // console.log(cur)
        console.log(cur.next.ele)
        cur = cur.next
    }
    return false
}
function findLastNode() {
    let cur = this.head
    while(cur.next != null) {
        cur = cur.next
    }
    return cur
}

function dispReverse() {
    // let cur = this.head
    let cur = this.findLastNode()
    while(cur.pre != null) {
        console.log(cur.ele)
        cur = cur.pre
    }
}
var cities = new LList()
cities.insert('conway', 'head')
cities.insert('russellville', 'conway')
cities.insert('alma', 'russellville')
cities.display()
// cities.remove('russellville')
// cities.display()
cities.dispReverse()