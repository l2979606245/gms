//TODO: 考虑下面的两个函数。他们都会返回同样的值吗？

function foo1(){

  return {

      bar: "hello"

  };

}

function foo2(){

  return

  {

      bar: "hello"

  };

}

console.log("foo1 returns:");

console.log(foo1());

console.log("foo2 returns:");

console.log(foo2());
