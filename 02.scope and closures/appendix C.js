/*********lexical this**********/
/*ES6 adds arrow functions*/
var foo = a => {
    console.log(a)
}
foo( 2 ) // 2
/*this code solves the problem of loosing 'this' binding on functions*/
var obj = {
    id: "awesome",
    cool: function coolFn() {
        console.log(this.id)
    }
}
var id = "not awesome"
obj.cool() // awesome
setTimeout(obj.cool, 100) // not awesome
/*code above outputs not awesome because when coo function is called the code
looks at the current global scope for the var id where the function itself was called
-this can be fixed by saving the context*/
var obj = {
    count: 0,
    cool: function coolFn() {
        var self = this // context of obj object is saved here
        if (self.count < 1) {
            setTimeout( function timer(){
                self.count++
                console.log("awesome?")
            }, 100)
        }
    }
}
obj.cool() // awesome?
/*the problem of having to save the context is fixed by arrow functions in ES6
arrow functions dont create thi own scope*/
var obj = {
    count: 0,
    cool: function coolFn() {
        if (this.count < 1) {
            setTimeout( () => { // arrow function here
                this.count++ // can use this context of obj object since no new scope in this function
                console.log("awesome?")
            }, 100)
        }
    }
}
obj.cool() // awesome?
/*arrow functions take on the this context of their immediately lexical enclosing scope
-arrow functions are anonymous
-pre ES6 used bind() to change the context of the function to the argument given*/
var obj = {
    count: 0,
    cool: function coolFn(){
        if (this.count < 1){
            setTimeout(function timer(){
                this.count++; // this now references the obj object since it was binded
                console.log("more awesome")
            }.bind(this), 100) // bind the conext of the obj object to the function called
        }
    }
}
obj.cool() // more awesome







