/**********hoisting*************/
a = 2
var a
console.log(a) // output is 2 even though var declared after assignment
/*in this code the output is undefined not ReferenceError*/
console.log(a)
var a = 2
/*best way to think about code is all declarations (variables and function)
	are processed first before any code execution
-var a = 2 is broken down into two statements: 'var a' and 'a = 2'
-variable and function declarations are moved to top of code - hoisted
	-only declarations are hoisted - assignemnts left in place*/
a = 2 // hoisted to top
var a = 2 // left where it is
function foo() {} // hoisted  to top - can be called before definition
/*hoisting only happens per scope*/
function foo(){
	var a
	console.log(a)
	a = 2
} // variable a is hoisted to top of function foo only not global scope

/*function expressions are not hoisted*/
var foo = function bar() {} /*foo variable if hoisted but has no value yet
	/*- causes TypeError if called before value given*/
foo() // TypeError
bar() // ReferenceError
var foo = function bar() {}
/* causes this to happen:*/
var foo
foo() // TypeError
bar() // ReferenceError
foo = function() {
    // var bar is self context
}


/******** functions first******/
/*functions are hoisted first then variables*/
foo() // 1 is printed here
var foo

function foo() { // hoisted first because is a function
    console.log( 1 )
}
foo = function() { // variable foo is hoisted after function foo
    console.log( 2 )
}
/* mutiple/duplicate var decalrations are ignored, subsequent function
	declarations override previous ones*/
foo() // 3 is displayed here instead of 1

function foo() {
    console.log( 1 )
}
var foo = function() {
    console.log( 2 )
}
function foo() {
    console.log( 3 )
}
/* function declaation in normal blocks are hoisted to enclosing scope*/
foo(); // "b" is displayed even though variable a is true so should display "a"
var a = true
if (a) {
   function foo() { console.log("a") }
}
else {
   function foo() { console.log("b") }
}
/*best to avoid declaring functions in blocks because behavior might change
