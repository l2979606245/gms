function CArray(num) {
    this.dataStore = []
    this.pos = 0
    this.num = num
    this.insert = insert
    this.toString = toString
    this.clear = clear
    this.setData = setData
    this.swap = swap
    for (var i = 0; i < num; ++i) {
        this.dataStore[i] = i
    }
    this.mmpcSort = mmpcSort
    this.xrzeSort = xrzeSort
}

function setData() {
    for (var i = 0; i < this.num; ++i) {
        this.dataStore[i] = Math.floor(Math.random() * (this.num + 1))
    }
    return this.dataStore
}

function clear() {
    for (var i = 0; i< this.dataStore.length; ++i) {
        this.dataStore[i] = 0
    }
    return this.dataStore
}

function insert(ele) {
    this.dataStore[this.pos++] = ele
}

function toString() {
    var restr = ""
    for (var i = 0; i < this.dataStore.length; ++i) {
        restr += this.dataStore[i] + " "
        if (i > 0 && (i + 1) % 10 == 0) {
            restr += '\n'
        }
    }
    return restr
}

function swap(arr, index1, index2) {
    let temp = arr[index1]
    arr[index1] = arr[index2]
    arr[index2] = temp
}

