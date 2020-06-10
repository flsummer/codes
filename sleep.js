// promise 
var sleep = time => new Promise(resolve => setTimeout(resolve, time));
sleep(1000).then(()=>{
    console.log(1);
})

// Generator
function * sleepGenerator(time){
    yield new Promise(function(resolve, reject){
        setTimeout(resolve, time);
    })
}

sleepGenerator(1000).next().value.then(()=>{
    console.log(12);
})

// async
function sleep(time){
    return new Promise(resolve => setTimeout(resolve, time));
}

async function output(){
    var out = await sleep(1000);
    console.log(3);
    return out;
}

// ES5

function sleep(cb, time){
    if(typeof cb === 'function'){
        setTimeout(cb, time);
    }
}

function output(){
    console.log(4);
}

sleep(output, 1000);