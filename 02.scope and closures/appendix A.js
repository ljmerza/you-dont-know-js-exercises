/********Dynamic Scope*********/
/*dynamic scope vs lexical scopes
-dynamic scope is closely related the the 'this' keyword in JS
-exical scope is set of rues how the engine can look up variables
	and where it will find them
-lexical scopes are defined at author time when code is written
-dynamic scopes are when the scope can be determined at runtime*/
function foo() {
    console.log(a) // 2
}
function bar() {
    var a = 3
    foo()
}
var a = 2
bar()
/*lexical scope uses RHS reference to 'a' in foo() and will
	resolve it to global var 'a' (hoisting) making ouput '2'
-dynamic scopes dont worry about how/where functions and scopes are declared
	only where they are called from. is based on call stack not nested scopes*/
function foo() {
    console.log(a) // 3 not 2
}
function bar() {
    var a = 3
    foo()
}
var a = 2
bar()
/* 3 ionsteead of 2 the output here because instead of stepng up in the
scope hierarchy, it uses the call stack to find where foo function was called from
-foo was called from bar which has a variable called 'a' so it uses that value
-javascript does not have dynamic scopes. only lexical
-the 'this' keyword is kind of dynamic
-lexical scope is writetime, dynamic scopes are runtime
-lexical = where a function was declared, dynamic = where a function was called
-'this' cares where a function is called like dynamic scoping