/******************objects*******************/
/****syntax****/
/*objects come in two forms - declarative literal form and constructed form
-literal syntax*/
var myObj = {
    key: value
}
// constructed form
var myObj = new Object()
myObj.key = value
/*they both make the same object - literal you can add many key/value pairs at declaration
-usually use liteal form to create objects*/

/****type*****/
/*objects are one of six primary types in JS
	string, number, boolean, null, undefined, object
-a mis-statement that everything in js is an object
-special sub-types or complex primitives
	-function - subtype of object (a callable object) and are first class because
	they are bascially normal objects and can be handled as such
	-arrays - a form of objects with extra behavior

/*****built in objects*****/
/*String, Number, Boolean, Object, Function, Array, Date, RegExp, Error
-are not the same as primitive counterparts
-each of these are buitin functions and can be used as constructors like any other function*/
var strObject = new String( "I am a string")
typeof strObject // "object"
strObject instanceof String
/*primitive string is not an object (is a immutable value)
-to perform operations on it need to make it a String object
-calling a method on a string primitive auto converts it to a String object
-will do the same for numbers and booleans
-constructed form of Object, Array, Function, and RegExp offer more options in creation than literal form
-only use constructed form in extra options needed
-Error is called automatically when exception thrown but can create manually*/

/*****contents******/
/*contents of object consist of values stored at named locations called properties
-property names and their references to where they are stored are stored in object container
-can access property in two ways*/
var myObject = {a: 2}
myObject.a // 2 - property access
myObject["a"] // 2 - key access - can programmically make string name this way
/*property names are always strings
-ES6 adds computed property names where you an specify an expression surrounded by a [] pair
	in the key-name position of an object literal declaration*/
var prefix = "foo"

var myObject = {
    [prefix + "bar"]: "hello",
    [prefix + "baz"]: "world"
} // uses value of foo and adds to given string to create property name

myObject["foobar"] // hello
myObject["foobaz"] // world
/*most common usage is for Symbol S which is a new primitive type that has
	an opaque unguessable value

/*****property vs method*******/
/*technicaly functions never belong to an object
-sometimes function have context that can reference to object
-any access of a property on an object is a property access regardless of type of value
-methods dont exist in this way - they are all functions*/
function foo() {
    console.log( "foo" );
}
var someFoo = foo
var myObject = {
    someFoo: foo
}
foo
someFoo
myObject.someFoo
/*there is no difference in the different ways foo is being called 
	except the context inside foo for the implicit binding at myObject.someFoo
-ES6 adds 'super' reference which is used with classes 
	uses static binding rather than late bind 'this'

/*****Arrays*****/
/*Also use the [] access form but assume numeric indexing
-can add properties an aray object - doesnt change length of array*/

/*****duplicating objects*****/
function anotherFunction() {}
var anotherObject = {c: true}
var anotherArray = [];

var myObject = {
    a: 2,
    b: anotherObject,   // a reference not a copy
    c: anotherArray,    // another reference
    d: anotherFunction
}
anotherArray.push(anotherObject, myObject)
/*shalllow copy would copy 'a' but only have reference to b,c,d objects
-deep copy will duplicate all objects
-circular reference between anotherObject and myObject
	many frameworks have ways to make a decision of what to do
-one way is JSON-safe reparsing*/
var newObj = JSON.parse(JSON.stringify(someObj))
/*need to ensure object is JSON safe
-In ES6 object.assign(target, ...sources) uses shallow copy on source(s) and returns target*/
var newObj = Object.assign({}, myObject)
newObj.a // 2
newObj.b === anotherObject // true
newObj.c === anotherArray // true
newObj.d === anotherFunction // true

/********property descriptors********/
/*pre-ES5 could not get characteristics of properties such if they are read only
-ES5 came with property descriptors or data descriptors:*/
var myObject = {a: 2}
Object.getOwnPropertyDescriptor(myObject, "a")
/* {
		value: 2,
		writable: true,
		enumerable: true,
		configurable: true
	}*/
// stting data descriptor
Object.defineProperty(myObject, "a", {
	value: 3,
	writable: true,
	configurable: true,
	enumerable: true
})
myObject.a // 3
/* writable = ability to change value, fails silently but gives TypeError in strict mode
-configurable = ability to modify descriptor definition - always results in TypeError
	- cant use delete operator on property - fails silently
-enumerable = if property will show up in enumerations such as for loops
-immutability = making properties or object that cant be changed 
-examples are shallow immutability - only affect object and direct property characteristics
	if object has reference to another object contents of that object not effected
-combine writable:false and configurable: false can create a constant - no change, redefined, or delete
-can prevent new propteries added*/
Object.preventExtensions(obj) // in strict mode throws Type Error if try to add new properties
/*Sealing an object calls preventExtensions() and sets configurable:false
	cant add new properties or reconfig/delete existing properties*/
Object.seal()
/*create a froxen object which calls seal() and marks all data accessor properties as writable:false
	highest level of immutability - prevent changes to object  and any of its properties
-can deep freeze object by recursively calling freeze() on object and all its object references*/
Object.freeze()

/*****[[get]]*******/
var myObject = {a: 2}
myObject.a // 2 - is a property access
/*this donest just look in myObject - it performs a [[get]] operation on myObject
-this first inspects the object for a property wth the requested name and if found returns value
-if [[get]] cant find a vaue then it returns undefined
-this is different from lexical lookups which throw ReferenceError if no vaue found
-from the results of [[get]] cant know if value is actually undefined or value doesnt exist*/

/*********[[put]]***************/
/*behavior differs whether property is present or not
-if it is present: is property accessor desciptor? yes, call setter
	-if no, is property data descriptor with writable false? yes, fail silently or TypeError in strict mode
	-otherwise set value to existing property*/

/*************getters and setters*************/
/*can override parts of default operations in ES5 on a per property level
-getter and setter functions are used to change these defaults - they are properties that call hindden functions
-if getter/setter defined property definition becomes accessor descriptor not data descriptor
-access descriptor's value and writable characteristics are ignored  and only set/get are considered*/
var myObject = {
    get a() {return 2}
} // object literal syntax get a()
Object.defineProperty(
    myObject,
    "b",
    {
        get: function(){ return this.a * 2 },
        enumerable: true
    } // explicit definition with defineProperty()
)
myObject.a // 2
myObject.b // 4
myObject.a = 3
myObject.a // 2 - 
/*value doesnt change because getter only created - no setter
- use 'this' context to set value inside a setter function*/
var myObject = {
    get a() {
        return this._a_
    },
    set a(val) {
        this._a_ = val * 2
    }
}
myObject.a = 2
myObject.a // 4

/***********existence**********/
/*can ask if object has property without getting value to determine
	if undefined from getting value or doesnt exist*/
var myObject = {a: 2}
("a" in myObject) // true - in operator will check if property exists inside object - uses prototype chain
("b" in myObject) // false
myObject.hasOwnProperty("a") // true - checks if only myObject has property and wont use prototype chain
myObject.hasOwnProperty("b") // false
/*in operator doesnt see if a vaalue exists in aray so 4 in [2,4,6] doesnt work as expected*/

/*****enumeration*******/
var myObject = { };

Object.defineProperty(
    myObject,
    "a",
    { enumerable: true, value: 2 } // enumerable
)
Object.defineProperty(
    myObject,
    "b",
    { enumerable: false, value: 3 } // NOT enumerable
)

myObject.b // 3
("b" in myObject) // true - does show for the 'in' check
myObject.hasOwnProperty("b") // true

for (var k in myObject) {
    console.log(k, myObject[k]) // only displays value of 'a'
}
/*for in loops applied to arrays will include any enumerable properties as well
-only use for in loops on objects and regular for loops on arrays
-can check enumerability, not enumerabe properties dont show on keys()
-both keys() and getOwnPropertyNames() dont use prototype chain*/
myObject.propertyIsEnumerable("a") // true
myObject.propertyIsEnumerable("b") // false
Object.keys(myObject) // ["a"] -- returns array of all enumerable properties
Object.getOwnPropertyNames(myObject) // ["a", "b"]

/***********iteration*************/
/*can iterate over values of properties instead of properties themselves
-ES5 has forEach(), every(), and some()*/
forEach(...) // iterate over all values in array ignoring callback return values
every(...) // keeps going until end or callbackreturns false value
some(...) // keeps going until end or callback returns true value
/*order of iteration is not guaranteed
-ES6 can iterate over values diectly instead of indices (what a for loop does)*/
var myArray = [ 1, 2, 3 ]
for (var v of myArray) { // use 'of' keyword for a 'for of' loop
    console.log(v)
}
/*arrays have builtin @@iterator so for..of works -example manually using @@iterator:*/
var myArray = [ 1, 2, 3 ]
var it = myArray[Symbol.iterator]()
it.next() // { value:1, done:false }
it.next() // { value:2, done:false }
it.next() // { value:3, done:false }
it.next() // { done:true }
/*get @@iterator with ES6 Symbol.iterator - @@iterator is a function that returns iterator object
-regular object do not have builtin @@iterator - only arrays
-can define own custom @@iterator*/
Object.defineProperty(myObject, Symbol.iterator, {
    enumerable: false,
    writable: false,
    configurable: true,
    value: function() {
        var o = this
        var idx = 0
        var ks = Object.keys(o)
        return {
            next: function() {
                return {
                    value: o[ks[idx++]], // gets next index in array
                    done: (idx > ks.length) // true if current index is at end
                }
            }
        }
    }
})
/*can make custom iteration order - ie pixel distance from origin (0,0) instead of linearly across
-can make infinite iterator that returns random value and would never end*/
var randoms = {
    [Symbol.iterator]: function() {
        return {
            next: function() {
                return { value: Math.random() }
            }
        }
    }
}








