// console.log(arguments);
// console.log(require("module").wrapper);

// module.exports
const C = require("./test-module-1");
const calc1 = new C();
console.log(calc1.add(1, 2));

// exports
const { add } = require("./test-module-2");
console.log(add(2, 3));

// caching
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();