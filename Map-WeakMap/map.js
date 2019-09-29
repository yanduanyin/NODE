globalThis.gc()
console.log(process.memoryUsage());
let key = new Array(5 * 1024 * 1024); //1
let map = new Map();
map.set(key, 1); // 2
map.delete(key); // -1
key = null // -1
globalThis.gc()
console.log(process.memoryUsage().heapUsed);