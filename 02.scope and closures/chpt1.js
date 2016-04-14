/*******what is scope*************/


/****compiler theory*****/
/*js is compiled right before execution - goes through compilation 3 steps:
1-tokenizing - breaks up code into chunks called tokens
	-ex: var a = 2; is broken up into 4 tokens: var, a, =, 2, and ;
	-lexing = a lexer finds tokens - first part of compiling
2-parsing - second part of compiling
	-takes a group of tokens and turns into a nested tree representing
	structure of code and is called AST (Abstract Syntax Tree)
	-example: var a -2;
	-VariableDeclaration ->child node called Identifier with value a and
	another child node called AssignmentExpression -> has child itself called
	NumericLiteral with a value of 2
3-code generation - takes AST and turns into executable code (machine code)
-since compilation right before execute unlike other languages that
	have time to optimize - JS uses JIT and hot re-compiling*/

/*****understanding scope******/
/*3 parts: engine (compilation and execution of js)
	-compiler (parsing and code generation)
	-scope (collects and maintains list of identifiers)
-ex: var a =2; compiler sees 'var a' and asks scope if it exists
	-if exists, ignore declare, if it doesn't, create variable
	-compiler creates code for engine to run to handle assignment and
	looks up var a to see if declared. 
-LHS (left hand scoping) RS (right hand scoping)
	-LHS is done when assigning a var, RHS when looking up a var
	-LHS doesnt care about current value, just assigning new value
	-ex: console.log(a) a is a RHS because no assignment going on
	-LHS and RHS have nothing to do with which side of the assignment the var is
	-ex: function foo(a) a is LHS because passed arguement is assigned to 
		function's parameter. lloking up the function foo itself is a RHS
-ex: engine scope convo for*/
function foo(a){
	console.log(a)
}
foo(2)
/*engine does RHS on foo to scope. Scope has foo from compiler and gives it to engine
	-engine executes foo then sdoes LHS for paramenter a on scope. Scope has it from
	compiler and gives it to engine. Engine assigns 2 to a then does RHS to console.
	Scope has it from built ins. Engine sees a argument and asks scope for value of a
	engine gets value and executes log()*/
function foo(a){
	var b = a
	return a + b
}
var c = foo(2)
/* The looks up for above code are:
-LHS (3) = assign a value of 2 at parameter (is implicit),create and assign b value of a, 
	create and assign value of c
-RHS (4) = get value of foo, get value of a to assign to b, get value of a and get value 
	of b to return value*/

/*********nested scope********/
/*engine will look at parent scope of current scope doesn't have variable needed
	will traverse up scope hierarchy until reachs global scope.*/

/*******errors*****/
function foo(a){
	console.log(a + b)
	b = a
}
foo(2)
/*if engine does RHS for var b, cant find it and will return ReferenceError
-if engine is trying a LHS and cant find var:
	-if not in strict mode, va will be auto created
	-in strict mode var will not be auto created and throws ReferenceError
- if RHS look up but try to do impossible execution, throws TypeError
-ReferenceError = scope lookup fail related, TypeError = scope lookup successful, 
	but illegal action*/