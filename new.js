function _new(){
    // 创建一个新对象
    let target = {};
    // 第一个参数是构造函数
    let [constructor, ...args] = [...arguments];
    // 执行【原型】连接，target是constructor的实例
    // target.__proto__ = constructor.prototype;

    Object.setPrototypeOf(target, constructor.prototype);

    // 执行构造函数 将属性或者方法添加到创建的空对象上
    let result = constructor.apply(target, args);
    if (result && (typeof result === 'object' || typeof result === 'function')){
        // 如果构造函数执行的结果返回的是一个对象 那么返回这个对象
        return result;
    }
    // 如果构造函数返回的不是一个对象 返回创建的新对象
    return target;
}

function Dog(name) {
    this.name = name
    this.say = function () {
        console.log('name = ' + this.name)
    }
}

var dog = _new(Dog,'aaa')
dog.say() //'name = aaa'
console.log(dog instanceof Dog) //true


