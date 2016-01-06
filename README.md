# bealsconjecture

Small utility to output solution's to Beal's Conjecture. Why? Because I wanted to.

## Introduction
Beal's Conjecture states, "If A^x + B^y = C^z, where A, B, C, x, y and z are positive integers and x, y and z are all greater than 2, then A, B and C must have a common prime factor."

Andy Beal, the creator, is currently offering anyone who can prove or disprove this conjecture $1,000,000.

## How To Use
Really only one method meant to be called.

```js
var Beal = require("bealsconjecture.js");

new Beal().checkMany();
```