// 冒泡排序（以升序为例）： 最慢的排序方法之一，数组中数据相邻两个进行比较，将较大的放在后边，较小的放在前边
// 最坏的情况是 最小的在最后的位置，需要执行 数组长度 - 1次大循环。


function mmpcSort() {
    let num = this.dataStore.length
    let temp = 0
    for (var i = num; i > 1; --i) {
        for (var j = 0; j < num - 1; ++j) {
            if (this.dataStore[j] > this.dataStore[j + 1]) {
                swap(this.dataStore, j, j+1)
            }
        }
    }
}
// let num = 10
// let mynums = new CArray(num)
// mynums.setData()
// console.log(mynums.toString())
// mynums.mmpcSort()
// console.log(mynums.toString())