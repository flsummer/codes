let originArray = [1,2,3,4,5,3,2,4,1];

const res1 = Array.from(new Set(originArray));
console.log(res1);

const res2 = [];
const map = new Map();

for (const v of originArray) {
    if(!map.has(v)){
        map.set(v, true);
        res2.push(v);
    }
}
console.log(res2);

const res3 = [];
for (const v of originArray) {
    if(!res3.includes(v)){
        res3.push(v);
    }
}
console.log(res3);

 for (let i = 0; i < originArray.length; i++) {
     for (let j = i + 1; j < originArray.length; j++) {
        if(originArray[i] === originArray[j]){
            originArray.splice(j, 1);
            j--;
        }
     }
 }
 console.log(originArray);
 

 const obj = {};
 const res4 = originArray.filter(item => obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true));
 const res5 = originArray.filter(function(item){
    console.log(typeof item + item);
    return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true);
 })
 console.log(obj);
 console.log(res4);
 