Function.prototype.bind = function(context, ...args1){
    if(typeof this !== 'function'){
        throw new Error('not a function');
    }

    let fn = this;
    let resFn = function(...args2){
        return fn.apply(this instanceof resFn ? this : context, args1.concat(args2));
    };
    const DumpFunction = function DumpFunction(){};
    DumpFunction.prototype = this.prototype;
    resFn.prototype = new DumpFunction();
    return resFn;
}

Function.prototype.call = function() {
    let [thisArg, ...args] = [...arguments];
    if(!thisArg) {
        // context是null 或者 undefined
        thisArg = typeof window === 'undefined' ? global : window;
    }

    // this的指向是当前函数 func (func.call)
    thisArg.func = this;
    //执行函数
    let result = thisArg.func(...args);
    delete thisArg.func;  // thisArg上并没有func属性 因此需要删除
    return result;
}

Function.prototype.apply = function(thisArg, rest) {
    let result; // 函数返回结果
    if(!thisArg) {
        // context是null 或者 undefined
        thisArg = typeof window === 'undefined' ? global : window;
    }
    // this的指向是当前函数 func (func apply)
    thisArg.func = this;
    if(!rest) {
        // 第二个参数是null 或者undefined
        result = thisArg.func();
    } else {
        result = thisArg.func(...rest);
    }
    delete thisArg.func;
    return result;
}