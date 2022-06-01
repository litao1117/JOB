class C {
    rand() {
        console.log('rand');
    }
}
var c = new C();
c.rand();
C.rand = function() {
    console.log('1');
}
C.prototype.rand = function() {
    console.log(2);
}
var c2 = new C();
c2.rand();

C.rand()