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
/*with and catch keywords create new block scopes
- ES6 'let' keyword allows for block scoping in JS when creating vars
let variables will not auto hoist - wont exist until explicitly created*/
console.log(bar) // ReferenceError
let bar = 2
/* let implicitly attaches variable to existing block - better to explicitly do it*/
// implicit example
var foo = true
if (foo){
	let bar = foo * 2
	bar = something(bar)
	console.log(bar)
}
console.log(bar) // causes ReferenceError
// explicit example
var foo = true
if (foo){
	{ // explicit block - can move around without affecting if block
		let bar = foo * 2
		bar = something(bar)
		console.log(bar)
	}
}

/******garbage collection*****/
function process(data) {}
var someBigData = {}
process(someBigData)
var btn = document.getElementById( "my_button" )
btn.addEventListener( "click", function click(evt){
    console.log("button clicked")
}, false)
/*click function doesnt need someBigData var so it can be garbage
	collected after use but most likely wont be since click function
	has a closure over scope
-block scope can fix this by explicitly showing varisnt needed anymore*/
function process(data) {}
{ // create block scope and use 'let' to create variable
	let someBigData = {}
	process(someBigData)
}
var btn = document.getElementById( "my_button" )
btn.addEventListener( "click", function click(evt){
    console.log("button clicked")
}, false)
/*let variables can also be used for loops - rebinds to each iteration of loop
-let declaations attach to any block creations including if statement*/
var foo = true, baz = 10
if (foo) {
    let bar = 3
}
if (baz > bar) { // wont see bar because 'let' is in if statement's block
    console.log(baz)
}
/*ES6 also has 'const' declaration - also creates bock-scoped var but is fixed
	-cant change value of a const variable


