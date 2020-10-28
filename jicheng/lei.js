function Foo(name) {
    this.name = name
}
Foo.prototype.sayName = function() {
    console.log('I am'+this.name)
}
var a = new Foo("a")
a.sayName() //I am a

function objjectFactory(constructor,args) {
    var obj = new Object()
    obj.__proto__ = constructor.prototype
    var ret = constructor.apply(obj,args)
}