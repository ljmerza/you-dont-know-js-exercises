/****this all makes sense now*******/
/***call site***/
/*call site = location in code where a function is called not where its declared
-important to thinkj of the cal stack - stack of functions that have been called
	to get to current moment in program
-call site care about is in the invocation before the currently executing function*/
function baz() {
    // call-stack is: `baz` call-site is in the global scope
    console.log( "baz" )
    bar() // <-- call-site for `bar`
}
function bar() {
    // call-stack is: `baz` -> `bar` call-site is in `baz`
    console.log( "bar" )
    foo() // <-- call-site for `foo`
}
function foo() {
    // call-stack is: `baz` -> `bar` -> `foo` call-site is in bar`
    console.log( "foo" );
}

baz() // <-- call-site for `baz`
/*call stack is the chain of function calls in order
-can also use debugger tool in browser to see call stack easily
-can insert debugger statement in code to pause code and see current call stack*/

/***********RULES OF CALL SITE*******/
/***default binding***/
/*standalone function invocations*/
function foo(){
    console.log(this.a)
}
var a = 2
foo() // 2 - foo is called from global scope here
/*var a is in global scope, this inside foo function resolves to global scope
-default bidning for this applies to function call which was called in global scope
-if use in strit mode, global scope isnt allowed for default binding*/
function foo() {
    "use strict";
    console.log(this.a)
}
var a = 2
foo() // TypeError: 'this' is 'undefined'
/***implicit binding***/
/*does the call site have a context object - owning/containing object*/
function foo() {
    console.log(this.a)
}
var obj = {
    a: 2,
    foo: foo
}
obj.foo() // 2 -- foo is caled by obj reference
/*foo is defined in the gobal scope so the fact that it is added to the
object obj doesnt mean it owns or contains the function
-foo is called from the obj context to reference the function though so it does
	own the function when it is called
-since foo was called from obj reference, context was implicitly binded inside foo
	function so that this context is a reference of the obj
-only the last level of an object property refernce chain matters to call site*/
function foo() {
    console.log(this.a)
}
var obj2 = {
    a: 42,
    foo: foo
}
var obj1 = {
    a: 2,
    obj2: obj2
}
obj1.obj2.foo() // 42
/*obj1 calls obj2 and obj2 calls foo function. since obj2 is what actually called
	 foo function that is the only reference foo's context cares about*/
/***implicitly lost***/
/*when this is impliitly binded but looses that binding later on which
	then the code falls back to the default binding of global or undefined*/
function foo() {
    console.log(this.a)
}
var obj = {
    a: 2,
    foo: foo
}

var bar = obj.foo
var a = "oops, global"
bar() // "oops, global"
/*the variable bar is in the global context so that is what is used for context reference
	inside the foo function even though the value of bar is in the context of
	obj*/
function foo() {
    console.log(this.a)
}
function doFoo(fn) {
    // 'fn' is just another reference to 'foo'
    fn() // <-- call-site
}

var obj = {
    a: 2,
    foo: foo
}
var a = "oops, global" // 'a' also property on global object
doFoo(obj.foo) // "oops, global"
/*parameter assignment is implicit assignment so output is the same*/
/*when passing callback is a builtin the output is the same - below:*/
function foo() {
    console.log(this.a)
}
var obj = {
    a: 2,
    foo: foo
}
var a = "oops, global" // 'a' also property on global object
setTimeout(obj.foo, 100) // "oops, global" // obj context is lost since foo is called AFTER timeout function ended

/******explicit binding through apply and call methods*******/
/*first parameter for both functions is the context object wanting to bind to 
    the object that called apply or cal functions*/
function foo(){
    console.log(this.a)
}
var obj = {
    a: 2
}

foo.call( obj ) // 2 - call() forces 'this' in side foo function to reference obj.a value
/*if a smple primitive type is pass as argument then is wrapped in object form (called boxing)
    ie - string primitive turned into new String()
-this doesnt help if context is later changed - nned hard binding*/
function foo() {
    console.log(this.a)
}
var obj = {
    a: 2
}
var bar = function(){
    foo.call(obj)
} // since binding happens everytime function is called, it doesnt change no matter how function is invoked

bar() // 2
setTimeout(bar, 100) // 2
bar.call(window) // 2 - doesnt change because binding happens in funtion call so context of function call doesnt matter
/*typical way to wrap function with a hard binding creates a pass through of args passed */
function foo(something) {
    console.log(this.a, something)
    return this.a + something
}
var obj = {
    a: 2
}
var bar = function() { // this function is used as a pass through function to set the context
    return foo.apply(obj, arguments) // returns return value(s) of a function with custom context set
}

var b = bar(3) // 2 3
console.log(b) // 5
/* can create a reuseabe helper function*/
function foo(something) {
    console.log(this.a, something)
    return this.a + something
}
function bind(fn, obj){ // bind helper function - can use any function to bind and pass any args
    return function(){
        return fn.apply(obj, arguments)
    }
}

var obj = {
    a: 2
}
var bar = bind(foo, obj)
var b = bar(3) // 2 3
console.log(b) // 5
/* this hard binding is built into ES5 and is used by the bind() function call
-bind() returns a new function that is hard coded to call the orginal with the 
    specified context given
-as of ES6 hard bound function created by bind() has a .name property that is derived
    from original target function - ie foo.bind() object has 'name' property = 'bound foo'*/
function foo(something) {
    console.log(this.a, something);
    return this.a + something
}
var obj = {
    a: 2
}

var bar = foo.bind(obj) // the built in hard binging call outputs the same as above

var b = bar(3) // 2 3
console.log(b) // 5
/*many builtin functions and libraries have an optional parameter to set context*/
function foo(el) {
    console.log(el, this.id)
}
var obj = {
    id: "awesome"
}
[1, 2, 3].forEach(foo, obj) // 1 awesome 2 awesome 3 awesome - forEach has builtin hard coded context changer

/*******new binding*******/
/*constructors special methods with classes that are called when creating new class instance with new keyword
-in Js, constructors are just functions that so happen to be called with the new operator in front of them
-theyre not attached to any classes or are called from them in JS
-ANY function can be called with the new operator in front of it and turn function into constructor
-steps when a new operator calls a function (constuctor call):
    -a new object is created
    -the new object is prototype linked to the original function object
    -new object is set as 'this' binding for that function call
    -unless new function returns its own object, the orignal function call will auto return new object*/
function foo(a) {
    this.a = a
}
var bar = new foo(2) // changed 'this' context to new object created
console.log(bar.a) // 2

/*order of precedence to 4 ways to change binding of a function
-explicit takes precedence over implicit*/
function foo() {
    console.log(this.a);
}
var obj1 = {
    a: 2,
    foo: foo
}

var obj2 = {
    a: 3,
    foo: foo
}

obj1.foo() // 2
obj2.foo() // 3

obj1.foo.call(obj2) // 3 - call() overrides 'this' call in foo function
obj2.foo.call(obj1) // 2
/*new binding is more precedent than implicit binding*/
function foo(something){
    this.a = something
}
var obj1 = {
    foo: foo
}
var obj2 = {}

obj1.foo(2) // set a variable to 2
console.log(obj1.a) // 2
obj1.foo.call(obj2, 3)
console.log(obj2.a) // 3 - sets a variable to 3 inside obj2 object

var bar = new obj1.foo(4) // create a new obj1 foo function passing 4 as 'a' value
console.log(obj1.a) // 2 - original obj1 value of 'a' is still the same
console.log(bar.a) // 4 - new object created by new operator has 4 as the value

/*hard bound call overrrides new operator function call*/
function foo(something) {
    this.a = something
}

var obj1 = {}
var bar = foo.bind(obj1) // hard bind foo with obj1 context
bar(2) // set obj1 variable 'a' to value = 2
console.log(obj1.a) // 2

var baz = new bar(3) // create new bar object
console.log(obj1.a) // 2 - original object stil has 'old' value
console.log(baz.a) // 3 - new object has new value given in constructor

/***summary of rules for determining this context
-is function called wiht new operator - context is new object created
-is function called with call or apply? (explicit binding) - 
    context is explicit object used
-is function caed with context (implicit binding) aka 
    owning/containing object? context is that object
-otherwise context is default binding - if in strict mode is 
    undefined otherwise global object*/

/***********binding exceptions**************/
/*if pass null or undefined as binding parameter to call/apply/bind - default binding used
-can use apply to spread out arrays of values as parameters to function ca*/
function foo(a,b) {
    console.log("a:" + a + ", b:" + b)
}
// spreading out array as parameters
foo.apply( null, [2, 3] ) // a:2, b:3
// currying with `bind(..)`
var bar = foo.bind(null, 2)
bar(3) // a:2, b:3
/*ES6 has spread operator (...) that can spread out array without using bind()
-if use null as context value and function called tries to call 'this' it will call global context
-can use a safer option - an empty non-delegated object passed as the context
-any usage of 'this' in the called function will reference empty object and not effecct global context*/
function foo(a,b){
    console.log("a:" + a + ", b:" + b)
}
var ø = Object.create(null) // empty object
foo.apply(ø, [2, 3]) // a:2, b:3

var bar = foo.bind(ø, 2)
bar(3) // a:2, b:3

/*****indirection******/
/*can accidentaly create indirect references to functions - most commonly from an assignment*/
function foo() {
    console.log(this.a)
}
var a = 2
var o = {a: 3, foo: foo}
var p = {a: 4}

o.foo() // 3
(p.foo = o.foo)() // 2 -
/*assignment above is only a reference - default binding applies - script mode decides context
-can create soft binding to provide different default of default binding*/
if (!Function.prototype.softBind) {
    Function.prototype.softBind = function(obj) {
        var fn = this,
            curried = [].slice.call(arguments, 1),
            bound = function bound() {
                return fn.apply( // check 'this' to see if global context
                    (!this ||
                        (typeof window !== "undefined" &&
                            this === window) ||
                        (typeof global !== "undefined" &&
                            this === global)
                    ) ? obj : this,
                    curried.concat.apply(curried, arguments)
                )
            }
        bound.prototype = Object.create(fn.prototype)
        return bound
    }
}
/*example usage of soft binding*/
function foo() {
   console.log("name: " + this.name)
}
var obj = { name: "obj" },
    obj2 = { name: "obj2" },
    obj3 = { name: "obj3" }

var fooOBJ = foo.softBind(obj)
fooOBJ() // name: obj
obj2.foo = foo.softBind(obj)
obj2.foo() // name: obj2  
fooOBJ.call(obj3) // name: obj3 

setTimeout(obj2.foo, 10); // name: obj - falls back to obj context as default

/**********lexical this********/
/*ES6 introduced special kind of function that doesnt use 4 rules: arrow functions
-arrow functions adopt the context from the enclosing scope*/
function foo() {
    return (a) => {
        console.log(this.a)
    }
}

var obj1 = {a: 2}
var obj2 = {a: 3}

var bar = foo.call(obj1)
bar.call(obj2); // 2, not 3
/*bar is called in context of obj2 but 'this' looks up context of enclosing scope where
    it is used since it is being used in an arrow function - enclosing scope is foo
    which is binded to obj1 from call()
-most common use is callbacks*/
function foo() {
    setTimeout(() => {
        console.log(this.a)
    },100)
}
var obj = {a: 2}
foo.call(obj) // 2 
/*in normal operation the timeout function ends before 'this' is called but since an arrow
    function is what 'contains' the 'this' call, it references the enclosing scope no
    matter when or where 'this' is called (which is obj from the call() binding)
- in pre-ES6 code, saving the context in a variable is used*/
function foo() {
    var self = this // save the reference of 'this' context to use later
    setTimeout( function(){
        console.log(self.a)
    }, 100)
}
var obj = {a: 2}
foo.call(obj) // 2
/* try to avoid using this work around and use bind() and arrow functions if ES6*/
