import {Matrix} from "./Matrix.js"
import {Coordinates} from "./Coordinates.js"

class Test{
    constructor(){
        this.tests()
    }
    tests(){
        this.matrix()
    }
    matrix(){
        var mtx = new Matrix([0,0,0], [2, 2, 2])
        mtx.log(mtx.mtx)
    }
}

new Test()


// console.log(new Coordinates([-1,-1,-1], [2, 2, 2]).coordinates())
// var coordinates = new Coordinates([-1,-1,-1], [2, 2, 2])
// for(var i= 0; i<coordinates.coordinates().length; i++){
// 	console.log(coordinates.next())
// }
