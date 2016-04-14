typeof null // output is 'object' - a 'bug' in JS that wont be fixed

var a
typeof a // 'undefined'

a = { b: 'c' }
typeof a // 'object'

/*types of objects = (boolean, string, number, undefined,
object, null, function) (ES6 7th object called 'symbol') */

function foo(){
	return 42
}

foo.bar = 'hello world' // can add properties to function objects

typeof foo // function
tyeof foo.bar // String

// empty arrays and objects are still true
// == and === compare references values for non primitives
var a = [1,2,3]
var b = [1,2,3]
a == b // false

/*hoisting = variable is auto moved out of inner scope 
to global scope whne not declared with 'var'
ES6 'let' declaration only allows scope inside block {}
no hoisting with 'let' declaration*/

/* functions are values and can be treated like them
such as assigning*/
var a = function bar(){}
/*Immediately Invoked Functions = function is immediately
called aka an anonymous function - wrap function in () and
then call with ()*/
(function IIFE(){
	console.log('hello world')
})()

/* module programming pattern - functions inside a main
function then return variable of inner function*/
function User(){
	/*vars not returned in public 
	object so they are hiddn to outside scopes*/
	var username, password
	
	// inner login function not seen to outside users
	function login(usr, pass){
		username = usr
		password = pass
	}

	// object of functions/vars wanting to be public
	var publicAPI = {
		login: login
	}

	// return the 'public' object only
	return publicAPI
}
// create new instance of User object and login
var fred = User()
fred.login('fred', '12Battery34!')
/* new not called because is a function not a 
class to be instantiated*/

/* 'this' is based off calling context*/
function foo(){ console.log(this.bar) }
var bar = 'global'
var obj = {
	bar: 'obj1'
	foo: foo
}
var obj2 = { ar: 'obj2' }
// 4 rues for how 'this' gets set
/*'global' - sets this to global object in nonstrict mode
in script mode returns undefined*/
foo()
// sets this to obj1 object
obj1.foo() // 'obj1'
// sets this to obj2 object
foo.call(obj2) // 'obj2'
// sets this to new empty object
new foo() // undefined

// transpiling - convert new code into older code equivalent
// ES6 adds default oaameter values
function foo(a=2){
	console.log(a)
}
foo() // '2'
foo(42) // '42'
// this dosn't work in pre ES6 engines - transpile it
function foo(){
	// if first arg is undefined then set as 2 else get first arg
	var a = arguments[0] !== (void 0) ? arguments[0] : 2
}
// current transpilers: Babel and Traceur




