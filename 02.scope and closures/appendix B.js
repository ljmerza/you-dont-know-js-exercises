/***********polyfilling block scopes***********/
/*'with' and 'catch' clauses are examples of bloack scope since ES3
-'let' keyword in ES6 allows for full block scoping
-using catch in pre-ES6*/
try{throw 2}catch(a){ // throws error with value of arugment needing scoped
    console.log(a) // 2
}
console.log(a) // ReferenceError
/*Traceur is a transpiler that converts ES6 to pre ES6 code
/*input*/
{
    let a = 2;
    console.log(a) // 2
}
console.log(a) // ReferenceError
/*Traceur output*/
{
    try {
        throw undefined
    } catch (a) {
        a = 2
        console.log(a)
    }
}
console.log(a)

/**********implicit vs explicit blocks************/
/*alternative form  of using 'let'*/
let (a = 2) {
    console.log(a) // 2
}
console.log(a) // ReferenceError
/*instead of implicitly using an existing bock, this creates an explicit
	block for scope binding
	-better to write let block this way as it forces all declarations to top
-Traceur doesnt accept this format
-try/tach pre-ES6 is slow but isbeing worked on to be faster

