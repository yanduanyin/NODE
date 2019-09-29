global.gc();
console.log(process.memoryUsage().heapUsed);
let key = new Array(5 * 1024 * 1024); // 1
let wp = new WeakMap();
wp.set(key, 1); // 2
key = null // -1
global.gc();
console.log(process.memoryUsage().heapUsed)
