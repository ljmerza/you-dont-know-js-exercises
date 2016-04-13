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

