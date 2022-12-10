import {Coordinates, Comparator} from "./Coordinates.js"
import assert from "node:assert"
import {Combinatorics} from "../../Combinatorics/Combinatorics.js"

export class CoordinatesTest{
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
        this.incVal()
        this.in()
        this.diff()
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
        console.log('next() test')
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
        console.log('incVal() test')
        var c1=[0,0,0]
        var c2=[5, 5, 5]
        var _coordinates = new Coordinates(c1, c2)
        var coordinates = _coordinates.coordinates()
        var comparator = new Comparator(c1.length)
        for(var n = 0; n<coordinates.length-1; n++){
            //test its coordinate system
            var next=_coordinates.next()
            for(var i = next.length-1; i>=0; i--){
                if(_coordinates.incVal(next, i)){
                    assert.equal(_coordinates.incVal(next, i)-next[i]==1, true)
                }else{
                    assert.equal((next[i]+1)>_coordinates.max()[i], true)
                }
            }
        }
    }

    in(){
        console.log('in() test')
        var c1=[0,0,0]
        var c2=[5, 5, 5]
        var _coordinates = new Coordinates(c1, c2)
        var coordinates = _coordinates.coordinates()
        var prev = _coordinates.next()
        _coordinates.next()
        var next = _coordinates.next()
        var current = _coordinates.prev()
        for(var n = 0; n<coordinates.length-3; n++){
            assert.equal(_coordinates.in(current,prev, next), true)
            prev=current
            current=next
            next = _coordinates.next() 
        }
    }

    diff(){
        console.log('diff() test')

        var c1=[-10,-10,-10]
        var c2=[-5, -5, -5]
        var _coordinates = new Coordinates(c1, c2)

        var diff = _coordinates.comparator.diff(c1, c2)
        assert.equal(diff[0], 5)
        assert.equal(diff[1], 5)
        assert.equal(diff[2], 5)

        c1=[-10,-10,-10]
        c2=[10, 10, 10]
        diff = _coordinates.comparator.diff(c1, c2)
        assert.equal(diff[0], 20)
        assert.equal(diff[1], 20)
        assert.equal(diff[2], 20)
 
        c1=[10,10,10]
        c2=[100, 100, 100]
        diff = _coordinates.comparator.diff(c1, c2)
        assert.equal(diff[0], 90)
        assert.equal(diff[1], 90)
        assert.equal(diff[2], 90)

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

// new Test()


// console.log(new Coordinates([-1,-1,-1], [2, 2, 2]).coordinates())
// var coordinates = new Coordinates([-1,-1,-1], [2, 2, 2])
// for(var i= 0; i<coordinates.coordinates().length; i++){
// 	console.log(coordinates.next())
// }
