function deepClone(obj, hash = new WeakMap()) {
    if (obj instanceof RegExp) return new RegExp(obj);
    if (obj instanceof Date) return new Date(obj);
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    if (hash.has(obj)) {
        return hash.get(obj);
    }

    let t = new obj.constructor();
    hash.set(obj, t);
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            t[key] = deepClone(obj[key], hash);
        }
    }
    return t;
 }
console.log(deepClone([1,{a:[{},{},{}],b:[]},{a:[1,{a:[],b:[]},{a:1}]}]));


function isObject(o){
    return typeof o === 'object' && o !== null;
}

function deepClone2(source, hash = new WeakMap()){

    if(!isObject(source)) return source;
    if(hash.has(source)) return hash.get(source);

    var target = Array.isArray(source) ? [] : {};
    hash.set(source, target);

    let sym = Object.getOwnPropertySymbols(source);
    if(sym.length){
        sym.forEach(s=>{
            if(isObject(source[s])){
                target[s] = deepClone2(source[s], hash);
            } else {
                target[s] = source[s];
            }
        })
    }

    for (const key in source) {
        if(Object.prototype.hasOwnProperty.call(source, key)){
            if(isObject(source[key])){
                target[key] = deepClone2(source[key], hash);
            }else {
                target[key] = source[key];
            }
        }
    }
    return target;
}