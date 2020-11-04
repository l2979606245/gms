
function Node(ele) {
    this.ele = ele
    this.next = null
}
// single linkList
function LList() {
    this.head = new Node('head')
    this.insert = insert
    this.remove = remove
    this.find = find
    this.display = display
    this.findPreEle = findPreEle
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
    cur.next = newCode
    return newCode
}

function findPreEle(item) {
    let cur = this.head
    while(cur.next.ele != item && cur.next != null) {
        cur = cur.next
    }
    return cur
}

function remove(item) {
    let remNode = this.find(item)
    let preNode = this.findPreEle(item)
    preNode.next = remNode.next
    remNode.next = null
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
// eg
var cities = new LList()
cities.insert('conway', 'head')
cities.insert('russellville', 'conway')
cities.insert('alma', 'russellville')
cities.display()
cities.remove('alma')
cities.display()