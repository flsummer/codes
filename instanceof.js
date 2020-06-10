// 首先要了解 instanceof 实现的功能，instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。其实考察的也是继承。

function myInstanceof(left, right) {
    var proto = left.__proto__;
    var protoType = right.prototype;
    while (true) {
        if(proto === null){
            return false;
        }
        if(proto === protoType) {
            return true;
        }
        proto = proto.__proto__;
    }
}

function Car(){

}

var buss = new Car();
console.log(myInstanceof(buss, Car));
