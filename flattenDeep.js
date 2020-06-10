function flattenDeep1(arr) {
    return arr.flat(Math.pow(2,53) - 1);
}

console.log(flattenDeep1([1, [2, [3, [4]], 5]]));

function flattenDeep2(arr) {
    return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep2(val)) : acc.concat(val), []);
}

console.log(flattenDeep2([1, [2, [3, [4]], 5]]));

function flattenDeep3(arr) {
    const stack = [...arr];
    const res = [];
    while (stack.length) {
        const next = stack.pop();
        if (Array.isArray(next)) {
            stack.push(...next);
        } else {
            res.push(next);
        }
    }

    return res.reverse();
}

console.log(flattenDeep3([1, [2, [3, [4]], 5]]));