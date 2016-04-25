/************prototypes************/
/*almost all objects have non-null value for prototype at creation*/
var anotherObject = {a: 2}
var myObject = Object.create(anotherObject) // create object linked to anotherObject
myObject.a // 2
/*default [[get]] opeation follows [[prototype]] link of the object if cant find property
-for..in loop with follow prototype chain
-top of chain is Object.prototype - common utilities for al objects*/

/******setting and shadowing properties******/
/*when assigning vaue to a property, if property exists on both object and 
	a higher level of the prototype hain of the object then its called shadowing
-the search for a variable always starts at the bottom of the chain so others of the same name up 
	the prototype chain wont be found
-three scenarios for the myObject.foo = "bar" assignment when foo is not already on myObject 
directly, but is at a higher level of myObject's [[Prototype]] chain:
	-if normal data accessor property named foo is found higher on prototype chain,
		and is not read only, then new property called foo added to myObject creating shadowed object
	-if foo is found higher on chain, but marked as read only, then both setting of existing property
		and creation of shadowed property on myObject are not allowed - eror thrown in strict mode
	-if foo found higher on chain and its a setter, then setter always called. no foo shadowed on myObject
-using [[put]] wi only result in shadowing for the first condition
-