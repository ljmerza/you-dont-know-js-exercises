/*******this and object prototypes*********/
function identify() {
    return this.name.toUpperCase()
}
function speak() {
    var greeting = "Hello, I'm " + identify.call(this)
    console.log( greeting )
}

var me = {
    name: "Kyle"
}
var you = {
    name: "Reader"
}
/*'me' object is passed as the context with the bind()
this causees the 'this' in the identify function to reference
the 'me' object when searching for the 'name' variable*/
identify.call(me) // KYLE
identify.call(you) // READER
/*the speak function does the same in it changes the context
of the identify function call to speak's context which has been
changed as well by the below bind() call to the 'me' object*/
speak.call(me) // Hello, I'm KYLE
speak.call(you) // Hello, I'm READER

/******confusions of this*****/
/*'this' doesnt reference the function itself
-example code showing tracking how many times foo function is called*/
function foo(num) {
    console.log("foo: " + num)
    // keep track of how many times `foo` is called
    this.count++
}

foo.count = 0
var i
for (i=0;i<10;i++) {
    if (i > 5) {
        foo(i)
    }
}
console.log(foo.count) // this outputs zero instead of 9
/*a global variable count was created with 'this' and has a value of NaN
-can go around using 'this' by creating seperate property to keep count*/
function foo(num){
    console.log("foo: " + num)
    // keep track of how many times `foo` is called
    data.count++
}
var data = {
    count: 0
}

var i
for (i=0; i<10; i++){
    if (i > 5) {
        foo(i)
    }
}
console.log( data.count ) // 4 - displays right number
/* the code above avoids using this and understanding it*/

function foo(){
    foo.count = 4 // `foo` refers to itself
}
setTimeout( function(){
    // anonymous function cannot refer to itself
}, 10)
/*named function foo can be referenced inside itself but anaonymous
functions cannot
-deprecated arguments.calee reference insdie a function points to the function
	object that is currently executing. usuallu only way to access anonymous 
	function's reference. 
-another solution to keep track of function cal count is using reference to function*/
function foo(num) {
    console.log("foo: " + num)
    foo.count++ // use referene to foo function to count calls
}
foo.count = 0

var i
for (i=0; i<10; i++) {
    if (i > 5) {
        foo(i)
    }
}
console.log( foo.count ); // 4 = gives right answer
/*this way reies entrely on the lexical scoping of the variable foo
-can also force this context to point to foo function object using call()*/
function foo(num) {
    console.log("foo: " + num)
    this.count++ // this context has been changed to foo from bind()
}
foo.count = 0

var i
for (i=0; i<10; i++) {
    if (i > 5) {
        foo.call(foo, i) // use call() to change context to foo object
    }
}
console.log( foo.count ); // 4


/****scope****/
/*misconception that this context refers to function's scope
-doesnt not refer to function's lexical scope*/
function foo() {
    var a = 2
    this.bar()
}
function bar() {
    console.log(this.a)
}
foo() //undefined
/*referencing bar by this works but only by accident
-referenceing var a by this context doesnt work
-cant use this context reference to look up in a lexical scope*/

/*****what is this*****/



