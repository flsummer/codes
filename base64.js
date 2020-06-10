var binaryDataToBase64 = function(byte){
    var sBytes = new Uint8Array(byte).reduce(function(accu, next){
        return accu + String.fromCharCode(next);
    }, '');
    return `data:image/png;base64,${btoa(sBytes)}`;
};

console.log(binaryDataToBase64(11));
