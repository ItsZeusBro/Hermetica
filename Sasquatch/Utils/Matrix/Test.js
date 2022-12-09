import {Matrix} from "./Matrix.js"
import {Coordinates} from "./Coordinates.js"
import assert from "node:assert"

class Test{
    constructor(){
        this.tests()
    }
    tests(){
        this._mtx()
        this.shape()
    }
    _mtx(){
        var mtx = new Matrix([0,0,0], [2, 2, 2])
        mtx.log(mtx.mtx)
        //test its coordinate system
        var coordinates = new Coordinates([0,0,0], [2,2,2]).coordinates()
        for(var i=0; i<coordinates.length; i++){
            for(var j=0; j<coordinates[i].length; j++){
                assert.equal(mtx.mtx[i].coordinate[j]==coordinates[i][j], true)
            }
        }

        //test data loading
        var data = []
        for(var i = 0; i<coordinates.length; i++){
            data.push(i)
        }
        console.log(data)
        mtx._mtx(data)
        console.log(mtx.mtx)
        for(var i=0; i<coordinates.length; i++){
            assert.equal(mtx.mtx[i].data==data[i], true)
        }
        //test normal refresh
        mtx._mtx()
        for(var i=0; i<coordinates.length; i++){
            assert.equal(typeof mtx.mtx[i].data=='object', true)
        }
    }
    shape(){
       var _1= [-1,-1,-1]
       var _2=[2, 2, 2]
        var mtx = new Matrix(_1, _2)
        mtx.log(mtx.mtx)
        var shape = mtx.shape()

        for(var i = 0; i<_1.length; i++){
            assert.equal(shape[i]==(_2[i]-_1[i]), true)
        }
    }
    count(){

    }
    at(){

    }
    skip(){

    }
    get(){

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
