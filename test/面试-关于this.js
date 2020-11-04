//TODO: 想想输出什么，先别运行哦
var myObject = {

    foo: "bar",

    func: function() {

        var self = this;

        console.log("outer func: this.foo = " + this.foo);

        console.log("outer func: self.foo = " + self.foo);

        (function() {

            console.log("inner func: this.foo = " + this.foo);

            console.log("inner func: self.foo = " + self.foo);

        }());  

    }

};

myObject.func();




//由于函数体内部使用了this关键字，而this指的是函数运行时所在的环境。
// 对于hero.getSecretIdentity()来说，getSecretIdentity运行在环hero境，所以this指向hero；
// 对于stoleSecretIdentity()来说，stoleSecretIdentity()运行在全局环境，所以this指向全局环境。所以，两者的运行结果不一样。
//TODO:为什么是这样呢？ 这需要讲一讲内存的数据结构啦， 需要视频授课啦

var hero = {

    _name: 'John Doe',

    getSecretIdentity: function (){

        return this._name;

    }

};

var stoleSecretIdentity = hero.getSecretIdentity;
//this指向window对象
console.log(stoleSecretIdentity());
//this指向hero对象
console.log(hero.getSecretIdentity());




//TODO: 这个看看，不懂没关系。
var length = 10;

function fn() {

    console.log(this.length, globalThis.length);

}

var obj = {

  length: 5,

  method: function() {

    fn();



  }

};

obj.method();
