/********************mixing class objects********************/
/*****class theory*****/
/*classes cassify a certain data structure and its behaviors
-Js has some class-like syntax elements (new and instanceof)
-ES6 introduces class keyword but Js doesnt actually have classes*/

/****class mechanics****/
/*in js classes belong to constructors
-no native mechanism for multiple inheritane*/

/****mixins*****/
/*no auto copy behavior when inhert or instantiate objects
-no classes in JS only objects and they get linked not copied
- two ways to fake the missing copy behavior of classes
-explicitly: can create utility that manually copies often called extend()*/
function extend(sourceObj, targetObj) {
    for (var key in sourceObj) {
        // if copy not present then add old property to new object
        if (!(key in targetObj)) {
            targetObj[key] = sourceObj[key]
        }
    }
    return targetObj
}
var Vehicle = {
    engines: 1,
    ignition: function() {
        console.log("Turning on my engine.")
    },
    drive: function() {
        this.ignition()
        console.log("Steering and moving forward!")
    }
}
var Car = mixin(Vehicle, { // use mixin to create copy of parent Vehicle
    wheels: 4,
    drive: function() {
        Vehicle.drive.call(this)
        console.log("Rolling on all " + this.wheels + " wheels!")
    }
})
/* functions arent copied just referenced to
-have to call drive() from Vehcile explicitly since both have same function name
-use Vehicle.drive() but then ontext inside it would be Vehicle object
-use call(this) to change context of Vehicle.drive() to Car object
-have to watch for context overriding - explicit polymorphism should be avoided
-two 'seperate' objects can still effect each other if both share referne to common object ie array
-functions are shaed so changing actua function changes all objects with reference to it*/

/*****parasitic inheritance*****/
function Vehicle() {
    this.engines = 1
}
Vehicle.prototype.ignition = function() {
    console.log("Turning on my engine.")
}
Vehicle.prototype.drive = function() {
    this.ignition()
    console.log("Steering and moving forward!")
}

function Car() { // create basic JS class above then ceate parasitic class 'Car'
    var car = new Vehicle() // new car object is a vehicle
    car.wheels = 4 // add custom properties to new object car
    var vehDrive = car.drive // save reference to vehicle.drive before overload
    car.drive = function() { // overload drive function
        vehDrive.call(this) // call 'old' function first with right context
        console.log("Rolling on all " + this.wheels + " wheels!")
    }
    return car // return child function of vehicle
}
var myCar = new Car()
myCar.drive()

/*****implicit mixins******/
var Something = {
    cool: function() {
        this.greeting = "Hello World"
        this.count = this.count ? this.count + 1 : 1
    }
}

Something.cool()
Something.greeting // "Hello World"
Something.count // 1

var Another = { // implicit mixin
    cool: function() {
        Something.cool.call(this) //vborrows function and cals with own context
    } // this 'mixes in' some functionality from 'parent' function
}

Another.cool()
Another.greeting // "Hello World"
Another.count // 1 - not shared state with '`'Something'



