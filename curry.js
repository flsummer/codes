const curry = (fn, ...args1) => (...args2) => (
    arg => arg.length === fn.length ? fn(...arg) : curry(fn, ...arg)
   )([...args1, ...args2]);

// 调用
const foo = (a, b, c) => a * b * c;
curry(foo)(2, 3, 4); // -> 24
curry(foo, 2)(3, 4); // -> 24
curry(foo, 2, 3)(4); // -> 24
curry(foo, 2, 3, 4)(); // -> 24

var curry = function curry(fn) {
    var params = [...arguments].slice(1); //copy arguments except the this object
    return function() {
        var args = params.concat(...arguments); //do not use params directly, as it will be modified by this closure
        return fn.length <= 1 || args.length >= fn.length ? fn.apply(undefined, args) : args.reduce(function(acc, curr) {
            return curry(acc.bind(null, curr)), fn;
        });
    };
};


// var curry = function(x) {
//     return function(y) {
//       return x + y;
//     };
//   };