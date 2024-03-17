const EventEmitter = require("events");  

const emitter = new EventEmitter(); 

let count = 0;

const intervalId = setInterval(() => {  
    count++;
    emitter.emit("timer", count);  
}, 1000);  

emitter.on("timer", (count) => console.log(count)); 

setTimeout(() => {
    clearInterval(intervalId);
}, 10000);