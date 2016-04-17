/***********scope closures**********/
 /*when a function remembers a scope even when function is executing*/
 function foo() {
 	var a = 2
 	function bar() {
 		console.log(a)
 	}
 	bar()
 }
foo()  // 2 is displayed by look up rules
/*beow code - bar function is returned and 'ends' the foo function
when baz() is called, '2' is displayed even though foo function is done
this is because baz() actually calls bar() which has a reference to the
scope of foo - reference is caled a closure*/
function foo(){
	var a = 2
	function bar(){
		console.log(a)
	}
	return bar
}
var baz = foo()
baz()
/*exampe of closure used in real code - function wait ends before
timeout is called but once its called, timeout still has reference
to message variable in wait's scope*/
function wait(message){
    setTimeout( function timer(){
        console.log(message)
    }, 1000)
}
wait("Hello, closure!")

/***********loops and closure**********/
for(var i=0;i<=5;i++){
	setTimeout(function timer(){
		console.log(i)
	}, i*1000)
}
/*linters usually complain of functions in loops since is a major
	misunderstanding of how they work together
-the code above prints the number 6 each time because the setTimeout
	function will get the value of i only when it is called - by the time
	the function is called, the loop is finished and variable i =6 because
	they are all sharing the same global scope
	-need a closed scope for each iteration of the loop
-IIFE creates a scope but it doesnt change - all outputs are still 6*/
for (var i=0;i<=5;i++){
	(function(){
		setTimeout(function timer(){
			console.log(i)
		}, i*1000)
	})() // IIFE is empty and need a copy of i in its scope to work
} 
for (var i=1;i<=5;i++){
    (function(){
        var j = i
        setTimeout(function timer(){
            console.log(j)
        }, j*1000)
    })()
} 
/*above code works because var j is created for each new scope from the IIFE
-can use copied variable as an argument like below:*/
for (var i=1; i<=5; i++){
    (function(j){
        setTimeout( function timer(){
            console.log(j)
        }, j*1000)
    })(i) // var i is passed as a argument to IIFE
}

/*******block scoping************/
/*the new ES6'let' declaration turns a block into a scope to close
-code below works because var is declared for each iteration using 'let'*/
for (let i=1; i<=5; i++){
    setTimeout( function timer(){
        console.log(i)
    }, i*1000 )
}

/*********modules************/
function foo(){
	// 2 private variables
    var something = "cool"
    var another = [1, 2, 3]
    // both functions have closure over foo()
    function doSomething(){
        console.log(something)
    }
    function doAnother(){
        console.log( another.join(" ! "))
    }
    // returns functions to use later
    return {
        doSomething: doSomething,
        doAnother: doAnother
    }
}
// needs to be invoked for an instance created
var foo = CoolModule()
// called functions save state of foo function scope
foo.doSomething()
foo.doAnother()
/* two requirements for module to exist - an enclosing function must exist
	and be invoked at least once, and enclosing function must return at
	least one inner function so the inner function has closure over enclosing
	function's scope
-variation of code where only one instance can exist - called a singleton
create instance of the enclosing function wrapped in an IIFE:*/
var foo = (function CoolModule() {
    var something = "cool"
    var another = [1, 2, 3]

    function doSomething() {
        console.log(something)
    }
    function doAnother(){
        console.log(another.join( " ! " ))
    }
    return {
        doSomething: doSomething,
        doAnother: doAnother
    }
})()
foo.doSomething()
foo.doAnother()
/*can also name object as you are returning it*/
var foo = (function CoolModule(id) {
    function change() {
        publicAPI.identify = identify2
    } // change to uppercase and store
    function identify1() {
        console.log(id)
    } // display identifier
    function identify2() {
        console.log(id.toUpperCase())
    } // change to uppercase - interal function
    var publicAPI = {
        change: change,
        identify: identify1
    } // return object with change/display id functions
    return publicAPI
})("foo module")
// changes module instance from the inside
foo.identify()
foo.change()
foo.identify()

/********modern modules********/
/**/
var MyModules = (function Manager() {
    var modules = {}
    function define(name, deps, impl) {
    	// for each dependency, get dependency needed from a list
    	// of dependencies that this module loader function has
        for (var i=0;i<deps.length i++) {
            deps[i] = modules[deps[i]]
        }
        // invokes returned function from impl parameter
        // with dependencies as the context and adds to list of modules
        // this modules loader has
        modules[name] = impl.apply(impl, deps)
    }
    // gets a certain module
    function get(name) {
        return modules[name]
    }
    // return the module creation/get functions
    return {
        define: define,
        get: get
    }
})()
/* now create a module from the module loader code above*/
MyModules.define( "bar", [], function(){
    function hello(who) {
        return "Let me introduce: " + who
    }
    return {
        hello: hello
    }
} )
/*created a module named 'bar' with no dependencies function passed in 
	implementation parameter has api function 'hello' that will be 
	returned as an object for access by property.
-the modules loader function stores the 'bar' module in its scope for
	other modules created by the module loader to access as a dependency
-code below creates another module but 'bar' is a dependency*/
MyModules.define("foo", ["bar"], function(bar){
    var hungry = "hippo"
    function awesome(){
        console.log(bar.hello(hungry).toUpperCase())
    }
    return{
        awesome: awesome
    }
})
// instanes of each module is gotten from the module loader function
var bar = MyModules.get("bar")
var foo = MyModules.get("foo")
console.log(
    bar.hello("hippo") // bar calls its internal function
) // Let me introduce: hippo
/*anotehr modue called 'foo' is created and 'bar' is its dependency.
-the for loop in the module loader looks through current modules created by it
	and finds the 'bar'  module created earlier and loads it into the dependency
	variable
-the function in the 'foo' module's parameters is then invoked with the dependencies
(in this case only one found in the loop) as the context.
-the function 'awesome' calls the 'hello' function from the dependency 'bar'
-the function 'awesome' is returned as an object property of access*/
foo.awesome() // LET ME INTRODUCE: HIPPO
/*in the foo.awesome() call, awesome calls the bar dependency function which is stored
	by closures because it has a reference of it from when it was used as a contect argument
	in the apply() function call*/

/*******ES6 modules********/
/*adds first class syntax support
-files loaded by the modue system are treated as a sperate module
-each module can import other modules or specific API object properties
	or export own public API object
-function based APIs like the previous example arent statically recognized
	the compiler doesnt know they exist so API isnt considered until runtime
	this means you can modify an API during runtime
-but ES6 module APIs are static and APIs dont change at runtime
-since the compiler knows they cant be changed, it checks during compilation
	references to properties of an API to ensure they exist
-if they dont exist, throws early error at compile time.
-browsers/engines have defualt module loader that can be overridden
-each module must be defined in a sepeate file*/
/*******bar.js file*******/
function hello(who) {
    return "Let me introduce: " + who
}
 // create hello function as before and use export keyword to export the function
export hello

/********foo.js file*******/
// import only 'hello()' from the 'bar' module
import hello from "bar"
var hungry = "hippo"
// create awesome function and use hello function that was imported from bar.js modue file
function awesome() {
    console.log(
        hello(hungry).toUpperCase()
    )
}
export awesome // export awesome function so other modues can use it

/******import both modules******/
module foo from "foo"
module bar from "bar"
console.log(
	// call bar module's exported function awesome which inside if it calls bar's hello exported function
    bar.hello( "rhino" ) 
) // Let me introduce: rhino
foo.awesome() // LET ME INTRODUCE: HIPPO
/* 'import' keyword imports what was assigned to the 'export' keyword inside that
particular modle file
- 'export' keyword exports an identifier - a function or variable = to the public API
-both operator keywords can be used multiple times
-contentsinside modue files are treated as a scope closure
