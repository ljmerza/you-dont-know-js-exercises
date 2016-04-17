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
}



