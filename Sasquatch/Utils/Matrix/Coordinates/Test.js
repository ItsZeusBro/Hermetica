import {Coordinates} from "./Coordinates.js"
import assert from "node:assert"
import {Combinatorics} from "../../Combinatorics/Combinatorics.js"

class Test{
    constructor(){
        this.tests()
    }
    tests(){


    }

    coordinates(){
        console.log('coordinates() test')
        var coordinates = new Coordinates([0,0,0], [5, 5, 5]).coordinates()
        var coordinates2 = new Coordinates([-5,-5,-5], [-10, -10, -10]).coordinates(true)


        // var PwithR = new Combinatorics()._PwithR(6, 3)
        // assert.equal(PwithR, coordinates.length)

        // for(var n = -5; n<5; n++){
        //     //test its coordinate system
        //     var _n = Math.abs(Math.abs(n*2)-Math.abs(n))
        //     console.log(_n, n*2-n)
        //     var PwithR = new Combinatorics()._PwithR(_n, 3)
        // }
    }

    next(){
        
    }

    incVal(){

    }
    in(){

    }
    window(){

    }


    range(){

    }
    isEqual(){

    }
    isGreater(){

    }

    isGreaterEqual(){

    }
    isLess(){

    }
    isLessEqual(){

    }

    copy(){

    }
}

new Test()


// console.log(new Coordinates([-1,-1,-1], [2, 2, 2]).coordinates())
// var coordinates = new Coordinates([-1,-1,-1], [2, 2, 2])
// for(var i= 0; i<coordinates.coordinates().length; i++){
// 	console.log(coordinates.next())
// }
