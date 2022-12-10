import {Coordinates, Comparator} from "./Coordinates.js"
import assert from "node:assert"
import {Combinatorics} from "../../Combinatorics/Combinatorics.js"

class Test{
    constructor(){
        this.tests()
    }
    tests(){
        this.coordinates()
        this.isLess()
        this.isLessEqual()
        this.isGreater()
        this.isGreaterEqual()
        this.next()
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
            assert.equal(comparator.isGreater(coordinates[n+1], coordinates[n]), true)
        }
    }

    next(){
        console.log('coordinates() test')
        var c1=[0,0,0]
        var c2=[5, 5, 5]
        var _coordinates = new Coordinates(c1, c2)
        var coordinates = _coordinates.coordinates()
        var comparator = new Comparator(c1.length)
        _coordinates.next()
        for(var n = 0; n<coordinates.length-1; n++){
            //test its coordinate system
            var next = _coordinates.next() 
            var prev = _coordinates.prev
            assert.equal(comparator.isEqual(next, prev), false)
        }
    }

    incVal(){

    }

    in(){

    }

    window(){

    }

    copy(){

    }

    range(){

    }
    isEqual(){

    }
    isGreater(){
        console.log('isGreater() test')
        var c1=[-5,-5,-5]
        var c2=[5, 5, 5]
        var _coordinates = new Coordinates(c1, c2)
        var coordinates = _coordinates.coordinates()
        var comparator = new Comparator(c1.length)
        for(var n = 0; n<coordinates.length-1; n++){
            //test its coordinate system
            assert.equal(comparator.isGreater(coordinates[n+1], coordinates[n]), true)

        }
    }

    isGreaterEqual(){
        console.log('isGreaterEqual() test')
        var c1=[-1,-1,-1]
        var c2=[1, 1, 1]
        var _coordinates1 = new Coordinates(c1, c2)
        var _coordinates2 = new Coordinates(c1, c2)
        var coordinates1 = _coordinates1.coordinates()
        var coordinates2 = _coordinates2.coordinates()
        var comparator = new Comparator(c1.length)
        for(var n = 0; n<coordinates1.length-1; n++){
            //test its coordinate system
            assert.equal(comparator.isGreaterEqual(coordinates1[n], coordinates2[n]), true)
            assert.equal(comparator.isGreaterEqual(coordinates1[n+1], coordinates1[n]), true)
        }
    }
    isLess(){
        console.log('isLess() test')
        var c1=[-5,-5,-5]
        var c2=[5, 5, 5]
        var _coordinates = new Coordinates(c1, c2)
        var coordinates = _coordinates.coordinates()
        var comparator = new Comparator(c1.length)
        for(var n = 0; n<coordinates.length-1; n++){
            //test its coordinate system
            assert.equal(comparator.isLess(coordinates[n], coordinates[n+1]), true)
        }
    }
    isLessEqual(){
        console.log('isLessEqual() test')
        var c1=[-1,-1,-1]
        var c2=[1, 1, 1]
        var _coordinates1 = new Coordinates(c1, c2)
        var _coordinates2 = new Coordinates(c1, c2)
        var coordinates1 = _coordinates1.coordinates()
        var coordinates2 = _coordinates2.coordinates()
        var comparator = new Comparator(c1.length)
        for(var n = 0; n<coordinates1.length-1; n++){
            //test its coordinate system
            assert.equal(comparator.isLessEqual(coordinates1[n], coordinates2[n]), true)
            assert.equal(comparator.isLessEqual(coordinates1[n], coordinates1[n+1]), true)
        }
    }


}

new Test()


// console.log(new Coordinates([-1,-1,-1], [2, 2, 2]).coordinates())
// var coordinates = new Coordinates([-1,-1,-1], [2, 2, 2])
// for(var i= 0; i<coordinates.coordinates().length; i++){
// 	console.log(coordinates.next())
// }
