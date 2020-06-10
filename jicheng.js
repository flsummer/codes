// 原型链继承

import { blue } from "color-name";

// 构造函数 原型 和实例之间的关系 每个构造函数都有一个原型对象 原型对象都包含一个指向构造函数的指针 而实例都包含一个原型对象的指针
function SuperType(){
    this.property = true;
}

SuperType.prototype.getSuperValue = function() {
    return this.property
}

function SubType(){
    this.subproperty = false;
}

SubType.prototype = new SuperType();

SubType.prototype.getSuperValue = function(){
    return this.subproperty;
}

var instance = new SubType();
console.log(instance.getSuperValue());

// 原型链方案存在的缺点 多个实例对引用类型的操作会被篡改

// =====================================================
// 借用构造函数的继承
/*
* 使用父类的构造函数来增强子类实例 等同于复制父类的实例给子类 不使用原型
*/

function SuperType(){
    this.color = ['red', 'black', 'blue'];
}

function SubType(){
    SuperType.call(this);
}

var instance1 = new SubType();
instance1.color.push('black');

var instance2 = new SubType();
console.log(instance2.color);

// 核心代码是Super.call(this) 创建子类实例时调用SuperType构造函数 于是SubType的每个实例都会将SuperType中的属性复制一份

// 缺点 只能继承父类的实例属性和方法 不能继承原型属性和方法
// 无法实现复用 每个子类都有父类实例函数的副本 影响性能

// =======================================================
// 组合继承
// 组合上述两种方法就是组合继承 用原型链实现对原型属性的方法和继承 用借用构造函数技术来实现实例属性的继承

function SuperType(name){
    this.name = name;
    this.color = ['red', "blue", "green"];
}

SuperType.property.sayName = function(){
    console.log(this.name);
}

function SubType(name, age){
    // 继承属性
    // 第二次调用SuperType()
    SuperType.call(this, name);
    this.age = age;
}

// 继承方法
// 构建原型链
// 第一次调用SuperType
SubType.prototype = new SuperType();
// 重写SubType.prototype的constructor属性 指向自己的构造函数SubType
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
    console.log(this.age);
}

var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"
instance1.sayName(); //"Nicholas";
instance1.sayAge(); //29

var instance2 = new SubType("Greg", 27);
alert(instance2.colors); //"red,blue,green"
instance2.sayName(); //"Greg";
instance2.sayAge(); //27

// 缺点
    // 第一次调用SuperType 给SubType.prototype写入两个属性 name color
    // 第二次调用SuperType 给instance1写入两个属性 name color
// 实例对象instance1上的两个属性就屏蔽了其原型对象上SubType.prototype的两个同名属性 
// 所以 组合模式的缺点就在于使用子类创建实例对象时 其原型中会存在两份相同的属性和方法

// ============================================================
// 原型式继承
// 利用一个空对象作为中介 将某个对象直接赋值给空对象构造函数的原型
function object(ibj){
    function F(){}
    F.prototype = obj;
    return new F();
}

// object()对传入其中的对象执行了一次浅复制 将构造函数F的原型直接指向传入的对象
var person = {
    name: "summer",
    age: 28
}
var anPerson = object(person);
anPerson.name = "spring";
var twoPerson = object(person);
twoPerson.name = "winter";

// 缺点：

// 原型链继承多个实例的引用类型属性指向相同，存在篡改的可能。
// 无法传递参数
// 另外，ES5中存在Object.create()的方法，能够代替上面的object方法。

// ===============================================================
// 寄生组合式继承
// 结合借用构造函数传递参数和寄生模式实现继承

function inheritPrototype(subType, superType){
    var prototype = Object.create(superType.prototype); // 创建对象，创建父类原型的一个副本
    prototype.constructor = subType;                    // 增强对象，弥补因重写原型而失去的默认的constructor 属性
    subType.prototype = prototype;                      // 指定对象，将新创建的对象赋值给子类的原型
  }
  
  // 父类初始化实例属性和原型属性
  function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
  }
  SuperType.prototype.sayName = function(){
    alert(this.name);
  };
  
  // 借用构造函数传递增强子类实例属性（支持传参和避免篡改）
  function SubType(name, age){
    SuperType.call(this, name);
    this.age = age;
  }
  
  // 将父类原型指向子类
  inheritPrototype(SubType, SuperType);
  
  // 新增子类原型属性
  SubType.prototype.sayAge = function(){
    alert(this.age);
  }
  
  var instance1 = new SubType("xyc", 23);
  var instance2 = new SubType("lxy", 23);
  
  instance1.colors.push("2"); // ["red", "blue", "green", "2"]
  instance2.colors.push("3"); // ["red", "blue", "green", "3"]

// 这个例子的高效率体现在它只调用了一次SuperType 构造函数，并且因此避免了在SubType.prototype 上创建不必要的、多余的属性。
// 于此同时，原型链还能保持不变；因此，还能够正常使用instanceof 和isPrototypeOf()

//  这是最成熟的方法，也是现在库实现的方法

