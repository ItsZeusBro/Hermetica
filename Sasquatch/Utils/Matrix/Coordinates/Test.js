import {Coordinates, Comparator} from "./Coordinates.js"
import assert from "node:assert"
import {Combinatorics} from "../../Combinatorics/Combinatorics.js"

class Test{
    constructor(){
        this.tests()
    }
    tests(){
        this.coordinates()

    }

    coordinates(){
        console.log('coordinates() test')
        var c1=[0,0,0]
        var c2=[5, 5, 5]
        var _coordinates = new Coordinates(c1, c2)
        var coordinates = _coordinates.coordinates()
        var PwithR = new Combinatorics()._PwithR(_coordinates.range(), c1.length)
        assert.equal(PwithR, coordinates.length)
        var comparator = new Comparator(c1.length)
        for(var n = 0; n<coordinates.length-1; n++){
            //test its coordinate system
            assert.equal(comparator.isLess(coordinates[n], coordinates[n+1]), true)
        }
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
