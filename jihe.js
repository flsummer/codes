
arr1 = [1, 2, 3, 4, 5];
arr2 = [5, 6, 7, 8, 9];
arr1set = new Set(arr1);
arr2set = new Set(arr2);
console.log('arr1: ', arr1);
console.log('arr2: ', arr2);

var o1 = {};
// 交集
o1.intersection = arr1.filter(function(val){ 
    return arr2.indexOf(val) > -1 
});
// 并集
o1.union = arr1.concat(arr2.filter(function(val){
    return !(arr1.indexOf(val) > -1);
}))
// 补集 两个数组各自没有的集合
o1.complement = arr1.filter(function(val){
    return !(arr2.indexOf(val) > -1);
}).concat(arr2.filter(function(val){
    return !(arr1.indexOf(val) > -1);
}));
// 差集 数组arr1相对于arr2所没有的
o1.diff = arr1.filter(function(val){
    return arr2.indexOf(val) === -1;
});

console.log(o1);


var o2 = {};

//交集
o2.intersection = arr1.filter(item => arr2set.has(item));
//并集
o2.union = Array.from(new Set([...arr1, ...arr2]));
// 补集 两个数组各自没有的集合
o2.complement = [...arr1.filter(item => !arr2set.has(item)), ...arr2.filter(item => !arr1set.has(item))];
// 差集 数组arr1相对于arr2所没有的
o2.diff = arr1.filter(item => !arr2set.has(item));

console.log(o2);
