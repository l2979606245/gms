// function singleNumber( A ) {
//     // write code here
//     var res =  A.reduce((pre, cur) => {
//        let r = pre ^ cur
//        console.log('a',r)
//        return r
//     })
//     return res
// }

// singleNumber([1,2,3,4,2,3,4])
// // singleNumber([1,0,0])

// function maxSubArray( A ) {
//     // write code here
//     if (A.length == 1) {
//         return A[0]
//     }
//     let loc = []
//     for (var i = 0; i<A.length; i++) {
//         //求出数组中所有大于0元素的位置
//         if (A[i] > 0) {
//             loc.push(i)
//         }
//     }
    
//     console.log(loc)
//     if (loc.length == 1) {
//         return A[loc[0]]
//     } else if(loc.length == 0) {
//         return Math.max(...A)
//     }
//     let fin = 0
//     for (var j = 0; j<loc.length; j++){
//         for (var k = j +1; k < loc.length; k++) {
//             let arr = A.slice(loc[j], loc[k] + 1)
//             let he = arr.reduce((pre, cur)=>  pre + cur )
//             console.log('he', he)
//             if (fin < he) {
//                 fin = he
//             }
//         }
//     }
//     console.log('fin', fin)
//     return fin
// }
// maxSubArray([-8,2,2,-6,2,-7,-7,7,1,8,1,-8])
function TreeCode() {

    let BiTree = function (ele) {

        this.data = ele;

        this.lChild = null;

        this.rChild = null;

    }

 

    this.createTree = function () {

        let biTree = new BiTree('A');

        biTree.lChild = new BiTree('B');

        biTree.rChild = new BiTree('C');

        biTree.lChild.lChild = new BiTree('D');

        biTree.lChild.lChild.lChild = new BiTree('G');

        biTree.lChild.lChild.rChild = new BiTree('H');

        biTree.rChild.lChild = new BiTree('E');

        biTree.rChild.rChild = new BiTree('F');

        biTree.rChild.lChild.rChild = new BiTree('I');

        return biTree;

    }

}

 

//前序遍历

function ProOrderTraverse(biTree) {

    if (biTree == null) return;

    console.log(biTree.data);

    ProOrderTraverse(biTree.lChild);

    ProOrderTraverse(biTree.rChild);

}

 

//中序遍历

function InOrderTraverse(biTree) {

    if (biTree == null) return;

    InOrderTraverse(biTree.lChild);

    console.log(biTree.data);

    InOrderTraverse(biTree.rChild);

}

 

//后续遍历

function PostOrderTraverse(biTree) {

    if (biTree == null) return;

    PostOrderTraverse(biTree.lChild);

    PostOrderTraverse(biTree.rChild);

    console.log(biTree.data);

}

 

let myTree = new TreeCode();

console.log(myTree.createTree());

console.log('前序遍历')

ProOrderTraverse(myTree.createTree());

console.log('中序遍历')

InOrderTraverse(myTree.createTree());

console.log('后续遍历')

PostOrderTraverse(myTree.createTree());
