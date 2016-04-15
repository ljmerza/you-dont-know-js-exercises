/***************function vs block scopes************/
/****scopes from functions*****/
function foo(a){
	var b = 2
	function bar(){

	}
	var c = 3
}
/*vars a,b,c belong in foo's scope - where they are in scope doesnt matter
-accessing vars outside scope cause ReferenceErrors
-follow principle of least privilege - expose vars that are only needed for operation
	-avoids name collisions - vars with same name mixing - can happen in global scope
-create single global object and use it as namespace of objects*/
var myLib = {
	a: = 2,
	funct: function(){},
	funct2: function ()
} // access by myLib.a, myLib.funct
/*modern collision avoidance is module creation using dependency managers*/

/*****functions as scopes*****/
/*can wrap section of in a function to hide it in a scope*/
var a = 2
function(){
	var a = 3
	console.log(a) // outputs 3
}
foo() // outputs 3
console.log(a) // outputs 2
/*proplems with this method:
	-declared function foo pollutes enclosing (global here) scope
	-use IIFE - creates function expression*/
var a = 2
(function foo(){
	var a = 3
	console.log(a)
})()
console.log(a)
/*anonymous functions have no identifier
-dont have a name for stacktraces - harder to debug
-cant recursively call without depreciated arguments.callee
-good practide to always name functions so IIFE:*/
var a = 2
(function IIFE(b){
	console.log(b)
})(a) // enter aruments pass here

/******blocks as scopes*************/
/*

