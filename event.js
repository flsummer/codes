class EventEmeittter{
    constructor() {
        this._events = this._events || new Map();
        this._maxListeners = this._maxListeners || 10;
    }
}

// 触发名为type的事件
EventEmeittter.prototype.emit = function(type, ...args) {
    let handler;
    handler = this._events.get(type);
    if (Array.isArray(handler)) {
        for (let i = 0; i < handler.length; i++) {
            if(args.length > 0) {
                handler[i].apply(this, args);
            } else {
                handler[i].call(this);
            }
        }
    } else {
        if(args.length > 0) {
            handler.apply(this, args);
        } else {
            handler.call(this);
        }
    }

    return true;
}

// 监听名为type的事件
EventEmeittter.prototype.addListener = function(type, fn) {
    const handler = this._events.get(type);

    if(!handler) {
        this._events.set(type, fn);
    } else if (handler && typeof handler === 'function'){
        this._events.set(type, [handler, fn]);
    } else{
       handler.push(fn);
    }
}

EventEmeittter.prototype.removeListener = function(type, fn) {
    const handler = this._events.get(type); // 获取对应事件名称的函数清单

    //如果是函数 说明只被监听了一次
    if (handler && typeof handler === 'function') {
        this._events.delete(type, fn);
    } else {
        let position;
        for (let i = 0; i < handler.length; i++) {
            if (handler[i] === fn) {
                position = i;
            } else {
                position = -1;
            }
        }

        // 如果找到匹配的函数,从数组中清除
        if (position !== -1) {
            handler.splice(position, 1);
            if (handler.length === 1) {
                this._events.set(type, handler[0]);
            }
        } else {
            return this;
        }
    }
}

const emitter = new EventEmeittter();
// 监听同一个事件名
emitter.addListener('arson', man => {
    console.log(`expel ${man}`);
});
emitter.addListener('arson', man => {
    console.log(`save ${man}`);
});
emitter.addListener('arson', man => {
    console.log(`kill ${man}`);
});
  
emitter.emit('arson', 'low-end');



