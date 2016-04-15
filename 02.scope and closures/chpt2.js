/*************lexical scope*****************
-two types of scopes, dynamic and lexical
-first stage of compiing is lexing or tokenizing
-scope is defined while tokenizing or lexing - 
-depends on where vars and blocks of a scope are created*/
function foo(a) {
	var b = a * 2
	function bar(c){
		console.log(a,b,c)
	}
	bar(b * 3)
}
foo(2)
/*three scopes, global, inside foo, and inside bar functions
-same identifier name can be used in different scopes (first one found
	up scope hierarchy is used) is called "shadowing"
-lexical scope only defined by where function is declared
	-lookup process only applies to first class identifiers (such as a,b,c)
	-if calling foo.bar.c, causes look up of foo object then property access after that

/*****cheating lexical*******/
/*cheating lexical scope leads to bad performance - 2 ways to cheat
-eval() parameter is string that is executed as js
	can be used to modify code that engine executes to change lexical scope*/
function foo(str, a){
	eval(str)
	console.log(a, b)
}
var b = 2
foo("var b = 3;", 1)
/*eval code creates new var b in foo's scope so global var b isnt looked up anymore
	-use strict mode causes eval() to be in its own lexical scope
	-setInterval() and setTimeout() can be passed a string to eval
	-new Function() constructor takes string as last arg to ceate a function dynamically
-'with' keyword can be used to change scope*/
function foo(obj){
	with (obj){
		a = 2
	}
}
var o1 = { a: 3 }
console.log(o1.b)
/*with block is treated as a seperate scope
-o1.b doesnt exist so when obj called in function is undefined, when var a
	is assigned in function, since obj is undefined, a global var a is created instead
-since eval() and 'with' change lexical scope the engine cant optimize since scopes are changing*/



