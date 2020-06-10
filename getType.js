function getType(obj){
    if(obj === null){
        return String(obj);
    }
    return typeof obj === 'object' ? Object.prototype.toString.call(obj).replace('[object ', '').replace(']', '').toLowerCase() : typeof obj;
}


console.log(getType(null));
console.log(getType(undefined));
console.log(getType({}));
console.log(getType([]));
console.log(getType(123));
console.log(getType(true));
console.log(getType('123'));
console.log(getType(/123/));
console.log(getType(new Date()));