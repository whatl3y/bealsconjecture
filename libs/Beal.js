var BigNumber = require("bignumber.js");

function Beal(opts) {
  opts = opts || {};
  
  this.a = opts.a;
  this.b = opts.b;
  this.c = opts.c;
  this.x = opts.x || 2;
  this.y = opts.y || 2;
  this.z = opts.z || 2;
  
  this.progressCheck = opts.progress || 1;
}

Beal.prototype.checkMany = function(maxBase,maxPow,minBase,minPow,display,displayAll) {
  minBase = minBase || 1;
  minPow = minPow || 3;
  maxBase = maxBase || 10;
  maxPow = maxPow || 5;
  display = (display===false) ? false : true;
  displayAll = displayAll || false;
  
  for (var _A=minBase;_A<maxBase;_A++) {
    for (var _B=minBase;_B<maxBase;_B++) {
      for (var _C=minBase;_C<maxBase;_C++) {
        if (!(_A % this.progressCheck && _B % this.progressCheck && _C % this.progressCheck) && displayAll) console.log("A: "+_A+" - B: "+_B+" - C: "+_C);
        if (this.gcdMultiple(_A,_B,_C) > 1 && displayAll) continue;
        
        for (var _x=minPow;_x<maxPow;_x++) {
          for (var _y=minPow;_y<maxPow;_y++) {
            for (var _z=minPow;_z<maxPow;_z++) {
              this.a = _A;
              this.b = _B;
              this.c = _C;
              this.x = _x;
              this.y = _y;
              this.z = _z;
              this.isValid({display:display});
            }
          }
        }
      }
    }
  }
}

Beal.prototype.single = function(base,power) {
  return new BigNumber(base).pow(new BigNumber(power));
}

Beal.prototype.sum = function(aAry,bAry) {
  return this.single(aAry[0],aAry[1]).add(this.single(bAry[0],bAry[1]));
}

Beal.prototype.isValid = function(opts) {
  opts = opts || {};
  
  var aAry = opts.aAry || [this.a,this.x];
  var bAry = opts.bAry || [this.b,this.y];
  var cAry = opts.cAry || [this.c,this.z];
  var display = opts.display || false;
  
  var result = this.sum(aAry,bAry).eq(this.single(cAry[0],cAry[1]));
  if (display && result) console.log(this.display({a:aAry[0],b:bAry[0],c:cAry[0],x:aAry[1],y:bAry[1],z:cAry[1]}));
  
  return result;
}

Beal.prototype.display = function(opts) {
  return opts.a+"^"+opts.x+" + "+opts.b+"^"+opts.y+" = "+opts.c+"^"+opts.z+" = "+this.sum([opts.a,opts.x],[opts.b,opts.y])+" -- GCD: "+this.gcdMultiple(opts.a,opts.b,opts.c);
}

Beal.prototype.gcd = function(a,b) {
  if (!b) return a;
  return this.gcd(b,a%b);
}

Beal.prototype.gcdMultiple = function(args) {
  if (!(args instanceof Array)) {
    return this.gcdMultiple(Array.prototype.slice.call(arguments));
  } else if (args.length <= 2) {
    return this.gcd(args[0],args[1]);
  }
  
  var g = this.gcd(args[0],args[1]);
  return this.gcdMultiple(args.slice(2).concat([g]));
}

//-------------------------------------------------------
//NodeJS
if (typeof module !== 'undefined' && module.exports) {
  module.exports=Beal;
}
//-------------------------------------------------------