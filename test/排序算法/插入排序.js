let iaruSort = function() {
    let num = this.dataStore.length
    for (var i = 1;  i < num - 1; ++i) {
        let t = i
        while (t > 0 && this.dataStore[t] < this.dataStore[t-1]) {
            if (this.dataStore[t]  < this.dataStore[t - 1]) {
                swap(this.dataStore, t, t-1)
                --t
            }
        }
    }
}

let num = 10
let mynums = new CArray(num)
mynums.setData()
console.log(mynums.toString())
mynums.iaruSort()
console.log(mynums.toString())