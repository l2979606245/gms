// 选择排序 ： 将数组第一个元素与其他元素比较， 将小的元素放在第一个元素位置，以此类推，执行数组长度 - 1次大循环。
let xrzeSort = function() {

    let num = this.dataStore.length
    for (var i = 0; i < num - 1; ++i) {
        for (var j = i+1; j < num; ++j) {
            if (this.dataStore[i] > this.dataStore[j]) {
                swap(this.dataStore, i, j)
            }
        }
    }
}

let num = 10
let mynums = new CArray(num)
mynums.setData()
console.log(mynums.toString())
mynums.xrzeSort()
console.log(mynums.toString())